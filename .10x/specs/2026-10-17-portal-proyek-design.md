# Architecture Spec — Portal Proyek Jasa Website

**Date:** 2026-10-17  
**Author:** 10x Engineering Team  
**Status:** Approved  
**PRD:** PRD — Portal Proyek Jasa Website (Oct 16, 2026)  
**DB Design:** Desain Basis Data — Portal Proyek Jasa Website (Oct 16, 2026)

---

## 1. System Overview

Portal Proyek Jasa Website is a full-stack web application for managing the complete lifecycle of freelance website development projects — from quotation to warranty. It serves two actors:

- **Admin (provider):** Single-user admin dashboard for managing clients, projects, documents, invoices, payments, and progress.
- **Client (portal):** PIN-protected, account-less portal accessed via unique links sent through WhatsApp.

The system replaces manual processes (Canva + WhatsApp) with a single source of truth for project lifecycle, billing, approvals, and audit trails.

## 2. Stack Decision

| Layer      | Technology               | Rationale                                                                             |
| ---------- | ------------------------ | ------------------------------------------------------------------------------------- |
| Framework  | Next.js 15 (App Router)  | Full-stack monolith with RSC, Server Actions, built-in API routes                     |
| Language   | TypeScript (strict)      | Type safety across client/server boundary                                             |
| ORM        | Drizzle ORM              | SQL-first, supports raw SQL migrations for triggers/CHECK/partial indexes             |
| Database   | PostgreSQL 18            | Required by DB design: triggers, CHECK constraints, partial unique indexes, INET type |
| UI         | Tailwind CSS + shadcn/ui | Rapid UI development, accessible components, consistent design system                 |
| Runtime    | Node.js 22 LTS           | Required for Next.js 15, ESM support                                                  |
| Deployment | VPS + Docker Compose     | Next.js container + PostgreSQL container; shared hosting incompatible                 |
| CI/CD      | GitHub Actions           | Build image → push → deploy to VPS                                                    |

### Why Not Laravel (Original PRD Stack)

The PRD specified Laravel 13 + Inertia + React. The switch to full-stack Next.js was decided because:

1. User is shifting to the JS/TS ecosystem for career growth
2. Single language (TypeScript) across full stack eliminates context switching
3. React Server Components enable server rendering without separate API layer
4. Next.js Server Actions replace the need for a separate REST/API backend

### Why Drizzle Over Prisma

The DB design requires features Prisma cannot handle natively:

- `BEFORE UPDATE` triggers to freeze document versions
- `BEFORE UPDATE/DELETE` triggers to reject mutations on audit logs
- Partial unique indexes (e.g., unique active portal link per project)
- CHECK constraints with cross-column logic
- Composite foreign keys

Drizzle allows raw SQL in migration files while still providing type-safe query building.

## 3. Architecture

### 3.1 Monolith Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (admin)/                # Route group: admin dashboard
│   │   ├── layout.tsx          # Admin layout with sidebar, auth guard
│   │   ├── dashboard/
│   │   ├── clients/
│   │   ├── projects/
│   │   ├── invoices/
│   │   └── settings/
│   ├── (portal)/               # Route group: client portal
│   │   ├── layout.tsx          # Portal layout, minimal chrome
│   │   ├── [token]/            # Dynamic route per portal link
│   │   │   ├── page.tsx        # Project summary
│   │   │   ├── quotation/
│   │   │   ├── invoices/
│   │   │   ├── progress/
│   │   │   └── warranty/
│   │   └── pin/                # PIN entry/creation/change
│   └── api/                    # Minimal API routes
│       └── files/[id]/         # Signed URL file serving
├── server/
│   ├── actions/                # Server Actions (UI entry points)
│   │   ├── project.actions.ts
│   │   ├── document.actions.ts
│   │   ├── billing.actions.ts
│   │   ├── portal.actions.ts
│   │   └── auth.actions.ts
│   ├── services/               # Domain logic (pure business rules)
│   │   ├── project-lifecycle.service.ts    # State machine
│   │   ├── document.service.ts             # Versioning, hashing, immutability
│   │   ├── billing.service.ts              # Installment calc, rounding
│   │   ├── invoice-numbering.service.ts    # Sequence with row locking
│   │   ├── portal-auth.service.ts          # PIN hash, session, rate limit
│   │   └── whatsapp-message.service.ts     # wa.me link generation
│   ├── repositories/           # Database queries (Drizzle)
│   │   ├── project.repository.ts
│   │   ├── document.repository.ts
│   │   ├── billing.repository.ts
│   │   └── portal.repository.ts
│   └── lib/                    # Server utilities
│       ├── hash.ts             # SHA-256, bcrypt/argon2
│       ├── ulid.ts             # ULID generation
│       ├── pin.ts              # PIN validation (weak PIN rejection)
│       ├── number-format.ts    # Document/invoice numbering
│       └── signed-url.ts       # File access URL signing
├── db/
│   ├── schema/                 # Drizzle schema definitions
│   │   ├── project.ts          # clients, projects, project_status_histories
│   │   ├── document.ts         # documents, document_versions, items, decisions, templates
│   │   ├── billing.ts          # installments, invoices, payments, bank_accounts, number_sequences
│   │   ├── progress.ts         # milestones, progress_updates (Iteration 2)
│   │   ├── revision.ts         # revision_requests, warranty_claims (Iteration 2-3)
│   │   ├── portal.ts           # portal_links, portal_sessions, users
│   │   └── common.ts           # files, activity_logs
│   ├── migrations/             # SQL migration files (hand-written for triggers, CHECK, indexes)
│   └── seed.ts                 # Seed data and testing factories
├── components/                 # React components
│   ├── ui/                     # shadcn/ui primitives
│   ├── admin/                  # Admin-specific composites
│   ├── portal/                 # Portal-specific composites
│   └── shared/                 # Status badges, formatters, etc.
├── lib/                        # Client-side utilities
│   ├── format-currency.ts      # Rupiah formatting from BIGINT
│   ├── format-date.ts          # WIB display
│   └── constants.ts            # Status enums, transitions map
└── types/                      # Shared TypeScript types
    ├── project.types.ts
    ├── document.types.ts
    ├── billing.types.ts
    └── portal.types.ts
```

### 3.2 Layer Rules

1. **`app/` (Routes)** → calls `server/actions/` only. Never imports from `repositories/` or `db/` directly.
2. **`server/actions/`** → orchestrates `services/` and `repositories/`. Handles auth checks, input validation (Zod), and returns typed results. One action per user intent.
3. **`server/services/`** → pure domain logic. No DB access, no framework imports. Receives data, returns decisions. Testable without DB.
4. **`server/repositories/`** → Drizzle queries only. No business logic. Returns typed objects. Handles transactions when needed.
5. **`db/schema/`** → Drizzle table definitions. Maps 1:1 with PostgreSQL tables from the DB Design document.
6. **`components/`** → React components. Admin and portal components are separated. Server Components by default, Client Components only when interactive.

### 3.3 Data Flow Example: Client Approves Quotation

```
Portal UI (Client Component)
  → Server Action: approveDocument(token, versionId, pin, approvalData)
    → portalAuth.service.verifyPin(sessionId, pin)       // re-auth
    → document.service.validateApproval(version, hash)    // hash match
    → document.repository.createDecision(tx, decisionData)
    → billing.service.generateInstallments(version.items) // calc installments
    → billing.repository.createInstallments(tx, installments)
    → projectLifecycle.service.transition(project, 'approve_quotation')
    → project.repository.updateStatus(tx, projectId, newStatus)
    → activityLog.repository.append(tx, logEntry)
  → revalidatePath → UI updates via RSC
```

## 4. Authentication & Authorization

### 4.1 Admin Auth

| Aspect     | Implementation                                     |
| ---------- | -------------------------------------------------- |
| Login      | Email + password (argon2 hash)                     |
| 2FA        | TOTP (Google Authenticator compatible)             |
| Session    | HTTP-only, Secure, SameSite=Lax cookie; 24h expiry |
| Rate limit | 5 failed attempts → 15 min lockout per IP          |
| Storage    | `users` table (single admin row in production)     |

### 4.2 Portal Auth (Client)

| Aspect      | Implementation                                                                              |
| ----------- | ------------------------------------------------------------------------------------------- |
| Access      | Unique token link per project (128-bit random, hashed in DB, encrypted copy for re-sending) |
| PIN         | 6+ digit, argon2 hash, weak PIN rejection (sequences, repeats)                              |
| First login | Must change system-generated initial PIN                                                    |
| Session     | 30-day HTTP-only cookie tied to portal_link                                                 |
| Re-auth     | PIN re-entry required for: document approval, payment proof upload                          |
| Brute force | 5 wrong PINs → 15 min lock per token; 3 lockouts → frozen until admin reset                 |
| Revocation  | PIN change, PIN reset, or link revocation invalidates all active sessions                   |

### 4.3 Authorization Model

- Admin routes: session cookie + admin user check (middleware)
- Portal routes: session cookie + portal_link ownership check
- Every portal query scoped to the project owned by the authenticated token (IDOR prevention)
- File access: signed URLs with 5-min expiry, scoped to authorized project

## 5. State Machine

9 project statuses with defined transitions:

```
draft
  → quotation_sent (admin sends quotation)
  → cancelled (admin cancels)

quotation_sent
  → draft (client requests changes / admin revises)
  → awaiting_down_payment (client approves quotation)
  → cancelled (admin cancels)

awaiting_down_payment
  → in_progress (admin verifies DP payment)
  → cancelled (admin cancels, DP not received)

in_progress
  → client_review (admin sends deliverables for review)
  → cancelled (admin cancels with reason)

client_review
  → in_progress (client requests revision within quota)
  → handover_sent (admin sends BAST)

handover_sent
  → client_review (client rejects BAST)
  → warranty (client approves BAST → warranty starts)

warranty
  → completed (warranty period ends + all invoices paid)

completed
  (terminal state)

cancelled
  (terminal state)
```

Implementation: `project-lifecycle.service.ts` holds the transition table. Status updates go through `transition(project, action)` which validates the transition is legal and returns the new status. The service is pure logic — the repository handles the DB update within a transaction that also writes to `project_status_histories`.

## 6. Document Immutability

Core business rule: documents are frozen once sent to clients.

| Step                   | What happens                                                                                                                                                                                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Admin creates version  | Content editable, `sent_at` is null                                                                                                                                                                                                            |
| Admin sends version    | `sent_at` set; content serialized as canonical JSON text → SHA-256 hash computed → PDF rendered and stored. DB trigger `BEFORE UPDATE` rejects any change to `content_snapshot`, `content_hash`, or `rendered_pdf_path` once `sent_at` is set. |
| Client views           | Portal serves the frozen snapshot                                                                                                                                                                                                              |
| Client approves        | `document_decisions` records: client name, PIN re-auth, timestamp, version ID, `content_hash` (must match version's hash), IP, user-agent                                                                                                      |
| Changes after approval | Must create new document (Addendum) that references the original                                                                                                                                                                               |

Hash verification: `content_hash = SHA-256(content_snapshot)` where `content_snapshot` is the canonical TEXT stored byte-for-byte (not JSONB, which reorders keys).

## 7. Money & Billing

- **Storage:** BIGINT rupiah (integer, no decimals)
- **Percent:** Integer basis points (5000 = 50.00%, 3333 = 33.33%)
- **Installment rounding:** Round each installment to nearest rupiah; assign remainder to last installment so sum always equals total
- **Invoice numbering:** `INV-{YEAR}-{SEQUENCE}` generated inside a transaction with row-level locking on `number_sequences` table
- **Payment verification:** Client uploads proof → status `pending_verification` → admin verifies → `verified` or `rejected`
- **Invoice status:** `draft`, `sent`, `partially_paid`, `paid`, `overdue`, `cancelled`

## 8. File Storage

- **Location:** Private directory on VPS (outside web root), NOT in public/
- **Access:** API route generates signed URLs with 5-minute expiry
- **Upload validation:** Server-side MIME type check + file size limit (configurable, default 5MB)
- **Metadata:** `files` table stores original name, MIME type, size, hash, uploader, related entity
- **Cleanup:** Orphaned files flagged but not auto-deleted (audit trail preservation)

## 9. Release Strategy

### MVP (18 tables)

- Clients, projects, project lifecycle (9 statuses)
- Documents: Quotation only (documents, document_versions, document_version_items, document_decisions, document_templates)
- Billing: installments, invoices, payments, bank_accounts, number_sequences
- Portal: portal_links, portal_sessions, users
- Common: files, activity_logs
- Admin dashboard + client portal (PIN auth)
- WhatsApp message generation (wa.me links)

### Iteration 2 (+3 tables)

- Progress: milestones, progress_updates
- Revision: revision_requests
- Documents: Addendum, BAST support
- Revision quota tracking (calculated, not stored counter)

### Iteration 3 (+1 table)

- Warranty: warranty_claims
- Auto-flag out-of-scope/out-of-period claims
- Warranty period tracking (dates frozen at BAST approval)

## 10. Deployment Architecture

```
VPS (e.g., IDCloudHost / DigitalOcean)
├── Docker Compose
│   ├── app (Next.js 15 + Node 22)
│   │   ├── Port 3000 (internal)
│   │   ├── Volume: ./uploads:/app/uploads (private files)
│   │   └── Environment: DATABASE_URL, APP_KEY, etc.
│   ├── db (PostgreSQL 18)
│   │   ├── Port 5432 (internal only)
│   │   ├── Volume: pgdata:/var/lib/postgresql/data
│   │   └── Environment: POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD
│   └── (optional) nginx reverse proxy
│       ├── Port 80/443 (public)
│       ├── SSL via Let's Encrypt / Certbot
│       └── Proxy pass to app:3000
└── GitHub Actions CI/CD
    ├── On push to main: build → test → docker build → push to registry
    └── Deploy: SSH to VPS → docker compose pull → docker compose up -d
```

## 11. Security Checklist

- [ ] All portal queries scoped by authenticated token (no IDOR)
- [ ] PIN stored as argon2 hash only
- [ ] Portal link token: 128-bit random, DB stores hash + encrypted copy
- [ ] Token never appears in server logs
- [ ] Session cookies: httpOnly, Secure, SameSite=Lax
- [ ] File uploads: server-side MIME validation, size limits, private storage
- [ ] Signed URLs for file access (5-min expiry)
- [ ] Rate limiting on all auth endpoints
- [ ] CSRF protection via Server Actions (built-in Next.js)
- [ ] Activity log: append-only, DB trigger rejects UPDATE/DELETE
- [ ] Content-Security-Policy headers
- [ ] Environment secrets via Docker env, never in code

## 12. DB Design Translation Notes

The DB Design document uses Laravel conventions. Key translations for Drizzle:

| Laravel Convention                      | Drizzle Equivalent                                                                |
| --------------------------------------- | --------------------------------------------------------------------------------- |
| `$table->id()`                          | `bigserial('id').primaryKey()`                                                    |
| `$table->timestampsTz()`                | `timestamp('created_at', { withTimezone: true })`, `timestamp('updated_at', ...)` |
| `$table->foreignId('x')->constrained()` | `bigint('x').references(() => table.id)`                                          |
| Eloquent `$fillable` / `$casts`         | Drizzle `InferInsertModel<T>` + Zod validation                                    |
| `SoftDeletes`                           | Manual `cancelled_at` / `archived_at` columns (no soft delete trait)              |
| `encrypted` cast                        | Node.js `crypto.createCipheriv` with APP_KEY                                      |
| PHP backed enum                         | TypeScript `const` enum + Drizzle `varchar` + CHECK constraint in migration SQL   |
| `DB::transaction()`                     | `db.transaction(async (tx) => { ... })`                                           |
| Triggers (raw SQL in migration)         | Drizzle `sql` tag in migration files (same raw SQL)                               |

## 13. Open Questions (Carried from PRD)

- [ ] Garansi mulai saat BAST disetujui atau pelunasan? (Current: BAST approval per A5)
- [ ] Batas pembatalan bila DP tidak dibayar: berapa hari?
- [ ] Apakah sistem ini topik tugas akhir? (Affects measurable indicators)
