'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';

const BUNDLE_STYLES = [
  {
    id: 'pro-box',
    name: 'ProBox',
    subtitle: 'Hair Care & Restorative Color Essentials',
    description: 'Our flagship station package featuring gold quinoa restorative oils, keratin elixirs, and deep color protection masks.',
    discountBadge: '40% BUNDLE SAVINGS',
    products: [
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
        rating: 4.8,
        reviewsCount: 184,
        description: 'Salon exclusive restorative oil enriched with Gold Quinoa and wheat protein for damaged hair fibers.',
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
        id: '1812',
        name: 'Wella - Color Brilliance With Lime Caviar Mask - 150 ML',
        brand: 'Wella',
        category: 'Hair Color',
        salePrice: 515,
        mrp: 680,
        discount: '24% off',
        discountPercent: 24,
        image: '/product-images/ecdaa8ac8d33a85407ac.jpg',
        rating: 4.8,
        reviewsCount: 98,
        description: 'Intense treatment with Copper Encapsulating Molecules and antioxidant shield for colored hair.',
        availability: 'In Stock',
      },
      {
        id: '1375',
        name: 'Schwarzkopf - Osis+ Dust It Mattifying Volume Powder - 10 Gr',
        brand: 'Schwarzkopf',
        category: 'Styling',
        salePrice: 660,
        mrp: 850,
        discount: '22% off',
        discountPercent: 22,
        image: '/product-images/b5b1e19a55e2108558fb.jpg',
        rating: 4.9,
        reviewsCount: 312,
        description: 'Iconic mattifying powder delivering instant root lift, rough grip, and 24-hour volume.',
        availability: 'In Stock',
      },
    ],
  },
  {
    id: 'pro-bag',
    name: 'ProBag',
    subtitle: 'Thermal Defense, Styling & Blowout Kit',
    description: 'The master stylist on-the-go kit with 230°C thermal barrier sprays, high-shine mists, and salon styling appliances.',
    discountBadge: '35% BUNDLE SAVINGS',
    products: [
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
      {
        id: '1376',
        name: 'Schwarzkopf Osis+ Smooth & Shine Sparkler Spray 300 Ml',
        brand: 'Schwarzkopf',
        category: 'Styling',
        salePrice: 838,
        mrp: 1050,
        discount: '20% off',
        discountPercent: 20,
        image: '/product-images/3c77bbdcc085c29b1817.jpg',
        rating: 4.7,
        reviewsCount: 115,
        description: 'Silicone-free light finish shine spray for an instant glossy finish and effortless detangling.',
        availability: 'In Stock',
      },
      {
        id: '832',
        name: 'Loreal Xtenso Care Serum 50 ML',
        brand: 'Loreal',
        category: 'Hair Care',
        salePrice: 561,
        mrp: 720,
        discount: '22% off',
        discountPercent: 22,
        image: '/product-images/ed076889c736c2455fa3.jpg',
        rating: 4.6,
        reviewsCount: 92,
        description: 'Pro-keratin and incell technology for straightened and chemically treated hair.',
        availability: 'In Stock',
      },
      {
        id: '235',
        name: 'Babila - 9 Inch Pro Shampoo Comb HC-V020',
        brand: 'Babila',
        category: 'Tools',
        salePrice: 199,
        mrp: 260,
        discount: '23% off',
        discountPercent: 23,
        image: '/product-images/96c8053e1ef97d9961b0.jpg',
        rating: 4.6,
        reviewsCount: 88,
        description: 'Seamless wide-tooth salon comb designed for gentle wet hair detangling and mask distribution.',
        availability: 'In Stock',
      },
      {
        id: '766',
        name: 'Ikonic - Professional Curler Tong CT-22',
        brand: 'Ikonic',
        category: 'Appliances',
        salePrice: 3186,
        mrp: 3800,
        discount: '16% off',
        discountPercent: 16,
        image: '/product-images/fe75ee8bd485d51034f9.jpg',
        rating: 4.9,
        reviewsCount: 204,
        description: 'Ceramic tourmaline barrel curler with rapid digital heat-up for precision salon curls.',
        availability: 'In Stock',
      },
    ],
  },
  {
    id: 'salon-wear',
    name: 'SalonWEAR',
    subtitle: 'Salon Equipment, Station Tools & Consumables',
    description: 'Keep your treatment booths and washing stations fully equipped with commercial heaters, massage tools, and bulk care.',
    discountBadge: '45% BUNDLE SAVINGS',
    products: [
      {
        id: '6',
        name: 'General - Wax Heater And Oil Warmer Professional',
        brand: 'General',
        category: 'Tools',
        salePrice: 2500,
        mrp: 4700,
        discount: '47% off',
        discountPercent: 47,
        image: '/product-images/c46d8590ae9e140188bb.jpg',
        rating: 4.3,
        reviewsCount: 230,
        description: 'Heavy duty commercial dual pot wax and oil heater for high volume beauty salons.',
        availability: 'In Stock',
      },
      {
        id: '13',
        name: 'Asta Berry - Wine Facial Kit - Pack Of 2',
        brand: 'General',
        category: 'Beauty',
        salePrice: 1100,
        mrp: 1800,
        discount: '39% off',
        discountPercent: 39,
        image: '/product-images/d156ecd4e3536f793f0c.jpg',
        rating: 4.4,
        reviewsCount: 139,
        description: 'Antioxidant rich red grape wine facial kit for luminous skin radiance and anti-aging treatments.',
        availability: 'In Stock',
      },
      {
        id: '7',
        name: 'General - Tonic Massage AP-207 - 580 Gr',
        brand: 'General',
        category: 'Tools',
        salePrice: 725,
        mrp: 745,
        discount: '3% off',
        discountPercent: 3,
        image: '/product-images/9d24450c89e1802f19a5.jpg',
        rating: 4.9,
        reviewsCount: 267,
        description: 'Ergonomic pro scalp and body vibrational tonic massager for client relaxation.',
        availability: 'In Stock',
      },
      {
        id: '4',
        name: 'Afftitude - Pro Shower Gel Blue - 4500 ML Commercial Can',
        brand: 'Afftitude',
        category: 'Commercial Cans',
        salePrice: 700,
        mrp: 1295,
        discount: '46% off',
        discountPercent: 46,
        image: '/product-images/024f8a44c5b7d06ff573.jpg',
        rating: 4.8,
        reviewsCount: 156,
        description: 'Bulk 4.5L salon washstation shower gel formulated for deep cleansing and fresh fragrance.',
        availability: 'In Stock',
      },
    ],
  },
];

export function CuratedBundlesHero() {
  const { addToCart, openQuickView, showToast } = useCart();
  const [activeTab, setActiveTab] = useState(0);
  const [addedBundle, setAddedBundle] = useState(false);

  const currentBundle = BUNDLE_STYLES[activeTab];
  const totalPrice = currentBundle.products.reduce((acc, p) => acc + p.salePrice, 0);
  const totalMrp = currentBundle.products.reduce((acc, p) => acc + p.mrp, 0);

  const handleAddBundleToCart = () => {
    currentBundle.products.forEach((product) => {
      addToCart(product as unknown as Product);
    });
    setAddedBundle(true);
    showToast(`Added ${currentBundle.name} collection (${currentBundle.products.length} products) to your bag!`);
    setTimeout(() => setAddedBundle(false), 2400);
  };

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      {/* 1. Hero Banner matching reference typography & layout */}
      <section
        style={{
          background: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)',
          position: 'relative',
          padding: '70px 36px 80px',
          overflow: 'hidden',
          minHeight: '620px',
          display: 'flex',
          alignItems: 'center',
          color: '#ffffff',
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="beupros-hero-grid"
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: '50px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Left Column: Beupros Luxury Pro Box Visual */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <Image
              src="/images/beupros-pro-box-bundle.jpg"
              alt="Beupros Pro Box Premium Salon Collection"
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            {/* Floating Tag */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(10px)',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
              }}
            >
              <Sparkles size={13} color="#f59e0b" />
              <span>BEUPROS PRO BOX • CURATED TRADE BUNDLE</span>
            </div>
          </div>

          {/* Right Column: Reference Typography & Button */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '24px',
              paddingLeft: '10px',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(42px, 5.4vw, 80px)',
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                margin: 0,
                color: '#ffffff',
                fontFamily: 'var(--font-main)',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              CHOOSE YOUR
              <br />
              FAVORITE STYLE!
            </h1>

            <p
              style={{
                fontSize: 'clamp(18px, 1.8vw, 24px)',
                fontWeight: 600,
                lineHeight: 1.35,
                color: 'rgba(255, 255, 255, 0.92)',
                margin: 0,
                maxWidth: '560px',
                textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              }}
            >
              No matter your specialty, our ProBox, ProBag or SalonWEAR bundle gets you a curated variety of professional beauty essentials.
            </p>

            <div style={{ marginTop: '8px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                href="/shop"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: '2px solid #ffffff',
                  borderRadius: '9999px',
                  padding: '16px 54px',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#111111';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Products Showcase with Style Tabs */}
      <section
        style={{
          backgroundColor: '#fafafa',
          borderTop: '1px solid #e5e5e5',
          borderBottom: '1px solid #e5e5e5',
          padding: '60px 24px 80px',
        }}
      >
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          {/* Header & Tabs */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#b45309',
                marginBottom: '8px',
              }}
            >
              CURATED SALON PACKAGES
            </span>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.2vw, 42px)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                color: '#111111',
                margin: '0 0 14px',
                fontFamily: 'var(--font-main)',
              }}
            >
              PRODUCTS INSIDE YOUR {currentBundle.name.toUpperCase()}
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#666666',
                maxWidth: '680px',
                margin: '0 auto 28px',
                lineHeight: 1.5,
              }}
            >
              {currentBundle.description}
            </p>

            {/* Pill Tabs */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0',
                borderRadius: '9999px',
                padding: '6px',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {BUNDLE_STYLES.map((style, idx) => {
                const isActive = idx === activeTab;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    style={{
                      backgroundColor: isActive ? '#111111' : 'transparent',
                      color: isActive ? '#ffffff' : '#444444',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '12px 28px',
                      fontSize: '13px',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit',
                    }}
                  >
                    {style.name} ({style.products.length} Items)
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bundle Summary Bar */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e5e5e5',
              padding: '20px 28px',
              marginBottom: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div>
              <div style={{ fontSize: '13px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                {currentBundle.name} Complete Trade Bundle • {currentBundle.products.length} Products
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '4px' }}>
                <span style={{ fontSize: '26px', fontWeight: 900, color: '#111111' }}>₹{totalPrice.toLocaleString()}</span>
                <span style={{ fontSize: '16px', color: '#999999', textDecoration: 'line-through' }}>₹{totalMrp.toLocaleString()}</span>
                <span style={{ backgroundColor: '#e6f9f2', color: '#169970', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 700 }}>
                  SAVE ₹{(totalMrp - totalPrice).toLocaleString()}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleAddBundleToCart}
                style={{
                  backgroundColor: addedBundle ? '#169970' : '#111111',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '14px 32px',
                  fontSize: '13px',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                }}
              >
                {addedBundle ? (
                  <>
                    <Check size={16} />
                    <span>ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>ADD COMPLETE {currentBundle.name.toUpperCase()} TO BAG</span>
                  </>
                )}
              </button>

              <Link
                href="/shop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '13px 24px',
                  borderRadius: '9999px',
                  border: '1.5px solid #111111',
                  color: '#111111',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                EXPLORE 4,200+ PRODUCTS →
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {currentBundle.products.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  border: '1px solid #e8e8e8',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Brand & Category */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#888888', letterSpacing: '0.08em' }}>
                    {product.brand}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#e53935' }}>
                    {product.discount}
                  </span>
                </div>

                {/* Product Image */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '210px',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => openQuickView(product as unknown as Product)}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>

                {/* Product Name */}
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: 1.35,
                    color: '#111111',
                    marginBottom: '8px',
                    minHeight: '38px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  <Link href={`/product/${product.id}`}>{product.name}</Link>
                </h3>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px', marginTop: 'auto' }}>
                  <span style={{ fontSize: '18px', fontWeight: 900, color: '#111111' }}>₹{product.salePrice.toLocaleString()}</span>
                  <span style={{ fontSize: '13px', color: '#999999', textDecoration: 'line-through' }}>₹{product.mrp.toLocaleString()}</span>
                </div>

                {/* Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product as unknown as Product);
                      showToast(`Added ${product.name} to bag!`);
                    }}
                    style={{
                      backgroundColor: '#111111',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
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
                    onClick={() => openQuickView(product as unknown as Product)}
                    title="Quick View"
                    style={{
                      backgroundColor: '#f5f5f5',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: '10px',
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

      <style jsx>{`
        @media (max-width: 900px) {
          .beupros-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            text-align: center;
          }
          .beupros-hero-grid div:last-child {
            align-items: center !important;
            padding-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
