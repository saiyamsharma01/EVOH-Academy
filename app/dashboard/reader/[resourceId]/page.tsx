"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Lock,
  Maximize2,
  PanelLeftClose,
  PanelLeftOpen,
  Shield,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface ReaderProps {
  params: Promise<{ resourceId: string }>;
}

export default function ReaderPage({ params }: ReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const totalPages = 42;

  // Stamped watermark data per PRD Section 12.7
  const studentEmail = "aarav.sharma@example.com";
  const watermarkStamp = `LICENSED TO: ${studentEmail} • ORDER REF: EVOH-2026-00042 • DO NOT REDISTRIBUTE`;

  // Page contents for pages 1 to 4
  const pagesData: Record<number, { title: string; subtitle: string; content: React.ReactNode }> = {
    1: {
      title: "Chapter 3: Motion in a Plane & Projectile Kinematics",
      subtitle: "3.1 Cartesian Coordinate Formalism & Orthogonal Decompositions",
      content: (
        <>
          <p>
            {"Consider a particle projected from ground level with an initial velocity vector v_0 at an elevation angle θ relative to the horizontal ground plane. Resolving the velocity components along the Cartesian coordinate frame:"}
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1.5">
            <p className="text-primary font-bold">{"v_{0x} = v_0 · cos(θ) (uniform horizontal motion)"}</p>
            <p className="text-primary font-bold">{"v_{0y} = v_0 · sin(θ) - g·t (uniformly accelerated vertical motion)"}</p>
          </div>
          <p>
            Integrating the velocity vector with respect to time yields the instantaneous trajectory equation:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs font-semibold text-slate-900">
            {"y(x) = x · tan(θ) - [g · x²] / [2 · v_0² · cos²(θ)]"}
          </div>
          <p className="text-slate-600">
            This demonstrates that the path of a projectile is strictly parabolic in the absence of aerodynamic drag.
          </p>
        </>
      ),
    },
    2: {
      title: "3.2 Maximum Height & Time of Flight Derivation",
      subtitle: "Vertical Velocity Zero-Crossing Condition",
      content: (
        <>
          <p>
            {"At the apex of the parabolic trajectory, the vertical velocity component vanishes identically: v_y(t_apex) = 0."}
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1.5">
            <p>{"v_0 · sin(θ) - g · t_apex = 0"}</p>
            <p className="text-primary font-bold">{"t_apex = (v_0 · sin θ) / g"}</p>
          </div>
          <p>
            {"By symmetry of parabolic motion in a uniform gravitational field, the total flight time T is exactly double the time to apex:"}
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs font-semibold text-slate-900">
            {"T = 2 · t_apex = (2 · v_0 · sin θ) / g"}
          </div>
          <p>
            {"The maximum vertical altitude H_max reached above the launch horizontal is obtained by evaluating y(t_apex):"}
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs font-semibold text-primary">
            {"H_max = (v_0² · sin² θ) / (2g)"}
          </div>
        </>
      ),
    },
    3: {
      title: "3.3 Maximum Horizontal Range & Optimum Angle",
      subtitle: "Trigonometric Extrema Analysis",
      content: (
        <>
          <p>
            {"The horizontal displacement achieved upon ground impact at t = T defines the horizontal range R:"}
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1.5">
            <p>{"R = v_{0x} · T = (v_0 · cos θ) · [ (2 · v_0 · sin θ) / g ]"}</p>
            <p className="text-primary font-bold">{"R = (v_0² · sin 2θ) / g"}</p>
          </div>
          <p>
            {"To find the elevation angle yielding maximum range, we differentiate R with respect to θ:"}
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs font-semibold text-slate-900">
            {"dR/dθ = (2 · v_0² · cos 2θ) / g = 0  ⇒  cos 2θ = 0  ⇒  2θ = 90°  ⇒  θ = 45°"}
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-900">
            <strong>Conclusion:</strong> For any initial launch speed v_0 on flat terrain, maximum ground coverage is achieved at launch angle θ = 45°, yielding R_max = v_0² / g.
          </div>
        </>
      ),
    },
  };

  const activePageData = pagesData[currentPage] || {
    title: `Section 3.${currentPage}: Advanced Topics & Derivations`,
    subtitle: `Standard NCERT Derivation - Page ${currentPage} of ${totalPages}`,
    content: (
      <div className="space-y-4">
        <p className="text-slate-700">
          Continuing verified derivations, coordinate proofs, solved board problems, and exemplar calculations for Chapter 3.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-primary font-bold">
          {"[Content authenticated & dynamically rendered for licensed student: " + studentEmail + "]"}
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-surface-dark flex flex-col text-slate-200">
      
      {/* Top Reader Toolbar */}
      <header className="h-16 px-4 sm:px-6 bg-surface-dark-card border-b border-white/10 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/library"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Library</span>
          </Link>
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Toggle Thumbnails"
          >
            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>
          <span className="text-sm font-display font-bold text-white truncate max-w-[200px] sm:max-w-md">
            Class 11 Physics: Kinematics & 2D Vectors
          </span>
        </div>

        {/* Page Nav & Zoom Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 bg-surface-dark px-2 sm:px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1 hover:text-white disabled:opacity-30"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-1.5">
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
              onClick={() => setZoom((z) => Math.min(140, z + 10))}
              className="p-1.5 text-slate-400 hover:text-white"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar Drawer and Canvas */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Thumbnails Sidebar */}
        {sidebarOpen && (
          <aside className="w-56 bg-surface-dark/95 border-r border-white/10 flex flex-col p-4 space-y-3 overflow-y-auto shrink-0 hidden md:flex">
            <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
              Document Pages
            </span>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                    currentPage === pageNum
                      ? "border-primary bg-primary/20 text-white"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                    <span>Page {pageNum}</span>
                    {pageNum <= 3 && <span className="text-[9px] px-1 py-0.5 rounded bg-primary/30 text-accent-cyan">Core</span>}
                  </div>
                  <span className="text-[10px] text-slate-400 truncate block">
                    {pageNum === 1 ? "Trajectory Parabola" : pageNum === 2 ? "Apex & Flight Time" : pageNum === 3 ? "Range & 45° Extrema" : "Practice Problems"}
                  </span>
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Main Document View Canvas */}
        <main className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center relative">
          <div
            className="relative bg-white text-slate-900 rounded-xl shadow-2xl p-8 sm:p-14 max-w-3xl w-full min-h-[720px] aspect-[1/1.414] overflow-hidden select-none transition-transform origin-top flex flex-col justify-between"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            {/* Dynamic Watermark Overlay across document per PRD Sec 12.7 */}
            <div className="absolute inset-0 flex flex-col justify-around pointer-events-none opacity-15 -rotate-12 text-center select-none">
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

            {/* Reader Header */}
            <div className="space-y-6 relative z-10 text-xs sm:text-sm font-sans leading-relaxed text-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <span className="font-mono text-xs text-primary font-bold">EVOH ACADEMY • CLASS 11 PHYSICS</span>
                <span className="font-mono text-xs text-slate-400">PAGE {currentPage} OF {totalPages}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
                {activePageData.title}
              </h2>
              <p className="text-xs font-mono text-slate-500">
                {activePageData.subtitle}
              </p>

              {activePageData.content}
            </div>

            {/* Reader Footer Stamp */}
            <div className="pt-6 border-t border-slate-200 relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Verified CBSE / NCERT Curriculum Standard</span>
              <span>Doc Hash: #EVOH-KINE-V12-P{currentPage}</span>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
