"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, FileText, Lock, Sparkles, ZoomIn, ZoomOut } from "lucide-react";

interface SampleNotePreviewProps {
  noteTitle: string;
  totalPageCount: number;
}

export default function SampleNotePreview({
  noteTitle,
  totalPageCount,
}: SampleNotePreviewProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const samplePages = [
    {
      pageNumber: 1,
      title: "1.1 Postulates & Cartesian Vector Coordinates",
      subtitle: "Foundations of Two-Dimensional Kinematics",
      content: (
        <div className="space-y-4 text-xs sm:text-sm font-sans leading-relaxed text-ink-primary">
          <p>
            {"Let the instantaneous position vector of a particle moving in the Cartesian Euclidean plane ℝ² be defined relative to an inertial origin O by:"}
          </p>
          <div className="p-3.5 rounded-xl bg-surface-muted border border-border font-mono text-xs sm:text-sm text-primary font-bold">
            {"r(t) = x(t)î + y(t)ĵ"}
          </div>
          <p>
            {"The instantaneous velocity vector is given by the first time derivative of position:"}
          </p>
          <div className="p-3 rounded-xl bg-surface-muted border border-border font-mono text-xs text-ink-primary">
            {"v(t) = dr/dt = (dx/dt)î + (dy/dt)ĵ = v_x î + v_y ĵ"}
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 font-mono">
            <strong>Key Axiom:</strong> The motions along orthogonal axes x and y are strictly independent.
          </div>
        </div>
      ),
    },
    {
      pageNumber: 2,
      title: "1.2 Analytical Trajectory Parabola Derivation",
      subtitle: "Elimination of Parameter t under Constant Acceleration",
      content: (
        <div className="space-y-4 text-xs sm:text-sm font-sans leading-relaxed text-ink-primary">
          <p>
            {"Assuming horizontal motion has zero acceleration (a_x = 0) and vertical motion is subject to uniform downward gravity (a_y = -g):"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-surface-muted border border-border">
              {"x(t) = (v_0 · cos θ) · t"}
            </div>
            <div className="p-2.5 rounded-lg bg-surface-muted border border-border">
              {"y(t) = (v_0 · sin θ) · t - ½ g · t²"}
            </div>
          </div>
          <p>
            {"Solving for parameter t from the horizontal displacement equation:"}
          </p>
          <div className="p-3 rounded-xl bg-surface-muted border border-border font-mono text-xs text-ink-primary">
            {"t = x / (v_0 · cos θ)"}
          </div>
          <p>
            {"Substituting into the vertical equation gives the classic trajectory parabola:"}
          </p>
          <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 font-mono text-xs sm:text-sm text-primary font-bold">
            {"y(x) = (tan θ) · x - [ g / (2 · v_0² · cos² θ) ] · x²"}
          </div>
        </div>
      ),
    },
    {
      pageNumber: 3,
      title: "1.3 Solved Exemplar & Step-by-Step Scoring Proof",
      subtitle: "CBSE Class 11 Board Benchmark Problem (5 Marks)",
      content: (
        <div className="space-y-4 text-xs sm:text-sm font-sans leading-relaxed text-ink-primary">
          <div className="p-3.5 rounded-xl bg-surface-muted border border-border text-xs">
            <span className="font-bold text-ink-primary font-mono block mb-1">Problem Statement:</span>
            {"A projectile is launched from ground level with speed v_0 = 40 m/s at an angle θ = 30° above the horizontal. Calculate: (a) Maximum height reached H_max, (b) Total flight time T, and (c) Horizontal range R. (Take g = 9.8 m/s²)."}
          </div>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-start gap-2">
              <span className="text-primary font-bold">Step 1:</span>
              <span>{"H_max = (v_0² · sin² θ) / (2g) = (1600 · 0.25) / (19.6) = 20.41 m"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary font-bold">Step 2:</span>
              <span>{"T = (2 · v_0 · sin θ) / g = (80 · 0.5) / 9.8 = 4.08 s"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary font-bold">Step 3:</span>
              <span>{"R = (v_0² · sin 2θ) / g = (1600 · sin 60°) / 9.8 = 141.39 m"}</span>
            </div>
          </div>
          <div className="pt-2 text-xs font-mono text-emerald-700 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Fully verified with CBSE marking scheme rubrics</span>
          </div>
        </div>
      ),
    },
  ];

  const current = samplePages[activeTab];

  return (
    <div className="space-y-4">
      {/* Viewer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-lg font-display font-bold text-ink-primary flex items-center gap-2">
          <Eye className="w-4 h-4 text-primary" />
          <span>Verified Sample Document Preview</span>
        </h2>
        <span className="text-xs font-mono text-ink-muted">
          Showing Sample Page {current.pageNumber} of {totalPageCount}
        </span>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-surface-muted border border-border overflow-x-auto text-xs font-mono">
        {samplePages.map((page, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === idx
                ? "bg-white text-primary font-bold shadow-xs border border-border"
                : "text-ink-muted hover:text-ink-primary"
            }`}
          >
            Page {page.pageNumber}: {page.title.split(":")[0]}
          </button>
        ))}
      </div>

      {/* Document Sheet Display */}
      <div className="relative rounded-2xl bg-white border border-border shadow-lg p-6 sm:p-10 overflow-hidden select-none min-h-[420px] flex flex-col justify-between">
        {/* Diagonal Sample Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
          <span className="text-5xl sm:text-7xl font-mono font-black text-ink-primary -rotate-12 uppercase tracking-widest text-center leading-tight">
            SAMPLE PREVIEW • EVOH ACADEMY
          </span>
        </div>

        {/* Top Sheet Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-border relative z-10 text-xs font-mono text-ink-muted">
          <span className="font-bold text-primary">EVOH SCIENCE EDITORIAL • {noteTitle}</span>
          <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded font-bold">
            SAMPLE PAGE {current.pageNumber}
          </span>
        </div>

        {/* Body Content */}
        <div className="py-6 space-y-3 relative z-10">
          <h3 className="text-lg sm:text-xl font-display font-bold text-ink-primary">
            {current.title}
          </h3>
          <p className="text-xs font-mono text-ink-muted pb-2">
            {current.subtitle}
          </p>
          {current.content}
        </div>

        {/* Bottom Sheet Footer */}
        <div className="pt-4 border-t border-border relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-ink-muted">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab((p) => Math.max(0, p - 1))}
              disabled={activeTab === 0}
              className="px-2.5 py-1 rounded bg-surface-muted hover:bg-border text-ink-primary disabled:opacity-40 flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev Sample
            </button>
            <button
              onClick={() => setActiveTab((p) => Math.min(samplePages.length - 1, p + 1))}
              disabled={activeTab === samplePages.length - 1}
              className="px-2.5 py-1 rounded bg-surface-muted hover:bg-border text-ink-primary disabled:opacity-40 flex items-center gap-1"
            >
              Next Sample <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Full 42-page document unlocked after checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
