import React from "react";
import { AlertCircle } from "lucide-react";

export const metadata = {
  title: "Digital Delivery & License Terms | EVOH Academy",
};

export default function DigitalDeliveryPolicyPage() {
  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Unreviewed Notice */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-mono flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>[LEGAL REVIEW REQUIRED]:</strong> Digital delivery, device limitations, and dynamic watermark terms.
        </span>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-primary tracking-tight">
          Digital Delivery & License Terms
        </h1>
        <p className="text-xs font-mono text-ink-muted">
          Last Updated: October 2026 • Version 1.0 (Draft)
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-ink-muted leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">1. Immediate Fulfillment</h2>
          <p>
            Upon successful payment confirmation by the payment gateway, access entitlements are instantaneously bound to your user account. Purchased items appear in your Student Dashboard (<code>/dashboard/library</code>) within 60 seconds.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">2. Dynamic Watermark Deterrent</h2>
          <p>
            Notice: No browser-based protection can completely prevent screenshots or optical capture. To deter piracy and trace leaks, all delivered PDF files are programmatically stamped on every page with your name, masked email address, order reference, and timestamp.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-display font-bold text-ink-primary">3. Device Limits & Quotas</h2>
          <p>
            To prevent credential-sharing abuse, each student account may be accessed from a maximum of 3 distinct devices simultaneously, with reasonable hourly download quotas.
          </p>
        </section>
      </div>

    </div>
  );
}
