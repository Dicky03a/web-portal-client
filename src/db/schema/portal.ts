/**
 * Portal/auth domain schema: users, portal_links, portal_sessions.
 *
 * `users`: admin accounts (single-user MVP, but modeled as a table).
 * Email + argon2 password_hash + optional TOTP 2FA. See Task 2.1.
 *
 * `portal_links`: per-project client access. Token is random; only its
 * SHA-256 `token_hash` is stored for lookup (encrypted_token for re-send).
 * At most one active (non-revoked) link per project — enforced by a partial
 * unique index in the migration, which Drizzle cannot express in full. PIN
 * lockout fields back DB-based rate limiting (no Redis). See Tasks 2.5, 3.4.
 */

import { sql } from 'drizzle-orm';
import {
  bigint,
  bigserial,
  boolean,
  char,
  inet,
  index,
  pgTable,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

import { projects } from './project';

export const users = pgTable('users', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  totpSecret: varchar('totp_secret', { length: 255 }),
  totpEnabled: boolean('totp_enabled').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export const portalLinks = pgTable(
  'portal_links',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    projectId: bigint('project_id', { mode: 'number' })
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    tokenHash: char('token_hash', { length: 64 }).notNull().unique(),
    encryptedToken: text('encrypted_token').notNull(),
    pinHash: varchar('pin_hash', { length: 255 }).notNull(),
    isPinChanged: boolean('is_pin_changed').notNull().default(false),
    failedAttempts: smallint('failed_attempts').notNull().default(0),
    lockedUntil: timestamp('locked_until', { withTimezone: true }),
    lockoutCount: smallint('lockout_count').notNull().default(0),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdByUserId: bigint('created_by_user_id', { mode: 'number' })
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => [
    // One active link per project. Partial predicate kept in sync with the
    // hand-verified index in implementation-notes §4.
    uniqueIndex('idx_portal_links_active_project')
      .on(t.projectId)
      .where(sql`${t.revokedAt} IS NULL`),
    index('idx_portal_links_token_hash').on(t.tokenHash),
  ],
);

export const portalSessions = pgTable(
  'portal_sessions',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    portalLinkId: bigint('portal_link_id', { mode: 'number' })
      .notNull()
      .references(() => portalLinks.id, { onDelete: 'cascade' }),
    sessionTokenHash: char('session_token_hash', { length: 64 }).notNull().unique(),
    ipAddress: inet('ip_address').notNull(),
    userAgent: text('user_agent').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('idx_portal_sessions_session_token_hash').on(t.sessionTokenHash)],
);
