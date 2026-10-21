# Architect Decision: Architecture Patterns & Layer Design

**Date:** 2026-10-17  
**Decision:** Approved  
**Confidence:** High

## Context

A monolithic Next.js application that must:
1. Enforce complex business rules (state machine, immutability, installment math)
2. Support two distinct UIs (admin dashboard, client portal) with different auth models
3. Maintain strict data integrity (triggers, constraints, audit logs)
4. Be maintainable by a single developer

## Decisions

### 1. Layered Architecture (not Clean Architecture)

```
Route (app/) → Action (server/actions/) → Service (server/services/) → Repository (server/repositories/)
```

**Why not Clean Architecture:** Too many abstractions for a single-developer project. The 4-layer approach (Route → Action → Service → Repository) gives separation of concerns without interface/adapter ceremony.

**Rules:**
- Routes ONLY call Actions
- Actions orchestrate Services and Repositories
- Services contain pure business logic (no DB, no framework)
- Repositories contain Drizzle queries (no business logic)
- Types are shared via `types/` directory

### 2. Server Actions as Primary Entry Point

All mutations go through Server Actions (not API routes). Benefits:
- Built-in CSRF protection
- Type-safe client-server boundary
- No need to build/maintain REST endpoints
- Progressive enhancement (forms work without JS)

**Exception:** File serving uses API routes (`/api/files/[id]`) because signed URL redirects need HTTP response control.

### 3. Route Groups for Auth Separation

```
app/
├── (admin)/     # Admin auth middleware → session cookie + user check
├── (portal)/    # Portal auth middleware → session cookie + portal_link check
└── api/         # Mixed: some public, some require auth
```

Each route group has its own `layout.tsx` with auth guards. No shared auth state between admin and portal.

### 4. State Machine as a Service

The project lifecycle state machine lives in `project-lifecycle.service.ts` as a pure function:

```typescript
type TransitionResult = { success: true; newStatus: ProjectStatus } | { success: false; reason: string };

function transition(currentStatus: ProjectStatus, action: ProjectAction): TransitionResult;
```

This is NOT a library/framework. It's a lookup table + validation function. Benefits:
- Testable without DB
- Single source of truth for valid transitions
- Easy to visualize and audit

### 5. Transaction Boundaries at Action Level

Database transactions wrap at the Action level, not the Repository level:

```typescript
// server/actions/document.actions.ts
async function approveDocument(token, versionId, pin, data) {
  return db.transaction(async (tx) => {
    const session = await portalRepo.verifySession(tx, token);
    await portalAuth.verifyPin(session, pin);
    const version = await docRepo.getVersion(tx, versionId);
    docService.validateApproval(version, data.hash); // pure logic, no DB
    await docRepo.createDecision(tx, { ... });
    const installments = billingService.calculateInstallments(version.items);
    await billingRepo.createInstallments(tx, installments);
    const newStatus = lifecycleService.transition(project.status, 'approve_quotation');
    await projectRepo.updateStatus(tx, project.id, newStatus);
    await activityLogRepo.append(tx, { ... });
  });
}
```

This ensures all-or-nothing semantics for complex multi-table operations.

### 6. Validation Strategy

| Layer | Tool | What |
|-------|------|------|
| Client | React Hook Form + Zod | UX feedback, prevent obviously bad input |
| Action | Zod (same schema) | Server-side re-validation, never trust client |
| Service | TypeScript types + assertions | Business rule validation (state transitions, quota checks) |
| Database | CHECK, UNIQUE, FK, triggers | Last line of defense, data integrity guarantee |

Zod schemas are defined once in `types/` and shared between client and server.

### 7. Error Handling

- Services return `Result<T, E>` types (not exceptions) for expected failures
- Repositories throw on unexpected DB errors
- Actions catch, log, and return user-friendly error messages
- Global error boundary for unhandled exceptions in routes

### 8. No Premature Abstractions

Explicitly NOT doing (for now):
- Event sourcing (overkill for single-user admin)
- Message queues (no async processing needed yet)
- Microservices (single deployment unit)
- GraphQL (Server Actions are simpler)
- Redis (session storage in DB is fine for single-user)
- Full-text search (PostgreSQL `ILIKE` + indexes sufficient)

These can be added in future iterations if needed.

## Trade-offs

| Decision | Pro | Con |
|----------|-----|-----|
| Monolith | Simple deployment, easy refactoring | Harder to scale horizontally (irrelevant for single-user) |
| Server Actions over REST | Less boilerplate, CSRF-free | Harder to test without framework, no API for mobile |
| Drizzle over Prisma | Full SQL control | Smaller community, fewer tutorials |
| No Redis | One less service to manage | Session queries hit DB (acceptable at this scale) |
