# ADR-0001: Full-Stack Next.js Monolith over Laravel + Inertia

**Date:** 2026-10-17  
**Status:** Accepted  
**Deciders:** CTO, Architect, Developer

## Context

The PRD specified Laravel 13 + Inertia + React as the tech stack. However, the developer (sole maintainer) is transitioning from PHP to the JS/TS ecosystem and wants to build with Next.js.

The application has these needs:
- Server-rendered pages for portal (SEO, performance on mobile)
- Complex form handling with server-side validation
- PostgreSQL 18 with triggers, CHECK constraints, partial unique indexes
- Docker-based VPS deployment
- Single-user admin, multi-client portal

## Decision

Use **full-stack Next.js 15 (App Router)** as a monolith with:
- **TypeScript** for type safety across client/server
- **Drizzle ORM** for SQL-first database access
- **Server Actions** for mutations (replacing REST APIs)
- **React Server Components** for data fetching

## Consequences

### Positive
- Single language (TypeScript) across entire stack
- No separate API layer needed — Server Actions handle mutations
- React Server Components eliminate client-side data fetching boilerplate
- Aligns with developer's career trajectory toward JS/TS ecosystem
- Large Next.js ecosystem for UI components (shadcn/ui), auth patterns, deployment

### Negative
- PRD's Laravel-specific conventions (Eloquent, factories, migrations) need translation
- DB Design document references Laravel patterns that must be mapped to Drizzle
- Next.js App Router is newer than Pages Router — fewer mature patterns
- No built-in equivalent to Laravel's queue/job system (not needed for MVP)
- Drizzle has smaller community than Prisma or Eloquent

### Neutral
- Deployment complexity is similar (Docker Compose for both)
- Testing story is comparable (Vitest vs PHPUnit)
- Auth implementation is custom in both cases (no Laravel Sanctum equivalent)

## Alternatives Considered

1. **Stay with Laravel 13 + Inertia + React**: Rejected because developer wants to stop using PHP, and maintaining two languages has ongoing cost.
2. **Next.js frontend + Express/Fastify backend**: Rejected because two deployment units add DevOps complexity without benefit for a single-developer project.
3. **Remix**: Rejected due to smaller ecosystem and fewer shadcn/ui integrations.
