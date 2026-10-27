"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

const Hero3DScene = dynamic(() => import("../3d/Hero3DScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] lg:min-h-[500px] flex items-center justify-center p-8 bg-surface-dark rounded-2xl relative overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[340px] text-accent-cyan opacity-80 animate-spin-slow"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="200" cy="200" r="140" strokeDasharray="4 4" className="opacity-30" />
        <ellipse cx="200" cy="200" rx="160" ry="60" transform="rotate(30 200 200)" />
        <ellipse cx="200" cy="200" rx="160" ry="60" transform="rotate(-45 200 200)" />
        <ellipse cx="200" cy="200" rx="160" ry="60" transform="rotate(75 200 200)" />
        <circle cx="200" cy="200" r="28" fill="#1D4ED8" className="opacity-80" />
        <circle cx="200" cy="200" r="12" fill="#06B6D4" />
        <circle cx="340" cy="200" r="6" fill="#06B6D4" />
        <circle cx="80" cy="130" r="5" fill="#6366F1" />
        <circle cx="270" cy="320" r="5" fill="#1D4ED8" />
      </svg>
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
    <section className="relative w-full overflow-hidden bg-surface-dark scientific-grid-dark text-white pt-16 pb-14 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
      {/* Subtle radial ambient gradients */}
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-60 sm:w-80 h-60 sm:h-80 bg-accent-cyan/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Editorial Headline Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {config.announcementStrip && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] sm:text-xs font-medium text-accent-cyan max-w-full">
                <Sparkles className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
                <span className="truncate">Class 11 & 12 • Physics, Chemistry & Math</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.15] text-white">
              {config.headline}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-sans max-w-2xl leading-relaxed">
              {config.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Link
                href={config.primaryCtaLink}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm sm:text-base shadow-lg shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{config.primaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {config.secondaryCtaLabel && config.secondaryCtaLink && (
                <Link
                  href={config.secondaryCtaLink}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5"
                >
                  <BookOpen className="w-4 h-4 text-accent-cyan" />
                  <span>{config.secondaryCtaLabel}</span>
                </Link>
              )}
            </div>

            {/* Scientific Rigor Badges */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-xs text-slate-400 font-mono">
              <div className="p-3 sm:p-0 rounded-xl bg-white/5 sm:bg-transparent border border-white/5 sm:border-0">
                <span className="block text-white font-sans font-bold text-sm">NCERT / CBSE</span>
                <span className="text-slate-400">Aligned Core Syllabus</span>
              </div>
              <div className="p-3 sm:p-0 rounded-xl bg-white/5 sm:bg-transparent border border-white/5 sm:border-0">
                <span className="block text-white font-sans font-bold text-sm">Dynamic Watermark</span>
                <span className="text-slate-400">Traceable PDFs</span>
              </div>
              <div className="p-3 sm:p-0 rounded-xl bg-white/5 sm:bg-transparent border border-white/5 sm:border-0">
                <span className="block text-white font-sans font-bold text-sm">100% Verified</span>
                <span className="text-slate-400">Original Derivations</span>
              </div>
            </div>
          </div>

          {/* 3D Scientific Visualization Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[440px] lg:max-w-[500px] mx-auto rounded-3xl dark-glass p-2.5 sm:p-3 shadow-xl border border-white/10">
              <Hero3DScene speed={1.0} />
              
              {/* Scientific Tag overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex items-center justify-between px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-[11px] sm:text-xs font-mono text-slate-300">
                <span className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                  <span className="truncate">ψ(r,θ,φ) ORBITAL</span>
                </span>
                <span className="text-blue-300 font-semibold shrink-0 ml-2">Interactive 3D</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
