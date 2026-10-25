export type RoleName =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "EDITOR"
  | "SUPPORT"
  | "STUDENT"
  | "GUARDIAN";

export type PermissionCode =
  // Danger Zone & Admin Roles
  | "roles.manage"
  | "tax.manage"
  | "payment_keys.manage"
  | "danger_zone.access"
  // Content & Curriculum
  | "curriculum.manage"
  | "resources.create"
  | "resources.edit"
  | "resources.publish"
  | "pricing.publish"
  | "blog.manage"
  | "faq.manage"
  | "pages.manage"
  // Commerce & Support
  | "orders.view"
  | "revenue.view"
  | "refund.approve"
  | "coupons.manage"
  | "enquiries.manage"
  | "support.reply"
  | "students.view"
  | "students.manage"
  | "audit.view"
  // Student Portal
  | "library.access"
  | "purchases.view"
  | "downloads.perform"
  | "guardian.view_child";

export interface AuthUser {
  id: string;
  role: RoleName;
  status: "ACTIVE" | "PENDING_GUARDIAN_CONSENT" | "SUSPENDED" | "ARCHIVED";
  email: string;
}

// Built-in Permission Matrix fallback / evaluation map
export const ROLE_PERMISSIONS: Record<RoleName, PermissionCode[]> = {
  SUPER_ADMIN: [
    "roles.manage",
    "tax.manage",
    "payment_keys.manage",
    "danger_zone.access",
    "curriculum.manage",
    "resources.create",
    "resources.edit",
    "resources.publish",
    "pricing.publish",
    "blog.manage",
    "faq.manage",
    "pages.manage",
    "orders.view",
    "revenue.view",
    "refund.approve",
    "coupons.manage",
    "enquiries.manage",
    "support.reply",
    "students.view",
    "students.manage",
    "audit.view",
    "library.access",
    "purchases.view",
    "downloads.perform",
  ],
  ADMIN: [
    "curriculum.manage",
    "resources.create",
    "resources.edit",
    "resources.publish",
    "pricing.publish",
    "blog.manage",
    "faq.manage",
    "pages.manage",
    "orders.view",
    "revenue.view",
    "coupons.manage",
    "enquiries.manage",
    "support.reply",
    "students.view",
    "students.manage",
    "audit.view",
    "library.access",
    "purchases.view",
    "downloads.perform",
  ],
  EDITOR: [
    "curriculum.manage",
    "resources.create",
    "resources.edit",
    "blog.manage",
    "faq.manage",
    "pages.manage",
    "library.access",
  ],
  SUPPORT: [
    "orders.view",
    "enquiries.manage",
    "support.reply",
    "students.view",
    "library.access",
  ],
  STUDENT: [
    "library.access",
    "purchases.view",
    "downloads.perform",
  ],
  GUARDIAN: [
    "guardian.view_child",
    "purchases.view",
  ],
};

/**
 * Pure, centralized authorization function per PRD Section 3.2.
 * Checked by all route handlers, server actions, and domain operations.
 */
export function can(
  user: AuthUser | null | undefined,
  permission: PermissionCode,
  context?: { targetUserId?: string; resourceIsActive?: boolean }
): boolean {
  if (!user) return false;

  // Suspended or archived accounts lose access
  if (user.status === "SUSPENDED" || user.status === "ARCHIVED") {
    return false;
  }

  // Minors pending guardian consent cannot perform purchases or sensitive downloads
  if (
    user.status === "PENDING_GUARDIAN_CONSENT" &&
    (permission === "downloads.perform" || permission === "purchases.view")
  ) {
    return false;
  }

  // Context-specific ownership checks (IDOR prevention)
  if (context?.targetUserId && context.targetUserId !== user.id) {
    // If accessing another student's data, only staff with student view permissions can proceed
    const isStaff =
      user.role === "SUPER_ADMIN" ||
      user.role === "ADMIN" ||
      user.role === "SUPPORT";
    if (!isStaff) return false;
  }

  const userPermissions = ROLE_PERMISSIONS[user.role] || [];
  return userPermissions.includes(permission);
}
