import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Layers,
  Shield,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Student Dashboard | EVOH Academy",
};

export default function StudentDashboardPage() {
  const student = {
    name: "Aarav Sharma",
    classPreference: 11,
    status: "ACTIVE",
    purchasesCount: 2,
    activeSubscription: null,
  };

  const continueReading = {
    title: "Class 11 Physics: Kinematics & 2D Vectors",
    lastPage: 18,
    totalPages: 42,
    slug: "class-11-physics-kinematics-and-vectors",
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Student Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl bg-white border border-border shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
              CLASS {student.classPreference} STUDENT
            </span>
            <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ACCOUNT ACTIVE
            </span>
          </div>
          <h1 className="text-3xl font-display font-extrabold text-ink-primary tracking-tight">
            Welcome, {student.name}
          </h1>
          <p className="text-xs text-ink-muted">
            Your personalized learning workspace for Class 11 Physics, Chemistry & Mathematics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/library"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>My Library</span>
          </Link>
          <Link
            href="/dashboard/purchases"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-muted hover:bg-surface-base border border-border text-xs font-semibold text-ink-primary transition-colors"
          >
            <span>Invoices</span>
          </Link>
        </div>
      </div>

      {/* Grid: Continue Reading & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Continue Where You Left Off */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-border shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-ink-primary flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>Continue Where You Left Off</span>
              </h2>
              <span className="text-xs font-mono text-primary font-semibold">
                Page {continueReading.lastPage} of {continueReading.totalPages}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-muted border border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-ink-muted uppercase">Physics • Concept Notes</span>
                <span className="text-xs font-mono text-ink-primary font-bold">
                  {Math.round((continueReading.lastPage / continueReading.totalPages) * 100)}% Completed
                </span>
              </div>

              <h3 className="text-lg font-display font-bold text-ink-primary">
                {continueReading.title}
              </h3>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${(continueReading.lastPage / continueReading.totalPages) * 100}%`,
                  }}
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href={`/dashboard/reader/res-1`}
                  className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Resume Reading</span>
                </Link>

                <Link
                  href={`/api/downloads/res-1`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-primary transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Watermarked PDF</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/notes?class=11"
              className="p-6 rounded-2xl bg-white border border-border hover:border-primary/40 shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-base font-display font-bold text-ink-primary group-hover:text-primary transition-colors">
                Browse Class 11 Notes
              </h4>
              <p className="text-xs text-ink-muted mt-1">
                Explore chapters in Physics, Chemistry and Math.
              </p>
            </Link>

            <Link
              href="/dashboard/privacy"
              className="p-6 rounded-2xl bg-white border border-border hover:border-primary/40 shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-base font-display font-bold text-ink-primary group-hover:text-primary transition-colors">
                Privacy & Data Rights
              </h4>
              <p className="text-xs text-ink-muted mt-1">
                Export personal records or manage guardian consent.
              </p>
            </Link>
          </div>
        </div>

        {/* Right: Library Overview & Device Security */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-border shadow-sm space-y-4">
            <h3 className="text-base font-display font-bold text-ink-primary">
              Account Overview
            </h3>

            <div className="space-y-3 text-xs font-mono text-ink-muted">
              <div className="flex justify-between py-1.5 border-b border-border">
                <span>Owned Resources:</span>
                <span className="text-ink-primary font-bold">{student.purchasesCount}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border">
                <span>Active Plan:</span>
                <span className="text-ink-primary font-bold">Standard Student</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border">
                <span>Active Devices:</span>
                <span className="text-ink-primary font-bold">1 / 3 Allowed</span>
              </div>
            </div>

            <Link
              href="/pricing"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-muted hover:bg-surface-base border border-border text-xs font-semibold text-primary transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upgrade to Subject Pass</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
