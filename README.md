# EVOH Academy 🌌

> **Production-grade, fully dynamic science education platform for Class 11 & 12 (Physics, Chemistry, Maths). Features an interactive Three.js 3D hero, CMS-driven curriculum, dynamically watermarked PDF notes marketplace, GST-compliant invoicing, Razorpay payments, granular RBAC, and DPDP Act minor protection. Built with Next.js 15, Prisma, and Tailwind CSS.**

---

## 🚀 Key Highlights & Architectural Features

- **Interactive 3D Science Hero**: Procedural Three.js Quantum Orbital & Molecular Crystal Lattice with pointer tracking, orbital dynamics, and automatic static SVG fallback for low-power or reduced-motion environments.
- **The Zero-Hardcoding Rule (PRD Sec 4)**: 100% of curriculum hierarchy, product prices, tax rates, page blocks, policy text, and brand design tokens are database-driven and manageable via Admin CMS.
- **Protected Content Delivery & Piracy Deterrent (PRD Sec 12)**:
  - Dynamically watermarked PDFs stamped per request with student name, masked email, order reference, and timestamp.
  - In-browser protected web reader with zoom, page-by-page navigation, and watermarking.
  - Short-lived signed URLs for authorized downloads.
- **GST & Commerce Engine (PRD Sec 14 & 16)**:
  - Pure integer paise math implementing Place-of-Supply rules (CGST+SGST for intra-state, IGST for inter-state).
  - Razorpay Orders, client checkout, and raw-body signature-verified idempotent webhook processing.
  - Automated sequential gap-free tax invoice issuance and credit notes.
- **Granular RBAC (PRD Sec 3)**: Central `can(user, permission, context?)` authorization engine governing `SUPER_ADMIN`, `ADMIN`, `EDITOR`, `SUPPORT`, `STUDENT`, and `GUARDIAN`.
- **Child Privacy & DPDP Act 2023 Compliance (PRD Sec 17)**:
  - Age-verification gate during registration.
  - Accounts under 18 enter `PENDING_GUARDIAN_CONSENT` until verified.
  - Privacy Center (`/dashboard/privacy`) supporting machine-readable data exports (JSON) and statutory account deletion workflows.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript strict, Tailwind CSS, Lucide Icons, Motion |
| **3D & Graphics** | Three.js (Procedural geometries, orbital physics, WebGL canvas) |
| **Backend & ORM** | Next.js Server Actions & Route Handlers, Prisma ORM 6, PostgreSQL |
| **Auth & Storage** | Supabase Auth (`@supabase/ssr`), Supabase Private Storage |
| **Payments** | Razorpay Checkout, Subscriptions, Idempotent Webhooks |
| **Testing** | Vitest (17 passing unit & integration tests) |

---

## 📦 Quick Start & Local Setup

### 1. Prerequisites
- Node.js >= 18
- npm >= 9

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/saiyamsharma01/EVOH-Academy.git
cd EVOH-Academy
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase, PostgreSQL, and Razorpay test credentials as needed.

### 4. Database Setup & Seeding
```bash
# Generate Prisma Client
npx prisma generate

# Push or migrate database schema
npm run db:push

# Run idempotent database seed
npm run db:seed
```

### 5. Secure First-Admin Bootstrap
To initialize the platform owner account with `SUPER_ADMIN` privileges (no seeded passwords):
```bash
ADMIN_BOOTSTRAP_TOKEN="evoh-secure-bootstrap-token-change-in-prod" \
npm run admin:create -- --email="owner@evohacademy.com" --name="Teacher Name"
```

### 6. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Automated Testing

Run the test suite:
```bash
npm test
```
All 17 table-driven tests covering RBAC permissions, GST tax math, and entitlement evaluations pass automatically.

Run type-checking:
```bash
npx tsc --noEmit
```

Build production bundle:
```bash
npm run build
```

---

## 📂 Project Structure

```
├── app/                  # Next.js App Router (Public, Dashboard, Admin, API)
│   ├── (public)          # Classes, Subjects, Notes, Bundles, Pricing, Blog, FAQ
│   ├── admin/            # Admin CMS, Brand Theme Settings, RBAC Matrix
│   ├── dashboard/        # Student Dashboard, Library, Reader, Purchases, Privacy
│   ├── api/              # Health, Search, Downloads, Razorpay Webhooks
│   └── _design/          # Living Design System & Component Gallery
├── components/           # Reusable UI components
│   ├── 3d/               # Three.js 3D Quantum Orbital Scene
│   ├── blocks/           # Dynamic PageBlock Registry (Hero, Portals, Showcases)
│   └── layout/           # Dynamic Navbar & Footer with disclaimers
├── docs/                 # PRD v2.0, ERD, Design System, Open Decisions, Phase Report
├── lib/                  # Database singleton, logger, settings loaders, env validator
├── prisma/               # Database schema (74 models) and seed script
├── scripts/              # Secure first-admin bootstrap utility
├── server/               # Pure business domain layer (Auth RBAC, Entitlements, Tax)
└── tests/                # Automated Vitest test suite
```

---

## ⚖️ Legal & Independent Entity Notice

EVOH Academy is an independent educational initiative and is not affiliated with, endorsed by, or associated with the National Council of Educational Research and Training (NCERT), the Central Board of Secondary Education (CBSE), or any government examination authority. All notes, formula sheets, and derivations are original educational syntheses.

---

## 🔒 License & Intellectual Property

**Proprietary & Confidential. All Rights Reserved.**

Copyright © 2026 EVOH Academy / Saiyam Sharma.

No person or entity may copy, modify, distribute, publish, sublicense, reverse-engineer, deploy, or commercially exploit any portion of this application, source code, database architecture, or educational materials without explicit prior written authorization from the copyright holder. See the [LICENSE](file:///Users/saiyam/EVOH%20Academy/LICENSE) file for complete terms.

