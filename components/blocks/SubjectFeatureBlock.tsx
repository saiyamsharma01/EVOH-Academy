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
      color: "text-blue-400",
      accentBg: "bg-blue-500/10 border border-blue-500/25 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
      borderHover: "hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      description: "Mathematical modeling of reality: Mechanics, Electrostatics, Magnetism, Optics & Modern Physics.",
      bullets: ["Step-by-step mathematical derivations", "Free body diagrams & vector analysis", "Solved conceptual board problems"],
      link: "/subjects/physics",
    },
    {
      name: "Chemistry",
      slug: "chemistry",
      icon: FlaskConical,
      color: "text-cyan-400",
      accentBg: "bg-cyan-500/10 border border-cyan-500/25 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
      borderHover: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      description: "Organic mechanism flows, molecular orbital hybridization, and physical chemistry stoichiometry.",
      bullets: ["Electron push arrow mechanism maps", "Periodic property trend charts", "Crystal lattice & thermodynamics summaries"],
      link: "/subjects/chemistry",
    },
    {
      name: "Mathematics",
      slug: "mathematics",
      icon: Binary,
      color: "text-violet-400",
      accentBg: "bg-violet-500/10 border border-violet-500/25 shadow-[0_0_15px_rgba(139,92,246,0.15)]",
      borderHover: "hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
      description: "Rigorous analytical geometry, differential & integral calculus, linear algebra, and 3D vectors.",
      bullets: ["Curated formula memory sheets", "Geometric proofs & visual interpretations", "Calculus application blueprints"],
      link: "/subjects/mathematics",
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-surface-muted/50 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block">
            Deep Subject Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight">
            Designed for Scientific Rigor & Comprehension
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Each subject is structured from foundational postulates up to advanced application problems, ensuring you understand the fundamental &quot;why&quot; behind every formula.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {subjects.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.slug}
                className={`p-6 sm:p-8 rounded-3xl bg-surface-card/75 hover:bg-surface-card-hover/90 border border-white/10 ${s.borderHover} shadow-xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between group`}
              >
                <div className="space-y-6">
                  <div className={`w-14 h-14 rounded-2xl ${s.accentBg} flex items-center justify-center transition-transform group-hover:scale-105`}>
                    <Icon className={`w-7 h-7 ${s.color}`} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <ul className="space-y-3 pt-2">
                    {s.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${s.color}`} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-6 border-t border-white/10">
                  <Link
                    href={s.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 group"
                  >
                    <span>Explore {s.name} Curriculum</span>
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
