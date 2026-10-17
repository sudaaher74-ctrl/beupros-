import React from 'react';

export function SpiceNoticeBanner() {
  return (
    <section
      style={{
        backgroundColor: '#e6e4ec',
        padding: '24px 20px',
        textAlign: 'center',
        borderBottom: '1px solid #dcd9e3',
      }}
    >
      <div
        style={{
          maxWidth: '920px',
          margin: '0 auto',
          fontSize: '15.5px',
          fontWeight: 700,
          lineHeight: 1.5,
          color: '#111111',
          letterSpacing: '-0.01em',
          fontFamily: 'var(--font-main)',
        }}
      >
        Unfortunately, we do not sell individual items online. Our e-commerce model is to provide you a range of
        products in one package via our SpiceBox, SpiceBag or KitchenWEAR box. This allows us to get you a variety of
        flavor and get it to you quickly.
      </div>
    </section>
  );
}
