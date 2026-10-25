# Senior Engineer Decision: Implementation Notes & Gotchas

**Date:** 2026-10-17  
**Phase:** 3 — Pre-Implementation Review

## Critical Implementation Notes

### 1. Drizzle Schema ↔ DB Design Mapping

The DB Design document uses Laravel column types. Here's the exact Drizzle mapping:

```typescript
// DB Design says:          → Drizzle schema:
// $table->id()             → bigserial('id').primaryKey()
// BIGINT FK                → bigint('client_id', { mode: 'number' }).notNull().references(() => clients.id)
// VARCHAR(100) NOT NULL    → varchar('name', { length: 100 }).notNull()
// TEXT nullable            → text('notes')
// BIGINT (money)           → bigint('amount', { mode: 'bigint' }).notNull()
// SMALLINT + CHECK >= 0    → smallint('revision_quota').notNull()  // CHECK in migration SQL
// CHAR(26) ULID            → char('ulid', { length: 26 }).notNull().unique()
// CHAR(64) hash            → char('content_hash', { length: 64 }).notNull()
// TIMESTAMPTZ              → timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
// DATE                     → date('due_on')
// INET                     → inet('ip_address')   // Drizzle supports this for PostgreSQL
// JSONB                    → jsonb('template_fields')
// VARCHAR(32) + CHECK      → varchar('status', { length: 32 }).notNull().default('draft')
```

**Gotcha:** Drizzle's `bigint` mode matters:

- `mode: 'number'` for IDs and small bigints (safe up to 2^53)
- `mode: 'bigint'` for money (use native BigInt to avoid precision loss)

### 2. Triggers Must Be in Raw SQL Migrations

Drizzle cannot define triggers in its schema DSL. These triggers from the DB Design MUST be in SQL migration files:

> **Update (schema review, migration 0005):** the original freeze body only
> compared content fields, so `UPDATE ... SET sent_at = NULL` bypassed it and a
> second UPDATE could then edit frozen content. The hardened body below blocks
> ANY field change once `sent_at` is set (including clearing `sent_at`), and two
> companion triggers block deleting a frozen version and mutating its items.

```sql
-- Trigger 1: Freeze document versions after sent_at is set (hardened)
CREATE OR REPLACE FUNCTION fn_freeze_document_version()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.sent_at IS NOT NULL THEN
    IF NEW.sent_at IS DISTINCT FROM OLD.sent_at
       OR NEW.document_id IS DISTINCT FROM OLD.document_id
       OR NEW.version_number IS DISTINCT FROM OLD.version_number
       OR NEW.created_by_user_id IS DISTINCT FROM OLD.created_by_user_id
       OR NEW.content_snapshot IS DISTINCT FROM OLD.content_snapshot
       OR NEW.content_hash IS DISTINCT FROM OLD.content_hash
       OR NEW.rendered_pdf_path IS DISTINCT FROM OLD.rendered_pdf_path THEN
      RAISE EXCEPTION 'Cannot modify frozen document version (sent_at is set)';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_freeze_document_version
BEFORE UPDATE ON document_versions
FOR EACH ROW EXECUTE FUNCTION fn_freeze_document_version();

-- Trigger 1b: Block deleting a frozen version (preserves approval audit trail).
CREATE OR REPLACE FUNCTION fn_block_frozen_version_delete()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.sent_at IS NOT NULL THEN
    RAISE EXCEPTION 'Cannot delete frozen document version (sent_at is set)';
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_block_frozen_version_delete
BEFORE DELETE ON document_versions
FOR EACH ROW EXECUTE FUNCTION fn_block_frozen_version_delete();

-- Trigger 1c: Items of a frozen version are immutable.
CREATE OR REPLACE FUNCTION fn_freeze_version_items()
RETURNS TRIGGER AS $$
DECLARE v_sent timestamptz;
BEGIN
  SELECT sent_at INTO v_sent FROM document_versions
   WHERE id = COALESCE(NEW.document_version_id, OLD.document_version_id);
  IF v_sent IS NOT NULL THEN
    RAISE EXCEPTION 'Cannot modify items of frozen document version';
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_freeze_version_items
BEFORE INSERT OR UPDATE OR DELETE ON document_version_items
FOR EACH ROW EXECUTE FUNCTION fn_freeze_version_items();

-- Trigger 2: Protect activity logs (append-only)
CREATE OR REPLACE FUNCTION fn_protect_activity_logs()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'activity_logs is append-only: % not allowed', TG_OP;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_protect_activity_logs_update
BEFORE UPDATE ON activity_logs
FOR EACH ROW EXECUTE FUNCTION fn_protect_activity_logs();

CREATE TRIGGER trg_protect_activity_logs_delete
BEFORE DELETE ON activity_logs
FOR EACH ROW EXECUTE FUNCTION fn_protect_activity_logs();
```

### 3. BigInt Handling in TypeScript

PostgreSQL BIGINT → JavaScript: Drizzle returns `bigint` or `number` depending on mode. For money:

```typescript
// In Drizzle schema
amount: bigint('amount', { mode: 'bigint' }).notNull(),

// In service layer — use BigInt literals
const total = 1_000_000n; // Rp1.000.000
const dp = (total * 5000n) / 10000n; // 50% = Rp500.000

// In API/Action response — serialize to string
// BigInt cannot be JSON.stringify'd directly
function serializeMoney(amount: bigint): string {
  return amount.toString();
}

// In UI — parse back and format
function formatRupiah(amountStr: string): string {
  return `Rp${BigInt(amountStr).toLocaleString('id-ID')}`;
}
```

**Gotcha:** `JSON.stringify({ amount: 100n })` throws. Always convert BigInt to string before sending to client.

### 4. Partial Unique Index for Active Portal Links

DB Design requires: one active portal link per project.

```sql
CREATE UNIQUE INDEX idx_portal_links_active_project
ON portal_links(project_id)
WHERE revoked_at IS NULL;
```

This cannot be expressed in Drizzle schema — must be in migration SQL.

### 5. Invoice Numbering with Row Locking

Critical for preventing duplicate numbers under concurrent requests:

```typescript
async function generateInvoiceNumber(tx: Transaction, year: number): Promise<string> {
  // Lock the row for this prefix+year
  const [seq] = await tx
    .select()
    .from(numberSequences)
    .where(and(eq(numberSequences.prefix, 'INV'), eq(numberSequences.year, year)))
    .for('update'); // SELECT ... FOR UPDATE

  if (!seq) {
    // First invoice of the year
    await tx.insert(numberSequences).values({ prefix: 'INV', year, lastValue: 1 });
    return `INV-${year}-0001`;
  }

  const next = seq.lastValue + 1;
  await tx.update(numberSequences).set({ lastValue: next }).where(eq(numberSequences.id, seq.id));

  return `INV-${year}-${String(next).padStart(4, '0')}`;
}
```

### 6. Content Hash Verification

The hash is computed from the TEXT content_snapshot, NOT from JSONB:

```typescript
import { createHash } from 'crypto';

function computeContentHash(canonicalText: string): string {
  return createHash('sha256').update(canonicalText, 'utf8').digest('hex');
}

// When creating snapshot:
const snapshot = JSON.stringify(data, Object.keys(data).sort()); // canonical key order
const hash = computeContentHash(snapshot);

// When verifying approval:
function validateApproval(version: DocumentVersion, clientHash: string): Result<void> {
  const recomputedHash = computeContentHash(version.contentSnapshot);
  if (recomputedHash !== version.contentHash) {
    return { ok: false, error: 'VERSION_TAMPERED' };
  }
  if (clientHash !== version.contentHash) {
    return { ok: false, error: 'HASH_MISMATCH' };
  }
  return { ok: true, data: undefined };
}
```

### 7. Portal Token Security

Token generation and storage:

```typescript
import { randomBytes, createHash, createCipheriv, createDecipheriv } from 'crypto';

// Generate: 128-bit random token
const token = randomBytes(16).toString('hex'); // 32 hex chars

// Store hash for lookup
const tokenHash = createHash('sha256').update(token).digest('hex');

// Store encrypted copy for re-sending
const { iv, encrypted } = encrypt(token, APP_KEY);

// In URL: /portal/{token}
// In DB: token_hash (for lookup), encrypted_token (for re-generation)
// In logs: NEVER
```

### 8. Session Cookie Configuration

```typescript
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 30 * 24 * 60 * 60, // 30 days for portal, 24h for admin
};
```

### 9. Rate Limiting Approach

No Redis — use database-based rate limiting:

```typescript
// Track in portal_links table or a separate rate_limits table
// Fields: failed_attempts (SMALLINT), locked_until (TIMESTAMPTZ), lockout_count (SMALLINT)

function checkRateLimit(link: PortalLink): Result<void> {
  if (link.lockoutCount >= 3) {
    return { ok: false, error: 'FROZEN_ADMIN_RESET_REQUIRED' };
  }
  if (link.lockedUntil && link.lockedUntil > new Date()) {
    return { ok: false, error: 'LOCKED_TEMPORARILY' };
  }
  return { ok: true, data: undefined };
}

function onFailedAttempt(link: PortalLink): { shouldLock: boolean } {
  const newAttempts = link.failedAttempts + 1;
  if (newAttempts >= 5) {
    return { shouldLock: true }; // Lock for 15 minutes, increment lockout_count
  }
  return { shouldLock: false };
}
```

### 10. File Upload Validation

```typescript
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function validateUpload(file: File): Result<void> {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { ok: false, error: 'INVALID_FILE_TYPE' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { ok: false, error: 'FILE_TOO_LARGE' };
  }
  return { ok: true, data: undefined };
}
```

## Common Pitfalls to Avoid

1. **Don't use `JSONB` for content that gets hashed.** PostgreSQL JSONB reorders keys — hash would change.
2. **Don't store money as `number`.** Use `bigint` mode in Drizzle for all monetary columns.
3. **Don't auto-generate migrations for trigger tables.** Always hand-write SQL migrations.
4. **Don't skip `FOR UPDATE` on number sequences.** Without row locking, concurrent requests produce duplicate numbers.
5. **Don't expose portal token in server logs.** Middleware must strip it from log output.
6. **Don't assume client timezone.** Store as TIMESTAMPTZ (UTC), display as WIB.
7. **Don't use `SoftDeletes` pattern.** Use explicit `cancelled_at` or `archived_at` columns.
8. **Don't compute revision quota as a stored counter.** Calculate from approved document versions minus used count.
