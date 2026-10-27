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
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80">
          Curriculum Discovery
        </span>
        <h1 className="text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Search Notes & Formulas
        </h1>
        <p className="text-sm text-slate-600">
          Find topics, derivations, reaction mechanisms, or calculus formulas across Class 11 and 12.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Kinematics, Nernst Equation, Definite Integrals, Optics..."
          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 placeholder-slate-400 text-base shadow-xs outline-none transition-colors"
          autoFocus
        />
      </div>

      {/* Results View */}
      <div className="space-y-4">
        {loading && (
          <div className="p-8 text-center text-xs font-medium text-blue-600 animate-pulse">
            Searching academic index...
          </div>
        )}

        {!loading && query.length >= 2 && results.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200/90 space-y-2 shadow-xs">
            <p className="text-sm font-semibold text-slate-900">
              No matching learning resources found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-slate-500">
              Try searching by subject name (Physics, Chemistry, Maths) or broader chapter topics.
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-3">
            <span className="text-xs font-medium text-slate-500">
              Found {results.length} matching resources:
            </span>

            <div className="space-y-2.5">
              {results.map((res) => (
                <Link
                  key={res.id}
                  href={res.url}
                  className="p-5 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                        Class {res.classLevel}
                      </span>
                      <span className="text-blue-600 font-semibold">
                        {res.subject} • {res.type}
                      </span>
                    </div>
                    <h2 className="text-base font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {res.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-900">
                      {res.price}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
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
