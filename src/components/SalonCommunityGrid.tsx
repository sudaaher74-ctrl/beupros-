'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, ArrowUpRight } from 'lucide-react';

const InstagramIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface SocialPost {
  id: string;
  image: string;
  stylist: string;
  salon: string;
  likes: string;
  comments: string;
  caption: string;
  tag: string;
}

const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    image: '/images/beupros-stylist.jpg',
    stylist: '@salon_artistry_priya',
    salon: 'Emerge Salon, Bandra',
    likes: '2.4k',
    comments: '142',
    caption: '12-hour session with zero strain. Beupros aprons & shears are game changers!',
    tag: '#BeuprosArtist',
  },
  {
    id: 'post-2',
    image: '/images/categories/hair-color.jpg',
    stylist: '@colorist_vikram',
    salon: 'Studio Noir, Delhi',
    likes: '1.9k',
    comments: '88',
    caption: 'Platinum balayage using Freecia Bond Fortifier + Schwarzkopf Igora. 100% shine.',
    tag: '#ProHairCare',
  },
  {
    id: 'post-3',
    image: '/images/categories/styling.jpg',
    stylist: '@hairby_alisha',
    salon: 'The Crown Studio, Bengaluru',
    likes: '3.1k',
    comments: '210',
    caption: 'Bridal volume locks locked with Berina Heat Protector & Babila styling rods.',
    tag: '#SalonFashion',
  },
  {
    id: 'post-4',
    image: '/images/categories/nails.jpg',
    stylist: '@glam_nails_divya',
    salon: 'Nail Couture, Pune',
    likes: '1.7k',
    comments: '95',
    caption: 'Russian gel extension with Glam Pro Range One Step Gel. Zero heat spikes!',
    tag: '#NailTechPro',
  },
  {
    id: 'post-5',
    image: '/images/categories/skin-body.jpg',
    stylist: '@spa_wellness_meera',
    salon: 'Aura Day Spa, Hyderabad',
    likes: '2.2k',
    comments: '116',
    caption: 'Luxury bridal facial glow using Aroma Magic Gold & Lotus Citrus Massage.',
    tag: '#EstheticianLife',
  },
  {
    id: 'post-6',
    image: '/images/categories/appliances.jpg',
    stylist: '@barber_craft_kunal',
    salon: 'The Gentleman Barbershop, Mumbai',
    likes: '2.8k',
    comments: '173',
    caption: 'Full station upgrade: Ikonic Pro irons & Vega clippers arrived next-day dispatch.',
    tag: '#BarberStation',
  },
];

export function SalonCommunityGrid({ theme = 'wavy' }: { theme?: 'wavy' | 'black' | 'light' } = {}) {
  const isWavy = theme === 'wavy';
  const isBlack = theme === 'black';

  return (
    <section
      style={{
        backgroundColor: isWavy ? 'transparent' : isBlack ? '#000000' : '#ffffff',
        padding: '5.5rem 1.5rem',
        position: 'relative',
        zIndex: 2,
        transition: 'background-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '3rem',
          }}
        >
          <div>
            {/* Instagram Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: isWavy
                  ? 'rgba(255, 255, 255, 0.22)'
                  : isBlack
                  ? '#18181b'
                  : '#fdf2f8',
                border: isWavy
                  ? '1px solid rgba(255, 255, 255, 0.35)'
                  : isBlack
                  ? '1px solid rgba(225, 29, 72, 0.3)'
                  : '1px solid #fce7f3',
                fontSize: '11.5px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isWavy ? '#ffffff' : '#db2777',
                marginBottom: '0.85rem',
                backdropFilter: isWavy ? 'blur(10px)' : 'none',
              }}
            >
              <InstagramIcon size={14} color={isWavy ? '#ffffff' : '#db2777'} />
              <span>@BeuprosWholesale Community</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(30px, 3.4vw, 48px)',
                fontWeight: 900,
                color: isWavy || isBlack ? '#ffffff' : '#111111',
                letterSpacing: '-0.02em',
                margin: '0 0 0.5rem 0',
                textShadow: isWavy ? '0 4px 20px rgba(0, 0, 0, 0.45)' : 'none',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Created by Masters. Powered by Beupros.
            </h2>

            <p
              style={{
                fontSize: 'clamp(14px, 1.2vw, 16px)',
                color: isWavy ? 'rgba(255, 255, 255, 0.92)' : isBlack ? '#a1a1aa' : '#666666',
                margin: 0,
                maxWidth: '620px',
                textShadow: isWavy ? '0 2px 10px rgba(0, 0, 0, 0.3)' : 'none',
              }}
            >
              Tag <strong style={{ color: isWavy || isBlack ? '#ffffff' : '#111111' }}>#BeuprosArtist</strong> to be featured. See how 10,000+ top salons, master colorists, and beauty entrepreneurs use our supplies every single day.
            </p>
          </div>

          {/* Follow Button */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: isWavy
                ? '#ffffff'
                : isBlack
                ? '#27272a'
                : '#111111',
              color: isWavy ? '#0f172a' : '#ffffff',
              padding: '13px 26px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
              border: isBlack ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#db2777';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isWavy
                ? '#ffffff'
                : isBlack
                ? '#27272a'
                : '#111111';
              e.currentTarget.style.color = isWavy ? '#0f172a' : '#ffffff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <InstagramIcon size={16} />
            <span>Follow @beupros.pro</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* 6-Card Instagram Responsive Grid */}
        <div className="salon-social-grid">
          {SOCIAL_POSTS.map((post) => (
            <div
              key={post.id}
              className="social-post-card"
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                borderRadius: '18px',
                overflow: 'hidden',
                backgroundColor: '#111111',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                cursor: 'pointer',
              }}
            >
              {/* Photo */}
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                className="social-post-image"
              />

              {/* Tag pill in top left */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(6px)',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  padding: '4px 9px',
                  borderRadius: '9999px',
                  zIndex: 2,
                }}
              >
                {post.tag}
              </div>

              {/* Hover Overlay */}
              <div
                className="social-hover-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.72)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '18px',
                  color: '#ffffff',
                  opacity: 0,
                  transition: 'opacity 0.25s ease',
                  zIndex: 3,
                }}
              >
                {/* Top: Stylist info */}
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
                    {post.stylist}
                  </div>
                  <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '2px' }}>
                    {post.salon}
                  </div>
                </div>

                {/* Center: Caption */}
                <p
                  style={{
                    fontSize: '11.5px',
                    lineHeight: 1.45,
                    color: '#e2e8f0',
                    margin: 0,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {post.caption}
                </p>

                {/* Bottom: Likes & Comments */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11.5px', fontWeight: 700 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Heart size={13} fill="#ef4444" color="#ef4444" />
                      {post.likes}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MessageCircle size={13} color="#ffffff" />
                      {post.comments}
                    </span>
                  </div>

                  <Link
                    href="/shop"
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#f59e0b',
                      textDecoration: 'none',
                    }}
                  >
                    Shop Supplies
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .salon-social-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 18px;
        }

        :global(.social-post-card:hover .social-hover-overlay) {
          opacity: 1 !important;
        }

        :global(.social-post-card:hover .social-post-image) {
          transform: scale(1.08) !important;
        }

        @media (max-width: 1024px) {
          .salon-social-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 640px) {
          .salon-social-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
