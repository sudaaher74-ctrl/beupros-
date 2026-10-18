'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function CuratedBundlesHero({
  transparentBg = false,
  theme = 'wavy',
}: {
  transparentBg?: boolean;
  theme?: 'wavy' | 'black';
} = {}) {
  const isBlack = theme === 'black';

  return (
    <div style={{ backgroundColor: transparentBg ? 'transparent' : isBlack ? '#000000' : '#f04e23' }}>
      {/* Hero Banner */}
      <section
        className="beupros-hero-section"
        style={{
          position: 'relative',
          padding: '70px 32px 85px',
          overflow: 'hidden',
          minHeight: '620px',
          display: 'flex',
          alignItems: 'center',
          color: '#ffffff',
          backgroundImage: transparentBg
            ? 'none'
            : isBlack
            ? 'radial-gradient(ellipse at 75% 35%, rgba(245, 158, 11, 0.15) 0%, rgba(15, 15, 20, 0.96) 55%, #000000 100%)'
            : 'url(/images/retro-wavy-hero-bg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className="beupros-hero-container"
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            alignItems: 'center',
            gap: '40px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* =============================================================== */}
          {/* LEFT: 3D SALON PRODUCT LINEUP & PRO BOX STAGE */}
          {/* =============================================================== */}
          <div
            className="beupros-hero-stage-column"
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '420px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            {/* Grounding Oval Shadow under entire product cluster */}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '5%',
                width: '90%',
                height: '45px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(30, 0, 15, 0.7) 0%, rgba(30,0,15,0) 70%)',
                filter: 'blur(8px)',
                zIndex: 1,
              }}
            />

            {/* Product Stage Cluster */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '640px',
                height: '380px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              {/* 1. Large 3D Perspective Pro Box in Background Left (Inspired by Drop Biscuit Mix box) */}
              <div
                style={{
                  position: 'absolute',
                  left: '0px',
                  bottom: '15px',
                  width: '230px',
                  height: '340px',
                  backgroundColor: '#9d023b',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '-10px 20px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0,0,0,0.2)',
                  overflow: 'hidden',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '18px',
                  color: '#ffffff',
                  transform: 'rotate(-3deg) translateY(-5px)',
                }}
              >
                {/* Box Header */}
                <div>
                  <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
                    PRO SALON SELECTION
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 900, lineHeight: 1.05, marginTop: '4px', letterSpacing: '-0.02em' }}>
                    BeuPROS
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#fcd34d', textTransform: 'uppercase', marginTop: '2px' }}>
                    SALON IS FASHION
                  </div>
                </div>

                {/* Box Center Graphic */}
                <div style={{ margin: 'auto 0', textAlign: 'center' }}>
                  <div
                    style={{
                      width: '110px',
                      height: '110px',
                      borderRadius: '50%',
                      margin: '0 auto',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px dashed rgba(255, 255, 255, 0.4)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                    }}
                  >
                    <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>PRO TRADE</span>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#fcd34d' }}>BOX</span>
                    <span style={{ fontSize: '9px', opacity: 0.8 }}>CURATED KIT</span>
                  </div>
                </div>

                {/* Box Footer */}
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 800 }}>EST. WHOLESALE</div>
                    <div style={{ fontSize: '8px', opacity: 0.75 }}>VERIFIED SALON PROS</div>
                  </div>
                  <div style={{ fontSize: '8px', fontWeight: 700, opacity: 0.75 }}>NET WT. 10 LBS</div>
                </div>
              </div>

              {/* 2. Jar 1: Asta Berry Wine Facial Kit (Left Foreground Jar) */}
              <div
                style={{
                  position: 'absolute',
                  left: '140px',
                  bottom: '10px',
                  width: '125px',
                  height: '160px',
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 18px 30px rgba(0, 0, 0, 0.45)',
                  border: '3px solid #ffffff',
                  overflow: 'hidden',
                  zIndex: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease',
                }}
              >
                {/* Black Screw Lid */}
                <div style={{ height: '22px', backgroundColor: '#111111', borderBottom: '2px solid #222222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '40px', height: '2px', backgroundColor: '#444444' }} />
                </div>
                {/* Product Image */}
                <div style={{ flex: 1, position: 'relative', backgroundColor: '#fafafa' }}>
                  <Image
                    src="/product-images/d156ecd4e3536f793f0c.jpg"
                    alt="Asta Berry Wine Facial Kit"
                    fill
                    sizes="130px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                {/* Product Trade Label */}
                <div style={{ padding: '4px 6px', backgroundColor: '#111111', color: '#ffffff', textAlign: 'center' }}>
                  <div style={{ fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    FACIAL KIT
                  </div>
                  <div style={{ fontSize: '7px', color: '#e5b95f' }}>WINE TREATMENT</div>
                </div>
              </div>

              {/* 3. Centerpiece Tall Bottle (Inspired by the Lemon Pepper Hot Sauce Bottle in reference!) */}
              <div
                style={{
                  position: 'absolute',
                  left: '240px',
                  bottom: '8px',
                  width: '135px',
                  height: '275px',
                  zIndex: 6,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Black Dispenser Neck / Cap */}
                <div
                  style={{
                    width: '32px',
                    height: '36px',
                    backgroundColor: '#18181b',
                    borderRadius: '4px 4px 0 0',
                    border: '1px solid #333333',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    zIndex: 2,
                    marginBottom: '-2px',
                  }}
                />
                {/* Bottle Body */}
                <div
                  style={{
                    width: '100%',
                    height: '240px',
                    backgroundColor: '#ffffff',
                    borderRadius: '24px 24px 14px 14px',
                    border: '3px solid #ffffff',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.55)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                >
                  <div style={{ flex: 1, position: 'relative', backgroundColor: '#fcfcfc' }}>
                    <Image
                      src="/product-images/adc6027794b88762e89c.jpg"
                      alt="Berina Hair Heat Protector Serum"
                      fill
                      sizes="140px"
                      priority
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  {/* Central Trade Label */}
                  <div style={{ padding: '6px 8px', backgroundColor: '#0f172a', color: '#ffffff', textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f59e0b' }}>
                      BEUPROS PRO
                    </div>
                    <div style={{ fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      HEAT PROTECTOR
                    </div>
                    <div style={{ fontSize: '7px', color: '#94a3b8' }}>230 ML • PRO SALON</div>
                  </div>
                </div>
              </div>

              {/* 4. Bottle 2: Brasil Cacau Anti-Frizz Treatment (Right Center Bottle) */}
              <div
                style={{
                  position: 'absolute',
                  left: '355px',
                  bottom: '12px',
                  width: '125px',
                  height: '230px',
                  backgroundColor: '#ffffff',
                  borderRadius: '18px 18px 12px 12px',
                  border: '3px solid #ffffff',
                  boxShadow: '0 16px 32px rgba(0, 0, 0, 0.45)',
                  overflow: 'hidden',
                  zIndex: 5,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* White Top Cap */}
                <div style={{ height: '20px', backgroundColor: '#18181b', borderBottom: '1px solid #333' }} />
                <div style={{ flex: 1, position: 'relative', backgroundColor: '#ffffff' }}>
                  <Image
                    src="/product-images/20353ab028fe675fc871.jpg"
                    alt="Brasil Cacau Anti Frizz Conditioner"
                    fill
                    sizes="130px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '5px 6px', backgroundColor: '#111111', color: '#ffffff', textAlign: 'center' }}>
                  <div style={{ fontSize: '8px', fontWeight: 800, textTransform: 'uppercase' }}>ANTI FRIZZ</div>
                  <div style={{ fontSize: '7px', color: '#e5b95f' }}>CONDITIONER 300ML</div>
                </div>
              </div>

              {/* 5. Jar 3: Lotus Hand & Foot Massage Cream (Right-hand jar, matching Flavored Honey in reference!) */}
              <div
                style={{
                  position: 'absolute',
                  left: '460px',
                  bottom: '10px',
                  width: '135px',
                  height: '155px',
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  border: '3px solid #ffffff',
                  boxShadow: '0 18px 30px rgba(0, 0, 0, 0.45)',
                  overflow: 'hidden',
                  zIndex: 4,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Black Jar Lid */}
                <div style={{ height: '22px', backgroundColor: '#111111', borderBottom: '2px solid #222222' }} />
                <div style={{ flex: 1, position: 'relative', backgroundColor: '#fafafa' }}>
                  <Image
                    src="/product-images/27266123a61d9aa89911.jpg"
                    alt="Lotus Hand & Foot Massage Cream"
                    fill
                    sizes="140px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '5px 6px', backgroundColor: '#111111', color: '#ffffff', textAlign: 'center' }}>
                  <div style={{ fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    MASSAGE CREAM
                  </div>
                  <div style={{ fontSize: '7px', color: '#f59e0b' }}>CITRUS SPA 300G</div>
                </div>
              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* RIGHT: TYPOGRAPHY, SUBTITLE & SHOP NOW PILL BUTTON */}
          {/* =============================================================== */}
          <div
            className="beupros-hero-typography"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '24px',
              paddingLeft: '10px',
            }}
          >
            {/* Massive Bold Headline */}
            <h1
              className="beupros-hero-headline"
              style={{
                fontSize: 'clamp(34px, 5vw, 84px)',
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                textTransform: 'uppercase',
                margin: 0,
                color: '#ffffff',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                textShadow: '0 6px 25px rgba(0,0,0,0.3)',
              }}
            >
              CHOOSE YOUR
              <br className="hero-desktop-br" />
              {' '}FAVORITE STYLE!
            </h1>

            {/* Subtitle */}
            <p
              className="beupros-hero-subhead"
              style={{
                fontSize: 'clamp(15px, 1.8vw, 24px)',
                fontWeight: 700,
                lineHeight: 1.4,
                color: '#ffffff',
                margin: 0,
                maxWidth: '560px',
                textShadow: '0 3px 12px rgba(0,0,0,0.25)',
              }}
            >
              No matter your taste, our ProBox, ProBag or Salon Essentials Crate gets you a variety of salon essentials.
            </p>

            {/* Iconic Wide Pill Button */}
            <div style={{ marginTop: '8px' }}>
              <Link
                href="/shop"
                className="beupros-hero-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: '3px solid #ffffff',
                  borderRadius: '9999px',
                  padding: '16px 54px',
                  fontSize: '15px',
                  fontWeight: 900,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#b80c55';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)';
                }}
              >
                <span>SHOP NOW</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive adjustments */}
      <style jsx>{`
        @media (max-width: 960px) {
          .beupros-hero-section {
            padding: 36px 16px 44px !important;
            min-height: auto !important;
          }
          .beupros-hero-container {
            display: flex !important;
            flex-direction: column-reverse !important;
            gap: 28px !important;
            text-align: center !important;
          }
          .beupros-hero-typography {
            align-items: center !important;
            padding-left: 0 !important;
            gap: 16px !important;
          }
          .beupros-hero-subhead {
            max-width: 440px !important;
            font-size: 15px !important;
          }
          .hero-desktop-br {
            display: inline;
          }
          .beupros-hero-stage-column {
            min-height: auto !important;
            transform: scale(0.78) !important;
            transform-origin: center top !important;
            margin-bottom: -70px !important;
            margin-top: 0 !important;
          }
          :global(.beupros-hero-btn) {
            padding: 13px 40px !important;
            font-size: 13px !important;
            letter-spacing: 0.18em !important;
          }
        }
        @media (max-width: 440px) {
          .beupros-hero-stage-column {
            transform: scale(0.7) !important;
            margin-bottom: -100px !important;
          }
          :global(.beupros-hero-headline) {
            font-size: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
