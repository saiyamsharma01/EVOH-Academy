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
        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <KeyRound className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-display font-extrabold text-ink-primary tracking-tight">
          Reset Password
        </h1>
        <p className="text-xs text-ink-muted">
          Enter your registered email address to receive secure reset instructions.
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow transition-colors"
        >
          Send Reset Link
        </button>

        <div className="text-center pt-2">
          <Link href="/login" className="text-xs font-mono text-primary hover:underline flex items-center justify-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
