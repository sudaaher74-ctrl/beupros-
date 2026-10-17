"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, ChevronRight, Plus, Minus, CheckCircle } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "guarantee">("overview");

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

  if (loading) {
    return (
      <div style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <p style={{ fontSize: "1.1rem", color: "#666666" }}>Loading product specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "1rem" }}>Product Not Found</h2>
        <p style={{ color: "#666666", marginBottom: "2rem" }}>The requested salon item does not exist or has been discontinued.</p>
        <Link href="/shop" className="btn-pill-black">
          Back to Pro Catalog
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#ffffff", paddingBottom: "5rem" }}>
      {/* Breadcrumb Bar */}
      <div
        style={{
          backgroundColor: "#f9f9f9",
          borderBottom: "1px solid #eeeeee",
          padding: "0.85rem 0",
        }}
      >
        <div className="container-custom" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#666666" }}>
          <Link href="/">Home</Link>
          <ChevronRight size={13} />
          <Link href="/shop">Catalog</Link>
          <ChevronRight size={13} />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          <ChevronRight size={13} />
          <span style={{ color: "#000000", fontWeight: 600 }}>{product.brand}</span>
        </div>
      </div>

      <div className="container-custom" style={{ paddingTop: "2.5rem" }}>
        {/* Main Product Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "3.5rem",
            marginBottom: "4rem",
          }}
        >
          {/* Left: Product Media Gallery */}
          <div>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1",
                backgroundColor: "#fbfbfb",
                borderRadius: "16px",
                border: "1px solid #e5e5e5",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
              }}
            >
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "contain", padding: "2.5rem" }}
              />
              {product.discountPercent > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    left: "1.5rem",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    fontWeight: 800,
                  }}
                >
                  {product.discount}
                </span>
              )}
            </div>
          </div>

          {/* Right: Product Details & Purchase Actions */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Brand */}
            <Link
              href={`/shop?brand=${encodeURIComponent(product.brand)}`}
              style={{
                fontSize: "0.85rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#555555",
                marginBottom: "0.4rem",
              }}
            >
              {product.brand}
            </Link>

            {/* Product Title */}
            <h1
              style={{
                fontSize: "1.9rem",
                fontWeight: 800,
                color: "#000000",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
                marginBottom: "0.75rem",
              }}
            >
              {product.name}
            </h1>

            {/* Rating Stars & Reviews */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    fill={s <= Math.round(product.rating) ? "#000000" : "none"}
                    color="#000000"
                  />
                ))}
              </div>
              <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>{product.rating}</span>
              <span style={{ fontSize: "0.85rem", color: "#666666" }}>
                ({product.reviewsCount} verified salon reviews)
              </span>
            </div>

            {/* Price Box */}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                backgroundColor: "#f9f9f9",
                borderRadius: "12px",
                border: "1px solid #eeeeee",
                marginBottom: "1.75rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.85rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "2rem", fontWeight: 900, color: "#000000" }}>
                  ₹{product.salePrice.toLocaleString("en-IN")}
                </span>
                {product.mrp > product.salePrice && (
                  <span style={{ fontSize: "1.2rem", textDecoration: "line-through", color: "#888888" }}>
                    ₹{product.mrp.toLocaleString("en-IN")}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span
                    style={{
                      backgroundColor: "#ecfdf5",
                      color: "#16a34a",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "4px",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                    }}
                  >
                    You Save ₹{(product.mrp - product.salePrice).toLocaleString("en-IN")} ({product.discount})
                  </span>
                )}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#666666", marginTop: "0.4rem" }}>
                Inclusive of all taxes | Wholesale trade pricing applied
              </div>
            </div>

            {/* In Stock & Dispatch Status */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem", color: "#16a34a", fontWeight: 700, marginBottom: "1.5rem" }}>
              <CheckCircle size={18} /> In Stock & Ready For Dispatch • Dispatches in 24 Hours
            </div>

            {/* Quantity Selector & Add to Bag */}
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1.5px solid #000000",
                  borderRadius: "9999px",
                  padding: "0.3rem 0.8rem",
                  backgroundColor: "#ffffff",
                }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{ padding: "0.4rem 0.6rem", display: "flex", alignItems: "center" }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span style={{ minWidth: "36px", textAlign: "center", fontWeight: 800, fontSize: "1rem" }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  style={{ padding: "0.4rem 0.6rem", display: "flex", alignItems: "center" }}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, qty)}
                className="btn-pill-black"
                style={{ flex: 1, padding: "0.9rem", fontSize: "0.95rem" }}
              >
                <ShoppingBag size={18} /> Add to Bag
              </button>
            </div>

            {/* Value Pillars */}
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1.25rem",
                borderRadius: "10px",
                border: "1px solid #eeeeee",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                fontSize: "0.85rem",
                color: "#333333",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <ShieldCheck size={18} color="#000000" />
                <span><strong>100% Authentic Brand Guarantee</strong> sourced directly from official brand distributors.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Truck size={18} color="#000000" />
                <span><strong>Free Pro Delivery</strong> on orders over ₹1,500. Same-day dispatch available.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <RotateCcw size={18} color="#000000" />
                <span><strong>Hassle-Free Returns:</strong> Easy trade exchanges and dedicated customer service.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Description, Specifications, and Guarantee */}
        <div style={{ marginBottom: "5rem" }}>
          <div style={{ display: "flex", gap: "2rem", borderBottom: "2px solid #eeeeee", marginBottom: "2rem" }}>
            {[
              { id: "overview", label: "Product Overview" },
              { id: "specs", label: "Pro Specifications" },
              { id: "guarantee", label: "Beupros Guarantee" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  paddingBottom: "0.8rem",
                  color: activeTab === tab.id ? "#000000" : "#888888",
                  borderBottom: activeTab === tab.id ? "3px solid #000000" : "3px solid transparent",
                  marginBottom: "-2px",
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: "0.95rem", color: "#444444", lineHeight: 1.7, maxWidth: "800px" }}>
            {activeTab === "overview" && (
              <div>
                <p style={{ marginBottom: "1rem" }}>
                  {product.description || `${product.name} by ${product.brand} is specifically formulated and engineered for professional salon use. Engineered to deliver exceptional performance, high-yield results, and client satisfaction.`}
                </p>
                <p>
                  Sourced from certified manufacturers and brand distributors. Beupros guarantees fresh batches, proper climate-controlled storage, and reliable trade supply.
                </p>
              </div>
            )}
            {activeTab === "specs" && (
              <div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #eeeeee" }}>
                      <td style={{ padding: "0.75rem 0", fontWeight: 700, width: "200px" }}>Brand</td>
                      <td>{product.brand}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #eeeeee" }}>
                      <td style={{ padding: "0.75rem 0", fontWeight: 700 }}>Category</td>
                      <td>{product.category}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #eeeeee" }}>
                      <td style={{ padding: "0.75rem 0", fontWeight: 700 }}>Product ID / SKU</td>
                      <td>BEU-{product.id}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #eeeeee" }}>
                      <td style={{ padding: "0.75rem 0", fontWeight: 700 }}>Availability</td>
                      <td>{product.availability}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.75rem 0", fontWeight: 700 }}>Intended Use</td>
                      <td>Licensed Professional Salons, Cosmetologists & Stylists</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "guarantee" && (
              <div>
                <p style={{ marginBottom: "1rem" }}>
                  At Beupros, we eliminate counterfeit goods and diversion. Every single item in our 4,200+ product catalog is directly procured from authorized brand distributors with genuine manufacturer seals and serial tags.
                </p>
                <p>
                  If you receive damaged goods or defective tools, our salon support hotline is ready to arrange instant replacements or account credits within 48 hours.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        {related.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: "1.7rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                marginBottom: "2rem",
              }}
            >
              More From {product.brand} & Related Pro Essentials
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1.5rem",
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
