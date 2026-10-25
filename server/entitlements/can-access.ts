export interface ResourceContext {
  id: string;
  slug: string;
  classLevel: number;
  subjectSlug: string;
  chapterSlug?: string;
  typeSlug: string;
  isFree: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export interface StoredEntitlement {
  id: string;
  resourceId?: string | null;
  bundleId?: string | null;
  sourceType: "PURCHASE" | "BUNDLE" | "ADMIN_GRANT";
  startsAt: Date;
  expiresAt?: Date | null;
  revokedAt?: Date | null;
}

export interface SubscriptionRule {
  scopeType: "ALL" | "CLASS" | "SUBJECT" | "CHAPTER" | "RESOURCE_TYPE";
  scopeValue: string;
  effect: "INCLUDE" | "EXCLUDE";
  downloadAllowed: boolean;
}

export interface ActiveSubscriptionContext {
  id: string;
  status: "ACTIVE" | "PAST_DUE" | "CANCELLED";
  currentPeriodEnd: Date;
  graceEndsAt?: Date | null;
  rules: SubscriptionRule[];
  selections?: { classLevel: number; subjectSlug: string }[];
}

export interface UserAccessContext {
  id: string;
  status: "ACTIVE" | "PENDING_GUARDIAN_CONSENT" | "SUSPENDED" | "ARCHIVED";
  entitlements: StoredEntitlement[];
  subscriptions: ActiveSubscriptionContext[];
}

export interface AccessResult {
  allowed: boolean;
  source?: "FREE" | "PURCHASE" | "BUNDLE" | "SUBSCRIPTION" | "ADMIN_GRANT";
  reason: string;
  downloadAllowed: boolean;
}

/**
 * Pure, deterministic entitlement evaluation function per PRD Section 13.3.
 */
export function canAccessResource(
  user: UserAccessContext | null | undefined,
  resource: ResourceContext,
  now: Date = new Date()
): AccessResult {
  // Unpublished content is inaccessible via public access flow
  if (resource.status !== "PUBLISHED") {
    return {
      allowed: false,
      reason: "This resource is currently not published.",
      downloadAllowed: false,
    };
  }

  // 1. Free and published resource
  if (resource.isFree) {
    return {
      allowed: true,
      source: "FREE",
      reason: "This is a complimentary learning resource.",
      downloadAllowed: true,
    };
  }

  // If no user context is provided for a paid resource
  if (!user) {
    return {
      allowed: false,
      reason: "Please log in to access this paid resource.",
      downloadAllowed: false,
    };
  }

  if (user.status === "SUSPENDED" || user.status === "ARCHIVED") {
    return {
      allowed: false,
      reason: "Your account is not active. Please contact support.",
      downloadAllowed: false,
    };
  }

  // 2. Direct or bundle stored entitlements
  for (const ent of user.entitlements) {
    // Must match resource ID
    if (ent.resourceId === resource.id) {
      if (ent.revokedAt && ent.revokedAt <= now) continue;
      if (ent.startsAt > now) continue;
      if (ent.expiresAt && ent.expiresAt < now) continue;

      return {
        allowed: true,
        source: ent.sourceType,
        reason:
          ent.sourceType === "ADMIN_GRANT"
            ? "Granted by administrator."
            : "Purchased resource.",
        downloadAllowed: true,
      };
    }
  }

  // 3. Active Subscription rules evaluation
  for (const sub of user.subscriptions) {
    const validThrough = sub.graceEndsAt ?? sub.currentPeriodEnd;
    if (now > validThrough) continue;

    // Check if subscription has explicit subject/class selections (e.g. Subject Pass)
    if (sub.selections && sub.selections.length > 0) {
      const selectionMatches = sub.selections.some(
        (sel) =>
          sel.classLevel === resource.classLevel &&
          sel.subjectSlug.toLowerCase() === resource.subjectSlug.toLowerCase()
      );
      if (!selectionMatches) continue;
    }

    let isIncluded = false;
    let isExcluded = false;
    let canDownload = true;

    for (const rule of sub.rules) {
      const match = matchesRule(rule, resource);
      if (match) {
        if (rule.effect === "EXCLUDE") {
          isExcluded = true;
          break;
        } else if (rule.effect === "INCLUDE") {
          isIncluded = true;
          canDownload = rule.downloadAllowed;
        }
      }
    }

    if (isIncluded && !isExcluded) {
      return {
        allowed: true,
        source: "SUBSCRIPTION",
        reason: "Included in your active subscription plan.",
        downloadAllowed: canDownload,
      };
    }
  }

  // 4. Default: Denied
  return {
    allowed: false,
    reason: "Purchase this resource or subscribe to unlock access.",
    downloadAllowed: false,
  };
}

function matchesRule(rule: SubscriptionRule, res: ResourceContext): boolean {
  switch (rule.scopeType) {
    case "ALL":
      return true;
    case "CLASS":
      return rule.scopeValue === String(res.classLevel);
    case "SUBJECT":
      return rule.scopeValue.toLowerCase() === res.subjectSlug.toLowerCase();
    case "CHAPTER":
      return rule.scopeValue === res.chapterSlug;
    case "RESOURCE_TYPE":
      return rule.scopeValue.toLowerCase() === res.typeSlug.toLowerCase();
    default:
      return false;
  }
}
