import { PrismaClient } from "@prisma/client";
import { ROLE_PERMISSIONS, RoleName } from "../server/auth/permissions";

const db = new PrismaClient();

async function seed() {
  console.log("🌱 Seeding EVOH Academy foundational database...");

  // 1. Seed Roles & Permissions
  console.log("  -> Seeding RBAC roles and permissions...");
  const roleMap = new Map<string, string>();

  const roles: { name: RoleName; description: string }[] = [
    { name: "SUPER_ADMIN", description: "Platform Owner with unrestricted authority" },
    { name: "ADMIN", description: "Trusted manager for content, orders, and coupons" },
    { name: "EDITOR", description: "Content author for curriculum, notes, and blog" },
    { name: "SUPPORT", description: "Support staff for ticket resolution and enquiries" },
    { name: "STUDENT", description: "Standard enrolled learner account" },
    { name: "GUARDIAN", description: "Parent or guardian with oversight of child" },
  ];

  for (const r of roles) {
    const roleRecord = await db.role.upsert({
      where: { name: r.name },
      update: { description: r.description },
      create: { name: r.name, description: r.description },
    });
    roleMap.set(r.name, roleRecord.id);
  }

  // Collect all unique permission codes
  const allPermissions = new Set<string>();
  Object.values(ROLE_PERMISSIONS).forEach((perms) => {
    perms.forEach((p) => allPermissions.add(p));
  });

  for (const code of allPermissions) {
    const group = code.split(".")[0] || "general";
    const permRecord = await db.permission.upsert({
      where: { code },
      update: { group, description: `Permission for ${code}` },
      create: { code, group, description: `Permission for ${code}` },
    });

    // Assign to roles
    for (const [rName, perms] of Object.entries(ROLE_PERMISSIONS)) {
      if (perms.includes(code as any)) {
        const roleId = roleMap.get(rName);
        if (roleId) {
          await db.rolePermission.upsert({
            where: {
              roleId_permissionId: {
                roleId,
                permissionId: permRecord.id,
              },
            },
            update: {},
            create: {
              roleId,
              permissionId: permRecord.id,
            },
          });
        }
      }
    }
  }

  // 2. Resource Types
  console.log("  -> Seeding Resource Types...");
  const resourceTypes = [
    { name: "Concept Notes", slug: "concept-notes", iconKey: "book-open" },
    { name: "Formula Sheet", slug: "formula-sheet", iconKey: "sigma" },
    { name: "Worksheet", slug: "worksheet", iconKey: "file-text" },
    { name: "Question Bank", slug: "question-bank", iconKey: "help-circle" },
    { name: "Mock Test (PDF)", slug: "mock-test-pdf", iconKey: "clock" },
    { name: "Revision Bundle", slug: "revision-bundle", iconKey: "package" },
  ];

  for (const rt of resourceTypes) {
    await db.resourceType.upsert({
      where: { slug: rt.slug },
      update: { name: rt.name, iconKey: rt.iconKey },
      create: { name: rt.name, slug: rt.slug, iconKey: rt.iconKey, isSystem: true },
    });
  }

  // 3. Policies & Settings
  console.log("  -> Seeding Policies & Brand Settings...");
  await db.taxSetting.upsert({
    where: { id: "default-tax-setting" },
    update: {},
    create: {
      id: "default-tax-setting",
      businessLegalName: "EVOH Academy",
      address: "New Delhi, India",
      state: "Delhi",
      gstin: null,
      isRegistered: false,
      defaultTaxRate: 18,
      priceMode: "TAX_INCLUSIVE",
      invoicePrefix: "INV-2026",
      financialYearReset: true,
    },
  });

  await db.downloadPolicy.upsert({
    where: { id: "default-download-policy" },
    update: {},
    create: {
      id: "default-download-policy",
      maxPerHour: 20,
      maxPerDay: 50,
      maxDistinctDevices: 3,
      abuseThresholdDownloads: 15,
    },
  });

  await db.deviceLimitPolicy.upsert({
    where: { id: "default-device-policy" },
    update: {},
    create: {
      id: "default-device-policy",
      maxActiveSessions: 3,
      sessionTtlHours: 720,
    },
  });

  await db.watermarkPolicy.upsert({
    where: { id: "default-watermark-policy" },
    update: {},
    create: {
      id: "default-watermark-policy",
      includeName: true,
      includeEmail: true,
      includeOrderRef: true,
      includeTimestamp: true,
      opacity: 0.18,
      position: "DIAGONAL_REPEATED",
    },
  });

  // Default Site Settings (Brand, Theme, Contact)
  const defaultSettings = [
    {
      key: "brand_name",
      valueJson: JSON.stringify("EVOH Academy"),
    },
    {
      key: "brand_tagline",
      valueJson: JSON.stringify("Understand the Concepts. Master the Science."),
    },
    {
      key: "theme",
      valueJson: JSON.stringify({
        primaryColor: "#1D4ED8",
        surfaceBase: "#FDFBF7",
        surfaceDark: "#0B132B",
        accentCyan: "#06B6D4",
        accentViolet: "#6366F1",
        fontDisplay: "Manrope",
        fontSans: "Inter",
        radius: "0.5rem",
      }),
    },
    {
      key: "contact",
      valueJson: JSON.stringify({
        email: "support@evohacademy.com",
        phone: "+91-9876543210",
        address: "New Delhi, India",
      }),
    },
    {
      key: "social_links",
      valueJson: JSON.stringify([
        { platform: "YouTube", url: "https://youtube.com/@evohacademy" },
        { platform: "Telegram", url: "https://t.me/evohacademy" },
      ]),
    },
  ];

  for (const s of defaultSettings) {
    await db.siteSetting.upsert({
      where: { key: s.key },
      update: { valueJson: s.valueJson },
      create: { key: s.key, valueJson: s.valueJson },
    });
  }

  // Feature Flags
  const featureFlags = [
    { key: "subscriptions_enabled", isEnabled: false, description: "Enable recurring subscription plans" },
    { key: "coupons_enabled", isEnabled: true, description: "Allow discount coupon entry at checkout" },
    { key: "reviews_enabled", isEnabled: false, description: "Show verified buyer reviews" },
    { key: "turnstile_enabled", isEnabled: false, description: "Cloudflare Turnstile bot protection" },
    { key: "maintenance_mode", isEnabled: false, description: "Emergency public site maintenance gate" },
  ];

  for (const ff of featureFlags) {
    await db.featureFlag.upsert({
      where: { key: ff.key },
      update: { isEnabled: ff.isEnabled, description: ff.description },
      create: { key: ff.key, isEnabled: ff.isEnabled, description: ff.description },
    });
  }

  // 4. Default Navigation
  console.log("  -> Seeding NavItems...");
  const navItems = [
    { label: "Classes", path: "/classes", orderIndex: 1, location: "HEADER" },
    { label: "Subjects", path: "/subjects", orderIndex: 2, location: "HEADER" },
    { label: "Notes", path: "/notes", orderIndex: 3, location: "HEADER" },
    { label: "Pricing", path: "/pricing", orderIndex: 4, location: "HEADER" },
    { label: "About", path: "/about", orderIndex: 5, location: "HEADER" },
    // Footer Legal
    { label: "Terms & Conditions", path: "/terms", orderIndex: 1, location: "FOOTER_COL_1" },
    { label: "Privacy Policy", path: "/privacy", orderIndex: 2, location: "FOOTER_COL_1" },
    { label: "Refund Policy", path: "/refund-policy", orderIndex: 3, location: "FOOTER_COL_1" },
    { label: "Subscription Terms", path: "/subscription-terms", orderIndex: 4, location: "FOOTER_COL_1" },
    { label: "Digital Delivery & License", path: "/digital-delivery-policy", orderIndex: 5, location: "FOOTER_COL_1" },
    { label: "Cookie Policy", path: "/cookie-policy", orderIndex: 6, location: "FOOTER_COL_1" },
  ];

  for (const n of navItems) {
    await db.navItem.upsert({
      where: { id: `nav-${n.location.toLowerCase()}-${n.orderIndex}` },
      update: { label: n.label, path: n.path, location: n.location, orderIndex: n.orderIndex },
      create: {
        id: `nav-${n.location.toLowerCase()}-${n.orderIndex}`,
        label: n.label,
        path: n.path,
        location: n.location,
        orderIndex: n.orderIndex,
        isVisible: true,
      },
    });
  }

  // 5. Default Homepage Blocks
  console.log("  -> Seeding default Homepage Blocks...");
  const defaultBlocks = [
    {
      blockType: "hero",
      orderIndex: 1,
      config: {
        headline: "Understand the Concepts. Master the Science.",
        subheadline: "Thoughtfully structured Physics, Chemistry, and Mathematics resources for Class 11 and 12 students.",
        primaryCtaLabel: "Explore Learning Resources",
        primaryCtaLink: "/notes",
        secondaryCtaLabel: "Explore Free Notes",
        secondaryCtaLink: "/free-resources",
        visualVariant: "scene3d",
        announcementStrip: true,
      },
    },
    {
      blockType: "class_selector",
      orderIndex: 2,
      config: {
        classes: [
          { level: 11, title: "Class 11 Science", description: "Build deep foundational mechanics, thermodynamics, and calculus fundamentals.", link: "/classes/11" },
          { level: 12, title: "Class 12 Science", description: "Electromagnetism, organic chemistry, vectors, and board exam mastery.", link: "/classes/12" },
        ],
      },
    },
    {
      blockType: "subject_feature",
      orderIndex: 3,
      config: {
        subjectSlug: "physics",
        headline: "Physics with Mathematical Precision",
        body: "From Newton's laws to wave optics. Every formula derived, visualized, and contextualized.",
      },
    },
    {
      blockType: "featured_resources",
      orderIndex: 4,
      config: {
        title: "Featured Study Notes",
        selectionMode: "newest",
        count: 4,
      },
    },
    {
      blockType: "how_it_works",
      orderIndex: 5,
      config: {
        steps: [
          { title: "Select Class & Subject", body: "Pick Class 11 or 12 across Physics, Chemistry, and Mathematics.", icon: "target" },
          { title: "Sample Real Previews", body: "Read genuine preview pages watermarked sample before deciding.", icon: "eye" },
          { title: "Personalized Digital Access", body: "Download dynamically watermarked PDFs or study in our web reader.", icon: "download" },
        ],
      },
    },
    {
      blockType: "cta_final",
      orderIndex: 6,
      config: {
        headline: "Ready to Elevate Your Science Learning?",
        body: "Join thousands of Class 11 and 12 students mastering concepts with clarity and confidence.",
        ctaLabel: "Browse All Notes",
        ctaLink: "/notes",
      },
    },
  ];

  for (const b of defaultBlocks) {
    await db.pageBlock.upsert({
      where: { id: `block-home-${b.orderIndex}` },
      update: {
        blockType: b.blockType,
        orderIndex: b.orderIndex,
        configJson: JSON.stringify(b.config),
        isPublished: true,
      },
      create: {
        id: `block-home-${b.orderIndex}` ,
        pageIdentifier: "homepage",
        blockType: b.blockType,
        orderIndex: b.orderIndex,
        configJson: JSON.stringify(b.config),
        isPublished: true,
      },
    });
  }

  // 6. Draft Starter Curriculum
  console.log("  -> Seeding Draft Starter Curriculum...");
  const syllabus = await db.syllabus.upsert({
    where: { id: "syllabus-cbse-starter" },
    update: {},
    create: {
      id: "syllabus-cbse-starter",
      boardName: "CBSE / NCERT",
      editionLabel: "2024-25 (Unverified Draft)",
      status: "DRAFT",
    },
  });

  const subjects = [
    { name: "Physics", slug: "physics", iconKey: "atom", description: "Mechanics, Waves, Thermodynamics & Electromagnetism" },
    { name: "Chemistry", slug: "chemistry", iconKey: "flask-conical", description: "Physical, Inorganic & Organic Reaction Mechanisms" },
    { name: "Mathematics", slug: "mathematics", iconKey: "binary", description: "Calculus, Vectors, Algebra & Coordinate Geometry" },
  ];

  for (const [idx, s] of subjects.entries()) {
    const subRecord = await db.subject.upsert({
      where: { slug: s.slug },
      update: { name: s.name, iconKey: s.iconKey, description: s.description, displayOrder: idx + 1 },
      create: {
        name: s.name,
        slug: s.slug,
        iconKey: s.iconKey,
        description: s.description,
        displayOrder: idx + 1,
        status: "PUBLISHED",
      },
    });

    // Map to classes 11 and 12
    for (const cl of [11, 12]) {
      await db.subjectClass.upsert({
        where: { subjectId_classLevel: { subjectId: subRecord.id, classLevel: cl } },
        update: {},
        create: { subjectId: subRecord.id, classLevel: cl },
      });
    }

    // Seed sample chapters in DRAFT
    const starterChapters = [
      { chapterNumber: 1, title: `${s.name} Foundations & Units`, slug: `${s.slug}-foundations`, classLevel: 11 },
      { chapterNumber: 2, title: `${s.name} Core Laws & Dynamics`, slug: `${s.slug}-core-dynamics`, classLevel: 11 },
      { chapterNumber: 1, title: `Advanced ${s.name} Principles`, slug: `adv-${s.slug}-principles`, classLevel: 12 },
      { chapterNumber: 2, title: `${s.name} Applications & Problem Solving`, slug: `${s.slug}-applications`, classLevel: 12 },
    ];

    for (const ch of starterChapters) {
      await db.chapter.upsert({
        where: {
          syllabusId_subjectId_classLevel_chapterNumber: {
            syllabusId: syllabus.id,
            subjectId: subRecord.id,
            classLevel: ch.classLevel,
            chapterNumber: ch.chapterNumber,
          },
        },
        update: { title: ch.title, slug: ch.slug },
        create: {
          syllabusId: syllabus.id,
          subjectId: subRecord.id,
          classLevel: ch.classLevel,
          chapterNumber: ch.chapterNumber,
          title: ch.title,
          slug: ch.slug,
          status: "DRAFT",
        },
      });
    }
  }

  console.log("✅ Seed completed successfully. Zero fake credentials or test orders created.");
}

seed()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
