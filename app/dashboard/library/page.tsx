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
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">My Library</span>
        </div>
        <h1 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          My Learning Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          All your purchased and free notes with lifetime access and dynamic watermarking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownedNotes.map((note) => (
          <div
            key={note.id}
            className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                  Class {note.classLevel} • {note.subject}
                </span>
                <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-blue-50 text-blue-700 border border-blue-200">
                  {note.source === "PURCHASE" ? "OWNED" : "COMPLIMENTARY"}
                </span>
              </div>

              <div className="aspect-[16/10] rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center p-4">
                <FileText className="w-10 h-10 text-blue-600" />
                <span className="text-xs font-medium text-slate-500 mt-2">
                  {note.pageCount} Pages • {note.version}
                </span>
              </div>

              <div>
                <h2 className="text-base font-display font-bold text-slate-900 line-clamp-2">
                  {note.title}
                </h2>
                <span className="text-xs text-slate-500 block mt-1">
                  Type: {note.type}
                </span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
              <Link
                href={`/dashboard/reader/${note.id}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Reader</span>
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
                title="Download Watermarked PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
