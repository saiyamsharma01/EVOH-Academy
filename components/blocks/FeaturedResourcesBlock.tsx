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
    <section className="py-24 bg-surface-muted border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Curated Science Notes
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-primary tracking-tight">
              {config.title || "Featured Study Notes"}
            </h2>
            <p className="text-base text-ink-muted">
              Explore meticulously authored PDF resources with verified derivations, clear diagrams, and step-by-step problem blueprints.
            </p>
          </div>

          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover group self-start md:self-auto"
          >
            <span>View Full Notes Marketplace</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-border hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-muted text-ink-muted border border-border">
                    CLASS {item.classLevel}
                  </span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-full ${
                      item.isFree
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                        : "bg-primary/10 text-primary border border-primary/20"
                    }`}
                  >
                    {item.price}
                  </span>
                </div>

                <div className="aspect-[4/3] rounded-xl bg-surface-muted border border-border/80 flex flex-col items-center justify-center p-4 relative overflow-hidden group">
                  <FileText className="w-12 h-12 text-ink-muted/40 group-hover:text-primary transition-colors" />
                  <span className="text-[11px] font-mono text-ink-muted mt-2">
                    {item.pageCount} Pages • Verified PDF
                  </span>
                  {item.isFree ? (
                    <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      FREE DOWNLOAD
                    </span>
                  ) : (
                    <span className="absolute bottom-2 right-2 text-[10px] font-mono text-ink-muted bg-white/90 px-1.5 py-0.5 rounded border border-border flex items-center gap-1">
                      <Lock className="w-3 h-3 text-ink-muted" /> WATERMARKED
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-primary font-medium">
                    {item.subject} • {item.type}
                  </span>
                  <h3 className="text-base font-display font-bold text-ink-primary line-clamp-2 mt-1">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border flex items-center justify-between gap-3">
                <Link
                  href={`/notes/${item.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-surface-muted hover:bg-primary hover:text-white text-xs font-medium text-ink-primary transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </Link>

                <Link
                  href={item.isFree ? `/notes/${item.slug}` : `/checkout?item=${item.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-medium transition-colors"
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
