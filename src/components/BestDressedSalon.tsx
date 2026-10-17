'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Scissors } from 'lucide-react';

export function BestDressedSalon() {
  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        padding: '90px 24px',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <div
        className="beupros-split-section"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        {/* Left Column: High-fashion Stylist Editorial Image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4 / 5',
            maxHeight: '620px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 48px rgba(0,0,0,0.12)',
          }}
        >
          <Image
            src="/images/beupros-stylist.jpg"
            alt="Beupros Master Salon Stylist"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
              backgroundColor: 'rgba(17, 17, 17, 0.85)',
              backdropFilter: 'blur(12px)',
              padding: '16px 20px',
              borderRadius: '14px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                SALON RESILIENCE & COMFORT
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>
                12-Hour Ergonomic Tech Apparel
              </div>
            </div>
            <Scissors size={20} color="#f59e0b" />
          </div>
        </div>

        {/* Right Column: Editorial Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#b45309',
              marginBottom: '12px',
            }}
          >
            BEUPROS PROFESSIONAL TOOLING & APPAREL
          </span>

          <h2
            style={{
              fontSize: 'clamp(36px, 4.4vw, 58px)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              color: '#111111',
              margin: '0 0 24px',
              fontFamily: 'var(--font-main)',
            }}
          >
            BEST DRESSED
            <br />
            SALON
          </h2>

          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.6,
              color: '#4b5563',
              marginBottom: '20px',
              maxWidth: '520px',
            }}
          >
            A high-performing salon requires more than just premium chemicals. It demands ergonomic styling aprons, bleach-resistant salon capes, Japanese steel shears, and station equipment built to withstand rigorous daily use.
          </p>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#6b7280',
              marginBottom: '32px',
              maxWidth: '520px',
            }}
          >
            Beupros curates industry-standard salon gear for studio owners, freelance colorists, and master technicians who believe presentation and craft go hand in hand.
          </p>

          <Link
            href="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#111111',
              color: '#ffffff',
              padding: '16px 36px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d97706';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#111111';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>SHOP SALON GEAR</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .beupros-split-section {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
