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
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
          <span>/</span>
          <span className="text-white font-bold">Subscription</span>
        </div>
        <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
          Manage Subscriptions
        </h1>
        <p className="text-xs text-slate-400">
          Inspect plan status, billing renewals, subject pass inclusions, and cancellation options.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-surface-card/75 border border-white/10 shadow-lg space-y-6 backdrop-blur-md">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="space-y-1">
            <span className="text-xs font-mono text-cyan-400 font-bold">CURRENT STATUS</span>
            <h2 className="text-xl font-display font-bold text-white">
              Individual Notes Access (Pay-as-you-go)
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/5 text-slate-300 border border-white/10">
            NO RECURRING CHARGES
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          You currently purchase individual chapter notes. Upgrade to an All-Access Science Pass or Subject Pass to unlock all notes, derivations, and formula sheets across Class 11 and 12 with unlimited watermarked downloads.
        </p>

        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>Explore Subscription Plans</span>
        </Link>
      </div>

    </div>
  );
}
