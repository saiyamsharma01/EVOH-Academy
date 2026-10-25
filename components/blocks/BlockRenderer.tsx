import React from "react";
import HeroBlock from "./HeroBlock";
import ClassSelectorBlock from "./ClassSelectorBlock";
import SubjectFeatureBlock from "./SubjectFeatureBlock";
import FeaturedResourcesBlock from "./FeaturedResourcesBlock";
import HowItWorksBlock from "./HowItWorksBlock";
import CtaFinalBlock from "./CtaFinalBlock";

export interface PageBlockData {
  id: string;
  blockType: string;
  orderIndex: number;
  config: any;
}

const BLOCK_REGISTRY: Record<string, React.ComponentType<{ config: any }>> = {
  hero: HeroBlock,
  class_selector: ClassSelectorBlock,
  subject_feature: SubjectFeatureBlock,
  featured_resources: FeaturedResourcesBlock,
  how_it_works: HowItWorksBlock,
  cta_final: CtaFinalBlock,
};

export default function BlockRenderer({ blocks }: { blocks: PageBlockData[] }) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  // Render in orderIndex order
  const sorted = [...blocks].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <>
      {sorted.map((block) => {
        const Component = BLOCK_REGISTRY[block.blockType];
        if (!Component) {
          console.warn(`[BlockRenderer] Unknown block type skipped: ${block.blockType}`);
          return null;
        }

        return (
          <React.Fragment key={block.id}>
            <Component config={block.config} />
          </React.Fragment>
        );
      })}
    </>
  );
}
