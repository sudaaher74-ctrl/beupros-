import React from 'react';

export function SpiceManifesto() {
  return (
    <section
      style={{
        backgroundImage: 'url(/spice-suite/camo-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '54px 28px',
        textAlign: 'center',
        color: '#ffffff',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
        }}
      >
        <blockquote
          style={{
            fontSize: 'clamp(22px, 2.5vw, 34px)',
            fontWeight: 800,
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
            margin: 0,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            fontFamily: 'var(--font-main)',
          }}
        >
          &ldquo;An incubator for dreamers. A coven for the curious culinary. An impeccably dressed plate with global
          adornments. A love letter to Black food &amp; culture.&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
