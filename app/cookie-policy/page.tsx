import React from "react";
import { AlertCircle } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | EVOH Academy",
};

export default function CookiePolicyPage() {
  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Unreviewed Notice */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-mono flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>[LEGAL REVIEW REQUIRED]:</strong> Essential cookies vs analytics cookies policy statement.
        </span>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-primary tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-xs font-mono text-ink-muted">
          Last Updated: October 2026 • Version 1.0 (Draft)
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-ink-muted leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">1. Essential Cookies</h2>
          <p>
            EVOH Academy uses strictly necessary first-party cookies for secure authentication sessions (via Supabase Auth), CSRF protection, and cart state maintenance. These essential cookies do not require prior consent as the service cannot function without them.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">2. Analytics & Privacy</h2>
          <p>
            We use privacy-friendly first-party event logs to measure platform performance, server health, and popular search terms. No third-party tracking scripts or cross-site tracking pixels are placed without explicit opt-in consent, and no tracking is performed on identified minor accounts.
          </p>
        </section>
      </div>

    </div>
  );
}
