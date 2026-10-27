import React from "react";
import Link from "next/link";
import { ArrowRight, Atom, Binary, FlaskConical } from "lucide-react";

export const metadata = {
  title: "Core Science Subjects | Physics, Chemistry, Mathematics",
  description: "Browse subject curriculums across Class 11 and 12 with verified concept notes and derivations.",
};

export default function SubjectsPage() {
  const subjects = [
    {
      name: "Physics",
      slug: "physics",
      icon: Atom,
      color: "text-blue-600",
      bg: "bg-blue-50 border-blue-100",
      description:
        "Understand the foundational laws governing the universe. From classical kinematics and Newton's laws to electrodynamics, wave optics, and modern physics.",
      classes: "Classes 11 & 12",
      badge: "Derivations & Vector Diagrams",
    },
    {
      name: "Chemistry",
      slug: "chemistry",
      icon: FlaskConical,
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-100",
      description:
        "Demystify matter and molecular transformations. Organic reaction mechanisms with electron-push arrows, atomic orbitals, thermodynamics, and electrochemistry.",
      classes: "Classes 11 & 12",
      badge: "Reaction Mechanisms & Orbitals",
    },
    {
      name: "Mathematics",
      slug: "mathematics",
      icon: Binary,
      color: "text-indigo-600",
      bg: "bg-indigo-50 border-indigo-100",
      description:
        "Develop supreme analytical power. Comprehensive calculus blueprints, coordinate geometry, trigonometric matrices, and 3D vector spaces.",
      classes: "Classes 11 & 12",
      badge: "Calculus & Formula Maps",
    },
  ];

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 inline-block">
          Subject Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Physics, Chemistry & Mathematics
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Select a subject to explore chapter-by-chapter concept maps, formula sheets, and verified derivation notes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {subjects.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.slug}
              className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                <div className={`w-12 h-12 rounded-xl ${s.bg} border flex items-center justify-center transition-transform group-hover:scale-105`}>
                  <Icon className={`w-6 h-6 ${s.color}`} />
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">{s.classes}</span>
                    <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {s.badge}
                    </span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {s.name}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-slate-100">
                <Link
                  href={`/subjects/${s.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs transition-colors"
                >
                  <span>Explore {s.name} Curriculum</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
