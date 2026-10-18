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

export function ShopByCategory() {
  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        padding: '3.5rem 1rem 4rem 1rem',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
        }}
      >
        {/* Section Heading (Matching SalonCentric Reference) */}
        <h2
          style={{
            fontSize: 'clamp(28px, 3.2vw, 44px)',
            fontWeight: 900,
            textAlign: 'center',
            color: '#111111',
            letterSpacing: '-0.02em',
            margin: '0 0 2.5rem 0',
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
                color: '#111111',
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
                  backgroundColor: '#f3f4f6',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
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
                  fontSize: 'clamp(11px, 0.95vw, 13.5px)',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  color: '#111111',
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

        @media (max-width: 640px) {
          .saloncentric-category-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 18px 12px;
          }
          :global(.category-card-squircle) {
            border-radius: 18px !important;
          }
        }

        @media (max-width: 380px) {
          .saloncentric-category-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
