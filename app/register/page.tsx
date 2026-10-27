"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Atom,
  Calendar,
  GraduationCap,
  Lock,
  Mail,
  Shield,
  User,
  Loader2,
} from "lucide-react";
import GoogleButton from "@/components/auth/GoogleButton";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classPreference, setClassPreference] = useState<11 | 12>(11);
  const [ageBand, setAgeBand] = useState<"adult" | "minor">("adult");
  const [guardianEmail, setGuardianEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
      }

      if (ageBand === "minor" && !guardianEmail) {
        throw new Error("Please provide your guardian's email address for consent.");
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          classPreference,
          ageBand,
          guardianEmail: ageBand === "minor" ? guardianEmail.trim() : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account.");
      }

      // Success: Redirect to login page as requested ("regsier ke bdh login")
      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err?.message || "Something went wrong during registration.");
      setLoading(false);
    }
  };

  return (
    <div className="py-20 max-w-md mx-auto px-4 sm:px-6 space-y-8 relative">
      {/* Background Ambience Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Brand Header */}
      <div className="text-center space-y-3">
        <Link href="/" className="inline-block">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
            <Atom className="w-7 h-7" />
          </div>
        </Link>
        <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
          Create Student Account
        </h1>
        <p className="text-xs text-slate-400">
          Access Class 11 and 12 science notes, formula sheets, and verified derivations.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-surface-card/85 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-xs text-red-400 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Google One-Click OAuth */}
        <div className="space-y-3">
          <GoogleButton
            label="Sign up with Google"
            redirectTo="/dashboard"
            onError={setError}
          />

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full"></div>
            <span className="bg-surface-card px-3 text-[11px] font-mono uppercase tracking-wider text-slate-400 shrink-0">
              Or with credentials
            </span>
            <div className="border-t border-white/10 w-full"></div>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 font-semibold">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-surface-base/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 font-semibold">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@example.com"
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-surface-base/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Academic Class Preference Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Target Standard / Class</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setClassPreference(11)}
                className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium transition-colors ${
                  classPreference === 11
                    ? "border-cyan-400 bg-cyan-500/15 text-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-cyan-500/40 hover:text-white"
                }`}
              >
                Class 11 Science
              </button>
              <button
                type="button"
                onClick={() => setClassPreference(12)}
                className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium transition-colors ${
                  classPreference === 12
                    ? "border-cyan-400 bg-cyan-500/15 text-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-cyan-500/40 hover:text-white"
                }`}
              >
                Class 12 Science
              </button>
            </div>
          </div>

          {/* Age Verification Gate per PRD Section 17 (DPDP Act 2023) */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Age Verification (DPDP Act 2023)</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAgeBand("adult")}
                className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium transition-colors ${
                  ageBand === "adult"
                    ? "border-cyan-400 bg-cyan-500/15 text-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-cyan-500/40 hover:text-white"
                }`}
              >
                18 Years or Older
              </button>
              <button
                type="button"
                onClick={() => setAgeBand("minor")}
                className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium transition-colors ${
                  ageBand === "minor"
                    ? "border-amber-500 bg-amber-500/15 text-amber-400 font-bold shadow-[0_0_12px_rgba(245,158,11,0.15)]"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-amber-500/40 hover:text-white"
                }`}
              >
                Under 18 (Minor)
              </button>
            </div>
          </div>

          {/* Minor Guardian Consent Fields (PRD Sec 17.1) */}
          {ageBand === "minor" && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-3">
              <div className="flex items-start gap-2 text-xs text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Parental Consent Required:</strong> In accordance with India&apos;s DPDP Act, students under 18 require verifiable guardian approval prior to making purchases.
                </span>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-amber-300 font-semibold">
                  Guardian Email Address
                </label>
                <input
                  type="email"
                  required
                  value={guardianEmail}
                  onChange={(e) => setGuardianEmail(e.target.value)}
                  placeholder="parent@example.com"
                  disabled={loading}
                  className="w-full px-3 py-2 rounded-xl border border-amber-500/30 bg-surface-base text-white text-xs outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 font-semibold">
              Create Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-surface-base/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>
                {ageBand === "minor"
                  ? "Register & Request Consent"
                  : "Create Account"}
              </span>
            )}
          </button>

          <p className="text-center text-xs text-slate-400 pt-2">
            Already registered?{" "}
            <Link href="/login" className="text-cyan-400 font-semibold hover:underline">
              Log in here
            </Link>
          </p>
        </form>
      </div>

      <div className="text-center text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
        <Shield className="w-3.5 h-3.5 text-emerald-400" />
        <span>Compliant with DPDP Act 2023 & Indian IT Act privacy standards</span>
      </div>
    </div>
  );
}
