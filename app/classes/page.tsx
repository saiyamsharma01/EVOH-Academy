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
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 inline-block">
          Academic Structure
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Select Your Academic Class
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Explore structured chapter notes, formula sheets, and question banks tailored specifically to Class 11 and Class 12 curriculums.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {classes.map((c) => (
          <div
            key={c.level}
            className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
                    {c.badge}
                  </span>
                  <h2 className="text-2xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {c.title}
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {c.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-800 font-semibold">
                  Included Focus Areas:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {c.subjects.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-100">
              <Link
                href={c.link}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs transition-colors"
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
