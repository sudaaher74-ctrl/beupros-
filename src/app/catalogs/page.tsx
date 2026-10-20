"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Download, Eye, X, ArrowRight, Sparkles, CheckCircle } from "lucide-react";

interface CatalogItem {
  id: string;
  title: string;
  brand: string;
  category: "all" | "hair" | "tools" | "beauty" | "salon";
  pages: number;
  season: string;
  description: string;
  coverGradient: string;
  shopCategory: string;
  featuredProducts: string[];
}

const catalogsData: CatalogItem[] = [
  {
    id: "color-2026",
    title: "Autumn/Winter 2026 Master Color & Bleach Lookbook",
    brand: "L'Oréal & Schwarzkopf & Wella",
    category: "hair",
    pages: 48,
    season: "Fall / Winter 2026",
    description: "Formulation recipes for foilayage, root shadows, ice-blonde toning, and grey blending. Includes official shade charts.",
    coverGradient: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
    shopCategory: "Hair",
    featuredProducts: ["Majirel 8.21", "Igora Royal", "Koleston Perfect", "Blondme 9+"],
  },
  {
    id: "tools-2026",
    title: "Professional Appliances & Tooling Architecture Guide",
    brand: "Ikonic, Vega Professional, Alan Truman",
    category: "tools",
    pages: 36,
    season: "Annual Edition 2026",
    description: "Detailed spec sheets on brushless digital motors, titanium vs ceramic plates, heat recovery sensors, and ergonomic balance.",
    coverGradient: "linear-gradient(135deg, #09090b 0%, #1c1917 100%)",
    shopCategory: "Tools",
    featuredProducts: ["Titanium Pro Crimper", "Atom 511 Clipper", "Rynz Auto Cleaner", "Ceramic Styler"],
  },
  {
    id: "backbar-2026",
    title: "High-Yield Backbar Consumables & Care Manual",
    brand: "Babila, Matrix, Lotus Professional",
    category: "salon",
    pages: 28,
    season: "Quarterly Trade Issue",
    description: "Maximizing shampoo bowl cost-per-pump efficiency, deep repair regimens, and salon retail display merchandising.",
    coverGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
    shopCategory: "Hair",
    featuredProducts: ["Mega Smooth Conditioner", "Absolut Repair Oil", "Babila Salon Towels", "Shampoo 5L Cans"],
  },
  {
    id: "smooth-2026",
    title: "Keratin Smoothing & Thermal Straightening Handbook",
    brand: "Brasil Cacau & Cadiveu & De Fabulous",
    category: "hair",
    pages: 32,
    season: "Spring / Summer 2026",
    description: "Step-by-step chemical safety, ventilation best practices, iron temp selection, and post-service client retail routines.",
    coverGradient: "linear-gradient(135deg, #451a03 0%, #78350f 100%)",
    shopCategory: "Hair",
    featuredProducts: ["Brasil Cacau Keratin", "Cadiveu Primer", "De Fabulous Marula", "Blowdry Serum"],
  },
  {
    id: "skin-2026",
    title: "Esthetician Facial Kits & Clinical Skincare Protocols",
    brand: "O3+, Jovees Herbal, Blossom Kochhar",
    category: "beauty",
    pages: 40,
    season: "Professional Guide 2026",
    description: "Protocols for bridal glow treatments, de-pigmentation peels, ultrasonic scrubbers, and botanical facial therapy.",
    coverGradient: "linear-gradient(135deg, #064e3b 0%, #047857 100%)",
    shopCategory: "Beauty",
    featuredProducts: ["O3+ Bridal Facial", "Jovees Herbal Bleach", "Aroma Magic Pearl Kit", "Wax Heaters"],
  },
  {
    id: "nails-2026",
    title: "Nail Extension Systems, UV Gels & Apex Architecture",
    brand: "Glam, FYC, Babila Pro",
    category: "tools",
    pages: 24,
    season: "Trend Lookbook 2026",
    description: "Russian manicure bit guides, builder gel sculpting without heat spikes, cat-eye magnetic pigments, and dust extractor specs.",
    coverGradient: "linear-gradient(135deg, #581c87 0%, #7e22ce 100%)",
    shopCategory: "Nails",
    featuredProducts: ["Glam Builder Gel", "Cat Eye Magnet", "E-File Ceramic Bits", "UV LED Lamp 72W"],
  },
];

export default function CatalogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "hair" | "tools" | "beauty" | "salon">("all");
  const [activeCatalog, setActiveCatalog] = useState<CatalogItem | null>(null);

  const filteredCatalogs = catalogsData.filter(
    (c) => selectedCategory === "all" || c.category === selectedCategory
  );

  return (
    <div style={{ backgroundColor: "#ffffff", paddingBottom: "6rem" }}>
      {/* Sapphire Wavy Hero Section */}
      <section
        className="catalogs-hero-section"
        style={{
          position: "relative",
          backgroundImage: "url(/images/wavy-bg-catalogs-sapphire.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          color: "#ffffff",
          padding: "70px 24px 80px",
          overflow: "hidden",
        }}
      >
        <div
          className="catalogs-hero-container"
          style={{
            maxWidth: "1360px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "40px",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Left Column: Heading & Description */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.16)",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                padding: "6px 16px",
                borderRadius: "9999px",
                fontSize: "11.5px",
                fontWeight: 800,
                color: "#7dd3fc",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              }}
            >
              <BookOpen size={14} color="#38bdf8" />
              <span>Beupros Digital Pro Library</span>
            </div>

            <h1
              className="catalogs-hero-title"
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
              DIGITAL PRO CATALOGS &amp; LOOKBOOKS
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
              Explore high-resolution brand lookbooks, technical formulation guides, and wholesale equipment catalogs with instant pro ordering.
            </p>

            {/* Quick feature tags */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <span
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(8px)",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                ✓ Official Formulation Recipes
              </span>
              <span
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(8px)",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                ✓ High-Res Shade Charts
              </span>
              <span
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(8px)",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                ✓ Instant PDF Download
              </span>
            </div>
          </div>

          {/* Right Column: 3D Floating Catalog Showcase Cards */}
          <div
            className="catalogs-hero-stack"
            style={{
              position: "relative",
              height: "360px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Catalog 1: Back layer */}
            <div
              style={{
                position: "absolute",
                width: "240px",
                height: "310px",
                backgroundColor: "#172554",
                borderRadius: "14px",
                border: "2px solid rgba(255, 255, 255, 0.25)",
                boxShadow: "-16px 20px 40px rgba(0, 0, 0, 0.4)",
                padding: "20px",
                color: "#ffffff",
                transform: "rotate(-8deg) translateX(-40px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                zIndex: 1,
              }}
            >
              <div>
                <div style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "0.15em", color: "#38bdf8" }}>
                  TRADE GUIDE
                </div>
                <div style={{ fontSize: "17px", fontWeight: 900, marginTop: "6px", lineHeight: 1.2 }}>
                  Tooling &amp; Architecture
                </div>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "8px", fontSize: "10px", opacity: 0.8 }}>
                36 Pages • Specs &amp; Motors
              </div>
            </div>

            {/* Catalog 2: Middle layer */}
            <div
              style={{
                position: "absolute",
                width: "240px",
                height: "310px",
                backgroundColor: "#0369a1",
                borderRadius: "14px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 20px 45px rgba(0, 0, 0, 0.45)",
                padding: "20px",
                color: "#ffffff",
                transform: "rotate(4deg) translateX(30px) translateY(-10px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                zIndex: 2,
              }}
            >
              <div>
                <div style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "0.15em", color: "#fcd34d" }}>
                  BACKBAR MANUAL
                </div>
                <div style={{ fontSize: "17px", fontWeight: 900, marginTop: "6px", lineHeight: 1.2 }}>
                  High-Yield Consumables
                </div>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "8px", fontSize: "10px", opacity: 0.8 }}>
                28 Pages • Cost-Per-Pump
              </div>
            </div>

            {/* Catalog 3: Front hero lookbook */}
            <div
              style={{
                position: "absolute",
                width: "250px",
                height: "320px",
                backgroundColor: "#1e1b4b",
                borderRadius: "14px",
                border: "2px solid rgba(255, 255, 255, 0.45)",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.55)",
                padding: "22px",
                color: "#ffffff",
                transform: "rotate(-2deg)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                zIndex: 3,
              }}
            >
              <div>
                <div style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "0.15em", color: "#f43f5e" }}>
                  FALL / WINTER 2026
                </div>
                <div style={{ fontSize: "19px", fontWeight: 900, marginTop: "6px", lineHeight: 1.15 }}>
                  Master Color &amp; Bleach
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)", marginTop: "4px" }}>
                  L&apos;Oréal • Schwarzkopf • Wella
                </div>
              </div>
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  paddingTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#38bdf8" }}>48 Pages</span>
                <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                  Shade Book
                </span>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 960px) {
            .catalogs-hero-section {
              padding: 42px 18px 48px !important;
            }
            .catalogs-hero-container {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
            .catalogs-hero-title {
              font-size: 28px !important;
            }
            .catalogs-hero-stack {
              height: 280px !important;
              transform: scale(0.85);
            }
          }
        `}</style>
      </section>

      <div className="container-custom" style={{ paddingTop: "2.5rem" }}>
        {/* Category Tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginBottom: "3rem",
          }}
        >
          {[
            { id: "all", label: "All Catalogs" },
            { id: "hair", label: "Hair & Color Lookbooks" },
            { id: "tools", label: "Appliances & Tools" },
            { id: "beauty", label: "Skincare & Spa" },
            { id: "salon", label: "Backbar & Furniture" },
          ].map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                style={{
                  padding: "0.6rem 1.25rem",
                  borderRadius: "9999px",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  backgroundColor: isActive ? "#000000" : "#f5f5f5",
                  color: isActive ? "#ffffff" : "#444444",
                  border: isActive ? "1.5px solid #000000" : "1.5px solid #e5e5e5",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Catalogs Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {filteredCatalogs.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e5e5e5",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 14px 28px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.03)";
              }}
            >
              {/* Fake Catalog Cover */}
              <div
                style={{
                  background: item.coverGradient,
                  padding: "2.5rem 2rem",
                  color: "#ffffff",
                  position: "relative",
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#f59e0b",
                    }}
                  >
                    {item.season}
                  </span>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      backgroundColor: "rgba(255,255,255,0.15)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                      fontWeight: 600,
                    }}
                  >
                    {item.pages} Pages
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, opacity: 0.85, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                    {item.brand}
                  </div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 900, lineHeight: 1.25, textTransform: "uppercase" }}>
                    {item.title}
                  </h3>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", opacity: 0.9 }}>
                  <Sparkles size={13} color="#f59e0b" /> Verified Brand Official Guide
                </div>
              </div>

              {/* Content Body */}
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "0.9rem", color: "#555555", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                    {item.description}
                  </p>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", color: "#888888", marginBottom: "0.4rem" }}>
                      Featured In This Catalog:
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {item.featuredProducts.map((p) => (
                        <span
                          key={p}
                          style={{
                            fontSize: "0.75rem",
                            backgroundColor: "#f5f5f5",
                            color: "#333333",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px",
                            fontWeight: 600,
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.6rem", borderTop: "1px solid #eeeeee", paddingTop: "1rem" }}>
                  <button
                    onClick={() => setActiveCatalog(item)}
                    className="btn-pill-black"
                    style={{ flex: 1, padding: "0.6rem", fontSize: "0.82rem" }}
                  >
                    <Eye size={15} /> Preview Lookbook
                  </button>

                  <Link
                    href={`/shop?category=${encodeURIComponent(item.shopCategory)}`}
                    className="btn-pill-white"
                    style={{ padding: "0.6rem 0.9rem", fontSize: "0.82rem" }}
                  >
                    Shop Items <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Catalog Preview Modal */}
      {activeCatalog && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={() => setActiveCatalog(null)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              maxWidth: "680px",
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ background: activeCatalog.coverGradient, color: "#ffffff", padding: "2rem" }}>
              <button
                onClick={() => setActiveCatalog(null)}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={18} />
              </button>
              <div style={{ fontSize: "0.8rem", color: "#f59e0b", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {activeCatalog.season} • {activeCatalog.pages} Pages
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", marginTop: "0.3rem" }}>
                {activeCatalog.title}
              </h2>
              <div style={{ fontSize: "0.85rem", opacity: 0.9, marginTop: "0.3rem" }}>
                Published by {activeCatalog.brand}
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#16a34a", fontWeight: 700, fontSize: "0.9rem", marginBottom: "1rem" }}>
                <CheckCircle size={18} /> Digital Edition Available For Instant Pro Access
              </div>

              <p style={{ fontSize: "0.95rem", color: "#444444", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                {activeCatalog.description} This publication includes trade-exclusive formulation charts, step-by-step application diagrams, and wholesale SKU price lists.
              </p>

              <div style={{ backgroundColor: "#f9f9f9", padding: "1.25rem", borderRadius: "10px", marginBottom: "1.5rem", border: "1px solid #eeeeee" }}>
                <div style={{ fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  What&apos;s Inside This Issue:
                </div>
                <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", fontSize: "0.85rem", color: "#555555", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  <li>Comprehensive mixing ratio guidelines and developer strengths</li>
                  <li>Client consultation scripts & salon retail profit margin tables</li>
                  <li>Direct Beupros wholesale barcode scan & re-order links</li>
                  <li>Authorized brand warranties and batch quality certificates</li>
                </ul>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href={`/shop?category=${encodeURIComponent(activeCatalog.shopCategory)}`}
                  onClick={() => setActiveCatalog(null)}
                  className="btn-pill-black"
                  style={{ flex: 1, padding: "0.8rem 1.5rem", fontSize: "0.9rem" }}
                >
                  Shop Featured Products ({activeCatalog.shopCategory})
                </Link>
                <button
                  onClick={() => alert(`Downloading "${activeCatalog.title}" (PDF, ~14.2 MB)...`)}
                  className="btn-pill-white"
                  style={{ padding: "0.8rem 1.5rem", fontSize: "0.9rem" }}
                >
                  <Download size={16} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
