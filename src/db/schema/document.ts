/**
 * Document domain schema: documents, versions, line items, decisions, templates.
 *
 * Document immutability (spec §6): a version is frozen once `sent_at` is set.
 * Enforced by triggers appended to the SQL migrations (Drizzle cannot express
 * triggers): fn_freeze_document_version (BEFORE UPDATE, blocks any field
 * change on a sent version), fn_block_frozen_version_delete (BEFORE DELETE),
 * and fn_freeze_version_items (items of a sent version are immutable).
 * document_decisions are append-only (protect trigger) and their client_hash
 * is tied to the version's content_hash by a composite FK.
 * See Task 2.3 and implementation-notes.md §2 and §6.
 *
 * `content_snapshot` is TEXT (canonical JSON), `content_hash` is the SHA-256 hex
 * of that TEXT — never hashed from JSONB (JSONB reorders keys).
 */

import { sql } from 'drizzle-orm';
import {
  type AnyPgColumn,
  bigint,
  bigserial,
  boolean,
  char,
  check,
  foreignKey,
  index,
  inet,
  jsonb,
  pgTable,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

import { users } from './portal';
import { projects } from './project';

export const documents = pgTable(
  'documents',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    projectId: bigint('project_id', { mode: 'number' })
      .notNull()
      .references(() => projects.id, { onDelete: 'restrict' }),
    type: varchar('type', { length: 32 }).notNull(),
    // Set after a version is created; points at the current head version.
    latestVersionId: bigint('latest_version_id', { mode: 'number' }).references(
      (): AnyPgColumn => documentVersions.id,
      { onDelete: 'set null' },
    ),
    createdByUserId: bigint('created_by_user_id', { mode: 'number' })
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    check('documents_type_check', sql`${t.type} IN ('quotation', 'invoice', 'addendum', 'bast')`),
    index('idx_documents_project_id').on(t.projectId),
    index('idx_documents_latest_version_id').on(t.latestVersionId),
    index('idx_documents_created_by').on(t.createdByUserId),
  ],
);

export const documentVersions = pgTable(
  'document_versions',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    documentId: bigint('document_id', { mode: 'number' })
      .notNull()
      .references((): AnyPgColumn => documents.id, { onDelete: 'restrict' }),
    versionNumber: smallint('version_number').notNull(),
    contentSnapshot: text('content_snapshot').notNull(),
    contentHash: char('content_hash', { length: 64 }).notNull(),
    notes: text('notes'),
    sentAt: timestamp('sent_at', { withTimezone: true }),
    renderedPdfPath: varchar('rendered_pdf_path', { length: 500 }),
    createdByUserId: bigint('created_by_user_id', { mode: 'number' })
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    uniqueIndex('idx_document_versions_doc_version').on(t.documentId, t.versionNumber),
    // Target for document_decisions' composite FK (id, content_hash).
    uniqueIndex('uq_document_versions_id_hash').on(t.id, t.contentHash),
    index('idx_document_versions_created_by').on(t.createdByUserId),
    check('dv_content_hash_hex', sql`${t.contentHash} ~ '^[0-9a-f]{64}$'`),
    check('dv_version_number_positive', sql`${t.versionNumber} > 0`),
  ],
);

export const documentVersionItems = pgTable(
  'document_version_items',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    documentVersionId: bigint('document_version_id', { mode: 'number' })
      .notNull()
      .references(() => documentVersions.id, { onDelete: 'cascade' }),
    sortOrder: smallint('sort_order').notNull(),
    description: varchar('description', { length: 500 }).notNull(),
    quantity: smallint('quantity').notNull().default(1),
    unit: varchar('unit', { length: 20 }).notNull().default('unit'),
    unitPrice: bigint('unit_price', { mode: 'bigint' }).notNull(),
    subtotal: bigint('subtotal', { mode: 'bigint' }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    check('dvi_quantity_check', sql`${t.quantity} > 0`),
    check('dvi_unit_price_check', sql`${t.unitPrice} >= 0`),
    check('dvi_subtotal_math', sql`${t.subtotal} = ${t.quantity}::bigint * ${t.unitPrice}`),
    uniqueIndex('uq_dvi_version_sort').on(t.documentVersionId, t.sortOrder),
    index('idx_dvi_document_version_id').on(t.documentVersionId),
  ],
);

export const documentDecisions = pgTable(
  'document_decisions',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    documentVersionId: bigint('document_version_id', { mode: 'number' })
      .notNull()
      .references(() => documentVersions.id, { onDelete: 'restrict' }),
    decision: varchar('decision', { length: 20 }).notNull(),
    decidedByName: varchar('decided_by_name', { length: 100 }).notNull(),
    decidedByTitle: varchar('decided_by_title', { length: 100 }),
    clientHash: char('client_hash', { length: 64 }).notNull(),
    ipAddress: inet('ip_address').notNull(),
    userAgent: text('user_agent').notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check('document_decisions_decision_check', sql`${t.decision} IN ('approved', 'rejected')`),
    check('dd_client_hash_hex', sql`${t.clientHash} ~ '^[0-9a-f]{64}$'`),
    // Approval proof must match the frozen version's content_hash (spec §6).
    foreignKey({
      name: 'document_decisions_version_hash_fk',
      columns: [t.documentVersionId, t.clientHash],
      foreignColumns: [documentVersions.id, documentVersions.contentHash],
    }),
    // At most one approval per version.
    uniqueIndex('uq_document_decisions_one_approval')
      .on(t.documentVersionId)
      .where(sql`${t.decision} = 'approved'`),
    index('idx_document_decisions_document_version_id').on(t.documentVersionId),
  ],
);

export const documentTemplates = pgTable(
  'document_templates',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    type: varchar('type', { length: 32 }).notNull(),
    templateFields: jsonb('template_fields').notNull(),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    check(
      'document_templates_type_check',
      sql`${t.type} IN ('quotation', 'invoice', 'addendum', 'bast')`,
    ),
  ],
);
