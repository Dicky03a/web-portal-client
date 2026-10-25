/**
 * Document domain schema: documents, versions, line items, decisions, templates.
 *
 * Document immutability: a version is frozen once `sent_at` is set. The freeze
 * is enforced by a BEFORE UPDATE trigger (fn_freeze_document_version) appended
 * to this task's SQL migration — Drizzle cannot express triggers. See Task 2.3
 * and implementation-notes.md §2 (trigger) and §6 (content hash).
 *
 * `content_snapshot` is TEXT (canonical JSON), `content_hash` is the SHA-256 hex
 * of that TEXT — never hashed from JSONB (JSONB reorders keys).
 */

import { sql } from 'drizzle-orm';
import {
  bigint,
  bigserial,
  boolean,
  char,
  check,
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
      .references(() => projects.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 32 }).notNull(),
    // Set after a version is created; points at the current head version.
    latestVersionId: bigint('latest_version_id', { mode: 'number' }).references(
      () => documentVersions.id,
      { onDelete: 'set null' },
    ),
    createdByUserId: bigint('created_by_user_id', { mode: 'number' })
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => [
    check('documents_type_check', sql`${t.type} IN ('quotation', 'invoice', 'addendum', 'bast')`),
    index('idx_documents_project_id').on(t.projectId),
  ],
);

export const documentVersions = pgTable(
  'document_versions',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    documentId: bigint('document_id', { mode: 'number' })
      .notNull()
      .references(() => documents.id, { onDelete: 'cascade' }),
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
      .default(sql`now()`),
  },
  (t) => [
    uniqueIndex('idx_document_versions_doc_version').on(t.documentId, t.versionNumber),
    index('idx_document_versions_document_id').on(t.documentId),
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
      .default(sql`now()`),
  },
  (t) => [
    check('dvi_quantity_check', sql`${t.quantity} >= 0`),
    check('dvi_unit_price_check', sql`${t.unitPrice} >= 0`),
    check('dvi_subtotal_check', sql`${t.subtotal} >= 0`),
    index('idx_dvi_document_version_id').on(t.documentVersionId),
  ],
);

export const documentDecisions = pgTable(
  'document_decisions',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    documentVersionId: bigint('document_version_id', { mode: 'number' })
      .notNull()
      .references(() => documentVersions.id, { onDelete: 'cascade' }),
    decision: varchar('decision', { length: 20 }).notNull(),
    decidedByName: varchar('decided_by_name', { length: 100 }).notNull(),
    decidedByTitle: varchar('decided_by_title', { length: 100 }),
    clientHash: char('client_hash', { length: 64 }).notNull(),
    ipAddress: inet('ip_address').notNull(),
    userAgent: text('user_agent'),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check('document_decisions_decision_check', sql`${t.decision} IN ('approved', 'rejected')`),
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
      .default(sql`now()`),
  },
  (t) => [
    check(
      'document_templates_type_check',
      sql`${t.type} IN ('quotation', 'invoice', 'addendum', 'bast')`,
    ),
  ],
);
