"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, FileText, Lock, Sparkles } from "lucide-react";

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
        <div className="space-y-4 text-xs sm:text-sm font-sans leading-relaxed text-slate-700">
          <p>
            {"Let the instantaneous position vector of a particle moving in the Cartesian Euclidean plane ℝ² be defined relative to an inertial origin O by:"}
          </p>
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm text-blue-900 font-bold overflow-x-auto">
            {"r(t) = x(t)î + y(t)ĵ"}
          </div>
          <p>
            {"The instantaneous velocity vector is given by the first time derivative of position:"}
          </p>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 overflow-x-auto">
            {"v(t) = dr/dt = (dx/dt)î + (dy/dt)ĵ = v_x î + v_y ĵ"}
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
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
        <div className="space-y-4 text-xs sm:text-sm font-sans leading-relaxed text-slate-700">
          <p>
            {"Assuming horizontal motion has zero acceleration (a_x = 0) and vertical motion is subject to uniform downward gravity (a_y = -g):"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 overflow-x-auto text-slate-900 font-semibold">
              {"x(t) = (v_0 · cos θ) · t"}
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 overflow-x-auto text-slate-900 font-semibold">
              {"y(t) = (v_0 · sin θ) · t - ½ g · t²"}
            </div>
          </div>
          <p>
            {"Solving for parameter t from the horizontal displacement equation:"}
          </p>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 overflow-x-auto">
            {"t = x / (v_0 · cos θ)"}
          </div>
          <p>
            {"Substituting into the vertical equation gives the classic trajectory parabola:"}
          </p>
          <div className="p-3 sm:p-3.5 rounded-xl bg-blue-50 border border-blue-200 font-mono text-xs sm:text-sm text-blue-900 font-bold overflow-x-auto">
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
        <div className="space-y-4 text-xs sm:text-sm font-sans leading-relaxed text-slate-700">
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <span className="font-bold text-slate-900 block mb-1">Problem Statement:</span>
            {"A projectile is launched from ground level with speed v_0 = 40 m/s at an angle θ = 30° above the horizontal. Calculate: (a) Maximum height reached H_max, (b) Total flight time T, and (c) Horizontal range R. (Take g = 9.8 m/s²)."}
          </div>
          <div className="space-y-2 font-mono text-xs overflow-x-auto">
            <div className="flex items-start gap-2 whitespace-nowrap">
              <span className="text-blue-700 font-bold">Step 1:</span>
              <span className="text-slate-800 font-semibold">{"H_max = (v_0² · sin² θ) / (2g) = (1600 · 0.25) / (19.6) = 20.41 m"}</span>
            </div>
            <div className="flex items-start gap-2 whitespace-nowrap">
              <span className="text-blue-700 font-bold">Step 2:</span>
              <span className="text-slate-800 font-semibold">{"T = (2 · v_0 · sin θ) / g = (80 · 0.5) / 9.8 = 4.08 s"}</span>
            </div>
            <div className="flex items-start gap-2 whitespace-nowrap">
              <span className="text-blue-700 font-bold">Step 3:</span>
              <span className="text-slate-800 font-semibold">{"R = (v_0² · sin 2θ) / g = (1600 · sin 60°) / 9.8 = 141.39 m"}</span>
            </div>
          </div>
          <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Fully verified with official CBSE marking rubrics</span>
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
        <h2 className="text-base sm:text-lg font-display font-bold text-slate-900 flex items-center gap-2">
          <Eye className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Curriculum Sample Preview</span>
        </h2>
        <span className="text-xs font-medium text-slate-500">
          Sample Page {current.pageNumber} of {totalPageCount}
        </span>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 border border-slate-200/80 overflow-x-auto text-xs no-scrollbar">
        {samplePages.map((page, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all shrink-0 font-medium ${
              activeTab === idx
                ? "bg-white text-blue-700 font-semibold shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Page {page.pageNumber}: {page.title.split(":")[0]}
          </button>
        ))}
      </div>

      {/* Document Sheet Display */}
      <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-sm p-5 sm:p-8 lg:p-10 overflow-hidden select-none min-h-[380px] sm:min-h-[420px] flex flex-col justify-between">
        {/* Subtle Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
          <span className="text-4xl sm:text-6xl lg:text-7xl font-mono font-black text-slate-900 -rotate-12 uppercase tracking-widest text-center leading-tight">
            SAMPLE PREVIEW • EVOH ACADEMY
          </span>
        </div>

        {/* Top Sheet Bar */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 relative z-10 text-xs text-slate-500 gap-2 font-medium">
          <span className="font-semibold text-slate-900 truncate">EVOH ACADEMY • {noteTitle}</span>
          <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded font-bold shrink-0">
            PAGE {current.pageNumber}
          </span>
        </div>

        {/* Body Content */}
        <div className="py-4 sm:py-6 space-y-3 relative z-10">
          <h3 className="text-base sm:text-xl font-display font-bold text-slate-900">
            {current.title}
          </h3>
          <p className="text-xs text-slate-500 pb-1 sm:pb-2">
            {current.subtitle}
          </p>
          {current.content}
        </div>

        {/* Bottom Sheet Footer */}
        <div className="pt-4 border-t border-slate-100 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab((p) => Math.max(0, p - 1))}
              disabled={activeTab === 0}
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 disabled:opacity-40 flex items-center gap-1 font-medium transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <button
              onClick={() => setActiveTab((p) => Math.min(samplePages.length - 1, p + 1))}
              disabled={activeTab === samplePages.length - 1}
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 disabled:opacity-40 flex items-center gap-1 font-medium transition-colors"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-blue-700 font-semibold text-xs">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span>Complete high-resolution document unlocked after purchase</span>
          </div>
        </div>
      </div>
    </div>
  );
}
