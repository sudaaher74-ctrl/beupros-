'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

const QUICK_CATEGORIES = [
  { name: 'Hair Color', image: '/images/categories/hair-color.jpg', href: '/shop?category=Hair' },
  { name: 'Hair Care', image: '/images/categories/hair-care.jpg', href: '/shop?category=Hair' },
  { name: 'Skin & Body', image: '/images/categories/skin-body.jpg', href: '/shop?category=Beauty' },
  { name: 'Tools & Dryers', image: '/images/categories/appliances.jpg', href: '/shop?category=Tools' },
  { name: 'Backbar Cans', image: '/images/categories/salon-essentials.jpg', href: '/shop?category=Commercial%20Cans' },
  { name: 'Nails & Spa', image: '/images/categories/nails.jpg', href: '/shop?category=Nails' },
  { name: 'Hot Deals', image: '/images/categories/deals.svg', href: '/deals' },
  { name: 'Masterclasses', image: '/images/categories/new.jpg', href: '/education' },
];

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
          padding: '50px 24px 60px',
          overflow: 'hidden',
          minHeight: '620px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
          {/* DESKTOP-ONLY: 3D SALON PRODUCT LINEUP & PRO BOX STAGE */}
          {/* =============================================================== */}
          <div
            className="beupros-hero-stage-column desktop-stage"
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
              {/* 1. Large 3D Perspective Pro Box in Background Left */}
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
                <div>
                  <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
                    PRO SALON SELECTION
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em', marginTop: '2px' }}>
                    BeuPROS
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    SALON IS FASHION
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    borderRadius: '50%',
                    width: '120px',
                    height: '120px',
                    alignSelf: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed rgba(255, 255, 255, 0.4)',
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.3)',
                    textAlign: 'center',
                    padding: '8px',
                  }}
                >
                  <div style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', color: '#f59e0b', letterSpacing: '0.05em' }}>
                    PRO TRADE
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff' }}>
                    BOX
                  </div>
                  <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                    CURATED KITS
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff' }}>
                    EST. WHOLESALE
                  </div>
                  <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                    VERIFIED SALON PROS
                  </div>
                </div>
              </div>

              {/* 2. Wine Facial Kit Box */}
              <div
                style={{
                  position: 'absolute',
                  left: '160px',
                  bottom: '10px',
                  width: '150px',
                  height: '170px',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  border: '3px solid #ffffff',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.45)',
                  overflow: 'hidden',
                  zIndex: 4,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ flex: 1, position: 'relative', backgroundColor: '#fafafa' }}>
                  <Image
                    src="/product-images/6573e04a43ee627346dc.jpg"
                    alt="Aroma Magic Wine Facial Kit"
                    fill
                    sizes="150px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '4px 6px', backgroundColor: '#1e1e24', color: '#ffffff', textAlign: 'center' }}>
                  <div style={{ fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    FACIAL KIT
                  </div>
                  <div style={{ fontSize: '7px', color: '#e5b95f' }}>WINE TREATMENT</div>
                </div>
              </div>

              {/* 3. Centerpiece Tall Bottle */}
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

              {/* 4. Bottle 2: Brasil Cacau Anti-Frizz Treatment */}
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

              {/* 5. Jar 3: Lotus Hand & Foot Massage Cream */}
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
          {/* TYPOGRAPHY, VALUE PROP & ACTION BUTTONS */}
          {/* =============================================================== */}
          <div
            className="beupros-hero-typography"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '20px',
              paddingLeft: '10px',
            }}
          >
            {/* Direct Authorized Trade Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                backdropFilter: 'blur(10px)',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#fef08a',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
              }}
            >
              <Sparkles size={14} color="#fef08a" />
              <span>DIRECT FROM BRAND WAREHOUSES</span>
            </div>

            {/* Massive Bold Headline */}
            <h1
              className="beupros-hero-headline"
              style={{
                fontSize: 'clamp(30px, 4.4vw, 68px)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                textTransform: 'uppercase',
                margin: 0,
                color: '#ffffff',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                textShadow: '0 6px 25px rgba(0,0,0,0.3)',
              }}
            >
              INDIA&apos;S PREMIER
              <br className="hero-desktop-br" />
              {' '}SALON TRADE
              <br className="hero-desktop-br" />
              {' '}MARKETPLACE
            </h1>

            {/* Subtitle */}
            <p
              className="beupros-hero-subhead"
              style={{
                fontSize: 'clamp(14px, 1.6vw, 20px)',
                fontWeight: 600,
                lineHeight: 1.5,
                color: 'rgba(255, 255, 255, 0.94)',
                margin: 0,
                maxWidth: '580px',
                textShadow: '0 3px 12px rgba(0,0,0,0.25)',
              }}
            >
              4,200+ authentic salon consumables, backbar supplies &amp; professional tools at verified wholesale pricing.
            </p>

            {/* Action Buttons Row */}
            <div
              className="hero-btn-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                marginTop: '6px',
              }}
            >
              <Link
                href="/shop"
                className="beupros-hero-btn primary-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  borderRadius: '9999px',
                  padding: '15px 36px',
                  fontSize: '14px',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.22s ease',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.28)',
                  cursor: 'pointer',
                }}
              >
                <span>SHOP WHOLESALE</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/register"
                className="beupros-hero-btn secondary-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.14)',
                  color: '#ffffff',
                  border: '2px solid rgba(255, 255, 255, 0.65)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '9999px',
                  padding: '14px 28px',
                  fontSize: '13px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.22s ease',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.18)',
                  cursor: 'pointer',
                }}
              >
                <ShieldCheck size={16} />
                <span>APPLY TRADE ACCOUNT</span>
              </Link>
            </div>

            {/* Value Pillars Badges */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                fontSize: '12px',
                fontWeight: 700,
                color: 'rgba(255, 255, 255, 0.92)',
                marginTop: '4px',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} color="#34d399" />
                <span>100% Genuine Brands</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={15} color="#38bdf8" />
                <span>Free Shipping ₹1,500+</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={15} color="#fcd34d" />
                <span>GST Input Credit</span>
              </div>
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* MOBILE HERO PRODUCT SHOWCASE CARD (FITS 100% ON PHONES) */}
        {/* =============================================================== */}
        <div className="mobile-hero-card-wrapper">
          <div className="mobile-hero-card">
            <div className="mobile-hero-card-header">
              <span className="mobile-card-tag">PRO SALON BESTSELLERS</span>
              <span className="mobile-card-rating">★ 4.9 Verified Trade</span>
            </div>

            <div className="mobile-card-products-grid">
              <Link href="/product/750" className="mobile-card-item">
                <div className="mobile-card-item-img">
                  <Image
                    src="/product-images/5db63c4f7c670f2bcec2.jpg"
                    alt="Brazilian Keratin"
                    fill
                    sizes="90px"
                    style={{ objectFit: 'contain' }}
                  />
                  <span className="item-badge">95% OFF</span>
                </div>
                <div className="item-title">Global Amazon Keratin</div>
                <div className="item-price">₹700 <span className="item-mrp">₹14,000</span></div>
              </Link>

              <Link href="/product/4" className="mobile-card-item">
                <div className="mobile-card-item-img">
                  <Image
                    src="/product-images/024f8a44c5b7d06ff573.jpg"
                    alt="Shower Gel 4500 ML"
                    fill
                    sizes="90px"
                    style={{ objectFit: 'contain' }}
                  />
                  <span className="item-badge">46% OFF</span>
                </div>
                <div className="item-title">Commercial Can 4.5L</div>
                <div className="item-price">₹700 <span className="item-mrp">₹1,295</span></div>
              </Link>

              <Link href="/product/6" className="mobile-card-item">
                <div className="mobile-card-item-img">
                  <Image
                    src="/product-images/c46d8590ae9e140188bb.jpg"
                    alt="Wax Heater"
                    fill
                    sizes="90px"
                    style={{ objectFit: 'contain' }}
                  />
                  <span className="item-badge">47% OFF</span>
                </div>
                <div className="item-title">Wax Heater &amp; Warmer</div>
                <div className="item-price">₹2,500 <span className="item-mrp">₹4,700</span></div>
              </Link>
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* QUICK CATEGORY CIRCLES RAIL (RESPONSIVE HORIZONTAL SCROLL) */}
        {/* =============================================================== */}
        <div className="quick-categories-section">
          <div className="quick-cat-header">
            <span className="quick-cat-label">POPULAR SALON DEPARTMENTS</span>
            <Link href="/shop" className="quick-cat-all-link">
              View All 4,200+ &rarr;
            </Link>
          </div>

          <div className="quick-categories-scroll hide-scrollbar">
            {QUICK_CATEGORIES.map((cat) => (
              <Link key={cat.name} href={cat.href} className="quick-cat-circle-item">
                <div className="quick-cat-circle-avatar">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="72px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <span className="quick-cat-circle-title">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Stylesheet */}
      <style jsx>{`
        /* Desktop vs Mobile Toggle */
        .desktop-stage {
          display: flex !important;
        }
        .mobile-hero-card-wrapper {
          display: none;
        }

        /* Quick Categories Rail */
        .quick-categories-section {
          width: 100%;
          max-width: 1440px;
          margin: 36px auto 0;
          position: relative;
          z-index: 3;
        }
        .quick-cat-header {
          display: flex;
          align-items: center;
          justifyContent: space-between;
          padding: 0 4px 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
          margin-bottom: 14px;
        }
        .quick-cat-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
        }
        .quick-cat-all-link {
          font-size: 12px;
          font-weight: 800;
          color: #fef08a;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .quick-cat-all-link:hover {
          opacity: 0.8;
        }
        .quick-categories-scroll {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 8px;
          -webkit-overflow-scrolling: touch;
        }
        .quick-cat-circle-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          flex-shrink: 0;
          width: 78px;
          transition: transform 0.2s ease;
        }
        .quick-cat-circle-item:hover {
          transform: translateY(-3px);
        }
        .quick-cat-circle-avatar {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #ffffff;
          border: 2px solid rgba(255, 255, 255, 0.85);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28);
        }
        .quick-cat-circle-title {
          font-size: 11.5px;
          font-weight: 700;
          color: #ffffff;
          text-align: center;
          line-height: 1.25;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
        }

        /* Mobile Breakpoint */
        @media (max-width: 960px) {
          .beupros-hero-section {
            padding: 32px 16px 36px !important;
            min-height: auto !important;
          }
          .beupros-hero-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
            text-align: left !important;
          }
          .beupros-hero-typography {
            align-items: flex-start !important;
            padding-left: 0 !important;
            gap: 14px !important;
            width: 100% !important;
          }
          .beupros-hero-headline {
            font-size: 28px !important;
            line-height: 1.12 !important;
            text-align: left !important;
          }
          .beupros-hero-subhead {
            font-size: 14px !important;
            line-height: 1.5 !important;
            text-align: left !important;
          }
          .hero-desktop-br {
            display: inline;
          }
          .hero-btn-row {
            width: 100% !important;
            flex-direction: column !important;
            gap: 10px !important;
          }
          :global(.beupros-hero-btn.primary-btn) {
            width: 100% !important;
            padding: 14px 20px !important;
            font-size: 13.5px !important;
            letter-spacing: 0.08em !important;
          }
          :global(.beupros-hero-btn.secondary-btn) {
            width: 100% !important;
            padding: 13px 20px !important;
            font-size: 12.5px !important;
            letter-spacing: 0.05em !important;
          }

          /* Hide Desktop Stage, Show Mobile Hero Card */
          .desktop-stage {
            display: none !important;
          }
          .mobile-hero-card-wrapper {
            display: block !important;
            width: 100% !important;
            margin-top: 18px !important;
          }
          .mobile-hero-card {
            background: rgba(255, 255, 255, 0.14);
            border: 1px solid rgba(255, 255, 255, 0.28);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border-radius: 18px;
            padding: 14px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          }
          .mobile-hero-card-header {
            display: flex;
            align-items: center;
            justifyContent: space-between;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.16);
          }
          .mobile-card-tag {
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.1em;
            color: #fef08a;
            text-transform: uppercase;
          }
          .mobile-card-rating {
            font-size: 10.5px;
            font-weight: 800;
            color: #ffffff;
          }
          .mobile-card-products-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          .mobile-card-item {
            background: #ffffff;
            border-radius: 12px;
            padding: 8px 6px;
            display: flex;
            flex-direction: column;
            text-decoration: none;
            color: #0f172a;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          }
          .mobile-card-item-img {
            position: relative;
            width: 100%;
            aspect-ratio: 1;
            margin-bottom: 6px;
            border-radius: 8px;
            overflow: hidden;
            background-color: #f8f9fa;
          }
          .item-badge {
            position: absolute;
            top: 4px;
            left: 4px;
            background: #0f172a;
            color: #ffffff;
            font-size: 8px;
            font-weight: 800;
            padding: 2px 4px;
            border-radius: 4px;
          }
          .item-title {
            font-size: 10.5px;
            font-weight: 800;
            line-height: 1.25;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 2px;
          }
          .item-price {
            font-size: 12px;
            font-weight: 900;
            color: #0f172a;
          }
          .item-mrp {
            font-size: 9.5px;
            color: #94a3b8;
            text-decoration: line-through;
            font-weight: 600;
          }

          /* Quick Categories adjustments for mobile */
          .quick-categories-section {
            margin-top: 24px !important;
          }
          .quick-categories-scroll {
            gap: 12px !important;
          }
          .quick-cat-circle-item {
            width: 66px !important;
          }
          .quick-cat-circle-avatar {
            width: 56px !important;
            height: 56px !important;
          }
          .quick-cat-circle-title {
            font-size: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}
