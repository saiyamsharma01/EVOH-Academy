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
  let user: any = null;
  try {
    user = await db.user.findUnique({
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
  } catch (err) {
    console.warn("Database query skipped or offline:", err);
  }

  const studentName = user?.name || authUser.user_metadata?.name || "Student";
  const classPref = user?.classPreference || 11;
  const purchasesCount = user?.entitlements?.length ?? 0;
  const isMinorPending = user?.status === "PENDING_GUARDIAN_CONSENT";

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Student Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              CLASS {classPref} SCIENCE
            </span>
            {isMinorPending ? (
              <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                PENDING PARENT CONSENT
              </span>
            ) : (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ACCOUNT ACTIVE
              </span>
            )}
            <span className="text-xs text-slate-500 font-medium">
              {authUser.email}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            Welcome back, {studentName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Your personalized learning workspace for Class 11 & 12 Physics, Chemistry & Mathematics.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/dashboard/library"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>My Library</span>
          </Link>
          <Link
            href="/dashboard/purchases"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
          >
            <span>Invoices</span>
          </Link>
          <SignOutButton className="bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200" />
        </div>
      </div>

      {/* Grid: Study Desk & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Continue Reading & Navigation */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Continue Where You Left Off</span>
              </h2>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                Class {classPref} Curriculum
              </span>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Physics • Mechanics & Vectors
                </span>
                <span className="text-xs font-semibold text-blue-600">
                  Recommended Starter
                </span>
              </div>

              <h3 className="text-lg font-display font-bold text-slate-900">
                Class {classPref} Physics: Kinematics & 2D Vectors (Handcrafted Master Notes)
              </h3>

              <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                <Link
                  href="/notes"
                  className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Explore Study Notes</span>
                </Link>

                <Link
                  href={`/notes?class=${classPref}`}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 transition-colors font-medium"
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
              className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-base font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Browse Class {classPref} Notes
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Explore verified chapters in Physics, Chemistry and Math.
              </p>
            </Link>

            <Link
              href="/pricing"
              className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Passes & Bundles
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Get unlimited access to formula sheets and question banks.
              </p>
            </Link>
          </div>
        </div>

        {/* Right Column: Account & Security Overview */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-base font-display font-bold text-slate-900">
              Account Overview
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span>Enrolled Resources:</span>
                <span className="text-slate-900 font-semibold">{purchasesCount}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span>Account Tier:</span>
                <span className="text-slate-900 font-semibold">
                  {user?.role?.name || "STUDENT"}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span>Standard / Class:</span>
                <span className="text-slate-900 font-semibold">Class {classPref}</span>
              </div>
            </div>

            <Link
              href="/pricing"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-blue-700 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upgrade to Subject Pass</span>
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold uppercase">Data Protected</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your session is securely authenticated via Supabase Auth and synced with your private learning record.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
