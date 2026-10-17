'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export function CuratedBundlesHero() {
  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)',
          position: 'relative',
          padding: '70px 36px 80px',
          overflow: 'hidden',
          minHeight: '620px',
          display: 'flex',
          alignItems: 'center',
          color: '#ffffff',
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="beupros-hero-grid"
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: '50px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Left Column: Beupros Luxury Pro Box Visual */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <Image
              src="/images/beupros-pro-box-bundle.jpg"
              alt="Beupros Pro Box Premium Salon Collection"
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            {/* Floating Tag */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(10px)',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
              }}
            >
              <Sparkles size={13} color="#f59e0b" />
              <span>BEUPROS PRO BOX • CURATED TRADE BUNDLE</span>
            </div>
          </div>

          {/* Right Column: Reference Typography & Button */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '24px',
              paddingLeft: '10px',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(42px, 5.4vw, 80px)',
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                margin: 0,
                color: '#ffffff',
                fontFamily: 'var(--font-main)',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              CHOOSE YOUR
              <br />
              FAVORITE STYLE!
            </h1>

            <p
              style={{
                fontSize: 'clamp(18px, 1.8vw, 24px)',
                fontWeight: 600,
                lineHeight: 1.35,
                color: 'rgba(255, 255, 255, 0.92)',
                margin: 0,
                maxWidth: '560px',
                textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              }}
            >
              No matter your specialty, our ProBox, ProBag or SalonWEAR bundle gets you a curated variety of professional beauty essentials.
            </p>

            <div style={{ marginTop: '8px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                href="/shop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: '2px solid #ffffff',
                  borderRadius: '9999px',
                  padding: '16px 42px',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#111111';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>SHOP NOW</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/shop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '9999px',
                  padding: '16px 36px',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>EXPLORE 4,200+ PRODUCTS</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 900px) {
          .beupros-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            text-align: center;
          }
          .beupros-hero-grid div:last-child {
            align-items: center !important;
            padding-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
