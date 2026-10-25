import React from "react";
import Link from "next/link";
import { ArrowUpRight, Atom, Binary, FlaskConical } from "lucide-react";

interface ClassItem {
  level: number;
  title: string;
  description: string;
  link: string;
}

interface ClassSelectorConfig {
  classes: ClassItem[];
}

export default function ClassSelectorBlock({ config }: { config: ClassSelectorConfig }) {
  return (
    <section className="py-20 bg-surface-base scientific-grid border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Curriculum Portals
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-primary tracking-tight">
            Targeted Learning for High School Science
          </h3>
          <p className="text-base text-ink-muted">
            Step directly into syllabus-aligned study modules crafted specifically for Class 11 foundational concepts and Class 12 board & entrance mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {config.classes.map((cls) => (
            <Link
              key={cls.level}
              href={cls.link}
              className="group relative p-8 rounded-2xl bg-white border border-border hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                    CLASS {cls.level} SCIENCE
                  </span>
                  <div className="w-10 h-10 rounded-full bg-surface-muted group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-ink-primary group-hover:text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl font-display font-bold text-ink-primary group-hover:text-primary transition-colors">
                    {cls.title}
                  </h4>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {cls.description}
                  </p>
                </div>

                {/* Subject highlights */}
                <div className="flex items-center gap-6 pt-4 border-t border-border/60 text-xs font-mono text-ink-muted">
                  <span className="flex items-center gap-1.5">
                    <Atom className="w-4 h-4 text-primary" /> Physics
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-accent-cyan" /> Chemistry
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Binary className="w-4 h-4 text-accent-violet" /> Mathematics
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
