"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  CheckCircle2,
  Tag,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";

const categoriesList = [
  { name: "All Categories", value: "all" },
  { name: "Hair Care & Color", value: "Hair", count: 1663 },
  { name: "Beauty & Skincare", value: "Beauty", count: 1447 },
  { name: "Tools & Appliances", value: "Tools", count: 961 },
  { name: "Salon Accessories", value: "Accessories", count: 69 },
  { name: "Nails & Extensions", value: "Nails", count: 69 },
  { name: "Pedicure & Manicure", value: "Pedi & Mani", count: 48 },
  { name: "Commercial Cans", value: "Commercial Cans", count: 16 },
];

const topBrands = [
  "All Brands",
  "Babila",
  "Loreal",
  "Schwarzkopf",
  "Wella",
  "Vega",
  "Jovees Herbal",
  "Lotus",
  "Streax",
  "Matrix",
  "Ikonic",
  "Cetaphil",
  "Blossom Kochhar",
  "Alan Truman",
  "Glam",
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [localSearchInput, setLocalSearchInput] = useState("");

  // Filter States from URL or default
  const page = parseInt(searchParams.get("page") || "1", 10);
  const category = searchParams.get("category") || "all";
  const brand = searchParams.get("brand") || "all";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "featured";
  const minDiscount = searchParams.get("minDiscount") || "";
  const priceRange = searchParams.get("priceRange") || "all";

  // Keep local search input in sync
  useEffect(() => {
    setLocalSearchInput(search);
  }, [search]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    let minPrice: number | undefined;
    let maxPrice: number | undefined;

    if (priceRange === "under-500") {
      maxPrice = 500;
    } else if (priceRange === "500-1000") {
      minPrice = 500;
      maxPrice = 1000;
    } else if (priceRange === "1000-2500") {
      minPrice = 1000;
      maxPrice = 2500;
    } else if (priceRange === "above-2500") {
      minPrice = 2500;
    }

    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", "24");
    if (category !== "all") params.set("category", category);
    if (brand !== "all") params.set("brand", brand);
    if (search) params.set("search", search);
    if (sort) params.set("sort", sort);
    if (minDiscount) params.set("minDiscount", minDiscount);
    if (minPrice !== undefined) params.set("minPrice", minPrice.toString());
    if (maxPrice !== undefined) params.set("maxPrice", maxPrice.toString());

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.pagination?.total || 0);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [page, category, brand, search, sort, minDiscount, priceRange]);

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [fetchProducts]);

  const updateParam = (key: string, value: string) => {
    setLoading(true);
    const next = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.set("page", "1"); // Reset to page 1
    router.push(`/shop?${next.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("search", localSearchInput.trim());
  };

  const clearAllFilters = () => {
    setLoading(true);
    setLocalSearchInput("");
    router.push("/shop");
  };

  const hasActiveFilters =
    category !== "all" ||
    brand !== "all" ||
    search !== "" ||
    minDiscount !== "" ||
    priceRange !== "all";

  const filteredBrands = topBrands.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url(/images/wavy-bg-shop-violet.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        color: "#ffffff",
        paddingBottom: "5rem",
      }}
    >
      {/* 1. Royal Violet Wavy Header Banner & Breadcrumb */}
      <div
        className="shop-wavy-hero"
        style={{
          position: "relative",
          backgroundColor: "transparent",
          color: "#ffffff",
          padding: "2.25rem 0 1.75rem 0",
        }}
      >
        <div className="container-custom">
          {/* Breadcrumb Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.75)",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            <Link href="/" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
              Catalog
            </Link>
            {category !== "all" && (
              <>
                <span>/</span>
                <span style={{ color: "#ffffff", fontWeight: 800 }}>{category}</span>
              </>
            )}
            {brand !== "all" && (
              <>
                <span>/</span>
                <span style={{ color: "#ffffff", fontWeight: 800 }}>{brand}</span>
              </>
            )}
          </div>

          {/* Title & Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "14px",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#fcd34d",
                  backgroundColor: "rgba(255, 255, 255, 0.16)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(8px)",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  marginBottom: "8px",
                }}
              >
                <Sparkles size={13} color="#fcd34d" />
                <span>Direct Authorized Salon Warehouse</span>
              </div>
              <h1
                style={{
                  fontSize: "clamp(26px, 3.4vw, 42px)",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.025em",
                  margin: 0,
                  textShadow: "0 4px 20px rgba(0, 0, 0, 0.45)",
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                {category !== "all"
                  ? `${category} Catalog`
                  : brand !== "all"
                  ? `${brand} Professional`
                  : "All Pro Salon Products"}
              </h1>
            </div>

            {/* Wholesale Pill Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.18)",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                backdropFilter: "blur(12px)",
                padding: "8px 16px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#ffffff",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}
            >
              <CheckCircle2 size={16} color="#34d399" />
              <span>Verified Pro Wholesale Pricing • GST Input Credit Enabled</span>
            </div>
          </div>

          {/* Quick-Filter Category Horizontal Pill Rail */}
          <div
            className="hide-scrollbar"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              overflowX: "auto",
              paddingTop: "16px",
              marginTop: "12px",
              borderTop: "1px solid rgba(255, 255, 255, 0.18)",
            }}
          >
            {categoriesList.map((cat) => {
              const isSelected =
                category === cat.value || (cat.value === "all" && category === "all");
              return (
                <button
                  key={cat.value}
                  onClick={() => updateParam("category", cat.value)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontWeight: isSelected ? 900 : 700,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    border: isSelected
                      ? "1.5px solid #ffffff"
                      : "1px solid rgba(255, 255, 255, 0.28)",
                    backgroundColor: isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.15)",
                    color: isSelected ? "#3b0764" : "#ffffff",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.2s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: isSelected
                      ? "0 4px 16px rgba(0, 0, 0, 0.25)"
                      : "none",
                  }}
                >
                  {cat.name}
                  {cat.count && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        backgroundColor: isSelected ? "rgba(59, 7, 100, 0.12)" : "rgba(255, 255, 255, 0.2)",
                        color: isSelected ? "#3b0764" : "#ffffff",
                        padding: "2px 6px",
                        borderRadius: "9999px",
                      }}
                    >
                      {cat.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-custom" style={{ paddingTop: "1.5rem" }}>
        {/* 2. Saledash Controls Row */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.96)",
            borderRadius: "18px",
            border: "1.5px solid rgba(255, 255, 255, 0.4)",
            padding: "14px 20px",
            marginBottom: "1.5rem",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {/* Left: Mobile Filter Toggle + Results Count + Active Tags */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              style={{
                display: "none",
                alignItems: "center",
                gap: "6px",
                padding: "7px 14px",
                borderRadius: "9999px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#f8f9fa",
                fontSize: "12px",
                fontWeight: 700,
                color: "#0f172a",
                cursor: "pointer",
              }}
              id="mobile-filter-btn"
            >
              <SlidersHorizontal size={14} /> Filter
            </button>

            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#0f172a",
                display: "flex",
                alignItems: "center",
                gap: "6px",
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
              {total.toLocaleString()} Products
            </span>

            {/* Active Filter Chips */}
            {category !== "all" && (
              <span
                style={{
                  backgroundColor: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  color: "#334155",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Category: <strong>{category}</strong>
                <X
                  size={12}
                  style={{ cursor: "pointer" }}
                  onClick={() => updateParam("category", "all")}
                />
              </span>
            )}

            {brand !== "all" && (
              <span
                style={{
                  backgroundColor: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  color: "#334155",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Brand: <strong>{brand}</strong>
                <X
                  size={12}
                  style={{ cursor: "pointer" }}
                  onClick={() => updateParam("brand", "all")}
                />
              </span>
            )}

            {search && (
              <span
                style={{
                  backgroundColor: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  color: "#334155",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Search: &quot;{search}&quot;
                <X
                  size={12}
                  style={{ cursor: "pointer" }}
                  onClick={() => updateParam("search", "")}
                />
              </span>
            )}

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#ef4444",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                  borderRadius: "6px",
                }}
              >
                <RotateCcw size={12} /> Clear All
              </button>
            )}
          </div>

          {/* Right: Search Input & Sort Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            {/* Inline search bar */}
            <form onSubmit={handleSearchSubmit} style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search catalog..."
                value={localSearchInput}
                onChange={(e) => setLocalSearchInput(e.target.value)}
                style={{
                  padding: "7px 12px 7px 32px",
                  borderRadius: "9999px",
                  border: "1px solid #eef0f3",
                  backgroundColor: "#f8f9fa",
                  fontSize: "12.5px",
                  color: "#0f172a",
                  outline: "none",
                  width: "190px",
                  transition: "all 0.15s ease",
                }}
              />
              <Search
                size={14}
                color="#94a3b8"
                style={{
                  position: "absolute",
                  left: "11px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </form>

            {/* Sort selector */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <ArrowUpDown size={13} /> Sort:
              </span>
              <select
                value={sort}
                onChange={(e) => updateParam("sort", e.target.value)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "9999px",
                  border: "1px solid #eef0f3",
                  backgroundColor: "#f8f9fa",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  color: "#0f172a",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Main Grid with Sticky Saledash Sidebar */}
        <div style={{ display: "flex", gap: "1.75rem", alignItems: "flex-start" }}>
          {/* Left Filter Sidebar */}
          <aside
            style={{
              width: "260px",
              flexShrink: 0,
              position: "sticky",
              top: "90px",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
            className="filter-sidebar"
          >
            {/* Sidebar Card */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderRadius: "20px",
                border: "1.5px solid rgba(255, 255, 255, 0.5)",
                boxShadow: "0 12px 36px rgba(0,0,0,0.22)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #f0f2f5",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#0f172a",
                  }}
                >
                  Filters & Tiers
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#ef4444",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Categories */}
              <div>
                <h3
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#64748b",
                    marginBottom: "8px",
                  }}
                >
                  Categories
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {categoriesList.map((cat) => {
                    const isSelected =
                      category === cat.value || (cat.value === "all" && category === "all");
                    return (
                      <button
                        key={cat.value}
                        onClick={() => updateParam("category", cat.value)}
                        style={{
                          textAlign: "left",
                          fontSize: "12.5px",
                          fontWeight: isSelected ? 700 : 500,
                          color: isSelected ? "#0f172a" : "#475569",
                          padding: "6px 10px",
                          borderRadius: "10px",
                          backgroundColor: isSelected ? "#f1f5f9" : "transparent",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <span>{cat.name}</span>
                        {cat.count && (
                          <span
                            style={{
                              fontSize: "10.5px",
                              fontWeight: 600,
                              color: isSelected ? "#0f172a" : "#94a3b8",
                              backgroundColor: isSelected ? "#ffffff" : "#f8f9fa",
                              padding: "1px 6px",
                              borderRadius: "9999px",
                            }}
                          >
                            {cat.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brands Filter */}
              <div>
                <h3
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#64748b",
                    marginBottom: "8px",
                  }}
                >
                  Authorized Brands
                </h3>
                {/* Brand Search */}
                <input
                  type="text"
                  placeholder="Filter brands..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px 10px",
                    fontSize: "11.5px",
                    borderRadius: "8px",
                    border: "1px solid #eef0f3",
                    backgroundColor: "#f8f9fa",
                    marginBottom: "8px",
                    outline: "none",
                  }}
                />
                <div
                  className="hide-scrollbar"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    maxHeight: "180px",
                    overflowY: "auto",
                  }}
                >
                  {filteredBrands.map((b) => {
                    const val = b === "All Brands" ? "all" : b;
                    const isSelected = brand.toLowerCase() === val.toLowerCase();
                    return (
                      <button
                        key={b}
                        onClick={() => updateParam("brand", val)}
                        style={{
                          textAlign: "left",
                          fontSize: "12px",
                          fontWeight: isSelected ? 700 : 500,
                          color: isSelected ? "#0f172a" : "#475569",
                          padding: "5px 8px",
                          borderRadius: "8px",
                          backgroundColor: isSelected ? "#f1f5f9" : "transparent",
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Ranges */}
              <div>
                <h3
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#64748b",
                    marginBottom: "8px",
                  }}
                >
                  Wholesale Price (₹)
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {[
                    { label: "All Prices", val: "all" },
                    { label: "Under ₹500", val: "under-500" },
                    { label: "₹500 to ₹1,000", val: "500-1000" },
                    { label: "₹1,000 to ₹2,500", val: "1000-2500" },
                    { label: "Above ₹2,500", val: "above-2500" },
                  ].map((item) => (
                    <label
                      key={item.val}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: priceRange === item.val ? "#0f172a" : "#475569",
                        fontWeight: priceRange === item.val ? 700 : 500,
                        padding: "3px 0",
                      }}
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        checked={priceRange === item.val}
                        onChange={() => updateParam("priceRange", item.val)}
                        style={{ accentColor: "#0f172a" }}
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Wholesale Discount Tiers */}
              <div>
                <h3
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#64748b",
                    marginBottom: "8px",
                  }}
                >
                  Discount Tiers
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {[
                    { label: "All Discounts", val: "" },
                    { label: "10% off or more", val: "10" },
                    { label: "20% off or more", val: "20" },
                    { label: "30% off or more", val: "30" },
                    { label: "40% off or more", val: "40" },
                  ].map((item) => (
                    <label
                      key={item.val}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: minDiscount === item.val ? "#0f172a" : "#475569",
                        fontWeight: minDiscount === item.val ? 700 : 500,
                        padding: "3px 0",
                      }}
                    >
                      <input
                        type="radio"
                        name="minDiscount"
                        checked={minDiscount === item.val}
                        onChange={() => updateParam("minDiscount", item.val)}
                        style={{ accentColor: "#0f172a" }}
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right: Products Grid */}
          <main style={{ flex: 1, minWidth: 0 }}>
            {loading ? (
              <div className="product-grid-mobile">
                {[...Array(12)].map((_, i) => (
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
            ) : products.length > 0 ? (
              <>
                <div className="product-grid-mobile">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {/* Saledash Pill Pagination */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "3rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.25)",
                  }}
                >
                  <button
                    disabled={page <= 1}
                    onClick={() => updateParam("page", (page - 1).toString())}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(255, 255, 255, 0.6)",
                      backgroundColor: "rgba(255, 255, 255, 0.92)",
                      backdropFilter: "blur(8px)",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#0f172a",
                      cursor: page <= 1 ? "not-allowed" : "pointer",
                      opacity: page <= 1 ? 0.4 : 1,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    }}
                  >
                    <ChevronLeft size={15} /> Prev
                  </button>

                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      let pageNum = i + 1;
                      if (totalPages > 5 && page > 3) {
                        pageNum = Math.min(page - 2 + i, totalPages - (4 - i));
                      }
                      const isCurrent = pageNum === page;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => updateParam("page", pageNum.toString())}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            border: isCurrent ? "none" : "1px solid rgba(255, 255, 255, 0.6)",
                            backgroundColor: isCurrent ? "#0f172a" : "rgba(255, 255, 255, 0.92)",
                            backdropFilter: "blur(8px)",
                            color: isCurrent ? "#ffffff" : "#0f172a",
                            fontSize: "12.5px",
                            fontWeight: 700,
                            cursor: "pointer",
                            boxShadow: isCurrent
                              ? "0 4px 12px rgba(15, 23, 42, 0.3)"
                              : "0 2px 6px rgba(0,0,0,0.08)",
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={page >= totalPages}
                    onClick={() => updateParam("page", (page + 1).toString())}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(255, 255, 255, 0.6)",
                      backgroundColor: "rgba(255, 255, 255, 0.92)",
                      backdropFilter: "blur(8px)",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#0f172a",
                      cursor: page >= totalPages ? "not-allowed" : "pointer",
                      opacity: page >= totalPages ? 0.4 : 1,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    }}
                  >
                    Next <ChevronRight size={15} />
                  </button>
                </div>
              </>
            ) : (
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.96)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderRadius: "20px",
                  border: "1.5px solid rgba(255, 255, 255, 0.5)",
                  padding: "4rem 2rem",
                  textAlign: "center",
                  boxShadow: "0 12px 36px rgba(0,0,0,0.22)",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "#f8f9fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px auto",
                  }}
                >
                  <Tag size={24} color="#94a3b8" />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
                  No Pro Formulations Found
                </h3>
                <p style={{ fontSize: "13.5px", color: "#64748b", maxWidth: "420px", margin: "0 auto 20px auto" }}>
                  We couldn&apos;t find any salon items matching your active filters. Try clearing
                  some filters or searching for another brand.
                </p>
                <button
                  onClick={clearAllFilters}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "9999px",
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 4. Mobile Filter Slide-out Drawer */}
      {mobileFilterOpen && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(15, 23, 42, 0.4)",
              backdropFilter: "blur(4px)",
              zIndex: 110,
            }}
            onClick={() => setMobileFilterOpen(false)}
          />
          <div
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              width: "85%",
              maxWidth: "340px",
              backgroundColor: "#ffffff",
              zIndex: 111,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #f0f2f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                Filter Catalog
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Drawer Body */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Categories */}
              <div>
                <h4
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "#64748b",
                    marginBottom: "8px",
                  }}
                >
                  Categories
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {categoriesList.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        updateParam("category", cat.value);
                        setMobileFilterOpen(false);
                      }}
                      style={{
                        textAlign: "left",
                        padding: "8px 10px",
                        fontSize: "12.5px",
                        borderRadius: "8px",
                        backgroundColor: category === cat.value ? "#f1f5f9" : "transparent",
                        fontWeight: category === cat.value ? 700 : 500,
                        color: category === cat.value ? "#0f172a" : "#475569",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "#64748b",
                    marginBottom: "8px",
                  }}
                >
                  Top Brands
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    maxHeight: "180px",
                    overflowY: "auto",
                  }}
                >
                  {topBrands.map((b) => {
                    const val = b === "All Brands" ? "all" : b;
                    return (
                      <button
                        key={b}
                        onClick={() => {
                          updateParam("brand", val);
                          setMobileFilterOpen(false);
                        }}
                        style={{
                          textAlign: "left",
                          padding: "8px 10px",
                          fontSize: "12.5px",
                          borderRadius: "8px",
                          backgroundColor:
                            brand.toLowerCase() === val.toLowerCase() ? "#f1f5f9" : "transparent",
                          fontWeight: brand.toLowerCase() === val.toLowerCase() ? 700 : 500,
                          color:
                            brand.toLowerCase() === val.toLowerCase() ? "#0f172a" : "#475569",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "#64748b",
                    marginBottom: "8px",
                  }}
                >
                  Price (INR)
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {[
                    { label: "All Prices", val: "all" },
                    { label: "Under ₹500", val: "under-500" },
                    { label: "₹500 to ₹1,000", val: "500-1000" },
                    { label: "₹1,000 to ₹2,500", val: "1000-2500" },
                    { label: "Above ₹2,500", val: "above-2500" },
                  ].map((item) => (
                    <label
                      key={item.val}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "12.5px",
                        color: priceRange === item.val ? "#0f172a" : "#475569",
                        fontWeight: priceRange === item.val ? 700 : 500,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name="mobilePriceRange"
                        checked={priceRange === item.val}
                        onChange={() => {
                          updateParam("priceRange", item.val);
                          setMobileFilterOpen(false);
                        }}
                        style={{ accentColor: "#0f172a" }}
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Discounts */}
              <div>
                <h4
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "#64748b",
                    marginBottom: "8px",
                  }}
                >
                  Pro Discounts
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {[
                    { label: "All Discounts", val: "" },
                    { label: "10% off or more", val: "10" },
                    { label: "20% off or more", val: "20" },
                    { label: "30% off or more", val: "30" },
                    { label: "40% off or more", val: "40" },
                  ].map((item) => (
                    <label
                      key={item.val}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "12.5px",
                        color: minDiscount === item.val ? "#0f172a" : "#475569",
                        fontWeight: minDiscount === item.val ? 700 : 500,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name="mobileMinDiscount"
                        checked={minDiscount === item.val}
                        onChange={() => {
                          updateParam("minDiscount", item.val);
                          setMobileFilterOpen(false);
                        }}
                        style={{ accentColor: "#0f172a" }}
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div
              style={{
                padding: "16px 20px",
                borderTop: "1px solid #f0f2f5",
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "9999px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  color: "#0f172a",
                  cursor: "pointer",
                }}
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "9999px",
                  border: "none",
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                View Results
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @media (max-width: 900px) {
          #mobile-filter-btn {
            display: inline-flex !important;
          }
          .filter-sidebar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "5rem", textAlign: "center", color: "#64748b" }}>
          Loading salon trade catalog...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
