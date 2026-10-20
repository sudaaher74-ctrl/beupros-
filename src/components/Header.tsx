"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const MegaCategoryItem: React.FC<{
  href: string;
  label: string;
  onClick: () => void;
}> = ({ href, label, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "7px 10px",
        borderRadius: "8px",
        fontSize: "0.82rem",
        fontWeight: hovered ? 700 : 500,
        color: hovered ? "#ffffff" : "rgba(255, 255, 255, 0.72)",
        backgroundColor: hovered ? "rgba(255, 255, 255, 0.09)" : "transparent",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        transition: "all 0.15s ease",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      <span>{label}</span>
      <ChevronRight
        size={13}
        style={{
          opacity: hovered ? 1 : 0.25,
          transform: hovered ? "translateX(2px)" : "translateX(0)",
          transition: "all 0.15s ease",
          color: hovered ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
        }}
      />
    </Link>
  );
};

const MegaBrandChip: React.FC<{
  brand: string;
  onClick: () => void;
}> = ({ brand, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const queryVal = brand === "L'Oréal" ? "Loreal" : brand;
  return (
    <Link
      href={`/shop?brand=${encodeURIComponent(queryVal)}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "0.72rem",
        fontWeight: 700,
        padding: "4px 8px",
        borderRadius: "6px",
        backgroundColor: hovered ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.08)",
        color: hovered ? "#ffffff" : "#e4e4e7",
        border: hovered ? "1px solid rgba(255, 255, 255, 0.35)" : "1px solid rgba(255, 255, 255, 0.1)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        transition: "all 0.15s ease",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {brand}
    </Link>
  );
};

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Auto-close categories dropdown on route change
  useEffect(() => {
    setIsCategoriesOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle outside click & escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setIsCategoriesOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCategoriesMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsCategoriesOpen(true);
  };

  const handleCategoriesMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsCategoriesOpen(false);
    }, 280); // 280ms grace window prevents accidental closing when moving cursor
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 90,
        backgroundColor: "#000000",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      {/* Single Sleek Black Nav Bar */}
      <div
        className="container-custom"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 0",
          position: "relative",
        }}
      >
        {/* Left: Brand Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="18" stroke="#ffffff" strokeWidth="2.5" />
            <path
              d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M16 20C16 17.7909 17.7909 16 20 16C22.2091 16 24 17.7909 24 20"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="20" cy="20" r="2.5" fill="#ffffff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                lineHeight: 1,
              }}
            >
              Beupros
            </span>
            <span
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#a1a1aa",
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              PRO BEAUTY SUPPLY
            </span>
          </div>
        </Link>

        {/* Center: Desktop 5 Nav Links */}
        <nav
          className="desktop-only"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
          }}
        >
          {/* 1. HOME */}
          <Link
            href="/"
            style={{
              fontSize: "0.88rem",
              fontWeight: pathname === "/" ? 800 : 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: pathname === "/" ? "#ffffff" : "rgba(255, 255, 255, 0.75)",
              borderBottom: pathname === "/" ? "2px solid #ffffff" : "2px solid transparent",
              padding: "0.35rem 0",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              if (pathname !== "/") {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
              }
            }}
          >
            HOME
          </Link>

          {/* 2. SHOP */}
          <Link
            href="/shop"
            style={{
              fontSize: "0.88rem",
              fontWeight: pathname === "/shop" || pathname.startsWith("/product/") ? 800 : 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: pathname === "/shop" || pathname.startsWith("/product/") ? "#ffffff" : "rgba(255, 255, 255, 0.75)",
              borderBottom: pathname === "/shop" || pathname.startsWith("/product/") ? "2px solid #ffffff" : "2px solid transparent",
              padding: "0.35rem 0",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              if (pathname !== "/shop" && !pathname.startsWith("/product/")) {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
              }
            }}
          >
            SHOP
          </Link>

          {/* 3. ABOUT US */}
          <Link
            href="/about-us"
            style={{
              fontSize: "0.88rem",
              fontWeight: pathname.startsWith("/about") ? 800 : 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: pathname.startsWith("/about") ? "#ffffff" : "rgba(255, 255, 255, 0.75)",
              borderBottom: pathname.startsWith("/about") ? "2px solid #ffffff" : "2px solid transparent",
              padding: "0.35rem 0",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              if (!pathname.startsWith("/about")) {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
              }
            }}
          >
            ABOUT US
          </Link>

          {/* 4. CATEGORIES (with Interactive Mega Dropdown) */}
          <div
            ref={categoriesRef}
            style={{ position: "relative" }}
            onMouseEnter={handleCategoriesMouseEnter}
            onMouseLeave={handleCategoriesMouseLeave}
          >
            <button
              type="button"
              onClick={() => setIsCategoriesOpen((prev) => !prev)}
              aria-expanded={isCategoriesOpen}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.88rem",
                fontWeight: pathname.startsWith("/catalogs") || isCategoriesOpen ? 800 : 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.35rem 0",
                color: pathname.startsWith("/catalogs") || isCategoriesOpen ? "#ffffff" : "rgba(255, 255, 255, 0.75)",
                borderBottom: pathname.startsWith("/catalogs") ? "2px solid #ffffff" : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                if (!pathname.startsWith("/catalogs") && !isCategoriesOpen) {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
                }
              }}
            >
              <span>CATEGORIES</span>
              <ChevronDown
                size={14}
                style={{
                  transform: isCategoriesOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </button>

            {/* Mega Dropdown for Categories (with Seamless Hover Bridge) */}
            {isCategoriesOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  paddingTop: "14px", // Seamless invisible bridge - zero dead space!
                  zIndex: 999,
                }}
                onMouseEnter={handleCategoriesMouseEnter}
                onMouseLeave={handleCategoriesMouseLeave}
              >
                <div
                  style={{
                    width: "840px",
                    backgroundColor: "rgba(12, 14, 20, 0.98)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    boxShadow: "0 28px 60px -10px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.12)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    borderRadius: "18px",
                    padding: "1.6rem 1.75rem",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Subtle Top Glow Ambient Accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "15%",
                      right: "15%",
                      height: "1px",
                      background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.8), rgba(59, 130, 246, 0.8), transparent)",
                    }}
                  />

                  {/* 4 Columns Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.1fr 1.1fr 1.1fr 1.25fr",
                      gap: "1.5rem",
                    }}
                  >
                    {/* Column 1: Hair Care & Color */}
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "0.85rem",
                          paddingBottom: "0.45rem",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span
                            style={{
                              width: "7px",
                              height: "7px",
                              borderRadius: "50%",
                              backgroundColor: "#a855f7",
                              display: "inline-block",
                              boxShadow: "0 0 8px #a855f7",
                            }}
                          />
                          <h4
                            style={{
                              fontSize: "0.82rem",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              color: "#ffffff",
                              margin: 0,
                            }}
                          >
                            Hair & Color
                          </h4>
                        </div>
                        <Link
                          href="/shop?category=Hair"
                          onClick={() => setIsCategoriesOpen(false)}
                          style={{
                            fontSize: "0.72rem",
                            color: "#c084fc",
                            fontWeight: 700,
                            textDecoration: "none",
                          }}
                        >
                          All Hair →
                        </Link>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <MegaCategoryItem
                          href="/shop?category=Hair&search=Shampoo"
                          label="Shampoos & Conditioners"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                        <MegaCategoryItem
                          href="/shop?category=Hair&search=Color"
                          label="Hair Color & Bleach"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                        <MegaCategoryItem
                          href="/shop?category=Hair&search=Mask"
                          label="Treatments & Masks"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                        <MegaCategoryItem
                          href="/shop?category=Hair&search=Serum"
                          label="Styling Sprays & Serums"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                        <MegaCategoryItem
                          href="/shop?category=Hair&search=Keratin"
                          label="Bonding & Keratin Care"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                      </div>
                    </div>

                    {/* Column 2: Beauty & Skin */}
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "0.85rem",
                          paddingBottom: "0.45rem",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span
                            style={{
                              width: "7px",
                              height: "7px",
                              borderRadius: "50%",
                              backgroundColor: "#f43f5e",
                              display: "inline-block",
                              boxShadow: "0 0 8px #f43f5e",
                            }}
                          />
                          <h4
                            style={{
                              fontSize: "0.82rem",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              color: "#ffffff",
                              margin: 0,
                            }}
                          >
                            Beauty & Skin
                          </h4>
                        </div>
                        <Link
                          href="/shop?category=Beauty"
                          onClick={() => setIsCategoriesOpen(false)}
                          style={{
                            fontSize: "0.72rem",
                            color: "#fb7185",
                            fontWeight: 700,
                            textDecoration: "none",
                          }}
                        >
                          All Skin →
                        </Link>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <MegaCategoryItem
                          href="/shop?category=Beauty&search=Facial"
                          label="Facial Kits & Bleach"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                        <MegaCategoryItem
                          href="/shop?category=Beauty&search=Cleanser"
                          label="Cleansers & Toners"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                        <MegaCategoryItem
                          href="/shop?category=Beauty&search=Moisturizer"
                          label="Moisturizers & Serums"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                        <MegaCategoryItem
                          href="/shop?category=Beauty&search=Wax"
                          label="Waxing & Body Care"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                        <MegaCategoryItem
                          href="/shop?category=Beauty&search=Massage"
                          label="Massage & Spa Backbar"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                      </div>
                    </div>

                    {/* Column 3: Tools & Nails */}
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "0.85rem",
                          paddingBottom: "0.45rem",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span
                            style={{
                              width: "7px",
                              height: "7px",
                              borderRadius: "50%",
                              backgroundColor: "#06b6d4",
                              display: "inline-block",
                              boxShadow: "0 0 8px #06b6d4",
                            }}
                          />
                          <h4
                            style={{
                              fontSize: "0.82rem",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              color: "#ffffff",
                              margin: 0,
                            }}
                          >
                            Tools & Nails
                          </h4>
                        </div>
                        <Link
                          href="/shop?category=Tools"
                          onClick={() => setIsCategoriesOpen(false)}
                          style={{
                            fontSize: "0.72rem",
                            color: "#22d3ee",
                            fontWeight: 700,
                            textDecoration: "none",
                          }}
                        >
                          All Tools →
                        </Link>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <MegaCategoryItem
                          href="/shop?category=Tools&search=Dryer"
                          label="Straighteners & Dryers"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                        <MegaCategoryItem
                          href="/shop?category=Tools&search=Clipper"
                          label="Clippers & Shavers"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                        <MegaCategoryItem
                          href="/shop?category=Tools&search=Heater"
                          label="Heaters & Warmers"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                        <MegaCategoryItem
                          href="/shop?category=Nails"
                          label="Nail Extensions & Gels"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                        <MegaCategoryItem
                          href="/shop?category=Commercial%20Cans"
                          label="Commercial Bulk Cans"
                          onClick={() => setIsCategoriesOpen(false)}
                        />
                      </div>
                    </div>

                    {/* Column 4: Top Brands & Quick Direct Links */}
                    <div
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        borderRadius: "14px",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "1.1rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginBottom: "0.75rem",
                          }}
                        >
                          <Sparkles size={13} color="#f59e0b" />
                          <span
                            style={{
                              fontSize: "0.76rem",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: "#ffffff",
                            }}
                          >
                            Authorized Brands
                          </span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                          {[
                            "L'Oréal",
                            "Schwarzkopf",
                            "Ikonic",
                            "Wella",
                            "Vega",
                            "Matrix",
                            "Babila",
                            "Alan Truman",
                          ].map((brand) => (
                            <MegaBrandChip
                              key={brand}
                              brand={brand}
                              onClick={() => setIsCategoriesOpen(false)}
                            />
                          ))}
                        </div>
                      </div>

                      <div
                        style={{
                          marginTop: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.45rem",
                        }}
                      >
                        <Link
                          href="/catalogs"
                          onClick={() => setIsCategoriesOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                            width: "100%",
                            fontSize: "0.75rem",
                            padding: "0.55rem 0.8rem",
                            textAlign: "center",
                            backgroundColor: "#ffffff",
                            color: "#0a0c10",
                            fontWeight: 800,
                            borderRadius: "9999px",
                            textDecoration: "none",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            boxShadow: "0 4px 14px rgba(255, 255, 255, 0.2)",
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.boxShadow =
                              "0 6px 18px rgba(255, 255, 255, 0.35)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 4px 14px rgba(255, 255, 255, 0.2)";
                          }}
                        >
                          <span>Digital Lookbooks</span>
                          <ArrowRight size={13} />
                        </Link>
                        <Link
                          href="/shop"
                          onClick={() => setIsCategoriesOpen(false)}
                          style={{
                            display: "block",
                            width: "100%",
                            fontSize: "0.72rem",
                            padding: "0.45rem 0.8rem",
                            textAlign: "center",
                            backgroundColor: "transparent",
                            color: "rgba(255, 255, 255, 0.7)",
                            fontWeight: 700,
                            borderRadius: "9999px",
                            textDecoration: "none",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#ffffff";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                          }}
                        >
                          View All 4,200+ Products
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Wholesale Pro Guarantee Strip */}
                  <div
                    style={{
                      marginTop: "1.25rem",
                      paddingTop: "0.85rem",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "0.72rem",
                      color: "rgba(255, 255, 255, 0.65)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <ShieldCheck size={14} color="#10b981" />
                      <span>100% Genuine Direct Salon Stock</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Zap size={14} color="#f59e0b" />
                      <span>Same-Day Metro Dispatch</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontWeight: 800, color: "#38bdf8" }}>GST</span>
                      <span>Instant B2B Tax Credit Invoices</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 5. CONTACT US */}
          <Link
            href="/contact-us"
            style={{
              fontSize: "0.88rem",
              fontWeight: pathname.startsWith("/contact") ? 800 : 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: pathname.startsWith("/contact") ? "#ffffff" : "rgba(255, 255, 255, 0.75)",
              borderBottom: pathname.startsWith("/contact") ? "2px solid #ffffff" : "2px solid transparent",
              padding: "0.35rem 0",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              if (!pathname.startsWith("/contact")) {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
              }
            }}
          >
            CONTACT US
          </Link>
        </nav>

        {/* Right: Shopping Cart & Mobile Menu Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Shopping Bag Button */}
          <button
            onClick={openCart}
            style={{
              position: "relative",
              padding: "0.55rem",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            aria-label="Shopping bag"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
          >
            <ShoppingBag size={20} color="#ffffff" />
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-only"
            style={{
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Only the 5 Client Links) */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#000000",
            borderBottom: "1px solid #27272a",
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            boxShadow: "0 15px 30px rgba(0,0,0,0.8)",
          }}
        >
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: pathname === "/" ? "#ffffff" : "#a1a1aa",
            }}
          >
            HOME
          </Link>
          <Link
            href="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: pathname === "/shop" ? "#ffffff" : "#a1a1aa",
            }}
          >
            SHOP
          </Link>
          <Link
            href="/about-us"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: pathname.startsWith("/about") ? "#ffffff" : "#a1a1aa",
            }}
          >
            ABOUT US
          </Link>
          <Link
            href="/catalogs"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: pathname.startsWith("/catalogs") ? "#ffffff" : "#a1a1aa",
            }}
          >
            CATEGORIES
          </Link>
          <Link
            href="/contact-us"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: pathname.startsWith("/contact") ? "#ffffff" : "#a1a1aa",
            }}
          >
            CONTACT US
          </Link>
        </div>
      )}
    </header>
  );
};
