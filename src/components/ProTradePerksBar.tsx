'use client';

import React from 'react';
import { ShieldCheck, Truck, Zap, Award } from 'lucide-react';

const PERKS = [
  { icon: ShieldCheck, text: '100% GENUINE SALON FORMULATIONS' },
  { icon: Truck, text: 'FREE DISPATCH ON ORDERS OVER ₹1,500' },
  { icon: Zap, text: 'EXCLUSIVE TRADE SECRET DROPS EVERY MONDAY' },
  { icon: Award, text: 'LICENSED PRO WHOLESALE TIER PRICING' },
];

export function ProTradePerksBar() {
  return (
    <section
      style={{
        backgroundColor: '#111111',
        color: '#ffffff',
        padding: '16px 20px',
        overflow: 'hidden',
        borderTop: '1px solid #222222',
        borderBottom: '1px solid #222222',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {PERKS.map((perk, idx) => {
          const Icon = perk.icon;
          return (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#e5e5e5',
              }}
            >
              <Icon size={16} color="#d97706" />
              <span>{perk.text}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
