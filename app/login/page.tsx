"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Atom, Lock, Mail, Shield, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import GoogleButton from "@/components/auth/GoogleButton";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Account created successfully! Please sign in with your credentials.");
    }
    const err = searchParams.get("error");
    const desc = searchParams.get("error_description");
    if (err) {
      if (err === "access_denied") {
        setError("Google sign-in was cancelled.");
      } else if (desc) {
        setError(desc.replace(/\+/g, " "));
      } else if (err === "auth_failed") {
        setError("Social login could not be completed. Please try again or sign in with your email.");
      } else {
        setError(`Authentication issue: ${err}`);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        if (signInError.message.toLowerCase().includes("invalid login credentials")) {
          throw new Error("Incorrect email address or password. Please verify and try again.");
        }
        throw signInError;
      }

      if (data.user) {
        // Synchronize user record with PostgreSQL database
        await fetch("/api/auth/sync", { credentials: "include", method: "POST" }).catch(() => {});

        // Direct user to student dashboard
        const redirectPath = searchParams.get("redirect") || "/dashboard";
        router.push(redirectPath);
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || "Failed to sign in. Please try again.");
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
          Welcome Back
        </h1>
        <p className="text-xs text-slate-400">
          Log in to access your purchased notes, subscriptions, and download library.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-surface-card/85 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        {/* Success Alert */}
        {success && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-400 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

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
            label="Continue with Google"
            redirectTo="/dashboard"
            onError={setError}
          />

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full"></div>
            <span className="bg-surface-card px-3 text-[11px] font-mono uppercase tracking-wider text-slate-400 shrink-0">
              Or with email
            </span>
            <div className="border-t border-white/10 w-full"></div>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="student@example.com"
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-surface-base/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-slate-300 font-semibold">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
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
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>

          <p className="text-center text-xs text-slate-400 pt-2">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/register"
              className="text-cyan-400 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>

      <div className="text-center text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
        <Shield className="w-3.5 h-3.5 text-emerald-400" />
        <span>Secure authentication with server-verified session tokens</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
