# Agent Execution Protocol & Workspace Rules

This document specifies the operational rules and behavioral boundaries for Antigravity agents working on **EVOH Academy**.

## Section 33: Agent Execution Protocol

### Before coding
1. **Inspect repository**: Inspect the repository; preserve useful existing work.
2. **Read PRD**: Read `docs/PRD.md` fully. Produce an implementation plan and task list, then wait for approval in Planning mode.
3. **Open Decisions & Credentials**: List missing credentials and external dependencies. Create and maintain `docs/OPEN_DECISIONS.md` with every `[OWNER DECISION]` and `[LEGAL REVIEW]` item.

### While coding
4. **The Zero-Hardcoding Rule (Section 4)**: If you are about to type a business string, price, link, or list into a component, stop and model it in the database and admin UI instead.
5. **Vertical Slices**: Work feature by feature, vertical slices (schema, server logic, admin UI, public UI, tests).
6. **Domain Layer**: Business logic lives in `/server` domain services, with unit tests; no business logic duplicated in route files or client components.
7. **No Fake Mocking**: Never silently replace real functionality with mock data. If blocked by credentials, build the integration boundary, a clear "not configured" state, and setup instructions.
8. **Security & Secrets**: Never expose or commit secrets. Never trust client-supplied prices, roles, user ids, or payment status.
9. **No Fabricated Content**: Do not invent testimonials, statistics, counts, ratings, credentials, or legal claims. Empty blocks must auto-hide.
10. **Scope Boundaries**: Do not expand scope beyond Section 2.1 of `docs/PRD.md`. Record scope requests in `docs/OPEN_DECISIONS.md`.
11. **Modern Compatible APIs**: Prefer current stable APIs; verify library versions and Razorpay/Supabase behavior against current official documentation during the build rather than relying on memory; note any version-specific decisions in the README.
12. **Git Hygiene & Assumptions**: Keep commits small and meaningful. Record assumptions in the phase report.

### After each phase
13. **Verification Suite**: Run: install, Prisma migrate, seed, lint, type check, tests, build, and start the app. Open key pages in the browser agent and capture screenshots at 375, 768, 1024, 1440 px for UI phases.
14. **Phase Report**: Fix all errors. Write a phase report: completed, partially done, blocked, assumptions, test results (actual numbers).
15. **Honest Verification**: Do not claim a feature works unless it was implemented and tested. Do not stop at a plan or a homepage screenshot.

### At the end
Run the full suite, produce the final report: features completed, remaining blockers, local setup commands, payment configuration steps, deployment steps, and the go-live checklist.
