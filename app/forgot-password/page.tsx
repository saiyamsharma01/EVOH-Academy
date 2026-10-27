import React from "react";
import Link from "next/link";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";

export const metadata = {
  title: "Forgot Password | EVOH Academy",
};

export default function ForgotPasswordPage() {
  return (
    <div className="py-20 max-w-md mx-auto px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-950/50">
          <KeyRound className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
          Reset Password
        </h1>
        <p className="text-xs text-slate-400">
          Enter your registered email address to receive secure reset instructions.
        </p>
      </div>

      <form className="p-8 rounded-2xl bg-surface-card/85 border border-white/10 shadow-2xl space-y-5 backdrop-blur-md">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-slate-300 font-semibold">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="email"
              required
              placeholder="student@example.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-surface-muted/90 text-white placeholder-slate-500 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5"
        >
          Send Reset Link
        </button>

        <div className="text-center pt-2">
          <Link href="/login" className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
