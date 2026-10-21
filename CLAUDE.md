# Portal Proyek Jasa Website

## Project Overview

Aplikasi web internal untuk mengelola siklus proyek freelance pembuatan website.
Fitur: manajemen client, project lifecycle (9 status), quotation builder, billing/invoicing, client portal, file handling.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Actions, RSC)
- **Language:** TypeScript (strict mode, noUncheckedIndexedAccess)
- **ORM:** Drizzle ORM
- **Database:** PostgreSQL 18
- **UI:** Tailwind CSS 4.x + shadcn/ui
- **Runtime:** Node.js 22 LTS
- **Package Manager:** npm 9.x
- **Deployment:** Docker Compose (Next.js + PostgreSQL containers) on VPS

## Architecture

Layered monolith: Route → Action → Service → Repository

```
src/
├── app/                    # Routes (admin + portal route groups)
├── server/
│   ├── actions/            # Server Actions (entry point from UI)
│   ├── services/           # Domain logic (pure functions, no DB)
│   ├── repositories/       # Database queries (Drizzle)
│   └── lib/                # Server utilities
├── db/
│   ├── schema/             # Drizzle schema per domain
│   ├── migrations/         # SQL migration files (hand-written for triggers)
│   └── seed.ts
├── components/             # React components
├── lib/                    # Client-side utilities
└── types/                  # Shared TypeScript types
```

## Key Design Decisions

- **Money:** BIGINT rupiah (integer, no decimals). Percent as basis points (5000 = 50%).
- **Error handling:** Result<T, E> pattern, not thrown exceptions.
- **Validation:** 4 layers — Client (Zod) → Action (Zod) → Service (TS) → Database (CHECK/FK/trigger).
- **Transaction boundaries:** At the Action level, not Repository.
- **Document immutability:** Versions frozen at sent_at, content stored as TEXT with SHA-256 hash.
- **State machine:** 9 statuses (draft → quotation_sent → awaiting_down_payment → in_progress → client_review → handover_sent → warranty → completed → cancelled).
- **Auth admin:** Email + password + TOTP 2FA, 24h session cookie.
- **Auth portal:** Token link + PIN, 30-day session cookie.
- **Files:** Local VPS storage, signed URL via API route (5-min expiry).
- **No premature abstractions:** No event sourcing, no message queues, no microservices, no GraphQL, no Redis.

## Reference Documents

All architecture decisions and implementation guides are in `.10x/`:
- Spec: `.10x/specs/2026-10-17-portal-proyek-design.md`
- Task breakdown: `.10x/decisions/engineering-manager/2026-10-17-mvp-task-breakdown.md`
- Implementation gotchas: `.10x/decisions/senior-engineer/2026-10-17-implementation-notes.md`
- Standards: `.10x/decisions/staff-engineer/2026-10-17-implementation-standards.md`

## Commands

```bash
npm dev          # Development server
npm build        # Production build
npm lint         # ESLint
npm db:generate  # Generate Drizzle migrations
npm db:push      # Push schema to database
npm db:seed      # Seed data
npm test         # Run tests (Vitest)
```

## Current Phase

**Phase 4 — Implementation (MVP)**
Following 47 tasks in 11 epics. See task breakdown for details.
