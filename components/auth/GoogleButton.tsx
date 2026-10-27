"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AlertCircle, Check, Copy, ExternalLink, Loader2, X } from "lucide-react";

interface GoogleButtonProps {
  label?: string;
  redirectTo?: string;
  onError?: (msg: string) => void;
}

export default function GoogleButton({
  label = "Continue with Google",
  redirectTo = "/dashboard",
  onError,
}: GoogleButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jnoiozqhtclgzowxncaa.supabase.co";
  const redirectUri = `${supabaseUrl}/auth/v1/callback`;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const redirectUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
        redirectTo
      )}`;

      // 1. Verify if Google provider is enabled in Supabase to prevent raw JSON error screen
      try {
        const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
        const settingsRes = await fetch(`${supabaseUrl}/auth/v1/settings`, {
          headers: { apikey: anonKey },
        });
        if (settingsRes.ok) {
          const settings = await settingsRes.json();
          if (settings?.external?.google === false) {
            setShowConfigModal(true);
            setLoading(false);
            return;
          }
        }
      } catch (settingsErr) {
        console.warn("Supabase settings pre-check skipped:", settingsErr);
      }

      // 2. Initiate Google OAuth redirect
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        const errorLower = error.message?.toLowerCase() || "";
        if (
          errorLower.includes("provider is not enabled") ||
          errorLower.includes("unsupported provider") ||
          errorLower.includes("validation_failed")
        ) {
          setShowConfigModal(true);
        } else {
          onError?.(error.message);
        }
        setLoading(false);
      }
    } catch (err: any) {
      onError?.(err?.message || "Failed to initiate Google sign-in");
      setLoading(false);
    }
  };

  const copyCallbackUrl = () => {
    navigator.clipboard.writeText(redirectUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/10 bg-surface-base/80 hover:bg-surface-card-hover text-white text-sm font-semibold shadow-md shadow-black/40 hover:border-cyan-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
        ) : (
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        )}
        <span>{loading ? "Connecting to Google..." : label}</span>
      </button>

      {/* Supabase Google Provider Setup Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md bg-surface-card rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/15 space-y-5 text-white">
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-display font-bold text-white">
                  Google Sign-In Setup
                </h3>
                <p className="text-xs text-slate-400">
                  Supabase requires Google OAuth to be enabled
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Google OAuth code is 100% ready in the website, but Google Provider is not toggled on yet in your Supabase project.
            </p>

            <div className="space-y-3 p-4 rounded-2xl bg-surface-base/80 border border-white/10 text-xs">
              <span className="font-semibold text-white block font-mono">
                1. Supabase Redirect URI (paste into Google Cloud):
              </span>
              <div className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-xl border border-white/10">
                <span className="font-mono text-[11px] truncate select-all flex-1 text-slate-300">
                  {redirectUri}
                </span>
                <button
                  type="button"
                  onClick={copyCallbackUrl}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/15 text-cyan-400 text-[11px] font-bold flex items-center gap-1 hover:bg-cyan-500/25 shrink-0 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <span className="font-semibold text-white block font-mono pt-1">
                2. Setup Links:
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-white/10 bg-white/5 text-white font-semibold text-xs hover:bg-white/10 transition-colors flex-1"
                >
                  <span>Google Console</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://supabase.com/dashboard/project/jnoiozqhtclgzowxncaa/auth/providers"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-primary text-white font-semibold text-xs hover:bg-primary-hover transition-colors flex-1 shadow-md shadow-primary/25"
                >
                  <span>Supabase Providers</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
                In Supabase Providers: click <strong>Google</strong> &gt; toggle <strong>Enable Google provider</strong> &gt; paste your <strong>Client ID</strong> &amp; <strong>Client Secret</strong> &gt; <strong>Save</strong>.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold hover:bg-white/10 text-white transition-colors"
              >
                Got it, I&apos;ll use Email &amp; Password for now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
