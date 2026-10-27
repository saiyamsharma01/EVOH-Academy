import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Atom, Binary, CheckCircle2, FileText, FlaskConical } from "lucide-react";

interface SubjectDetailProps {
  params: Promise<{ slug: string }>;
}

const SUBJECT_DETAILS: Record<
  string,
  {
    name: string;
    headline: string;
    description: string;
    color: string;
    icon: any;
    chaptersClass11: string[];
    chaptersClass12: string[];
  }
> = {
  physics: {
    name: "Physics",
    headline: "Understand Physical Reality through Mathematical Derivations",
    description:
      "From basic dimensional analysis to electromagnetic waves. Every law is broken down into its fundamental postulates, step-by-step mathematical steps, and experimental verification.",
    color: "text-primary",
    icon: Atom,
    chaptersClass11: [
      "Physical World & Measurement",
      "Motion in a Straight Line",
      "Motion in a Plane & Vectors",
      "Laws of Motion & Friction",
      "Work, Energy & Power",
      "System of Particles & Rotational Motion",
      "Gravitation & Orbital Mechanics",
      "Thermodynamics & Kinetic Theory",
    ],
    chaptersClass12: [
      "Electric Charges & Fields",
      "Electrostatic Potential & Capacitance",
      "Current Electricity & Kirchhoff's Rules",
      "Moving Charges & Magnetism",
      "Electromagnetic Induction",
      "Alternating Current & LC Oscillations",
      "Ray & Wave Optics",
      "Dual Nature of Radiation & Matter",
    ],
  },
  chemistry: {
    name: "Chemistry",
    headline: "Master Molecular Orbitals and Organic Reaction Pathways",
    description:
      "A complete visual and conceptual guide to chemical behavior. Focuses on reaction mechanisms with clear electron push arrows, thermodynamic energy profiles, and structural coordination theory.",
    color: "text-accent-cyan",
    icon: FlaskConical,
    chaptersClass11: [
      "Some Basic Concepts of Chemistry",
      "Structure of Atom & Quantum Orbitals",
      "Classification of Elements & Periodicity",
      "Chemical Bonding & Molecular Structure",
      "Chemical Thermodynamics",
      "Equilibrium & Le Chatelier's Principle",
      "Organic Chemistry: Basic Principles & Techniques",
      "Hydrocarbons: Alkanes, Alkenes & Alkynes",
    ],
    chaptersClass12: [
      "Solutions & Raoult's Law",
      "Electrochemistry & Nernst Equation",
      "Chemical Kinetics & Rate Laws",
      "The d- and f-Block Elements",
      "Coordination Compounds & Crystal Field Theory",
      "Haloalkanes & Haloarenes Mechanisms",
      "Alcohols, Phenols & Ethers",
      "Aldehydes, Ketones & Carboxylic Acids",
    ],
  },
  mathematics: {
    name: "Mathematics",
    headline: "Develop Analytical Power with Calculus & Spatial Geometry",
    description:
      "Rigorous formulas, geometric interpretations, and solved board question blueprints. Master differential and integral calculus, 3D vectors, and coordinate manifolds with conceptual depth.",
    color: "text-accent-violet",
    icon: Binary,
    chaptersClass11: [
      "Sets & Relations",
      "Trigonometric Functions & General Solutions",
      "Complex Numbers & Quadratic Equations",
      "Permutations & Combinations",
      "Binomial Theorem & Expansions",
      "Sequences & Series",
      "Straight Lines & Conic Sections",
      "Introduction to Limits & Derivatives",
    ],
    chaptersClass12: [
      "Relations & Functions",
      "Inverse Trigonometric Functions",
      "Matrices & Determinants Properties",
      "Continuity & Differentiability",
      "Applications of Derivatives (Maxima/Minima)",
      "Integrals: Definite & Indefinite",
      "Differential Equations Formation & Solutions",
      "Vector Algebra & Three-Dimensional Geometry",
    ],
  },
};

export default async function SubjectDetailPage({ params }: SubjectDetailProps) {
  const { slug } = await params;
  const subject = SUBJECT_DETAILS[slug.toLowerCase()];

  if (!subject) {
    notFound();
  }

  const Icon = subject.icon;

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/subjects" className="hover:text-cyan-400 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Subjects
        </Link>
        <span>/</span>
        <span className="text-white font-bold">{subject.name}</span>
      </div>

      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-950/50">
            <Icon className={`w-6 h-6 ${subject.color}`} />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/40 text-cyan-400 border border-cyan-500/20">
            {subject.name.toUpperCase()} CURRICULUM
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          {subject.headline}
        </h1>

        <p className="text-base text-slate-400 leading-relaxed">
          {subject.description}
        </p>
      </div>

      {/* Chapters Grid split by Class 11 & Class 12 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Class 11 Modules */}
        <div className="p-8 rounded-2xl bg-surface-card/75 border border-white/10 shadow-lg space-y-6 backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold">FOUNDATIONAL</span>
              <h2 className="text-2xl font-display font-bold text-white">
                Class 11 {subject.name}
              </h2>
            </div>
            <Link
              href={`/notes?class=11&subject=${slug}`}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <span>View Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ul className="space-y-3 text-xs text-slate-300">
            {subject.chaptersClass11.map((ch, idx) => (
              <li key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-muted/60 hover:bg-surface-muted border border-white/5 transition-colors">
                <span className="flex items-center gap-2">
                  <span className="w-5 font-mono text-cyan-400 font-bold text-[11px]">{idx + 1}.</span>
                  <span className="font-medium text-slate-200">{ch}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  DRAFT
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Class 12 Modules */}
        <div className="p-8 rounded-2xl bg-surface-card/75 border border-white/10 shadow-lg space-y-6 backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold">BOARD & ENTRANCE</span>
              <h2 className="text-2xl font-display font-bold text-white">
                Class 12 {subject.name}
              </h2>
            </div>
            <Link
              href={`/notes?class=12&subject=${slug}`}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <span>View Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ul className="space-y-3 text-xs text-slate-300">
            {subject.chaptersClass12.map((ch, idx) => (
              <li key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-muted/60 hover:bg-surface-muted border border-white/5 transition-colors">
                <span className="flex items-center gap-2">
                  <span className="w-5 font-mono text-cyan-400 font-bold text-[11px]">{idx + 1}.</span>
                  <span className="font-medium text-slate-200">{ch}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  DRAFT
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
