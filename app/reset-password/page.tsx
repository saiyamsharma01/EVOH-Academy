import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

export const metadata = {
  title: "New Password | EVOH Academy",
};

export default function ResetPasswordPage() {
  return (
    <div className="py-20 max-w-md mx-auto px-4 sm:px-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          Set New Password
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Choose a secure, strong password with at least 8 characters.
        </p>
      </div>

      <form className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs text-slate-700 font-medium">New Password</label>
          <input
            type="password"
            required
            minLength={8}
            placeholder="At least 8 characters"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs transition-colors"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
