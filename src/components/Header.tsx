"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);

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

          {/* 4. CATEGORIES (with Mega Dropdown) */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setIsCategoriesHovered(true)}
            onMouseLeave={() => setIsCategoriesHovered(false)}
          >
            <Link
              href="/catalogs"
              style={{
                fontSize: "0.88rem",
                fontWeight: pathname.startsWith("/catalogs") ? 800 : 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.35rem 0",
                color: pathname.startsWith("/catalogs") ? "#ffffff" : "rgba(255, 255, 255, 0.75)",
                borderBottom: pathname.startsWith("/catalogs") ? "2px solid #ffffff" : "2px solid transparent",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                if (!pathname.startsWith("/catalogs")) {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
                }
              }}
            >
              <span>CATEGORIES</span>
              <ChevronDown size={14} />
            </Link>

            {/* Mega Dropdown for Categories */}
            {isCategoriesHovered && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "740px",
                  backgroundColor: "#111111",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
                  border: "1px solid #27272a",
                  borderRadius: "12px",
                  padding: "1.75rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "1.5rem",
                  zIndex: 99,
                  marginTop: "0.5rem",
                }}
              >
                <div>
                  <h4
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      marginBottom: "0.75rem",
                      borderBottom: "1px solid #27272a",
                      paddingBottom: "0.4rem",
                      color: "#ffffff",
                    }}
                  >
                    Hair Care & Color
                  </h4>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      fontSize: "0.82rem",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <li>
                      <Link href="/shop?category=Hair" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                        Shampoos & Conditioners
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?category=Hair" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                        Hair Color & Bleach
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?category=Hair" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                        Treatments & Masks
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?category=Hair" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                        Styling Sprays & Serums
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      marginBottom: "0.75rem",
                      borderBottom: "1px solid #27272a",
                      paddingBottom: "0.4rem",
                      color: "#ffffff",
                    }}
                  >
                    Beauty & Skin
                  </h4>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      fontSize: "0.82rem",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <li>
                      <Link href="/shop?category=Beauty" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                        Facial Kits & Bleach
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?category=Beauty" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                        Cleansers & Toners
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?category=Beauty" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                        Moisturizers & Serums
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?category=Beauty" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                        Waxing & Body Care
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      marginBottom: "0.75rem",
                      borderBottom: "1px solid #27272a",
                      paddingBottom: "0.4rem",
                      color: "#ffffff",
                    }}
                  >
                    Tools & Nails
                  </h4>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      fontSize: "0.82rem",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <li>
                      <Link href="/shop?category=Tools" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                        Straighteners & Dryers
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?category=Tools" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                        Heaters & Warmers
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?category=Nails" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                        Nail Extensions & Gels
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?category=Commercial Cans" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                        Commercial Bulk Cans
                      </Link>
                    </li>
                  </ul>
                </div>

                <div style={{ backgroundColor: "#18181b", padding: "1rem", borderRadius: "8px", border: "1px solid #27272a" }}>
                  <h4
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      marginBottom: "0.6rem",
                      color: "#ffffff",
                    }}
                  >
                    Top Brands
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", fontSize: "0.75rem" }}>
                    {["Babila", "Loreal", "Schwarzkopf", "Wella", "Vega", "Matrix", "Ikonic"].map((brand) => (
                      <Link
                        key={brand}
                        href={`/shop?brand=${encodeURIComponent(brand)}`}
                        style={{
                          backgroundColor: "#27272a",
                          color: "#e4e4e7",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "4px",
                          border: "1px solid #3f3f46",
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <Link
                      href="/catalogs"
                      style={{
                        display: "block",
                        width: "100%",
                        fontSize: "0.75rem",
                        padding: "0.45rem 0.8rem",
                        textAlign: "center",
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        fontWeight: 800,
                        borderRadius: "9999px",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Browse All Categories
                    </Link>
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
