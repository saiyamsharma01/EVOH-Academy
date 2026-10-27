import React from "react";
import Link from "next/link";
import { BookOpen, Download, FileText, Lock, Sparkles } from "lucide-react";

export const metadata = {
  title: "My Library | EVOH Academy",
};

export default function StudentLibraryPage() {
  const ownedNotes = [
    {
      id: "res-1",
      title: "Class 11 Physics: Kinematics & 2D Vectors",
      type: "Concept Notes",
      classLevel: 11,
      subject: "Physics",
      pageCount: 42,
      source: "PURCHASE",
      version: "v1.2 (Current)",
      hasUpdate: false,
    },
    {
      id: "res-2",
      title: "Class 12 Chemistry: Electrochemistry & Nernst Equation",
      type: "Formula Sheet",
      classLevel: 12,
      subject: "Chemistry",
      pageCount: 28,
      source: "PURCHASE",
      version: "v1.0 (Current)",
      hasUpdate: false,
    },
    {
      id: "res-4",
      title: "Class 11 Chemistry: Atomic Structure & Quantum Numbers",
      type: "Concept Notes",
      classLevel: 11,
      subject: "Chemistry",
      pageCount: 34,
      source: "FREE",
      version: "v1.1 (Current)",
      hasUpdate: false,
    },
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
          <span>/</span>
          <span className="text-white font-bold">My Library</span>
        </div>
        <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
          My Learning Library
        </h1>
        <p className="text-xs text-slate-400">
          All your purchased and free notes with lifetime access and dynamic watermarking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownedNotes.map((note) => (
          <div
            key={note.id}
            className="p-6 rounded-2xl bg-surface-card/75 border border-white/10 hover:border-cyan-500/40 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between backdrop-blur-md hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-surface-muted/90 text-slate-300 border border-white/10">
                  Class {note.classLevel} • {note.subject}
                </span>
                <span className="px-2 py-0.5 rounded-full font-bold bg-cyan-950/40 text-cyan-400 border border-cyan-500/20">
                  {note.source === "PURCHASE" ? "OWNED" : "COMPLIMENTARY"}
                </span>
              </div>

              <div className="aspect-[16/10] rounded-xl bg-surface-muted/80 border border-white/10 flex flex-col items-center justify-center p-4">
                <FileText className="w-10 h-10 text-cyan-400" />
                <span className="text-[11px] font-mono text-slate-400 mt-2">
                  {note.pageCount} Pages • {note.version}
                </span>
              </div>

              <div>
                <h2 className="text-base font-display font-bold text-white line-clamp-2">
                  {note.title}
                </h2>
                <span className="text-xs font-mono text-slate-400 block mt-1">
                  Type: {note.type}
                </span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
              <Link
                href={`/dashboard/reader/${note.id}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Reader</span>
              </Link>

              <Link
                href={`/api/downloads/${note.id}`}
                className="inline-flex items-center justify-center p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-cyan-400 transition-colors"
                title="Download watermarked copy"
              >
                <Download className="w-4 h-4 text-cyan-400" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
