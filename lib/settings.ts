import { db } from "./db";

export interface BrandSettings {
  brandName: string;
  tagline: string;
  primaryColor: string;
  contactEmail: string;
  contactPhone?: string;
  socialLinks: { platform: string; url: string }[];
}

export const DEFAULT_BRAND: BrandSettings = {
  brandName: "EVOH Academy",
  tagline: "Understand the Concepts. Master the Science.",
  primaryColor: "#1D4ED8",
  contactEmail: "support@evohacademy.com",
  contactPhone: "+91-9876543210",
  socialLinks: [
    { platform: "YouTube", url: "https://youtube.com/@evohacademy" },
    { platform: "Telegram", url: "https://t.me/evohacademy" },
  ],
};

let isDbReachable: boolean | null = null;

async function checkDbReachable(): Promise<boolean> {
  if (isDbReachable !== null) return isDbReachable;
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("localhost:5432")) {
    // If using placeholder localhost URL without live DB daemon, skip slow attempts
    isDbReachable = false;
    return false;
  }
  try {
    await Promise.race([
      db.$queryRaw`SELECT 1`,
      new Promise((_, reject) => setTimeout(() => reject(new Error("DB Ping Timeout")), 300)),
    ]);
    isDbReachable = true;
    return true;
  } catch {
    isDbReachable = false;
    return false;
  }
}

export async function getBrandSettings(): Promise<BrandSettings> {
  const reachable = await checkDbReachable();
  if (!reachable) {
    return DEFAULT_BRAND;
  }

  try {
    const settings = await db.siteSetting.findMany({
      where: {
        key: {
          in: ["brand_name", "brand_tagline", "contact", "social_links", "theme"],
        },
      },
    });

    if (!settings || settings.length === 0) return DEFAULT_BRAND;

    const map = new Map(settings.map((s) => [s.key, s.valueJson]));
    const brandName = map.has("brand_name")
      ? JSON.parse(map.get("brand_name")!)
      : DEFAULT_BRAND.brandName;
    const tagline = map.has("brand_tagline")
      ? JSON.parse(map.get("brand_tagline")!)
      : DEFAULT_BRAND.tagline;
    const contact = map.has("contact")
      ? JSON.parse(map.get("contact")!)
      : { email: DEFAULT_BRAND.contactEmail, phone: DEFAULT_BRAND.contactPhone };
    const socialLinks = map.has("social_links")
      ? JSON.parse(map.get("social_links")!)
      : DEFAULT_BRAND.socialLinks;

    return {
      brandName,
      tagline,
      primaryColor: DEFAULT_BRAND.primaryColor,
      contactEmail: contact.email,
      contactPhone: contact.phone,
      socialLinks,
    };
  } catch (e) {
    isDbReachable = false;
    return DEFAULT_BRAND;
  }
}

export async function getNavItems(location: string = "HEADER") {
  const reachable = await checkDbReachable();
  if (!reachable) {
    return [
      { id: "1", label: "Classes", path: "/classes", orderIndex: 1, location },
      { id: "2", label: "Subjects", path: "/subjects", orderIndex: 2, location },
      { id: "3", label: "Notes", path: "/notes", orderIndex: 3, location },
      { id: "4", label: "Pricing", path: "/pricing", orderIndex: 4, location },
      { id: "5", label: "About", path: "/about", orderIndex: 5, location },
    ];
  }

  try {
    const items = await db.navItem.findMany({
      where: { location, isVisible: true },
      orderBy: { orderIndex: "asc" },
    });
    if (!items || items.length === 0) throw new Error("Empty nav");
    return items;
  } catch (e) {
    isDbReachable = false;
    return [
      { id: "1", label: "Classes", path: "/classes", orderIndex: 1, location },
      { id: "2", label: "Subjects", path: "/subjects", orderIndex: 2, location },
      { id: "3", label: "Notes", path: "/notes", orderIndex: 3, location },
      { id: "4", label: "Pricing", path: "/pricing", orderIndex: 4, location },
      { id: "5", label: "About", path: "/about", orderIndex: 5, location },
    ];
  }
}

export async function getPageBlocks(pageIdentifier: string = "homepage") {
  const reachable = await checkDbReachable();
  if (!reachable) {
    return [];
  }

  try {
    const blocks = await db.pageBlock.findMany({
      where: { pageIdentifier, isPublished: true },
      orderBy: { orderIndex: "asc" },
    });
    return blocks.map((b) => ({
      id: b.id,
      blockType: b.blockType,
      orderIndex: b.orderIndex,
      config: JSON.parse(b.configJson),
    }));
  } catch (e) {
    isDbReachable = false;
    return [];
  }
}
