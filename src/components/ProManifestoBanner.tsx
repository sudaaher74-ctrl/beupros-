'use client';

import React from 'react';

export function ProManifestoBanner({
  transparentBg = true,
  theme = 'wavy',
}: {
  transparentBg?: boolean;
  theme?: 'wavy' | 'black';
} = {}) {
  const isBlack = theme === 'black';

  return (
    <section
      className="pro-manifesto-section"
      style={{
        backgroundColor: transparentBg ? 'transparent' : isBlack ? '#050505' : '#0c0a09',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        zIndex: 2,
        borderTop: isBlack ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        borderBottom: isBlack ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <blockquote
          className="manifesto-quote"
          style={{
            margin: 0,
            padding: 0,
            fontSize: 'clamp(18px, 2.5vw, 34px)',
            fontWeight: 800,
            lineHeight: 1.35,
            letterSpacing: '-0.015em',
            color: '#ffffff',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.45)',
          }}
        >
          &ldquo;An incubator for dreamers. A haven for the curious colorist.
          <br className="manifesto-br" />
          {' '}Impeccably formulated salon standards with global adornments.
          <br className="manifesto-br" />
          {' '}A love letter to salon craft &amp; beauty culture.&rdquo;
        </blockquote>

        <div
          style={{
            marginTop: '18px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.85)',
            textShadow: '0 1px 6px rgba(0, 0, 0, 0.4)',
          }}
        >
          — THE BEUPROS SALON DIRECTIVE
        </div>
      </div>

      <style jsx>{`
        .pro-manifesto-section {
          padding: 60px 24px 50px;
        }
        @media (max-width: 768px) {
          .pro-manifesto-section {
            padding: 34px 18px 30px !important;
          }
          .manifesto-br {
            display: none;
          }
          .manifesto-quote {
            font-size: 17px !important;
            line-height: 1.45 !important;
          }
        }
      `}</style>
    </section>
  );
}
