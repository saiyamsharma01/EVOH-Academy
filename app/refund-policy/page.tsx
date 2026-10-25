import React from "react";
import { AlertCircle } from "lucide-react";

export const metadata = {
  title: "Refund and Cancellation Policy | EVOH Academy",
};

export default function RefundPolicyPage() {
  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Unreviewed Notice */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-mono flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>[LEGAL REVIEW REQUIRED]:</strong> This document contains unreviewed placeholder terms for digital notes refunds and recurring subscriptions.
        </span>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-primary tracking-tight">
          Refund and Cancellation Policy
        </h1>
        <p className="text-xs font-mono text-ink-muted">
          Last Updated: October 2026 • Version 1.0 (Draft)
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-ink-muted leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">1. Digital Study Materials Policy</h2>
          <p>
            Due to the immediate digital nature of downloadable PDF files and formula sheets, purchases are generally non-refundable once the file has been downloaded or viewed. If a file is technically defective, corrupted, or does not match the published chapter description, a full refund or immediate replacement will be issued upon support verification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">2. Subscriptions Cancellation</h2>
          <p>
            You may cancel your recurring subscription at any time through your Student Dashboard (<code>/dashboard/subscription</code>). Cancellation takes effect at the conclusion of your current paid billing period; you retain uninterrupted access to your subscription materials until that date.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">3. Refund Processing & Credit Notes</h2>
          <p>
            Approved refunds are credited back to the original payment source via our payment gateway partner (Razorpay) within 5 to 7 business days. A sequential credit note is issued for every approved refund.
          </p>
        </section>
      </div>

    </div>
  );
}
