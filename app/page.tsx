import { getPageBlocks } from "@/lib/settings";
import BlockRenderer, { PageBlockData } from "@/components/blocks/BlockRenderer";

export const revalidate = 60; // On-demand tag revalidation capable

const FALLBACK_HOMEPAGE_BLOCKS: PageBlockData[] = [
  {
    id: "fb-1",
    blockType: "hero",
    orderIndex: 1,
    config: {
      headline: "Understand the Concepts. Master the Science.",
      subheadline:
        "Thoughtfully structured Physics, Chemistry, and Mathematics resources for Class 11 and 12 students.",
      primaryCtaLabel: "Explore Learning Resources",
      primaryCtaLink: "/notes",
      secondaryCtaLabel: "Explore Free Notes",
      secondaryCtaLink: "/free-resources",
      visualVariant: "scene3d",
      announcementStrip: true,
    },
  },
  {
    id: "fb-2",
    blockType: "class_selector",
    orderIndex: 2,
    config: {
      classes: [
        {
          level: 11,
          title: "Class 11 Science",
          description:
            "Build deep foundational mechanics, thermodynamics, and calculus fundamentals.",
          link: "/classes/11",
        },
        {
          level: 12,
          title: "Class 12 Science",
          description:
            "Electromagnetism, organic chemistry, vectors, and board exam mastery.",
          link: "/classes/12",
        },
      ],
    },
  },
  {
    id: "fb-3",
    blockType: "subject_feature",
    orderIndex: 3,
    config: {
      subjectSlug: "physics",
      headline: "Physics with Mathematical Precision",
      body: "From Newton's laws to wave optics. Every formula derived, visualized, and contextualized.",
    },
  },
  {
    id: "fb-4",
    blockType: "featured_resources",
    orderIndex: 4,
    config: {
      title: "Featured Study Notes",
      selectionMode: "newest",
      count: 4,
    },
  },
  {
    id: "fb-5",
    blockType: "how_it_works",
    orderIndex: 5,
    config: {
      steps: [],
    },
  },
  {
    id: "fb-6",
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

export default async function HomePage() {
  const dbBlocks = await getPageBlocks("homepage");
  const blocksToRender = dbBlocks && dbBlocks.length > 0 ? dbBlocks : FALLBACK_HOMEPAGE_BLOCKS;

  return (
    <div className="w-full">
      <BlockRenderer blocks={blocksToRender} />
    </div>
  );
}
