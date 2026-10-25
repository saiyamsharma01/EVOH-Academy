"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, Atom, Calendar, Lock, Mail, Shield, User } from "lucide-react";

export default function RegisterPage() {
  const [ageBand, setAgeBand] = useState<"adult" | "minor">("adult");
  const [guardianEmail, setGuardianEmail] = useState("");

  return (
    <div className="py-20 max-w-md mx-auto px-4 sm:px-6 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white mx-auto shadow-md shadow-primary/20">
          <Atom className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-display font-extrabold text-ink-primary tracking-tight">
          Create Student Account
        </h1>
        <p className="text-xs text-ink-muted">
          Access Class 11 and 12 science notes, formula sheets, and verified derivations.
        </p>
      </div>

      <form className="p-8 rounded-2xl bg-white border border-border shadow-xl space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-ink-primary font-semibold">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-ink-muted absolute left-3.5 top-3" />
            <input
              type="text"
              required
              placeholder="e.g. Aarav Sharma"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-ink-primary font-semibold">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-ink-muted absolute left-3.5 top-3" />
            <input
              type="email"
              required
              placeholder="aarav@example.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none transition-colors"
            />
          </div>
        </div>

        {/* Age Verification Gate per PRD Section 17 (DPDP Act 2023) */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-mono text-ink-primary font-semibold flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>Age Verification (DPDP Act 2023)</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
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
                className="w-full px-3 py-2 rounded-lg border border-amber-300 bg-white text-xs outline-none"
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-ink-primary font-semibold">Create Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-ink-muted absolute left-3.5 top-3" />
            <input
              type="password"
              required
              minLength={8}
              placeholder="At least 8 characters"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
        >
          {ageBand === "minor" ? "Register & Send Consent Notice" : "Create Account"}
        </button>

        <p className="text-center text-xs text-ink-muted pt-2">
          Already registered?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Log in here
          </Link>
        </p>
      </form>

    </div>
  );
}
