"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Eye, ShoppingBag } from "lucide-react";
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

  return (
    <div
      className="product-card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Image Box */}
        <div className="product-image-box">
          {product.discountPercent > 0 && (
            <span
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "0.2rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.7rem",
                fontWeight: 700,
                zIndex: 2,
                letterSpacing: "0.04em",
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
              top: "10px",
              right: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              color: "#000000",
              border: "1px solid #e0e0e0",
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
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            title="Quick view"
          >
            <Eye size={17} />
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

        {/* Info */}
        <div style={{ padding: "1rem 1rem 0.5rem 1rem" }}>
          {/* Brand */}
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#444444",
              marginBottom: "0.3rem",
            }}
          >
            {product.brand}
          </div>

          {/* Title */}
          <Link
            href={`/product/${product.id}`}
            style={{
              fontSize: "0.88rem",
              fontWeight: 500,
              color: "#111111",
              lineHeight: 1.35,
              textDecoration: "none",
              display: "block",
              minHeight: "2.7rem",
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
              gap: "0.2rem",
              marginTop: "0.5rem",
              fontSize: "0.78rem",
              color: "#666666",
            }}
          >
            <div style={{ display: "flex", gap: "1px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={13}
                  fill={star <= Math.round(product.rating) ? "#000000" : "none"}
                  color="#000000"
                />
              ))}
            </div>
            <span style={{ marginLeft: "0.25rem", fontWeight: 600 }}>({product.reviewsCount})</span>
          </div>

          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.5rem",
              marginTop: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#000000" }}>
              ₹{product.salePrice.toLocaleString("en-IN")}
            </span>
            {product.mrp > product.salePrice && (
              <span
                style={{
                  fontSize: "0.85rem",
                  textDecoration: "line-through",
                  color: "#888888",
                }}
              >
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Add To Bag Button */}
      <div style={{ padding: "0.75rem 1rem 1rem 1rem" }}>
        <button
          onClick={() => addToCart(product, 1)}
          className="btn-pill-black"
          style={{
            width: "100%",
            padding: "0.6rem 1rem",
            fontSize: "0.8rem",
          }}
        >
          <ShoppingBag size={15} /> Add to Bag
        </button>
      </div>
    </div>
  );
};
