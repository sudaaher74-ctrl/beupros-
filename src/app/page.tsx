import React from 'react';
import { CuratedBundlesHero } from '@/components/CuratedBundlesHero';
import { ProManifestoBanner } from '@/components/ProManifestoBanner';
import { ShopByCategory } from '@/components/ShopByCategory';
import { BrandPartnersShowcase } from '@/components/BrandPartnersShowcase';
import { LiquidWaterHeroCanvas } from '@/components/LiquidWaterHeroCanvas';

export default function Home() {
  return (
    <>
      {/* ========================================================================= */}
      {/* 1. HERO & MANIFESTO: INTERACTIVE LIQUID WATER WAVY BACKGROUND              */}
      {/* ========================================================================= */}
      <div className="stuck-wavy-hero-wrapper" style={{ overflow: 'hidden' }}>
        <LiquidWaterHeroCanvas />
        <CuratedBundlesHero transparentBg={true} theme="wavy" />
        <ProManifestoBanner transparentBg={true} theme="wavy" />
      </div>

      {/* ========================================================================= */}
      {/* 2. CATEGORIES GRID: SLEEK NOIR BLACK THEME                                */}
      {/* ========================================================================= */}
      <div style={{ backgroundColor: '#000000' }}>
        <ShopByCategory theme="black" />
      </div>

      {/* ========================================================================= */}
      {/* 3. OFFICIAL BRAND PARTNERS: INTERACTIVE LIQUID WATER WAVY BACKGROUND       */}
      {/* ========================================================================= */}
      <div className="wavy-alternating-band" style={{ position: 'relative', overflow: 'hidden' }}>
        <LiquidWaterHeroCanvas />
        <BrandPartnersShowcase theme="wavy" />
      </div>
    </>
  );
}
