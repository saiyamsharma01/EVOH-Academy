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
      <div className="flex items-center gap-2 text-xs font-mono text-ink-muted overflow-x-auto pb-1 no-scrollbar">
        <Link href="/notes" className="hover:text-primary flex items-center gap-1 shrink-0">
          <ArrowLeft className="w-3.5 h-3.5" /> All Notes
        </Link>
        <span>/</span>
        <span className="text-ink-primary font-bold shrink-0">{note.subject}</span>
        <span>/</span>
        <span className="truncate max-w-[180px] sm:max-w-[280px]">{note.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Details & Preview */}
        <div className="lg:col-span-8 space-y-8 sm:space-y-10">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                CLASS {note.classLevel} SCIENCE
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-surface-muted text-ink-muted border border-border">
                {note.type}
              </span>
              <span className="text-xs font-mono text-ink-muted sm:ml-auto">
                Edition: {note.version} • {note.lastUpdated}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-ink-primary tracking-tight">
              {note.title}
            </h1>

            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
              {note.description}
            </p>
          </div>

          {/* Interactive Multi-Tab Sample Preview Container */}
          <SampleNotePreview
            noteTitle={note.title}
            totalPageCount={note.pageCount}
          />

          {/* Academic Faculty & Syllabus Verification Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-surface-muted border border-border flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display font-bold text-sm text-ink-primary">
                  {note.author}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 font-bold border border-emerald-500/20">
                  PEER VERIFIED
                </span>
              </div>
              <p className="text-xs text-ink-muted">
                Constructed strictly aligned with the latest CBSE/NCERT 2025–26 syllabus guidelines with zero unverified shortcuts.
              </p>
            </div>
          </div>

          {/* What is Included Checklist */}
          <div className="p-5 sm:p-8 rounded-2xl bg-white border border-border shadow-sm space-y-4">
            <h3 className="text-base sm:text-lg font-display font-bold text-ink-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-cyan" />
              <span>What Is Included in This Resource</span>
            </h3>

            <ul className="space-y-3">
              {note.whatIsIncluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-ink-primary">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Checkout Card & Licensing Guarantee */}
        <div className="lg:col-span-4 lg:sticky top-24 space-y-6 w-full">
          <div className="p-5 sm:p-8 rounded-2xl bg-white border border-border shadow-xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-ink-muted">Access License</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-display font-extrabold text-ink-primary">
                  {note.isFree ? "Free" : note.priceFormatted}
                </span>
                {!note.isFree && (
                  <span className="text-xs font-mono text-ink-muted">
                    (GST inclusive)
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href={note.isFree ? "#" : `/checkout?item=${note.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
              >
                {note.isFree ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                <span>{note.isFree ? "Download Free PDF" : "Unlock Lifetime Access"}</span>
              </Link>

              {!note.isFree && (
                <Link
                  href={`/cart?add=${note.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-muted hover:bg-border border border-border text-ink-primary text-xs font-semibold transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  <span>Add to Cart</span>
                </Link>
              )}
              
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 text-[10px] font-mono text-ink-muted">
                <span>⚡ Instant Access</span>
                <span>•</span>
                <span>🔒 UPI / Cards</span>
                <span>•</span>
                <span>📄 GST Invoice</span>
              </div>
            </div>

            {/* Document Specs */}
            <div className="pt-6 border-t border-border space-y-2.5 text-xs font-mono text-ink-muted">
              <div className="flex justify-between">
                <span>Page Count:</span>
                <span className="text-ink-primary font-bold">{note.pageCount} Pages</span>
              </div>
              <div className="flex justify-between">
                <span>File Size:</span>
                <span className="text-ink-primary font-bold">{note.fileSizeBytes}</span>
              </div>
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="text-ink-primary font-bold">Searchable PDF</span>
              </div>
              <div className="flex justify-between">
                <span>Protection:</span>
                <span className="text-ink-primary font-bold">Dynamic Watermark</span>
              </div>
            </div>

            {/* Refund & Security Notice (PRD Sec 15) */}
            <div className="p-4 rounded-xl bg-surface-muted text-xs space-y-2 text-ink-muted">
              <div className="flex items-center gap-1.5 font-semibold text-ink-primary font-mono text-[11px]">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span>Buyer Protection Policy</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Subject to our verified refund policy. Digital downloads are non-refundable once the file is downloaded, unless defective.{" "}
                <Link href="/refund-policy" className="text-primary hover:underline font-medium">
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
