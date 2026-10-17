'use client';

import React from 'react';
import { Quote } from 'lucide-react';

export function ProManifestoBanner() {
  return (
    <section
      style={{
        backgroundColor: '#0c0a09',
        color: '#ffffff',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        borderTop: '1px solid #1c1917',
        borderBottom: '1px solid #1c1917',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.04,
          pointerEvents: 'none',
        }}
      >
        <Quote size={320} color="#ffffff" />
      </div>

      <div
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#f59e0b',
            marginBottom: '28px',
          }}
        >
          OUR PROFESSIONAL PHILOSOPHY
        </span>

        <blockquote
          style={{
            margin: 0,
            padding: 0,
            fontSize: 'clamp(24px, 3.2vw, 42px)',
            fontWeight: 900,
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#ffffff',
            fontFamily: 'var(--font-main)',
          }}
        >
          “BEUPROS EXISTS TO EMPOWER LICENSED SALONS, INDEPENDENT COLORISTS, AND BEAUTY PROS WITH 100% AUTHENTIC WHOLESALE FORMULATIONS, GENUINE TRADE SAVINGS, AND FAST DISPATCH.”
        </blockquote>

        <div
          style={{
            marginTop: '32px',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#a8a29e',
          }}
        >
          — THE BEUPROS WHOLESALE DIRECTIVE
        </div>
      </div>
    </section>
  );
}
