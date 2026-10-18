import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Truck, Sparkles, Building2, Users2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | BeuPROS - B2B Salon Wholesale",
  description: "Learn about BeuPROS, India's premier B2B wholesale marketplace dedicated exclusively to licensed salon professionals, spas, and beauty academies.",
};

export default function AboutUsPage() {
  return (
    <div style={{ backgroundColor: "#ffffff", color: "#111111", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "#000000",
          color: "#ffffff",
          padding: "5rem 1.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at center, rgba(229,185,95,0.15) 0%, rgba(0,0,0,0.85) 75%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(229,185,95,0.4)",
              padding: "4px 14px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: 700,
              color: "#e5b95f",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            <Sparkles size={14} /> India&apos;s B2B Salon Supply Network
          </div>
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: "0 0 1.25rem 0",
            }}
          >
            Empowering Salons with Genuine Wholesale Excellence
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.6,
              color: "#d1d5db",
              maxWidth: "650px",
              margin: "0 auto 2rem auto",
            }}
          >
            BeuPROS is the dedicated trade platform designed exclusively for licensed hair salons, beauty parlors, aesthetic clinics, and professional cosmetologists across India.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/shop"
              className="btn-pill-white"
              style={{
                backgroundColor: "#e5b95f",
                color: "#000000",
                borderColor: "#e5b95f",
                fontWeight: 800,
                padding: "0.8rem 1.8rem",
              }}
            >
              Explore Wholesale Catalog
            </Link>
            <Link
              href="/register"
              className="btn-pill-black"
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.3)",
                fontWeight: 700,
                padding: "0.8rem 1.8rem",
              }}
            >
              Register Your Salon
            </Link>
          </div>
        </div>
      </section>

      {/* Core Mission & Story */}
      <section style={{ padding: "4.5rem 1.5rem", maxWidth: "1150px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3.5rem", alignItems: "center" }}>
          <div>
            <span
              style={{
                color: "#e5b95f",
                fontWeight: 800,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Our Mission
            </span>
            <h2 style={{ fontSize: "2.1rem", fontWeight: 900, margin: "0.5rem 0 1.25rem 0", color: "#000000" }}>
              Eliminating Middlemen for Indian Beauty Pros
            </h2>
            <p style={{ color: "#4b5563", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: "1rem" }}>
              For decades, salon entrepreneurs and independent stylists struggled with fragmented distributor networks, volatile pricing, counterfeit consumables, and opaque trade terms.
            </p>
            <p style={{ color: "#4b5563", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              BeuPROS unifies 4,200+ professional salon products from world-leading hair, beauty, and tool manufacturers under one single, verified wholesale portal. We ensure complete price transparency, verified trade discounts, and reliable door-step fulfillment so salon artists can focus on their craft.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", borderTop: "1px solid #e5e7eb", paddingTop: "1.5rem" }}>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#111111" }}>4,200+</div>
                <div style={{ fontSize: "0.85rem", color: "#6b7280", fontWeight: 600 }}>Commercial Products</div>
              </div>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#111111" }}>100%</div>
                <div style={{ fontSize: "0.85rem", color: "#6b7280", fontWeight: 600 }}>Authentic & Brand Direct</div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111111", margin: 0 }}>
              The BeuPROS Standard
            </h3>
            
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#000000", color: "#e5b95f", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <strong style={{ fontSize: "0.95rem", color: "#111111", display: "block", marginBottom: "2px" }}>Verified Pro Licensing</strong>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
                  Wholesale trade prices are strictly safeguarded and unlocked only for verified salons with valid GST or trade licenses.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#000000", color: "#e5b95f", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Building2 size={20} />
              </div>
              <div>
                <strong style={{ fontSize: "0.95rem", color: "#111111", display: "block", marginBottom: "2px" }}>Commercial & Bulk Packaging</strong>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
                  Access salon-sized commercial cans (4500ml, 5000ml), backbar shampoo stations, bulk waxing wax heaters, and professional kits.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#000000", color: "#e5b95f", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Truck size={20} />
              </div>
              <div>
                <strong style={{ fontSize: "0.95rem", color: "#111111", display: "block", marginBottom: "2px" }}>Express Nationwide Delivery</strong>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
                  Fast air & surface logistics partnering with premier carriers to keep your salon stations fully stocked before weekend peaks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section style={{ backgroundColor: "#f9fafb", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", textAlign: "center" }}>
          <div>
            <Award size={32} color="#000000" style={{ margin: "0 auto 0.75rem auto" }} />
            <div style={{ fontWeight: 800, fontSize: "1rem", color: "#111111" }}>Authorized Brand Partner</div>
            <div style={{ fontSize: "0.82rem", color: "#6b7280", marginTop: "4px" }}>Direct manufacturer sourcing</div>
          </div>
          <div>
            <Users2 size={32} color="#000000" style={{ margin: "0 auto 0.75rem auto" }} />
            <div style={{ fontWeight: 800, fontSize: "1rem", color: "#111111" }}>Pro Community First</div>
            <div style={{ fontSize: "0.82rem", color: "#6b7280", marginTop: "4px" }}>Built for stylists, by industry experts</div>
          </div>
          <div>
            <ShieldCheck size={32} color="#000000" style={{ margin: "0 auto 0.75rem auto" }} />
            <div style={{ fontWeight: 800, fontSize: "1rem", color: "#111111" }}>100% GST Invoicing</div>
            <div style={{ fontSize: "0.82rem", color: "#6b7280", marginTop: "4px" }}>Claim full business input tax credit</div>
          </div>
          <div>
            <Truck size={32} color="#000000" style={{ margin: "0 auto 0.75rem auto" }} />
            <div style={{ fontWeight: 800, fontSize: "1rem", color: "#111111" }}>Zero Breakage Guarantee</div>
            <div style={{ fontSize: "0.82rem", color: "#6b7280", marginTop: "4px" }}>Heavy-duty transit packaging</div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section style={{ padding: "4rem 1.5rem", textAlign: "center", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.85rem", fontWeight: 900, color: "#111111", margin: "0 0 0.75rem 0" }}>
            Ready to Upgrade Your Salon Supply Chain?
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: 1.6, margin: "0 0 1.75rem 0" }}>
            Create your salon wholesale account in under 2 minutes and start ordering at exclusive trade pricing.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/register"
              className="btn-pill-black"
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                fontWeight: 800,
                padding: "0.75rem 1.75rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>Register Salon Now</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact-us"
              className="btn-pill-white"
              style={{
                borderColor: "#d1d5db",
                color: "#111111",
                fontWeight: 700,
                padding: "0.75rem 1.75rem",
              }}
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
