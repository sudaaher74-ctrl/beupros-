'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '@/types/product';

const SIGNATURE_PRODUCTS = [
  {
    id: '830',
    name: 'Loreal - Absolut Repair Oil - 90 ML',
    brand: 'Loreal',
    category: 'Hair Care',
    salePrice: 1074,
    mrp: 1400,
    discount: '23% off',
    discountPercent: 23,
    image: '/product-images/16726344631637eaf0b1.jpg',
    rating: 4.9,
    reviewsCount: 184,
    description: 'Salon exclusive restorative serum with Gold Quinoa and wheat protein for damaged hair fibers.',
    availability: 'In Stock',
  },
  {
    id: '1809',
    name: 'Wella - SP Luxe Reconstructive Elixir Oil - 100 ML',
    brand: 'Wella',
    category: 'Hair Care',
    salePrice: 1945,
    mrp: 2300,
    discount: '15% off',
    discountPercent: 15,
    image: '/product-images/070dfc30637496576bb8.jpg',
    rating: 4.9,
    reviewsCount: 220,
    description: 'Transforms hair texture with argan, jojoba, and almond oils for lasting keratin protection.',
    availability: 'In Stock',
  },
  {
    id: '1022',
    name: 'Matrix Mega Smooth Professional Conditioner 200 Ml',
    brand: 'Matrix',
    category: 'Hair Care',
    salePrice: 483,
    mrp: 650,
    discount: '26% off',
    discountPercent: 26,
    image: '/product-images/73d83e9720c7ce370a19.jpg',
    rating: 4.7,
    reviewsCount: 142,
    description: 'Tames frizz and unmanageable textures for silk-like salon finish that resists humidity.',
    availability: 'In Stock',
  },
  {
    id: '1377',
    name: 'Schwarzkopf - Osis+ 3 Flatliner Heat Protection - 200 ML',
    brand: 'Schwarzkopf',
    category: 'Styling',
    salePrice: 936,
    mrp: 1200,
    discount: '22% off',
    discountPercent: 22,
    image: '/product-images/beb2599a7a39cc2bba47.jpg',
    rating: 4.8,
    reviewsCount: 176,
    description: 'Protects against styling heat up to 230°C while reducing hair breakage and frizz.',
    availability: 'In Stock',
  },
];

export function SignatureProductsShowcase() {
  const { addToCart, openQuickView, showToast } = useCart();

  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        padding: '80px 24px',
        borderBottom: '1px solid #eeeeee',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#b45309',
              display: 'inline-block',
              marginBottom: '8px',
            }}
          >
            STATION BESTSELLERS
          </span>
          <h2
            style={{
              fontSize: 'clamp(30px, 3.5vw, 44px)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#111111',
              margin: '0 0 12px',
              fontFamily: 'var(--font-main)',
            }}
          >
            SIGNATURE SALON ESSENTIALS
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#666666',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            The top 4 formulas ordered weekly by master salons, backed by guaranteed authenticity and wholesale volume pricing.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '28px',
          }}
        >
          {SIGNATURE_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#888888', letterSpacing: '0.1em' }}>
                  {prod.brand}
                </span>
                <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                  {prod.discount}
                </span>
              </div>

              {/* Product Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '240px',
                  marginBottom: '16px',
                  cursor: 'pointer',
                }}
                onClick={() => openQuickView(prod as unknown as Product)}
              >
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#333333' }}>{prod.rating}</span>
                <span style={{ fontSize: '12px', color: '#888888' }}>({prod.reviewsCount})</span>
              </div>

              {/* Product Name */}
              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  lineHeight: 1.35,
                  color: '#111111',
                  marginBottom: '12px',
                  minHeight: '42px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                <Link href={`/product/${prod.id}`}>{prod.name}</Link>
              </h3>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '18px', marginTop: 'auto' }}>
                <span style={{ fontSize: '20px', fontWeight: 900, color: '#111111' }}>₹{prod.salePrice.toLocaleString()}</span>
                <span style={{ fontSize: '14px', color: '#999999', textDecoration: 'line-through' }}>₹{prod.mrp.toLocaleString()}</span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(prod as unknown as Product);
                    showToast(`Added ${prod.name} to bag!`);
                  }}
                  style={{
                    backgroundColor: '#111111',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b45309')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111111')}
                >
                  <ShoppingBag size={14} />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  type="button"
                  onClick={() => openQuickView(prod as unknown as Product)}
                  title="Quick View"
                  style={{
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#444444',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Eye size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
