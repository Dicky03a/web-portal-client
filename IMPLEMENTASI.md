# Panduan Implementasi — Portal Proyek Jasa Website

## Cara Pakai

File ini terbagi dua bagian:

1. **Fase 0 (Claude Desktop)** — Jalankan skill-skill design pipeline di Claude Desktop (chat biasa) untuk menghasilkan dokumen desain yang akan menjadi panduan UI.
2. **Fase 1–11 (Claude Code)** — Copy-paste prompt per epic ke terminal Claude Code.

> **Penting:** Fase 0 WAJIB dilakukan duluan. Dokumen yang dihasilkan (UX.md, COPY.md, FIXTURES.md, DESIGN.md) akan direferensikan oleh prompt di Fase 1–11.

---

## Prasyarat

Pastikan sudah terinstal:

- Node.js 22 LTS (`node -v`)
- npm 9.x (`npm -v`). Install: `npm install -g npm`
- Git (`git -v`)
- Docker Desktop (untuk Epic 11)
- PostgreSQL 18 (untuk dev lokal, atau pakai Docker)
- Pencil by pen.dev (untuk referensi design — sudah ada file portal-jasa-website.pen)

---

## FASE 0 — Design Pipeline (Claude Desktop)

> Jalankan di **Claude Desktop** (bukan Claude Code). Setiap langkah menghasilkan file .md yang disimpan ke `D:\web-portal-client\portal-proyek\docs\design\`.

### Langkah 0.1 — Generate UX.md (Skill: /to-ux)

Paste di Claude Desktop:

```
/to-ux

Sumber PRD: File "PRD — Portal Proyek Jasa Website.md" yang sudah ada (58 user stories, state machine, business rules).

Sumber desain: Buka file Pencil portal-jasa-website.pen di C:/Users/dicky/.pencil/documents/0c3eaf24-edf7-4544-9def-831705b72f8e/ untuk referensi visual yang sudah jadi.

Hasilkan UX.md dengan:
- Screen inventory lengkap (admin + portal client)
- User flows untuk setiap role
- Navigation structure
- Per-screen behavior, states, edge cases
- Traceability matrix ke user stories PRD

Simpan output ke: D:\web-portal-client\portal-proyek\docs\design\UX.md
```

### Langkah 0.2 — Generate COPY.md (Skill: /to-copy)

```
/to-copy

Sumber: UX.md yang baru dibuat di D:\web-portal-client\portal-proyek\docs\design\UX.md dan PRD Portal Proyek.

Sumber desain: Buka file Pencil portal-jasa-website.pen di C:/Users/dicky/.pencil/documents/0c3eaf24-edf7-4544-9def-831705b72f8e/ untuk mengambil teks UI yang sudah ada di wireframe.

Hasilkan COPY.md berisi:
- Semua teks UI (judul, label, tombol, placeholder) — Bahasa Indonesia
- Empty states setiap halaman
- Error messages (validasi, auth, permission)
- Confirmation dialogs
- Toast/notification messages
- Microcopy (tooltip, helper text)

Simpan output ke: D:\web-portal-client\portal-proyek\docs\design\COPY.md
```

### Langkah 0.3 — Generate FIXTURES.md (Skill: /to-fixtures)

```
/to-fixtures

Sumber: UX.md dan COPY.md di D:\web-portal-client\portal-proyek\docs\design/.

Hasilkan FIXTURES.md berisi sample data realistis untuk konteks freelance web development Indonesia:
- Clients: 5 orang/perusahaan (nama Indonesia, PT/CV, no HP 08xx)
- Projects: 5 proyek di berbagai status (draft sampai completed)
- Quotation items: fitur-fitur website nyata (landing page, admin panel, integrasi payment gateway, dll)
- Harga: dalam Rupiah (range Rp 3jt - Rp 50jt)
- Invoices: nomor format INV-2026-NNNN
- Bank accounts: BCA, BRI, Mandiri
- Edge cases: nama panjang, list kosong, angka besar

Simpan output ke: D:\web-portal-client\portal-proyek\docs\design\FIXTURES.md
```

### Langkah 0.4 — Generate DESIGN.md (Skill: /create-design-md)

```
/create-design-md

Sumber: UX.md, COPY.md, FIXTURES.md di D:\web-portal-client\portal-proyek\docs\design/.

Sumber desain: Buka file Pencil portal-jasa-website.pen di C:/Users/dicky/.pencil/documents/0c3eaf24-edf7-4544-9def-831705b72f8e/ untuk mengambil visual theme yang sudah dirancang.

Context: App ini pakai shadcn/ui + Tailwind CSS. Hasilkan DESIGN.md berisi:
- Design tokens (warna, typography, spacing, radius, shadow) — sesuaikan dengan shadcn/ui defaults
- Color palette: primary, secondary, destructive, muted, accent, card, popover
- Responsive breakpoints dan rules
- Component patterns (form layout, table, card, status badge)
- Accessibility rules (contrast, focus, ARIA)
- Status badge color mapping untuk 9 project statuses

Simpan output ke: D:\web-portal-client\portal-proyek\docs\design\DESIGN.md
```

### Langkah 0.5 — Export Referensi Visual dari Pencil

```
Buka file Pencil portal-jasa-website.pen di C:/Users/dicky/.pencil/documents/0c3eaf24-edf7-4544-9def-831705b72f8e/.

Export setiap screen/page yang ada sebagai gambar PNG ke folder:
D:\web-portal-client\portal-proyek\docs\design\screens\

Beri nama file sesuai halaman:
- admin-login.png
- admin-dashboard.png
- admin-clients.png
- admin-project-detail.png
- admin-quotation-builder.png
- admin-invoices.png
- portal-pin-entry.png
- portal-dashboard.png
- portal-quotation.png
- portal-invoices.png
- (dan halaman lain yang ada di wireframe)

Ini akan jadi referensi visual saat coding UI di Claude Code.
```

---

## FASE 1–11 — Implementasi (Claude Code)

> Buka terminal di `D:\web-portal-client\portal-proyek`, jalankan `claude`.
> Claude Code akan membaca CLAUDE.md otomatis untuk konteks proyek.

---

## Epic 1 — Project Scaffolding (5 tasks)

### Prompt 1.1–1.3: Inisialisasi Project

```
Baca file berikut untuk konteks penuh:
- .10x/decisions/engineering-manager/2026-10-17-mvp-task-breakdown.md (task list)
- .10x/decisions/staff-engineer/2026-10-17-implementation-standards.md (coding standards)
- .10x/decisions/cto/2026-10-17-stack-decision.md (stack details)

Kerjakan Task 1.1, 1.2, dan 1.3 secara berurutan:

**Task 1.1 — Initialize Next.js project:**
- Jalankan: npm create next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
- Configure tsconfig.json: strict: true, noUncheckedIndexedAccess: true
- Install dependencies: drizzle-orm drizzle-kit postgres zod argon2 date-fns date-fns-tz
- Install dev: @types/node
- Setup .env.local dengan template (DATABASE_URL, APP_KEY, NEXT_PUBLIC_APP_URL)
- Setup .gitignore (tambahkan .env.local, .env.production)

**Task 1.2 — Setup shadcn/ui:**
- Jalankan: npm dlx shadcn@latest init
- Install komponen: Button, Input, Label, Card, Badge, Table, Dialog, Select, Textarea, Tabs, Toast, Separator, DropdownMenu, Sheet
- Pastikan font Inter, tanpa dark mode (light only)

**Task 1.3 — Setup Drizzle:**
- Buat drizzle.config.ts (PostgreSQL, migrations folder: src/db/migrations, schema folder: src/db/schema)
- Buat src/db/index.ts (connection pool pakai postgres driver)
- Buat src/db/schema/ directory dengan barrel export index.ts

Verify: npm dev runs, TypeScript strict compiles, shadcn Button renders.
```

### Prompt 1.4: Project Structure & Shared Utilities

```
Kerjakan Task 1.4 — Setup project structure.

Baca:
- .10x/specs/2026-10-17-portal-proyek-design.md (architecture spec)
- .10x/decisions/staff-engineer/2026-10-17-implementation-standards.md (naming & patterns)
- .10x/decisions/architect/2026-10-17-architecture-patterns.md (layered architecture)

Buat semua directory:
- src/server/{actions,services,repositories,lib}
- src/components/{ui,admin,portal,shared}
- src/lib/
- src/types/

Buat shared utilities:
1. src/types/result.ts — Result<T, E> type (lihat contoh di implementation standards)
2. src/lib/format-currency.ts — formatRupiah(amount: bigint): string, parseRupiah(str: string): bigint
3. src/lib/format-date.ts — formatWIB(date: Date): string, formatDateWIB(date: Date): string (pakai date-fns-tz, timezone Asia/Jakarta)
4. src/lib/constants.ts — PROJECT_STATUSES array, TRANSITIONS map (status → allowed next statuses), DOCUMENT_TYPES, PAYMENT_METHODS
5. src/server/lib/hash.ts — computeContentHash(text: string): string (SHA-256 hex)
6. src/server/lib/token.ts — generateToken(): string (128-bit random hex), hashToken(token: string): string

Setiap file harus punya JSDoc comment. Verify: semua import resolve, no TS errors.
```

### Prompt 1.5: Linting & Formatting

```
Kerjakan Task 1.5 — Setup linting & formatting.

- Setup ESLint dengan Next.js config + strict TypeScript rules
- Setup Prettier (printWidth: 100, singleQuote: true, semi: true, trailingComma: 'all')
- Setup .prettierignore (node_modules, .next, dist, npm-lock.yaml)
- Tambahkan scripts di package.json: "lint", "lint:fix", "format", "format:check"
- Setup lint-staged + husky untuk pre-commit hook (lint + format staged files)
- Jalankan lint dan fix semua yang perlu diperbaiki
- Init git repository: git init, buat initial commit

Verify: npm lint passes, commit hook fires saat git commit.
```

---

## Epic 2 — Database Schema & Migrations (8 tasks)

> **Review otomatis:** Setelah semua schema selesai, gunakan agent `backend-design:schema-reviewer` untuk review. Lihat prompt review di akhir Epic 2.

### Prompt 2.1–2.2: Core Tables

```
Baca file berikut:
- .10x/decisions/engineering-manager/2026-10-17-mvp-task-breakdown.md (task 2.1-2.2)
- .10x/decisions/senior-engineer/2026-10-17-implementation-notes.md (Drizzle mapping, gotchas)
- .10x/specs/2026-10-17-portal-proyek-design.md (section: Database)

Kerjakan Task 2.1 dan 2.2:

**Task 2.1 — Core tables: users, clients**
- Drizzle schema src/db/schema/portal.ts: tabel users (id bigserial PK, email varchar(255) unique, name varchar(100), password_hash varchar(255), totp_secret varchar(255) nullable, totp_enabled boolean default false, timestamps)
- Drizzle schema src/db/schema/project.ts: tabel clients (id bigserial PK, name varchar(100), company_name varchar(150) nullable, email varchar(255), phone varchar(20), address text nullable, notes text nullable, archived_at timestamptz nullable, timestamps)

**Task 2.2 — Projects & status history**
- Tambah di src/db/schema/project.ts: tabel projects (id, client_id FK, code varchar(20) unique, name varchar(150), description text nullable, status varchar(32) default 'draft' + CHECK 9 values, total_value bigint nullable, revision_quota smallint default 0, warranty_days smallint default 0, started_at, deadline, completed_at, cancelled_at, cancel_reason, timestamps)
- Tabel project_status_histories (id, project_id FK, from_status, to_status, changed_by_user_id FK nullable, notes, created_at)

Gunakan mode: 'number' untuk FK bigint, mode: 'bigint' untuk money columns. Tambahkan CHECK constraints dan indexes.

Verify: drizzle-kit generate berhasil, tables terbuat di database.
```

### Prompt 2.3: Documents & Versions

```
Kerjakan Task 2.3 — Documents & versions.

Baca .10x/decisions/senior-engineer/2026-10-17-implementation-notes.md terutama bagian Trigger dan Content Hash.

Buat Drizzle schema src/db/schema/document.ts:
- documents (id, project_id FK, type varchar(32) CHECK quotation/invoice/addendum/bast, latest_version_id nullable, created_by_user_id FK, timestamps)
- document_versions (id, document_id FK, version_number smallint, content_snapshot text, content_hash char(64), notes text nullable, sent_at timestamptz nullable, rendered_pdf_path varchar(500) nullable, created_by_user_id FK, timestamps)
- document_version_items (id, document_version_id FK, sort_order smallint, description varchar(500), quantity smallint default 1, unit varchar(20) default 'unit', unit_price bigint mode 'bigint', subtotal bigint mode 'bigint', timestamps)
- document_decisions (id, document_version_id FK, decision varchar(20) CHECK approved/rejected, decided_by_name varchar(100), decided_by_title varchar(100) nullable, client_hash char(64), ip_address inet, user_agent text nullable, notes text nullable, created_at)
- document_templates (id, name varchar(100), type varchar(32), template_fields jsonb, is_active boolean default true, timestamps)

SQL migration WAJIB berisi trigger fn_freeze_document_version (BEFORE UPDATE ON document_versions — tolak perubahan content jika sent_at sudah diisi). Salin SQL trigger dari implementation notes.

Verify: INSERT version → SET sent_at → UPDATE content_snapshot harus ditolak oleh trigger.
```

### Prompt 2.4: Billing Tables

```
Kerjakan Task 2.4 — Billing tables.

Buat Drizzle schema src/db/schema/billing.ts:
- installments (id, project_id FK, installment_number smallint, label varchar(100), percentage_basis_points smallint CHECK 0-10000, amount bigint mode 'bigint', due_on date nullable, paid_at timestamptz nullable, timestamps)
- invoices (id, installment_id FK, invoice_number varchar(30) unique, amount bigint mode 'bigint', issued_at timestamptz, due_at timestamptz, paid_at timestamptz nullable, status varchar(20) default 'unpaid' CHECK unpaid/pending_verification/paid/cancelled, notes text nullable, timestamps)
- payments (id, invoice_id FK, amount bigint mode 'bigint', payment_method varchar(30), payment_date date, reference_number varchar(100) nullable, proof_file_path varchar(500) nullable, status varchar(20) default 'pending' CHECK pending/verified/rejected, verified_by_user_id FK nullable, verified_at timestamptz nullable, rejection_reason text nullable, notes text nullable, timestamps)
- bank_accounts (id, bank_name varchar(100), account_number varchar(30), account_holder varchar(100), is_active boolean default true, timestamps)
- number_sequences (id, prefix varchar(10), year smallint, last_value integer default 0, UNIQUE(prefix, year))

SQL migration: CHECK constraints untuk semua amount >= 0 dan basis_points 0-10000.

Verify: tables terbuat, constraints work.
```

### Prompt 2.5–2.6: Portal & Common Tables

```
Kerjakan Task 2.5 dan 2.6:

**Task 2.5 — Portal access tables**
Tambah di src/db/schema/portal.ts:
- portal_links (id, project_id FK, token_hash char(64) unique, encrypted_token text, pin_hash varchar(255), is_pin_changed boolean default false, failed_attempts smallint default 0, locked_until timestamptz nullable, lockout_count smallint default 0, revoked_at timestamptz nullable, expires_at timestamptz, created_by_user_id FK, timestamps)
- portal_sessions (id, portal_link_id FK, session_token_hash char(64) unique, ip_address inet, user_agent text, expires_at timestamptz, created_at)

SQL migration WAJIB berisi:
- Partial unique index: CREATE UNIQUE INDEX idx_portal_links_active_project ON portal_links(project_id) WHERE revoked_at IS NULL;
- Index pada token_hash dan session_token_hash

**Task 2.6 — Common tables**
Buat src/db/schema/common.ts:
- files (id, project_id FK nullable, filename varchar(255), original_name varchar(255), mime_type varchar(100), size_bytes integer, storage_path varchar(500), uploaded_by varchar(50) default 'admin', timestamps)
- activity_logs (id, project_id FK nullable, actor_type varchar(20) CHECK admin/client/system, actor_id bigint nullable, action varchar(100), entity_type varchar(50), entity_id bigint nullable, metadata jsonb nullable, ip_address inet nullable, created_at)

SQL migration WAJIB berisi trigger fn_protect_activity_logs (BEFORE UPDATE/DELETE — tolak semua, append-only). Salin trigger dari implementation notes.

Verify: UPDATE/DELETE pada activity_logs harus ditolak. Partial unique index mencegah 2 active portal links untuk 1 project.
```

### Prompt 2.7–2.8: Seed Data & Relations

```
Kerjakan Task 2.7 dan 2.8:

**Task 2.7 — Seed data & factories**
Baca docs/design/FIXTURES.md untuk sample data yang sudah disiapkan. Gunakan data dari sana — JANGAN buat data dummy sendiri.

Buat src/db/seed.ts:
- 1 admin user (email: admin@portal.local, password: hashed "password123")
- Clients, projects, documents, invoices — ambil dari FIXTURES.md
- Buat test factory functions di src/db/factories/ untuk setiap entity

Tambahkan script di package.json: "db:seed": "tsx src/db/seed.ts"

**Task 2.8 — Drizzle relations & barrel exports**
- Define Drizzle relations() untuk semua tabel (one-to-many, many-to-one)
- Barrel export di src/db/schema/index.ts
- Type exports: InferSelectModel dan InferInsertModel di src/types/db.ts

Verify: Full seed runs tanpa error, semua FK relationships valid.
```

### Prompt 2.R: Schema Review (Agent)

```
Gunakan agent backend-design:schema-reviewer untuk review seluruh database schema.

Review semua file di src/db/schema/ dan src/db/migrations/ terhadap:
- .10x/specs/2026-10-17-portal-proyek-design.md (expected design)
- .10x/decisions/senior-engineer/2026-10-17-implementation-notes.md (constraints & triggers)

Fokus review:
- Missing constraints atau indexes
- Weak types (varchar terlalu pendek/panjang)
- FK tanpa index
- Migration safety (lock duration, data backfill)
- Money columns harus BIGINT bukan DECIMAL
- Trigger fn_freeze dan fn_protect sudah benar

Fix semua temuan sebelum lanjut ke Epic 3.
```

---

## Epic 3 — Core Services (6 tasks)

> **Agent:** Setelah services selesai, gunakan `backend-design:component-architect` untuk review arsitektur service layer.

### Prompt 3.1–3.3: Business Logic Services

```
Baca:
- .10x/decisions/architect/2026-10-17-architecture-patterns.md (service pattern — pure functions, Result<T,E>)
- .10x/decisions/senior-engineer/2026-10-17-implementation-notes.md (edge cases & gotchas)

Kerjakan Task 3.1, 3.2, dan 3.3:

**Task 3.1 — Project lifecycle service**
src/server/services/project-lifecycle.service.ts
- TRANSITIONS map: setiap status → array of valid next statuses (lihat src/lib/constants.ts)
- canTransition(currentStatus, targetStatus): boolean
- transition(currentStatus, targetStatus): Result<ProjectStatus, 'INVALID_TRANSITION'>
- getAvailableActions(currentStatus): ProjectStatus[]
- Unit test: src/server/services/__tests__/project-lifecycle.test.ts
  - Test setiap valid transition berhasil
  - Test setiap invalid transition ditolak

**Task 3.2 — Document service**
src/server/services/document.service.ts
- serializeCanonical(data: Record<string, unknown>): string — sort keys, JSON.stringify
- computeHash(text: string): string — SHA-256 hex
- validateApproval(contentSnapshot: string, storedHash: string, clientHash: string): Result<void, 'VERSION_TAMPERED' | 'HASH_MISMATCH'>
- Unit test: hash stability, approval validation

**Task 3.3 — Billing service**
src/server/services/billing.service.ts
- calculateInstallments(totalAmount: bigint, percentages: number[]): bigint[] — remainder ke termin terakhir
- validateInstallmentPercentages(percentages: number[]): Result<void, 'INVALID_TOTAL'> — total harus = 10000 basis points
- Unit test: rounding edge cases, 3-way split Rp1.000.001, sum selalu = total

Semua service TIDAK boleh import dari db/ atau repositories/. Pure functions only.
```

### Prompt 3.4–3.6: Auth & Utility Services

```
Kerjakan Task 3.4, 3.5, dan 3.6:

**Task 3.4 — Portal auth service**
src/server/services/portal-auth.service.ts
- hashPin(pin: string): Promise<string> — argon2 hash
- verifyPin(hash: string, pin: string): Promise<boolean>
- isWeakPin(pin: string): boolean — tolak: 6 digit sama (111111), sequential (123456, 654321), tahun lahir umum (199x, 200x)
- generateInitialPin(): string — 6 digit random, bukan weak
- checkRateLimit(failedAttempts, lockedUntil, lockoutCount): Result<void, 'LOCKED_TEMPORARILY' | 'FROZEN_ADMIN_RESET_REQUIRED'>
- Unit test: weak PIN detection, hash/verify round-trip, rate limit logic

**Task 3.5 — Invoice numbering service**
src/server/services/invoice-numbering.service.ts
- generateNumber(tx: Transaction, prefix: string, year: number): Promise<string>
- Format: INV-2026-0001, QUO-2026-0001
- HARUS pakai SELECT ... FOR UPDATE (lihat implementation notes)

**Task 3.6 — WhatsApp message service**
src/server/services/whatsapp-message.service.ts
- generateQuotationMessage(projectName, documentNumber, portalUrl): { text, waUrl }
- generatePaymentReminderMessage(invoiceNumber, amount: bigint, dueDate): { text, waUrl }

Baca docs/design/COPY.md untuk template teks pesan WhatsApp yang sudah disiapkan (jika ada).

waUrl format: https://wa.me/?text={encodedText}. Unit test: URL encoding benar.
```

### Prompt 3.R: Architecture Review (Agent)

```
Gunakan agent backend-design:component-architect untuk review service layer.

Review semua file di src/server/services/ terhadap:
- .10x/decisions/architect/2026-10-17-architecture-patterns.md (service harus pure, no DB import)
- .10x/decisions/senior-engineer/2026-10-17-implementation-notes.md (edge cases)

Cek:
- Apakah semua service pure functions (no side effects, no DB calls)?
- Apakah semua return Result<T, E>?
- Apakah edge cases (rounding, concurrent access, hash collision) sudah di-handle?
- Apakah unit tests comprehensive?

Fix semua temuan.
```

---

## Epic 4 — Repositories (4 tasks)

### Prompt 4.1–4.2: Project & Document Repositories

```
Baca .10x/decisions/architect/2026-10-17-architecture-patterns.md — repositories handle database queries only, no business logic.

Kerjakan Task 4.1 dan 4.2:

**Task 4.1 — Project & client repositories**
src/server/repositories/client.repository.ts:
- findAll(filters?: { search?, includeArchived? }): paginated client list
- findById(id): client or null
- create(data): client
- update(id, data): client
- archive(id): void

src/server/repositories/project.repository.ts:
- findAll(filters?: { status?, clientId?, search? }): project list with client join
- findById(id): project with client, documents, installments
- create(data): project
- updateStatus(id, newStatus, changedBy, notes?): void — also insert status history
- getDashboardStats(): { activeCount, pendingPayments, overdueInvoices, totalRevenue }

**Task 4.2 — Document repository**
src/server/repositories/document.repository.ts:
- findByProjectId(projectId): documents with latest version
- findVersionById(versionId): version with items
- createDocument(data): document
- createVersion(data, items[]): version
- freezeVersion(versionId, snapshot, hash): void — set sent_at = now
- createDecision(data): decision

Verify: TypeScript compiles, query patterns correct.
```

### Prompt 4.3–4.4: Billing & Portal Repositories

```
Kerjakan Task 4.3 dan 4.4:

**Task 4.3 — Billing repository**
src/server/repositories/billing.repository.ts:
- createInstallments(projectId, installments[]): void
- findByProjectId(projectId): installments with invoices
- createInvoice(data): invoice (gunakan invoice numbering service + transaction row lock)
- findInvoiceById(id): invoice with payments
- findUnpaidInvoices(): overdue invoices
- createPayment(data): payment
- updatePaymentStatus(paymentId, status, verifiedBy?, reason?): void
- getMonthlyRevenue(year): { month, total }[]

**Task 4.4 — Portal repository**
src/server/repositories/portal.repository.ts:
- createLink(data): link
- findByTokenHash(tokenHash): link with project or null
- revokeLink(id): void
- updateFailedAttempts(id, attempts, lockedUntil?, lockoutCount?): void
- createSession(data): session
- findSessionByTokenHash(sessionTokenHash): session with link or null
- invalidateSession(id): void — delete row

Verify: semua queries type-safe, FK joins benar.
```

---

## Epic 5 — Server Actions (5 tasks)

### Prompt 5.1–5.2: Auth & Project Actions

```
Baca .10x/decisions/architect/2026-10-17-architecture-patterns.md — Actions = entry point: Zod validation, transaction boundary, call services + repos, return Result.

Kerjakan Task 5.1 dan 5.2:

**Task 5.1 — Auth actions**
src/server/actions/auth.action.ts:
- loginAdmin(formData: { email, password, totpCode? }): Result — validate, check TOTP if enabled, create session cookie (httpOnly, secure, sameSite: lax, 24h)
- logoutAdmin(): void — clear session cookie
- getCurrentAdmin(): AdminUser | null

src/server/actions/portal-auth.action.ts:
- verifyPortalPin(token, pin): Result — find link by token hash, check rate limit, verify PIN, create portal session cookie (30 days)
- changePortalPin(token, oldPin, newPin): Result

Buat Zod schemas untuk setiap action input.

**Task 5.2 — Project & client actions**
src/server/actions/client.action.ts:
- createClient, updateClient, archiveClient, getClients

src/server/actions/project.action.ts:
- createProject(formData): Result<Project> — auto-generate code (PRJ-YYYY-NNNN)
- cancelProject(id, reason): Result — validate transition, log
- getProjectDashboard(): DashboardStats

Semua mutation actions HARUS log ke activity_logs.
```

### Prompt 5.3–5.5: Document, Billing & Activity Actions

```
Kerjakan Task 5.3, 5.4, dan 5.5:

**Task 5.3 — Document actions**
src/server/actions/document.action.ts:
- createDocument(projectId, type, templateId?): Result<Document>
- updateDocumentVersion(versionId, items[]): Result — only if not frozen
- sendDocumentVersion(versionId): Result<{ waMessage }> — freeze, compute hash, transition project, generate WhatsApp message
- approveDocument(token, versionId, pin, approvalData): Result — 1 transaction: verify PIN, verify hash, create decision, create installments, transition status
- rejectDocument(token, versionId, pin, notes): Result

**Task 5.4 — Billing actions**
src/server/actions/billing.action.ts:
- generateInvoice(installmentId): Result<Invoice> — auto-number + row lock
- recordPayment(invoiceId, paymentData): Result — admin manual
- uploadPaymentProof(token, invoiceId, pin, file): Result — client upload
- verifyPayment(paymentId): Result — verify, check all paid → transition
- rejectPayment(paymentId, reason): Result

**Task 5.5 — Activity log actions**
src/server/actions/activity-log.action.ts:
- getActivityLog(projectId, filters?): PaginatedResult
- Helper: withActivityLog(action, metadata) — auto-log wrapper

Verify: semua actions compile, Zod schemas validate correctly.
```

---

## Epic 6 — Admin UI (7 tasks)

> **Referensi Visual WAJIB:** Setiap halaman admin HARUS mengacu pada:
>
> 1. File Pencil: `portal-jasa-website.pen` — buka via Pencil app untuk melihat wireframe
> 2. Screenshot: `docs/design/screens/admin-*.png` (dari Fase 0.5)
> 3. Design tokens: `docs/design/DESIGN.md`
> 4. Teks UI: `docs/design/COPY.md`
> 5. Sample data: `docs/design/FIXTURES.md`

### Prompt 6.1–6.2: Layout & Dashboard

```
Kerjakan Task 6.1 dan 6.2.

PENTING — Referensi visual:
- Baca docs/design/DESIGN.md untuk design tokens (warna, spacing, typography)
- Baca docs/design/COPY.md untuk semua teks UI (label, tombol, placeholder)
- Baca docs/design/FIXTURES.md untuk sample data yang ditampilkan
- Lihat screenshots di docs/design/screens/admin-dashboard.png dan admin-layout.png (kalau ada) untuk referensi layout

**Task 6.1 — Admin layout & navigation**
src/app/(admin)/layout.tsx:
- Sidebar: logo, nav items (Dashboard, Klien, Proyek, Invoice, Template, Pengaturan) — ambil label dari COPY.md
- Top bar: admin name, logout button
- Responsive: collapsible sidebar on mobile (Sheet component)
- Auth guard: redirect ke /login jika belum login
- Warna dan spacing: sesuai DESIGN.md tokens

src/app/(admin)/login/page.tsx:
- Login form: email, password, TOTP code (conditional)
- Error handling with toast — pesan error dari COPY.md

**Task 6.2 — Dashboard page**
src/app/(admin)/dashboard/page.tsx:
- Stats cards (Server Component): proyek aktif, pembayaran tertunda, invoice jatuh tempo, pendapatan bulan ini
- Recent activity feed (5 terbaru)
- Quick action buttons: Klien Baru, Proyek Baru
- Data dari getProjectDashboard() — tampilkan sample data dari FIXTURES.md saat dev

Verify: layout responsive, semua teks sesuai COPY.md, warna sesuai DESIGN.md.
```

### Prompt 6.3–6.4: Client & Project Management

```
Kerjakan Task 6.3 dan 6.4.

Referensi: docs/design/COPY.md (teks), docs/design/DESIGN.md (visual), docs/design/screens/admin-clients.png, admin-project-detail.png.

**Task 6.3 — Client management pages**
- src/app/(admin)/clients/page.tsx — List: search, filter archived, table (nama/email/telepon/jumlah proyek), tombol buat baru
- src/app/(admin)/clients/new/page.tsx — Create form
- src/app/(admin)/clients/[id]/page.tsx — Detail: info card, project list, edit & archive buttons
- src/app/(admin)/clients/[id]/edit/page.tsx — Edit form

**Task 6.4 — Project management pages**
- src/app/(admin)/projects/page.tsx — List: filter status (tabs), search, table (kode/nama/klien/status badge/nilai)
- src/app/(admin)/projects/new/page.tsx — Create form: select client, project name, description
- src/app/(admin)/projects/[id]/page.tsx — Detail:
  - Status badge + available transition buttons (context-aware: hanya tampilkan aksi valid)
  - Timeline (status history)
  - Tabs: Dokumen, Invoice, Log Aktivitas
  - Portal link: generate/revoke, copy URL, tombol kirim WhatsApp

Status badge colors: ambil mapping dari DESIGN.md (9 statuses → 9 warna).
Label tombol dan placeholder: ambil dari COPY.md.
```

### Prompt 6.5: Document Builder (Quotation)

```
Kerjakan Task 6.5 — Quotation builder. Ini halaman paling kompleks.

Referensi: docs/design/screens/admin-quotation-builder.png, docs/design/COPY.md, docs/design/FIXTURES.md.

src/app/(admin)/projects/[id]/documents/new/page.tsx dan [docId]/page.tsx:

**Quotation Builder UI:**
- Document type selector (quotation/addendum/bast) — MVP fokus quotation
- Items table (dynamic rows):
  - Columns: No, Deskripsi (textarea), Qty (number), Satuan (text), Harga Satuan (currency input), Subtotal (auto-calc)
  - Add row / remove row buttons
  - Grand total auto-calculated
  - Sample items: ambil dari FIXTURES.md (contoh: "Desain Landing Page", "Integrasi Payment Gateway")
- Installment scheme editor:
  - N termin (default 2: DP 50%, Pelunasan 50%)
  - Per termin: label, percentage (basis points), calculated amount
  - Validation: total percentage = 100% (10000 basis points)
- Additional fields: revision_quota, warranty_days
- Preview mode: rendered quotation view
- Action buttons:
  - Simpan Draf — simpan tanpa freeze
  - Kirim ke Klien — freeze version, generate WhatsApp message, show copy button
  - Label tombol dari COPY.md

Format currency input: typing tampil angka, blur format Rp (pakai formatRupiah).
```

### Prompt 6.6–6.7: Invoice & Settings

```
Kerjakan Task 6.6 dan 6.7.

Referensi: docs/design/screens/admin-invoices.png, docs/design/COPY.md, docs/design/DESIGN.md.

**Task 6.6 — Invoice & payment pages**
- src/app/(admin)/invoices/page.tsx — List: filter tabs (Semua/Belum Bayar/Jatuh Tempo/Lunas), table
- src/app/(admin)/invoices/[id]/page.tsx — Detail:
  - Invoice info: nomor, amount (formatRupiah), tanggal terbit/jatuh tempo, status badge
  - Info rekening bank
  - Payment history list
  - If pending_verification: tampilkan bukti bayar, tombol Verifikasi/Tolak
  - Tombol Generate Invoice dari installment

**Task 6.7 — Settings page**
- src/app/(admin)/settings/page.tsx — Tabs:
  - Rekening Bank: list, add, edit, toggle active
  - Template Dokumen: list, create, edit
  - Profil: ganti password, setup/disable TOTP 2FA

Label, placeholder, pesan: semua dari COPY.md.
```

---

## Epic 7 — Portal UI (5 tasks)

> **Referensi Visual WAJIB:**
>
> 1. Screenshots: `docs/design/screens/portal-*.png`
> 2. Design tokens: `docs/design/DESIGN.md`
> 3. Teks UI: `docs/design/COPY.md` (section Portal)
> 4. Sample data: `docs/design/FIXTURES.md`

### Prompt 7.1–7.2: Portal Layout & Summary

```
Kerjakan Task 7.1 dan 7.2.

Referensi: docs/design/screens/portal-pin-entry.png, portal-dashboard.png, docs/design/COPY.md, docs/design/DESIGN.md.

**Task 7.1 — Portal layout & PIN flow**
src/app/(portal)/layout.tsx:
- Minimal layout: header with project name, no sidebar
- Auth guard: redirect ke PIN entry jika belum login

src/app/(portal)/[token]/page.tsx — PIN entry:
- 6-digit PIN input (6 individual input boxes, auto-focus next)
- Error messages dari COPY.md: wrong PIN, locked, frozen
- Rate limit feedback

src/app/(portal)/[token]/change-pin/page.tsx:
- First login: forced PIN change
- Form: old PIN, new PIN, confirm new PIN
- Weak PIN validation (client-side + server-side)
- Pesan error dari COPY.md

**Task 7.2 — Project summary page**
src/app/(portal)/[token]/dashboard/page.tsx:
- Project name, status badge with description
- Quick stats: total nilai, sudah dibayar, sisa pembayaran (formatRupiah)
- Recent activity (client-visible only)
- Navigation cards: Lihat Quotation, Lihat Invoice

Semua teks Bahasa Indonesia, ambil dari COPY.md.
```

### Prompt 7.3–7.5: Quotation Approval & Payment

```
Kerjakan Task 7.3, 7.4, dan 7.5.

Referensi: docs/design/screens/portal-quotation.png, portal-invoices.png, docs/design/COPY.md.

**Task 7.3 — Quotation approval (client portal)**
src/app/(portal)/[token]/quotation/page.tsx:
- Rendered quotation (dari content_snapshot) — read-only
- Items table, grand total, skema termin, revisi, garansi
- Approval multi-step:
  1. Review items
  2. Input nama & jabatan penyetuju
  3. Checkbox persetujuan — teks dari COPY.md
  4. Re-enter PIN
  5. Submit → create decision + installments + transition project
- Rejection: textarea notes, PIN confirmation
- After action: tombol "Konfirmasi via WhatsApp"
- Hash verification: content_hash dikirim balik saat approval

**Task 7.4 — Invoice & payment (client portal)**
src/app/(portal)/[token]/invoices/page.tsx:
- Invoice list with status badges
- Detail: items, amount, info rekening bank
- Upload bukti bayar (with PIN re-auth):
  - File input (image/PDF, max 5MB), preview
  - PIN confirmation, submit
- Payment status tracking
- After upload: tombol "Konfirmasi via WhatsApp"

**Task 7.5 — Document download**
- PDF download via signed URL: /api/files/[signature]
- Verify HMAC + expiry

Verify: full portal flow works end-to-end.
```

---

## Epic 8 — Security Hardening (3 tasks)

> **Agent:** Gunakan `backend-design:security-reviewer` untuk comprehensive review.

### Prompt 8.1–8.3: Security Implementation

```
Kerjakan Task 8.1, 8.2, dan 8.3:

**Task 8.1 — Auth middleware**
src/middleware.ts:
- /admin/* → check admin session cookie → redirect /login
- /portal/[token]/* (kecuali PIN entry) → check portal session → redirect PIN
- Rate limiting: per-IP untuk admin login (max 10/min)

**Task 8.2 — Security headers**
next.config.ts headers:
- Content-Security-Policy, X-Frame-Options: DENY, X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Strict-Transport-Security (production only)
- Permissions-Policy: camera=(), microphone=(), geolocation=()

**Task 8.3 — IDOR prevention**
- Review semua portal queries: WAJIB scoped by portal_link token
- Review file access: scoped by project ownership
- Test: portal token A tidak bisa akses data project B

Verify: headers terpasang, IDOR test lulus.
```

### Prompt 8.R: Security Review (Agent)

```
Gunakan agent backend-design:security-reviewer untuk review seluruh codebase.

Review semua file di src/server/ dan src/app/api/ terhadap:
- .10x/specs/2026-10-17-portal-proyek-design.md (security section)
- .10x/decisions/senior-engineer/2026-10-17-implementation-notes.md

Fokus:
- IDOR/BOLA di setiap portal endpoint
- Mass assignment (apakah ada field yang tidak seharusnya di-update client)
- Injection (SQL via Drizzle, XSS via React)
- Missing auth checks
- Secret leaks di error responses
- File upload validation (MIME, size, path traversal)
- PIN/token timing attacks

Fix semua temuan critical dan high.
```

---

## Epic 9 — File Handling (1 task)

### Prompt 9.1: File Upload & Signed URL

```
Kerjakan Task 9.1.

src/app/api/upload/route.ts:
- POST: accept multipart, validate MIME (image/jpeg, image/png, image/webp, application/pdf), max 5MB
- Store di private directory (process.env.UPLOAD_DIR atau ./uploads/), filename: ulid + extension
- Save record di files table, return file ID

src/server/lib/signed-url.ts:
- generateSignedUrl(filePath, expiryMinutes = 5): string — HMAC-SHA256(filePath + expiry + APP_KEY)
- verifySignedUrl(path, expires, sig): boolean

src/app/api/files/route.ts:
- GET: verify signature, check expiry, serve file, Cache-Control: private, no-cache

Verify: upload → signed URL → download works. Expired URL rejected. Tampered sig rejected.
```

---

## Epic 10 — Integration Testing (1 task)

### Prompt 10.1: E2E Tests

```
Kerjakan Task 10.1 — Critical path tests.

Setup Vitest, buat src/__tests__/e2e/:

**happy-path.test.ts — Full lifecycle:**
1. Create client → create project (draft)
2. Create quotation → add items → send (quotation_sent, frozen)
3. Client approve → installments created (awaiting_down_payment)
4. Generate invoice → record payment → verify → check transitions

**auth.test.ts:**
- Admin login + TOTP
- Portal PIN entry, wrong PIN lockout, PIN change
- Brute force: 5 failed → lock 15 min, 3 lockouts → frozen

**edge-cases.test.ts:**
- Concurrent invoice numbering → unique numbers
- Frozen document → reject update
- Append-only activity logs → reject update/delete
- IDOR: token A cannot access project B
- Weak PIN rejection
- Expired signed URL rejection

Gunakan sample data dari docs/design/FIXTURES.md.

Verify: semua tests pass.
```

### Prompt 10.R: Pre-Ship Review (Agent)

```
Gunakan agent backend-design:incident-thinker untuk review pre-deployment.

Analyze seluruh codebase dan identifikasi:
- Likely incident scenarios (apa yang bisa rusak di production?)
- Detection: bagaimana kita tahu kalau rusak?
- Recovery: bagaimana cara perbaiki?

Fokus pada:
- Database: connection pool exhaustion, deadlocks, migration failures
- Auth: session hijacking, brute force, token leak
- Files: disk full, upload failure, corrupted files
- Billing: double payment, wrong amount, invoice number gap
- Portal: link expired saat client sedang approve, concurrent approval

Buat docs/incident-scenarios.md dari hasilnya.
```

---

## Epic 11 — Deployment (2 tasks)

### Prompt 11.1–11.2: Docker & CI/CD

```
Kerjakan Task 11.1 dan 11.2:

**Task 11.1 — Docker setup**
Dockerfile (multi-stage):
- Stage 1 (builder): node:22-alpine, npm install, npm build
- Stage 2 (runner): node:22-alpine, copy .next/standalone + .next/static + public
- EXPOSE 3000, CMD ["node", "server.js"]

docker-compose.yml:
- Service app: build Dockerfile, port 3000, env .env.production, depends_on postgres, volume uploads
- Service postgres: postgres:18-alpine, port 5432, volume data, healthcheck
- Network: internal bridge

docker-compose.dev.yml: Postgres saja (app pakai npm dev)

.env.production.example — template semua env vars

**Task 11.2 — CI/CD pipeline**
.github/workflows/deploy.yml:
- Trigger: push to main
- Jobs: lint → test (postgres service) → docker build + push → deploy (SSH to VPS)

.github/workflows/pr-check.yml:
- Trigger: pull request
- Jobs: lint + test only

Verify: docker compose up → app + postgres running, accessible localhost:3000.
```

---

## Final Checklist — Setelah Semua Epic Selesai

```
Review seluruh project:

1. Jalankan npm lint — 0 errors
2. Jalankan npm test — semua pass
3. Jalankan docker compose up — app berjalan
4. Test manual full flow:
   Login admin → create client → create project → create quotation → send → approve via portal → generate invoice → upload payment → verify
5. Security test: IDOR, brute force, expired URLs
6. Update .10x/status.md: Phase 4 completed, ready for deployment

Gunakan agent backend-design:security-reviewer untuk final security pass.
Gunakan agent backend-design:incident-thinker untuk final incident review.
```

---

## Ringkasan Skills & Agents per Epic

| Epic            | Skills (Claude Desktop)                                   | Agents (Claude Code)  |
| --------------- | --------------------------------------------------------- | --------------------- |
| Fase 0          | `/to-ux`, `/to-copy`, `/to-fixtures`, `/create-design-md` | —                     |
| 1. Scaffolding  | —                                                         | —                     |
| 2. Database     | —                                                         | `schema-reviewer`     |
| 3. Services     | —                                                         | `component-architect` |
| 4. Repositories | —                                                         | —                     |
| 5. Actions      | —                                                         | —                     |
| 6. Admin UI     | Pencil MCP (referensi visual)                             | —                     |
| 7. Portal UI    | Pencil MCP (referensi visual)                             | —                     |
| 8. Security     | —                                                         | `security-reviewer`   |
| 9. Files        | —                                                         | —                     |
| 10. Testing     | —                                                         | `incident-thinker`    |
| 11. Deploy      | —                                                         | —                     |

## File Referensi yang Dihasilkan Fase 0

```
D:\web-portal-client\portal-proyek\docs\design\
├── UX.md              ← dari /to-ux
├── COPY.md            ← dari /to-copy
├── FIXTURES.md        ← dari /to-fixtures
├── DESIGN.md          ← dari /create-design-md
└── screens/           ← export dari Pencil
    ├── admin-login.png
    ├── admin-dashboard.png
    ├── admin-clients.png
    ├── admin-project-detail.png
    ├── admin-quotation-builder.png
    ├── admin-invoices.png
    ├── portal-pin-entry.png
    ├── portal-dashboard.png
    ├── portal-quotation.png
    └── portal-invoices.png
```
