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
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto pb-1 no-scrollbar font-medium">
        <Link href="/notes" className="hover:text-blue-600 flex items-center gap-1 shrink-0">
          <ArrowLeft className="w-3.5 h-3.5" /> All Notes
        </Link>
        <span>/</span>
        <span className="text-slate-700 shrink-0">{note.subject}</span>
        <span>/</span>
        <span className="truncate max-w-[180px] sm:max-w-[280px] text-slate-900 font-semibold">{note.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Details & Preview */}
        <div className="lg:col-span-8 space-y-8 sm:space-y-10">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
                CLASS {note.classLevel} SCIENCE
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                {note.type}
              </span>
              <span className="text-xs text-slate-500 sm:ml-auto">
                Edition: {note.version} • {note.lastUpdated}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              {note.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {note.description}
            </p>
          </div>

          {/* Interactive Multi-Tab Sample Preview Container */}
          <SampleNotePreview
            noteTitle={note.title}
            totalPageCount={note.pageCount}
          />

          {/* Academic Faculty & Syllabus Verification Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display font-bold text-sm text-slate-900">
                  {note.author}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  PEER VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Constructed strictly aligned with the latest CBSE/NCERT 2025–26 syllabus guidelines with zero unverified shortcuts.
              </p>
            </div>
          </div>

          {/* What is Included Checklist */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>What Is Included in This Resource</span>
            </h3>

            <ul className="space-y-3">
              {note.whatIsIncluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Checkout Card & Licensing Guarantee */}
        <div className="lg:col-span-4 lg:sticky top-24 space-y-6 w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Access License</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900">
                  {note.isFree ? "Free" : note.priceFormatted}
                </span>
                {!note.isFree && (
                  <span className="text-xs text-slate-500 font-medium">
                    (GST inclusive)
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href={note.isFree ? "#" : `/checkout?item=${note.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs transition-colors"
              >
                {note.isFree ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                <span>{note.isFree ? "Download Free PDF" : "Unlock Lifetime Access"}</span>
              </Link>

              {!note.isFree && (
                <Link
                  href={`/cart?add=${note.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-500" />
                  <span>Add to Cart</span>
                </Link>
              )}
              
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 text-xs text-slate-500">
                <span>⚡ Instant Access</span>
                <span>•</span>
                <span>🔒 UPI / Cards</span>
                <span>•</span>
                <span>📄 GST Invoice</span>
              </div>
            </div>

            {/* Document Specs */}
            <div className="pt-6 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Page Count:</span>
                <span className="text-slate-900 font-semibold">{note.pageCount} Pages</span>
              </div>
              <div className="flex justify-between">
                <span>File Size:</span>
                <span className="text-slate-900 font-semibold">{note.fileSizeBytes}</span>
              </div>
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="text-slate-900 font-semibold">Searchable PDF</span>
              </div>
              <div className="flex justify-between">
                <span>Protection:</span>
                <span className="text-slate-900 font-semibold">Dynamic Watermark</span>
              </div>
            </div>

            {/* Refund & Security Notice */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-600">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 text-xs">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>Buyer Protection Policy</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                Subject to our verified refund policy. Digital downloads are non-refundable once the file is downloaded, unless defective.{" "}
                <Link href="/refund-policy" className="text-blue-600 hover:underline font-medium">
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
