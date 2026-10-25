import React from "react";
import Link from "next/link";
import { Atom, Lock, Mail, Shield } from "lucide-react";

export const metadata = {
  title: "Student Login | EVOH Academy",
};

export default function LoginPage() {
  return (
    <div className="py-20 max-w-md mx-auto px-4 sm:px-6 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white mx-auto shadow-md shadow-primary/20">
          <Atom className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-display font-extrabold text-ink-primary tracking-tight">
          Welcome Back
        </h1>
        <p className="text-xs text-ink-muted">
          Log in to access your purchased notes, subscriptions, and download library.
        </p>
      </div>

      <form className="p-8 rounded-2xl bg-white border border-border shadow-xl space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-ink-primary font-semibold">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-ink-muted absolute left-3.5 top-3" />
            <input
              type="email"
              required
              placeholder="student@example.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-ink-primary font-semibold">Password</label>
            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-ink-muted absolute left-3.5 top-3" />
            <input
              type="password"
              required
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
        >
          Sign In
        </button>

        <p className="text-center text-xs text-ink-muted pt-2">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </form>

      <div className="text-center text-[11px] font-mono text-ink-muted flex items-center justify-center gap-1.5">
        <Shield className="w-3.5 h-3.5 text-emerald-600" />
        <span>Secure authentication with server-verified session tokens</span>
      </div>

    </div>
  );
}
