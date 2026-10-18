'use client';

import React, { useState } from 'react';
import { CuratedBundlesHero } from '@/components/CuratedBundlesHero';
import { ProManifestoBanner } from '@/components/ProManifestoBanner';
import { SignatureProductsShowcase } from '@/components/SignatureProductsShowcase';
import { SalonProGearShowcase } from '@/components/SalonProGearShowcase';
import { ShopByCategory } from '@/components/ShopByCategory';
import { BrandPartnersShowcase } from '@/components/BrandPartnersShowcase';
import { SalonCommunityGrid } from '@/components/SalonCommunityGrid';
import { TradeNewsletterModal } from '@/components/TradeNewsletterModal';
import { Waves, Moon, Layers, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeTheme, setActiveTheme] = useState<'wavy' | 'black' | 'alternating'>('wavy');

  return (
    <>
      {/* ========================================================================= */}
      {/* INTERACTIVE HOME THEME & CONTENT TABS (WAVY vs NOIR BLACK vs ONE-BY-ONE)  */}
      {/* Allows switching between Full Wavy Background, Sleek Black, & Alternating */}
      {/* ========================================================================= */}
      <div
        style={{
          position: 'sticky',
          top: '65px',
          zIndex: 85,
          backgroundColor: 'rgba(0, 0, 0, 0.88)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '10px 16px',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* Left: Indicator info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: activeTheme === 'wavy' ? '#f43f5e' : activeTheme === 'black' ? '#f59e0b' : '#38bdf8',
                boxShadow: '0 0 10px currentColor',
              }}
            />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#e4e4e7',
              }}
            >
              HOME THEMES:
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#a1a1aa',
                display: 'none',
              }}
              className="theme-desktop-tip"
            >
              (Tab 1 Wavy • Tab 2 Black • Alternating One-by-One)
            </span>
          </div>

          {/* Right: The 3 Selectable Theme Tabs */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#18181b',
              padding: '4px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              gap: '4px',
            }}
          >
            {/* Tab 1: Wavy Background */}
            <button
              onClick={() => setActiveTheme('wavy')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '7px 16px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '11.5px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
                backgroundColor:
                  activeTheme === 'wavy'
                    ? 'linear-gradient(135deg, #f43f5e, #be123c)'
                    : 'transparent',
                background:
                  activeTheme === 'wavy'
                    ? 'linear-gradient(135deg, #e11d48, #9f1239)'
                    : 'transparent',
                color: activeTheme === 'wavy' ? '#ffffff' : '#a1a1aa',
                boxShadow:
                  activeTheme === 'wavy'
                    ? '0 4px 14px rgba(225, 29, 72, 0.4)'
                    : 'none',
              }}
            >
              <Waves size={14} />
              <span>1st Tab: Wavy Atmosphere</span>
            </button>

            {/* Tab 2: Noir Black */}
            <button
              onClick={() => setActiveTheme('black')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '7px 16px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '11.5px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
                background:
                  activeTheme === 'black'
                    ? '#ffffff'
                    : 'transparent',
                color: activeTheme === 'black' ? '#000000' : '#a1a1aa',
                boxShadow:
                  activeTheme === 'black'
                    ? '0 4px 14px rgba(255, 255, 255, 0.2)'
                    : 'none',
              }}
            >
              <Moon size={14} />
              <span>2nd Tab: Noir Black</span>
            </button>

            {/* Tab 3: Alternating One-by-One */}
            <button
              onClick={() => setActiveTheme('alternating')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '7px 16px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '11.5px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
                background:
                  activeTheme === 'alternating'
                    ? 'linear-gradient(135deg, #0284c7, #0369a1)'
                    : 'transparent',
                color: activeTheme === 'alternating' ? '#ffffff' : '#a1a1aa',
                boxShadow:
                  activeTheme === 'alternating'
                    ? '0 4px 14px rgba(2, 132, 199, 0.4)'
                    : 'none',
              }}
            >
              <Layers size={14} />
              <span>One by One</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. WAVY ATMOSPHERE THEME (TAB 1)                                          */}
      {/* Entire home screen wrapped in the continuous retro wavy contour background*/}
      {/* ========================================================================= */}
      {activeTheme === 'wavy' && (
        <div className="stuck-wavy-full-wrapper">
          {/* Hero Banner: "CHOOSE YOUR FAVORITE STYLE!" with 3D product stage */}
          <CuratedBundlesHero transparentBg={true} theme="wavy" />

          {/* Manifesto Quote Banner */}
          <ProManifestoBanner transparentBg={true} theme="wavy" />

          {/* 4-Product Signature Showcase Floating Shelf */}
          <SignatureProductsShowcase transparentBg={true} theme="wavy" />

          {/* Authentic Pro Salon Gear & Products (Replacing Apparel Merch) */}
          <SalonProGearShowcase theme="wavy" />

          {/* Visual 12-Tile Category Grid */}
          <ShopByCategory theme="wavy" />

          {/* Official Authorized Brand Partners Showcase */}
          <BrandPartnersShowcase theme="wavy" />

          {/* Instagram / Stylist Community Social Grid */}
          <SalonCommunityGrid theme="wavy" />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. NOIR PRO LUXURY THEME (TAB 2)                                          */}
      {/* Entire home screen styled in sleek obsidian black with gold accents       */}
      {/* ========================================================================= */}
      {activeTheme === 'black' && (
        <div className="theme-noir-black-wrapper">
          {/* Hero Banner with Dark Stage */}
          <CuratedBundlesHero transparentBg={false} theme="black" />

          {/* Manifesto Quote Banner */}
          <ProManifestoBanner transparentBg={false} theme="black" />

          {/* 4-Product Signature Showcase Floating Shelf in Noir Black */}
          <SignatureProductsShowcase transparentBg={false} theme="black" />

          {/* Authentic Pro Salon Gear in Noir Black & Gold */}
          <SalonProGearShowcase theme="black" />

          {/* Visual 12-Tile Category Grid in Noir Black */}
          <ShopByCategory theme="black" />

          {/* Official Authorized Brand Partners in Noir Black */}
          <BrandPartnersShowcase theme="black" />

          {/* Instagram / Stylist Community Social Grid in Noir Black */}
          <SalonCommunityGrid theme="black" />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DUAL ALTERNATING THEME (ONE BY ONE)                                    */}
      {/* Alternates wavy and black sections one by one across the home page        */}
      {/* ========================================================================= */}
      {activeTheme === 'alternating' && (
        <div className="theme-alternating-wrapper">
          {/* 1. Hero Banner: WAVY BACKGROUND */}
          <div className="wavy-alternating-band">
            <CuratedBundlesHero transparentBg={true} theme="wavy" />
          </div>

          {/* 2. Pro Station Gear & Products: SLEEK BLACK */}
          <div className="black-alternating-band">
            <SalonProGearShowcase theme="black" />
          </div>

          {/* 3. Manifesto & Signature 4-Product Shelf: WAVY BACKGROUND */}
          <div className="wavy-alternating-band">
            <ProManifestoBanner transparentBg={true} theme="wavy" />
            <SignatureProductsShowcase transparentBg={true} theme="wavy" />
          </div>

          {/* 4. Shop By Category: SLEEK BLACK */}
          <div className="black-alternating-band">
            <ShopByCategory theme="black" />
          </div>

          {/* 5. Official Brand Partners Showcase: WAVY BACKGROUND */}
          <div className="wavy-alternating-band">
            <BrandPartnersShowcase theme="wavy" />
          </div>

          {/* 6. Instagram Stylist Community Grid: SLEEK BLACK */}
          <div className="black-alternating-band">
            <SalonCommunityGrid theme="black" />
          </div>
        </div>
      )}

      {/* Exclusive 10% Pro Discount Newsletter Modal */}
      <TradeNewsletterModal />

      <style jsx>{`
        @media (min-width: 768px) {
          .theme-desktop-tip {
            display: inline !important;
          }
        }
      `}</style>
    </>
  );
}
