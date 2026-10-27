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
    color: "text-blue-600",
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
      "A complete visual and conceptual guide to chemical behavior. Focuses on reaction mechanisms with clear electron-push arrows, thermodynamic energy profiles, and structural coordination theory.",
    color: "text-emerald-600",
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
    color: "text-indigo-600",
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
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/subjects" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Subjects
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{subject.name}</span>
      </div>

      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
            <Icon className={`w-6 h-6 ${subject.color}`} />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            {subject.name.toUpperCase()} CURRICULUM
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          {subject.headline}
        </h1>

        <p className="text-base text-slate-600 leading-relaxed">
          {subject.description}
        </p>
      </div>

      {/* Chapters Grid split by Class 11 & Class 12 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Class 11 Modules */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase">FOUNDATIONAL</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">
                Class 11 {subject.name}
              </h2>
            </div>
            <Link
              href={`/notes?class=11&subject=${slug}`}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ul className="space-y-2.5 text-xs">
            {subject.chaptersClass11.map((ch, idx) => (
              <li key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="flex items-center gap-2.5">
                  <span className="w-5 font-semibold text-blue-600 text-xs">{idx + 1}.</span>
                  <span className="font-medium text-slate-800">{ch}</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  CURATED
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Class 12 Modules */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase">BOARD & ENTRANCE</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">
                Class 12 {subject.name}
              </h2>
            </div>
            <Link
              href={`/notes?class=12&subject=${slug}`}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ul className="space-y-2.5 text-xs">
            {subject.chaptersClass12.map((ch, idx) => (
              <li key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="flex items-center gap-2.5">
                  <span className="w-5 font-semibold text-blue-600 text-xs">{idx + 1}.</span>
                  <span className="font-medium text-slate-800">{ch}</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  CURATED
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
