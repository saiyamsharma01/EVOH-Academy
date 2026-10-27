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
    <section className="py-14 sm:py-20 bg-slate-50 scientific-grid border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
            Curriculum Portals
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Targeted Learning for High School Science
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Step directly into syllabus-aligned study modules crafted specifically for Class 11 foundational concepts and Class 12 board & entrance mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {config.classes.map((cls) => (
            <Link
              key={cls.level}
              href={cls.link}
              className="group relative p-7 sm:p-9 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/70">
                    CLASS {cls.level} CURRICULUM
                  </span>
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-blue-600 group-hover:border-blue-600 flex items-center justify-center transition-all duration-200">
                    <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cls.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {cls.description}
                  </p>
                </div>

                {/* Subject highlights */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-5 border-t border-slate-100 text-xs font-medium text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Atom className="w-4 h-4 text-blue-600 shrink-0" /> Physics
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <FlaskConical className="w-4 h-4 text-emerald-600 shrink-0" /> Chemistry
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Binary className="w-4 h-4 text-indigo-600 shrink-0" /> Mathematics
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
