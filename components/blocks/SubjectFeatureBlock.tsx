import React from "react";
import Link from "next/link";
import { ArrowRight, Atom, Binary, CheckCircle2, FlaskConical } from "lucide-react";

interface SubjectFeatureConfig {
  subjectSlug: string;
  headline: string;
  body: string;
}

export default function SubjectFeatureBlock({ config }: { config: SubjectFeatureConfig }) {
  const subjects = [
    {
      name: "Physics",
      slug: "physics",
      icon: Atom,
      color: "text-blue-600",
      accentBg: "bg-blue-50 border border-blue-100",
      borderHover: "hover:border-blue-200",
      description: "Mathematical modeling of physical principles: Mechanics, Electrostatics, Magnetism, Optics & Modern Physics.",
      bullets: ["Step-by-step mathematical derivations", "Free body diagrams & vector analysis", "Solved conceptual board problems"],
      link: "/subjects/physics",
    },
    {
      name: "Chemistry",
      slug: "chemistry",
      icon: FlaskConical,
      color: "text-emerald-600",
      accentBg: "bg-emerald-50 border border-emerald-100",
      borderHover: "hover:border-emerald-200",
      description: "Organic reaction pathways, coordination complexes, chemical thermodynamics, and stoichiometry.",
      bullets: ["Electron-push mechanism schematics", "Periodic property trend charts", "Thermodynamics & equilibrium summaries"],
      link: "/subjects/chemistry",
    },
    {
      name: "Mathematics",
      slug: "mathematics",
      icon: Binary,
      color: "text-indigo-600",
      accentBg: "bg-indigo-50 border border-indigo-100",
      borderHover: "hover:border-indigo-200",
      description: "Rigorous analytical geometry, differential & integral calculus, linear algebra, and 3D vectors.",
      bullets: ["Essential formula summary sheets", "Geometric proofs & visual interpretations", "Calculus application blueprints"],
      link: "/subjects/mathematics",
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 inline-block">
            Curriculum Depth
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Engineered for Rigorous Conceptual Mastery
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every module builds foundational principles up to advanced analytical problems, ensuring complete mastery over derivations and core concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {subjects.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.slug}
                className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <div className={`w-13 h-13 w-12 h-12 rounded-xl ${s.accentBg} flex items-center justify-center transition-transform group-hover:scale-105`}>
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <ul className="space-y-2.5 pt-2">
                    {s.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${s.color}`} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href={s.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group"
                  >
                    <span>Explore {s.name} Syllabus</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
