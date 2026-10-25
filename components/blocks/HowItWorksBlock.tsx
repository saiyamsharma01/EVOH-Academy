import React from "react";
import { Download, Eye, Layers, ShieldCheck } from "lucide-react";

interface Step {
  title: string;
  body: string;
  icon?: string;
}

interface HowItWorksConfig {
  steps: Step[];
}

export default function HowItWorksBlock({ config }: { config: HowItWorksConfig }) {
  const defaultSteps = [
    {
      num: "01",
      icon: Layers,
      title: "Explore Curriculum Topics",
      body: "Browse structured Class 11 and 12 Physics, Chemistry, and Mathematics modules aligned directly with NCERT standards.",
    },
    {
      num: "02",
      icon: Eye,
      title: "Inspect Sample Previews",
      body: "Examine high-resolution sample pages and derivation summaries before purchasing to evaluate structure and rigor.",
    },
    {
      num: "03",
      icon: Download,
      title: "Instant Traceable Access",
      body: "Upon secure checkout, receive your personalized, dynamically watermarked PDF or read directly in the web reader.",
    },
  ];

  return (
    <section className="py-24 bg-surface-base scientific-grid border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Seamless Academic Access
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-primary tracking-tight">
            How EVOH Academy Works
          </h2>
          <p className="text-base text-ink-muted">
            Transparent, immediate, and built for uninterrupted high-school and competitive exam study.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {defaultSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-mono font-extrabold text-border">
                    {s.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-ink-primary">
                    {s.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-xs font-mono text-ink-muted flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>GST-compliant invoicing • Traceable watermark deterrent • Lifetime updates for registered editions</span>
        </div>

      </div>
    </section>
  );
}
