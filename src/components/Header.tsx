"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Header: React.FC = () => {
  const { totalItems, openCart, openSearch, openChat } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 90, backgroundColor: "#ffffff" }}>
      {/* Top ProRewards Announcement Banner */}
      <div
        style={{
          backgroundColor: "#30cb99",
          color: "#000000",
          padding: "0.5rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.85rem",
          fontWeight: 700,
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          <span
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              padding: "0.2rem 0.6rem",
              borderRadius: "4px",
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              fontWeight: 800,
            }}
          >
            PROREWARDS
          </span>
          <span style={{ letterSpacing: "0.03em", textTransform: "uppercase" }}>
            MEMBERS GET FREE SHIPPING & SAME DAY DELIVERY
          </span>
          <span style={{ fontWeight: 500, opacity: 0.85, fontSize: "0.8rem" }}>
            When you spend ₹1,500+ • Valid Today
          </span>
        </div>
        <Link
          href="/shop"
          className="btn-pill-black"
          style={{
            padding: "0.3rem 0.9rem",
            fontSize: "0.75rem",
            backgroundColor: "#000000",
            color: "#ffffff",
          }}
        >
          SHOP NOW
        </Link>
      </div>

      {/* Main Top Nav Bar */}
      <div
        style={{
          borderBottom: "1px solid #e5e5e5",
          padding: "1rem 0",
        }}
      >
        <div
          className="container-custom"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              textDecoration: "none",
            }}
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="18" stroke="#000000" strokeWidth="2.5" />
              <path
                d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M16 20C16 17.7909 17.7909 16 20 16C22.2091 16 24 17.7909 24 20"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="20" cy="20" r="2.5" fill="#000000" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#000000",
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
                  color: "#666666",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                PRO BEAUTY SUPPLY
              </span>
            </div>
          </Link>

          {/* Desktop Search Trigger & Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Instant Search Bar Trigger */}
            <button
              onClick={openSearch}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.55rem 1.2rem",
                backgroundColor: "#f5f5f5",
                borderRadius: "9999px",
                border: "1px solid #e5e5e5",
                color: "#666666",
                fontSize: "0.85rem",
                width: "280px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#eeeeee";
                e.currentTarget.style.borderColor = "#cccccc";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
                e.currentTarget.style.borderColor = "#e5e5e5";
              }}
              title="Search products, brands, or categories"
            >
              <Search size={16} color="#000000" />
              <span style={{ flex: 1, textAlign: "left" }}>Search 4,200+ pro products...</span>
              <kbd
                style={{
                  fontSize: "0.7rem",
                  backgroundColor: "#ffffff",
                  padding: "0.1rem 0.4rem",
                  borderRadius: "4px",
                  border: "1px solid #dddddd",
                  color: "#888888",
                }}
              >
                ⌘K
              </kbd>
            </button>

            {/* Ask Pro AI Stylist Button */}
            <button
              onClick={() => openChat()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.5rem 0.95rem",
                borderRadius: "9999px",
                border: "1.5px solid #000000",
                backgroundColor: "#ffffff",
                color: "#000000",
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.04em",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#000000";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#000000";
              }}
              title="Ask Pro Stylist AI for formulations or salon advice"
            >
              <Sparkles size={14} color="#d97706" />
              <span>Ask Pro AI</span>
            </button>

            {/* Auth Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <Link href="/shop" className="btn-pill-white">
                Sign Up
              </Link>
              <Link href="/shop" className="btn-pill-black">
                Log In
              </Link>
            </div>

            {/* Shopping Bag Button */}
            <button
              onClick={openCart}
              style={{
                position: "relative",
                padding: "0.6rem",
                borderRadius: "50%",
                backgroundColor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s ease",
              }}
              aria-label="Shopping bag"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e5e5")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
            >
              <ShoppingBag size={20} color="#000000" />
              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    width: "20px",
                    height: "20px",
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

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: "none",
                padding: "0.5rem",
              }}
              className="mobile-toggle"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Category Menu Bar (Exact SalonCentric tabs) */}
      <nav
        style={{
          borderBottom: "1px solid #e5e5e5",
          backgroundColor: "#ffffff",
          position: "relative",
        }}
      >
        <div
          className="container-custom hide-scrollbar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
            padding: "0.75rem 0",
            overflowX: "auto",
          }}
        >
          {/* SHOP with Megamenu */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setIsShopHovered(true)}
            onMouseLeave={() => setIsShopHovered(false)}
          >
            <Link
              href="/shop"
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.3rem 0",
              }}
            >
              SHOP <ChevronDown size={14} />
            </Link>

            {/* Mega Dropdown */}
            {isShopHovered && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "750px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 20px 30px rgba(0,0,0,0.12)",
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                  padding: "1.75rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "1.5rem",
                  zIndex: 99,
                }}
              >
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "0.75rem", borderBottom: "1px solid #eeeeee", paddingBottom: "0.4rem" }}>
                    Hair
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem", color: "#444444" }}>
                    <li><Link href="/shop?category=Hair">Shampoos & Conditioners</Link></li>
                    <li><Link href="/shop?category=Hair">Hair Color & Bleach</Link></li>
                    <li><Link href="/shop?category=Hair">Treatments & Masks</Link></li>
                    <li><Link href="/shop?category=Hair">Styling Sprays & Serums</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "0.75rem", borderBottom: "1px solid #eeeeee", paddingBottom: "0.4rem" }}>
                    Beauty & Skin
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem", color: "#444444" }}>
                    <li><Link href="/shop?category=Beauty">Facial Kits & Bleach</Link></li>
                    <li><Link href="/shop?category=Beauty">Cleansers & Toners</Link></li>
                    <li><Link href="/shop?category=Beauty">Moisturizers & Serums</Link></li>
                    <li><Link href="/shop?category=Beauty">Waxing & Body Care</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "0.75rem", borderBottom: "1px solid #eeeeee", paddingBottom: "0.4rem" }}>
                    Tools & Nails
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem", color: "#444444" }}>
                    <li><Link href="/shop?category=Tools">Straighteners & Dryers</Link></li>
                    <li><Link href="/shop?category=Tools">Heaters & Warmers</Link></li>
                    <li><Link href="/shop?category=Nails">Nail Extensions & Gels</Link></li>
                    <li><Link href="/shop?category=Accessories">Salon Towels & Brushes</Link></li>
                  </ul>
                </div>
                <div style={{ backgroundColor: "#f9f9f9", padding: "1rem", borderRadius: "6px" }}>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                    Top Brands
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", fontSize: "0.75rem" }}>
                    {["Babila", "Loreal", "Schwarzkopf", "Wella", "Vega", "Matrix", "Ikonic"].map((brand) => (
                      <Link
                        key={brand}
                        href={`/shop?brand=${encodeURIComponent(brand)}`}
                        style={{
                          backgroundColor: "#ffffff",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "4px",
                          border: "1px solid #e0e0e0",
                          fontWeight: 600,
                        }}
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <Link
                      href="/shop"
                      className="btn-pill-black"
                      style={{ width: "100%", fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
                    >
                      View All 4,200+
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/brands"
            style={{
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            BRANDS
          </Link>

          <Link
            href="/deals"
            style={{
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#c91f37",
            }}
          >
            DEALS
          </Link>

          <Link
            href="/education"
            style={{
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            LEARN
          </Link>

          <Link
            href="/catalogs"
            style={{
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            CATALOGS
          </Link>

          <Link
            href="/stores"
            style={{
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            STORES
          </Link>

          <Link
            href="/shop"
            style={{
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            DISCOVER
          </Link>

          <Link
            href="/shop?category=Hair"
            style={{
              fontSize: "0.9rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              color: "#000000",
            }}
          >
            HOLIDAY SHOP <Sparkles size={16} color="#d9384e" />
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#ffffff",
            borderBottom: "2px solid #000000",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              openChat();
            }}
            style={{
              backgroundColor: "#111111",
              color: "#ffffff",
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              border: "1px solid #f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontSize: "0.9rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              cursor: "pointer",
            }}
          >
            <Sparkles size={16} color="#f59e0b" />
            <span>Ask Pro Stylist AI</span>
          </button>
          <hr style={{ border: "none", borderTop: "1px solid #eeeeee", margin: "0.2rem 0" }} />
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 700, textTransform: "uppercase" }}>SHOP ALL PRODUCTS (4,200+)</Link>
          <Link href="/brands" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 700, textTransform: "uppercase" }}>BRANDS DIRECTORY</Link>
          <Link href="/deals" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 700, color: "#c91f37", textTransform: "uppercase" }}>DEALS & PROMOTIONS</Link>
          <Link href="/education" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 700, textTransform: "uppercase" }}>PRO EDUCATION & THE PLAYBOOK</Link>
          <Link href="/catalogs" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 700, textTransform: "uppercase" }}>DIGITAL PRO CATALOGS</Link>
          <Link href="/stores" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 700, textTransform: "uppercase" }}>STORES & PRO HUBS</Link>
          <hr style={{ border: "none", borderTop: "1px solid #eeeeee", margin: "0.2rem 0" }} />
          <Link href="/shop?category=Hair" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 600 }}>Hair Care & Color</Link>
          <Link href="/shop?category=Beauty" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 600 }}>Beauty & Skincare</Link>
          <Link href="/shop?category=Tools" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 600 }}>Tools & Appliances</Link>
          <Link href="/shop?category=Nails" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 600 }}>Nails & Accessories</Link>
        </div>
      )}
    </header>
  );
};
