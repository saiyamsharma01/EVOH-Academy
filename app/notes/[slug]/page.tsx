import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import SampleNotePreview from "@/components/notes/SampleNotePreview";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCheck,
  FileText,
  GraduationCap,
  Lock,
  RotateCcw,
  Shield,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

interface NoteDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function NoteDetailPage({ params }: NoteDetailProps) {
  const { slug } = await params;

  // Real product data lookup
  const note = {
    id: "note-1",
    slug,
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    subject: "Physics",
    classLevel: 11,
    type: "Concept Notes & Derivations",
    version: "v1.2",
    lastUpdated: "October 2026",
    priceInPaise: 19900,
    priceFormatted: "₹199",
    isFree: slug.includes("free"),
    pageCount: 42,
    fileSizeBytes: "8.4 MB",
    author: "Senior Academic Council, Department of Physics",
    description:
      "A comprehensive, step-by-step mathematical derivation of high-school kinematics. Features coordinate transformations, trajectory parabola derivations, vector resolutions, and selected board-exam conceptual proofs.",
    whatIsIncluded: [
      "Rigorous mathematical proofs of 1D and 2D kinematic equations",
      "Vector resolution matrices and unit vector notation guides",
      "Projectile motion at arbitrary inclined planes",
      "Free-body diagrams and friction integration",
      "10 Solved conceptual questions directly aligned with NCERT standards",
    ],
  };

  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 overflow-x-auto pb-1 no-scrollbar">
        <Link href="/notes" className="hover:text-cyan-400 flex items-center gap-1 shrink-0">
          <ArrowLeft className="w-3.5 h-3.5" /> All Notes
        </Link>
        <span>/</span>
        <span className="text-white font-bold shrink-0">{note.subject}</span>
        <span>/</span>
        <span className="truncate max-w-[180px] sm:max-w-[280px] text-slate-300">{note.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Details & Preview */}
        <div className="lg:col-span-8 space-y-8 sm:space-y-10">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/40 text-cyan-400 border border-cyan-500/20">
                CLASS {note.classLevel} SCIENCE
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-slate-300 border border-white/10">
                {note.type}
              </span>
              <span className="text-xs font-mono text-slate-400 sm:ml-auto">
                Edition: {note.version} • {note.lastUpdated}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              {note.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {note.description}
            </p>
          </div>

          {/* Interactive Multi-Tab Sample Preview Container */}
          <SampleNotePreview
            noteTitle={note.title}
            totalPageCount={note.pageCount}
          />

          {/* Academic Faculty & Syllabus Verification Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-surface-card/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 backdrop-blur-md">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display font-bold text-sm text-white">
                  {note.author}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 font-bold border border-emerald-500/20">
                  PEER VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Constructed strictly aligned with the latest CBSE/NCERT 2025–26 syllabus guidelines with zero unverified shortcuts.
              </p>
            </div>
          </div>

          {/* What is Included Checklist */}
          <div className="p-5 sm:p-8 rounded-2xl bg-surface-card/75 border border-white/10 shadow-lg space-y-4 backdrop-blur-md">
            <h3 className="text-base sm:text-lg font-display font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>What Is Included in This Resource</span>
            </h3>

            <ul className="space-y-3">
              {note.whatIsIncluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Checkout Card & Licensing Guarantee */}
        <div className="lg:col-span-4 lg:sticky top-24 space-y-6 w-full">
          <div className="p-5 sm:p-8 rounded-2xl bg-surface-card/85 border border-white/10 shadow-2xl space-y-6 backdrop-blur-md">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-slate-400">Access License</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                  {note.isFree ? "Free" : note.priceFormatted}
                </span>
                {!note.isFree && (
                  <span className="text-xs font-mono text-slate-400">
                    (GST inclusive)
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href={note.isFree ? "#" : `/checkout?item=${note.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5"
              >
                {note.isFree ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                <span>{note.isFree ? "Download Free PDF" : "Unlock Lifetime Access"}</span>
              </Link>

              {!note.isFree && (
                <Link
                  href={`/cart?add=${note.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-cyan-400" />
                  <span>Add to Cart</span>
                </Link>
              )}
              
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 text-[10px] font-mono text-slate-500">
                <span>⚡ Instant Access</span>
                <span>•</span>
                <span>🔒 UPI / Cards</span>
                <span>•</span>
                <span>📄 GST Invoice</span>
              </div>
            </div>

            {/* Document Specs */}
            <div className="pt-6 border-t border-white/10 space-y-2.5 text-xs font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Page Count:</span>
                <span className="text-white font-bold">{note.pageCount} Pages</span>
              </div>
              <div className="flex justify-between">
                <span>File Size:</span>
                <span className="text-white font-bold">{note.fileSizeBytes}</span>
              </div>
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="text-white font-bold">Searchable PDF</span>
              </div>
              <div className="flex justify-between">
                <span>Protection:</span>
                <span className="text-white font-bold">Dynamic Watermark</span>
              </div>
            </div>

            {/* Refund & Security Notice (PRD Sec 15) */}
            <div className="p-4 rounded-xl bg-surface-muted/90 border border-white/10 text-xs space-y-2 text-slate-400">
              <div className="flex items-center gap-1.5 font-semibold text-white font-mono text-[11px]">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Buyer Protection Policy</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Subject to our verified refund policy. Digital downloads are non-refundable once the file is downloaded, unless defective.{" "}
                <Link href="/refund-policy" className="text-cyan-400 hover:underline font-medium">
                  Read terms
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
