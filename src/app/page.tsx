import React from 'react';
import { CuratedBundlesHero } from '@/components/CuratedBundlesHero';
import { ProManifestoBanner } from '@/components/ProManifestoBanner';
import { SignatureProductsShowcase } from '@/components/SignatureProductsShowcase';
import { SalonIsFashion } from '@/components/SalonIsFashion';
import { ShopByCategory } from '@/components/ShopByCategory';
import { BrandPartnersShowcase } from '@/components/BrandPartnersShowcase';
import { SalonCommunityGrid } from '@/components/SalonCommunityGrid';
import { TradeNewsletterModal } from '@/components/TradeNewsletterModal';

export default function Home() {
  return (
    <>
      {/* ========================================================================= */}
      {/* 1. IMMERSIVE STUCK WAVY PARALLAX EXPERIENCE                               */}
      {/* Background stays stuck in place as the user scrolls through the hero,     */}
      {/* manifesto quote, 4-product shelf, and the "SALON IS FASHION" section.      */}
      {/* ========================================================================= */}
      <div className="stuck-wavy-hero-wrapper">
        {/* Hero Banner: "CHOOSE YOUR FAVORITE STYLE!" with 3D product stage */}
        <CuratedBundlesHero transparentBg={true} />

        {/* Manifesto Quote Banner (Screenshot 1 top) */}
        <ProManifestoBanner transparentBg={true} />

        {/* 4-Product Signature Showcase Floating Shelf (Screenshot 1 middle) */}
        <SignatureProductsShowcase transparentBg={true} />

        {/* SALON IS FASHION Merch Showcase (Screenshot 2: sweatshirt, tote, cap) */}
        <SalonIsFashion transparentBg={true} />
      </div>

      {/* ========================================================================= */}
      {/* 2. MODERN SALEDASH SECTIONS (WHITE & CLEAN THEME)                         */}
      {/* ========================================================================= */}
      {/* Visual 12-Tile Category Grid: Shop By Category */}
      <ShopByCategory />

      {/* Official Authorized Brand Partners Showcase */}
      <BrandPartnersShowcase />

      {/* Instagram / Stylist Community Social Grid */}
      <SalonCommunityGrid />

      {/* Exclusive 10% Pro Discount Newsletter Modal */}
      <TradeNewsletterModal />
    </>
  );
}
