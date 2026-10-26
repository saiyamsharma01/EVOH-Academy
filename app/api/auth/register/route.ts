import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { syncUserFromAuth } from "@/server/auth/sync";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  classPreference: z.coerce.number().int().min(11).max(12).default(11),
  ageBand: z.enum(["adult", "minor"]).default("adult"),
  guardianEmail: z.string().email("Invalid guardian email").optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, password, classPreference, ageBand, guardianEmail } =
      validation.data;
    const isMinor = ageBand === "minor";

    if (isMinor && !guardianEmail) {
      return NextResponse.json(
        { error: "Guardian email is required for students under 18" },
        { status: 400 }
      );
    }

    let authUserId: string | null = null;

    // 1. Try creating user via Admin Client first for instant confirmation
    try {
      const adminClient = createAdminClient();
      const { data: adminUser, error: adminError } =
        await adminClient.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: {
            name,
            classPreference,
          },
        });

      if (adminError) {
        if (
          adminError.message?.toLowerCase().includes("already registered") ||
          adminError.message?.toLowerCase().includes("already exists")
        ) {
          return NextResponse.json(
            { error: "An account with this email already exists. Please sign in." },
            { status: 409 }
          );
        }
        throw adminError;
      }

      authUserId = adminUser?.user?.id ?? null;
    } catch (adminErr: any) {
      // 2. Fallback to standard Supabase sign-up
      const supabase = await createClient();
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              classPreference,
            },
          },
        });

      if (signUpError) {
        return NextResponse.json(
          { error: signUpError.message },
          { status: 400 }
        );
      }

      authUserId = signUpData?.user?.id ?? null;
    }

    if (!authUserId) {
      return NextResponse.json(
        { error: "Failed to create user account. Please check your credentials." },
        { status: 500 }
      );
    }

    // 3. Sync into Prisma PostgreSQL Database
    const dbUser = await syncUserFromAuth({
      authUserId,
      email,
      name,
      classPreference,
      isMinor,
      guardianEmail: isMinor ? guardianEmail : undefined,
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully! Please sign in.",
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    
    // Provide clean, human-readable error instead of raw stack traces
    const msg = error?.message || "";
    if (msg.includes("prisma") || msg.includes("database") || msg.includes("Environment variable")) {
      return NextResponse.json(
        { error: "Database connection issue. Please restart your dev server and try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: msg || "An unexpected error occurred during registration" },
      { status: 500 }
    );
  }
}
