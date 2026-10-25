# Open Decisions Register & Legal Review Tracker

This document tracks all items requiring **[OWNER DECISION]** or **[LEGAL REVIEW]** as mandated by `docs/PRD.md`.
The agent will build configurable settings with safe default values until decisions are finalized.

---

## 1. Owner Decisions Register (Section 35)

| # | Item & Section | Description & Question | Default Used by Agent | Owner Decision / Status |
|---|---|---|---|---|
| 1 | **Curriculum Board & Syllabus** (Sec 11.4, 35.1) | Which specific education board (CBSE, ICSE, State) and syllabus edition (year) should be officially targeted? | Seeded starter chapters marked as `DRAFT` and syllabusVersion as `"unverified"`. No claims of official endorsement. | Pending Owner confirmation |
| 2 | **Plan Names, Pricing & Scopes** (Sec 13.2, 35.2) | What are the exact subscription tiers, naming, pricing (INR), billing intervals, and included subjects/classes? | Seed default tiers (`Free`, `Subject Pass`, `All Access`) in `DRAFT` status with no active charges or live checkout until confirmed. | Pending Owner confirmation |
| 3 | **GST & Tax Configuration** (Sec 14, 35.3) | Business legal name, GSTIN (if registered), default GST rate, HSN/SAC codes, and tax-inclusive vs exclusive price mode. | Default to `TAX_INCLUSIVE`, tax calculation disabled with warning notice in checkout until business tax settings configured. | Pending Owner / CA Review |
| 4 | **Refund & Cancellation Rules** (Sec 15, 35.4) | Refund window (days), partial refund allowances, whether download/viewing revokes refund eligibility. | Conservative default: digital notes non-refundable once downloaded/viewed; subscriptions cancel at period end. Marked unreviewed. | Pending Owner Review |
| 5 | **Guardian Consent Verification Method** (Sec 17.1, 35.5) | Specific verifiable parental consent method for minors under 18 (e.g. Email OTP, payment verification, phone SMS). | Email OTP to guardian with tokenized confirmation link and explicit purpose notices. | Pending Counsel Advice |
| 6 | **Age Threshold & Data Retention** (Sec 17, 35.6) | Minor age threshold (standard 18) and data retention periods for logs, soft-deleted accounts, and audit entries. | Age threshold set to 18; statutory 7-year retention for financial/tax invoices; 30-day cooling off for data deletion. | Pending Counsel Advice |
| 7 | **Device & Download Limits** (Sec 12.7, 35.7) | Allowed concurrent sessions and distinct active devices per student account, plus hourly/daily download quotas. | Maximum 3 distinct devices per account; 20 downloads per hour quota. | Pending Owner confirmation |
| 8 | **Resource Delivery Mode Default** (Sec 12.7, 35.8) | Should default resource mode be `DOWNLOAD_ALLOWED` (watermarked PDF download) or `VIEW_ONLY` (in-browser reader)? | `DOWNLOAD_ALLOWED` with personalized watermark applied per request. | Pending Owner confirmation |
| 9 | **Major Edition Updates** (Sec 12.5, 35.9) | Are major new edition revisions provided as free updates to past buyers or sold as separate resources? | Free updates served to existing entitlement holders via latest `ResourceVersion`. | Pending Owner confirmation |
| 10 | **Reviews & Testimonials Visibility** (Sec 12.8, 35.10) | Enable student reviews and testimonial showcase blocks? | Feature flagged OFF by default; blocks auto-hide until verified, consented entries are approved by admin. | Pending Owner confirmation |
| 11 | **Rate Limiting & Admin 2FA** (Sec 26, 35.11) | Rate limit thresholds across auth/checkout/search, and enforcement of TOTP 2FA for administrative staff. | Section 26 defaults implemented; TOTP 2FA required for `SUPER_ADMIN` before live launch. | Pending Owner confirmation |
| 12 | **Teacher Profile & Credentials** (Sec 6, 10, 35.12) | Teacher bio, photo, verified academic credentials, and official contact channels. | Empty defaults; Teacher block in homepage automatically hidden until owner enters verified profile in admin. | Pending Owner profile input |
| 13 | **Custom Domain & Email Sender** (Sec 5, 28, 35.13) | Production domain name and Resend verified sender domain/address. | Local and preview domain placeholders (`noreply@evohacademy.com`). | Pending Domain setup |
| 14 | **Razorpay Live Activation** (Sec 16, 35.14) | Merchant onboarding, live KYC, and Razorpay Subscriptions product enablement. | Test mode keys (`PAYMENTS_MODE=test`); subscriptions feature-flagged if provider recurring not enabled. | Pending Razorpay Account KYC |
| 15 | **Analytics Engine** (Sec 24, 35.15) | Choice of privacy-respecting analytics provider (e.g. Plausible, self-hosted, or first-party only). | First-party `AnalyticsEvent` table only; zero third-party scripts loaded without cookie consent. | Pending Owner confirmation |
| 16 | **Upload Virus-Scanning Provider** (Sec 12.6, 35.16) | Provider or webhook service for scanning uploaded PDFs (e.g., ClamAV, VirusTotal). | Pluggable interface stubbed; local MIME & magic byte verification active. | Pending Provider choice |

---

## 2. Legal Review Checklist (Section 27)

All policies ship with clearly flagged **UNREVIEWED PLACEHOLDER** text in `CmsPage` tables. Admin dashboard will flag these as **Launch Blockers** until approved by qualified legal counsel.

- [ ] **Terms and Conditions**: Educational disclaimer, intellectual property, liability limitation.
- [ ] **Privacy Policy (DPDP Act 2023)**: Child data protection, guardian consent mechanics, data fiduciary identity, grievance officer details.
- [ ] **Cookie Policy**: Essential vs analytics cookie classifications and consent withdrawal.
- [ ] **Refund and Cancellation Policy**: Statutory and commercial digital content refund terms.
- [ ] **Subscription Terms**: Billing cycle, auto-renewal notices, e-mandate pre-debit notifications, cancellation rights.
- [ ] **Digital Delivery & License Agreement**: Personal non-exclusive license, prohibition of redistribution, notice of dynamic digital watermarking for traceability.
- [ ] **Independent Entity Disclaimer**: Explicit disclaimer: *"EVOH Academy is an independent educational initiative and is not affiliated with, endorsed by, or associated with NCERT, CBSE, or any government education board."*
