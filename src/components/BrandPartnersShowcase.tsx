'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface BrandCard {
  name: string;
  query: string;
  category: string;
  count: number;
  highlight: string;
}

const FEATURED_BRANDS: BrandCard[] = [
  {
    name: "L'Oréal Professionnel",
    query: "Loreal",
    category: "Hair Color & Care",
    count: 221,
    highlight: "Majirel & Serie Expert",
  },
  {
    name: "Schwarzkopf Professional",
    query: "Schwarzkopf",
    category: "Pro Color & Styling",
    count: 196,
    highlight: "Igora Royal & Osis+",
  },
  {
    name: "Wella Professionals",
    query: "Wella",
    category: "Color & Bonding",
    count: 163,
    highlight: "Koleston & Invigo",
  },
  {
    name: "Babila",
    query: "Babila",
    category: "Salon Tools & Brushes",
    count: 322,
    highlight: "Ergonomic Pro Gear",
  },
  {
    name: "Vega Professional",
    query: "Vega",
    category: "Clippers & Dryers",
    count: 156,
    highlight: "Heavy-Duty Salon Tools",
  },
  {
    name: "Lotus Professional",
    query: "Lotus",
    category: "Skin & Spa Formulations",
    count: 126,
    highlight: "Facial Kits & Scrubs",
  },
  {
    name: "Matrix",
    query: "Matrix",
    category: "Hair Care & Smoothing",
    count: 97,
    highlight: "Opti.Care & Biolage",
  },
  {
    name: "Ikonic Professional",
    query: "Ikonic",
    category: "Straighteners & Irons",
    count: 91,
    highlight: "Titanium Tech Plates",
  },
  {
    name: "Streax Professional",
    query: "Streax",
    category: "Argan Oil & Bleach",
    count: 110,
    highlight: "Canvoline Smoothing",
  },
  {
    name: "Blossom Kochhar",
    query: "Blossom Kochhar",
    category: "Aroma Magic Wellness",
    count: 82,
    highlight: "Ayurvedic Aromatherapy",
  },
  {
    name: "Berina",
    query: "Berina",
    category: "Heat Protection",
    count: 54,
    highlight: "Pro Styling Sprays",
  },
  {
    name: "Brasil Cacau",
    query: "Brasil Cacau",
    category: "Keratin Treatment",
    count: 28,
    highlight: "Anti-Frizz Smoothing",
  },
];

export function BrandPartnersShowcase() {
  return (
    <section
      style={{
        backgroundColor: '#fafafa',
        padding: '5rem 1.5rem',
        borderTop: '1px solid #eeeeee',
        borderBottom: '1px solid #eeeeee',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e5e5',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '11.5px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#111111',
              marginBottom: '1rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <ShieldCheck size={14} color="#10b981" />
            <span>100% Authorized Wholesale Partners</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(28px, 3.2vw, 44px)',
              fontWeight: 900,
              color: '#111111',
              letterSpacing: '-0.02em',
              margin: '0 0 0.75rem 0',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Official Brand Partners
          </h2>

          <p
            style={{
              fontSize: 'clamp(14px, 1.2vw, 16px)',
              color: '#666666',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Direct manufacturer relationships guaranteeing fresh batch authenticity, complete warranty coverage, and premier salon wholesale pricing.
          </p>
        </div>

        {/* 12-Brand Responsive Grid */}
        <div className="brand-partners-grid">
          {FEATURED_BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/shop?brand=${encodeURIComponent(brand.query)}`}
              className="brand-partner-card"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e8e8e8',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: '#111111',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                position: 'relative',
              }}
            >
              <div>
                {/* Category Pill */}
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#666666',
                    backgroundColor: '#f5f5f5',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    marginBottom: '14px',
                  }}
                >
                  {brand.category}
                </div>

                {/* Brand Name */}
                <h3
                  style={{
                    fontSize: '17px',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    margin: '0 0 6px 0',
                    color: '#111111',
                    lineHeight: 1.25,
                  }}
                >
                  {brand.name}
                </h3>

                {/* Highlight */}
                <p
                  style={{
                    fontSize: '12px',
                    color: '#888888',
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {brand.highlight}
                </p>
              </div>

              {/* Bottom Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                  paddingTop: '14px',
                  borderTop: '1px solid #f2f2f2',
                }}
              >
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 800,
                    color: '#000000',
                  }}
                >
                  {brand.count}+ Products
                </span>

                <div
                  className="brand-arrow-icon"
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#111111',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Brands CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link
            href="/brands"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '15px 36px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#222222';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Explore All 30+ Brands</span>
            <Sparkles size={16} color="#f59e0b" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .brand-partners-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        :global(.brand-partner-card:hover) {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08) !important;
          border-color: #111111 !important;
        }

        :global(.brand-partner-card:hover .brand-arrow-icon) {
          background-color: #000000 !important;
          color: #ffffff !important;
        }

        @media (max-width: 1024px) {
          .brand-partners-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 768px) {
          .brand-partners-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }

        @media (max-width: 480px) {
          .brand-partners-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
