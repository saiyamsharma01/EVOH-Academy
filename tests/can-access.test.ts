import { describe, it, expect } from "vitest";
import {
  canAccessResource,
  ResourceContext,
  UserAccessContext,
} from "../server/entitlements/can-access";

describe("Entitlements Engine (canAccessResource)", () => {
  const now = new Date("2026-10-25T12:00:00Z");

  const freeResource: ResourceContext = {
    id: "res-free-1",
    slug: "class-11-physics-kinematics-free-notes",
    classLevel: 11,
    subjectSlug: "physics",
    chapterSlug: "kinematics",
    typeSlug: "concept-notes",
    isFree: true,
    status: "PUBLISHED",
  };

  const paidResource: ResourceContext = {
    id: "res-paid-1",
    slug: "class-12-chemistry-electrochemistry-premium",
    classLevel: 12,
    subjectSlug: "chemistry",
    chapterSlug: "electrochemistry",
    typeSlug: "chapter-notes",
    isFree: false,
    status: "PUBLISHED",
  };

  const draftResource: ResourceContext = {
    ...paidResource,
    id: "res-draft-1",
    status: "DRAFT",
  };

  it("Draft or unpublished resources are denied to all users", () => {
    const res = canAccessResource(null, draftResource, now);
    expect(res.allowed).toBe(false);
    expect(res.reason).toContain("not published");
  });

  it("Free published resources are accessible even without user login", () => {
    const res = canAccessResource(null, freeResource, now);
    expect(res.allowed).toBe(true);
    expect(res.source).toBe("FREE");
    expect(res.downloadAllowed).toBe(true);
  });

  it("Paid resources are denied to anonymous guests", () => {
    const res = canAccessResource(null, paidResource, now);
    expect(res.allowed).toBe(false);
    expect(res.reason).toContain("log in");
  });

  it("Allows access via direct purchase entitlement", () => {
    const userWithPurchase: UserAccessContext = {
      id: "usr-1",
      status: "ACTIVE",
      entitlements: [
        {
          id: "ent-1",
          resourceId: "res-paid-1",
          sourceType: "PURCHASE",
          startsAt: new Date("2026-01-01"),
          expiresAt: null,
          revokedAt: null,
        },
      ],
      subscriptions: [],
    };

    const res = canAccessResource(userWithPurchase, paidResource, now);
    expect(res.allowed).toBe(true);
    expect(res.source).toBe("PURCHASE");
  });

  it("Denies access if stored entitlement has expired or been revoked", () => {
    const userRevoked: UserAccessContext = {
      id: "usr-2",
      status: "ACTIVE",
      entitlements: [
        {
          id: "ent-2",
          resourceId: "res-paid-1",
          sourceType: "PURCHASE",
          startsAt: new Date("2026-01-01"),
          revokedAt: new Date("2026-05-01"), // Revoked prior to `now`
        },
      ],
      subscriptions: [],
    };

    const res = canAccessResource(userRevoked, paidResource, now);
    expect(res.allowed).toBe(false);
  });

  it("Allows access via active subscription covering the subject", () => {
    const subscriber: UserAccessContext = {
      id: "usr-3",
      status: "ACTIVE",
      entitlements: [],
      subscriptions: [
        {
          id: "sub-1",
          status: "ACTIVE",
          currentPeriodEnd: new Date("2026-12-31"),
          rules: [
            {
              scopeType: "SUBJECT",
              scopeValue: "chemistry",
              effect: "INCLUDE",
              downloadAllowed: true,
            },
          ],
        },
      ],
    };

    const res = canAccessResource(subscriber, paidResource, now);
    expect(res.allowed).toBe(true);
    expect(res.source).toBe("SUBSCRIPTION");
    expect(res.downloadAllowed).toBe(true);
  });

  it("Respects subscription exclusion rule overriding broad inclusion", () => {
    const subscriberWithExclusion: UserAccessContext = {
      id: "usr-4",
      status: "ACTIVE",
      entitlements: [],
      subscriptions: [
        {
          id: "sub-2",
          status: "ACTIVE",
          currentPeriodEnd: new Date("2026-12-31"),
          rules: [
            {
              scopeType: "ALL",
              scopeValue: "all",
              effect: "INCLUDE",
              downloadAllowed: true,
            },
            {
              scopeType: "CHAPTER",
              scopeValue: "electrochemistry",
              effect: "EXCLUDE",
              downloadAllowed: false,
            },
          ],
        },
      ],
    };

    const res = canAccessResource(subscriberWithExclusion, paidResource, now);
    expect(res.allowed).toBe(false);
  });
});
