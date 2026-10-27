"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Search, Sparkles } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  url: string;
  type: string;
  classLevel: number;
  subject: string;
  price: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <div className="text-center space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
          Curriculum Discovery
        </span>
        <h1 className="text-4xl font-display font-extrabold text-white tracking-tight">
          Search Notes & Formulas
        </h1>
        <p className="text-sm text-slate-400">
          Find topics, derivations, reaction mechanisms, or calculus formulas across Class 11 and 12.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Kinematics, Nernst Equation, Definite Integrals, Optics..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface-card/80 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-base shadow-xl outline-none transition-all backdrop-blur-md"
          autoFocus
        />
      </div>

      {/* Results View */}
      <div className="space-y-4">
        {loading && (
          <div className="p-8 text-center text-xs font-mono text-cyan-400 animate-pulse">
            SEARCHING ACADEMIC INDEX...
          </div>
        )}

        {!loading && query.length >= 2 && results.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-surface-card/60 border border-white/10 space-y-2 backdrop-blur-md">
            <p className="text-sm font-semibold text-white">
              No matching learning resources found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-slate-400">
              Try searching by subject name (Physics, Chemistry, Maths) or broader chapter topics.
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-3">
            <span className="text-xs font-mono text-slate-400">
              Found {results.length} matching resources:
            </span>

            <div className="space-y-2.5">
              {results.map((res) => (
                <Link
                  key={res.id}
                  href={res.url}
                  className="p-5 rounded-xl bg-surface-card/75 border border-white/10 hover:border-cyan-500/40 shadow-lg hover:shadow-2xl transition-all flex items-center justify-between group backdrop-blur-md hover:-translate-y-0.5"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-surface-muted/90 text-slate-300 border border-white/10">
                        Class {res.classLevel}
                      </span>
                      <span className="text-cyan-400 font-semibold">
                        {res.subject} • {res.type}
                      </span>
                    </div>
                    <h2 className="text-base font-display font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {res.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-white">
                      {res.price}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
