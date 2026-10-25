import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, CreditCard, Sparkles } from "lucide-react";

export const metadata = {
  title: "Subscription Management | EVOH Academy",
};

export default function SubscriptionDashboardPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
          <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
          <span>/</span>
          <span className="text-ink-primary font-bold">Subscription</span>
        </div>
        <h1 className="text-3xl font-display font-extrabold text-ink-primary tracking-tight">
          Manage Subscriptions
        </h1>
        <p className="text-xs text-ink-muted">
          Inspect plan status, billing renewals, subject pass inclusions, and cancellation options.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-border shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="space-y-1">
            <span className="text-xs font-mono text-primary font-bold">CURRENT STATUS</span>
            <h2 className="text-xl font-display font-bold text-ink-primary">
              Individual Notes Access (Pay-as-you-go)
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-surface-muted text-ink-muted border border-border">
            NO RECURRING CHARGES
          </span>
        </div>

        <p className="text-xs text-ink-muted leading-relaxed">
          You currently purchase individual chapter notes. Upgrade to an All-Access Science Pass or Subject Pass to unlock all notes, derivations, and formula sheets across Class 11 and 12 with unlimited watermarked downloads.
        </p>

        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>Explore Subscription Plans</span>
        </Link>
      </div>

    </div>
  );
}
