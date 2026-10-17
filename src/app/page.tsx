import React from 'react';
import { TradeNoticeBanner } from '@/components/TradeNoticeBanner';
import { CuratedBundlesHero } from '@/components/CuratedBundlesHero';
import { ProTradePerksBar } from '@/components/ProTradePerksBar';
import { SparkleLineup } from '@/components/SparkleLineup';
import { BestDressedSalon } from '@/components/BestDressedSalon';
import { ProManifestoBanner } from '@/components/ProManifestoBanner';
import { SalonIsFashion } from '@/components/SalonIsFashion';
import { ProMasterclasses } from '@/components/ProMasterclasses';
import { PartnerPillars } from '@/components/PartnerPillars';
import { TradeNewsletterModal } from '@/components/TradeNewsletterModal';

export default function Home() {
  return (
    <>
      {/* 1. Trade Notice Top Banner */}
      <TradeNoticeBanner />

      {/* 2. Brand Hero Section: "CHOOSE YOUR FAVORITE STYLE!" with direct shop CTAs */}
      <CuratedBundlesHero />

      {/* 3. Dark Wholesale Trade Perks Bar */}
      <ProTradePerksBar />

      {/* 4. Tabbed Pro Beauty Lineup: Products That Sparkle */}
      <SparkleLineup />

      {/* 5. Split Editorial Section: Best Dressed Salon */}
      <BestDressedSalon />

      {/* 5. Professional Philosophy Quote Manifesto */}
      <ProManifestoBanner />

      {/* 6. Stylist Apparel & Workwear: Salon Is Fashion */}
      <SalonIsFashion />

      {/* 7. Pro Masterclasses & Certification Schedule */}
      <ProMasterclasses />

      {/* 8. Pro Partner Pillars: Loyalty & Support */}
      <PartnerPillars />

      {/* 9. Exclusive 10% Pro Discount Newsletter Modal */}
      <TradeNewsletterModal />
    </>
  );
}
