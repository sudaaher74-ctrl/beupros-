'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check } from 'lucide-react';

export function TradeNewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('beupros_newsletter_seen');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('beupros_newsletter_seen', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    sessionStorage.setItem('beupros_newsletter_seen', 'true');
    setTimeout(() => {
      setIsOpen(false);
    }, 2800);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          maxWidth: '520px',
          width: '100%',
          padding: '40px 32px',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: '#666666',
          }}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#fef3c7',
            color: '#92400e',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          <Sparkles size={13} />
          <span>EXCLUSIVE PRO WELCOME OFFER</span>
        </div>

        <h3
          style={{
            fontSize: '28px',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: '#111111',
            margin: '0 0 12px',
            fontFamily: 'var(--font-main)',
            letterSpacing: '-0.02em',
          }}
        >
          GET 10% OFF YOUR FIRST TRADE ORDER
        </h3>

        <p
          style={{
            fontSize: '15px',
            color: '#555555',
            lineHeight: 1.5,
            margin: '0 0 24px',
          }}
        >
          Join 8,400+ licensed salon owners receiving Monday trade drop alerts, volume wholesale tiers, and pro formula guides.
        </p>

        {isSubmitted ? (
          <div
            style={{
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '12px',
              padding: '20px',
              color: '#065f46',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>
              <Check size={18} />
              <span>PRO CODE UNLOCKED: BEUPROS10</span>
            </div>
            <p style={{ margin: 0, fontSize: '13px' }}>Use code BEUPROS10 at checkout for 10% off your first wholesale order!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your salon or pro email"
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '8px',
                border: '1.5px solid #d1d5db',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#111111',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '14px 20px',
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b45309')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111111')}
            >
              CLAIM 10% PRO DISCOUNT
            </button>
          </form>
        )}

        <div style={{ marginTop: '16px', fontSize: '11px', color: '#888888' }}>
          By signing up you agree to receive Beupros pro wholesale notices. Unsubscribe anytime.
        </div>
      </div>
    </div>
  );
}
