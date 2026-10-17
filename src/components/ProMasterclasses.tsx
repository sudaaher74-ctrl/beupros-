'use client';

import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const EVENTS = [
  {
    id: 1,
    title: 'Advanced Balayage & French Foil Mapping Masterclass',
    instructor: 'Master Colorist Elena Vance',
    date: 'OCTOBER 28, 2026',
    time: '10:00 AM - 4:00 PM EST',
    location: 'Beupros Pro Studio / Live Stream',
    badge: 'HANDS-ON CERTIFICATION',
    spots: '6 SPOTS LEFT',
  },
  {
    id: 2,
    title: 'Russian E-File Precision Manicure & Apex Structuring',
    instructor: 'Nail Educator Sofia Chen',
    date: 'NOVEMBER 04, 2026',
    time: '11:00 AM - 3:00 PM EST',
    location: 'Beupros Virtual Academy',
    badge: 'PRO WORKSHOP',
    spots: '12 SPOTS LEFT',
  },
  {
    id: 3,
    title: 'Salon Profit Architecture: Scaling Retail & Service Revenue',
    instructor: 'Salon Business Coach Marcus Hayes',
    date: 'NOVEMBER 15, 2026',
    time: '1:00 PM - 5:00 PM EST',
    location: 'Interactive Webinar',
    badge: 'BUSINESS WEBINAR',
    spots: 'FREE FOR MEMBERS',
  },
];

export function ProMasterclasses() {
  return (
    <section
      style={{
        backgroundColor: '#fafafa',
        padding: '80px 24px 90px',
        borderBottom: '1px solid #e5e5e5',
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
            BEUPROS ACADEMY
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
            UPCOMING PRO MASTERCLASSES
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#666666',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            Sharpen your technical skills, learn high-margin service workflows, and earn verified pro CE credits.
          </p>
        </div>

        {/* Event Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {EVENTS.map((evt) => (
            <div
              key={evt.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span
                    style={{
                      backgroundColor: '#fef3c7',
                      color: '#92400e',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '4px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {evt.badge}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626' }}>
                    {evt.spots}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    lineHeight: 1.35,
                    color: '#111111',
                    marginBottom: '10px',
                  }}
                >
                  {evt.title}
                </h3>

                <div style={{ fontSize: '13px', color: '#666666', marginBottom: '20px', fontWeight: 600 }}>
                  Led by {evt.instructor}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#444444' }}>
                    <Calendar size={15} color="#b45309" />
                    <span>{evt.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#444444' }}>
                    <Clock size={15} color="#b45309" />
                    <span>{evt.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#444444' }}>
                    <MapPin size={15} color="#b45309" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/education"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: '#111111',
                  color: '#ffffff',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b45309')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111111')}
              >
                <span>RESERVE PRO SEAT</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
