'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function SpiceBestDressed() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: '#1d1d1d',
        color: '#ffffff',
        padding: '0 0 0 0',
        overflow: 'hidden',
      }}
    >
      <div
        className="spice-best-dressed-grid"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'stretch',
          minHeight: '640px',
        }}
      >
        {/* Left Column: Founder Photo */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '520px',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/spice-suite/founder.jpg"
            alt="The Spice Suite Founder"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          {/* Watermark credit */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '28px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffffff',
              textShadow: '0 2px 6px rgba(0,0,0,0.8)',
              letterSpacing: '0.04em',
            }}
          >
            @DFinneyPhoto
          </div>
        </div>

        {/* Right Column: Editorial Text & Action */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '60px 60px 60px 80px',
            gap: '24px',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(42px, 5.2vw, 76px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#ffffff',
              margin: 0,
              fontFamily: 'var(--font-main)',
            }}
          >
            BEST
            <br />
            DRESSED
            <br />
            KITCHEN
          </h2>

          <h3
            style={{
              fontSize: '28px',
              fontWeight: 400,
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#e0e0e0',
              margin: 0,
              letterSpacing: '0.02em',
            }}
          >
            The Spice Suite...
          </h3>

          <p
            style={{
              fontSize: 'clamp(20px, 2.1vw, 27px)',
              fontWeight: 700,
              lineHeight: 1.35,
              color: '#ffffff',
              margin: 0,
              maxWidth: '540px',
              letterSpacing: '-0.01em',
            }}
          >
            Shop our sexy selection of KitchenWEAR to elevate your countertop and keep things steamy.
          </p>

          <div style={{ marginTop: '16px' }}>
            <Link
              href="/shop?category=KitchenWEAR"
              style={{
                display: 'inline-block',
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1.8px solid #ffffff',
                borderRadius: '9999px',
                padding: '16px 54px',
                fontSize: '13.5px',
                fontWeight: 700,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#1d1d1d';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .spice-best-dressed-grid {
            grid-template-columns: 1fr !important;
          }
          .spice-best-dressed-grid div:first-child {
            height: 480px !important;
          }
          .spice-best-dressed-grid div:last-child {
            padding: 40px 24px !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
