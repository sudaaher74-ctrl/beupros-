"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";
import { Flame } from "lucide-react";

export default function DealsPage() {
  const [dealProducts, setDealProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?minDiscount=25&limit=24&sort=discount")
      .then((res) => res.json())
      .then((data) => setDealProducts(data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: "#ffffff", paddingBottom: "5rem" }}>
      {/* Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #111827 0%, #000000 100%)",
          color: "#ffffff",
          padding: "3.5rem 0",
          textAlign: "center",
        }}
      >
        <div className="container-custom">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              backgroundColor: "#d9384e",
              padding: "0.3rem 0.8rem",
              borderRadius: "9999px",
              fontSize: "0.8rem",
              fontWeight: 800,
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            <Flame size={16} /> Exclusive Pro Savings
          </div>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
            Salon Deals & Promotions
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#cccccc", maxWidth: "650px", margin: "0 auto" }}>
            Save up to 50% on top professional salon brands: Babila, L&apos;Oréal, Schwarzkopf, Matrix, Wella, and Vega.
          </p>
        </div>
      </div>

      <div className="container-custom" style={{ paddingTop: "3rem" }}>
        {/* Deal Highlights 3-Card Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3.5rem",
          }}
        >
          <div style={{ backgroundColor: "#fef2f2", padding: "2rem", borderRadius: "12px", border: "1px solid #fecaca" }}>
            <div style={{ color: "#dc2626", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.3rem" }}>
              FLASH CLEARANCE
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>Up to 50% Off</h3>
            <p style={{ fontSize: "0.88rem", color: "#666666", marginBottom: "1.25rem" }}>
              High-discount salon essentials, stylers, and facial kits.
            </p>
            <Link href="/shop?minDiscount=40" className="btn-pill-black" style={{ fontSize: "0.8rem" }}>
              Shop Clearance
            </Link>
          </div>

          <div style={{ backgroundColor: "#f0fdf4", padding: "2rem", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
            <div style={{ color: "#16a34a", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.3rem" }}>
              PRO APPLIANCES SALE
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>Straighteners & Heaters</h3>
            <p style={{ fontSize: "0.88rem", color: "#666666", marginBottom: "1.25rem" }}>
              Heavy-duty salon tools with instant wholesale trade discounts.
            </p>
            <Link href="/shop?category=Tools" className="btn-pill-black" style={{ fontSize: "0.8rem" }}>
              Shop Tools
            </Link>
          </div>

          <div style={{ backgroundColor: "#faf5ff", padding: "2rem", borderRadius: "12px", border: "1px solid #e9d5ff" }}>
            <div style={{ color: "#9333ea", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.3rem" }}>
              COLOR & TREATMENTS
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>Buy In Bulk & Save</h3>
            <p style={{ fontSize: "0.88rem", color: "#666666", marginBottom: "1.25rem" }}>
              Extra 10% off with coupon code <strong>PRO10</strong> at checkout.
            </p>
            <Link href="/shop?category=Hair" className="btn-pill-black" style={{ fontSize: "0.8rem" }}>
              Shop Hair Color
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "1.75rem" }}>
          Top Discounted Pro Products
        </h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>Loading pro deals...</div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {dealProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
