import React from "react";
import { Atom, BookOpen, Check, Download, Eye, Lock, Shield, Sparkles } from "lucide-react";

export const metadata = {
  title: "Component & Design System Gallery (Dev) | EVOH Academy",
};

export default function DesignGalleryPage() {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      <div className="space-y-3 border-b border-border pb-6">
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
          DEV-ONLY ROUTE • PRD SECTION 6
        </span>
        <h1 className="text-4xl font-display font-extrabold text-ink-primary tracking-tight">
          EVOH Design System & Component Gallery
        </h1>
        <p className="text-sm text-ink-muted">
          Living visual audit of dynamic design tokens, editorial color swatches, typography scale, buttons, badges, and card geometries.
        </p>
      </div>

      {/* 1. Color Palette Swatches */}
      <div className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-ink-primary">
          1. Dynamic Color Swatches
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-border shadow-sm space-y-2">
            <div className="w-full h-12 rounded-lg bg-[#FDFBF7] border border-border" />
            <div className="text-xs font-mono">
              <span className="font-bold text-ink-primary block">Warm Ivory</span>
              <span className="text-ink-muted">#FDFBF7</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-sm space-y-2">
            <div className="w-full h-12 rounded-lg bg-[#0B132B]" />
            <div className="text-xs font-mono">
              <span className="font-bold text-ink-primary block">Midnight Navy</span>
              <span className="text-ink-muted">#0B132B</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-sm space-y-2">
            <div className="w-full h-12 rounded-lg bg-[#1D4ED8]" />
            <div className="text-xs font-mono">
              <span className="font-bold text-ink-primary block">Academic Cobalt</span>
              <span className="text-ink-muted">#1D4ED8</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-sm space-y-2">
            <div className="w-full h-12 rounded-lg bg-[#06B6D4]" />
            <div className="text-xs font-mono">
              <span className="font-bold text-ink-primary block">Quantum Cyan</span>
              <span className="text-ink-muted">#06B6D4</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-sm space-y-2">
            <div className="w-full h-12 rounded-lg bg-[#6366F1]" />
            <div className="text-xs font-mono">
              <span className="font-bold text-ink-primary block">Restrained Violet</span>
              <span className="text-ink-muted">#6366F1</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-sm space-y-2">
            <div className="w-full h-12 rounded-lg bg-[#0F172A]" />
            <div className="text-xs font-mono">
              <span className="font-bold text-ink-primary block">Deep Ink Charcoal</span>
              <span className="text-ink-muted">#0F172A</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Button Geometries */}
      <div className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-ink-primary">
          2. Button Inventory & States
        </h2>
        <div className="p-8 rounded-2xl bg-white border border-border shadow-sm flex flex-wrap items-center gap-6">
          <button className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5">
            Primary Action
          </button>

          <button className="px-6 py-3 rounded-xl bg-surface-muted hover:bg-surface-base border border-border text-ink-primary text-sm font-semibold transition-colors">
            Secondary Outline
          </button>

          <button className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Free Download</span>
          </button>

          <button className="px-4 py-2 rounded-lg border border-border bg-white text-xs font-semibold text-ink-muted hover:text-ink-primary">
            Ghost Minimal
          </button>
        </div>
      </div>

      {/* 3. Typography Rhythm */}
      <div className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-ink-primary">
          3. Typography Hierarchy
        </h2>
        <div className="p-8 rounded-2xl bg-white border border-border shadow-sm space-y-4">
          <div>
            <span className="text-xs font-mono text-ink-muted">DISPLAY 2XL (Manrope Extrabold)</span>
            <div className="text-4xl sm:text-5xl font-display font-extrabold text-ink-primary">
              Understand the Concepts. Master the Science.
            </div>
          </div>
          <div>
            <span className="text-xs font-mono text-ink-muted">HEADING MD (Manrope Bold)</span>
            <div className="text-2xl font-display font-bold text-ink-primary">
              Chapter 3: Projectile Motion & Vector Coordinate Analysis
            </div>
          </div>
          <div>
            <span className="text-xs font-mono text-ink-muted">BODY BASE (Inter Regular 65-75 ch line length)</span>
            <p className="text-base text-ink-muted max-w-2xl leading-relaxed">
              Every formula in physics is an analytical representation of an observable physical phenomenon. By starting from fundamental principles, students develop intuition that endures beyond examination day.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
