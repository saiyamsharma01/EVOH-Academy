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
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 inline-block">
          STUDY PACKS & SAVINGS
        </span>
        <h1 className="text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Curriculum Study Bundles
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Comprehensive multi-chapter packs designed to guide you from foundational postulates through complex problem sets at discounted bundled pricing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {bundles.map((b) => (
          <div
            key={b.id}
            className="p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700 font-medium">
                  CLASS {b.classLevel} • {b.subject.toUpperCase()}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  SAVE BUNDLED
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-display font-bold text-slate-900">
                  {b.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="text-xs text-slate-600 flex items-center gap-2 pt-2 border-t border-slate-100 font-medium">
                <Package className="w-4 h-4 text-blue-600" />
                <span>Includes {b.resourceCount} Complete Study Modules</span>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-xs line-through text-slate-400">
                  {b.originalPrice}
                </span>
                <div className="text-2xl font-display font-extrabold text-slate-900">
                  {b.price}
                </div>
              </div>

              <Link
                href="/checkout"
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Buy Bundle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
