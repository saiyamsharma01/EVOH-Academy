import { describe, it, expect } from "vitest";
import { can, AuthUser } from "../server/auth/permissions";

describe("Granular RBAC Authorization (can)", () => {
  const superAdmin: AuthUser = {
    id: "user-super",
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    email: "super@evoh.test",
  };

  const admin: AuthUser = {
    id: "user-admin",
    role: "ADMIN",
    status: "ACTIVE",
    email: "admin@evoh.test",
  };

  const editor: AuthUser = {
    id: "user-editor",
    role: "EDITOR",
    status: "ACTIVE",
    email: "editor@evoh.test",
  };

  const support: AuthUser = {
    id: "user-support",
    role: "SUPPORT",
    status: "ACTIVE",
    email: "support@evoh.test",
  };

  const student: AuthUser = {
    id: "user-student",
    role: "STUDENT",
    status: "ACTIVE",
    email: "student@evoh.test",
  };

  it("SUPER_ADMIN has all privileged and danger zone permissions", () => {
    expect(can(superAdmin, "roles.manage")).toBe(true);
    expect(can(superAdmin, "tax.manage")).toBe(true);
    expect(can(superAdmin, "danger_zone.access")).toBe(true);
    expect(can(superAdmin, "refund.approve")).toBe(true);
  });

  it("ADMIN cannot manage roles, tax or access danger zone", () => {
    expect(can(admin, "roles.manage")).toBe(false);
    expect(can(admin, "tax.manage")).toBe(false);
    expect(can(admin, "danger_zone.access")).toBe(false);
    // But can manage content and view orders
    expect(can(admin, "curriculum.manage")).toBe(true);
    expect(can(admin, "orders.view")).toBe(true);
  });

  it("EDITOR cannot publish paid pricing, approve refunds or see revenue", () => {
    expect(can(editor, "pricing.publish")).toBe(false);
    expect(can(editor, "refund.approve")).toBe(false);
    expect(can(editor, "revenue.view")).toBe(false);
    // Can edit content and blog
    expect(can(editor, "resources.edit")).toBe(true);
    expect(can(editor, "blog.manage")).toBe(true);
  });

  it("STUDENT cannot access admin features and gets 403 equivalents", () => {
    expect(can(student, "curriculum.manage")).toBe(false);
    expect(can(student, "orders.view")).toBe(false);
    expect(can(student, "resources.create")).toBe(false);
    // Can access student dashboard tools
    expect(can(student, "library.access")).toBe(true);
    expect(can(student, "purchases.view")).toBe(true);
  });

  it("Suspended users lose all access", () => {
    const suspendedStudent: AuthUser = {
      ...student,
      status: "SUSPENDED",
    };
    expect(can(suspendedStudent, "library.access")).toBe(false);
    expect(can(suspendedStudent, "downloads.perform")).toBe(false);
  });

  it("Minors pending guardian consent cannot perform downloads or purchases", () => {
    const minorPending: AuthUser = {
      ...student,
      status: "PENDING_GUARDIAN_CONSENT",
    };
    expect(can(minorPending, "downloads.perform")).toBe(false);
    expect(can(minorPending, "purchases.view")).toBe(false);
  });
});
