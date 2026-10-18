"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Eye, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  style?: React.CSSProperties;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, style }) => {
  const { addToCart, openQuickView } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image || "/placeholder.png");
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1400);
  };

  const savings = product.mrp > product.salePrice ? product.mrp - product.salePrice : 0;

  return (
    <div
      className="product-card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        borderRadius: "18px",
        border: "1px solid #f0f2f5",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        boxShadow: isHovered ? "0 12px 24px rgba(0,0,0,0.06)" : "0 2px 8px rgba(0,0,0,0.02)",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Image Box */}
        <div className="product-image-box" style={{ position: "relative", backgroundColor: "#f8f9fa" }}>
          {product.discountPercent > 0 && (
            <span
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                backgroundColor: "#0f172a",
                color: "#ffffff",
                padding: "4px 8px",
                borderRadius: "9999px",
                fontSize: "10.5px",
                fontWeight: 700,
                zIndex: 2,
                letterSpacing: "0.02em",
                boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
              }}
            >
              {product.discount}
            </span>
          )}

          {/* Quick View Button overlay on hover */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(product);
            }}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              color: "#0f172a",
              border: "1px solid #eef0f3",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scale(1)" : "scale(0.85)",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              zIndex: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              cursor: "pointer",
            }}
            title="Quick view"
          >
            <Eye size={16} />
          </button>

          <Link href={`/product/${product.id}`} style={{ display: "block", width: "100%", height: "100%" }}>
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              onError={() => setImgSrc("/placeholder.png")}
              style={{ objectFit: "contain", padding: "1rem" }}
            />
          </Link>
        </div>

        {/* Info Box */}
        <div style={{ padding: "14px 14px 6px 14px" }}>
          {/* Brand */}
          <div
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#64748b",
              marginBottom: "4px",
            }}
          >
            {product.brand}
          </div>

          {/* Title */}
          <Link
            href={`/product/${product.id}`}
            style={{
              fontSize: "13.5px",
              fontWeight: 600,
              color: "#0f172a",
              lineHeight: 1.35,
              textDecoration: "none",
              display: "block",
              minHeight: "36px",
              transition: "color 0.15s ease",
            }}
            className="line-clamp-2"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginTop: "6px",
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            <div style={{ display: "flex", gap: "2px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  fill={star <= Math.round(product.rating) ? "#f59e0b" : "none"}
                  color={star <= Math.round(product.rating) ? "#f59e0b" : "#cbd5e1"}
                />
              ))}
            </div>
            <span style={{ marginLeft: "3px", fontWeight: 600, fontSize: "11.5px" }}>({product.reviewsCount})</span>
          </div>

          {/* Price & Savings */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "6px",
              marginTop: "8px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>
              ₹{product.salePrice.toLocaleString("en-IN")}
            </span>
            {product.mrp > product.salePrice && (
              <span
                style={{
                  fontSize: "12px",
                  textDecoration: "line-through",
                  color: "#94a3b8",
                  fontWeight: 500,
                }}
              >
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
            {savings > 0 && (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  backgroundColor: "#ecfdf5",
                  color: "#059669",
                  padding: "1px 6px",
                  borderRadius: "9999px",
                  marginLeft: "auto",
                }}
              >
                Save ₹{savings.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Add To Bag Button */}
      <div style={{ padding: "8px 14px 14px 14px" }}>
        <button
          onClick={handleAdd}
          style={{
            width: "100%",
            padding: "9px 12px",
            fontSize: "12.5px",
            fontWeight: 700,
            borderRadius: "9999px",
            border: "none",
            backgroundColor: justAdded ? "#10b981" : "#0f172a",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: justAdded ? "0 4px 12px rgba(16, 185, 129, 0.25)" : "0 2px 8px rgba(15, 23, 42, 0.12)",
          }}
        >
          {justAdded ? (
            <>
              <Check size={14} /> Added to Order!
            </>
          ) : (
            <>
              <ShoppingBag size={14} /> Add to Bag
            </>
          )}
        </button>
      </div>
    </div>
  );
};
