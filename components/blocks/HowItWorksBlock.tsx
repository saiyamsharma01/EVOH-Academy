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
    <section className="py-14 sm:py-20 lg:py-24 bg-white scientific-grid border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 inline-block">
            Seamless Academic Access
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            How EVOH Academy Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Transparent, immediate, and built for uninterrupted high-school and competitive exam study.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {defaultSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative p-7 sm:p-8 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 space-y-5 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-300 group-hover:text-blue-600/30 transition-colors">
                    {s.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-12 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>GST-Compliant Invoicing</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span>Traceable dynamic watermarking</span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span>Instant student dashboard delivery</span>
        </div>

      </div>
    </section>
  );
}
