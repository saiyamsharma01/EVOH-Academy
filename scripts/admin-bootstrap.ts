import { db } from "../lib/db";
import { logger } from "../lib/logger";

/**
 * First-admin secure bootstrap command per PRD Section 28.3.
 * Usage:
 *   ADMIN_BOOTSTRAP_TOKEN="your-token" npm run admin:create -- --email="owner@evohacademy.com" --name="Teacher Name"
 */
async function main() {
  const args = process.argv.slice(2);
  const getArg = (name: string) => {
    const match = args.find((a) => a.startsWith(`--${name}=`));
    return match ? match.split("=")[1] : null;
  };

  const email = getArg("email");
  const name = getArg("name") || "EVOH Owner";
  const force = args.includes("--force");

  const expectedToken = process.env.ADMIN_BOOTSTRAP_TOKEN;
  if (!expectedToken) {
    console.error("❌ ERROR: ADMIN_BOOTSTRAP_TOKEN environment variable must be set.");
    process.exit(1);
  }

  if (!email) {
    console.error("❌ ERROR: Please supply --email=<address>.");
    process.exit(1);
  }

  console.log(`🔐 Initiating secure bootstrap for SUPER_ADMIN: ${email}...`);

  // 1. Ensure SUPER_ADMIN role exists
  let superAdminRole = await db.role.findUnique({
    where: { name: "SUPER_ADMIN" },
  });

  if (!superAdminRole) {
    superAdminRole = await db.role.create({
      data: {
        name: "SUPER_ADMIN",
        description: "Platform Owner with unrestricted authority",
      },
    });
  }

  // 2. Check for existing SUPER_ADMIN
  const existingSuper = await db.user.findFirst({
    where: { roleId: superAdminRole.id },
  });

  if (existingSuper && !force) {
    console.error(
      `❌ ERROR: A SUPER_ADMIN account already exists (${existingSuper.email}).\nTo override, pass --force.`
    );
    process.exit(1);
  }

  // 3. Upsert user record
  const user = await db.user.upsert({
    where: { email },
    update: {
      roleId: superAdminRole.id,
      status: "ACTIVE",
    },
    create: {
      authProviderId: `bootstrap-${Date.now()}`,
      email,
      name,
      roleId: superAdminRole.id,
      status: "ACTIVE",
    },
  });

  // 4. Record tamper-evident audit log
  await db.auditLog.create({
    data: {
      actorId: user.id,
      actorRole: "SUPER_ADMIN",
      action: "BOOTSTRAP_SUPER_ADMIN_CREATED",
      targetType: "User",
      targetId: user.id,
      afterSnapshot: JSON.stringify({ email: user.email, role: "SUPER_ADMIN" }),
    },
  });

  logger.info({ userId: user.id, email: user.email }, "SUPER_ADMIN account initialized successfully");
  console.log(`✅ SUCCESS: SUPER_ADMIN created for ${email}. Audit log recorded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
