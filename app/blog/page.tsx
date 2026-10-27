import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";

export const metadata = {
  title: "Academic Strategy Blog | EVOH Academy",
  description: "Study strategies, derivation guides, and scientific problem-solving methods for Class 11 and 12.",
};

export default function BlogPage() {
  const posts = [
    {
      slug: "how-to-master-physics-derivations-step-by-step",
      title: "How to Master Physics Derivations: Moving Beyond Memorization",
      excerpt:
        "Why memorizing formulas fails in board examinations, and how understanding coordinate vectors and initial postulates leads to effortless recall.",
      date: "October 2026",
      readingTime: "5 min read",
      category: "Physics Strategy",
    },
    {
      slug: "demystifying-organic-chemistry-reaction-mechanisms",
      title: "Demystifying Organic Chemistry: Understanding Electron Push Arrows",
      excerpt:
        "A spatial guide to nucleophiles, electrophiles, and transition states in Class 12 haloalkanes and aromatic compounds.",
      date: "October 2026",
      readingTime: "6 min read",
      category: "Chemistry Insights",
    },
  ];

  return (
    <div className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80">
          Scientific Insights
        </span>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Academic Insights & Problem-Solving
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          In-depth guides on structuring mathematical proofs, visualizing molecular reactions, and excelling in high-school science examinations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="text-blue-600 font-semibold">{post.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {post.readingTime}
                </span>
              </div>

              <h2 className="text-xl font-display font-bold text-slate-900 leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">{post.date}</span>
              <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 cursor-pointer hover:text-blue-700">
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
