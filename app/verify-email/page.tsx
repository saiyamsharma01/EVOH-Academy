import React from "react";
import Link from "next/link";
import { CheckCircle2, Mail } from "lucide-react";

export const metadata = {
  title: "Verify Email | EVOH Academy",
};

export default function VerifyEmailPage() {
  return (
    <div className="py-20 max-w-md mx-auto px-4 sm:px-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
        <Mail className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-extrabold text-ink-primary">
          Check Your Email
        </h1>
        <p className="text-xs text-ink-muted leading-relaxed">
          We&apos;ve sent a verification link to your registered address. Please click the link in the message to activate full account access.
        </p>
      </div>
      <Link
        href="/login"
        className="inline-block py-2.5 px-6 rounded-xl bg-primary text-white text-xs font-semibold shadow"
      >
        Return to Login
      </Link>
    </div>
  );
}
