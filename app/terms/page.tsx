import React from "react";
import { AlertCircle } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | EVOH Academy",
};

export default function TermsPage() {
  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Unreviewed Notice per PRD Section 0 & 27 */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-mono flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>[LEGAL REVIEW REQUIRED]:</strong> This document contains unreviewed placeholder terms for platform build verification. It must be reviewed and finalized by qualified legal counsel prior to commercial live operations.
        </span>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-primary tracking-tight">
          Terms and Conditions
        </h1>
        <p className="text-xs font-mono text-ink-muted">
          Last Updated: October 2026 • Version 1.0 (Draft)
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-ink-muted leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the EVOH Academy website, purchasing study notes, or subscribing to educational services, you agree to be bound by these Terms and Conditions. If you are under 18 years of age, you must obtain verifiable consent from your parent or guardian prior to creating an account or making any purchase.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">2. Non-Affiliation Disclaimer</h2>
          <p>
            EVOH Academy is an independent educational platform. EVOH Academy is not affiliated with, authorized, sponsored, or endorsed by the National Council of Educational Research and Training (NCERT), the Central Board of Secondary Education (CBSE), or any government examination authority.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">3. Intellectual Property & Digital License</h2>
          <p>
            All study materials, derivation sheets, notes, and digital content sold on EVOH Academy are the proprietary intellectual property of the author. Upon purchase, you are granted a personal, revocable, non-exclusive, non-transferable license to access and read the materials for your individual academic study. Redistribution, resale, or public sharing of these files is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">4. Digital Watermarking & Traceability</h2>
          <p>
            Every downloaded PDF contains personalized digital watermarks including your name, masked email address, and order transaction reference. Attempting to strip, alter, or obscure these watermarks is a violation of these Terms and will result in immediate termination of account access without refund.
          </p>
        </section>
      </div>

    </div>
  );
}
