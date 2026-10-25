import React from "react";
import Link from "next/link";
import { Download, Eye, FileText, Sparkles } from "lucide-react";

export const metadata = {
  title: "Free Science Resources | EVOH Academy",
  description: "Download verified free concept notes and formula sheets for Class 11 and 12.",
};

export default function FreeResourcesPage() {
  const freeItems = [
    {
      id: "free-1",
      title: "Class 11 Chemistry: Atomic Structure & Quantum Numbers",
      subject: "Chemistry",
      classLevel: 11,
      pageCount: 34,
      slug: "class-11-chemistry-atomic-structure-orbitals-free",
      description: "Comprehensive notes on orbitals, quantum mechanics postulates, and electronic configurations.",
    },
    {
      id: "free-2",
      title: "Class 11 Maths: Complete Trigonometric Identity Map",
      subject: "Mathematics",
      classLevel: 11,
      pageCount: 16,
      slug: "class-11-maths-trigonometry-identities-formula-sheet",
      description: "All transformation and double angle formulas mapped out in high-density visual reference format.",
    },
    {
      id: "free-3",
      title: "Class 12 Physics: Electrostatic Formulas & Constants",
      subject: "Physics",
      classLevel: 12,
      pageCount: 22,
      slug: "class-12-physics-electrostatics-formula-sheet-free",
      description: "Permittivity constants, Gauss's law applications, and dipole moment calculation formulas.",
    },
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
          FREE ACADEMIC RESOURCES
        </span>
        <h1 className="text-4xl font-display font-extrabold text-ink-primary tracking-tight">
          Complimentary Study Materials
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          High-yield formula sheets and foundation notes available at zero cost. Evaluate our conceptual clarity and mathematical rigor with no commitment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {freeItems.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-surface-muted text-ink-muted border border-border">
                  CLASS {item.classLevel} • {item.subject.toUpperCase()}
                </span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  FREE
                </span>
              </div>

              <div className="aspect-[16/10] rounded-xl bg-surface-muted border border-border flex flex-col items-center justify-center p-4">
                <FileText className="w-12 h-12 text-emerald-600/60" />
                <span className="text-[11px] font-mono text-ink-muted mt-2">
                  {item.pageCount} Pages • Searchable PDF
                </span>
              </div>

              <div>
                <h2 className="text-lg font-display font-bold text-ink-primary line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-xs text-ink-muted line-clamp-2 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border flex items-center gap-3">
              <Link
                href={`/notes/${item.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface-muted hover:bg-surface-base border border-border text-xs font-semibold text-ink-primary transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-primary" />
                <span>Sample</span>
              </Link>

              <Link
                href={`/notes/${item.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get Free PDF</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
