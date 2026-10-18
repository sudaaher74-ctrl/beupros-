'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function SalonIsFashion({ transparentBg = true }: { transparentBg?: boolean } = {}) {
  return (
    <section
      style={{
        backgroundColor: transparentBg ? 'transparent' : '#f04e23',
        padding: '80px 32px 100px',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      <div
        className="beupros-fashion-container"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          alignItems: 'center',
          gap: '48px',
        }}
      >
        {/* =============================================================== */}
        {/* LEFT COLUMN: HEADLINE, SUBTITLE & WHITE OUTLINE "SHOP NOW" BUTTON */}
        {/* =============================================================== */}
        <div style={{ color: '#ffffff', maxWidth: '580px' }}>
          <h2
            style={{
              fontSize: 'clamp(44px, 5.8vw, 84px)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              lineHeight: 0.98,
              color: '#ffffff',
              margin: '0 0 24px 0',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.45)',
            }}
          >
            SALON IS
            <br />
            FASHION
          </h2>

          <p
            style={{
              fontSize: 'clamp(17px, 1.8vw, 22px)',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.45,
              margin: '0 0 36px 0',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.35)',
              opacity: 0.95,
            }}
          >
            We got more drip than developer. Shop our salon-inspired apparel, bags, stylist caps, and more...
          </p>

          <Link
            href="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px 44px',
              borderRadius: '9999px',
              border: '2.5px solid #ffffff',
              backgroundColor: 'transparent',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#0f172a';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)';
            }}
          >
            SHOP NOW
          </Link>
        </div>

        {/* =============================================================== */}
        {/* RIGHT COLUMN: MERCH LINEUP (SWEATSHIRT, TOTE BAG, DAD CAP)       */}
        {/* Exactly mirroring Screenshot 2 (thespicesuite.com Food is Fashion)*/}
        {/* =============================================================== */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Main Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              height: '420px',
            }}
          >
            {/* 1. Dark Heavyweight Crewneck Sweatshirt (Center / Left) */}
            <div
              style={{
                position: 'absolute',
                left: '10px',
                top: '20px',
                width: '320px',
                height: '360px',
                zIndex: 2,
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
              }}
            >
              <svg viewBox="0 0 320 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                {/* Sweatshirt Silhouette */}
                <path
                  d="M 100 20 C 130 35 190 35 220 20 L 290 60 L 315 150 L 265 170 L 250 115 L 250 330 L 70 330 L 70 115 L 55 170 L 5 150 L 30 60 Z"
                  fill="#0c111d"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
                {/* Collar Ribbing */}
                <path d="M 105 22 C 135 37 185 37 215 22" fill="none" stroke="#334155" strokeWidth="4" />
                <path d="M 115 26 C 138 38 182 38 205 26" fill="none" stroke="#64748b" strokeWidth="1.5" />
                
                {/* Center Graphic Emblem (Ornate Salon Crest) */}
                <g transform="translate(160, 160)">
                  {/* Outer Circular Ring with Stars */}
                  <circle cx="0" cy="0" r="62" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="0" cy="0" r="56" fill="none" stroke="#ffffff" strokeWidth="1" />
                  
                  {/* Scissors & Comb Crest Icon */}
                  <path d="M -16 -22 L 16 22 M 16 -22 L -16 22" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="-16" cy="-22" r="5" fill="none" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="16" cy="-22" r="5" fill="none" stroke="#ffffff" strokeWidth="2" />
                  
                  {/* Text Arcs */}
                  <text x="0" y="-36" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="3">
                    BEUPROS
                  </text>
                  <text x="0" y="38" fill="#ffffff" fontSize="9" fontWeight="800" textAnchor="middle" letterSpacing="2">
                    SALON ATELIER
                  </text>
                  <text x="0" y="48" fill="#ffffff" fontSize="7" fontWeight="700" textAnchor="middle" letterSpacing="1">
                    2024
                  </text>
                </g>
              </svg>
            </div>

            {/* 2. Natural Canvas Tote Bag (Right Side) */}
            <div
              style={{
                position: 'absolute',
                right: '10px',
                top: '30px',
                width: '210px',
                height: '340px',
                zIndex: 3,
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.45))',
                transform: 'rotate(2deg)',
              }}
            >
              <svg viewBox="0 0 210 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                {/* Tote Straps */}
                <path
                  d="M 50 120 C 50 20 80 10 105 10 C 130 10 160 20 160 120"
                  fill="none"
                  stroke="#e2d8c3"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  d="M 50 120 C 50 20 80 10 105 10 C 130 10 160 20 160 120"
                  fill="none"
                  stroke="#c7bba2"
                  strokeWidth="2"
                />

                {/* Bag Body (Canvas Texture Color) */}
                <rect x="25" y="110" width="160" height="215" rx="8" fill="#ede5d2" stroke="#d5c8ad" strokeWidth="2" />

                {/* Repeating Red Graphic Text: "SALON IS FASHION" like Screenshot 2 */}
                <g transform="translate(105, 140)">
                  {[
                    { y: 15, opacity: 0.35, size: 9 },
                    { y: 28, opacity: 0.5, size: 9.5 },
                    { y: 42, opacity: 0.7, size: 10 },
                    { y: 58, opacity: 1, size: 11.5, bold: true }, // Main Red Solid
                    { y: 74, opacity: 0.7, size: 10 },
                    { y: 88, opacity: 0.5, size: 9.5 },
                    { y: 101, opacity: 0.35, size: 9 },
                  ].map((row, i) => (
                    <text
                      key={i}
                      x="0"
                      y={row.y}
                      fill="#d01c36"
                      fontSize={row.size}
                      fontWeight={row.bold ? '900' : '700'}
                      textAnchor="middle"
                      letterSpacing="0.08em"
                      opacity={row.opacity}
                    >
                      SALON IS FASHION
                    </text>
                  ))}
                </g>
              </svg>
            </div>

            {/* 3. Black Embroidered Dad Cap (Bottom Center / Foreground) */}
            <div
              style={{
                position: 'absolute',
                right: '75px',
                bottom: '10px',
                width: '180px',
                height: '140px',
                zIndex: 4,
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.6))',
                transform: 'rotate(-4deg)',
              }}
            >
              <svg viewBox="0 0 180 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                {/* Crown Dome */}
                <path
                  d="M 25 80 C 25 35 60 15 95 15 C 130 15 160 35 160 80 Z"
                  fill="#0f172a"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
                {/* Front Seams */}
                <path d="M 95 15 L 95 80" stroke="#1e293b" strokeWidth="1.5" />
                <path d="M 60 30 C 65 50 68 70 70 80" stroke="#1e293b" strokeWidth="1.2" opacity="0.7" />
                <path d="M 130 30 C 125 50 122 70 120 80" stroke="#1e293b" strokeWidth="1.2" opacity="0.7" />

                {/* Curved Visor / Brim */}
                <path
                  d="M 15 80 C 15 75 35 70 95 70 C 155 70 175 75 175 80 C 170 115 125 125 95 125 C 65 125 20 115 15 80 Z"
                  fill="#090d16"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
                {/* Visor Stitching Lines */}
                <path d="M 30 85 C 50 102 140 102 160 85" fill="none" stroke="#334155" strokeWidth="1" />
                <path d="M 40 92 C 60 108 130 108 150 92" fill="none" stroke="#334155" strokeWidth="1" />

                {/* Button on top */}
                <circle cx="95" cy="15" r="4.5" fill="#1e293b" />

                {/* Embroidered White Text: "WE GOT STYLE AT SALON" like Screenshot 2 */}
                <text
                  x="95"
                  y="52"
                  fill="#ffffff"
                  fontSize="7.5"
                  fontWeight="900"
                  textAnchor="middle"
                  letterSpacing="0.1em"
                >
                  WE GOT STYLE
                </text>
                <text
                  x="95"
                  y="63"
                  fill="#ffffff"
                  fontSize="7"
                  fontWeight="800"
                  textAnchor="middle"
                  letterSpacing="0.08em"
                >
                  AT SALON
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .beupros-fashion-container {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}
