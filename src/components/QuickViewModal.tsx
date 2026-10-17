"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, qty);
    closeQuickView();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(5px)",
        zIndex: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={closeQuickView}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          maxWidth: "850px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          animation: "modalFadeIn 0.25s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Product Image */}
        <div
          style={{
            backgroundColor: "#f8f8f8",
            padding: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            minHeight: "360px",
          }}
        >
          <Image
            src={quickViewProduct.image || "/placeholder.png"}
            alt={quickViewProduct.name}
            fill
            sizes="400px"
            style={{ objectFit: "contain", padding: "2rem" }}
          />
          {quickViewProduct.discountPercent > 0 && (
            <span
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "1.5rem",
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "0.3rem 0.6rem",
                borderRadius: "4px",
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              {quickViewProduct.discount}
            </span>
          )}
        </div>

        {/* Product Details */}
        <div style={{ padding: "2rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", color: "#666666", letterSpacing: "0.08em" }}>
              {quickViewProduct.brand} • {quickViewProduct.category}
            </div>

            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#000000", marginTop: "0.4rem", lineHeight: 1.3 }}>
              {quickViewProduct.name}
            </h2>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.6rem" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    fill={s <= Math.round(quickViewProduct.rating) ? "#000000" : "none"}
                    color="#000000"
                  />
                ))}
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{quickViewProduct.rating}</span>
              <span style={{ fontSize: "0.85rem", color: "#666666" }}>({quickViewProduct.reviewsCount} pro reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginTop: "1.25rem" }}>
              <span style={{ fontSize: "1.65rem", fontWeight: 800, color: "#000000" }}>
                ₹{quickViewProduct.salePrice.toLocaleString("en-IN")}
              </span>
              {quickViewProduct.mrp > quickViewProduct.salePrice && (
                <span style={{ fontSize: "1.1rem", textDecoration: "line-through", color: "#888888" }}>
                  ₹{quickViewProduct.mrp.toLocaleString("en-IN")}
                </span>
              )}
              {quickViewProduct.discountPercent > 0 && (
                <span style={{ fontSize: "0.85rem", color: "#16a34a", fontWeight: 700 }}>
                  Save ₹{(quickViewProduct.mrp - quickViewProduct.salePrice).toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: "0.88rem", color: "#444444", marginTop: "1rem", lineHeight: 1.5 }}>
              {quickViewProduct.description || "100% authentic salon-grade product sourced directly from verified brand distributors. Designed specifically for professional salon use."}
            </p>

            {/* Value Points */}
            <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.8rem", color: "#444444" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShieldCheck size={16} color="#000000" />
                <span>100% Authentic Brand Guarantee</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Truck size={16} color="#000000" />
                <span>Free shipping on orders ₹1,500+</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <RotateCcw size={16} color="#000000" />
                <span>Hassle-free trade returns & exchanges</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #eeeeee" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem" }}>
              {/* Qty Selector */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1.5px solid #000000",
                  borderRadius: "9999px",
                  padding: "0.2rem 0.6rem",
                }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{ padding: "0.3rem 0.5rem", display: "flex", alignItems: "center" }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span style={{ minWidth: "30px", textAlign: "center", fontWeight: 700, fontSize: "0.95rem" }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  style={{ padding: "0.3rem 0.5rem", display: "flex", alignItems: "center" }}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAdd}
                className="btn-pill-black"
                style={{ flex: 1, padding: "0.8rem", fontSize: "0.9rem" }}
              >
                <ShoppingBag size={18} /> Add to Bag
              </button>
            </div>

            <div style={{ textAlign: "center" }}>
              <Link
                href={`/product/${quickViewProduct.id}`}
                onClick={closeQuickView}
                style={{ fontSize: "0.82rem", fontWeight: 600, textDecoration: "underline", color: "#444444" }}
              >
                View full product specifications & details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
