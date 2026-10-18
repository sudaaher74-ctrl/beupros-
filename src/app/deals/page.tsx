"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";
import { Flame, Clock, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function DealsPage() {
  const [dealProducts, setDealProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDealTab, setActiveDealTab] = useState<"all" | "Hair" | "Tools" | "Beauty" | "clearance">("all");

  useEffect(() => {
    setLoading(true);
    let url = "/api/products?minDiscount=25&limit=24&sort=discount";
    if (activeDealTab === "clearance") {
      url = "/api/products?minDiscount=40&limit=24&sort=discount";
    } else if (activeDealTab !== "all") {
      url = `/api/products?category=${activeDealTab}&minDiscount=20&limit=24&sort=discount`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setDealProducts(data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeDealTab]);

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: "5rem" }}>
      {/* 1. Deals Hero Banner */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #f0f2f5",
          padding: "2.5rem 0",
        }}
      >
        <div className="container-custom">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#fef2f2",
                  color: "#dc2626",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginBottom: "8px",
                }}
              >
                <Flame size={14} color="#dc2626" /> Weekly Trade Price Drops
              </div>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.02em",
                  margin: "0 0 6px 0",
                }}
              >
                Wholesale Deals & Flash Promotions
              </h1>
              <p style={{ fontSize: "14px", color: "#64748b", margin: 0, maxWidth: "600px" }}>
                Exclusive trade discounts up to 50% on top professional salon formulations: Babila, L&apos;Oréal, Schwarzkopf, Matrix, Wella, and Vega.
              </p>
            </div>

            {/* Countdown / Assurance Widget */}
            <div
              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "16px",
                border: "1px solid #f0f2f5",
                padding: "12px 18px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <Clock size={18} color="#0f172a" />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                  Monday Trade Drop
                </div>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a" }}>
                  Batch Refreshes Every Monday
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom" style={{ paddingTop: "2rem" }}>
        {/* 2. Top 3 Feature Deal Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #f0f2f5",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  backgroundColor: "#fef2f2",
                  color: "#dc2626",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  borderRadius: "9999px",
                  display: "inline-block",
                  marginBottom: "10px",
                }}
              >
                Flash Clearance
              </span>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0" }}>
                Up to 50% Off SKUs
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0", lineHeight: 1.5 }}>
                High-discount salon essentials, bulk developer cans, and facial kits.
              </p>
            </div>
            <Link
              href="/shop?minDiscount=40"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#0f172a",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 700,
                textDecoration: "none",
                alignSelf: "flex-start",
              }}
            >
              Shop Clearance <ArrowRight size={13} />
            </Link>
          </div>

          {/* Card 2 */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #f0f2f5",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  backgroundColor: "#ecfdf5",
                  color: "#059669",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  borderRadius: "9999px",
                  display: "inline-block",
                  marginBottom: "10px",
                }}
              >
                Pro Appliances Sale
              </span>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0" }}>
                Stylers, Dryers & Heaters
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0", lineHeight: 1.5 }}>
                Heavy-duty commercial salon tools with warranty and instant trade discounts.
              </p>
            </div>
            <Link
              href="/shop?category=Tools"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#0f172a",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 700,
                textDecoration: "none",
                alignSelf: "flex-start",
              }}
            >
              Shop Pro Tools <ArrowRight size={13} />
            </Link>
          </div>

          {/* Card 3 */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #f0f2f5",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  backgroundColor: "#f5f3ff",
                  color: "#7c3aed",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  borderRadius: "9999px",
                  display: "inline-block",
                  marginBottom: "10px",
                }}
              >
                Extra Trade Savings
              </span>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0" }}>
                10% Extra with PRO10
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0", lineHeight: 1.5 }}>
                Apply code <strong style={{ color: "#0f172a" }}>PRO10</strong> at checkout for additional discounts on color batches.
              </p>
            </div>
            <Link
              href="/shop?category=Hair"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#0f172a",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 700,
                textDecoration: "none",
                alignSelf: "flex-start",
              }}
            >
              Shop Hair Colors <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* 3. Deal Category Tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Sparkles size={16} color="#0f172a" />
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
              Top Discounted Formulations
            </h2>
          </div>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All Pro Deals" },
              { id: "Hair", label: "Hair & Color (20%+)" },
              { id: "Tools", label: "Tools & Stylers (20%+)" },
              { id: "Beauty", label: "Skincare (20%+)" },
              { id: "clearance", label: "🔥 Clearance (40%+ Off)" },
            ].map((tab) => {
              const isActive = activeDealTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDealTab(tab.id as any)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    backgroundColor: isActive ? "#0f172a" : "#ffffff",
                    color: isActive ? "#ffffff" : "#475569",
                    border: isActive ? "1px solid #0f172a" : "1px solid #e2e8f0",
                    boxShadow: isActive
                      ? "0 2px 8px rgba(15, 23, 42, 0.15)"
                      : "0 1px 3px rgba(0,0,0,0.02)",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Products Grid */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  height: "340px",
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  border: "1px solid #f0f2f5",
                }}
              />
            ))}
          </div>
        ) : dealProducts.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {dealProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #f0f2f5",
              padding: "4rem 2rem",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              No deals found in this category right now. Check back next Monday!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
