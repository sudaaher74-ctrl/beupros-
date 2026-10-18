"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, MessageCircleMore, Tag, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openCart, openChat } = useCart();

  const isHome = pathname === "/";
  const isShop = pathname.startsWith("/shop") || pathname.startsWith("/product") || pathname.startsWith("/brands");
  const isDeals = pathname.startsWith("/deals");

  return (
    <nav
      className="mobile-only"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "60px",
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid #e5e5e5",
        zIndex: 88,
        alignItems: "center",
        justifyContent: "space-around",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.05)",
      }}
      aria-label="Mobile Bottom Navigation"
    >
      {/* 1. Home */}
      <Link
        href="/"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          flex: 1,
          height: "100%",
          color: isHome ? "#000000" : "#71717a",
          transition: "color 0.15s ease",
        }}
      >
        <Home size={20} strokeWidth={isHome ? 2.5 : 1.8} />
        <span style={{ fontSize: "10px", fontWeight: isHome ? 800 : 500, letterSpacing: "0.02em" }}>
          Home
        </span>
      </Link>

      {/* 2. Shop */}
      <Link
        href="/shop"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          flex: 1,
          height: "100%",
          color: isShop ? "#000000" : "#71717a",
          transition: "color 0.15s ease",
        }}
      >
        <LayoutGrid size={20} strokeWidth={isShop ? 2.5 : 1.8} />
        <span style={{ fontSize: "10px", fontWeight: isShop ? 800 : 500, letterSpacing: "0.02em" }}>
          Shop
        </span>
      </Link>

      {/* 3. Center Ask AI Floating Button */}
      <button
        onClick={() => openChat()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          height: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Ask Pro Stylist AI"
      >
        <div
          style={{
            marginTop: "-14px",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            backgroundColor: "#000000",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            transition: "transform 0.15s ease",
          }}
        >
          <MessageCircleMore size={22} color="#ffffff" strokeWidth={2.2} />
        </div>
        <span
          style={{
            fontSize: "9.5px",
            fontWeight: 800,
            color: "#b45309",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            marginTop: "1px",
          }}
        >
          Ask AI
        </span>
      </button>

      {/* 4. Deals */}
      <Link
        href="/deals"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          flex: 1,
          height: "100%",
          color: isDeals ? "#c91f37" : "#71717a",
          transition: "color 0.15s ease",
        }}
      >
        <Tag size={20} strokeWidth={isDeals ? 2.5 : 1.8} color={isDeals ? "#c91f37" : "#71717a"} />
        <span style={{ fontSize: "10px", fontWeight: isDeals ? 800 : 500, letterSpacing: "0.02em" }}>
          Deals
        </span>
      </Link>

      {/* 5. Bag */}
      <button
        onClick={openCart}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          flex: 1,
          height: "100%",
          background: "none",
          border: "none",
          color: "#71717a",
          cursor: "pointer",
          position: "relative",
        }}
        aria-label="View Shopping Bag"
      >
        <div style={{ position: "relative" }}>
          <ShoppingBag size={20} strokeWidth={1.8} />
          {totalItems > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-8px",
                backgroundColor: "#000000",
                color: "#ffffff",
                fontSize: "9px",
                fontWeight: 800,
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {totalItems}
            </span>
          )}
        </div>
        <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.02em" }}>
          Bag
        </span>
      </button>
    </nav>
  );
};
