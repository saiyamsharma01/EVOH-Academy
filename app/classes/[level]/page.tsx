import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Atom, Binary, BookOpen, FlaskConical } from "lucide-react";

interface ClassPortalProps {
  params: Promise<{ level: string }>;
}

export default async function ClassDetailPage({ params }: ClassPortalProps) {
  const { level } = await params;
  const classNum = parseInt(level, 10);

  if (classNum !== 11 && classNum !== 12) {
    notFound();
  }

  const subjects = [
    {
      name: "Physics",
      slug: "physics",
      icon: Atom,
      color: "text-primary",
      bg: "bg-primary/10",
      topics:
        classNum === 11
          ? ["Kinematics & Motion in a Plane", "Laws of Motion & Friction", "Work, Energy & Power", "Thermodynamics & Kinetic Theory"]
          : ["Electrostatics & Gauss's Law", "Current Electricity & Circuits", "Electromagnetic Induction & AC", "Wave & Ray Optics"],
    },
    {
      name: "Chemistry",
      slug: "chemistry",
      icon: FlaskConical,
      color: "text-accent-cyan",
      bg: "bg-cyan-500/10",
      topics:
        classNum === 11
          ? ["Structure of Atom & Orbitals", "Chemical Bonding & VSEPR", "Chemical Thermodynamics", "Redox Reactions & Equilibrium"]
          : ["Solutions & Colligative Properties", "Electrochemistry & Batteries", "Chemical Kinetics", "Aldehydes, Ketones & Carboxylic Acids"],
    },
    {
      name: "Mathematics",
      slug: "mathematics",
      icon: Binary,
      color: "text-accent-violet",
      bg: "bg-indigo-500/10",
      topics:
        classNum === 11
          ? ["Trigonometric Functions & Identities", "Permutations & Combinations", "Binomial Theorem", "Limits & Derivative Formulas"]
          : ["Matrices & Determinants", "Continuity & Differentiability", "Definite & Indefinite Integrals", "Vectors & 3D Geometry"],
    },
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
        <Link href="/classes" className="hover:text-primary flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Classes
        </Link>
        <span>/</span>
        <span className="text-ink-primary font-bold">Class {classNum}</span>
      </div>

      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
          CURRICULUM PORTAL
        </span>
        <h1 className="text-4xl font-display font-extrabold text-ink-primary tracking-tight">
          Class {classNum} Science Curriculum
        </h1>
        <p className="text-base text-ink-muted max-w-3xl leading-relaxed">
          Comprehensive, formula-driven study modules tailored specifically for Class {classNum} students. Access verified concept notes, step-by-step mathematical proofs, and solved problem sets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {subjects.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.slug}
              className="p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-ink-primary">
                      {s.name}
                    </h2>
                    <span className="text-xs font-mono text-ink-muted">
                      Class {classNum} Modules
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-ink-muted font-semibold">
                    Core Chapters:
                  </span>
                  <ul className="space-y-1.5 text-xs text-ink-primary">
                    {s.topics.map((t, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${s.color} bg-current`} />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-border">
                <Link
                  href={`/notes?class=${classNum}&subject=${s.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-muted hover:bg-primary hover:text-white text-xs font-semibold text-ink-primary transition-colors"
                >
                  <span>View Class {classNum} {s.name} Notes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
