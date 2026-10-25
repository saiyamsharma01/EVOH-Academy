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
      color: "text-primary",
      bg: "bg-primary/10",
      description:
        "Understand the foundational laws governing the universe. From classical kinematics and Newton's laws to electrodynamics, wave optics, and quantum dual nature.",
      classes: "Classes 11 & 12",
      badge: "Derivations & Free-Body Diagrams",
    },
    {
      name: "Chemistry",
      slug: "chemistry",
      icon: FlaskConical,
      color: "text-accent-cyan",
      bg: "bg-cyan-500/10",
      description:
        "Demystify matter and molecular transformations. Organic reaction mechanisms with electron push arrows, atomic orbitals, thermodynamics, and electrochemistry.",
      classes: "Classes 11 & 12",
      badge: "Reaction Mechanisms & Orbitals",
    },
    {
      name: "Mathematics",
      slug: "mathematics",
      icon: Binary,
      color: "text-accent-violet",
      bg: "bg-indigo-500/10",
      description:
        "Develop supreme analytical power. Comprehensive calculus blueprints, coordinate geometry, trigonometric matrices, and 3D vector spaces.",
      classes: "Classes 11 & 12",
      badge: "Calculus & Formula Memory Sheets",
    },
  ];

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
          Subject Architecture
        </span>
        <h1 className="text-4xl font-display font-extrabold text-ink-primary tracking-tight">
          Physics, Chemistry & Mathematics
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          Select a subject to explore chapter-by-chapter concept maps, formula sheets, and verified derivation notes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {subjects.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.slug}
              className="p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className={`w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${s.color}`} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-ink-muted">{s.classes}</span>
                    <span className="text-[11px] font-mono text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                      {s.badge}
                    </span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-ink-primary">
                    {s.name}
                  </h2>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-border">
                <Link
                  href={`/subjects/${s.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-colors"
                >
                  <span>Explore {s.name}</span>
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
