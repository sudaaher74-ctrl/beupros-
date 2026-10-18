'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryTile {
  title: string;
  image: string;
  href: string;
  alt: string;
}

const CATEGORIES: CategoryTile[] = [
  {
    title: 'DEALS',
    image: '/images/categories/deals.svg',
    href: '/deals',
    alt: 'Salon Deals and Promotions',
  },
  {
    title: 'NEW',
    image: '/images/categories/new.jpg',
    href: '/shop?sort=new',
    alt: 'New Salon Arrivals',
  },
  {
    title: 'HAIR COLOR',
    image: '/images/categories/hair-color.jpg',
    href: '/shop?category=Hair',
    alt: 'Professional Hair Color & Bleach',
  },
  {
    title: 'HAIR CARE',
    image: '/images/categories/hair-care.jpg',
    href: '/shop?category=Hair',
    alt: 'Shampoo, Conditioners and Hair Care',
  },
  {
    title: 'STYLING',
    image: '/images/categories/styling.jpg',
    href: '/shop?category=Hair',
    alt: 'Styling Sprays and Finishing Products',
  },
  {
    title: 'SKIN & BODY',
    image: '/images/categories/skin-body.jpg',
    href: '/shop?category=Beauty',
    alt: 'Facials, Massage Creams and Skin Care',
  },
  {
    title: 'APPLIANCES',
    image: '/images/categories/appliances.jpg',
    href: '/shop?category=Tools',
    alt: 'Hair Dryers, Straighteners and Salon Tools',
  },
  {
    title: 'NAILS',
    image: '/images/categories/nails.jpg',
    href: '/shop?category=Nails',
    alt: 'Nail Polish, Extensions and Gel Nails',
  },
  {
    title: 'SALON ESSENTIALS',
    image: '/images/categories/salon-essentials.jpg',
    href: '/shop?category=Accessories',
    alt: 'Combs, Clips, Towels and Accessories',
  },
  {
    title: 'MINIS & MORE',
    image: '/images/categories/minis-more.jpg',
    href: '/shop?category=Beauty',
    alt: 'Travel Minis and Trial Packs',
  },
  {
    title: 'BRANDS',
    image: '/images/categories/brands.jpg',
    href: '/brands',
    alt: 'Top Professional Salon Brands',
  },
  {
    title: 'CLEARANCE',
    image: '/images/categories/clearance.svg',
    href: '/deals',
    alt: 'Salon Clearance Specials',
  },
];

export function ShopByCategory({ theme = 'wavy' }: { theme?: 'wavy' | 'black' | 'light' } = {}) {
  const isWavy = theme === 'wavy';
  const isBlack = theme === 'black';

  return (
    <section
      className="shop-by-category-section"
      style={{
        backgroundColor: isWavy ? 'transparent' : isBlack ? '#000000' : '#ffffff',
        position: 'relative',
        zIndex: 2,
        transition: 'background-color 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
        }}
      >
        {/* Section Heading */}
        <h2
          className="shop-category-heading"
          style={{
            fontSize: 'clamp(26px, 3.4vw, 48px)',
            fontWeight: 900,
            textAlign: 'center',
            color: isWavy || isBlack ? '#ffffff' : '#111111',
            letterSpacing: '-0.02em',
            textShadow: isWavy ? '0 4px 20px rgba(0, 0, 0, 0.45)' : 'none',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Shop By Category
        </h2>

        {/* 6-Column Category Grid */}
        <div className="saloncentric-category-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                color: isWavy || isBlack ? '#ffffff' : '#111111',
              }}
            >
              {/* Squircle Image Card */}
              <div
                className="category-card-squircle"
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: isBlack ? '#18181b' : '#f3f4f6',
                  border: isWavy
                    ? '2.5px solid rgba(255, 255, 255, 0.5)'
                    : isBlack
                    ? '1.5px solid rgba(255, 255, 255, 0.12)'
                    : '1px solid rgba(0,0,0,0.06)',
                  boxShadow: isWavy
                    ? '0 10px 25px rgba(0, 0, 0, 0.25)'
                    : isBlack
                    ? '0 8px 24px rgba(0, 0, 0, 0.5)'
                    : '0 4px 14px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                }}
              >
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.35s ease',
                  }}
                  className="category-image-zoom"
                />
              </div>

              {/* Category Label Below */}
              <span
                style={{
                  marginTop: '12px',
                  fontSize: 'clamp(11.5px, 0.95vw, 13.5px)',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  color: isWavy || isBlack ? '#ffffff' : '#111111',
                  textShadow: isWavy ? '0 2px 10px rgba(0, 0, 0, 0.45)' : 'none',
                  lineHeight: 1.25,
                }}
              >
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        .shop-by-category-section {
          padding: 4.5rem 1rem 5rem 1rem;
        }

        .shop-category-heading {
          margin: 0 0 2.5rem 0;
        }

        .saloncentric-category-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 28px 20px;
        }

        .category-card-squircle:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.15) !important;
        }

        .category-card-squircle:hover :global(.category-image-zoom) {
          transform: scale(1.06);
        }

        @media (max-width: 1024px) {
          .saloncentric-category-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 22px 16px;
          }
        }

        @media (max-width: 768px) {
          .shop-by-category-section {
            padding: 2.75rem 1rem 3.5rem 1rem !important;
          }
          .shop-category-heading {
            margin: 0 0 1.75rem 0 !important;
            font-size: 28px !important;
          }
        }

        @media (max-width: 640px) {
          .saloncentric-category-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px 10px;
          }
          :global(.category-card-squircle) {
            border-radius: 16px !important;
          }
        }

        @media (max-width: 360px) {
          .saloncentric-category-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px 10px;
          }
        }
      `}</style>
    </section>
  );
}
