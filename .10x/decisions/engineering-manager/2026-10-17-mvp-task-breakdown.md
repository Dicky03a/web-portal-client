# Engineering Manager Decision: MVP Task Breakdown

**Date:** 2026-10-17  
**Decision:** Approved  
**Phase:** 3 — Implementation Planning

## Build Order Philosophy

Tasks are ordered so each one is:
1. **Independently testable** — can verify it works before moving on
2. **Builds on previous** — dependencies flow downward
3. **Produces visible progress** — developer gets feedback early

Order: Foundation → Schema → Services → Repositories → Actions → Admin UI → Portal UI → Auth hardening → Files → Testing → Deployment

---

## Task List

### Epic 1: Project Scaffolding (Tasks 1.1–1.5)

**1.1 — Initialize Next.js project**
- `npm create next-app@latest portal-proyek --typescript --tailwind --app --src-dir`
- Configure `tsconfig.json` (strict, noUncheckedIndexedAccess, path alias `@/`)
- Install: `drizzle-orm`, `drizzle-kit`, `postgres` (pg driver), `zod`, `argon2`, `date-fns`, `date-fns-tz`
- Setup `.env.local` with `DATABASE_URL`, `APP_KEY`, `NEXTAUTH_SECRET`
- **Verify:** `npm dev` runs, TypeScript strict compiles

**1.2 — Setup shadcn/ui**
- `npm dlx shadcn@latest init`
- Install base components: Button, Input, Label, Card, Badge, Table, Dialog, Select, Textarea, Tabs, Toast
- Configure dark mode (class-based), font (Inter)
- **Verify:** Component renders in a test page

**1.3 — Setup Drizzle**
- Create `drizzle.config.ts` (PostgreSQL, migrations folder, schema folder)
- Create `src/db/index.ts` (connection pool)
- Create `src/db/schema/` directory with empty barrel export
- **Verify:** `drizzle-kit generate` runs without error

**1.4 — Setup project structure**
- Create all directories per architecture spec:
  - `src/server/{actions,services,repositories,lib}`
  - `src/components/{ui,admin,portal,shared}`
  - `src/lib/`, `src/types/`
- Create shared utilities:
  - `src/lib/format-currency.ts` (formatRupiah)
  - `src/lib/format-date.ts` (formatWIB)
  - `src/lib/constants.ts` (PROJECT_STATUSES, TRANSITIONS)
  - `src/types/result.ts` (Result<T, E> type)
- **Verify:** All imports resolve, no TS errors

**1.5 — Setup linting & formatting**
- ESLint (Next.js config + strict TypeScript rules)
- Prettier
- `lint-staged` + `husky` for pre-commit
- **Verify:** `npm lint` passes, commit hook fires

### Epic 2: Database Schema & Migrations (Tasks 2.1–2.8)

**2.1 — Core tables: users, clients**
- Drizzle schema: `src/db/schema/portal.ts` (users table)
- Drizzle schema: `src/db/schema/project.ts` (clients table)
- SQL migration with CHECK constraints, indexes
- Seed: 1 admin user, 2 sample clients
- **Verify:** `drizzle-kit push` creates tables, seed runs

**2.2 — Projects & status history**
- Drizzle schema: `src/db/schema/project.ts` (projects, project_status_histories)
- SQL migration: status CHECK constraint (9 values), FK indexes, cancel_reason CHECK
- **Verify:** Insert project, verify CHECK rejects invalid status

**2.3 — Documents & versions**
- Drizzle schema: `src/db/schema/document.ts` (documents, document_versions, document_version_items, document_decisions, document_templates)
- SQL migration: BEFORE UPDATE trigger on document_versions (freeze after sent_at)
- `content_snapshot` as TEXT, `content_hash` as CHAR(64)
- **Verify:** Trigger rejects update on frozen version

**2.4 — Billing tables**
- Drizzle schema: `src/db/schema/billing.ts` (installments, invoices, payments, bank_accounts, number_sequences)
- SQL migration: CHECK constraints (amount >= 0, basis_points), FK indexes
- Invoice numbering: number_sequences table with row locking
- **Verify:** Concurrent invoice creation produces unique numbers

**2.5 — Portal access tables**
- Drizzle schema: `src/db/schema/portal.ts` (portal_links, portal_sessions)
- SQL migration: partial unique index (one active link per project), token hash index
- **Verify:** Partial unique index prevents duplicate active links

**2.6 — Common tables**
- Drizzle schema: `src/db/schema/common.ts` (files, activity_logs)
- SQL migration: BEFORE UPDATE/DELETE trigger on activity_logs (append-only)
- **Verify:** UPDATE/DELETE on activity_logs is rejected by trigger

**2.7 — Seed data & factories**
- `src/db/seed.ts`: Admin user, sample clients, sample project in each status
- Test factories for each entity (used in integration tests)
- **Verify:** Full seed runs, all FK relationships valid

**2.8 — Drizzle relations & barrel exports**
- Define Drizzle `relations()` for all tables
- Barrel export in `src/db/schema/index.ts`
- Type exports: `InferSelectModel`, `InferInsertModel` for each table
- **Verify:** Type-safe queries with joins compile

### Epic 3: Core Services (Tasks 3.1–3.6)

**3.1 — Project lifecycle service**
- `src/server/services/project-lifecycle.service.ts`
- Transition table (9 statuses × valid actions)
- `transition(currentStatus, action) → Result<ProjectStatus>`
- Unit tests: every valid transition succeeds, every invalid rejects
- **Verify:** 100% transition coverage in tests

**3.2 — Document service**
- `src/server/services/document.service.ts`
- `serializeCanonical(data) → string` (deterministic JSON text)
- `computeHash(text) → string` (SHA-256 hex)
- `validateApproval(version, clientHash) → Result`
- Unit tests: hash stability, approval validation
- **Verify:** Same input always produces same hash

**3.3 — Billing service**
- `src/server/services/billing.service.ts`
- `calculateInstallments(total, percentages[]) → bigint[]` (remainder to last)
- `calculateInstallmentFromItems(items[]) → { total, installments[] }`
- Unit tests: rounding edge cases, 3-way split of Rp1.000.000
- **Verify:** Sum of installments always equals total

**3.4 — Portal auth service**
- `src/server/services/portal-auth.service.ts`
- `hashPin(pin) → string` (argon2)
- `verifyPin(hash, pin) → boolean`
- `isWeakPin(pin) → boolean` (sequences, repeats)
- `generateInitialPin() → string` (6 digit, not weak)
- Unit tests: weak PIN detection, hash/verify round-trip
- **Verify:** Weak PINs rejected, strong PINs pass

**3.5 — Invoice numbering service**
- `src/server/services/invoice-numbering.service.ts`
- `generateNumber(tx, prefix, year) → string` (with row locking)
- Formats: `INV-2026-0001`, `PRJ-2026-0001`, `QUO-2026-0001`
- Integration test: concurrent generation produces unique numbers
- **Verify:** No duplicate numbers under concurrent access

**3.6 — WhatsApp message service**
- `src/server/services/whatsapp-message.service.ts`
- `generateQuotationMessage(project, portalUrl) → { text, waUrl }`
- `generatePaymentReminderMessage(invoice) → { text, waUrl }`
- `generateApprovalConfirmationMessage(decision) → { text, waUrl }`
- Templates with project name, document number, portal link
- Unit tests: output format validation
- **Verify:** wa.me URLs are properly encoded

### Epic 4: Repositories (Tasks 4.1–4.4)

**4.1 — Project & client repositories**
- CRUD operations for clients (list, get, create, update, archive)
- CRUD for projects (list with filters, get with relations, create, update status)
- Status history append
- **Verify:** Integration tests with test DB

**4.2 — Document repository**
- Create document, create version, get version with items
- Create decision (approval record)
- Freeze version (set sent_at, snapshot, hash)
- Template CRUD
- **Verify:** Frozen version cannot be updated (trigger test)

**4.3 — Billing repository**
- Installment CRUD
- Invoice generation with number sequence (transactional)
- Payment recording (create, verify, reject)
- Queries: unpaid invoices, overdue invoices, monthly revenue summary
- **Verify:** Invoice numbering is sequential and gap-free

**4.4 — Portal repository**
- Portal link CRUD (create, revoke, get by token hash)
- Session management (create, validate, invalidate)
- Rate limiting (track failed attempts, check lockout)
- **Verify:** Revoked link returns null, lockout works

### Epic 5: Server Actions (Tasks 5.1–5.5)

**5.1 — Auth actions**
- `loginAdmin(email, password, totpCode)`
- `logoutAdmin()`
- `verifyPortalPin(token, pin)`
- `changePortalPin(token, oldPin, newPin)`
- **Verify:** Login flow works end-to-end

**5.2 — Project & client actions**
- `createClient(data)`, `updateClient(id, data)`, `archiveClient(id)`
- `createProject(data)`, `cancelProject(id, reason)`
- `getProjectDashboard()` (summary stats)
- **Verify:** Project creation with valid client succeeds

**5.3 — Document actions**
- `createDocument(projectId, type, templateId?)`
- `updateDocumentVersion(versionId, items[])`
- `sendDocumentVersion(versionId)` → freeze + hash + generate portal message
- `approveDocument(token, versionId, pin, approvalData)` → create decision + installments + transition
- `rejectDocument(token, versionId, pin, notes)`
- **Verify:** Full quotation flow: create → send → approve

**5.4 — Billing actions**
- `generateInvoice(installmentId)` → auto-number
- `recordPayment(invoiceId, data)` (admin manual)
- `uploadPaymentProof(token, invoiceId, pin, file)` (client)
- `verifyPayment(paymentId)`, `rejectPayment(paymentId, reason)`
- **Verify:** Payment verification updates invoice status

**5.5 — Activity log actions**
- `getActivityLog(projectId, filters)` (read-only for admin)
- Auto-logging: middleware/wrapper that logs every mutation action
- **Verify:** Every action produces a log entry

### Epic 6: Admin UI (Tasks 6.1–6.7)

**6.1 — Admin layout & navigation**
- Sidebar: Dashboard, Clients, Projects, Invoices, Settings
- Top bar: user info, logout
- Responsive (collapsible sidebar on mobile)
- **Verify:** Navigation works, layout renders

**6.2 — Dashboard page**
- Stats cards: active projects, pending payments, overdue invoices
- Recent activity feed
- Action items: pending approvals, unverified payments
- **Verify:** Dashboard loads with seed data

**6.3 — Client management pages**
- List (search, filter archived)
- Create/edit form
- Detail: client info + project list
- **Verify:** CRUD operations work

**6.4 — Project management pages**
- List (filter by status, search)
- Create form (select client, name, code auto-generated)
- Detail: status badge, timeline, documents, invoices, activity log
- Status transition buttons (context-aware: only show valid actions)
- **Verify:** Status transitions reflected in UI

**6.5 — Document management pages**
- Quotation builder: items table (description, qty, unit price, subtotal)
- Installment scheme editor (N terms, percent allocation)
- Revision/quota/warranty fields
- Preview mode
- Send button → freeze + copy WhatsApp message
- **Verify:** Quotation with 3 items and 2 installments

**6.6 — Invoice & payment pages**
- Invoice list (filter: unpaid, overdue, all)
- Invoice detail: items, amount, due date, payment history
- Payment verification: view proof image, verify/reject buttons
- Monthly revenue summary
- **Verify:** Payment flow from upload to verification

**6.7 — Settings page**
- Bank account management (for invoice display)
- Document templates CRUD
- Admin profile (change password, 2FA setup)
- **Verify:** Bank account shows on invoices

### Epic 7: Portal UI (Tasks 7.1–7.5)

**7.1 — Portal layout & PIN flow**
- Minimal layout (no sidebar, just header with project name)
- PIN entry page
- First-login PIN change flow
- PIN change page
- **Verify:** Full PIN lifecycle works

**7.2 — Project summary page**
- Status badge with description
- Quick stats: total value, paid amount, remaining
- Recent activity
- Navigation to sections: quotation, invoices, (future: progress, revisions, warranty)
- **Verify:** Summary reflects project state

**7.3 — Quotation pages**
- View quotation (rendered from snapshot)
- Approval flow: review items → enter name → check agreement → re-enter PIN → submit
- Rejection with notes
- "Confirm via WhatsApp" button after action
- **Verify:** Approval creates decision + installments + status transition

**7.4 — Invoice & payment pages**
- Invoice list with status badges
- Invoice detail: items, bank account info, amount
- Upload payment proof (with PIN re-auth)
- Payment status tracking
- "Confirm via WhatsApp" after upload
- **Verify:** Upload flow with file validation

**7.5 — Document download**
- PDF download for approved documents
- Signed URL for file access
- **Verify:** PDF downloads match frozen version

### Epic 8: Security Hardening (Tasks 8.1–8.3)

**8.1 — Auth middleware**
- Admin auth middleware (check session cookie, redirect to login)
- Portal auth middleware (check portal session, redirect to PIN entry)
- Rate limiting middleware (per IP for admin, per token for portal)
- **Verify:** Unauthorized access redirected

**8.2 — Security headers & CORS**
- Content-Security-Policy
- X-Frame-Options, X-Content-Type-Options
- Strict-Transport-Security (HTTPS)
- **Verify:** Security headers present in responses

**8.3 — Input sanitization & IDOR prevention**
- All portal queries scoped by authenticated token
- File access scoped by project ownership
- XSS prevention (React handles by default, but verify raw HTML)
- **Verify:** Portal token A cannot access project B's data

### Epic 9: File Handling (Task 9.1)

**9.1 — File upload & signed URL serving**
- Upload endpoint: validate MIME, size, store in private dir
- Signed URL generation (HMAC + expiry)
- API route: verify signature, serve file with proper headers
- **Verify:** Upload → signed URL → download works

### Epic 10: Integration Testing (Task 10.1)

**10.1 — Critical path E2E tests**
- Happy path: create client → create project → create quotation → send → approve → generate invoice → record payment → verify
- Auth: admin login + 2FA, portal PIN lifecycle, brute force lockout
- Edge cases: concurrent invoice numbering, frozen version update rejection
- **Verify:** All E2E tests pass

### Epic 11: Deployment (Tasks 11.1–11.2)

**11.1 — Docker setup**
- `Dockerfile` (multi-stage: build + production)
- `docker-compose.yml` (app + postgres + optional nginx)
- `.env.production` template
- **Verify:** `docker compose up` runs the app

**11.2 — CI/CD pipeline**
- GitHub Actions: lint → test → build → docker push
- Deploy script: SSH to VPS → pull → up
- **Verify:** Push to main triggers deploy

---

## Summary

| Epic | Tasks | Estimated Complexity |
|------|-------|---------------------|
| 1. Scaffolding | 5 | Low |
| 2. DB Schema | 8 | High (triggers, constraints) |
| 3. Services | 6 | Medium (pure logic) |
| 4. Repositories | 4 | Medium |
| 5. Actions | 5 | Medium |
| 6. Admin UI | 7 | High (many pages) |
| 7. Portal UI | 5 | Medium |
| 8. Security | 3 | Medium |
| 9. Files | 1 | Low |
| 10. Testing | 1 | Medium |
| 11. Deployment | 2 | Low |
| **Total** | **47 tasks** | |
