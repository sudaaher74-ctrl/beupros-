import React from 'react';
import { TradeNoticeBanner } from '@/components/TradeNoticeBanner';
import { CuratedBundlesHero } from '@/components/CuratedBundlesHero';
import { ProTradePerksBar } from '@/components/ProTradePerksBar';
import { BestDressedSalon } from '@/components/BestDressedSalon';
import { ProManifestoBanner } from '@/components/ProManifestoBanner';
import { SignatureProductsShowcase } from '@/components/SignatureProductsShowcase';
import { SalonIsFashion } from '@/components/SalonIsFashion';
import { ProMasterclasses } from '@/components/ProMasterclasses';
import { TradeNewsletterModal } from '@/components/TradeNewsletterModal';

export default function Home() {
  return (
    <>
      {/* 1. Trade Notice Top Banner */}
      <TradeNoticeBanner />

      {/* 2. Hero Section: "CHOOSE YOUR FAVORITE STYLE!" with ProBox / ProBag / SalonWEAR tabs and 4,200+ salon products */}
      <CuratedBundlesHero />

      {/* 3. Dark Wholesale Trade Perks Bar */}
      <ProTradePerksBar />

      {/* 4. Split Editorial Section: Best Dressed Salon */}
      <BestDressedSalon />

      {/* 5. Professional Philosophy Quote Manifesto */}
      <ProManifestoBanner />

      {/* 6. Signature Salon Essentials Showcase (4 bestselling salon pro products) */}
      <SignatureProductsShowcase />

      {/* 7. Stylist Apparel & Workwear: Salon Is Fashion */}
      <SalonIsFashion />

      {/* 8. Pro Masterclasses & Certification Schedule */}
      <ProMasterclasses />

      {/* 9. Exclusive 10% Pro Discount Newsletter Modal */}
      <TradeNewsletterModal />
    </>
  );
}
