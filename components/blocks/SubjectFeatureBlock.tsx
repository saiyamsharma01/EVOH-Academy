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
      color: "text-primary",
      accentBg: "bg-primary/5",
      borderHover: "hover:border-primary/40",
      description: "Mathematical modeling of reality: Mechanics, Electrostatics, Magnetism, Optics & Modern Physics.",
      bullets: ["Step-by-step mathematical derivations", "Free body diagrams & vector analysis", "Solved conceptual board problems"],
      link: "/subjects/physics",
    },
    {
      name: "Chemistry",
      slug: "chemistry",
      icon: FlaskConical,
      color: "text-accent-cyan",
      accentBg: "bg-cyan-500/5",
      borderHover: "hover:border-accent-cyan/40",
      description: "Organic mechanism flows, molecular orbital hybridization, and physical chemistry stoichiometry.",
      bullets: ["Electron push arrow mechanism maps", "Periodic property trend charts", "Crystal lattice & thermodynamics summaries"],
      link: "/subjects/chemistry",
    },
    {
      name: "Mathematics",
      slug: "mathematics",
      icon: Binary,
      color: "text-accent-violet",
      accentBg: "bg-indigo-500/5",
      borderHover: "hover:border-accent-violet/40",
      description: "Rigorous analytical geometry, differential & integral calculus, linear algebra, and 3D vectors.",
      bullets: ["Curated formula memory sheets", "Geometric proofs & visual interpretations", "Calculus application blueprints"],
      link: "/subjects/mathematics",
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-surface-base border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Deep Subject Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-ink-primary tracking-tight">
            Designed for Scientific Rigor & Comprehension
          </h2>
          <p className="text-sm sm:text-base text-ink-muted">
            Each subject is structured from foundational postulates up to advanced application problems, ensuring you understand the fundamental &quot;why&quot; behind every formula.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {subjects.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.slug}
                className={`p-6 sm:p-8 rounded-2xl bg-white border border-border ${s.borderHover} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="space-y-6">
                  <div className={`w-14 h-14 rounded-xl ${s.accentBg} flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${s.color}`} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-ink-primary">
                      {s.name}
                    </h3>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <ul className="space-y-3 pt-2">
                    {s.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-ink-primary">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${s.color}`} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-6 border-t border-border/60">
                  <Link
                    href={s.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover group"
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
