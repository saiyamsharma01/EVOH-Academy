import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  BookOpen,
  Clock,
  Download,
  GraduationCap,
  Layers,
  Shield,
  Sparkles,
  User,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { syncUserFromAuth } from "@/server/auth/sync";
import SignOutButton from "@/components/auth/SignOutButton";

export const metadata = {
  title: "Student Dashboard | EVOH Academy",
};

export default async function StudentDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login?redirect=/dashboard");
  }

  // Ensure record is synced with Prisma DB and fetch relationships
  let user = await db.user.findUnique({
    where: { authProviderId: authUser.id },
    include: {
      role: true,
      entitlements: {
        include: {
          resource: true,
        },
      },
      orders: true,
      subscriptions: true,
    },
  });

  if (!user && authUser.email) {
    user = await syncUserFromAuth({
      authUserId: authUser.id,
      email: authUser.email,
      name:
        authUser.user_metadata?.name ||
        authUser.user_metadata?.full_name ||
        authUser.email.split("@")[0],
    }) as any;
  }

  const studentName = user?.name || authUser.user_metadata?.name || "Student";
  const classPref = user?.classPreference || 11;
  const purchasesCount = user?.entitlements?.length ?? 0;
  const isMinorPending = user?.status === "PENDING_GUARDIAN_CONSENT";

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Student Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl bg-white border border-border shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
              CLASS {classPref} SCIENCE
            </span>
            {isMinorPending ? (
              <span className="text-xs font-mono text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                PENDING PARENT CONSENT
              </span>
            ) : (
              <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ACCOUNT ACTIVE
              </span>
            )}
            <span className="text-xs font-mono text-ink-muted">
              {authUser.email}
            </span>
          </div>
          <h1 className="text-3xl font-display font-extrabold text-ink-primary tracking-tight">
            Welcome back, {studentName}
          </h1>
          <p className="text-xs text-ink-muted">
            Your personalized learning workspace for Class 11 & 12 Physics, Chemistry & Mathematics.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
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
          <SignOutButton className="bg-surface-muted hover:bg-red-50" />
        </div>
      </div>

      {/* Grid: Study Desk & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Continue Reading & Navigation */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-border shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-ink-primary flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>Continue Where You Left Off</span>
              </h2>
              <span className="text-xs font-mono text-primary font-semibold">
                Class {classPref} Curriculum
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-muted border border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-ink-muted uppercase">
                  Physics • Mechanics & Vectors
                </span>
                <span className="text-xs font-mono text-ink-primary font-bold">
                  Recommended Starter
                </span>
              </div>

              <h3 className="text-lg font-display font-bold text-ink-primary">
                Class {classPref} Physics: Kinematics & 2D Vectors (Handcrafted Master Notes)
              </h3>

              <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                <Link
                  href="/notes"
                  className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Explore Study Notes</span>
                </Link>

                <Link
                  href={`/notes?class=${classPref}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-primary transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>View All Class {classPref} Resources</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={`/notes?class=${classPref}`}
              className="p-6 rounded-2xl bg-white border border-border hover:border-primary/40 shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-base font-display font-bold text-ink-primary group-hover:text-primary transition-colors">
                Browse Class {classPref} Notes
              </h4>
              <p className="text-xs text-ink-muted mt-1">
                Explore verified chapters in Physics, Chemistry and Math.
              </p>
            </Link>

            <Link
              href="/pricing"
              className="p-6 rounded-2xl bg-white border border-border hover:border-primary/40 shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-display font-bold text-ink-primary group-hover:text-primary transition-colors">
                Passes & Bundles
              </h4>
              <p className="text-xs text-ink-muted mt-1">
                Get unlimited access to formula sheets and question banks.
              </p>
            </Link>
          </div>
        </div>

        {/* Right Column: Account & Security Overview */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-border shadow-sm space-y-4">
            <h3 className="text-base font-display font-bold text-ink-primary">
              Account Overview
            </h3>

            <div className="space-y-3 text-xs font-mono text-ink-muted">
              <div className="flex justify-between py-1.5 border-b border-border">
                <span>Enrolled Resources:</span>
                <span className="text-ink-primary font-bold">{purchasesCount}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border">
                <span>Account Tier:</span>
                <span className="text-ink-primary font-bold">
                  {user?.role?.name || "STUDENT"}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border">
                <span>Standard / Class:</span>
                <span className="text-ink-primary font-bold">Class {classPref}</span>
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

          <div className="p-6 rounded-3xl bg-white border border-border shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-600">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase">Data Protected</span>
            </div>
            <p className="text-xs text-ink-muted">
              Your session is securely authenticated via Supabase Auth and synced with your private learning record.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
