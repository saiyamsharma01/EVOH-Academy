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
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
          Scientific Insights
        </span>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Academic Insights & Problem-Solving
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          In-depth guides on structuring mathematical proofs, visualizing molecular reactions, and excelling in high-school science examinations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="p-8 rounded-3xl bg-surface-card/70 border border-white/10 hover:border-cyan-500/30 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between backdrop-blur-md hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-cyan-400 font-bold">{post.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> {post.readingTime}
                </span>
              </div>

              <h2 className="text-xl font-display font-bold text-white leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">{post.date}</span>
              <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1 group cursor-pointer hover:text-cyan-300">
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
