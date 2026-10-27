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
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80">
          <Atom className="w-3.5 h-3.5 text-blue-600" />
          Educational Mission
        </span>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Understanding the Concepts. Mastering the Science.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          EVOH Academy was founded on a simple conviction: high-school science education should not be an exercise in rote memorization. It should be a structured journey into mathematical logic, physical reality, and molecular mechanism.
        </p>
      </div>

      {/* Philosophy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md space-y-4 transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-display font-bold text-slate-900">
            First-Principles Derivations
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every formula in our physics and chemistry materials begins from fundamental postulates, illustrating step-by-step how equations are derived.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md space-y-4 transition-all">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-display font-bold text-slate-900">
            Visual Rigor & Geometry
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            From molecular orbital hybridization to vector field resolution, we use clean editorial diagrams to illuminate abstract spatial relationships.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md space-y-4 transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-display font-bold text-slate-900">
            Honest Academic Standards
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Zero fabricated student counts, fake ranks, or inflated claims. All materials are original, curated syntheses built exclusively to assist student learning.
          </p>
        </div>
      </div>

      {/* Independent Entity Notice */}
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-600">
        <h3 className="text-sm font-bold text-slate-900 font-sans">
          Institutional Non-Affiliation Disclaimer
        </h3>
        <p className="leading-relaxed">
          EVOH Academy is an independent educational initiative and is not affiliated with, endorsed by, or associated with the National Council of Educational Research and Training (NCERT), the Central Board of Secondary Education (CBSE), or any government examination body. We respect intellectual property and create original syntheses designed to clarify foundational scientific concepts.
        </p>
      </div>

    </div>
  );
}
