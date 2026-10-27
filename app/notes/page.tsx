import React from "react";
import Link from "next/link";
import { Download, Eye, FileText, Filter, Lock } from "lucide-react";

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
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 inline-block">
          Curriculum Materials
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Verified Science Notes & Formula Sheets
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Faculty-verified PDF notes. Download traceable, dynamically watermarked copies for offline study or read seamlessly within our protected web viewer.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="text-slate-500 flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-blue-600" /> Filters:
          </span>

          <Link
            href="/notes"
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${
              !selectedClass && !selectedSubject && !selectedFree
                ? "bg-blue-600 text-white border-blue-600 font-semibold shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            All Notes
          </Link>

          <Link
            href="/notes?class=11"
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${
              selectedClass === "11"
                ? "bg-blue-600 text-white border-blue-600 font-semibold shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            Class 11
          </Link>

          <Link
            href="/notes?class=12"
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${
              selectedClass === "12"
                ? "bg-blue-600 text-white border-blue-600 font-semibold shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            Class 12
          </Link>

          <Link
            href="/notes?free=true"
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${
              selectedFree === "true"
                ? "bg-emerald-600 text-white border-emerald-600 font-semibold shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            Free Only
          </Link>
        </div>

        <span className="text-xs font-medium text-slate-500">
          Showing {filteredNotes.length} resources
        </span>
      </div>

      {/* Product Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                  CLASS {note.classLevel} • {note.subject.toUpperCase()}
                </span>
                <span
                  className={`font-bold px-2.5 py-0.5 rounded-full ${
                    note.isFree
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                      : "bg-blue-50 text-blue-700 border border-blue-200/80"
                  }`}
                >
                  {note.price}
                </span>
              </div>

              <div className="aspect-[16/10] rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col items-center justify-center p-4 relative overflow-hidden group">
                <FileText className="w-12 h-12 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="text-[11px] font-medium text-slate-500 mt-2">
                  {note.pageCount} Pages • {note.type}
                </span>
                <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] text-slate-600 bg-white/90 px-2 py-0.5 rounded border border-slate-200">
                  {note.isFree ? "PUBLIC PREVIEW" : <><Lock className="w-3 h-3 text-slate-500" /> WATERMARKED</>}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {note.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 mt-1.5 leading-relaxed">
                  {note.shortDescription}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
              <Link
                href={`/notes/${note.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>Read Sample</span>
              </Link>

              <Link
                href={`/notes/${note.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5"
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
