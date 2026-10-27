import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

export const metadata = {
  title: "New Password | EVOH Academy",
};

export default function ResetPasswordPage() {
  return (
    <div className="py-20 max-w-md mx-auto px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
          Set New Password
        </h1>
        <p className="text-xs text-slate-400">
          Choose a secure, strong password with at least 8 characters.
        </p>
      </div>

      <form className="p-8 rounded-2xl bg-surface-card/85 border border-white/10 shadow-2xl space-y-5 backdrop-blur-md">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-slate-300 font-semibold">New Password</label>
          <input
            type="password"
            required
            minLength={8}
            placeholder="At least 8 characters"
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-surface-muted/90 text-white placeholder-slate-500 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
