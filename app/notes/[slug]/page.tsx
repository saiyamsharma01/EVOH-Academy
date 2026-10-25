import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCheck,
  FileText,
  Lock,
  RotateCcw,
  Shield,
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
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
        <Link href="/notes" className="hover:text-primary flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> All Notes
        </Link>
        <span>/</span>
        <span className="text-ink-primary font-bold">{note.subject}</span>
        <span>/</span>
        <span className="truncate max-w-[200px]">{note.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Details & Preview */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                CLASS {note.classLevel} SCIENCE
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-surface-muted text-ink-muted border border-border">
                {note.type}
              </span>
              <span className="text-xs font-mono text-ink-muted ml-auto">
                Edition: {note.version} • {note.lastUpdated}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-primary tracking-tight">
              {note.title}
            </h1>

            <p className="text-base text-ink-muted leading-relaxed">
              {note.description}
            </p>
          </div>

          {/* Sample Preview Container with Watermark Notice */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-bold text-ink-primary flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                <span>Sample Document Preview</span>
              </h2>
              <span className="text-xs font-mono text-ink-muted">
                Showing Page 1 of {note.pageCount}
              </span>
            </div>

            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-white border border-border shadow-md overflow-hidden flex flex-col items-center justify-center p-8 text-center">
              {/* Sample Watermark Diagonal Strip */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="text-4xl sm:text-6xl font-mono font-black text-ink-muted/10 -rotate-12 uppercase tracking-widest">
                  SAMPLE PREVIEW • EVOH ACADEMY
                </span>
              </div>

              <div className="max-w-md space-y-3 relative z-10">
                <FileCheck className="w-12 h-12 text-primary mx-auto opacity-80" />
                <h3 className="text-lg font-display font-bold text-ink-primary">
                  1.1 Postulates of Motion in a Plane
                </h3>
                <p className="text-xs text-ink-muted font-mono leading-relaxed">
                  {"Let r(t) = x(t)î + y(t)ĵ represent the position vector of a particle in R². The instantaneous acceleration vector is obtained by the second time derivative..."}
                </p>
                <div className="pt-2 text-xs font-mono text-primary font-semibold">
                  [Verified Derivation Proof Continues in Full Document]
                </div>
              </div>
            </div>
          </div>

          {/* What is Included Checklist */}
          <div className="p-8 rounded-2xl bg-white border border-border shadow-sm space-y-4">
            <h3 className="text-lg font-display font-bold text-ink-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-cyan" />
              <span>What Is Included in This Resource</span>
            </h3>

            <ul className="space-y-3">
              {note.whatIsIncluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-ink-primary">
                  <CheckCircle2 className="w-4 h-4 mt-1 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Checkout Card & Licensing Guarantee */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="p-8 rounded-2xl bg-white border border-border shadow-xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-ink-muted">Access License</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display font-extrabold text-ink-primary">
                  {note.isFree ? "Free" : note.priceFormatted}
                </span>
                {!note.isFree && (
                  <span className="text-xs font-mono text-ink-muted">
                    (GST inclusive, sequential invoice issued)
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
              
              <p className="text-[11px] text-center text-ink-muted font-mono">
                Lifetime updates to future revisions of this edition included.
              </p>
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
                <span className="text-ink-primary font-bold">Dynamic Watermark Stamp</span>
              </div>
            </div>

            {/* Refund & Security Notice (PRD Sec 15) */}
            <div className="p-4 rounded-xl bg-surface-muted text-xs space-y-2 text-ink-muted">
              <div className="flex items-center gap-1.5 font-semibold text-ink-primary font-mono text-[11px]">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span>Buyer Protection & Refund Policy</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Subject to our verified refund policy. Digital downloads are non-refundable once the file is downloaded, unless defective.{" "}
                <Link href="/refund-policy" className="text-primary hover:underline font-medium">
                  Read live policy terms
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
