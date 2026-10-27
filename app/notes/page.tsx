import React from "react";
import Link from "next/link";
import { Download, Eye, FileText, Filter, Lock, Search } from "lucide-react";

interface NotesPageProps {
  searchParams: Promise<{
    class?: string;
    subject?: string;
    type?: string;
    free?: string;
  }>;
}

export const metadata = {
  title: "Notes Marketplace | EVOH Academy",
  description: "Browse verified concept notes, formula sheets, and question banks for Class 11 and 12 science students.",
};

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const params = await searchParams;
  const selectedClass = params.class;
  const selectedSubject = params.subject;
  const selectedFree = params.free;

  const allNotes = [
    {
      id: "note-1",
      slug: "class-11-physics-kinematics-and-vectors",
      title: "Class 11 Physics: Kinematics & 2D Vectors",
      shortDescription:
        "Comprehensive derivations of projectile motion, relative velocity in 2D, and calculus-based displacement equations.",
      type: "Concept Notes",
      classLevel: 11,
      subject: "Physics",
      pageCount: 42,
      price: "₹199",
      isFree: false,
    },
    {
      id: "note-2",
      slug: "class-12-chemistry-electrochemistry-derivations",
      title: "Class 12 Chemistry: Electrochemistry & Nernst Equation",
      shortDescription:
        "Full derivation of Nernst equation, Gibbs free energy relation, Kohlrausch's law, and solved electrolytic cell numericals.",
      type: "Formula Sheet",
      classLevel: 12,
      subject: "Chemistry",
      pageCount: 28,
      price: "₹149",
      isFree: false,
    },
    {
      id: "note-3",
      slug: "class-12-maths-definite-integrals-blueprint",
      title: "Class 12 Maths: Definite Integrals & Area Under Curves",
      shortDescription:
        "Master the 8 fundamental properties of definite integrals, Leibniz integral rule, and symmetric curve area problems.",
      type: "Question Bank",
      classLevel: 12,
      subject: "Mathematics",
      pageCount: 56,
      price: "₹249",
      isFree: false,
    },
    {
      id: "note-4",
      slug: "class-11-chemistry-atomic-structure-orbitals-free",
      title: "Class 11 Chemistry: Atomic Structure & Quantum Numbers",
      shortDescription:
        "Visual guide to s, p, d orbital geometries, Pauli exclusion principle, Hund's rule, and Bohr model orbital calculations.",
      type: "Concept Notes",
      classLevel: 11,
      subject: "Chemistry",
      pageCount: 34,
      price: "Free",
      isFree: true,
    },
    {
      id: "note-5",
      slug: "class-12-physics-ray-wave-optics-mastery",
      title: "Class 12 Physics: Ray & Wave Optics Derivations",
      shortDescription:
        "Huygens wave theory, Young's double slit interference math, diffraction minima, and lens maker's formula step-by-step.",
      type: "Concept Notes",
      classLevel: 12,
      subject: "Physics",
      pageCount: 48,
      price: "₹219",
      isFree: false,
    },
    {
      id: "note-6",
      slug: "class-11-maths-trigonometry-identities-formula-sheet",
      title: "Class 11 Maths: Complete Trigonometric Identity Map",
      shortDescription:
        "All transformation formulas, multiple angle identities, conditional identities, and general solution rules on a quick-reference sheet.",
      type: "Formula Sheet",
      classLevel: 11,
      subject: "Mathematics",
      pageCount: 16,
      price: "Free",
      isFree: true,
    },
  ];

  // Filter notes based on active URL parameters
  const filteredNotes = allNotes.filter((n) => {
    if (selectedClass && String(n.classLevel) !== selectedClass) return false;
    if (selectedSubject && n.subject.toLowerCase() !== selectedSubject.toLowerCase())
      return false;
    if (selectedFree === "true" && !n.isFree) return false;
    return true;
  });

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block">
          Study Materials Marketplace
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Verified Science Notes & Formula Sheets
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Author-verified PDF notes. Download traceable, dynamically watermarked copies for offline study or read seamlessly within our protected web viewer.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-surface-card/80 border border-white/10 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="text-slate-400 flex items-center gap-1.5 mr-2 font-mono">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filters:
          </span>

          <Link
            href="/notes"
            className={`px-3 py-1.5 rounded-xl border transition-all ${
              !selectedClass && !selectedSubject && !selectedFree
                ? "bg-primary text-white border-primary shadow-[0_0_12px_rgba(59,130,246,0.25)] font-bold"
                : "bg-white/5 text-slate-300 border-white/10 hover:border-cyan-500/40 hover:text-white"
            }`}
          >
            All Notes
          </Link>

          <Link
            href="/notes?class=11"
            className={`px-3 py-1.5 rounded-xl border transition-all ${
              selectedClass === "11"
                ? "bg-primary text-white border-primary shadow-[0_0_12px_rgba(59,130,246,0.25)] font-bold"
                : "bg-white/5 text-slate-300 border-white/10 hover:border-cyan-500/40 hover:text-white"
            }`}
          >
            Class 11
          </Link>

          <Link
            href="/notes?class=12"
            className={`px-3 py-1.5 rounded-xl border transition-all ${
              selectedClass === "12"
                ? "bg-primary text-white border-primary shadow-[0_0_12px_rgba(59,130,246,0.25)] font-bold"
                : "bg-white/5 text-slate-300 border-white/10 hover:border-cyan-500/40 hover:text-white"
            }`}
          >
            Class 12
          </Link>

          <Link
            href="/notes?free=true"
            className={`px-3 py-1.5 rounded-xl border transition-all ${
              selectedFree === "true"
                ? "bg-emerald-600 text-white border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.25)] font-bold"
                : "bg-white/5 text-slate-300 border-white/10 hover:border-emerald-500/40 hover:text-white"
            }`}
          >
            Free Only
          </Link>
        </div>

        <span className="text-xs font-mono text-slate-400">
          Showing {filteredNotes.length} resources
        </span>
      </div>

      {/* Product Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="p-6 rounded-3xl bg-surface-card/75 hover:bg-surface-card-hover/90 border border-white/10 hover:border-cyan-500/40 shadow-xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                  CLASS {note.classLevel} • {note.subject.toUpperCase()}
                </span>
                <span
                  className={`font-semibold px-2.5 py-0.5 rounded-full ${
                    note.isFree
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                      : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/25"
                  }`}
                >
                  {note.price}
                </span>
              </div>

              <div className="aspect-[16/10] rounded-2xl bg-surface-base/80 border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden group">
                <FileText className="w-12 h-12 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                <span className="text-[11px] font-mono text-slate-400 mt-2">
                  {note.pageCount} Pages • {note.type}
                </span>
                <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] font-mono text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded border border-white/10">
                  {note.isFree ? "PUBLIC PREVIEW" : <><Lock className="w-3 h-3 text-cyan-400" /> WATERMARKED</>}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {note.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 mt-1.5 leading-relaxed">
                  {note.shortDescription}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
              <Link
                href={`/notes/${note.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Read Sample</span>
              </Link>

              <Link
                href={`/notes/${note.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
              >
                {note.isFree ? <Download className="w-3.5 h-3.5" /> : null}
                <span>{note.isFree ? "Free Access" : `Buy for ${note.price}`}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
