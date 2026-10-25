/**
 * Project domain schema: clients, projects, project_status_histories.
 *
 * Money as BIGINT (mode 'bigint', integer rupiah). FK as bigint mode 'number'.
 * CHECK constraints and indexes declared here so `drizzle-kit generate` emits
 * them into the migration. Status transitions are enforced in the service
 * layer; the DB CHECK only guards the set of legal status values.
 * See Tasks 2.1–2.2 and implementation-standards.md §7.
 */

import { sql } from 'drizzle-orm';
import {
  bigint,
  bigserial,
  check,
  index,
  pgTable,
  smallint,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { PROJECT_STATUSES } from '../../lib/constants';
import { users } from './portal';

const STATUS_IN_LIST = PROJECT_STATUSES.map((s) => `'${s}'`).join(', ');

export const clients = pgTable(
  'clients',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    companyName: varchar('company_name', { length: 150 }),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    address: text('address'),
    notes: text('notes'),
    archivedAt: timestamp('archived_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [check('clients_email_lower', sql`${t.email} = lower(${t.email})`)],
);

export const projects = pgTable(
  'projects',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    clientId: bigint('client_id', { mode: 'number' })
      .notNull()
      .references(() => clients.id, { onDelete: 'restrict' }),
    code: varchar('code', { length: 20 }).notNull().unique(),
    name: varchar('name', { length: 150 }).notNull(),
    description: text('description'),
    status: varchar('status', { length: 32 }).notNull().default('draft'),
    totalValue: bigint('total_value', { mode: 'bigint' }),
    revisionQuota: smallint('revision_quota').notNull().default(0),
    warrantyDays: smallint('warranty_days').notNull().default(0),
    startedAt: timestamp('started_at', { withTimezone: true }),
    deadline: timestamp('deadline', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    cancelledAt: timestamp('cancelled_at', { withTimezone: true }),
    cancelReason: text('cancel_reason'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    check('projects_status_check', sql.raw(`status IN (${STATUS_IN_LIST})`)),
    check('projects_revision_quota_check', sql`${t.revisionQuota} >= 0`),
    check('projects_warranty_days_check', sql`${t.warrantyDays} >= 0`),
    check('projects_total_value_check', sql`${t.totalValue} IS NULL OR ${t.totalValue} >= 0`),
    check(
      'projects_cancel_reason_check',
      sql`(${t.cancelledAt} IS NULL AND ${t.cancelReason} IS NULL) OR (${t.cancelledAt} IS NOT NULL AND ${t.cancelReason} IS NOT NULL)`,
    ),
    // Status must agree with its terminal timestamp.
    check(
      'projects_cancelled_state',
      sql`(${t.status} = 'cancelled') = (${t.cancelledAt} IS NOT NULL)`,
    ),
    check(
      'projects_completed_state',
      sql`(${t.status} = 'completed') = (${t.completedAt} IS NOT NULL)`,
    ),
    index('idx_projects_client_id').on(t.clientId),
    index('idx_projects_status').on(t.status),
  ],
);

export const projectStatusHistories = pgTable(
  'project_status_histories',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    projectId: bigint('project_id', { mode: 'number' })
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    fromStatus: varchar('from_status', { length: 32 }),
    toStatus: varchar('to_status', { length: 32 }).notNull(),
    changedByUserId: bigint('changed_by_user_id', { mode: 'number' }).references(() => users.id, {
      onDelete: 'set null',
    }),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check('psh_to_status_check', sql.raw(`to_status IN (${STATUS_IN_LIST})`)),
    check(
      'psh_from_status_check',
      sql.raw(`from_status IS NULL OR from_status IN (${STATUS_IN_LIST})`),
    ),
    check('psh_distinct_check', sql`${t.fromStatus} IS DISTINCT FROM ${t.toStatus}`),
    index('idx_psh_project_id').on(t.projectId),
    index('idx_psh_changed_by_user_id').on(t.changedByUserId),
  ],
);
