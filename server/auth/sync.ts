import { db } from "@/lib/db";
import { GuardianStatus, UserStatus } from "@prisma/client";

interface SyncUserData {
  authUserId: string;
  email: string;
  name?: string;
  classPreference?: number;
  isMinor?: boolean;
  guardianEmail?: string;
}

/**
 * Ensures a Supabase Auth user has a synced record in the Prisma PostgreSQL database.
 * Auto-creates student role and profile if not already present.
 */
export async function syncUserFromAuth(data: SyncUserData) {
  const normalizedEmail = data.email.toLowerCase().trim();

  // 1. Ensure STUDENT role exists
  let studentRole = await db.role.findUnique({
    where: { name: "STUDENT" },
  });

  if (!studentRole) {
    studentRole = await db.role.create({
      data: {
        name: "STUDENT",
        description: "Standard enrolled learner account",
      },
    });
  }

  // 2. Check if user exists by authProviderId or by email
  const existingUser = await db.user.findFirst({
    where: {
      OR: [
        { authProviderId: data.authUserId },
        { email: normalizedEmail },
      ],
    },
    include: {
      role: true,
      guardian: true,
    },
  });

  if (existingUser) {
    // If authProviderId was not matching (e.g. initial seed or social login match), update it
    if (existingUser.authProviderId !== data.authUserId) {
      return await db.user.update({
        where: { id: existingUser.id },
        data: {
          authProviderId: data.authUserId,
          name: data.name || existingUser.name,
        },
        include: {
          role: true,
          guardian: true,
        },
      });
    }
    return existingUser;
  }

  // 3. Create fresh student user in database
  const status: UserStatus = data.isMinor
    ? UserStatus.PENDING_GUARDIAN_CONSENT
    : UserStatus.ACTIVE;

  const guardianStatus: GuardianStatus = data.isMinor
    ? GuardianStatus.PENDING
    : GuardianStatus.NOT_APPLICABLE;

  const newUser = await db.user.create({
    data: {
      authProviderId: data.authUserId,
      email: normalizedEmail,
      name: data.name || normalizedEmail.split("@")[0] || "Student",
      roleId: studentRole.id,
      classPreference: data.classPreference || 11,
      status,
      guardianStatus,
    },
    include: {
      role: true,
      guardian: true,
    },
  });

  // 4. Create Guardian record if minor with guardian email
  if (data.isMinor && data.guardianEmail) {
    await db.guardian.create({
      data: {
        studentId: newUser.id,
        guardianName: `Guardian of ${newUser.name}`,
        guardianEmail: data.guardianEmail.toLowerCase().trim(),
        status: GuardianStatus.PENDING,
      },
    });
  }

  return newUser;
}
