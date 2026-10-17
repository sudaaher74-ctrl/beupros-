import React from 'react';

export function SpiceAnnouncementBar() {
  return (
    <div
      style={{
        backgroundColor: '#1d1d1d',
        color: '#ffffff',
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        borderTop: '1px solid #282828',
        borderBottom: '1px solid #282828',
      }}
    >
      {/* Gift Box with Sparkles Icon */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="M20 12v8H4v-8" />
        <path d="M22 7H2v5h20V7z" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        {/* Sparkles */}
        <circle cx="21" cy="3" r="1" fill="#ffffff" />
        <circle cx="3" cy="2" r="1" fill="#ffffff" />
      </svg>

      <span
        style={{
          fontSize: '15px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          textAlign: 'center',
          fontFamily: 'var(--font-main)',
        }}
      >
        CHECK OUR{' '}
        <a
          href="https://www.facebook.com/TheSpiceSuite/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'underline', color: '#ffffff' }}
        >
          FACEBOOK
        </a>{' '}
        AND{' '}
        <a
          href="https://www.instagram.com/thespicesuite/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'underline', color: '#ffffff' }}
        >
          INSTAGRAM
        </a>{' '}
        PAGES FOR SECRET RELEASES
      </span>
    </div>
  );
}
