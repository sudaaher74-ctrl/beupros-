'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export function SalonIsFashion() {
  return (
    <section
      style={{
        backgroundColor: '#18181b',
        color: '#ffffff',
        padding: '90px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#f59e0b',
            marginBottom: '20px',
          }}
        >
          <Sparkles size={14} />
          <span>STYLIST APPAREL & WORKWEAR</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(38px, 5.5vw, 76px)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#ffffff',
            margin: '0 0 20px',
            fontFamily: 'var(--font-main)',
          }}
        >
          SALON IS FASHION
        </h2>

        <p
          style={{
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            color: '#d4d4d8',
            maxWidth: '680px',
            margin: '0 auto 36px',
            lineHeight: 1.5,
          }}
        >
          From waterproof colorist aprons to runway-inspired styling kimonos and ergonomic technician wear — elevate your personal brand behind the chair.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link
            href="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#ffffff',
              color: '#111111',
              padding: '16px 42px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f59e0b';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#111111';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>SHOP SALONWEAR</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
