/**
 * Portal/auth domain schema.
 *
 * `users`: admin accounts (single-user MVP, but modeled as a table).
 * Email + argon2 password_hash + optional TOTP 2FA. See Task 2.1.
 * Portal access tables (portal_links, portal_sessions) land in Task 2.5.
 */

import { sql } from 'drizzle-orm';
import { bigserial, boolean, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

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
