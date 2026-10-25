import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

interface CtaFinalConfig {
  headline: string;
  body: string;
  ctaLabel: string;
  ctaLink: string;
}

export default function CtaFinalBlock({ config }: { config: CtaFinalConfig }) {
  return (
    <section className="py-24 bg-surface-dark scientific-grid-dark text-white relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-accent-cyan/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-white/10 text-accent-cyan border border-white/15">
          Commit to Academic Excellence
        </span>

        <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-tight max-w-3xl mx-auto">
          {config.headline}
        </h2>

        <p className="text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
          {config.body}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href={config.ctaLink}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-medium text-base shadow-xl shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>{config.ctaLabel}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/free-resources"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-base transition-all duration-200 hover:-translate-y-0.5"
          >
            <BookOpen className="w-5 h-5 text-accent-cyan" />
            <span>Sample Free Notes</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
