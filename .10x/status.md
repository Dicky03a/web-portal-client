# 10x Team — Status

**Project:** Portal Proyek Jasa Website  
**Last Updated:** 2026-10-17

## Current Phase: Phase 2 → Phase 3

### Completed

- [x] **Phase 0 — Brainstorming:** Architecture options evaluated, stack decided (Next.js 15 + Drizzle + PostgreSQL 18)
- [x] **Phase 1 — Decisions:** CTO (stack), PM (release strategy), Architect (patterns), Staff Engineer (standards)
- [x] **Phase 2 — Spec & ADR:** Architecture spec written, ADR-0001 recorded

### In Progress

- [ ] **Phase 3 — Task Breakdown:** Engineering Manager + Senior Engineer breaking MVP into implementation tasks

### Pending

- [ ] **Phase 4 — Implementation:** Build MVP following task breakdown
- [ ] **Phase 5 — Review:** Code review, security review, testing

## Key Decisions Made

| Decision     | Choice                                               | ADR                |
| ------------ | ---------------------------------------------------- | ------------------ |
| Framework    | Next.js 15 (App Router)                              | ADR-0001           |
| Language     | TypeScript (strict)                                  | —                  |
| ORM          | Drizzle ORM                                          | CTO Decision       |
| Database     | PostgreSQL 18                                        | PRD/DB Design      |
| UI           | Tailwind CSS + shadcn/ui                             | CTO Decision       |
| Deployment   | VPS + Docker Compose                                 | CTO Decision       |
| Architecture | Layered monolith (Route→Action→Service→Repository)   | Architect Decision |
| Release      | 3-phase: MVP (18 tables) → Iter 2 (+3) → Iter 3 (+1) | PM Decision        |

## Blockers

None currently.

## Documents

| Document          | Location                                                      |
| ----------------- | ------------------------------------------------------------- |
| PRD               | PRD — Portal Proyek Jasa Website (Oct 16, 2026)               |
| DB Design         | Desain Basis Data — Portal Proyek Jasa Website (Oct 16, 2026) |
| Flowcharts        | Flowchart Portal Proyek (6 swimlane + ERD v3)                 |
| UI Design         | Pencil MCP: portal-jasa-website.pen                           |
| Architecture Spec | .10x/specs/2026-10-17-portal-proyek-design.md                 |
