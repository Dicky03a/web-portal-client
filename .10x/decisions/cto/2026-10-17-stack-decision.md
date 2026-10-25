# CTO Decision: Technology Stack

**Date:** 2026-10-17  
**Decision:** Approved  
**Confidence:** High

## Context

Portal Proyek Jasa Website needs a full-stack web framework with:

- Server-side rendering for SEO (portal pages)
- Server Actions for form handling without building REST APIs
- PostgreSQL 18 support with raw SQL for triggers, CHECK constraints, partial indexes
- Docker-based deployment on VPS
- Single-developer operation (freelancer building for himself)

## Decision

**Full-stack Next.js 15 (App Router) + TypeScript + Drizzle ORM + PostgreSQL 18**

### Stack Details

| Component       | Choice         | Version           |
| --------------- | -------------- | ----------------- |
| Framework       | Next.js        | 15.x (App Router) |
| Language        | TypeScript     | 5.x (strict mode) |
| ORM             | Drizzle ORM    | Latest            |
| Database        | PostgreSQL     | 18                |
| UI Library      | shadcn/ui      | Latest            |
| CSS             | Tailwind CSS   | 4.x               |
| Runtime         | Node.js        | 22 LTS            |
| Package Manager | npm            | 9.x               |
| Deployment      | Docker Compose | VPS               |
| CI/CD           | GitHub Actions | —                 |

### Rejected Alternatives

1. **Laravel 13 + Inertia + React** (original PRD)
   - ✗ Developer is shifting to JS/TS ecosystem
   - ✗ Two languages (PHP + TypeScript) increases cognitive load
   - ✗ Separate API layer needed for client portal

2. **Separate Frontend + Backend (React + Express/Fastify)**
   - ✗ Two deployment units, doubled DevOps complexity
   - ✗ No built-in SSR without additional setup
   - ✗ Overkill for single-developer project

3. **Remix**
   - ✗ Smaller ecosystem than Next.js
   - ✗ Less community support for shadcn/ui integration
   - ✓ Good form handling, but Server Actions in Next.js 15 are comparable

### Why Drizzle Over Prisma

The DB design document requires:

- `BEFORE UPDATE` triggers (freeze document versions, protect audit logs)
- Partial unique indexes (`UNIQUE WHERE condition`)
- CHECK constraints with cross-column logic
- Composite foreign keys

Prisma cannot express these in its schema DSL. Drizzle's approach of "schema for types, raw SQL for migrations" fits perfectly: type-safe queries + full PostgreSQL power in migrations.

## Deployment: VPS + Docker

**Shared hosting was rejected** because:

- No Node.js runtime support
- No PostgreSQL 18 (most offer MySQL 5.7/8.0)
- No trigger/function privileges
- No private file storage with signed URL support
- No Docker support

**VPS recommendations (IDR pricing):**

- IDCloudHost: ~Rp50.000-100.000/bulan (1-2 vCPU, 1-2GB RAM)
- DigitalOcean: $6-12/month (1-2 vCPU, 1-2GB RAM)
- Hetzner: €3.79-5.39/month (best price/performance)

## Risks

| Risk                              | Mitigation                                                         |
| --------------------------------- | ------------------------------------------------------------------ |
| Next.js App Router still evolving | Pin to Next.js 15.x, avoid experimental features                   |
| Drizzle younger than Prisma       | DB schema is well-documented, migration SQL is hand-written anyway |
| VPS requires server management    | Docker Compose + GitHub Actions automate most of it                |
| Single point of failure (one VPS) | Acceptable for freelancer tool; add backup/monitoring later        |
