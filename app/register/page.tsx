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
    <div className="py-20 max-w-md mx-auto px-4 sm:px-6 space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <Link href="/" className="inline-block">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent-blue flex items-center justify-center text-white mx-auto shadow-md shadow-primary/25 hover:scale-105 transition-transform">
            <Atom className="w-7 h-7" />
          </div>
        </Link>
        <h1 className="text-3xl font-display font-extrabold text-ink-primary tracking-tight">
          Create Student Account
        </h1>
        <p className="text-xs text-ink-muted">
          Access Class 11 and 12 science notes, formula sheets, and verified derivations.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-white border border-border shadow-xl space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
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
            <div className="border-t border-border w-full"></div>
            <span className="bg-white px-3 text-[11px] font-mono uppercase tracking-wider text-ink-muted shrink-0">
              Or with credentials
            </span>
            <div className="border-t border-border w-full"></div>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-ink-primary font-semibold">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-ink-muted absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none transition-colors disabled:bg-surface-muted"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-ink-primary font-semibold">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ink-muted absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@example.com"
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none transition-colors disabled:bg-surface-muted"
              />
            </div>
          </div>

          {/* Academic Class Preference Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-ink-primary font-semibold flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-primary" />
              <span>Target Standard / Class</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setClassPreference(11)}
                className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium transition-colors ${
                  classPreference === 11
                    ? "border-primary bg-primary/10 text-primary font-bold"
                    : "border-border text-ink-muted hover:border-primary/40"
                }`}
              >
                Class 11 Science
              </button>
              <button
                type="button"
                onClick={() => setClassPreference(12)}
                className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium transition-colors ${
                  classPreference === 12
                    ? "border-primary bg-primary/10 text-primary font-bold"
                    : "border-border text-ink-muted hover:border-primary/40"
                }`}
              >
                Class 12 Science
              </button>
            </div>
          </div>

          {/* Age Verification Gate per PRD Section 17 (DPDP Act 2023) */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-mono text-ink-primary font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>Age Verification (DPDP Act 2023)</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAgeBand("adult")}
                className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium transition-colors ${
                  ageBand === "adult"
                    ? "border-primary bg-primary/10 text-primary font-bold"
                    : "border-border text-ink-muted hover:border-primary/40"
                }`}
              >
                18 Years or Older
              </button>
              <button
                type="button"
                onClick={() => setAgeBand("minor")}
                className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium transition-colors ${
                  ageBand === "minor"
                    ? "border-amber-600 bg-amber-50 text-amber-700 font-bold"
                    : "border-border text-ink-muted hover:border-amber-500/40"
                }`}
              >
                Under 18 (Minor)
              </button>
            </div>
          </div>

          {/* Minor Guardian Consent Fields (PRD Sec 17.1) */}
          {ageBand === "minor" && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-3">
              <div className="flex items-start gap-2 text-xs text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Parental Consent Required:</strong> In accordance with India&apos;s DPDP Act, students under 18 require verifiable guardian approval prior to making purchases.
                </span>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-amber-900 font-semibold">
                  Guardian Email Address
                </label>
                <input
                  type="email"
                  required
                  value={guardianEmail}
                  onChange={(e) => setGuardianEmail(e.target.value)}
                  placeholder="parent@example.com"
                  disabled={loading}
                  className="w-full px-3 py-2 rounded-lg border border-amber-300 bg-white text-xs outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-ink-primary font-semibold">
              Create Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-ink-muted absolute left-3.5 top-3" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none transition-colors disabled:bg-surface-muted"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
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

          <p className="text-center text-xs text-ink-muted pt-2">
            Already registered?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Log in here
            </Link>
          </p>
        </form>
      </div>

      <div className="text-center text-[11px] font-mono text-ink-muted flex items-center justify-center gap-1.5">
        <Shield className="w-3.5 h-3.5 text-emerald-600" />
        <span>Compliant with DPDP Act 2023 & Indian IT Act privacy standards</span>
      </div>
    </div>
  );
}
