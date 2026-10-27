import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncUserFromAuth } from "@/server/auth/sync";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const errorParam = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");
  const rawNext = requestUrl.searchParams.get("next") || "/dashboard";

  // Safe redirect path - prevent open redirects
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/dashboard";

  // Determine site base origin (handles reverse proxies & local development)
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const origin = forwardedHost
    ? `${forwardedProto}://${forwardedHost}`
    : requestUrl.origin;

  // Handle provider/OAuth cancellation or failure
  if (errorParam) {
    console.warn(`OAuth callback received error: ${errorParam} - ${errorDescription}`);
    const loginErrorUrl = new URL("/login", origin);
    loginErrorUrl.searchParams.set("error", errorParam);
    if (errorDescription) {
      loginErrorUrl.searchParams.set("error_description", errorDescription);
    }
    return NextResponse.redirect(loginErrorUrl);
  }

  if (code) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error && data?.user) {
        // Synchronize user into PostgreSQL database
        try {
          const fullName =
            data.user.user_metadata?.full_name ||
            data.user.user_metadata?.name ||
            (data.user.email ? data.user.email.split("@")[0] : "Student");

          if (data.user.email) {
            await syncUserFromAuth({
              authUserId: data.user.id,
              email: data.user.email,
              name: fullName,
            });
          }
        } catch (syncErr) {
          console.error("Database user sync notice in OAuth callback:", syncErr);
          // Session is valid in Supabase; user can still enter dashboard
        }

        return NextResponse.redirect(new URL(next, origin));
      } else if (error) {
        console.error("Supabase code exchange error:", error.message);
      }
    } catch (err) {
      console.error("Unexpected auth callback error:", err);
    }
  }

  // If code exchange failed or wasn't provided, redirect to login with error
  const fallbackUrl = new URL("/login", origin);
  fallbackUrl.searchParams.set("error", "auth_failed");
  return NextResponse.redirect(fallbackUrl);
}
