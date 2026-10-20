"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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



          {/* 4. CONTACT US */}
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
