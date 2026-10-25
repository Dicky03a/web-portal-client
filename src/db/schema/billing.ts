/**
 * Billing domain schema: installments, invoices, payments, bank_accounts,
 * number_sequences.
 *
 * Money as BIGINT (mode 'bigint', integer rupiah). Percent as basis points
 * (0-10000, 5000 = 50%). All amounts and basis points guarded by CHECK.
 * Invoice numbering uses number_sequences with row locking (Task 3.5);
 * UNIQUE(prefix, year) is the per-sequence key. See Task 2.4.
 */

import { sql } from 'drizzle-orm';
import {
  bigint,
  bigserial,
  boolean,
  check,
  date,
  index,
  integer,
  pgTable,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

import { users } from './portal';
import { projects } from './project';

export const installments = pgTable(
  'installments',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    projectId: bigint('project_id', { mode: 'number' })
      .notNull()
      .references(() => projects.id, { onDelete: 'restrict' }),
    installmentNumber: smallint('installment_number').notNull(),
    label: varchar('label', { length: 100 }).notNull(),
    percentageBasisPoints: smallint('percentage_basis_points').notNull(),
    amount: bigint('amount', { mode: 'bigint' }).notNull(),
    dueOn: date('due_on'),
    paidAt: timestamp('paid_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    check(
      'installments_basis_points_check',
      sql`${t.percentageBasisPoints} >= 0 AND ${t.percentageBasisPoints} <= 10000`,
    ),
    check('installments_amount_check', sql`${t.amount} > 0`),
    // Covers the project_id FK lookup and prevents duplicate term numbers.
    uniqueIndex('uq_installments_project_number').on(t.projectId, t.installmentNumber),
  ],
);

export const invoices = pgTable(
  'invoices',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    installmentId: bigint('installment_id', { mode: 'number' })
      .notNull()
      .references(() => installments.id, { onDelete: 'restrict' }),
    invoiceNumber: varchar('invoice_number', { length: 30 }).notNull().unique(),
    amount: bigint('amount', { mode: 'bigint' }).notNull(),
    issuedAt: timestamp('issued_at', { withTimezone: true }).notNull().defaultNow(),
    dueAt: timestamp('due_at', { withTimezone: true }).notNull(),
    paidAt: timestamp('paid_at', { withTimezone: true }),
    status: varchar('status', { length: 20 }).notNull().default('draft'),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    check('invoices_amount_check', sql`${t.amount} > 0`),
    // Spec ADR invoice statuses (portal-proyek-design.md): the fixtures use
    // draft/sent/partially_paid/paid/overdue/cancelled. Default 'draft'.
    check(
      'invoices_status_check',
      sql`${t.status} IN ('draft', 'sent', 'partially_paid', 'paid', 'overdue', 'cancelled')`,
    ),
    check('invoices_paid_state', sql`(${t.status} = 'paid') = (${t.paidAt} IS NOT NULL)`),
    check('invoices_due_after_issue', sql`${t.dueAt} >= ${t.issuedAt}`),
    index('idx_invoices_installment_id').on(t.installmentId),
    // At most one live (non-cancelled) invoice per installment.
    uniqueIndex('uq_invoices_installment_live')
      .on(t.installmentId)
      .where(sql`${t.status} <> 'cancelled'`),
    index('idx_invoices_status').on(t.status),
  ],
);

export const payments = pgTable(
  'payments',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    invoiceId: bigint('invoice_id', { mode: 'number' })
      .notNull()
      .references(() => invoices.id, { onDelete: 'restrict' }),
    amount: bigint('amount', { mode: 'bigint' }).notNull(),
    paymentMethod: varchar('payment_method', { length: 30 }).notNull(),
    paymentDate: date('payment_date').notNull(),
    referenceNumber: varchar('reference_number', { length: 100 }),
    proofFilePath: varchar('proof_file_path', { length: 500 }),
    status: varchar('status', { length: 20 }).notNull().default('pending'),
    verifiedByUserId: bigint('verified_by_user_id', { mode: 'number' }).references(() => users.id, {
      onDelete: 'set null',
    }),
    verifiedAt: timestamp('verified_at', { withTimezone: true }),
    rejectionReason: text('rejection_reason'),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    check('payments_amount_check', sql`${t.amount} > 0`),
    check('payments_status_check', sql`${t.status} IN ('pending', 'verified', 'rejected')`),
    // Status/field coherence: verified needs verifier+time, rejected needs a reason.
    check(
      'payments_state_check',
      sql`(${t.status} = 'verified' AND ${t.verifiedAt} IS NOT NULL AND ${t.verifiedByUserId} IS NOT NULL)
          OR (${t.status} = 'rejected' AND ${t.rejectionReason} IS NOT NULL)
          OR (${t.status} = 'pending' AND ${t.verifiedAt} IS NULL)`,
    ),
    index('idx_payments_invoice_id').on(t.invoiceId),
    index('idx_payments_verified_by').on(t.verifiedByUserId),
    index('idx_payments_status').on(t.status),
  ],
);

export const bankAccounts = pgTable('bank_accounts', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  bankName: varchar('bank_name', { length: 100 }).notNull(),
  accountNumber: varchar('account_number', { length: 30 }).notNull(),
  accountHolder: varchar('account_holder', { length: 100 }).notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const numberSequences = pgTable(
  'number_sequences',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    prefix: varchar('prefix', { length: 10 }).notNull(),
    year: smallint('year').notNull(),
    lastValue: integer('last_value').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    uniqueIndex('idx_number_sequences_prefix_year').on(t.prefix, t.year),
    check('number_sequences_last_value_check', sql`${t.lastValue} >= 0`),
  ],
);
