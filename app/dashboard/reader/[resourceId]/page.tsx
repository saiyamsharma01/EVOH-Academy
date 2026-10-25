"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Lock, Shield, ZoomIn, ZoomOut } from "lucide-react";

interface ReaderProps {
  params: Promise<{ resourceId: string }>;
}

export default function ReaderPage({ params }: ReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const totalPages = 42;

  // Stamped watermark data per PRD Section 12.7
  const studentEmail = "aarav.sharma@example.com";
  const watermarkStamp = `LICENSED TO: ${studentEmail} • ORDER REF: EVOH-2026-00042 • DO NOT REDISTRIBUTE`;

  return (
    <div className="min-h-screen bg-surface-dark flex flex-col text-slate-200">
      
      {/* Top Reader Toolbar */}
      <div className="h-16 px-6 bg-surface-dark-card border-b border-white/10 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/library"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Library</span>
          </Link>
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          <span className="text-sm font-display font-bold text-white truncate max-w-[240px] sm:max-w-md">
            Class 11 Physics: Kinematics & 2D Vectors
          </span>
        </div>

        {/* Page Nav & Zoom Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-surface-dark px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1 hover:text-white disabled:opacity-30"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1 hover:text-white disabled:opacity-30"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-surface-dark px-2 py-1 rounded-lg border border-white/10">
            <button
              onClick={() => setZoom((z) => Math.max(70, z - 10))}
              className="p-1.5 text-slate-400 hover:text-white"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300 px-1">{zoom}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(150, z + 10))}
              className="p-1.5 text-slate-400 hover:text-white"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Document View Canvas */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center relative">
        <div
          className="relative bg-white text-slate-900 rounded-xl shadow-2xl p-8 sm:p-14 max-w-3xl w-full aspect-[1/1.414] overflow-hidden select-none transition-transform origin-top"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {/* Dynamic Watermark Overlay across document per PRD Sec 12.7 */}
          <div className="absolute inset-0 flex flex-col justify-around pointer-events-none opacity-20 -rotate-12 text-center select-none">
            <div className="text-xs font-mono font-bold tracking-widest text-slate-500">
              {watermarkStamp}
            </div>
            <div className="text-xs font-mono font-bold tracking-widest text-slate-500">
              {watermarkStamp}
            </div>
            <div className="text-xs font-mono font-bold tracking-widest text-slate-500">
              {watermarkStamp}
            </div>
            <div className="text-xs font-mono font-bold tracking-widest text-slate-500">
              {watermarkStamp}
            </div>
          </div>

          {/* Reader Sample Body Content */}
          <div className="space-y-6 relative z-10 text-xs sm:text-sm font-sans leading-relaxed text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="font-mono text-xs text-primary font-bold">EVOH ACADEMY • CLASS 11 PHYSICS</span>
              <span className="font-mono text-xs text-slate-400">PAGE {currentPage}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
              Chapter 3: Motion in a Plane & Projectile Kinematics
            </h2>

            <p>
              {"Consider a particle projected from ground level with an initial velocity vector v_0 at an elevation angle θ relative to the horizontal ground plane. Resolving the velocity components along the Cartesian coordinate frame:"}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1.5">
              <p>{"v_{0x} = v_0 · cos(θ) (uniform horizontal motion)"}</p>
              <p>{"v_{0y} = v_0 · sin(θ) - g·t (uniformly accelerated vertical motion)"}</p>
            </div>

            <p>
              Integrating the velocity vector with respect to time yields the instantaneous trajectory equation:
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs">
              {"y(x) = x · tan(θ) - [g · x²] / [2 · v_0² · cos²(θ)]"}
            </div>

            <p className="text-slate-600">
              This demonstrates that the path of a projectile is strictly parabolic in the absence of aerodynamic drag.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
