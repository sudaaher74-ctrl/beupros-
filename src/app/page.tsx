import React from 'react';
import { CuratedBundlesHero } from '@/components/CuratedBundlesHero';
import { ProManifestoBanner } from '@/components/ProManifestoBanner';
import { ShopByCategory } from '@/components/ShopByCategory';
import { BrandPartnersShowcase } from '@/components/BrandPartnersShowcase';
import { TradeNewsletterModal } from '@/components/TradeNewsletterModal';

export default function Home() {
  return (
    <>
      {/* ========================================================================= */}
      {/* 1ST SCROLL: ICONIC RETRO WAVY BACKGROUND THEME                            */}
      {/* Hero 3D Product Stage & Pro Manifesto Banner on continuous wavy graphic   */}
      {/* ========================================================================= */}
      <div className="stuck-wavy-hero-wrapper">
        <CuratedBundlesHero transparentBg={true} theme="wavy" />
        <ProManifestoBanner transparentBg={true} theme="wavy" />
      </div>

      {/* ========================================================================= */}
      {/* 2ND SCROLL: SLEEK NOIR BLACK LUXURY THEME                                 */}
      {/* Shop By Category and Official Brand Partners in sleek black               */}
      {/* ========================================================================= */}
      <div className="theme-noir-black-wrapper" style={{ backgroundColor: '#000000' }}>
        {/* Visual 12-Tile Category Grid in Noir Black */}
        <ShopByCategory theme="black" />

        {/* Official Authorized Brand Partners in Noir Black */}
        <BrandPartnersShowcase theme="black" />
      </div>

      {/* Exclusive 10% Pro Discount Newsletter Modal */}
      <TradeNewsletterModal />
    </>
  );
}
