'use client';

import React from 'react';

export function TradeNoticeBanner() {
  return (
    <section
      style={{
        backgroundColor: '#e8e6ed',
        padding: '20px 24px',
        textAlign: 'center',
        borderBottom: '1px solid #dcdae3',
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          fontSize: '15px',
          fontWeight: 700,
          lineHeight: 1.5,
          color: '#1a1a1a',
          letterSpacing: '-0.01em',
          fontFamily: 'var(--font-main)',
        }}
      >
        Welcome to Beupros Wholesale: Our curated trade packages (ProBox, ProBag, and SalonWEAR) deliver complete salon-station solutions with wholesale savings and same-day priority dispatch.
      </div>
    </section>
  );
}
