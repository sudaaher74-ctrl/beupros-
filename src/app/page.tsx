import React from 'react';
import { CuratedBundlesHero } from '@/components/CuratedBundlesHero';
import { ProManifestoBanner } from '@/components/ProManifestoBanner';
import { SalonProGearShowcase } from '@/components/SalonProGearShowcase';
import { ShopByCategory } from '@/components/ShopByCategory';
import { BrandPartnersShowcase } from '@/components/BrandPartnersShowcase';
import { SalonCommunityGrid } from '@/components/SalonCommunityGrid';
import { TradeNewsletterModal } from '@/components/TradeNewsletterModal';

export default function Home() {
  return (
    <>
      {/* ========================================================================= */}
      {/* IMMERSIVE FULL-PAGE WAVY RETRO PARALLAX EXPERIENCE                       */}
      {/* Complete home screen seamlessly enveloped in the iconic wavy background   */}
      {/* ========================================================================= */}
      <div className="stuck-wavy-full-wrapper">
        {/* 1. Hero Banner: "CHOOSE YOUR FAVORITE STYLE!" with 3D product stage */}
        <CuratedBundlesHero transparentBg={true} theme="wavy" />

        {/* 2. Pro Manifesto Quote Banner */}
        <ProManifestoBanner transparentBg={true} theme="wavy" />

        {/* 3. Authentic Pro Salon Gear & Products Showcase (Filters, B2B Perks, Real Catalog) */}
        <SalonProGearShowcase theme="wavy" />

        {/* 4. Visual 12-Tile Category Grid */}
        <ShopByCategory theme="wavy" />

        {/* 5. Official Authorized Brand Partners Showcase */}
        <BrandPartnersShowcase theme="wavy" />

        {/* 6. Instagram / Stylist Community Social Grid */}
        <SalonCommunityGrid theme="wavy" />
      </div>

      {/* Exclusive 10% Pro Discount Newsletter Modal */}
      <TradeNewsletterModal />
    </>
  );
}
