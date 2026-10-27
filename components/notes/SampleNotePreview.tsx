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
        <div className="space-y-4 text-xs sm:text-sm font-sans leading-relaxed text-slate-200">
          <p>
            {"Let the instantaneous position vector of a particle moving in the Cartesian Euclidean plane ℝ² be defined relative to an inertial origin O by:"}
          </p>
          <div className="p-3 sm:p-3.5 rounded-xl bg-surface-muted/90 border border-white/10 font-mono text-xs sm:text-sm text-cyan-400 font-bold overflow-x-auto">
            {"r(t) = x(t)î + y(t)ĵ"}
          </div>
          <p>
            {"The instantaneous velocity vector is given by the first time derivative of position:"}
          </p>
          <div className="p-3 rounded-xl bg-surface-muted/80 border border-white/10 font-mono text-xs text-white overflow-x-auto">
            {"v(t) = dr/dt = (dx/dt)î + (dy/dt)ĵ = v_x î + v_y ĵ"}
          </div>
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/20 text-xs text-amber-300 font-mono">
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
        <div className="space-y-4 text-xs sm:text-sm font-sans leading-relaxed text-slate-200">
          <p>
            {"Assuming horizontal motion has zero acceleration (a_x = 0) and vertical motion is subject to uniform downward gravity (a_y = -g):"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-surface-muted/80 border border-white/10 overflow-x-auto text-white">
              {"x(t) = (v_0 · cos θ) · t"}
            </div>
            <div className="p-2.5 rounded-lg bg-surface-muted/80 border border-white/10 overflow-x-auto text-white">
              {"y(t) = (v_0 · sin θ) · t - ½ g · t²"}
            </div>
          </div>
          <p>
            {"Solving for parameter t from the horizontal displacement equation:"}
          </p>
          <div className="p-3 rounded-xl bg-surface-muted/80 border border-white/10 font-mono text-xs text-white overflow-x-auto">
            {"t = x / (v_0 · cos θ)"}
          </div>
          <p>
            {"Substituting into the vertical equation gives the classic trajectory parabola:"}
          </p>
          <div className="p-3 sm:p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 font-mono text-xs sm:text-sm text-cyan-300 font-bold overflow-x-auto">
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
        <div className="space-y-4 text-xs sm:text-sm font-sans leading-relaxed text-slate-200">
          <div className="p-3 sm:p-3.5 rounded-xl bg-surface-muted/80 border border-white/10 text-xs text-slate-300">
            <span className="font-bold text-white font-mono block mb-1">Problem Statement:</span>
            {"A projectile is launched from ground level with speed v_0 = 40 m/s at an angle θ = 30° above the horizontal. Calculate: (a) Maximum height reached H_max, (b) Total flight time T, and (c) Horizontal range R. (Take g = 9.8 m/s²)."}
          </div>
          <div className="space-y-2 font-mono text-xs overflow-x-auto">
            <div className="flex items-start gap-2 whitespace-nowrap">
              <span className="text-cyan-400 font-bold">Step 1:</span>
              <span className="text-white">{"H_max = (v_0² · sin² θ) / (2g) = (1600 · 0.25) / (19.6) = 20.41 m"}</span>
            </div>
            <div className="flex items-start gap-2 whitespace-nowrap">
              <span className="text-cyan-400 font-bold">Step 2:</span>
              <span className="text-white">{"T = (2 · v_0 · sin θ) / g = (80 · 0.5) / 9.8 = 4.08 s"}</span>
            </div>
            <div className="flex items-start gap-2 whitespace-nowrap">
              <span className="text-cyan-400 font-bold">Step 3:</span>
              <span className="text-white">{"R = (v_0² · sin 2θ) / g = (1600 · sin 60°) / 9.8 = 141.39 m"}</span>
            </div>
          </div>
          <div className="pt-2 text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Fully verified with CBSE marking scheme rubrics</span>
          </div>
        </div>
      ),
    },
  ];

  const current = samplePages[activeTab];

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      {/* Viewer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <h2 className="text-base sm:text-lg font-display font-bold text-white flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Verified Sample Document Preview</span>
        </h2>
        <span className="text-xs font-mono text-slate-400">
          Sample Page {current.pageNumber} of {totalPageCount}
        </span>
      </div>

      {/* Tabs Switcher with Smooth Touch Pan */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-surface-card/75 border border-white/10 overflow-x-auto text-xs font-mono no-scrollbar backdrop-blur-md">
        {samplePages.map((page, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-all shrink-0 ${
              activeTab === idx
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Page {page.pageNumber}: {page.title.split(":")[0]}
          </button>
        ))}
      </div>

      {/* Document Sheet Display */}
      <div className="relative rounded-2xl bg-surface-card/85 border border-white/10 shadow-2xl p-4 sm:p-8 lg:p-10 overflow-hidden select-none min-h-[380px] sm:min-h-[420px] flex flex-col justify-between backdrop-blur-md">
        {/* Diagonal Sample Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
          <span className="text-4xl sm:text-6xl lg:text-7xl font-mono font-black text-white -rotate-12 uppercase tracking-widest text-center leading-tight">
            SAMPLE PREVIEW • EVOH ACADEMY
          </span>
        </div>

        {/* Top Sheet Bar */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 relative z-10 text-[11px] sm:text-xs font-mono text-slate-400 gap-2">
          <span className="font-bold text-cyan-400 truncate">EVOH EDITORIAL • {noteTitle}</span>
          <span className="bg-cyan-950/40 text-cyan-400 px-2 py-0.5 rounded font-bold shrink-0 border border-cyan-500/20">
            PAGE {current.pageNumber}
          </span>
        </div>

        {/* Body Content */}
        <div className="py-4 sm:py-6 space-y-3 relative z-10">
          <h3 className="text-base sm:text-xl font-display font-bold text-white">
            {current.title}
          </h3>
          <p className="text-xs font-mono text-slate-400 pb-1 sm:pb-2">
            {current.subtitle}
          </p>
          {current.content}
        </div>

        {/* Bottom Sheet Footer */}
        <div className="pt-4 border-t border-white/10 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab((p) => Math.max(0, p - 1))}
              disabled={activeTab === 0}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-30 flex items-center gap-1 font-semibold transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <button
              onClick={() => setActiveTab((p) => Math.min(samplePages.length - 1, p + 1))}
              disabled={activeTab === samplePages.length - 1}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-30 flex items-center gap-1 font-semibold transition-colors"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-[11px] sm:text-xs">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span>Full document unlocked after checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
