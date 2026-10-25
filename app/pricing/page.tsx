import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, Sparkles } from "lucide-react";

export const metadata = {
  title: "Pricing & Subscription Plans | EVOH Academy",
  description: "Transparent pricing options for Class 11 and 12 science notes, individual purchases, and all-access passes.",
};

export default function PricingPage() {
  const plans = [
    {
      name: "Free Learning Pass",
      price: "₹0",
      interval: "Forever Free",
      description: "Sample curated concept notes and formula sheets without any payment obligation.",
      badge: "START HERE",
      features: [
        "Access to all published Free Notes",
        "Public sample previews for all modules",
        "Direct PDF downloads",
        "Community support FAQs",
      ],
      ctaText: "Explore Free Notes",
      ctaLink: "/free-resources",
      highlighted: false,
    },
    {
      name: "Subject Pass",
      price: "₹499",
      interval: "per quarter (Draft)",
      description: "Dedicated access to all notes, revision guides, and mock tests for your chosen subject.",
      badge: "MOST POPULAR",
      features: [
        "All notes for 1 Chosen Subject (e.g. Physics)",
        "Both Class 11 & Class 12 chapters included",
        "Full formula sheets and question banks",
        "Automatic access to new revised editions",
        "Dynamic watermarked offline downloads",
      ],
      ctaText: "Choose Subject",
      ctaLink: "/notes",
      highlighted: true,
    },
    {
      name: "All-Access Science Pass",
      price: "₹999",
      interval: "per year (Draft)",
      description: "Unrestricted access across all three core subjects for complete academic preparation.",
      badge: "MAXIMUM VALUE",
      features: [
        "Everything in Physics, Chemistry & Mathematics",
        "Complete Class 11 and 12 curriculum library",
        "All question banks and mock tests (PDF)",
        "Priority student support ticket resolution",
        "Future video updates (when launched)",
      ],
      ctaText: "Get All Access",
      ctaLink: "/notes",
      highlighted: false,
    },
  ];

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
          Transparent Academic Plans
        </span>
        <h1 className="text-4xl font-display font-extrabold text-ink-primary tracking-tight">
          Flexible Learning, Zero Hidden Costs
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          Choose individual topic purchases or unlock full subject passes. All prices include applicable GST with official downloadable tax invoices issued on every transaction.
        </p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`p-8 rounded-3xl bg-white border flex flex-col justify-between transition-all duration-300 relative ${
              p.highlighted
                ? "border-primary shadow-2xl ring-1 ring-primary/30 -translate-y-2"
                : "border-border shadow-sm hover:shadow-xl hover:-translate-y-1"
            }`}
          >
            {p.badge && (
              <span
                className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase ${
                  p.highlighted
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-surface-muted text-ink-muted border border-border"
                }`}
              >
                {p.badge}
              </span>
            )}

            <div className="space-y-6 pt-2">
              <div className="space-y-2">
                <h2 className="text-2xl font-display font-bold text-ink-primary">
                  {p.name}
                </h2>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="space-y-1 pb-4 border-b border-border">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-extrabold text-ink-primary">
                    {p.price}
                  </span>
                  <span className="text-xs font-mono text-ink-muted">
                    / {p.interval}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-ink-muted block">
                  Configurable tier • Safe sandbox checkout
                </span>
              </div>

              {/* Feature list */}
              <ul className="space-y-3 text-xs text-ink-primary">
                {p.features.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-border">
              <Link
                href={p.ctaLink}
                className={`w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                  p.highlighted
                    ? "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                    : "bg-surface-muted hover:bg-surface-base border border-border text-ink-primary"
                }`}
              >
                {p.ctaText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-surface-muted border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-muted">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <span>Verified GST tax invoices issued sequentially upon payment.</span>
        </div>
        <Link href="/refund-policy" className="text-primary hover:underline font-semibold shrink-0">
          Refund Policy Terms →
        </Link>
      </div>

    </div>
  );
}
