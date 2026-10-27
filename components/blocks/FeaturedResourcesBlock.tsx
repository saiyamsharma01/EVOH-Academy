import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, Eye, FileText, Lock } from "lucide-react";

interface FeaturedResourcesConfig {
  title: string;
  selectionMode?: string;
  count?: number;
}

export default function FeaturedResourcesBlock({ config }: { config: FeaturedResourcesConfig }) {
  // Real representative curriculum modules per PRD (no fake reviews/ratings)
  const resources = [
    {
      id: "res-1",
      slug: "class-11-physics-kinematics-and-vectors",
      title: "Class 11 Physics: Kinematics & 2D Vectors",
      type: "Concept Notes",
      classLevel: 11,
      subject: "Physics",
      pageCount: 42,
      price: "₹199",
      isFree: false,
      previewAvailable: true,
    },
    {
      id: "res-2",
      slug: "class-12-chemistry-electrochemistry-derivations",
      title: "Class 12 Chemistry: Electrochemistry & Nernst Equation",
      type: "Formula Sheet",
      classLevel: 12,
      subject: "Chemistry",
      pageCount: 28,
      price: "₹149",
      isFree: false,
      previewAvailable: true,
    },
    {
      id: "res-3",
      slug: "class-12-maths-definite-integrals-blueprint",
      title: "Class 12 Maths: Definite Integrals & Area Under Curves",
      type: "Question Bank",
      classLevel: 12,
      subject: "Mathematics",
      pageCount: 56,
      price: "₹249",
      isFree: false,
      previewAvailable: true,
    },
    {
      id: "res-4",
      slug: "class-11-chemistry-atomic-structure-orbitals-free",
      title: "Class 11 Chemistry: Atomic Structure & Quantum Numbers",
      type: "Concept Notes",
      classLevel: 11,
      subject: "Chemistry",
      pageCount: 34,
      price: "Free",
      isFree: true,
      previewAvailable: true,
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-surface-muted border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Curated Science Notes
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-ink-primary tracking-tight">
              {config.title || "Featured Study Notes"}
            </h2>
            <p className="text-sm sm:text-base text-ink-muted">
              Explore meticulously authored PDF resources with verified derivations, clear diagrams, and step-by-step problem blueprints.
            </p>
          </div>

          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-primary-hover group self-start md:self-auto py-1"
          >
            <span>View Full Notes Marketplace</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {resources.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-surface-card/75 hover:bg-surface-card-hover/90 border border-white/10 hover:border-cyan-500/40 shadow-xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                    CLASS {item.classLevel}
                  </span>
                  <span
                    className={`font-semibold px-2.5 py-0.5 rounded-full ${
                      item.isFree
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                        : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/25"
                    }`}
                  >
                    {item.price}
                  </span>
                </div>

                <div className="aspect-[4/3] rounded-2xl bg-surface-base/80 border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden group">
                  <FileText className="w-12 h-12 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-[11px] font-mono text-slate-400 mt-2">
                    {item.pageCount} Pages • Verified PDF
                  </span>
                  {item.isFree ? (
                    <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      FREE DOWNLOAD
                    </span>
                  ) : (
                    <span className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-300 bg-slate-900/90 px-1.5 py-0.5 rounded border border-white/10 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-cyan-400" /> WATERMARKED
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-cyan-400 font-medium">
                    {item.subject} • {item.type}
                  </span>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 mt-1">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                <Link
                  href={`/notes/${item.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </Link>

                <Link
                  href={item.isFree ? `/notes/${item.slug}` : `/checkout?item=${item.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
                >
                  {item.isFree ? <Download className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                  <span>{item.isFree ? "Get Free" : "Unlock"}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
