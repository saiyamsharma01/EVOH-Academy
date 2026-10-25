# EVOH Academy: Product Requirements Document v2.0
Fully dynamic, production-grade PRD for agentic build in Antigravity

## 0. How To Use This Document (Antigravity)
1. Put this entire PRD in the workspace as `docs/PRD.md`. Also create `AGENTS.md` (or the Antigravity rules file) containing Section 33 (Agent Execution Protocol) so every agent session inherits the rules.
2. Start the agent in Planning mode. First task: produce an implementation plan and task list from Section 31 (Phases). Review the plan before approving any code generation.
3. Run one phase per agent mission. After each phase, require: build passes, type check passes, lint passes, tests pass, and a written phase report listing what is done, what is blocked, and what is assumed.
4. Anything marked [OWNER DECISION] must not be guessed by the agent. The agent builds it as a configurable setting with a safe default and lists it in `docs/OPEN_DECISIONS.md`.
5. Anything marked [LEGAL REVIEW] must ship with editable placeholder text clearly flagged as unreviewed. Never present it as final legal copy.

Document status: Draft for build. Version: 2.0. Replaces: v1.0 (original PRD). All v1 requirements are retained; v2 adds sections 1.3, 2, 3, 4, 8, 12, 13, 14, 15, 16, 17, 25, 26, 32, 34, 35.

---

## 1. Role, Mission and Vision

### 1.1 Agent role
Act as a senior product designer, creative director, UI/UX architect, full-stack engineer, database architect, security engineer, and DevOps engineer.

### 1.2 Mission
Build EVOH Academy, a complete, production-oriented education platform for a teacher who teaches Physics, Chemistry, and Mathematics to Class 11 and Class 12 students.
It is not a static site, mockup, or landing page. It is a working application with a premium visual identity, backend, database, authentication, admin CMS, payments, notes marketplace, subscriptions, protected content delivery, tax invoicing, and responsive layouts.
The brand name "EVOH Academy" is a setting, not a constant. Name, logo, tagline, colors, contact details, and teacher profile must be editable by the owner without code changes.

### 1.3 Business goals and success metrics
Metrics are measured through the platform's own analytics (Section 24) and are targets, not claims to be shown publicly.

| Goal | Metric | Initial target (editable in `docs/TARGETS.md`) |
| :--- | :--- | :--- |
| Fast public site | LCP on mobile 4G, homepage | < 2.5 s |
| Stable layout | CLS | < 0.1 |
| Responsiveness | INP | < 200 ms |
| Homepage weight | Initial JS (excluding lazy 3D) | < 200 KB gzipped |
| Conversion | Visitor to registered student | Baseline measured in first 30 days, then set |
| Revenue | Registered to first purchase | Baseline measured, then set |
| Reliability | Successful payment-to-access time | < 60 s after verified webhook |
| Support | First response to enquiry | < 1 business day (owner process) |
| Quality | Test coverage on business logic (payments, entitlements, pricing, tax) | >= 85% |

The agent must not display any of these targets as achievements on the public site.

---

## 2. Scope Boundaries

### 2.1 In scope (v1 launch)
• Public website, student dashboard, admin CMS.  
• PDF-based notes, formula sheets, worksheets, question banks, bundles.  
• Individual purchases and subscription plans.  
• Razorpay payments, GST-aware invoicing, refunds.  
• Search, blog, FAQ, enquiries, reviews from verified buyers.  
• Progress tracking at chapter and resource level.  
• Hero 3D scene (one) and light subject visuals (see Section 8).  

### 2.2 Explicitly out of scope for v1 (must be designed so they can be added later)
• Live classes and video conferencing.  
• Hosted video lectures (schema must allow a future VIDEO resource type; no video pipeline now).  
• Interactive mock-test engine with timed attempts and scoring. (Static PDF mock tests are allowed as a resource type.)  
• Doubt-solving chat or forums.  
• Native mobile apps (the site must be a responsive PWA-capable web app, installable support optional).  
• Multi-teacher marketplace or multi-tenant white-labelling.  
• Hindi or other languages in the UI (but all user-facing strings must go through an i18n layer so languages can be added, see Section 4.4).  
• Affiliate or referral programs.  

The agent must refuse to expand scope into these areas without an explicit owner instruction recorded in `docs/OPEN_DECISIONS.md`.

### 2.3 Assumptions
• Single owner-teacher with optional staff.  
• Content (PDFs) is created by the owner. The platform never ships copyrighted NCERT scans.  
• Razorpay account approval and business KYC are the owner's responsibility.  
• Initial currency INR; architecture is currency-aware.  

### 2.4 Key risks

| Risk | Mitigation |
| :--- | :--- |
| Razorpay approval or subscription product delay | Build integration boundary, test-mode only, setup checklist |
| Content not ready at launch | Seed uses clearly labelled draft placeholders marked unpublished; no fake published content |
| PDF piracy | Watermarking, device limits, download caps (Section 12) |
| Minors' data compliance | Parental consent flow (Section 17) and legal review |
| GST misconfiguration | Tax settings fully configurable, CA review before launch |
| 3D hurting performance | One hero scene, lazy-loaded, static fallback, performance budget |

---

## 3. Users, Roles and Permissions

### 3.1 Audiences
• Primary: Class 11 and 12 students (Physics, Chemistry, Mathematics).  
• Secondary: Parents who buy for their children.  
• Administrative: Owner and authorized staff.  

### 3.2 Role model (granular)

| Role | Purpose | Key permissions |
| :--- | :--- | :--- |
| SUPER_ADMIN | Owner | Everything, including settings, roles, refunds, tax, danger zone |
| ADMIN | Trusted manager | Content, orders view, coupons, enquiries, analytics; no role changes, no tax or payment keys |
| EDITOR | Content staff | Create/edit resources, chapters, blog, FAQ; cannot publish paid pricing or see revenue |
| SUPPORT | Support staff | View students, orders, enquiries; reply to tickets; cannot edit content or issue refunds |
| STUDENT | Learner | Own dashboard, library, purchases |
| GUARDIAN | Parent (optional account type) | View linked child's purchases, give consent, manage consent |

Permissions are defined as a permission matrix in the database (`Permission`, `RolePermission`), not as if-statements scattered through code. A central `can(user, permission, resource?)` helper is the only authorization check used by routes, server actions, and API handlers. The admin UI includes a read-only permission matrix view for SUPER_ADMIN.

Rules:  
• Roles are never accepted from the client.  
• First SUPER_ADMIN is created only through the secure bootstrap command in Section 28. No default admin password is ever seeded.  
• Every role change is audit-logged.  

---

## 4. Dynamic-First Architecture

The owner must be able to run and reshape the business without a developer. The agent must treat the following as a hard design constraint.

### 4.1 The Zero-Hardcoding Rule
No business content, copy, price, tax rate, curriculum list, plan feature, navigation link, FAQ, policy text, email text, SEO text, or theme value may be hardcoded in components. These come from the database (or validated config), editable in the admin UI. The only strings allowed in code are UI chrome labels (for example "Save", "Cancel") and they must go through the i18n layer.

### 4.2 What must be dynamic (non-exhaustive, all admin-editable)

| Area | Dynamic entities |
| :--- | :--- |
| Brand | `SiteSetting`: name, logo, favicon, tagline, colors (design tokens), fonts from an allowed list, contact info, social links, teacher profile |
| Navigation | `NavItem` for header, footer columns, mobile menu; order, label, link, visibility, role-aware |
| Homepage | `PageBlock` list: hero, class selector, subject features, featured resources, how it works, bundles, free resources, subscription benefits, teacher intro, FAQ, final CTA. Each block has type, order, config JSON validated by a Zod schema per block type, publish state |
| Pages | `CmsPage` for About, legal pages, any new page, with versioning and draft/publish |
| Curriculum | `Syllabus`, `Subject`, `Chapter`, `Topic` with ordering, publish, archive |
| Products | `Resource`, `Bundle`, `Plan`, prices, discounts |
| Entitlements | Relational `PlanEntitlement` rules (Section 13.3) |
| Commerce rules | `TaxSetting`, `RefundPolicyRule`, `DownloadPolicy`, `WatermarkPolicy`, `DeviceLimitPolicy` |
| Communications | `EmailTemplate` (editable subject and body with variables), notification templates |
| Content | `BlogPost`, `Faq`, `Announcement` (banner with start/end dates), `Testimonial` (real, consented only) |
| SEO | Per-entity SEO fields plus global defaults, `Redirect` table |
| Feature flags | `FeatureFlag`: subscriptions on/off, coupons on/off, reviews on/off, guardian flow, maintenance mode, signups open/closed |
| Limits | `RateLimitConfig` values editable by SUPER_ADMIN |

### 4.3 Dynamic delivery mechanics
• Public pages are server-rendered from DB with on-demand revalidation (tag-based `revalidateTag`) triggered when the admin publishes. Owner edits go live within seconds without redeploy.  
• Draft preview: admin can open any draft page or block through a signed, short-lived preview link.  
• Every dynamic entity that is published has status (DRAFT, PUBLISHED, ARCHIVED), `publishedAt`, and `updatedBy`.  
• Dynamic block renderer: a typed registry maps `blockType` to a React component and a Zod config schema. Unknown block types fail safely (skipped, logged), never crash the page.  
• Seed data is starter data in the DB, never constants in the code.  
• A Settings Export/Import (JSON) lets the owner back up and restore configuration, excluding secrets.  

### 4.4 Internationalization readiness
All UI chrome strings go through a message catalog (en-IN first). Dynamic content tables support an optional locale field design (not UI shipped in v1). Dates, numbers, and currency use Intl with INR defaults.

### 4.5 Config validation
All configuration JSON is validated on write and on read by versioned Zod schemas. Invalid configuration must never take down the public site: the system falls back to the last valid published version.

---

## 5. Required Technology Stack

Use current stable, mutually compatible versions. No deprecated APIs. No unnecessary libraries. Pin versions and record them in the README.

- **Frontend**: Next.js (App Router), React, TypeScript (strict), Tailwind CSS, shadcn/ui, Lucide icons, Motion for React, Three.js with React Three Fiber and Drei (hero only, lazy), React Hook Form with Zod.
- **Backend**: Next.js Route Handlers and Server Actions, TypeScript, Zod validation on every input, server-side business logic in a `/server` domain layer (services, not logic inside route files), background jobs via a queue or scheduled functions (pick one, e.g. Vercel Cron / Supabase / Inngest) for invoices, emails, reconciliation, expiry.
- **Data and storage**: PostgreSQL, Prisma ORM, Supabase (managed Postgres, Auth, private Storage). Private buckets for paid PDFs, invoices, and protected documents. Public bucket only for non-sensitive images.
- **Authentication decision (single architecture)**: Supabase Auth with server-verified sessions (`@supabase/ssr`) and a mirrored `User` row in Postgres keyed by `authProviderId`. Authorization (roles and permissions) lives in our database, not in client-visible JWT claims alone. Prisma connects with a server-side database role; Row Level Security is enabled on all tables as defense in depth (deny-by-default for the anon and authenticated roles), and all data access in the app goes through the server with `can()` checks. Document this in `docs/AUTH_ARCHITECTURE.md`. Do not implement a second auth system.
- **Payments**: Razorpay (test mode first): Orders and Checkout for one-time purchases, Subscriptions for recurring. Server verification, webhook signature verification on the raw body, idempotent handlers.
- **Email**: Resend (or equivalent) with React Email templates, rendered from DB-editable templates (Section 4.2).
- **Observability and ops**: Sentry (errors), structured logging (pino), uptime monitoring, a health endpoint (`/api/health`), and alerting on webhook failures. Analytics: privacy-friendly plus first-party event table; no third-party tracking before consent (Section 24).
- **Deployment**: Vercel (app), Supabase (DB and storage), GitHub (source and CI). Custom domain with HTTPS and HSTS.

---

## 6. Design Direction and Creative Vision

The site must not look like a generic AI-generated education template. Develop an original, cohesive identity.
- **Brand personality**: Intelligent, premium, calm, academic, modern, precise, trustworthy, aspirational.
- **Visual language**: Editorial design inspired by premium educational publishers, science magazines, and art-directed technology products.
  • Warm ivory and soft white surfaces.  
  • Deep midnight navy for contrast.  
  • Cobalt blue as the primary accent.  
  • Restrained violet or electric blue for selected interactive details.  
  • Dark sections for selected hero, science visualization, and footer.  
  • Subtle grid lines, diagrams, mathematical notation, scientific details.  
  • Gradients used sparingly, never on every component.  
- **Design tokens (dynamic)**: Colors, radii, spacing scale, and font choices are CSS variables fed from `SiteSetting.theme`. The owner can change accent color and logo; contrast is validated on save (WCAG AA) and the save is rejected with an explanation if a combination fails.
- **Typography**: Display: Manrope or Plus Jakarta Sans. Body: Inter. Consistent type scale, controlled line lengths (60 to 75 characters), generous whitespace, clear hierarchy. Use `next/font` with `display: swap`.
- **Layout principles**: Strong editorial hero, asymmetric compositions where appropriate, large but purposeful headlines, aligned grids, generous section spacing, premium resource cards, consistent button geometry, deliberate image crops, distinct desktop and mobile compositions.
- **Avoid**: Generic SaaS dashboard look on public pages, excessive rounded cards, random gradients, emoji as icons, unnecessary glassmorphism, purposeless floating elements, purple-blue AI landing patterns, excessive scroll animation, fake testimonials, fabricated student counts or results, dead buttons, placeholder content in the finished product.
- **Design deliverables before page work**: Before building pages, the agent produces `docs/DESIGN_SYSTEM.md` with tokens, type scale, spacing, component inventory, motion rules, and a screenshot of the component gallery page at `/_design` (dev-only route).

---

## 7. Page Block Library for the Dynamic Homepage

Each block is a registered type with a Zod schema, admin editor form, preview, and default seed.

| Block type | Config fields |
| :--- | :--- |
| `hero` | headline, subheadline, primary CTA (label, link), secondary CTA, visual variant (scene3d, static), announcement strip toggle |
| `class_selector` | classes shown, descriptions, links |
| `subject_feature` | subject reference, headline, body, visual variant, featured chapters |
| `featured_resources` | selection mode (manual, newest, popular if data exists), count, filters |
| `how_it_works` | steps array (title, body, icon) |
| `bundles_showcase` | bundle references |
| `free_resources` | selection, count |
| `subscription_benefits` | plan references, feature emphasis |
| `teacher_intro` | teacher profile reference, bio override, photo |
| `faq` | FAQ category or manual selection |
| `testimonials` | only approved real testimonials with consent flag; block auto-hides if none exist |
| `rich_text` | sanitized rich content |
| `cta_final` | headline, body, CTAs |
| `announcement` | message, link, start and end dates |

Rules: no block may display counts, results, or credentials unless sourced from real database values or explicitly entered and attributed by the owner. Empty testimonial and stats blocks must not render.

---

## 8. Three-Dimensional Experiences (scoped down)

3D reinforces the scientific identity. It is never decoration and never a dependency for using the site.

### 8.1 Release scope
• v1 ships exactly one 3D scene: the homepage hero (abstract molecular or orbital structure, designed specifically for EVOH Academy, original geometry).  
• Subject visuals for Physics (waveforms, vectors), Chemistry (lattices, orbitals) and Mathematics (surfaces, parametric curves) ship in v1 as lightweight SVG/Canvas 2D illustrations. Full R3F scenes for them are Phase 2 (post-launch) and tracked in the backlog.  

### 8.2 Technical requirements
• React Three Fiber, Three.js, Drei; load via `next/dynamic` with `ssr: false`, only after the page is interactive (idle callback or intersection).  
• Designed static fallback (pre-rendered image or SVG) shown during load, when WebGL is unavailable, when `prefers-reduced-motion` is set, on low-power or save-data connections, and on very low-memory devices.  
• Subtle pointer interaction; restrained movement; frame-rate guard (reduce quality or pause if FPS drops); pause when tab or element is off-screen.  
• Mobile: reduced geometry, capped device pixel ratio (max 1.5), no heavy post-processing.  
• Scene config (variant, colors, speed) comes from the hero block config (Section 7) so it can be switched to static from admin without a deploy.  
• Performance budget: 3D chunk < 250 KB gzipped, no more than one canvas on a page, no full-screen canvas on any other page.  
• Site must be fully usable and visually complete with the 3D disabled.  

---

## 9. Information Architecture and Routes

All routes below must exist. Pages are built from shared layouts, dynamic routes, and route groups: `(public)`, `(auth)`, `(student)`, `(admin)`. Do not create dozens of one-off hardcoded pages.

### 9.1 Public (server-rendered, cached with tag revalidation)
`/`, `/about`, `/classes`, `/classes/11`, `/classes/12`, `/subjects`, `/subjects/[slug]` (physics, chemistry, mathematics are data, not separate files), `/chapters/[slug]`, `/notes`, `/notes/[slug]`, `/bundles`, `/bundles/[slug]`, `/pricing`, `/free-resources`, `/blog`, `/blog/[slug]`, `/faq`, `/contact`, `/search`, `/cart`, `/checkout`, `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email`, `/terms`, `/privacy`, `/refund-policy`, `/subscription-terms`, `/digital-delivery-policy`, `/cookie-policy`, `/pages/[slug]` (any extra CMS page), custom not-found, error, `/maintenance`.  
`/classes/[level]` and `/subjects/[slug]` are generic dynamic routes validated against the database; unknown values return 404.

### 9.2 Student (authenticated, private, never cached publicly)
`/dashboard`, `/dashboard/library`, `/dashboard/purchases`, `/dashboard/purchases/[orderNumber]` (receipt and invoice download), `/dashboard/subscription`, `/dashboard/progress`, `/dashboard/downloads`, `/dashboard/profile`, `/dashboard/security`, `/dashboard/notifications`, `/dashboard/support`, `/dashboard/support/[ticketId]`, `/dashboard/consent` (for minors and guardians), `/dashboard/privacy` (data export and account deletion request), `/dashboard/reader/[resourceId]` (protected in-browser PDF viewer).

### 9.3 Admin (authenticated and permission-checked, noindex)
`/admin`, `/admin/students`, `/admin/students/[id]`, `/admin/syllabi`, `/admin/subjects`, `/admin/chapters`, `/admin/topics`, `/admin/courses`, `/admin/notes`, `/admin/notes/new`, `/admin/notes/[id]/edit`, `/admin/notes/[id]/versions`, `/admin/bundles`, `/admin/products`, `/admin/pricing`, `/admin/subscriptions`, `/admin/orders`, `/admin/orders/[id]`, `/admin/refunds`, `/admin/invoices`, `/admin/coupons`, `/admin/blog`, `/admin/pages` (CMS pages and homepage blocks), `/admin/navigation`, `/admin/faqs`, `/admin/announcements`, `/admin/testimonials`, `/admin/email-templates`, `/admin/enquiries`, `/admin/support`, `/admin/reviews`, `/admin/analytics`, `/admin/tax`, `/admin/policies` (refund, download, device, watermark rules), `/admin/roles` (permission matrix), `/admin/feature-flags`, `/admin/settings`, `/admin/media`, `/admin/redirects`, `/admin/audit-logs`, `/admin/jobs` (background job and webhook event log).

### 9.4 API
`/api/webhooks/razorpay` (raw body), `/api/health`, `/api/downloads/[resourceId]` (authorizes then issues signed URL), `/api/search`, plus route handlers per domain. Every handler: validate input with Zod, authenticate, authorize with `can()`, rate-limit where abuse-prone, log, return typed errors.  
If a route depends on external credentials (payments, email), it must still render with a clear "not configured" state rather than crash.

---

## 10. Homepage Experience

Composed entirely from `PageBlock` records (Section 7). Seeded default order:
1. Hero. Suggested headline: "Understand the Concepts. Master the Science." Supporting copy: "Thoughtfully structured Physics, Chemistry, and Mathematics resources for Class 11 and 12 students." Primary CTA: "Explore Learning Resources". Secondary CTA: "Explore Free Notes". (All editable.)
2. Class 11 and Class 12 selection.
3. Three subject feature sections.
4. Featured learning resources (from DB).
5. How the platform works.
6. Original notes and study bundles.
7. Free learning resources.
8. Subscription benefits.
9. Teacher introduction (from `TeacherProfile`).
10. FAQ.
11. Final CTA.
12. Footer: navigation, contact information, legal links, social links, all from `NavItem` and `SiteSetting`.

Header: wordmark, Classes, Subjects, Notes, Pricing, About, Search, Login, primary CTA, responsive mobile navigation. Header becomes account menu when logged in.  
Never invent achievements, student counts, results, or teacher credentials. Teacher qualifications appear only if the owner enters them.

---

## 11. Curriculum and Content Management

### 11.1 Hierarchy
Syllabus (board, edition label, effective dates, status) -> Subject -> Chapter -> Topic -> Resource. Class level (11 or 12) is attached to Chapter (and optionally to Subject-Class mapping via `SubjectClass`).

### 11.2 Fields
- **Subject**: name, slug, description, icon or illustration key, display order, classes offered, status.
- **Chapter**: title, slug, class level, subject, syllabus, chapter number, description, learning objectives (ordered list), display order, SEO fields, status.
- **Topic**: title, slug, chapter, order, summary.

### 11.3 Admin capabilities
Create, edit, drag-reorder, publish, unpublish, archive, duplicate to a new syllabus, bulk import via CSV (validated, with preview and rollback). Archived chapters keep working links for past buyers.

### 11.4 Starter curriculum
Seed a reasonable, editable starter chapter list for the six class-subject combinations, entered in the database as DRAFT with `syllabusVersion` marked "unverified". The agent must not claim official syllabus alignment publicly. The owner verifies against the current NCERT/CBSE syllabus and publishes. [OWNER DECISION] which board and syllabus edition.

---

## 12. Notes Marketplace, File Protection, Piracy Control, Versioning

### 12.1 Resource types
Chapter notes, concept notes, formula sheet, revision notes, worksheet, question bank, mock test (PDF), revision bundle. Type list is a database table (`ResourceType`) so the owner can add types. Schema reserves a VIDEO type for future use only.

### 12.2 Filters and listing
Class, subject, chapter, resource type, free or paid, price range, sort (newest, price, popularity only when real usage data exists). Pagination or infinite scroll with URL-synced filters.

### 12.3 Product card
Title, subject and class, chapter, type, short description, cover image, preview availability, price, original price only when a genuine active discount exists, free or paid label, action button reflecting state (Buy, Add to cart, Open, Included in your plan).

### 12.4 Product detail page
Large cover, title, description, what is included, class/subject/chapter, page count and file size when known, preview pages (server-generated, low-resolution, watermarked "Sample"), price, CTA, related resources, access conditions, refund terms summary linking to the live refund policy, current version number and last-updated date, verified-buyer reviews (if enabled).

### 12.5 Versioning
`ResourceVersion` stores each uploaded file (`storageKey`, checksum, page count, size, changelog, `uploadedBy`, `createdAt`). One version is current. Rule: purchasing grants a lifetime right to the resource and always serves the current version, so buyers automatically receive corrections. Admin can see all versions and roll back. Optional notification to owners of a resource when a new version is published. [OWNER DECISION] whether major new editions are sold separately (modeled as a new Resource).

### 12.6 Upload and validation
Admin uploads PDFs and images directly to private storage via signed upload URLs. Validate on the server: MIME and magic bytes (real PDF), max size (configurable), page count extraction, virus-scan hook (provider-pluggable, documented), image re-encoding for covers. Generate preview pages in a background job. Replacing a file creates a new `ResourceVersion`.

### 12.7 Secure delivery
• Paid files live in private buckets; no public URLs, no raw storage paths in HTML or API responses.  
• Entitlement is rechecked server-side on every request. Signed URLs are short-lived (default 60 seconds, configurable) and single-purpose.  
• Dynamic watermark: every delivered copy is stamped per request with the student's name, email (or masked ID), order or entitlement reference, and date, on every page (position and opacity from `WatermarkPolicy`). Watermarking runs in a background-capable service (cached per user+version) so downloads stay fast.  
• Delivery modes (configurable per resource): `DOWNLOAD_ALLOWED` or `VIEW_ONLY` (protected in-browser reader that streams watermarked page images or a watermarked PDF without a download button).  
• Abuse controls (`DownloadPolicy`, `DeviceLimitPolicy`): max downloads per resource per user per period, max concurrent sessions per account, max distinct devices (default 3, configurable), automatic flagging when one account downloads unusually many resources or from many IPs, admin ability to revoke sessions or suspend access, all audit-logged.  
• Record `DownloadEvent` (user, resource, version, ip hash, device id, time).  
• Display an honest notice: no browser-based protection can prevent all screenshots or copying; watermarking is a deterrent and traceability measure.  

### 12.8 Reviews
Only verified buyers (a valid purchase or entitlement) may submit one review per resource. Admin moderation before display. No aggregate ratings or review structured data unless real reviews exist. Reviews are removable on request and when abusive. Feature flag controlled.

---

## 13. Monetization, Plans and Entitlements

### 13.1 Individual purchases
Students buy notes, chapter packs, and bundles. Owner sets every price. Cart supports multiple items, coupon entry, and server-calculated totals.

### 13.2 Subscriptions
Configurable monthly, quarterly, annual plans. Product concepts: FREE, SUBJECT PASS (one selected subject and class), ALL ACCESS (Physics, Chemistry, Mathematics for purchased classes). These are concepts, not final prices. All prices, intervals, included classes and subjects, download rights, and entitlements are admin-configurable. [OWNER DECISION] actual pricing and plan names.

### 13.3 Entitlement model (relational)
Plan has many `PlanEntitlementRule` rows. Each rule: `scopeType` (ALL, CLASS, SUBJECT, CHAPTER, RESOURCE_TYPE, RESOURCE, TAG), `scopeValue`, `effect` (INCLUDE or EXCLUDE), `deliveryMode` override, `downloadAllowed`. A Plan with `selectionRequired` (for example Subject Pass) stores the student's choice in `SubscriptionSelection` (class, subject).

Access evaluation is a single pure, unit-tested function `canAccessResource(user, resource, now)` returning `{allowed, source, reason}`. Order of evaluation:
1. Resource is free and published -> allow.
2. Valid, non-revoked, non-expired individual or bundle `Entitlement` -> allow.
3. Active subscription whose rules INCLUDE the resource and do not EXCLUDE it, within current period (plus configured grace) -> allow.
4. Otherwise deny with an explainable reason (shown to the user as an upgrade or purchase path).

Subscriptions grant derived access evaluated at request time; do not copy one Entitlement row per resource per subscriber. Only individual and bundle purchases create stored Entitlement rows. Document the consistency rules in `docs/ENTITLEMENTS.md`.

### 13.4 Admin pricing controls
Product price, plan price, billing interval, included scopes, discounts and sale prices with start and end dates, coupon eligibility, publication state. Price changes never alter past orders (orders snapshot prices and tax).

### 13.5 Subscription lifecycle
Checkout initiation, server-side verification, activation on verified webhook, renewal, renewal failure with retry and dunning notifications, cancellation (at period end by default), expiry, optional configured grace period, payment history, refund handling, status reconciliation job (daily) against Razorpay, pre-billing reminders. The success page never activates access by itself.

---

## 14. Tax, GST and Invoicing

[LEGAL REVIEW] and [OWNER DECISION]: tax treatment of digital study material depends on the business registration and product classification. Everything below is configurable; a chartered accountant must confirm settings before launch.

### 14.1 TaxSetting (admin, SUPER_ADMIN only)
Business legal name, address, state, GSTIN (optional if unregistered), registration status, default tax rate, HSN/SAC code per product category, price mode (`TAX_INCLUSIVE` default or `TAX_EXCLUSIVE`), place-of-supply rules (intra-state CGST+SGST versus inter-state IGST based on customer state), invoice number series and prefix, financial year reset rule.

### 14.2 Order and tax fields
Order stores: `subtotalInPaise`, `discountInPaise`, `taxableValueInPaise`, `cgstInPaise`, `sgstInPaise`, `igstInPaise`, `taxTotalInPaise`, `totalInPaise`, customer billing state, GSTIN of buyer if provided (optional, for B2B), tax rate snapshot, price mode snapshot. Per-item tax lines are stored in `OrderItem` so partial refunds compute correctly.

### 14.3 Invoices
On verified payment, a background job generates a sequential, gap-free tax invoice (or bill of supply if unregistered) as PDF stored in the private bucket, linked to the order, downloadable from the student dashboard and emailed. Credit notes are generated for refunds. Invoice numbers are immutable. Admin can regenerate the PDF but never alter the number or amounts.

### 14.4 Reports
Admin export (CSV) of sales with tax breakup by period for the owner's accountant.

---

## 15. Refunds, Cancellation and Policy Rules

Policies are structured data (`RefundPolicyRule`) plus editable policy text, so what the platform enforces matches what it publishes.

### 15.1 Configurable rules
For each product category and plan type: refundable yes or no, refund window in days, whether a refund is blocked after the file is downloaded or opened, partial refund percentage, whether subscription refunds are prorated, who can approve (permission), reasons list. [OWNER DECISION] The agent seeds a conservative default (digital notes non-refundable after first download unless the file is defective or wrong; subscriptions cancel at period end) clearly marked as unreviewed.

### 15.2 Workflow
Student or support opens a refund request with reason. System shows policy outcome and eligibility. A user with `refund.approve` approves or rejects with a note. Approved refunds call Razorpay refund API server-side, mark payment and order refund status, create a credit note, revoke the related entitlement (or subscription access) transactionally, notify the student, and write an audit log. Webhook-reported refunds (including those initiated in the Razorpay dashboard) are reconciled into the same records. Disputes and chargebacks flag the order, may suspend access per configuration, and notify admin.

### 15.3 Subscription cancellation
Default: cancel at period end with access retained until expiry. Immediate cancellation and refund only per policy rules. Cancellation confirmation email is sent.

---

## 16. Payment Implementation (Razorpay)

Test mode first. Live mode requires owner credentials and an explicit `PAYMENTS_MODE=live` switch plus a go-live checklist.

### 16.1 One-time purchase flow
1. Student selects items or a plan.
2. Server validates item availability, price, coupon, tax, and eligibility, then recalculates everything (never trust client totals).
3. Server creates a PENDING Order (with price and tax snapshot) and a Razorpay Order.
4. Client opens Razorpay Checkout with the server-provided order id only.
5. Client posts the payment response; server verifies the signature.
6. The verified webhook (`payment.captured`, `payment.failed`, `refund.*`, dispute events) is the source of truth for fulfillment.
7. In one database transaction: mark payment, mark order PAID, create entitlements, redeem coupon, enqueue invoice and email jobs.
8. Student sees access, purchase history, invoice.

### 16.2 Webhook handling
Verify `X-Razorpay-Signature` with the raw body and the webhook secret. Store every event in `WebhookEvent` (provider event id unique) before processing. Idempotent handlers: replays are acknowledged and ignored. Out-of-order events handled by status precedence rules. Failures are retried by the provider and surfaced in `/admin/jobs`; alert on repeated failure. Unknown event types are logged, never crash.

### 16.3 Subscriptions via Razorpay
Use Razorpay Plans and Subscriptions. Maintain provider plan ids on our Plan. Handle `subscription.authenticated`, `activated`, `charged`, `pending`, `halted`, `cancelled`, `completed`, `paused`, `resumed`. Document the recurring-payment constraints: customer authentication and mandate registration are required at sign-up; RBI e-mandate rules require pre-debit notification and additional authentication for higher amounts; some cards and UPI apps may not support recurring; failed charges lead to retries then halted. If the owner's account does not have Subscriptions enabled, build the structure, show subscription plans as "coming soon" via feature flag, and give a setup checklist. Do not fake renewals.

### 16.4 Safety
Never store card data. Never log secrets. Separate test and live keys by environment. Reconciliation job compares provider records with local records daily and reports mismatches.

---

## 17. Minors, Guardian Consent and Data Protection

[LEGAL REVIEW] Students are frequently under 18. India's Digital Personal Data Protection Act, 2023 and its Rules require verifiable parental or guardian consent for processing a child's personal data and restrict tracking and targeted advertising aimed at children. Confirm the current requirements and timelines with qualified counsel before launch. The product must implement the following capabilities so compliance can be configured:

### 17.1 Registration flow
• Collect date of birth (or age band: under 18 / 18 and over) at registration.  
• If under 18 (setting `minorAgeThreshold`, default 18): the account is created in `PENDING_GUARDIAN_CONSENT`. Purchases and optional communications are blocked until consent is verified.  
• Student enters guardian name and guardian email (or phone). The system emails the guardian a consent request with purpose-specific, plain-language notice. Guardian confirms through a tokenised, expiring link, with a recorded `ConsentRecord` (who, what purposes, version of notice, timestamp, IP hash, method). The verification method is a pluggable interface; [OWNER DECISION] the method used for verifiable consent (for example guardian email with OTP, or payment-based verification) per counsel's advice.  
• Guardian can withdraw consent, which suspends the account and triggers the data handling rules.  

### 17.2 Principles implemented
Data minimization (collect only name, email, class, optional phone, guardian contact), purpose limitation, no behavioural tracking or advertising for minors, no marketing email to minors without guardian opt-in, consent notice versioning, separate checkbox for marketing, readable privacy notice.

### 17.3 Data rights
`/dashboard/privacy`: view data, export (JSON and CSV), correction, withdraw consent, request account deletion. Deletion workflow: request, cooling-off period (configurable), anonymize personal data while retaining legally required financial and invoice records for the statutory period, confirm by email, audit log. Data retention schedule is configurable and documented in `docs/DATA_RETENTION.md`. A grievance or contact-officer section is shown in the privacy page, content owner-supplied.

### 17.4 Operational
Breach response runbook stub in `docs/INCIDENT_RESPONSE.md`. Processor list (Supabase, Vercel, Razorpay, Resend, Sentry) documented in the privacy policy template.

---

## 18. Database Design (Prisma + PostgreSQL)

This is the starting architecture; refine for correctness during implementation. Document the final ERD in `docs/ERD.md` (Mermaid).

### 18.1 Global rules
• Money is integer paise; currency code stored; never floats.  
• Every table: `id` (cuid or uuid), `createdAt`, `updatedAt`; content tables also `status`, `publishedAt`, `updatedById`.  
• Soft delete or archive (`archivedAt`) for anything with business history; financial records are never hard-deleted.  
• Unique constraints: slugs, orderNumber, invoice number, providerPaymentId, providerOrderId, providerSubscriptionId, webhook providerEventId.  
• Indexes on foreign keys, status, createdAt, slugs, search columns; Postgres full-text (tsvector with GIN) and pg_trgm for fuzzy search.  
• Transactions for fulfillment, refunds, entitlement changes, coupon redemption (with row locking to prevent over-redemption).  
• RLS enabled as defense in depth (Section 5).  
• Safe, reviewed migrations only (`prisma migrate`), never `db push` in production; destructive migrations need an explicit note.  

### 18.2 Model groups
- **Identity and access**: `User` (`authProviderId`, `name`, `email`, `phone?`, `role`, `classPreference`, `dateOfBirth` or `ageBand`, `status`, `emailVerifiedAt`, `guardianStatus`), `Role`, `Permission`, `RolePermission`, `UserSession` (device id, ip hash, user agent, lastSeenAt, revokedAt), `Guardian`, `ConsentRecord`, `DataRequest` (export or delete), `TeacherProfile`.
- **Curriculum**: `Syllabus`, `Subject`, `SubjectClass`, `Chapter`, `Topic`, `Tag`, `ResourceTag`.
- **Catalog**: `ResourceType`, `Resource`, `ResourceVersion`, `ResourcePreview`, `Bundle`, `BundleResource`, `Review`.
- **Commerce**: `Plan`, `PlanEntitlementRule`, `Subscription`, `SubscriptionSelection`, `Cart`, `CartItem`, `Order`, `OrderItem`, `Payment`, `Refund`, `Invoice`, `CreditNote`, `Coupon`, `CouponEligibility`, `CouponRedemption`, `Entitlement`, `WebhookEvent`, `Price`.
- **Policies and tax**: `TaxSetting`, `RefundPolicyRule`, `DownloadPolicy`, `DeviceLimitPolicy`, `WatermarkPolicy`.
- **Content and CMS**: `SiteSetting`, `NavItem`, `CmsPage`, `CmsPageVersion`, `PageBlock`, `Faq`, `FaqCategory`, `Announcement`, `Testimonial`, `BlogPost`, `BlogCategory`, `MediaAsset`, `Redirect`, `EmailTemplate`, `FeatureFlag`, `RateLimitConfig`.
- **Learning and engagement**: `ChapterProgress`, `ResourceActivity` (opened, last page, completed), `DownloadEvent`, `Notification`, `NotificationPreference`.
- **Support and operations**: `Enquiry`, `SupportTicket`, `SupportMessage`, `AuditLog`, `JobRun`, `EmailLog`, `AnalyticsEvent`.

### 18.3 Required field specifics
• `Order`: orderNumber, userId, status (PENDING, PAID, FAILED, CANCELLED, PARTIALLY_REFUNDED, REFUNDED, DISPUTED), all tax fields from Section 14.2, couponId, snapshot JSON of pricing, billingState, expiresAt for pending.  
• `Payment`: provider ids, amount, currency, method, status, verifiedAt, failureReason, rawEventRef.  
• `Subscription`: planId, providerSubscriptionId, status (CREATED, AUTHENTICATED, ACTIVE, PAST_DUE, PAUSED, CANCELLED, EXPIRED, COMPLETED), currentPeriodStart/End, cancelAtPeriodEnd, cancelledAt, graceEndsAt.  
• `Entitlement`: userId, resourceId or bundleId, sourceType (PURCHASE, BUNDLE, ADMIN_GRANT), orderItemId, startsAt, expiresAt?, revokedAt, revokedReason. Subscription access is derived (Section 13.3).  
• `AuditLog`: actor, action, targetType, targetId, before and after snapshot (secrets redacted), ip hash, createdAt. Append-only.  

### 18.4 Seed script
Idempotent. Seeds roles, permissions, default policies (marked unreviewed), resource types, feature flags, default homepage blocks, draft starter curriculum, FAQ drafts, email template defaults, and no users, orders, payments, reviews, or testimonials. Never seeds a default admin password.

---

## 19. Authentication and Authorization

Required: email registration, email verification, login, logout, password reset, session management (list and revoke sessions), protected student and admin routes, role and permission checks, safe error messages that do not reveal whether an email exists.
• Next.js middleware performs coarse route gating only; real authorization happens in each server action and route handler via `can()`.  
• Secure cookies (`HttpOnly`, `Secure`, `SameSite=Lax`), session rotation on login, re-authentication for sensitive actions (change email, password, delete account, role changes).  
• Password policy per provider with breached-password check where available. Optional TOTP 2FA for admin roles (strongly recommended, required for SUPER_ADMIN before go-live).  
• Account lockout and rate limits (Section 26).  
• Direct access to `/admin/*` by a non-permitted user returns 403 (or 404 to unauthenticated users), never leaks data.  
• IDOR protection: every record lookup for a student is scoped by the authenticated user id.  
• Social login (Google) is optional via feature flag; if added it must use the same Supabase Auth, not a second system.  

---

## 20. Admin Dashboard

A genuinely functional CMS, not a demo. Shared admin shell with permission-aware navigation, data tables with server-side pagination, sorting, filtering, CSV export (permission-gated), bulk actions with confirmation, optimistic UI with error recovery, and responsive table alternatives on mobile.

### 20.1 Overview
Registered students, registrations over time, gross sales, refunds, net revenue, tax collected, successful, pending, failed payments, active and expiring subscriptions, best-selling resources, recent orders, latest enquiries, webhook health, jobs failing. Gross, refunds, and net are always shown separately. No fabricated analytics; empty states are shown when there is no data.

### 20.2 Capabilities by area
• Curriculum: syllabi, subjects, chapters, topics (create, edit, reorder, publish, archive, import).  
• Resources: create, upload PDFs and previews, assign class/subject/chapter, price, free or paid, delivery mode, version history and rollback, preview before publish, publish or unpublish, bulk edit.  
• Bundles, products, pricing, plans: full CRUD, entitlement rules editor with a "who gets access to what" simulator (pick a plan and see matching resources).  
• Orders, refunds, invoices: search by order number or student, filter by status and date, view items and verified provider transactions, inspect failures, issue refunds per policy, download invoices and credit notes.  
• Subscriptions: list, status, renewal and cancellation info, payment events.  
• Coupons: percentage or fixed, validity window, usage limits (total and per user), eligible products or plans, minimum order, stackability rule.  
• Content: pages and homepage blocks editor with live preview, navigation, blog (rich editor with sanitized output), FAQs, announcements, testimonials (with proof of consent flag), media library (image optimization, alt text required).  
• Communication: email templates editor with variable preview and test-send, enquiries and support tickets with status workflow and internal notes.  
• Students: profile view, orders, entitlements, sessions, download events, suspend or reinstate, manual entitlement grant (reason required, audit logged), guardian status.  
• Configuration: settings, tax, policies, feature flags, roles and permission matrix, redirects, rate limits, settings export and import.  
• Operations: audit logs (filter and export), jobs and webhook event inspector with safe replay.  

### 20.3 Safety
Permission check on every operation, audit log on all sensitive changes, confirmation dialogs for destructive actions, validated uploads, no hard-deletion of financial records, archive in place of delete, optimistic concurrency (version number) to prevent two admins overwriting each other.

---

## 21. Student Dashboard

Welcoming, clean learning workspace.
• Overview: greeting and class preference, continue where you left off, recently opened resources, purchased notes, subscription status, recommendations by class and subject (rule-based on real data), progress summary, recent activity, announcements.  
• Library: owned and subscription-accessible resources, filters, search, access source label (Purchased, Included in plan, Free), Open or Download controls honoring delivery mode and limits, "new version available" badge.  
• Purchases: order number, date, items, amount, tax breakup, payment status, refund status, invoice download, retry for failed or pending payments, refund request.  
• Subscription: plan, included subjects and classes, billing interval, next renewal date (as reported by the provider), cancellation state and action, change plan, payment history.  
• Progress: chapter completion (student can mark complete), resource activity, simple indicators per subject. Wording must never imply exam readiness.  
• Downloads, notifications, support, profile, security, consent, privacy: as defined in Section 9.2, including data export and deletion request.  
• Parent view: a guardian account can view linked child's purchases and consent state (read-only), not the child's private activity beyond what policy allows.  

---

## 22. Search and Discovery

Real, database-backed search across resources (title, description), chapters, subjects, topics, and blog articles. Implementation: Postgres full-text search with weighted tsvector columns, trigram fallback for typos, filters (type, class, subject, free or paid), result grouping, highlighted matches, empty, loading, and error states, debounced suggestions endpoint, mobile-friendly UI, rate-limited, only published content returned, queries logged (anonymized) to surface popular searches and zero-result queries to the admin.

---

## 23. Blog, CMS Pages and SEO

- **Blog posts**: title, slug, excerpt, content (sanitized rich text or MDX-safe subset), cover image with alt text, author (from `TeacherProfile` or staff), category, tags, published date, SEO title, meta description, Open Graph and Twitter metadata, related resources, reading time, scheduled publishing.
- **SEO**: server-rendered pages, unique titles and descriptions from DB with sensible fallbacks, canonical URLs, dynamic `sitemap.xml` and `robots.txt` (excluding `/dashboard`, `/admin`, `/api`, `/cart`, `/checkout`, search result pages with filters), Open Graph images (dynamic via `next/og`), semantic HTML, breadcrumbs, `Redirect` table honored in middleware, clean slugs with automatic redirect when a slug changes. Structured data (Organization, Course-less Product only for real products, BreadcrumbList, Article) only when accurate. No fake ratings, no AggregateRating without real reviews, no false accreditation.

---

## 24. Analytics, Cookies and Consent

• First-party `AnalyticsEvent` table for core funnel: page view (aggregate), search, resource view, add to cart, checkout started, payment success, registration, download. No personal data in events; user id only for logged-in adults, no tracking events tied to identified minors beyond what is necessary for service delivery.  
• Optional third-party analytics (privacy-focused) loads only after consent where required. Cookie banner with granular categories (necessary, analytics), stored consent record, easy withdrawal, `/cookie-policy` page. Essential cookies (session, CSRF, cart) need no consent.  
• Admin analytics: funnel conversion, top resources, search terms, revenue by product and period, cohort of registrations to first purchase, subscription churn, all computed from real data.  
• Abandoned-cart reminders are off by default, adult-only, consent-based, behind a feature flag, and never sent to minor accounts without guardian opt-in.  

---

## 25. Email and Notifications

Transactional emails: verification, password reset, guardian consent request, purchase confirmation with invoice, subscription activation, payment failure, renewal reminder (pre-debit notice where required), cancellation, refund processed, new version available (opt-in), enquiry and support confirmation, admin alerts (failed webhooks, new enquiry, refund request).

Templates are DB-editable with a variable whitelist, branded responsive layout, plain-text alternative, test-send, delivery logging (`EmailLog`), bounce and complaint handling via provider webhook, retry with backoff, and only sent when the triggering event is genuine and the provider is configured. In-app `Notification` mirrors key events. Marketing email (if ever enabled) is separate, requires explicit opt-in, includes one-click unsubscribe, and excludes minors without guardian consent.

---

## 26. Security Requirements

• Server-side validation (Zod) of every input; typed error responses; output encoding by default; no `dangerouslySetInnerHTML` with unsanitized content (use a server-side allowlist sanitizer for rich text).  
• Rate limiting (Upstash Redis or Postgres-backed) with admin-editable values. Defaults to implement: login 5 attempts per 15 min per account and per IP, password reset 3 per hour per email, registration 10 per hour per IP, enquiry 3 per hour per IP, search 30 per minute per IP, download 20 per hour per user (policy-overridable), webhook endpoint exempt but signature-verified.  
• Bot protection on public forms (Cloudflare Turnstile or hCaptcha) behind a flag.  
• Security headers: CSP (nonce-based, allowing only Razorpay, Supabase, Sentry, Resend as needed), HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors control. CSRF protection for state-changing routes.  
• Secrets only in environment variables; service-role key server-only and never imported by client code (enforce with a lint rule and a build-time check). `.env*` in `.gitignore`; secret-scanning in CI.  
• Payment: signature verification, raw body webhooks, idempotency, server-owned prices, amount and currency match checks between our order and provider payment.  
• Files: private buckets, signed URLs, MIME and magic-byte validation, size limits, filename sanitization, no execution of uploaded content.  
• Dependency hygiene: lockfile, npm audit and Dependabot in CI.  
• Audit log all privileged actions. Session revocation. Admin 2FA.  
• Document remaining operational requirements (key rotation schedule, access reviews, backup restore drills, pen-test before launch) in `docs/SECURITY.md`. Do not claim the system is "fully secure".  

---

## 27. Legal and Educational Content

[LEGAL REVIEW] All policies below are editable `CmsPage` records with versioning and a visible "last updated" date. The agent drafts clearly flagged template text; the owner and counsel finalize it. Admin shows a launch blocker list for any policy still in UNREVIEWED state.

Policies: Terms and Conditions, Privacy Policy (including children's data and guardian consent), Cookie Policy, Refund and Cancellation Policy, Subscription Terms, Digital Delivery and Licence Terms (personal, non-transferable, no redistribution, watermark notice), Acceptable Use, Contact and Grievance details.

Content rules: notes sold must be original or properly licensed. Never upload or redistribute NCERT scans or other copyrighted material. Do not use NCERT or CBSE logos or imply affiliation; add an editable disclaimer such as "EVOH Academy is an independent educational initiative and is not affiliated with NCERT or CBSE." Collect only necessary student data. Display legal links in checkout and registration, with a recorded acceptance of terms version at purchase and signup.

---

## 28. Environment, Setup and Admin Bootstrap

### 28.1 Repository deliverables
Clean structure (`/app`, `/components`, `/server`, `/lib`, `/prisma`, `/emails`, `/tests`, `/docs`, `/scripts`), `README.md`, `.env.example` (placeholders only), Prisma schema and migrations, idempotent seed, reusable Zod schemas, shared authorization utilities, error and loading boundaries, structured logging, `docs/` set (`PRD`, `DESIGN_SYSTEM`, `AUTH_ARCHITECTURE`, `ENTITLEMENTS`, `ERD`, `SECURITY`, `DATA_RETENTION`, `INCIDENT_RESPONSE`, `GO_LIVE_CHECKLIST`, `OPEN_DECISIONS`, `RUNBOOK`).

### 28.2 Environment variables (names only)
`DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only), `SUPABASE_STORAGE_BUCKET_PRIVATE`, `SUPABASE_STORAGE_BUCKET_PUBLIC`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `PAYMENTS_MODE` (test or live), `RESEND_API_KEY`, `EMAIL_FROM`, `SENTRY_DSN`, `RATE_LIMIT_REDIS_URL` and token, `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`, `CRON_SECRET`, `SIGNED_URL_TTL_SECONDS`. Validate all at boot with a typed `env.ts` (Zod); missing optional integrations degrade gracefully with visible "not configured" states in admin.

### 28.3 Secure first-admin bootstrap
No seeded credentials. Provide `npm run admin:create` which: requires `ADMIN_BOOTSTRAP_TOKEN` set in the environment, takes an email, triggers Supabase invite or sets password via secure prompt (never echoed or logged), assigns `SUPER_ADMIN`, writes an audit log, and refuses to run if a `SUPER_ADMIN` already exists unless an explicit `--force` flag and confirmation are given. Document usage in the README. Further staff are invited from `/admin/roles` by a SUPER_ADMIN.

---

## 29. Performance, Responsiveness and Accessibility

• Server-render and cache public content with tag-based revalidation; keep personalized responses private, no-store; no personalized data in shared caches.  
• Optimized images (`next/image`, responsive sizes, AVIF/WebP, explicit dimensions), lazy-load below the fold, code-split heavy components, dynamic import 3D and rich editors, minimal client JS on public pages, prevent layout shift, font optimization.  
• Paginate admin datasets, index and profile slow queries, connection pooling for serverless (Supabase pooler), avoid N+1 queries.  
• Performance budget enforced in CI (Lighthouse CI or equivalent) against Section 1.3 targets.  
• Responsive at 375, 768, 1024, 1440 px; no horizontal overflow; touch targets at least 44 px; responsive tables; mobile-friendly PDF reader behavior (page-by-page viewer, pinch zoom).  
• Accessibility to WCAG 2.2 AA: semantic landmarks and headings, labelled forms, keyboard navigation, visible focus, accessible dialogs and menus (via shadcn/Radix), sufficient contrast, alt text required in CMS, prefers-reduced-motion support, live regions for async status, meaningful error messages. Automated axe checks in tests plus manual keyboard pass.  
• Motion: used to clarify hierarchy and state, never on every element; content must remain visible if animation fails.  
• Real states everywhere: loading (skeletons), success, failure, empty, disabled, pending.  

---

## 30. Testing Requirements

Tools: Vitest (unit and integration), Playwright (E2E), axe (accessibility), a test database (isolated, migrated, seeded per run), Razorpay mocked at the HTTP boundary plus a manual sandbox checklist.

Must-have automated coverage:
• **Auth**: register, verify email, login, logout, reset password, minor registration pending consent, guardian consent link (valid, expired, reused), non-admin blocked from admin pages and APIs, role escalation attempts rejected.  
• **Marketplace**: published resources listed, unpublished hidden (including direct URL), filters and search return correct data, paid resource denied without entitlement, free resource accessible, IDOR attempts rejected.  
• **Entitlements**: exhaustive table-driven tests of `canAccessResource` for purchase, bundle, plan include/exclude, expired, revoked, grace period, subject-pass selection.  
• **Pricing and tax**: server recalculation ignores client totals, coupon rules and limits, concurrency on coupon redemption, GST intra-state and inter-state, tax-inclusive and exclusive modes, rounding, invoice numbering gap-free under concurrency.  
• **Payments**: invalid signature rejected, valid verified fulfillment, duplicate webhook ignored, out-of-order events, failed and delayed payments, amount mismatch rejected, refund reconciliation, entitlement and order consistency.  
• **Subscriptions**: activation only after verified event, renewal, failed renewal to past-due to halted, cancellation at period end, expiry removes derived access, reconciliation job.  
• **Files**: signed URL only after authorization, URL expiry, watermark applied with user data, download limit and device limit enforcement, invalid file type rejected.  
• **Admin**: resource create/update/replace with versioning, pricing changes do not alter old orders, permission matrix per role, audit logs written, optimistic concurrency conflict.  
• **UX**: navigation with no dead links (automated link crawler), forms, empty and error states, mobile layouts at the four viewports, reduced-motion, keyboard flows, 3D fallback when WebGL disabled.  
• **Privacy**: data export, deletion workflow retains invoices, consent withdrawal.  

Report actual results (pass, fail, skipped with reason). Never claim unverified success.

---

## 31. Implementation Phases

Each phase ends with a phase report and passing build, type check, lint, and tests for that phase's scope.

• **Phase 0: Discovery**. Inspect repo, produce implementation checklist, list missing credentials, create `docs/OPEN_DECISIONS.md`, `docs/DESIGN_SYSTEM.md` draft, ERD.  
• **Phase 1: Foundation**. Next.js, TypeScript strict, Tailwind, shadcn, design tokens from `SiteSetting`, Prisma schema, migrations, RLS policies, seed, env validation, Supabase Auth integration, `can()` and permission tables, logging, Sentry, CI pipeline.  
• **Phase 2: Dynamic CMS core**. Settings, navigation, page blocks, CMS pages, media, revalidation, admin shell. (Built early so every later page is dynamic from day one.)  
• **Phase 3: Public site**. Homepage via blocks, classes, subjects, chapters, notes list and detail, bundles, pricing, free resources, about, FAQ, contact, blog, legal pages, search, SEO, sitemap, responsive and a11y pass.  
• **Phase 4: Auth and student experience**. Registration with age check, guardian consent, verification, login, dashboard, library, profile, security, progress, privacy tools.  
• **Phase 5: Marketplace and payments**. Uploads and versions, private storage, signed URLs, watermarking, delivery modes, cart, checkout, tax, Razorpay test mode, webhooks, entitlements, invoices, emails, downloads and limits.  
• **Phase 6: Subscriptions**. Plans and entitlement rules, Razorpay subscriptions (or feature-flagged placeholders plus checklist), lifecycle sync, dunning, dashboard, cancellation, expiry, reconciliation.  
• **Phase 7: Admin completion**. All remaining admin routes, orders, refunds, coupons, blog, enquiries, support, reviews, analytics, tax, policies, roles, audit logs, jobs.  
• **Phase 8: Visual refinement**. Hero 3D scene with fallbacks, SVG subject visuals, typography polish, restrained motion, mobile and reduced-motion testing, performance budget tuning.  
• **Phase 9: QA and launch readiness**. Full test suite, security review checklist, accessibility audit, load test of webhook and download paths, backup restore drill, Razorpay sandbox end-to-end, go-live checklist, production environment docs, deployment when credentials are available.  
• **Post-launch backlog**: subject 3D scenes, video lectures, mock-test engine, Hindi UI, referral program.  

---

## 32. Environments, CI/CD, Backups and Monitoring

• **Environments**: local, preview (per pull request on Vercel with its own Supabase branch or shared staging DB), staging, production. Separate Supabase projects, Razorpay test versus live keys, and storage buckets per environment. No production data in non-production.  
• **CI (GitHub Actions)**: install, lint, type check, unit and integration tests with ephemeral Postgres, build, Playwright E2E on preview, axe checks, Lighthouse budget, dependency audit, secret scan. Required status checks before merge to main. Conventional commits and branch protection.  
• **CD**: Vercel deploys from main; database migrations run through a controlled step (`prisma migrate deploy`) before app promotion, with expand-and-contract migration practice for zero downtime and a documented rollback path.  
• **Backups and recovery**: automated daily database backups with point-in-time recovery on the Supabase plan, storage bucket backup or replication strategy for paid PDFs and invoices, quarterly restore drill documented, target RPO 24 hours or better and RTO 4 hours (editable in `docs/RUNBOOK.md`).  
• **Monitoring and alerting**: Sentry errors and performance, uptime checks on `/api/health` and key pages, alerts for webhook failure spikes, payment mismatch from reconciliation, failed invoice or email jobs, storage errors, elevated 5xx, and cron job misses. Log retention policy documented (no secrets or full personal data in logs).  
• **Runbook**: how to rotate keys, replay a webhook, regenerate an invoice, revoke a user, disable payments (feature flag kill switch), put the site in maintenance mode, restore from backup.  

---

## 33. Agent Execution Protocol (copy into AGENTS.md / Antigravity rules)

### Before coding
1. Inspect the repository; preserve useful existing work.
2. Read this PRD fully. Produce an implementation plan and task list, then wait for approval in Planning mode.
3. List missing credentials and external dependencies. Create `docs/OPEN_DECISIONS.md` with every [OWNER DECISION] and [LEGAL REVIEW] item.

### While coding
4. Obey the Zero-Hardcoding Rule (Section 4). If you are about to type a business string, price, link, or list into a component, stop and model it in the database and admin UI instead.
5. Work feature by feature, vertical slices (schema, server logic, admin UI, public UI, tests).
6. Business logic lives in `/server` services, with unit tests; no logic duplicated in route files or components.
7. Never silently replace real functionality with mock data. If blocked by credentials, build the integration boundary, a clear "not configured" state, and setup instructions.
8. Never expose or commit secrets. Never trust client-supplied prices, roles, user ids, or payment status.
9. Do not invent testimonials, statistics, counts, ratings, credentials, or legal claims.
10. Do not expand scope beyond Section 2.1. Record scope requests in `docs/OPEN_DECISIONS.md`.
11. Prefer current stable APIs; verify library versions and Razorpay and Supabase behavior against current official documentation during the build rather than relying on memory; note any version-specific decisions in the README.
12. Keep commits small and meaningful. Record assumptions in the phase report.

### After each phase
13. Run: install, Prisma migrate, seed, lint, type check, tests, build, and start the app. Open key pages in the browser agent and capture screenshots at 375, 768, 1024, 1440 px for UI phases.
14. Fix all errors. Write a phase report: completed, partially done, blocked, assumptions, test results (actual numbers).
15. Do not claim a feature works unless it was implemented and tested. Do not stop at a plan or a homepage screenshot.

### At the end
Run the full suite, produce the final report: features completed, remaining blockers, local setup commands, payment configuration steps, deployment steps, and the go-live checklist.

---

## 34. Acceptance Criteria

The project is not complete until all of the following are true.
1. Every route in Section 9 is implemented, or documented with the external dependency that blocks it.
2. All navigation works; an automated crawler finds no dead links or empty buttons.
3. Responsive at 375, 768, 1024, 1440 px with no horizontal overflow.
4. Visual identity is consistent, distinctive, and not a generic template.
5. Homepage has the custom hero 3D scene with static fallback, within performance budget, usable without WebGL.
6. All site copy, navigation, homepage blocks, FAQs, policies, curriculum, products, plans, prices, tax settings, email text, and theme values are database-driven and editable in admin; a grep of the codebase finds no hardcoded business content.
7. Admin can create and edit resources, upload PDFs, version files, set prices and plans, manage orders, refunds, coupons, content, and settings without editing code, and edits appear on the public site without a redeploy.
8. Student registration, verification, login, reset, and logout work; minors flow through guardian consent before purchasing.
9. Admin and student routes enforce server-side authorization; role escalation is impossible; a student gets 403 on admin URLs and APIs.
10. Free resources follow their rules; paid resources require valid entitlements, rechecked on every file request.
11. Purchase amounts and tax are computed on the server; client-supplied totals are ignored.
12. Payment signature and webhook verification implemented; duplicate webhooks never duplicate fulfillment; failed and delayed payments handled.
13. Subscriptions activate only from verified provider events; entitlements follow plan rules; cancellation, expiry, and failed-renewal flows behave per spec; or are clearly flag-disabled with a setup checklist if provider access is missing.
14. GST-aware invoices (or bills of supply) generated sequentially, downloadable, with credit notes for refunds.
15. Refund workflow enforces configured policy and reconciles with provider.
16. Protected PDFs are never reachable by public URL; signed URLs are short-lived; per-user watermarking, download limits, and device limits function.
17. Search and filters return real data with proper empty, loading, and error states.
18. Privacy tools work: consent records, data export, deletion request flow.
19. Cookie consent and analytics follow Section 24.
20. Automated tests from Section 30 pass; lint, type check, and production build pass; actual results reported.
21. Accessibility checks pass WCAG 2.2 AA automated rules plus manual keyboard review.
22. Performance targets in Section 1.3 are met or deviations documented.
23. CI/CD, monitoring, backup, and runbook documentation exist (Section 32).
24. No real credentials committed; secret scan clean.
25. README documents setup, migrations, seeding, admin bootstrap, testing, payment configuration, and deployment; the app runs locally using documented commands.
26. No fake testimonials, revenue, purchases, ratings, or credentials appear anywhere.
27. Every unreviewed legal and tax item appears on the go-live blocker list.

---

## 35. Open Decisions Register (owner must fill before launch)

| # | Decision | Default the agent will use until decided |
| :--- | :--- | :--- |
| 1 | Board and syllabus edition | Starter chapters in DRAFT, marked unverified |
| 2 | Plan names, prices, intervals, included scope | Plans in DRAFT, no live prices |
| 3 | GST registration, rate, HSN/SAC, price mode | Tax disabled with warning; inclusive mode when enabled |
| 4 | Refund and download rules | Conservative defaults, flagged unreviewed |
| 5 | Guardian consent verification method | Email OTP to guardian, pending counsel advice |
| 6 | Age threshold and data retention periods | 18 years; retention schedule placeholder |
| 7 | Device and download limits | 3 devices, per-policy download cap |
| 8 | Resource delivery mode default (download or view-only) | Download with watermark |
| 9 | Major new edition sold separately or free update | Free updates to current version |
| 10 | Reviews and testimonials enabled | Off until real content exists |
| 11 | Rate limit values and 2FA enforcement | Defaults in Section 26; 2FA required for SUPER_ADMIN |
| 12 | Contact details, teacher profile and credentials | Empty; teacher block hidden until filled |
| 13 | Custom domain and email sender domain | Preview domain only |
| 14 | Razorpay live KYC and subscription product enablement | Test mode only, plans feature-flagged |
| 15 | Analytics provider | First-party events only |
| 16 | Virus-scan provider for uploads | Pluggable interface, disabled until chosen |
