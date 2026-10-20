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
      {/* Hero Section with Emerald Wavy Aesthetic */}
      <section
        className="about-hero-section"
        style={{
          position: "relative",
          backgroundImage: "url(/images/wavy-bg-about-emerald.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          color: "#ffffff",
          padding: "75px 24px 85px",
          overflow: "hidden",
        }}
      >
        <div
          className="about-hero-container"
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
          {/* Left Column: Vision & Action */}
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
                color: "#fcd34d",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              }}
            >
              <Sparkles size={14} color="#fcd34d" />
              <span>India&apos;s B2B Salon Supply Network</span>
            </div>

            <h1
              className="about-hero-title"
              style={{
                fontSize: "clamp(32px, 4.2vw, 56px)",
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                margin: "0 0 1.25rem 0",
                color: "#ffffff",
                textShadow: "0 4px 24px rgba(0, 0, 0, 0.45)",
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              EMPOWERING SALONS WITH GENUINE WHOLESALE EXCELLENCE
            </h1>

            <p
              style={{
                fontSize: "clamp(15px, 1.2vw, 17px)",
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.92)",
                maxWidth: "600px",
                margin: "0 0 2rem 0",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.35)",
              }}
            >
              BeuPROS is the dedicated trade platform designed exclusively for licensed hair salons, beauty parlors, aesthetic clinics, and professional cosmetologists across India.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link
                href="/shop"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ffffff",
                  color: "#064e3b",
                  border: "2px solid #ffffff",
                  borderRadius: "9999px",
                  padding: "14px 34px",
                  fontSize: "13px",
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
                  transition: "all 0.2s ease",
                }}
              >
                <span>Explore Wholesale Catalog</span>
              </Link>
              <Link
                href="/register"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  border: "2px solid rgba(255, 255, 255, 0.4)",
                  borderRadius: "9999px",
                  padding: "14px 32px",
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.2s ease",
                }}
              >
                <span>Register Your Salon</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Floating Architectural Trust Cards */}
          <div
            className="about-hero-cards"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(2, 44, 34, 0.75)",
                border: "1.5px solid rgba(255, 255, 255, 0.22)",
                backdropFilter: "blur(16px)",
                borderRadius: "18px",
                padding: "20px 24px",
                boxShadow: "0 14px 35px rgba(0, 0, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(52, 211, 153, 0.2)",
                  border: "1px solid rgba(52, 211, 153, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#34d399",
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={26} />
              </div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.01em" }}>
                  100% Authorized Genuine
                </div>
                <div style={{ fontSize: "12.5px", color: "rgba(255, 255, 255, 0.82)", marginTop: "2px", lineHeight: 1.4 }}>
                  Direct factory contracts with L&apos;Oréal, Schwarzkopf, Ikonic &amp; 30+ official partners.
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(2, 44, 34, 0.75)",
                border: "1.5px solid rgba(255, 255, 255, 0.22)",
                backdropFilter: "blur(16px)",
                borderRadius: "18px",
                padding: "20px 24px",
                boxShadow: "0 14px 35px rgba(0, 0, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(252, 211, 77, 0.2)",
                  border: "1px solid rgba(252, 211, 77, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fcd34d",
                  flexShrink: 0,
                }}
              >
                <Award size={26} />
              </div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.01em" }}>
                  B2B GST Input Tax Credit
                </div>
                <div style={{ fontSize: "12.5px", color: "rgba(255, 255, 255, 0.82)", marginTop: "2px", lineHeight: 1.4 }}>
                  Save 18% to 28% with compliant B2B invoicing on all salon station inventory.
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(2, 44, 34, 0.75)",
                border: "1.5px solid rgba(255, 255, 255, 0.22)",
                backdropFilter: "blur(16px)",
                borderRadius: "18px",
                padding: "20px 24px",
                boxShadow: "0 14px 35px rgba(0, 0, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(56, 189, 248, 0.2)",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#38bdf8",
                  flexShrink: 0,
                }}
              >
                <Truck size={26} />
              </div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.01em" }}>
                  PAN-India Doorstep Dispatch
                </div>
                <div style={{ fontSize: "12.5px", color: "rgba(255, 255, 255, 0.82)", marginTop: "2px", lineHeight: 1.4 }}>
                  Fast logistics powering over 12,000 salons across Tier 1, 2, and 3 cities.
                </div>
              </div>
            </div>
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
