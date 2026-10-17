# Beupros - Wholesale Beauty Supply & Salon Marketplace

Beupros is a high-performance wholesale e-commerce platform and pro salon marketplace engineered with **Next.js (App Router)**, **React**, and **TypeScript**, replicating the exact design language, layout, and user experience of **SalonCentric**.

## Features

- **Exact SalonCentric Aesthetic**:
  - ProRewards mint-green announcement banner with dynamic free delivery threshold calculator.
  - Iconic circular swirl logo and monochrome pill button design system.
  - 4-Card Hero promo carousel with high-contrast palette.
  - 4-Brand promo spotlight tiles (Matrix, Schwarzkopf, Wella Professionals, L'Oréal Professionnel).
  - "Products That Sparkle" tabbed line-up with horizontal snap carousel.
  - "New Gems Just In" carousel with star reviews and pro trade pricing.
  - "Shop By Category" 12 rounded square image cards.
  - "The Playbook" neon-yellow pro education masterclasses.
  - Full SalonCentric dark footer with comprehensive customer service and legal links.
- **Complete 4,276 Product Catalog**:
  - Sourced and cleaned from the `Salowin-Products` dataset.
  - Over 4,200 pro salon items covering Hair Care & Color, Beauty & Skincare, Tools & Appliances, Nails, Accessories, and Commercial Cans.
  - 4,250+ high-resolution product photos served locally via Next.js static asset pipelines.
- **Pro E-Commerce System**:
  - Real-time slide-out Cart Drawer with animated item controls and coupon code support (`PRO10`).
  - Live instant Search Modal (`⌘K` / `Ctrl+K`) across the entire catalog.
  - Quick View pop-up for instant inspection and direct add-to-bag.
  - Dedicated `/shop` catalog with multi-filter sidebar (Category, Brand, Price Range, Discount), sorting, and pagination.
  - Dedicated dynamic product detail pages (`/product/[id]`) with specifications and related recommendations.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI & Logic**: React 19, TypeScript
- **Icons**: Lucide Icons & Custom Pro SVGs
- **Styling**: Vanilla CSS Design System with CSS variables and responsive container queries

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

4. To build for production:
```bash
npm run build
npm start
```
