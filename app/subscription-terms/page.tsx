import React from "react";
import { AlertCircle } from "lucide-react";

export const metadata = {
  title: "Subscription Terms | EVOH Academy",
};

export default function SubscriptionTermsPage() {
  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Unreviewed Notice */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-mono flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>[LEGAL REVIEW REQUIRED]:</strong> This document contains unreviewed placeholder terms for recurring payment mandates and RBI e-mandate notifications.
        </span>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-primary tracking-tight">
          Subscription Terms
        </h1>
        <p className="text-xs font-mono text-ink-muted">
          Last Updated: October 2026 • Version 1.0 (Draft)
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-ink-muted leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">1. Billing Cycles & Auto-Renewal</h2>
          <p>
            Subscriptions are billed on a recurring basis according to your chosen billing interval (monthly, quarterly, or annually). In compliance with Reserve Bank of India (RBI) e-mandate directives, pre-debit notifications will be sent prior to any automatic renewal charge.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">2. Entitlements & Included Scope</h2>
          <p>
            A valid subscription grants access to all resources designated within that plan&apos;s entitlement rules during the active subscription period. If a subscription enters a past-due status, a short grace period may apply before access is suspended.
          </p>
        </section>
      </div>

    </div>
  );
}
