import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncUserFromAuth } from "@/server/auth/sync";

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fullName =
      user.user_metadata?.name ||
      user.user_metadata?.full_name ||
      user.email?.split("@")[0] ||
      "Student";

    const classPreference = user.user_metadata?.classPreference
      ? Number(user.user_metadata.classPreference)
      : 11;

    const dbUser = await syncUserFromAuth({
      authUserId: user.id,
      email: user.email!,
      name: fullName,
      classPreference,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role.name,
        classPreference: dbUser.classPreference,
        status: dbUser.status,
      },
    });
  } catch (error: any) {
    console.error("User sync error:", error);
    return NextResponse.json(
      { error: "Failed to synchronize user record" },
      { status: 500 }
    );
  }
}
