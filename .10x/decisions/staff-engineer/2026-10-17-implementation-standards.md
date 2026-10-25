# Staff Engineer Decision: Implementation Standards

**Date:** 2026-10-17  
**Decision:** Approved  
**Confidence:** High

## Context

Define coding standards, conventions, and implementation patterns for a solo-developer Next.js + Drizzle + PostgreSQL project that must be production-ready and maintainable.

## Standards

### 1. TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": false,
    "moduleResolution": "bundler",
    "target": "ES2022",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- `strict: true` is non-negotiable
- `noUncheckedIndexedAccess: true` prevents undefined access on arrays/records
- Path alias `@/` for clean imports

### 2. Naming Conventions

| Entity           | Convention               | Example                            |
| ---------------- | ------------------------ | ---------------------------------- |
| Files            | kebab-case               | `project-lifecycle.service.ts`     |
| Components       | PascalCase file + export | `ProjectCard.tsx`                  |
| Functions        | camelCase                | `calculateInstallments()`          |
| Types/Interfaces | PascalCase               | `ProjectStatus`, `DocumentVersion` |
| Constants        | SCREAMING_SNAKE_CASE     | `MAX_PIN_ATTEMPTS`                 |
| DB columns       | snake_case               | `content_hash`, `sent_at`          |
| DB tables        | snake_case plural        | `document_versions`                |
| Env vars         | SCREAMING_SNAKE_CASE     | `DATABASE_URL`                     |
| Server Actions   | verbNoun                 | `approveDocument`, `createProject` |
| Services         | domain.service.ts        | `billing.service.ts`               |
| Repositories     | domain.repository.ts     | `billing.repository.ts`            |

### 3. Result Type Pattern

Services return typed results instead of throwing exceptions:

```typescript
type Result<T, E = string> = { ok: true; data: T } | { ok: false; error: E };

// Usage in service
function transition(
  current: ProjectStatus,
  action: ProjectAction,
): Result<ProjectStatus, TransitionError> {
  const allowed = TRANSITIONS[current];
  if (!allowed?.includes(action)) {
    return { ok: false, error: { code: 'INVALID_TRANSITION', current, action } };
  }
  return { ok: true, data: getNextStatus(current, action) };
}
```

### 4. Money Handling

```typescript
// All money values are BIGINT rupiah (integer)
// Never use floating point for money
// Percent stored as basis points: 5000 = 50.00%

function calculateInstallmentAmount(total: bigint, basisPoints: number): bigint {
  return (total * BigInt(basisPoints)) / 10000n;
}

// Rounding: remainder goes to last installment
function distributeInstallments(total: bigint, percentages: number[]): bigint[] {
  const amounts = percentages.map((p) => calculateInstallmentAmount(total, p));
  const sum = amounts.reduce((a, b) => a + b, 0n);
  const remainder = total - sum;
  amounts[amounts.length - 1] += remainder;
  return amounts;
}

// Display: format as Rupiah
function formatRupiah(amount: bigint): string {
  return `Rp${amount.toLocaleString('id-ID')}`;
}
```

### 5. Date/Time Handling

- **Storage:** Always `TIMESTAMPTZ` (UTC in PostgreSQL)
- **Display:** Always format as WIB (`Asia/Jakarta`) in the UI
- **Business dates:** `DATE` type for due dates, warranty dates (no timezone issues)
- **Column naming:** `_at` for timestamps, `_on` for dates

```typescript
// Use date-fns with tz support
import { formatInTimeZone } from 'date-fns-tz';

const WIB = 'Asia/Jakarta';
function formatWIB(date: Date, format: string = 'dd MMM yyyy HH:mm'): string {
  return formatInTimeZone(date, WIB, format);
}
```

### 6. Zod Schema Pattern

Define once, use everywhere:

```typescript
// types/document.types.ts
export const createDocumentSchema = z.object({
  projectId: z.number().int().positive(),
  type: z.enum(['quotation', 'addendum', 'bast']),
  templateId: z.number().int().positive().optional(),
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;

// server/actions/document.actions.ts
export async function createDocument(input: unknown) {
  const parsed = createDocumentSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.flatten() };
  // ... proceed with parsed.data (fully typed)
}
```

### 7. Migration Standards

Migrations are hand-written SQL (not auto-generated) to support:

- Triggers
- CHECK constraints with conditions
- Partial unique indexes
- Comments on tables/columns

```sql
-- migrations/0001_create_projects.sql

CREATE TABLE projects (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  client_id BIGINT NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
  code VARCHAR(20) NOT NULL,
  name VARCHAR(150) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'draft',
  -- ... other columns
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT projects_code_unique UNIQUE (code),
  CONSTRAINT projects_status_check CHECK (
    status IN ('draft','quotation_sent','awaiting_down_payment','in_progress',
               'client_review','handover_sent','warranty','completed','cancelled')
  ),
  CONSTRAINT projects_cancel_reason_check CHECK (
    (cancelled_at IS NULL AND cancel_reason IS NULL) OR
    (cancelled_at IS NOT NULL AND cancel_reason IS NOT NULL)
  )
);

CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);

COMMENT ON TABLE projects IS 'Core state machine entity. Status transitions enforced by application service.';
```

### 8. Testing Strategy

| Level       | Tool             | What to test                                                                          |
| ----------- | ---------------- | ------------------------------------------------------------------------------------- |
| Unit        | Vitest           | Services (pure logic): state machine transitions, installment calc, hash verification |
| Integration | Vitest + test DB | Repositories: query correctness, transaction behavior, trigger enforcement            |
| E2E         | Playwright       | Critical flows: login, create project, approve quotation, record payment              |

**Test naming:** `describe('when [context]', () => it('should [expected behavior]'))`

**Factories:** Create test data builders for each entity:

```typescript
const project = await ProjectFactory.create({ status: 'quotation_sent' });
const version = await DocumentVersionFactory.create({
  documentId: project.documentId,
  sentAt: new Date(),
});
```

### 9. Environment Variables

```env
# Required
DATABASE_URL=postgresql://user:pass@localhost:5432/portal
APP_KEY=<32-byte-hex>          # For encryption (portal link tokens)
NEXTAUTH_SECRET=<random>       # For session signing

# Optional (with defaults)
NODE_ENV=production
PORT=3000
FILE_UPLOAD_MAX_SIZE=5242880   # 5MB in bytes
FILE_STORAGE_PATH=./uploads
SIGNED_URL_EXPIRY=300          # 5 minutes in seconds
```

### 10. Git Conventions

- **Branch:** `feat/`, `fix/`, `chore/`, `docs/`
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)
- **PR:** Required even for solo dev (forces review + CI gate)
- **Protected main branch:** No direct push, CI must pass
