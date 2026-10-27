import React from "react";
import Link from "next/link";
import { Atom, Compass, Lightbulb, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "About Us | EVOH Academy",
  description: "Independent educational initiative dedicated to conceptual clarity in Class 11 and 12 science.",
};

export default function AboutPage() {
  return (
    <div className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Editorial Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
          <Atom className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          Educational Mission
        </span>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Understanding the Concepts. Mastering the Science.
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
          EVOH Academy was founded on a simple conviction: high-school science education should not be an exercise in rote memorization. It should be a structured journey into mathematical logic, physical reality, and molecular mechanism.
        </p>
      </div>

      {/* Philosophy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-surface-card/70 border border-white/10 hover:border-cyan-500/30 shadow-lg space-y-4 backdrop-blur-md transition-all hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-950/50">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-display font-bold text-white">
            First-Principles Derivations
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every formula in our physics and chemistry materials begins from fundamental postulates, illustrating step-by-step how equations are derived.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-surface-card/70 border border-white/10 hover:border-blue-500/30 shadow-lg space-y-4 backdrop-blur-md transition-all hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-lg shadow-blue-950/50">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-display font-bold text-white">
            Visual Rigor & Geometry
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            From molecular orbital hybridization to vector field resolution, we use clean editorial diagrams to illuminate abstract spatial relationships.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-surface-card/70 border border-white/10 hover:border-emerald-500/30 shadow-lg space-y-4 backdrop-blur-md transition-all hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-950/50">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-display font-bold text-white">
            Honest Academic Standards
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Zero fabricated student counts, fake ranks, or inflated claims. All materials are original, curated syntheses built exclusively to assist student learning.
          </p>
        </div>
      </div>

      {/* Independent Entity Notice */}
      <div className="p-8 rounded-2xl bg-surface-card/50 border border-white/10 space-y-4 text-xs font-mono text-slate-400 backdrop-blur-md">
        <h3 className="text-sm font-bold text-white font-sans">
          Institutional Non-Affiliation Disclaimer
        </h3>
        <p className="leading-relaxed">
          EVOH Academy is an independent educational initiative and is not affiliated with, endorsed by, or associated with the National Council of Educational Research and Training (NCERT), the Central Board of Secondary Education (CBSE), or any government examination body. We respect intellectual property and create original syntheses designed to clarify foundational scientific concepts.
        </p>
      </div>

    </div>
  );
}
