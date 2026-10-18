"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, Sparkles, ChevronDown, User, ShieldCheck, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openCart, openSearch, openChat } = useCart();
  const { user, isApproved, isPending } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 90, backgroundColor: "#ffffff" }}>
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

          {/* Right Side Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            {/* Desktop Instant Search Bar Trigger */}
            <button
              onClick={openSearch}
              className="desktop-only"
              style={{
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

            {/* Desktop Ask Pro AI Stylist Button */}
            <button
              onClick={() => openChat()}
              className="desktop-only"
              style={{
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

            {/* Desktop Auth / User Status */}
            <div className="desktop-only" style={{ alignItems: "center", gap: "0.6rem" }}>
              {user ? (
                <Link
                  href="/account"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "0.45rem 0.85rem",
                    backgroundColor: isApproved ? "#ecfdf5" : isPending ? "#fffbeb" : "#f3f4f6",
                    border: `1px solid ${isApproved ? "#a7f3d0" : isPending ? "#fde68a" : "#d1d5db"}`,
                    borderRadius: "9999px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: isApproved ? "#065f46" : isPending ? "#92400e" : "#111111",
                  }}
                >
                  {isApproved && <ShieldCheck size={14} color="#10b981" />}
                  {isPending && <Clock size={14} color="#d97706" />}
                  {!isApproved && !isPending && <User size={14} />}
                  <span style={{ maxWidth: "120px" }} className="line-clamp-1">
                    {user.salonName || user.name}
                  </span>
                </Link>
              ) : (
                <>
                  <Link href="/register" className="btn-pill-white">
                    Sign Up
                  </Link>
                  <Link href="/login" className="btn-pill-black">
                    Log In
                  </Link>
                </>
              )}
              <Link
                href="/admin"
                style={{
                  backgroundColor: "#111111",
                  color: "#f59e0b",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  padding: "0.45rem 0.75rem",
                  borderRadius: "6px",
                  border: "1px solid #f59e0b",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Admin
              </Link>
            </div>

            {/* Mobile Search Icon Button */}
            <button
              onClick={openSearch}
              className="mobile-only"
              style={{
                padding: "0.5rem",
                borderRadius: "50%",
                backgroundColor: "#f5f5f5",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Search"
            >
              <Search size={20} color="#000000" />
            </button>

            {/* Shopping Bag Button (Desktop & Mobile) */}
            <button
              onClick={openCart}
              style={{
                position: "relative",
                padding: "0.55rem",
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
                alignItems: "center",
                justifyContent: "center",
                color: "#000000",
              }}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Full-Width Quick Search Trigger Bar */}
        <div className="mobile-only" style={{ padding: "0.6rem 1rem 0 1rem" }}>
          <button
            onClick={openSearch}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              padding: "0.65rem 1rem",
              backgroundColor: "#f5f5f5",
              borderRadius: "9999px",
              border: "1px solid #e5e5e5",
              color: "#71717a",
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            <Search size={16} color="#111111" />
            <span style={{ flex: 1, textAlign: "left" }}>Search 4,200+ salon products...</span>
          </button>
        </div>
      </div>

      {/* Secondary Category Menu Bar (Only 5 Client Items: HOME, SHOP, ABOUT US, CATEGORIES, CONTACT US) */}
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
            gap: "2.75rem",
            padding: "0.75rem 0",
            overflowX: "auto",
          }}
        >
          {/* 1. HOME */}
          <Link
            href="/"
            style={{
              fontSize: "0.9rem",
              fontWeight: pathname === "/" ? 800 : 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: pathname === "/" ? "#000000" : "#444444",
              borderBottom: pathname === "/" ? "2px solid #000000" : "2px solid transparent",
              padding: "0.3rem 0",
              transition: "all 0.15s ease",
            }}
          >
            HOME
          </Link>

          {/* 2. SHOP */}
          <Link
            href="/shop"
            style={{
              fontSize: "0.9rem",
              fontWeight: pathname === "/shop" || pathname.startsWith("/product/") ? 800 : 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: pathname === "/shop" || pathname.startsWith("/product/") ? "#000000" : "#444444",
              borderBottom: pathname === "/shop" || pathname.startsWith("/product/") ? "2px solid #000000" : "2px solid transparent",
              padding: "0.3rem 0",
              transition: "all 0.15s ease",
            }}
          >
            SHOP
          </Link>

          {/* 3. ABOUT US */}
          <Link
            href="/about-us"
            style={{
              fontSize: "0.9rem",
              fontWeight: pathname.startsWith("/about") ? 800 : 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: pathname.startsWith("/about") ? "#000000" : "#444444",
              borderBottom: pathname.startsWith("/about") ? "2px solid #000000" : "2px solid transparent",
              padding: "0.3rem 0",
              transition: "all 0.15s ease",
            }}
          >
            ABOUT US
          </Link>

          {/* 4. CATEGORIES (with Megamenu) */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setIsCategoriesHovered(true)}
            onMouseLeave={() => setIsCategoriesHovered(false)}
          >
            <Link
              href="/catalogs"
              style={{
                fontSize: "0.9rem",
                fontWeight: pathname.startsWith("/catalogs") ? 800 : 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.3rem 0",
                color: pathname.startsWith("/catalogs") ? "#000000" : "#444444",
                borderBottom: pathname.startsWith("/catalogs") ? "2px solid #000000" : "2px solid transparent",
                transition: "all 0.15s ease",
              }}
            >
              CATEGORIES <ChevronDown size={14} />
            </Link>

            {/* Mega Dropdown for Categories */}
            {isCategoriesHovered && (
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
                    Hair Care & Color
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
                    <li><Link href="/shop?category=Commercial Cans">Commercial Bulk Cans</Link></li>
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
                      href="/catalogs"
                      className="btn-pill-black"
                      style={{ width: "100%", fontSize: "0.75rem", padding: "0.4rem 0.8rem", textAlign: "center" }}
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
              fontSize: "0.9rem",
              fontWeight: pathname.startsWith("/contact") ? 800 : 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: pathname.startsWith("/contact") ? "#000000" : "#444444",
              borderBottom: pathname.startsWith("/contact") ? "2px solid #000000" : "2px solid transparent",
              padding: "0.3rem 0",
              transition: "all 0.15s ease",
            }}
          >
            CONTACT US
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
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            maxHeight: "calc(100vh - 120px)",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* User Account Bar in Mobile Menu */}
          {user ? (
            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                backgroundColor: isApproved ? "#ecfdf5" : isPending ? "#fffbeb" : "#f3f4f6",
                border: `1px solid ${isApproved ? "#a7f3d0" : isPending ? "#fde68a" : "#d1d5db"}`,
                color: isApproved ? "#065f46" : isPending ? "#92400e" : "#111111",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {isApproved && <ShieldCheck size={18} color="#10b981" />}
                {isPending && <Clock size={18} color="#d97706" />}
                {!isApproved && !isPending && <User size={18} />}
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 800 }}>{user.salonName || user.name}</div>
                  <div style={{ fontSize: "11px", fontWeight: 600, opacity: 0.85 }}>
                    {isApproved ? "VERIFIED PRO TRADE ACCOUNT" : isPending ? "VERIFICATION PENDING" : "TRADE ACCOUNT"}
                  </div>
                </div>
              </div>
              <span style={{ fontSize: "12px", fontWeight: 700, textDecoration: "underline" }}>Manage</span>
            </Link>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-pill-black"
                style={{ padding: "0.6rem", fontSize: "12px", textAlign: "center" }}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-pill-white"
                style={{ padding: "0.6rem", fontSize: "12px", textAlign: "center" }}
              >
                Register Salon
              </Link>
            </div>
          )}

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
          <Link
            href="/admin"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              backgroundColor: "#111111",
              color: "#f59e0b",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "0.85rem",
              fontWeight: 800,
              textTransform: "uppercase",
              border: "1px solid #f59e0b",
            }}
          >
            <span>Admin Dashboard</span>
            <span style={{ fontSize: "10px", backgroundColor: "#f59e0b", color: "#000", padding: "2px 6px", borderRadius: "4px" }}>PORTAL</span>
          </Link>
          <hr style={{ border: "none", borderTop: "1px solid #eeeeee", margin: "0.2rem 0" }} />
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", color: pathname === "/" ? "#e5b95f" : "inherit" }}>HOME</Link>
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", color: pathname === "/shop" ? "#e5b95f" : "inherit" }}>SHOP</Link>
          <Link href="/about-us" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", color: pathname.startsWith("/about") ? "#e5b95f" : "inherit" }}>ABOUT US</Link>
          <Link href="/catalogs" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", color: pathname.startsWith("/catalogs") ? "#e5b95f" : "inherit" }}>CATEGORIES</Link>
          <Link href="/contact-us" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", color: pathname.startsWith("/contact") ? "#e5b95f" : "inherit" }}>CONTACT US</Link>
        </div>
      )}
    </header>
  );
};
