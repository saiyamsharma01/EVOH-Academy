import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Class 11 & Class 12 Science Portals",
  description: "Targeted Physics, Chemistry, and Mathematics curriculum notes for high school science students.",
};

export default function ClassesPage() {
  const classes = [
    {
      level: 11,
      title: "Class 11 Science Portal",
      badge: "Foundational Mechanics & Fundamentals",
      description:
        "The bridge between basic high school science and rigorous analytical reasoning. Covers kinematics, thermodynamics, chemical bonding, and introductory differential calculus.",
      subjects: ["Physics (Kinematics, Laws of Motion, Work Energy)", "Chemistry (Atomic Structure, Bonding, Thermodynamics)", "Mathematics (Sets, Trigonometry, Limits & Derivatives)"],
      link: "/classes/11",
    },
    {
      level: 12,
      title: "Class 12 Science Portal",
      badge: "Board & Competitive Mastery",
      description:
        "Comprehensive board syllabus and entrance preparation. Master electromagnetism, organic reaction mechanisms, vectors, and integral calculus.",
      subjects: ["Physics (Electrostatics, Magnetism, Wave Optics)", "Chemistry (Electrochemistry, Kinetics, Coordination Compounds)", "Mathematics (Integrals, Differential Equations, 3D Geometry)"],
      link: "/classes/12",
    },
  ];

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block">
          Academic Structure
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Select Your Academic Class
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Explore structured chapter notes, formula sheets, and question banks tailored specifically to Class 11 and Class 12 curriculums.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {classes.map((c) => (
          <div
            key={c.level}
            className="p-8 rounded-3xl bg-surface-card/75 hover:bg-surface-card-hover/90 border border-white/10 hover:border-cyan-500/40 shadow-xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                    {c.badge}
                  </span>
                  <h2 className="text-2xl font-display font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {c.title}
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed">
                {c.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-xs font-mono text-slate-300 font-semibold">
                  Included Focus Areas:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {c.subjects.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10 relative z-10">
              <Link
                href={c.link}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
              >
                <span>Enter Class {c.level} Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
