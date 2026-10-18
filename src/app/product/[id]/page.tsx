"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronRight,
  Plus,
  Minus,
  CheckCircle2,
  FileText,
  Sparkles,
  Layers,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "usage" | "guarantee">("overview");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product || null);
        setRelated(data.related || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, qty);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: "#f8f9fa", minHeight: "80vh", padding: "6rem 2rem", textAlign: "center" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid #e2e8f0", borderTopColor: "#0f172a", borderRadius: "50%", margin: "0 auto 16px auto", animation: "spin 1s linear infinite" }} />
        <p style={{ fontSize: "14px", color: "#64748b", fontWeight: 600 }}>Loading salon formulation specifications...</p>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ backgroundColor: "#f8f9fa", minHeight: "80vh", padding: "6rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>Product Not Found</h2>
        <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>The requested salon item does not exist or has been archived.</p>
        <Link
          href="/shop"
          style={{
            display: "inline-flex",
            padding: "10px 24px",
            borderRadius: "9999px",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "13px",
            textDecoration: "none",
          }}
        >
          Back to Pro Catalog
        </Link>
      </div>
    );
  }

  const savings = product.mrp > product.salePrice ? product.mrp - product.salePrice : 0;

  // Wholesale tiered pricing calculations
  const tier1Price = product.salePrice;
  const tier2Price = Math.round(product.salePrice * 0.95); // 5% bulk discount (3-5 units)
  const tier3Price = Math.round(product.salePrice * 0.90); // 10% master salon pack (6+ units)

  const currentUnitPrice =
    qty >= 6 ? tier3Price : qty >= 3 ? tier2Price : tier1Price;

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: "5rem" }}>
      {/* 1. Breadcrumb Bar */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #f0f2f5",
          padding: "12px 0",
        }}
      >
        <div
          className="container-custom"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12.5px",
            color: "#64748b",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>
            Home
          </Link>
          <ChevronRight size={13} color="#94a3b8" />
          <Link href="/shop" style={{ color: "#64748b", textDecoration: "none" }}>
            Catalog
          </Link>
          <ChevronRight size={13} color="#94a3b8" />
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            style={{ color: "#64748b", textDecoration: "none" }}
          >
            {product.category}
          </Link>
          <ChevronRight size={13} color="#94a3b8" />
          <span style={{ color: "#0f172a", fontWeight: 700 }}>{product.brand}</span>
        </div>
      </div>

      <div className="container-custom" style={{ paddingTop: "2rem" }}>
        {/* 2. Main Product Hero Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(1.5rem, 3.5vw, 3rem)",
            marginBottom: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left: Product Media Gallery Showcase */}
          <div>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1",
                backgroundColor: "#ffffff",
                borderRadius: "24px",
                border: "1px solid #f0f2f5",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              }}
            >
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "contain", padding: "2rem" }}
              />

              {/* Discount Pill */}
              {product.discountPercent > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    padding: "6px 12px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  }}
                >
                  {product.discount}
                </span>
              )}

              {/* Verified Formulation Badge */}
              <span
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  color: "#0f172a",
                  padding: "5px 10px",
                  borderRadius: "9999px",
                  fontSize: "11px",
                  fontWeight: 700,
                  border: "1px solid #eef0f3",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                }}
              >
                <CheckCircle2 size={13} color="#10b981" />
                100% Genuine
              </span>
            </div>

            {/* Micro Guarantees Under Image */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                marginTop: "14px",
              }}
            >
              {[
                { title: "Direct Sourced", desc: "Official distributor" },
                { title: "Climate Guard", desc: "Optimal storage" },
                { title: "Tamper Sealed", desc: "Batch verified" },
              ].map((pill, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "14px",
                    border: "1px solid #f0f2f5",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "11.5px", fontWeight: 800, color: "#0f172a" }}>
                    {pill.title}
                  </div>
                  <div style={{ fontSize: "10px", color: "#64748b", marginTop: "2px" }}>
                    {pill.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details & Wholesale Console */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Brand Link */}
            <Link
              href={`/shop?brand=${encodeURIComponent(product.brand)}`}
              style={{
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#64748b",
                marginBottom: "6px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>{product.brand}</span>
              <span style={{ color: "#94a3b8" }}>• Authorized Wholesale</span>
            </Link>

            {/* Product Title */}
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
                marginBottom: "12px",
              }}
            >
              {product.name}
            </h1>

            {/* Rating Stars & Reviews */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "18px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", gap: "2px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={15}
                    fill={s <= Math.round(product.rating) ? "#f59e0b" : "none"}
                    color={s <= Math.round(product.rating) ? "#f59e0b" : "#cbd5e1"}
                  />
                ))}
              </div>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
                {product.rating}
              </span>
              <span style={{ fontSize: "12.5px", color: "#64748b" }}>
                ({product.reviewsCount} verified salon stylist reviews)
              </span>
              <span
                style={{
                  backgroundColor: "#ecfdf5",
                  color: "#059669",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "9999px",
                }}
              >
                Top Pick
              </span>
            </div>

            {/* Wholesale Price Box */}
            <div
              style={{
                padding: "20px",
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                border: "1px solid #f0f2f5",
                marginBottom: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: "28px", fontWeight: 900, color: "#0f172a" }}>
                  ₹{(currentUnitPrice * qty).toLocaleString("en-IN")}
                </span>
                {product.mrp > currentUnitPrice && (
                  <span
                    style={{
                      fontSize: "15px",
                      textDecoration: "line-through",
                      color: "#94a3b8",
                      fontWeight: 500,
                    }}
                  >
                    ₹{(product.mrp * qty).toLocaleString("en-IN")}
                  </span>
                )}
                {savings > 0 && (
                  <span
                    style={{
                      backgroundColor: "#ecfdf5",
                      color: "#059669",
                      padding: "3px 10px",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: 800,
                    }}
                  >
                    Save ₹{(product.mrp * qty - currentUnitPrice * qty).toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  marginTop: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FileText size={13} color="#64748b" />
                Inclusive of 18% GST • Input Tax Credit (ITC) Eligible for Registered Salons
              </div>

              {/* Wholesale Tier Pricing Breakdown Table */}
              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "14px",
                  borderTop: "1px solid #f0f2f5",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#64748b",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Layers size={13} />
                  Wholesale Volume Breaks (Click to Apply)
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "8px",
                  }}
                >
                  {/* Tier 1 */}
                  <div
                    onClick={() => setQty(1)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: "12px",
                      border:
                        qty < 3 ? "1.5px solid #0f172a" : "1px solid #f0f2f5",
                      backgroundColor: qty < 3 ? "#f8f9fa" : "#ffffff",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b" }}>
                      1 - 2 Units
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>
                      ₹{tier1Price.toLocaleString("en-IN")}/ea
                    </div>
                    <div style={{ fontSize: "10px", color: "#64748b" }}>Standard Pro</div>
                  </div>

                  {/* Tier 2 */}
                  <div
                    onClick={() => setQty(3)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: "12px",
                      border:
                        qty >= 3 && qty < 6
                          ? "1.5px solid #0f172a"
                          : "1px solid #f0f2f5",
                      backgroundColor:
                        qty >= 3 && qty < 6 ? "#f8f9fa" : "#ffffff",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#059669" }}>
                      3 - 5 Units (Save 5%)
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>
                      ₹{tier2Price.toLocaleString("en-IN")}/ea
                    </div>
                    <div style={{ fontSize: "10px", color: "#059669", fontWeight: 600 }}>Salon Case</div>
                  </div>

                  {/* Tier 3 */}
                  <div
                    onClick={() => setQty(6)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: "12px",
                      border:
                        qty >= 6 ? "1.5px solid #0f172a" : "1px solid #f0f2f5",
                      backgroundColor: qty >= 6 ? "#f8f9fa" : "#ffffff",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#059669" }}>
                      6+ Units (Save 10%)
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>
                      ₹{tier3Price.toLocaleString("en-IN")}/ea
                    </div>
                    <div style={{ fontSize: "10px", color: "#059669", fontWeight: 700 }}>Master Pack</div>
                  </div>
                </div>
              </div>
            </div>

            {/* In Stock & Dispatch Status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12.5px",
                color: "#059669",
                fontWeight: 700,
                marginBottom: "18px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  display: "inline-block",
                }}
              />
              In Stock & Ready For Immediate Dispatch • Dispatches in 24 Hours
            </div>

            {/* Quantity Selector & Add to Bag */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              {/* Stepper */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e2e8f0",
                  borderRadius: "9999px",
                  padding: "4px 8px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "#f8f9fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#0f172a",
                  }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span
                  style={{
                    minWidth: "40px",
                    textAlign: "center",
                    fontWeight: 800,
                    fontSize: "14px",
                    color: "#0f172a",
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "#f8f9fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#0f172a",
                  }}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Order Button */}
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: "13px 24px",
                  borderRadius: "9999px",
                  border: "none",
                  backgroundColor: justAdded ? "#10b981" : "#0f172a",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: justAdded
                    ? "0 4px 14px rgba(16, 185, 129, 0.3)"
                    : "0 4px 14px rgba(15, 23, 42, 0.2)",
                }}
              >
                {justAdded ? (
                  <>
                    <Check size={16} /> Added to Salon Order!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> Add to Salon Order
                  </>
                )}
              </button>
            </div>

            {/* Saledash 3 Value Pillars */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                border: "1px solid #f0f2f5",
                padding: "16px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <ShieldCheck size={18} color="#0f172a" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "12.5px", color: "#334155" }}>
                  <strong style={{ color: "#0f172a" }}>100% Authentic Brand Guarantee:</strong> Directly
                  procured from authorized brand principals with genuine batch codes.
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <Truck size={18} color="#0f172a" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "12.5px", color: "#334155" }}>
                  <strong style={{ color: "#0f172a" }}>Free Express Dispatch:</strong> On all orders over
                  ₹1,500 with secure temperature-controlled packaging.
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <RotateCcw size={18} color="#0f172a" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "12.5px", color: "#334155" }}>
                  <strong style={{ color: "#0f172a" }}>Hassle-Free Salon Replacement:</strong> Instant
                  trade exchange or credit for transit-damaged items within 48 hours.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Saledash Tabs for Description, Specifications, and Protocol */}
        <div style={{ marginBottom: "4rem" }}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "16px",
              overflowX: "auto",
              paddingBottom: "4px",
            }}
          >
            {[
              { id: "overview", label: "Product Overview" },
              { id: "specs", label: "Pro Specifications" },
              { id: "usage", label: "Salon Application Protocol" },
              { id: "guarantee", label: "Beupros Trade Guarantee" },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "9999px",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    border: isSelected ? "1px solid #0f172a" : "1px solid #e2e8f0",
                    backgroundColor: isSelected ? "#0f172a" : "#ffffff",
                    color: isSelected ? "#ffffff" : "#475569",
                    transition: "all 0.15s ease",
                    whiteSpace: "nowrap",
                    boxShadow: isSelected
                      ? "0 2px 8px rgba(15, 23, 42, 0.12)"
                      : "0 1px 3px rgba(0,0,0,0.02)",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #f0f2f5",
              padding: "24px 28px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              fontSize: "14px",
              color: "#334155",
              lineHeight: 1.7,
            }}
          >
            {activeTab === "overview" && (
              <div>
                <p style={{ marginBottom: "1rem" }}>
                  {product.description ||
                    `${product.name} by ${product.brand} is specifically formulated and engineered for professional salon use. Engineered to deliver exceptional performance, high-yield results, and client satisfaction.`}
                </p>
                <p>
                  Sourced from certified manufacturers and brand distributors. Beupros guarantees
                  fresh batches, proper climate-controlled storage, and reliable trade supply for
                  licensed salons and professionals.
                </p>
              </div>
            )}

            {activeTab === "specs" && (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #f0f2f5" }}>
                      <td style={{ padding: "10px 0", fontWeight: 700, color: "#64748b", width: "220px" }}>
                        Brand
                      </td>
                      <td style={{ fontWeight: 600, color: "#0f172a" }}>{product.brand}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #f0f2f5" }}>
                      <td style={{ padding: "10px 0", fontWeight: 700, color: "#64748b" }}>Category</td>
                      <td style={{ fontWeight: 600, color: "#0f172a" }}>{product.category}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #f0f2f5" }}>
                      <td style={{ padding: "10px 0", fontWeight: 700, color: "#64748b" }}>
                        Wholesale SKU
                      </td>
                      <td style={{ fontFamily: "monospace", fontWeight: 700, color: "#0f172a" }}>
                        BEU-{product.id}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #f0f2f5" }}>
                      <td style={{ padding: "10px 0", fontWeight: 700, color: "#64748b" }}>
                        Availability
                      </td>
                      <td style={{ fontWeight: 600, color: "#10b981" }}>{product.availability}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 0", fontWeight: 700, color: "#64748b" }}>
                        Intended Audience
                      </td>
                      <td style={{ fontWeight: 600, color: "#0f172a" }}>
                        Licensed Professional Salons, Cosmetologists & Stylists
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "usage" && (
              <div>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "#0f172a",
                    marginBottom: "10px",
                  }}
                >
                  Professional Direction of Use
                </h4>
                <p style={{ marginBottom: "10px" }}>
                  1. Conduct a preliminary client consultation and patch test 24–48 hours before chemical application.
                </p>
                <p style={{ marginBottom: "10px" }}>
                  2. Apply using appropriate professional tools (tint brush, foil sheets, or sectioning clips) working in consistent 1/4-inch sections.
                </p>
                <p style={{ marginBottom: "10px" }}>
                  3. Adhere strictly to recommended processing times and developer volumes (20V/30V/40V depending on target lift).
                </p>
                <p>
                  4. Rinse thoroughly with lukewarm water until runoff is clear, followed by appropriate post-service pH-balancing treatment.
                </p>
              </div>
            )}

            {activeTab === "guarantee" && (
              <div>
                <p style={{ marginBottom: "12px" }}>
                  At Beupros, we eliminate counterfeit goods and diversion. Every single item in our 4,200+ product catalog is directly procured from authorized brand distributors with genuine manufacturer seals and serial tags.
                </p>
                <p>
                  If you receive damaged goods or defective tools, our dedicated salon support team is ready to arrange instant replacements or account credits within 48 hours.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 4. Related Products Grid */}
        {related.length > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#64748b",
                    marginBottom: "2px",
                  }}
                >
                  Curated Salon Pairings
                </div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#0f172a",
                    letterSpacing: "-0.015em",
                    margin: 0,
                  }}
                >
                  Frequently Restocked With {product.brand}
                </h2>
              </div>

              <Link
                href={`/shop?brand=${encodeURIComponent(product.brand)}`}
                style={{
                  fontSize: "12.5px",
                  fontWeight: 700,
                  color: "#0f172a",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                View All {product.brand} Products <ChevronRight size={14} />
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {related.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
