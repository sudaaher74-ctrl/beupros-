import React from 'react';
import { CuratedBundlesHero } from '@/components/CuratedBundlesHero';
import { ShopByCategory } from '@/components/ShopByCategory';
import { ProManifestoBanner } from '@/components/ProManifestoBanner';
import { SalonIsFashion } from '@/components/SalonIsFashion';
import { ProMasterclasses } from '@/components/ProMasterclasses';
import { TradeNewsletterModal } from '@/components/TradeNewsletterModal';

export default function Home() {
  return (
    <>
      {/* 1. Brand Hero Section: "CHOOSE YOUR FAVORITE STYLE!" with direct shop CTAs */}
      <CuratedBundlesHero />

      {/* 2. Visual 12-Tile Category Grid: Shop By Category (SalonCentric style) */}
      <ShopByCategory />

      {/* 3. Professional Philosophy Quote Manifesto */}
      <ProManifestoBanner />

      {/* 4. Stylist Apparel & Workwear: Salon Is Fashion */}
      <SalonIsFashion />

      {/* 5. Pro Masterclasses & Certification Schedule */}
      <ProMasterclasses />

      {/* 6. Exclusive 10% Pro Discount Newsletter Modal */}
      <TradeNewsletterModal />
    </>
  );
}
