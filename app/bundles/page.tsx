import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers, Package, Sparkles } from "lucide-react";

export const metadata = {
  title: "Study Bundles | EVOH Academy",
  description: "Curated all-in-one chapter notes and formula bundles for Class 11 and 12.",
};

export default function BundlesPage() {
  const bundles = [
    {
      id: "bnd-1",
      slug: "class-11-physics-complete-mechanics-bundle",
      title: "Class 11 Physics: Complete Classical Mechanics Bundle",
      classLevel: 11,
      subject: "Physics",
      resourceCount: 6,
      originalPrice: "₹1,199",
      price: "₹799",
      description:
        "Kinematics, Laws of Motion, Work Energy, Rotational Dynamics, and Gravitation assembled into a single comprehensive revision pack.",
    },
    {
      id: "bnd-2",
      slug: "class-12-chemistry-organic-mechanisms-bundle",
      title: "Class 12 Chemistry: Complete Organic Mechanisms Blueprint",
      classLevel: 12,
      subject: "Chemistry",
      resourceCount: 5,
      originalPrice: "₹999",
      price: "₹699",
      description:
        "Every named reaction, electron push arrow pathway, and conversion synthetic route for Haloalkanes, Alcohols, Aldehydes, and Amines.",
    },
    {
      id: "bnd-3",
      slug: "class-12-maths-calculus-mastery-bundle",
      title: "Class 12 Mathematics: Calculus & Vector Mastery Pack",
      classLevel: 12,
      subject: "Mathematics",
      resourceCount: 7,
      originalPrice: "₹1,499",
      price: "₹949",
      description:
        "Continuity, Differentiability, Definite Integrals, Differential Equations, and 3D Vector Geometry with exhaustive formula reference sheets.",
    },
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
          STUDY PACKS & SAVINGS
        </span>
        <h1 className="text-4xl font-display font-extrabold text-ink-primary tracking-tight">
          Curriculum Study Bundles
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          Comprehensive multi-chapter packs designed to guide you from foundational postulates through complex problem sets at discounted bundled pricing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {bundles.map((b) => (
          <div
            key={b.id}
            className="p-8 rounded-3xl bg-white border border-border hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-surface-muted text-ink-muted border border-border">
                  CLASS {b.classLevel} • {b.subject.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  SAVE BUNDLED
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-display font-bold text-ink-primary">
                  {b.title}
                </h2>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="text-xs font-mono text-ink-muted flex items-center gap-2 pt-2 border-t border-border">
                <Package className="w-4 h-4 text-primary" />
                <span>Includes {b.resourceCount} Complete Study Modules</span>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-border flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-mono line-through text-ink-muted">
                  {b.originalPrice}
                </span>
                <div className="text-2xl font-display font-extrabold text-ink-primary">
                  {b.price}
                </div>
              </div>

              <Link
                href={`/notes`}
                className="inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
              >
                <span>Unlock Bundle</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
