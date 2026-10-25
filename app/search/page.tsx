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
        <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
          Curriculum Discovery
        </span>
        <h1 className="text-4xl font-display font-extrabold text-ink-primary tracking-tight">
          Search Notes & Formulas
        </h1>
        <p className="text-sm text-ink-muted">
          Find topics, derivations, reaction mechanisms, or calculus formulas across Class 11 and 12.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-muted">
          <Search className="w-5 h-5 text-primary" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Kinematics, Nernst Equation, Definite Integrals, Optics..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-base shadow-sm outline-none transition-all"
          autoFocus
        />
      </div>

      {/* Results View */}
      <div className="space-y-4">
        {loading && (
          <div className="p-8 text-center text-xs font-mono text-ink-muted">
            SEARCHING ACADEMIC INDEX...
          </div>
        )}

        {!loading && query.length >= 2 && results.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-surface-muted border border-border space-y-2">
            <p className="text-sm font-semibold text-ink-primary">
              No matching learning resources found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-ink-muted">
              Try searching by subject name (Physics, Chemistry, Maths) or broader chapter topics.
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-3">
            <span className="text-xs font-mono text-ink-muted">
              Found {results.length} matching resources:
            </span>

            <div className="space-y-2.5">
              {results.map((res) => (
                <Link
                  key={res.id}
                  href={res.url}
                  className="p-5 rounded-xl bg-white border border-border hover:border-primary/40 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-surface-muted text-ink-muted border border-border">
                        Class {res.classLevel}
                      </span>
                      <span className="text-primary font-semibold">
                        {res.subject} • {res.type}
                      </span>
                    </div>
                    <h2 className="text-base font-display font-bold text-ink-primary group-hover:text-primary transition-colors">
                      {res.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-ink-primary">
                      {res.price}
                    </span>
                    <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-primary transition-transform group-hover:translate-x-1" />
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
