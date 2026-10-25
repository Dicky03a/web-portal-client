/**
 * Common domain schema: files, activity_logs.
 *
 * `activity_logs` is append-only. UPDATE and DELETE are rejected by the
 * fn_protect_activity_logs trigger appended to this task's migration
 * (verbatim from implementation-notes §2). See Task 2.6.
 */

import { sql } from 'drizzle-orm';
import {
  bigint,
  bigserial,
  check,
  inet,
  index,
  integer,
  jsonb,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

import { projects } from './project';

export const files = pgTable(
  'files',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    projectId: bigint('project_id', { mode: 'number' }).references(() => projects.id, {
      onDelete: 'set null',
    }),
    filename: varchar('filename', { length: 255 }).notNull(),
    originalName: varchar('original_name', { length: 255 }).notNull(),
    mimeType: varchar('mime_type', { length: 100 }).notNull(),
    sizeBytes: integer('size_bytes').notNull(),
    storagePath: varchar('storage_path', { length: 500 }).notNull(),
    uploadedBy: varchar('uploaded_by', { length: 50 }).notNull().default('admin'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    // Max 5 MB per implementation-notes §10.
    check('files_size_bytes_check', sql`${t.sizeBytes} BETWEEN 1 AND 5242880`),
    check(
      'files_mime_type_check',
      sql`${t.mimeType} IN ('image/jpeg', 'image/png', 'image/webp', 'application/pdf')`,
    ),
    check('files_uploaded_by_check', sql`${t.uploadedBy} IN ('admin', 'client', 'system')`),
    uniqueIndex('uq_files_storage_path').on(t.storagePath),
    index('idx_files_project_id').on(t.projectId),
  ],
);

export const activityLogs = pgTable(
  'activity_logs',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    // RESTRICT: SET NULL would be an UPDATE, which the append-only trigger
    // rejects — breaking any project delete that has logs.
    projectId: bigint('project_id', { mode: 'number' }).references(() => projects.id, {
      onDelete: 'restrict',
    }),
    actorType: varchar('actor_type', { length: 20 }).notNull(),
    actorId: bigint('actor_id', { mode: 'number' }),
    action: varchar('action', { length: 100 }).notNull(),
    entityType: varchar('entity_type', { length: 50 }).notNull(),
    entityId: bigint('entity_id', { mode: 'number' }),
    metadata: jsonb('metadata'),
    ipAddress: inet('ip_address'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check('activity_logs_actor_type_check', sql`${t.actorType} IN ('admin', 'client', 'system')`),
    check(
      'activity_logs_system_actor_check',
      sql`${t.actorType} <> 'system' OR ${t.actorId} IS NULL`,
    ),
    index('idx_activity_logs_project_created').on(t.projectId, t.createdAt.desc()),
    index('idx_activity_logs_entity').on(t.entityType, t.entityId),
  ],
);
