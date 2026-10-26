import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncUserFromAuth } from "@/server/auth/sync";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/dashboard";

  if (code) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error && data?.user) {
        // Sync user into Prisma PostgreSQL database
        const fullName =
          data.user.user_metadata?.full_name ||
          data.user.user_metadata?.name ||
          data.user.email?.split("@")[0] ||
          "Student";

        await syncUserFromAuth({
          authUserId: data.user.id,
          email: data.user.email!,
          name: fullName,
        });

        return NextResponse.redirect(new URL(next, request.url));
      }
    } catch (err) {
      console.error("Auth callback error:", err);
    }
  }

  // If code exchange failed or wasn't provided, redirect to login with error
  return NextResponse.redirect(new URL("/login?error=auth_failed", request.url));
}
