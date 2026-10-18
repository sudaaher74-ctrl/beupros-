import React from 'react';
import { CuratedBundlesHero } from '@/components/CuratedBundlesHero';
import { ShopByCategory } from '@/components/ShopByCategory';
import { BrandPartnersShowcase } from '@/components/BrandPartnersShowcase';
import { SalonCommunityGrid } from '@/components/SalonCommunityGrid';
import { TradeNewsletterModal } from '@/components/TradeNewsletterModal';

export default function Home() {
  return (
    <>
      {/* 1. Brand Hero Section: "CHOOSE YOUR FAVORITE STYLE!" with direct shop CTAs */}
      <CuratedBundlesHero />

      {/* 2. Visual 12-Tile Category Grid: Shop By Category (SalonCentric style) */}
      <ShopByCategory />

      {/* 3. Official Authorized Brand Partners Showcase */}
      <BrandPartnersShowcase />

      {/* 4. Instagram / Stylist Community Social Grid */}
      <SalonCommunityGrid />

      {/* 5. Exclusive 10% Pro Discount Newsletter Modal */}
      <TradeNewsletterModal />
    </>
  );
}
