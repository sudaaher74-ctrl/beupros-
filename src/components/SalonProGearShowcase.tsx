'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Eye, Check, Star, ShieldCheck, Zap, Sparkles, Truck, Receipt } from 'lucide-react';
import { Product } from '@/types/product';

interface ProProductItem extends Product {
  badge: string;
  subCategory: string;
}

const PRO_STATION_PRODUCTS: ProProductItem[] = [
  {
    id: '766',
    name: 'Ikonic Professional Curler Tong CT-22',
    brand: 'Ikonic',
    category: 'Tools',
    subCategory: 'tools',
    salePrice: 3186,
    mrp: 3600,
    discount: '12% off',
    discountPercent: 12,
    image: '/product-images/fe75ee8bd485d51034f9.jpg',
    rating: 4.9,
    reviewsCount: 310,
    badge: 'BESTSELLER TOOL',
    description: 'Salon-grade ceramic barrel with rapid heat recovery and precise digital temperature control for master stylists.',
    availability: 'In Stock',
  },
  {
    id: '1377',
    name: 'Schwarzkopf Osis+ 3 Flatliner Heat Defense 200ML',
    brand: 'Schwarzkopf',
    category: 'Hair',
    subCategory: 'styling',
    salePrice: 936,
    mrp: 1200,
    discount: '22% off',
    discountPercent: 22,
    image: '/product-images/beb2599a7a39cc2bba47.jpg',
    rating: 4.8,
    reviewsCount: 176,
    badge: '230°C SHIELD',
    description: 'Heavy-duty thermal protection spray guarding hair cuticle up to 230°C with prolonged humidity resistance.',
    availability: 'In Stock',
  },
  {
    id: '830',
    name: "L'Oréal Professionnel Absolut Repair Oil 90ML",
    brand: 'Loreal',
    category: 'Hair',
    subCategory: 'haircare',
    salePrice: 1074,
    mrp: 1400,
    discount: '23% off',
    discountPercent: 23,
    image: '/product-images/16726344631637eaf0b1.jpg',
    rating: 4.9,
    reviewsCount: 184,
    badge: 'GOLD QUINOA',
    description: 'Salon exclusive restorative serum powered by Gold Quinoa and wheat protein to resurface distressed fibers.',
    availability: 'In Stock',
  },
  {
    id: '1720',
    name: 'Vega Pro 3-in-1 Hair Styler Pressing Machine VHSCC1',
    brand: 'Vega',
    category: 'Tools',
    subCategory: 'tools',
    salePrice: 1535,
    mrp: 2200,
    discount: '30% off',
    discountPercent: 30,
    image: '/product-images/232c36856b649c066f8d.jpg',
    rating: 4.7,
    reviewsCount: 198,
    badge: '3-IN-1 PRO GEAR',
    description: 'Multi-functional salon tool delivering crimping, straightening, and curling in one heavy-duty chassis.',
    availability: 'In Stock',
  },
  {
    id: '988',
    name: 'Lotus Professional Citrus Massage Cream 300g',
    brand: 'Lotus',
    category: 'Beauty',
    subCategory: 'spa',
    salePrice: 611,
    mrp: 850,
    discount: '28% off',
    discountPercent: 28,
    image: '/product-images/27266123a61d9aa89911.jpg',
    rating: 4.8,
    reviewsCount: 224,
    badge: 'SPA BACKBAR',
    description: 'Enriched with lemon and orange extracts to detoxify, soften, and relieve tired hands and feet in professional salons.',
    availability: 'In Stock',
  },
  {
    id: '634',
    name: 'Freecia Colorplex Bond Creator Treatment No. 1 500ML',
    brand: 'Freecia',
    category: 'Hair',
    subCategory: 'haircare',
    salePrice: 5104,
    mrp: 8000,
    discount: '36% off',
    discountPercent: 36,
    image: '/product-images/236f3410b4dc5720d93a.jpg',
    rating: 5.0,
    reviewsCount: 92,
    badge: 'BOND CREATOR',
    description: 'Protects disulphide hair bonds during bleaching and high-lift coloring. Essential backbar treatment.',
    availability: 'In Stock',
  },
  {
    id: '574',
    name: 'Dorofey Detox Botox Pre-Shampoo 500ML',
    brand: 'Dorofey',
    category: 'Hair',
    subCategory: 'haircare',
    salePrice: 1998,
    mrp: 2220,
    discount: '10% off',
    discountPercent: 10,
    image: '/product-images/e1a8a15cc20f97c74683.jpg',
    rating: 4.8,
    reviewsCount: 145,
    badge: 'BOTOX DETOX',
    description: 'Deep clarifying pre-treatment preparing hair cuticles for botox, keratin, and intense restorative salon procedures.',
    availability: 'In Stock',
  },
  {
    id: '6437',
    name: 'Alan Truman Atom 511 Cordless Hair Clipper',
    brand: 'Alan Truman',
    category: 'Tools',
    subCategory: 'tools',
    salePrice: 3800,
    mrp: 5999,
    discount: '37% off',
    discountPercent: 37,
    image: '/product-images/1dad191d457f284040e5.jpg',
    rating: 4.9,
    reviewsCount: 177,
    badge: 'MASTER BARBER',
    description: 'Precision rotary motor with self-sharpening titanium-coated blades and long-run lithium battery for barbershops.',
    availability: 'In Stock',
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Pro Station Picks' },
  { id: 'tools', label: 'Pro Electrical & Tools' },
  { id: 'haircare', label: 'Color Bar & Bonding' },
  { id: 'styling', label: 'Finishing & Styling' },
  { id: 'spa', label: 'Spa & Backbar' },
];

export function SalonProGearShowcase({
  theme = 'wavy',
}: {
  theme?: 'wavy' | 'black';
}) {
  const { addToCart, openQuickView } = useCart();
  const [activeFilter, setActiveFilter] = useState('all');
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

  const filteredProducts =
    activeFilter === 'all'
      ? PRO_STATION_PRODUCTS
      : PRO_STATION_PRODUCTS.filter((p) => p.subCategory === activeFilter);

  return (
    <section
      style={{
        backgroundColor: isBlack ? '#09090b' : 'transparent',
        color: '#ffffff',
        padding: '70px 24px 90px',
        position: 'relative',
        zIndex: 2,
        transition: 'background-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* =============================================================== */}
        {/* SECTION HEADER & PRO VALUE PROPOSITION                         */}
        {/* =============================================================== */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem auto' }}>
          {/* Pro Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: isBlack ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.22)',
              backdropFilter: 'blur(10px)',
              padding: '7px 18px',
              borderRadius: '9999px',
              fontSize: '11.5px',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '1rem',
              border: isBlack ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.35)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Sparkles size={14} color={isBlack ? '#f59e0b' : '#ffffff'} />
            <span>AUTHENTIC SALON PRODUCTS &amp; STATION GEAR</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(32px, 3.8vw, 54px)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              color: '#ffffff',
              margin: '0 0 16px 0',
              textShadow: isBlack ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.45)',
            }}
          >
            PRO STATION &amp; COLOR BAR ESSENTIALS
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              fontWeight: 500,
              color: isBlack ? '#a1a1aa' : 'rgba(255, 255, 255, 0.92)',
              lineHeight: 1.5,
              margin: '0 0 24px 0',
              textShadow: isBlack ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            Direct authorized wholesale on high-performance clippers, curling tongs, bonding treatments, and backbar spa consumables.
          </p>

          {/* 4 Trust Value Pillars */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              marginTop: '10px',
            }}
          >
            {[
              { icon: ShieldCheck, text: '100% Genuine Pro Stock' },
              { icon: Receipt, text: 'B2B GST Tax Credit' },
              { icon: Zap, text: 'Wholesale Tier Pricing' },
              { icon: Truck, text: 'Same-Day Dispatch' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: isBlack ? '#d4d4d8' : '#ffffff',
                  backgroundColor: isBlack ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.2)',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  border: isBlack ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.25)',
                }}
              >
                <item.icon size={13} color={isBlack ? '#f59e0b' : '#ffffff'} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* =============================================================== */}
        {/* CATEGORY FILTER TABS                                            */}
        {/* =============================================================== */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '2.5rem',
          }}
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: '9px 20px',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: isActive
                    ? isBlack
                      ? '1.5px solid #f59e0b'
                      : '2px solid #ffffff'
                    : isBlack
                    ? '1px solid rgba(255, 255, 255, 0.12)'
                    : '1px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: isActive
                    ? isBlack
                      ? '#f59e0b'
                      : '#ffffff'
                    : isBlack
                    ? 'rgba(255, 255, 255, 0.04)'
                    : 'rgba(0, 0, 0, 0.25)',
                  color: isActive
                    ? isBlack
                      ? '#000000'
                      : '#0f172a'
                    : '#ffffff',
                  boxShadow: isActive ? '0 4px 14px rgba(0, 0, 0, 0.25)' : 'none',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* =============================================================== */}
        {/* PRODUCT GRID                                                    */}
        {/* =============================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredProducts.map((prod) => {
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
                    : '0 16px 36px rgba(0, 0, 0, 0.18)',
                  transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = isBlack
                    ? '0 20px 45px rgba(245, 158, 11, 0.15)'
                    : '0 24px 50px rgba(0, 0, 0, 0.28)';
                  if (isBlack) {
                    e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isBlack
                    ? '0 12px 30px rgba(0, 0, 0, 0.45)'
                    : '0 16px 36px rgba(0, 0, 0, 0.18)';
                  if (isBlack) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                <div>
                  {/* Top Badges: Tag & Discount */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '9.5px',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: isBlack
                          ? 'rgba(245, 158, 11, 0.15)'
                          : 'rgba(15, 23, 42, 0.08)',
                        color: isBlack ? '#f59e0b' : '#334155',
                      }}
                    >
                      {prod.badge}
                    </span>
                    <span
                      style={{
                        backgroundColor: isBlack ? '#ffffff' : '#0f172a',
                        color: isBlack ? '#000000' : '#ffffff',
                        fontSize: '10.5px',
                        fontWeight: 800,
                        padding: '3px 9px',
                        borderRadius: '9999px',
                      }}
                    >
                      {prod.discount}
                    </span>
                  </div>

                  {/* Product Image Stage */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '240px',
                      backgroundColor: isBlack ? '#18181b' : '#f8f9fa',
                      borderRadius: '16px',
                      border: isBlack
                        ? '1px solid rgba(255, 255, 255, 0.06)'
                        : '1px solid #f0f2f5',
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
                      style={{ objectFit: 'contain', padding: '1rem' }}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />

                    {/* Quick View Button */}
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

                  {/* Brand & Title */}
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: isBlack ? '#a1a1aa' : '#64748b',
                      letterSpacing: '0.08em',
                      marginBottom: '4px',
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
                      lineHeight: 1.35,
                      textDecoration: 'none',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      marginBottom: '10px',
                    }}
                  >
                    {prod.name}
                  </Link>

                  {/* Rating */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      marginBottom: '14px',
                      fontSize: '12px',
                      color: isBlack ? '#a1a1aa' : '#64748b',
                    }}
                  >
                    <div style={{ display: 'flex', color: '#f59e0b' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <span style={{ fontWeight: 700, color: isBlack ? '#ffffff' : '#0f172a' }}>
                      {prod.rating}
                    </span>
                    <span>({prod.reviewsCount})</span>
                  </div>
                </div>

                {/* Bottom: Pricing & CTA */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '8px',
                      marginBottom: '14px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '20px',
                        fontWeight: 900,
                        color: isBlack ? '#ffffff' : '#0f172a',
                      }}
                    >
                      ₹{prod.salePrice.toLocaleString()}
                    </span>
                    <span
                      style={{
                        fontSize: '13px',
                        color: isBlack ? '#71717a' : '#94a3b8',
                        textDecoration: 'line-through',
                      }}
                    >
                      ₹{prod.mrp.toLocaleString()}
                    </span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        color: '#10b981',
                        letterSpacing: '0.02em',
                      }}
                    >
                      TAX INCL.
                    </span>
                  </div>

                  {/* Add To Cart Button */}
                  <button
                    onClick={(e) => handleAdd(prod, e)}
                    style={{
                      width: '100%',
                      padding: '12px 0',
                      borderRadius: '9999px',
                      border: 'none',
                      backgroundColor: isJustAdded
                        ? '#10b981'
                        : isBlack
                        ? '#f59e0b'
                        : '#0f172a',
                      color: isJustAdded ? '#ffffff' : isBlack ? '#000000' : '#ffffff',
                      fontSize: '12.5px',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    {isJustAdded ? (
                      <>
                        <Check size={16} strokeWidth={3} />
                        <span>ADDED TO STATION</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={15} />
                        <span>ADD TO CART</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All In Catalog CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link
            href="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 44px',
              borderRadius: '9999px',
              backgroundColor: isBlack ? '#ffffff' : 'transparent',
              color: isBlack ? '#000000' : '#ffffff',
              border: isBlack ? 'none' : '2.5px solid #ffffff',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
            }}
            onMouseEnter={(e) => {
              if (!isBlack) {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#0f172a';
              } else {
                e.currentTarget.style.backgroundColor = '#f59e0b';
              }
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              if (!isBlack) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
              } else {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>EXPLORE FULL 4,200+ PRO SALON CATALOG</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
