"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactUsPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    salonName: "",
    phone: "",
    email: "",
    topic: "Wholesale Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production or demo, acknowledge user inquiry immediately
    setFormSubmitted(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url(/images/wavy-bg-contact-coral.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        color: "#ffffff",
      }}
    >
      {/* Coral Sunset Wavy Hero Section */}
      <section
        className="contact-hero-section"
        style={{
          position: "relative",
          backgroundColor: "transparent",
          color: "#ffffff",
          padding: "60px 24px 40px",
          overflow: "hidden",
        }}
      >
        <div
          className="contact-hero-container"
          style={{
            maxWidth: "1360px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "48px",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Left Column: Heading & Vision */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.18)",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                padding: "6px 16px",
                borderRadius: "9999px",
                fontSize: "11.5px",
                fontWeight: 800,
                color: "#fed7aa",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              }}
            >
              <MessageSquare size={13} color="#fca5a5" />
              <span>Dedicated Salon Trade Desk</span>
            </div>

            <h1
              className="contact-hero-title"
              style={{
                fontSize: "clamp(32px, 4.2vw, 56px)",
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                textTransform: "uppercase",
                margin: "0 0 1.25rem 0",
                color: "#ffffff",
                textShadow: "0 4px 24px rgba(0, 0, 0, 0.45)",
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              WE&apos;RE HERE TO SUPPORT YOUR SALON BUSINESS
            </h1>

            <p
              style={{
                fontSize: "clamp(15px, 1.2vw, 17px)",
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.92)",
                maxWidth: "600px",
                margin: "0",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.35)",
              }}
            >
              Have questions about salon trade verification, bulk corporate orders, brand distribution, or express logistics? Reach out to our dedicated pro team.
            </p>
          </div>

          {/* Right Column: Direct Trade Desk Floating Cards */}
          <div
            className="contact-hero-cards"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(59, 7, 30, 0.78)",
                border: "1.5px solid rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(16px)",
                borderRadius: "18px",
                padding: "18px 22px",
                boxShadow: "0 14px 35px rgba(0, 0, 0, 0.35)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(244, 63, 94, 0.25)",
                  border: "1px solid rgba(244, 63, 94, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fca5a5",
                  flexShrink: 0,
                }}
              >
                <Phone size={22} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#fed7aa" }}>
                  Direct Phone Support
                </div>
                <div style={{ fontSize: "18px", fontWeight: 900, color: "#ffffff", marginTop: "2px", letterSpacing: "-0.01em" }}>
                  +91 98200 11223
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.75)", marginTop: "2px" }}>
                  Monday – Saturday: 9:00 AM – 8:00 PM IST
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(59, 7, 30, 0.78)",
                border: "1.5px solid rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(16px)",
                borderRadius: "18px",
                padding: "18px 22px",
                boxShadow: "0 14px 35px rgba(0, 0, 0, 0.35)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(251, 146, 60, 0.25)",
                  border: "1px solid rgba(251, 146, 60, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fdba74",
                  flexShrink: 0,
                }}
              >
                <Mail size={22} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#fed7aa" }}>
                  Corporate &amp; Trade Email
                </div>
                <div style={{ fontSize: "17px", fontWeight: 900, color: "#ffffff", marginTop: "2px", letterSpacing: "-0.01em" }}>
                  trade@beupros.com
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.75)", marginTop: "2px" }}>
                  Guaranteed response within 2 business hours
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(59, 7, 30, 0.78)",
                border: "1.5px solid rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(16px)",
                borderRadius: "18px",
                padding: "18px 22px",
                boxShadow: "0 14px 35px rgba(0, 0, 0, 0.35)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(34, 197, 94, 0.25)",
                  border: "1px solid rgba(34, 197, 94, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#86efac",
                  flexShrink: 0,
                }}
              >
                <Clock size={22} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#fed7aa" }}>
                  Priority Salon Logistics
                </div>
                <div style={{ fontSize: "16px", fontWeight: 900, color: "#ffffff", marginTop: "2px", letterSpacing: "-0.01em" }}>
                  24–48 Hour Dispatch Guarantee
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.75)", marginTop: "2px" }}>
                  Direct doorstep fulfillment across India
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 960px) {
            .contact-hero-section {
              padding: 42px 18px 28px !important;
            }
            .contact-hero-container {
              grid-template-columns: 1fr !important;
              gap: 28px !important;
            }
            .contact-hero-title {
              font-size: 28px !important;
            }
          }
        `}</style>
      </section>

      {/* Main Content Grid: Info on left, Form on right on Full Wavy Background */}
      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "1.5rem 1.5rem 5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2.5rem" }}>
          {/* Left Column: Glassmorphic Contact Details */}
          <div
            style={{
              backgroundColor: "rgba(44, 6, 23, 0.78)",
              borderRadius: "24px",
              border: "1.5px solid rgba(255, 255, 255, 0.22)",
              backdropFilter: "blur(20px)",
              padding: "2.5rem",
              boxShadow: "0 18px 45px rgba(0, 0, 0, 0.35)",
            }}
          >
            <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#ffffff", margin: "0 0 1rem 0", letterSpacing: "-0.02em" }}>
              Get in Touch with BeuPROS
            </h2>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
              Our dedicated salon specialist team is available Monday through Saturday to assist with your orders, billing, and account authorizations.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "rgba(244, 63, 94, 0.25)", border: "1px solid rgba(244, 63, 94, 0.4)", color: "#fed7aa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Phone size={18} />
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "#fed7aa", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>Phone Support</span>
                  <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#ffffff", marginTop: "2px" }}>+91 98200 11223</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.75)" }}>Direct trade desk &amp; WhatsApp assistance</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "rgba(244, 63, 94, 0.25)", border: "1px solid rgba(244, 63, 94, 0.4)", color: "#fed7aa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Mail size={18} />
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "#fed7aa", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>Email Inquiries</span>
                  <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#ffffff", marginTop: "2px" }}>support@beupros.com</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.75)" }}>For orders, GST invoicing &amp; brand partnerships</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "rgba(244, 63, 94, 0.25)", border: "1px solid rgba(244, 63, 94, 0.4)", color: "#fed7aa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "#fed7aa", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>Corporate Headquarters</span>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#ffffff", marginTop: "2px" }}>
                    Floor 4, Trade Center, Bandra Kurla Complex (BKC)
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.75)" }}>Mumbai, Maharashtra 400051, India</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "rgba(244, 63, 94, 0.25)", border: "1px solid rgba(244, 63, 94, 0.4)", color: "#fed7aa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Clock size={18} />
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "#fed7aa", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>Operational Hours</span>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#ffffff", marginTop: "2px" }}>
                    Monday – Saturday: 9:00 AM – 7:00 PM IST
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.75)" }}>Online platform active 24/7 for 365 days</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              borderRadius: "24px",
              border: "1.5px solid rgba(255, 255, 255, 0.5)",
              padding: "2.5rem",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)",
              color: "#111111",
            }}
          >
            {formSubmitted ? (
              <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem auto" }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#111111", margin: "0 0 0.5rem 0" }}>
                  Inquiry Received!
                </h3>
                <p style={{ color: "#4b5563", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "400px", margin: "0 auto 1.5rem auto" }}>
                  Thank you, <strong>{formData.name}</strong>. A BeuPROS salon relationship manager will reach out via phone or email within 2 business hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: "", salonName: "", phone: "", email: "", topic: "Wholesale Inquiry", message: "" });
                  }}
                  className="btn-pill-black"
                  style={{ fontSize: "13px", padding: "0.6rem 1.4rem" }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#111111", margin: "0 0 0.25rem 0" }}>
                  Send Us an Inquiry
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0 0 0.5rem 0" }}>
                  Fill out your details below and our team will get back to you promptly.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "4px" }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sudarshan Aher"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: "100%", padding: "0.75rem 0.95rem", borderRadius: "10px", border: "1.5px solid #d1d5db", fontSize: "13px", outline: "none", backgroundColor: "#f9fafb" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "4px" }}>
                      Salon / Studio Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bella Luxury Studio"
                      value={formData.salonName}
                      onChange={(e) => setFormData({ ...formData, salonName: e.target.value })}
                      style={{ width: "100%", padding: "0.75rem 0.95rem", borderRadius: "10px", border: "1.5px solid #d1d5db", fontSize: "13px", outline: "none", backgroundColor: "#f9fafb" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "4px" }}>
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: "100%", padding: "0.75rem 0.95rem", borderRadius: "10px", border: "1.5px solid #d1d5db", fontSize: "13px", outline: "none", backgroundColor: "#f9fafb" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "4px" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="salon@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: "100%", padding: "0.75rem 0.95rem", borderRadius: "10px", border: "1.5px solid #d1d5db", fontSize: "13px", outline: "none", backgroundColor: "#f9fafb" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "4px" }}>
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem 0.95rem", borderRadius: "10px", border: "1.5px solid #d1d5db", fontSize: "13px", outline: "none", backgroundColor: "#f9fafb" }}
                  >
                    <option value="Wholesale Inquiry">Wholesale Pricing &amp; Catalog</option>
                    <option value="Trade License Verification">Trade License / GST Verification</option>
                    <option value="Order Tracking & Logistics">Order Tracking &amp; Fulfillment</option>
                    <option value="Brand Partnership">Brand Distribution &amp; Supply</option>
                    <option value="Other">Other Query</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "4px" }}>
                    Your Message / Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your salon requirements, brands needed, or order details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem 0.95rem", borderRadius: "10px", border: "1.5px solid #d1d5db", fontSize: "13px", outline: "none", fontFamily: "inherit", backgroundColor: "#f9fafb" }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: "#be185d",
                    color: "#ffffff",
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    cursor: "pointer",
                    border: "none",
                    borderRadius: "10px",
                    marginTop: "0.5rem",
                    boxShadow: "0 8px 24px rgba(190, 24, 93, 0.4)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#9d174d";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#be185d";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Send size={16} />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
