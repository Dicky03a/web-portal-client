# Product Manager Decision: Release Strategy & MVP Scope

**Date:** 2026-10-17  
**Decision:** Approved  
**Confidence:** High

## Context

22 tables across 7 domains. Building everything at once is too risky for a solo developer. Need to deliver value incrementally while keeping the database schema extensible.

## Decision: 3-Phase Release

### MVP — Core Lifecycle (18 tables)

**Goal:** Replace manual Canva + WhatsApp workflow for quotation → payment tracking.

**Included:**

- Client & project management (CRUD + state machine)
- Quotation document flow (create, version, send, approve/reject)
- Billing: installments, invoices, payment recording & verification
- Admin dashboard with project overview, pending actions
- Client portal: PIN auth, view quotation, approve, view invoices, upload payment proof
- WhatsApp message generation (wa.me links, not API)
- Activity logging (audit trail)
- File upload/download with signed URLs

**Excluded from MVP:**

- Addendum & BAST documents (table exists but flow deferred)
- Progress tracking (milestones, updates)
- Revision request management
- Warranty claims

**Why this scope:** Quotation + billing solves problems P1 (manual invoices), P2 (no approval trail), and P4 (payment tracking). These are the highest-pain problems from the PRD.

### Iteration 2 — Progress & Revisions (+3 tables)

**Goal:** Solve P3 (progress visibility) and P5 (revision scope creep).

**Additions:**

- Milestones & progress updates (2 tables)
- Revision requests with quota tracking (1 table)
- Addendum document flow (scope changes → new quotation)
- BAST document flow (handover)
- Client portal: progress timeline, revision submission, BAST approval

### Iteration 3 — Warranty (+1 table)

**Goal:** Solve P6 (unclear warranty scope).

**Additions:**

- Warranty claims (1 table)
- Auto-flag out-of-scope/out-of-period claims
- Warranty dashboard for admin
- Client portal: warranty status, claim submission

## Success Criteria (MVP)

| Metric                  | Target                                                      |
| ----------------------- | ----------------------------------------------------------- |
| Quotation creation time | < 15 minutes (vs current ~1 hour in Canva)                  |
| Invoice accuracy        | 0 numbering duplicates                                      |
| Payment tracking        | All payments recorded in system, not in chat                |
| Client portal adoption  | At least 1 real client uses portal to approve quotation     |
| Approval trail          | Every approval has: timestamp, version hash, IP, user-agent |

## Risks

| Risk                                  | Mitigation                                                 |
| ------------------------------------- | ---------------------------------------------------------- |
| MVP scope still too large             | Start with happy path only; edge cases in patch releases   |
| Client portal too complex for clients | Keep it dead simple: PIN → see project → one-click approve |
| Iteration 2-3 never built             | MVP is useful standalone; iterations are enhancements      |
