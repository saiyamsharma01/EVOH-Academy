import React from "react";
import { AlertCircle, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | EVOH Academy",
};

export default function PrivacyPage() {
  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Unreviewed Notice */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-mono flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>[LEGAL REVIEW REQUIRED]:</strong> This document contains unreviewed placeholder terms drafted for DPDP Act 2023 compliance architecture. It must be vetted by counsel before launch.
        </span>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-primary tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-ink-muted">
          Last Updated: October 2026 • Compliant with DPDP Act, 2023 Principles
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-ink-muted leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">1. Protection of Children & Minors&apos; Personal Data</h2>
          <p>
            In adherence to the Digital Personal Data Protection Act, 2023 (DPDP), EVOH Academy implements strict protections for students under 18 years of age. Accounts registered by individuals under 18 remain in a <code>PENDING_GUARDIAN_CONSENT</code> status until verifiable parental or guardian consent is obtained. No behavioral profiling or targeted advertising is conducted on minors.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">2. Data Minimization & Collection</h2>
          <p>
            We collect only essential data needed to provide educational access: student name, email address, optional contact phone, class level preference, and guardian details when required. We never collect sensitive personal financial information; payment transactions are processed entirely by authorized payment gateways (Razorpay).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">3. Data Subject Rights (Export & Deletion)</h2>
          <p>
            Students and verified guardians may access the Student Privacy Center at <code>/dashboard/privacy</code> to review all stored personal information, download a machine-readable export (JSON/CSV), or request account deletion. Statutory tax invoice records are retained for mandatory financial compliance periods.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">4. Data Protection Grievance Officer</h2>
          <p>
            For privacy inquiries or grievance redressal, please contact our designated Grievance Officer at <code>privacy@evohacademy.com</code>.
          </p>
        </section>
      </div>

    </div>
  );
}
