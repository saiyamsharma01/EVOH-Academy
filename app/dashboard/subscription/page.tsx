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
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Subscription</span>
        </div>
        <h1 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          Manage Subscriptions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Inspect plan status, billing renewals, subject pass inclusions, and cancellation options.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">CURRENT STATUS</span>
            <h2 className="text-xl font-display font-bold text-slate-900">
              Individual Notes Access (Pay-as-you-go)
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            NO RECURRING CHARGES
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          You currently purchase individual chapter notes. Upgrade to an All-Access Science Pass or Subject Pass to unlock all notes, derivations, and formula sheets across Class 11 and 12 with unlimited watermarked downloads.
        </p>

        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>Explore Subscription Plans</span>
        </Link>
      </div>

    </div>
  );
}
