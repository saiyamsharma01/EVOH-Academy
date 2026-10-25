"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

const Hero3DScene = dynamic(() => import("../3d/Hero3DScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] lg:min-h-[520px] flex items-center justify-center bg-surface-dark/40 rounded-2xl animate-pulse">
      <div className="text-accent-cyan text-sm tracking-wider font-mono">
        INITIALIZING QUANTUM ORBITALS...
      </div>
    </div>
  ),
});

interface HeroConfig {
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  visualVariant?: string;
  announcementStrip?: boolean;
}

export default function HeroBlock({ config }: { config: HeroConfig }) {
  return (
    <section className="relative w-full overflow-hidden bg-surface-dark scientific-grid-dark text-white pt-24 pb-20 lg:pt-32 lg:pb-28">
      {/* Subtle radial ambient gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-cyan/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Editorial Headline Column */}
          <div className="lg:col-span-7 space-y-8">
            {config.announcementStrip && (
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-accent-cyan">
                <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
                <span>Class 11 & 12 • Physics, Chemistry & Mathematics</span>
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.1] text-white">
              {config.headline}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-sans max-w-2xl leading-relaxed">
              {config.subheadline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={config.primaryCtaLink}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-medium text-base shadow-lg shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{config.primaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {config.secondaryCtaLabel && config.secondaryCtaLink && (
                <Link
                  href={config.secondaryCtaLink}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-base transition-all duration-200 hover:-translate-y-0.5"
                >
                  <BookOpen className="w-4 h-4 text-accent-cyan" />
                  <span>{config.secondaryCtaLabel}</span>
                </Link>
              )}
            </div>

            {/* Scientific Rigor Badges */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-6 text-xs text-slate-400 font-mono">
              <div>
                <span className="block text-white font-sans font-bold text-sm">NCERT / CBSE</span>
                <span className="text-slate-400">Aligned Core Syllabus</span>
              </div>
              <div>
                <span className="block text-white font-sans font-bold text-sm">Dynamic Watermark</span>
                <span className="text-slate-400">Traceable PDFs</span>
              </div>
              <div>
                <span className="block text-white font-sans font-bold text-sm">100% Verified</span>
                <span className="text-slate-400">Original Derivations</span>
              </div>
            </div>
          </div>

          {/* 3D Scientific Visualization Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto rounded-3xl dark-glass p-3 shadow-2xl cyan-glow">
              <Hero3DScene speed={1.0} />
              
              {/* Scientific Tag overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between px-4 py-2.5 rounded-xl bg-surface-dark/80 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
                  <span>ψ(r,θ,φ) ORBITAL HARMONIC</span>
                </span>
                <span className="text-accent-cyan">Interactive 3D</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
