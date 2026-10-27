import React from "react";
import Link from "next/link";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";

export const metadata = {
  title: "Forgot Password | EVOH Academy",
};

export default function ForgotPasswordPage() {
  return (
    <div className="py-20 max-w-md mx-auto px-4 sm:px-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
          <KeyRound className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          Reset Password
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Enter your registered email address to receive secure reset instructions.
        </p>
      </div>

      <form className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs text-slate-700 font-medium">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              required
              placeholder="student@example.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs transition-colors"
        >
          Send Reset Link
        </button>

        <div className="text-center pt-2">
          <Link href="/login" className="text-xs font-semibold text-blue-600 hover:underline flex items-center justify-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
