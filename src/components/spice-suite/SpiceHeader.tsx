'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export function SpiceHeader() {
  const { totalItems, openCart } = useCart();
  const [blackForthOpen, setBlackForthOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="spice-header" style={{
      backgroundColor: '#1d1d1d',
      color: '#ffffff',
      borderBottom: '1px solid #2a2a2a',
      position: 'relative',
      zIndex: 50,
      fontFamily: 'var(--font-main)',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '16px 36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
      }}>
        {/* Left Navigation */}
        <nav className="spice-desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          flex: 1,
        }}>
          <a
            href="https://www.instagram.com/thespicesuite/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#ffffff',
              opacity: 0.95,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.95')}
          >
            INSTAGRAM
          </a>
          <a
            href="https://www.facebook.com/TheSpiceSuite/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#ffffff',
              opacity: 0.95,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.95')}
          >
            FACEBOOK
          </a>

          {/* BLACK + FORTH with Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setBlackForthOpen(true)}
            onMouseLeave={() => setBlackForthOpen(false)}
          >
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 0',
                fontFamily: 'inherit',
              }}
            >
              BLACK + FORTH
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{
                transform: blackForthOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {blackForthOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: '#1d1d1d',
                border: '1px solid #333333',
                boxShadow: '0 12px 28px rgba(0,0,0,0.4)',
                padding: '12px 0',
                minWidth: '260px',
                zIndex: 60,
              }}>
                {[
                  { label: 'HOME', href: '/#about' },
                  { label: 'BUSINESS CLASSES', href: '/#classes' },
                  { label: 'SCHOLARSHIPS & PARTNERSHIPS', href: '/#scholarships' },
                  { label: 'BUSINESSES AT BLACK & FORTH', href: '/#businesses' },
                  { label: 'SOMETHING SUITE : TEA & COFFEE', href: '/shop?category=Tea%20%26%20Coffee' },
                  { label: 'FARMERS MARKET', href: '/#farmers-market' },
                  { label: 'SHOP', href: '/shop' },
                  { label: 'DONATE', href: '/#donate' },
                  { label: 'POP UP', href: '/#popup' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      display: 'block',
                      padding: '8px 20px',
                      fontSize: '12px',
                      letterSpacing: '0.12em',
                      fontWeight: 500,
                      color: '#e5e5e5',
                      textTransform: 'uppercase',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#2c2c2c';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#e5e5e5';
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Center Logo */}
        <div style={{
          flex: '0 0 auto',
          textAlign: 'center',
          padding: '4px 12px',
        }}>
          <Link href="/" style={{ display: 'inline-block', lineHeight: 0 }}>
            <Image
              src="/spice-suite/logo.png"
              alt="The Spice Suite"
              width={240}
              height={84}
              priority
              style={{
                height: 'auto',
                maxHeight: '62px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'brightness(1.05)',
              }}
            />
          </Link>
        </div>

        {/* Right Navigation */}
        <nav className="spice-desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '28px',
          flex: 1,
        }}>
          <Link
            href="/#about"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#ffffff',
              opacity: 0.95,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.95')}
          >
            OUR STORY
          </Link>

          {/* SHOP with Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <Link
              href="/shop"
              style={{
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 0',
              }}
            >
              SHOP
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{
                transform: shopOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {shopOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                backgroundColor: '#1d1d1d',
                border: '1px solid #333333',
                boxShadow: '0 12px 28px rgba(0,0,0,0.4)',
                padding: '12px 0',
                minWidth: '200px',
                zIndex: 60,
              }}>
                {[
                  { label: 'BAGS + BOXES', href: '/shop?category=Bags%20%2B%20Boxes' },
                  { label: 'APPAREL', href: '/shop?category=Apparel' },
                  { label: 'GIFT CARD', href: '/shop?category=Gift%20Card' },
                  { label: 'ALL PRODUCTS', href: '/shop' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      display: 'block',
                      padding: '8px 20px',
                      fontSize: '12px',
                      letterSpacing: '0.12em',
                      fontWeight: 500,
                      color: '#e5e5e5',
                      textTransform: 'uppercase',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#2c2c2c';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#e5e5e5';
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Cart Bag Icon with Counter */}
          <button
            type="button"
            onClick={openCart}
            aria-label="Open Shopping Bag"
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '6px',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          >
            <div style={{ position: 'relative', width: '26px', height: '30px' }}>
              {/* Bag Outline SVG */}
              <svg width="26" height="30" viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8V6C6 3.79 7.79 2 10 2H14C16.21 2 18 3.79 18 6V8" />
                <path d="M3 8H21L19.8 24.5C19.7 25.4 19 26 18.1 26H5.9C5 26 4.3 25.4 4.2 24.5L3 8Z" />
              </svg>
              {/* Counter inside bag */}
              <span style={{
                position: 'absolute',
                top: '13px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#ffffff',
                fontFamily: 'var(--font-main)',
              }}>
                {totalItems}
              </span>
            </div>
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="spice-mobile-nav" style={{ display: 'none' }}>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '8px',
            }}
            aria-label="Toggle Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#1d1d1d',
          borderTop: '1px solid #333333',
          padding: '20px 24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.12em', color: '#ffffff' }}>SHOP</Link>
          <Link href="/shop?category=Bags%20%2B%20Boxes" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', color: '#cccccc', paddingLeft: '12px' }}>BAGS + BOXES</Link>
          <Link href="/shop?category=Apparel" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', color: '#cccccc', paddingLeft: '12px' }}>APPAREL</Link>
          <Link href="/#about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.12em', color: '#ffffff' }}>OUR STORY</Link>
          <Link href="/#classes" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.12em', color: '#ffffff' }}>BUSINESS CLASSES</Link>
          <a href="https://www.instagram.com/thespicesuite/?hl=en" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.12em', color: '#ffffff' }}>INSTAGRAM</a>
          <a href="https://www.facebook.com/TheSpiceSuite/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.12em', color: '#ffffff' }}>FACEBOOK</a>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 868px) {
          .spice-desktop-nav {
            display: none !important;
          }
          .spice-mobile-nav {
            display: flex !important;
            align-items: center;
            gap: 12px;
          }
        }
      `}</style>
    </header>
  );
}
