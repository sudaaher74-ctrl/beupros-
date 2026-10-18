'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Eye, Check, Star } from 'lucide-react';
import { Product } from '@/types/product';

const SIGNATURE_PRODUCTS: (Product & { subtitle: string; tag: string })[] = [
  {
    id: '830',
    name: 'Loreal Absolut Repair Oil',
    subtitle: 'Restorative Golden Quinoa Serum',
    tag: 'DEEP NOURISHMENT',
    brand: 'Loreal',
    category: 'Hair',
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
    name: 'Wella SP Luxe Elixir Oil',
    subtitle: 'Reconstructive Keratin Shield',
    tag: 'KERATIN INFUSION',
    brand: 'Wella',
    category: 'Hair',
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
    name: 'Matrix Mega Smooth 200ML',
    subtitle: 'Anti-Frizz Humidity Shield',
    tag: 'MAX SLEEK GLOSS',
    brand: 'Matrix',
    category: 'Hair',
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
    name: 'Schwarzkopf Osis+ Flatliner',
    subtitle: '230°C Thermal Heat Defense',
    tag: 'HEAT PROTECTION',
    brand: 'Schwarzkopf',
    category: 'Hair',
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

export function SignatureProductsShowcase({
  transparentBg = true,
  theme = 'wavy',
}: {
  transparentBg?: boolean;
  theme?: 'wavy' | 'black';
} = {}) {
  const { addToCart, openQuickView } = useCart();
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const isBlack = theme === 'black';

  const handleAdd = (prod: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(prod, 1);
    setAddedMap((prev) => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [prod.id]: false }));
    }, 1400);
  };

  return (
    <section
      style={{
        backgroundColor: transparentBg ? 'transparent' : isBlack ? '#000000' : '#f8f9fa',
        padding: '20px 24px 70px',
        position: 'relative',
        zIndex: 2,
        transition: 'background-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {SIGNATURE_PRODUCTS.map((prod) => {
            const isJustAdded = !!addedMap[prod.id];
            return (
              <div
                key={prod.id}
                style={{
                  backgroundColor: isBlack ? '#121215' : '#ffffff',
                  borderRadius: '20px',
                  border: isBlack
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(255, 255, 255, 0.5)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isBlack
                    ? '0 12px 30px rgba(0, 0, 0, 0.45)'
                    : '0 12px 30px rgba(0, 0, 0, 0.18)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = isBlack
                    ? '0 20px 40px rgba(245, 158, 11, 0.15)'
                    : '0 20px 40px rgba(0, 0, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isBlack
                    ? '0 12px 30px rgba(0, 0, 0, 0.45)'
                    : '0 12px 30px rgba(0, 0, 0, 0.18)';
                }}
              >
                <div>
                  {/* Tag & Discount */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#64748b',
                      }}
                    >
                      {prod.tag}
                    </span>
                    <span
                      style={{
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        fontSize: '10.5px',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: '9999px',
                      }}
                    >
                      {prod.discount}
                    </span>
                  </div>

                  {/* Tall Product Image Box */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '260px',
                      backgroundColor: isBlack ? '#18181b' : '#f8f9fa',
                      borderRadius: '16px',
                      border: isBlack ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #f0f2f5',
                      overflow: 'hidden',
                      marginBottom: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() => openQuickView(prod)}
                  >
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      style={{ objectFit: 'contain', padding: '1.25rem' }}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />

                    {/* Quick view button overlay */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickView(prod);
                      }}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: isBlack ? '#27272a' : 'rgba(255, 255, 255, 0.95)',
                        border: isBlack ? '1px solid #3f3f46' : '1px solid #eef0f3',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: isBlack ? '#ffffff' : '#0f172a',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      }}
                      title="Quick View"
                    >
                      <Eye size={14} />
                    </button>
                  </div>

                  {/* Brand & Name */}
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: isBlack ? '#a1a1aa' : '#64748b',
                      letterSpacing: '0.06em',
                      marginBottom: '2px',
                    }}
                  >
                    {prod.brand}
                  </div>
                  <Link
                    href={`/product/${prod.id}`}
                    style={{
                      fontSize: '15px',
                      fontWeight: 800,
                      color: isBlack ? '#ffffff' : '#0f172a',
                      lineHeight: 1.3,
                      textDecoration: 'none',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    {prod.name}
                  </Link>
                  <div style={{ fontSize: '11.5px', color: isBlack ? '#71717a' : '#64748b', marginBottom: '8px' }}>
                    {prod.subtitle}
                  </div>

                  {/* Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: isBlack ? '#a1a1aa' : '#64748b', marginLeft: '4px' }}>
                      ({prod.reviewsCount})
                    </span>
                  </div>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: isBlack ? '#ffffff' : '#0f172a' }}>
                      ₹{prod.salePrice.toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontSize: '12.5px', textDecoration: 'line-through', color: isBlack ? '#71717a' : '#94a3b8' }}>
                      ₹{prod.mrp.toLocaleString('en-IN')}
                    </span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        backgroundColor: isBlack ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5',
                        color: isBlack ? '#10b981' : '#059669',
                        padding: '1px 6px',
                        borderRadius: '9999px',
                        marginLeft: 'auto',
                      }}
                    >
                      Save ₹{prod.mrp - prod.salePrice}
                    </span>
                  </div>
                </div>

                {/* Add to Order Button */}
                <button
                  onClick={(e) => handleAdd(prod, e)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '9999px',
                    border: 'none',
                    backgroundColor: isJustAdded ? '#10b981' : isBlack ? '#f59e0b' : '#0f172a',
                    color: isJustAdded ? '#ffffff' : isBlack ? '#000000' : '#ffffff',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    boxShadow: isJustAdded
                      ? '0 4px 12px rgba(16, 185, 129, 0.25)'
                      : '0 2px 8px rgba(15, 23, 42, 0.12)',
                  }}
                >
                  {isJustAdded ? (
                    <>
                      <Check size={14} /> Added to Order!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} /> Add to Bag
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
