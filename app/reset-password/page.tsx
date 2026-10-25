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
        <h1 className="text-3xl font-display font-extrabold text-ink-primary tracking-tight">
          Set New Password
        </h1>
        <p className="text-xs text-ink-muted">
          Choose a secure, strong password with at least 8 characters.
        </p>
      </div>

      <form className="p-8 rounded-2xl bg-white border border-border shadow-xl space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-ink-primary font-semibold">New Password</label>
          <input
            type="password"
            required
            minLength={8}
            placeholder="At least 8 characters"
            className="w-full px-4 py-2.5 rounded-xl border border-border text-sm outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow transition-colors"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
