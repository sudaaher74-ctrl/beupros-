'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function SpiceHero() {
  return (
    <section
      className="spice-hero-section"
      style={{
        backgroundImage: 'url(/spice-suite/camo-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        padding: '60px 40px 80px',
        overflow: 'hidden',
        minHeight: '620px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="spice-hero-container"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        {/* Left Side: Product Showcase */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '680px',
              aspectRatio: '1042 / 710',
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.35))',
              transition: 'transform 0.4s ease',
            }}
          >
            <Image
              src="/spice-suite/hero-products.png"
              alt="The Spice Suite Products and Boxes"
              fill
              priority
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right Side: Headline and CTA */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '24px',
            color: '#ffffff',
            paddingLeft: '20px',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(40px, 5.2vw, 76px)',
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: 0,
              fontFamily: 'var(--font-main)',
              color: '#ffffff',
              textShadow: '0 2px 12px rgba(0,0,0,0.25)',
            }}
          >
            CHOOSE YOUR
            <br />
            FAVORITE STYLE!
          </h1>

          <p
            style={{
              fontSize: 'clamp(18px, 1.8vw, 25px)',
              fontWeight: 600,
              lineHeight: 1.35,
              color: 'rgba(255, 255, 255, 0.95)',
              margin: 0,
              maxWidth: '560px',
              textShadow: '0 1px 8px rgba(0,0,0,0.25)',
            }}
          >
            No matter your taste, our SpiceBox, SpiceBag or KitchenWEAR box gets you a variety of flavor.
          </p>

          <div style={{ marginTop: '12px' }}>
            <Link
              href="/shop?category=Bags%20%2B%20Boxes"
              style={{
                display: 'inline-block',
                backgroundColor: '#202020',
                color: '#ffffff',
                padding: '16px 52px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 14px 28px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#202020';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
              }}
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .spice-hero-container {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          .spice-hero-container div:last-child {
            align-items: center !important;
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
