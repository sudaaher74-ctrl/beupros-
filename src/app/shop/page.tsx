"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, ChevronLeft, ChevronRight, X } from "lucide-react";
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

  // Filter States from URL or default
  const page = parseInt(searchParams.get("page") || "1", 10);
  const category = searchParams.get("category") || "all";
  const brand = searchParams.get("brand") || "all";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "featured";
  const minDiscount = searchParams.get("minDiscount") || "";
  const priceRange = searchParams.get("priceRange") || "all";

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

  const clearAllFilters = () => {
    setLoading(true);
    router.push("/shop");
  };

  const hasActiveFilters = category !== "all" || brand !== "all" || search !== "" || minDiscount !== "" || priceRange !== "all";

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      {/* Category Header Banner */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e5e5e5",
          padding: "2.5rem 0",
        }}
      >
        <div className="container-custom">
          <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", color: "#666666", marginBottom: "0.4rem" }}>
            Beupros Pro Catalog
          </div>
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            {category !== "all" ? `${category} Products` : brand !== "all" ? `${brand} Professional` : "All Pro Salon Products"}
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#555555" }}>
            Showing {total.toLocaleString()} salon-grade verified products with wholesale pro pricing.
          </p>
        </div>
      </div>

      <div className="container-custom" style={{ padding: "2rem 1.5rem" }}>
        {/* Controls Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid #eeeeee",
          }}
        >
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="btn-pill-white"
            style={{ display: "none" }}
            id="mobile-filter-btn"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>

          {/* Active Filter Chips */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#222222" }}>
              {total.toLocaleString()} Results
            </span>

            {category !== "all" && (
              <span
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                Category: {category}
                <X size={13} style={{ cursor: "pointer" }} onClick={() => updateParam("category", "all")} />
              </span>
            )}

            {brand !== "all" && (
              <span
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                Brand: {brand}
                <X size={13} style={{ cursor: "pointer" }} onClick={() => updateParam("brand", "all")} />
              </span>
            )}

            {search && (
              <span
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                Search: &quot;{search}&quot;
                <X size={13} style={{ cursor: "pointer" }} onClick={() => updateParam("search", "")} />
              </span>
            )}

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                style={{ fontSize: "0.78rem", fontWeight: 700, textDecoration: "underline", color: "#c91f37", marginLeft: "0.5rem" }}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#666666" }}>Sort By:</span>
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "6px",
                border: "1px solid #d4d4d4",
                fontSize: "0.85rem",
                fontWeight: 600,
                outline: "none",
                backgroundColor: "#ffffff",
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

        {/* Main Grid with Sidebar */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          {/* Left Filter Sidebar */}
          <aside
            style={{
              width: "260px",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: "1.75rem",
            }}
            className="filter-sidebar"
          >
            {/* Categories */}
            <div>
              <h3 style={{ fontSize: "0.88rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.85rem", borderBottom: "2px solid #000000", paddingBottom: "0.4rem" }}>
                Categories
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {categoriesList.map((cat) => {
                  const isSelected = category === cat.value || (cat.value === "all" && category === "all");
                  return (
                    <button
                      key={cat.value}
                      onClick={() => updateParam("category", cat.value)}
                      style={{
                        textAlign: "left",
                        fontSize: "0.85rem",
                        fontWeight: isSelected ? 800 : 500,
                        color: isSelected ? "#000000" : "#444444",
                        padding: "0.3rem 0.5rem",
                        borderRadius: "4px",
                        backgroundColor: isSelected ? "#f0f0f0" : "transparent",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{cat.name}</span>
                      {cat.count && <span style={{ fontSize: "0.75rem", color: "#888888" }}>({cat.count})</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 style={{ fontSize: "0.88rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.85rem", borderBottom: "2px solid #000000", paddingBottom: "0.4rem" }}>
                Top Brands
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", maxHeight: "260px", overflowY: "auto" }}>
                {topBrands.map((b) => {
                  const val = b === "All Brands" ? "all" : b;
                  const isSelected = brand.toLowerCase() === val.toLowerCase();
                  return (
                    <button
                      key={b}
                      onClick={() => updateParam("brand", val)}
                      style={{
                        textAlign: "left",
                        fontSize: "0.85rem",
                        fontWeight: isSelected ? 800 : 500,
                        color: isSelected ? "#000000" : "#444444",
                        padding: "0.3rem 0.5rem",
                        borderRadius: "4px",
                        backgroundColor: isSelected ? "#f0f0f0" : "transparent",
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
              <h3 style={{ fontSize: "0.88rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.85rem", borderBottom: "2px solid #000000", paddingBottom: "0.4rem" }}>
                Price (INR)
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem" }}>
                {[
                  { label: "All Prices", val: "all" },
                  { label: "Under ₹500", val: "under-500" },
                  { label: "₹500 to ₹1,000", val: "500-1000" },
                  { label: "₹1,000 to ₹2,500", val: "1000-2500" },
                  { label: "Above ₹2,500", val: "above-2500" },
                ].map((item) => (
                  <label key={item.val} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange === item.val}
                      onChange={() => updateParam("priceRange", item.val)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Discount Filter */}
            <div>
              <h3 style={{ fontSize: "0.88rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.85rem", borderBottom: "2px solid #000000", paddingBottom: "0.4rem" }}>
                Pro Discounts
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem" }}>
                {[
                  { label: "All Discounts", val: "" },
                  { label: "10% off or more", val: "10" },
                  { label: "20% off or more", val: "20" },
                  { label: "30% off or more", val: "30" },
                  { label: "40% off or more", val: "40" },
                ].map((item) => (
                  <label key={item.val} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="minDiscount"
                      checked={minDiscount === item.val}
                      onChange={() => updateParam("minDiscount", item.val)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main style={{ flex: 1 }}>
            {loading ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: "360px",
                      backgroundColor: "#f5f5f5",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {/* Pagination Controls */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    marginTop: "3.5rem",
                    paddingTop: "2rem",
                    borderTop: "1px solid #eeeeee",
                  }}
                >
                  <button
                    disabled={page <= 1}
                    onClick={() => updateParam("page", (page - 1).toString())}
                    className="btn-pill-white"
                    style={{
                      padding: "0.5rem 1rem",
                      opacity: page <= 1 ? 0.4 : 1,
                      cursor: page <= 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>

                  <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, padding: "0 0.5rem" }}>
                      Page {page} of {totalPages}
                    </span>
                  </div>

                  <button
                    disabled={page >= totalPages}
                    onClick={() => updateParam("page", (page + 1).toString())}
                    className="btn-pill-black"
                    style={{
                      padding: "0.5rem 1.2rem",
                      opacity: page >= totalPages ? 0.4 : 1,
                      cursor: page >= totalPages ? "not-allowed" : "pointer",
                    }}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "5rem 1rem",
                  backgroundColor: "#fafafa",
                  borderRadius: "12px",
                  border: "1px solid #eeeeee",
                }}
              >
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                  No Products Found
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#666666", marginBottom: "1.5rem" }}>
                  Try adjusting your filters or search keywords to find what you need.
                </p>
                <button onClick={clearAllFilters} className="btn-pill-black">
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
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
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid #eeeeee",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, textTransform: "uppercase" }}>
                Filter Catalog
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                style={{ padding: "0.4rem", borderRadius: "50%", backgroundColor: "#f5f5f5" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Categories */}
              <div>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "0.6rem" }}>
                  Categories
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  {categoriesList.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        updateParam("category", cat.value);
                        setMobileFilterOpen(false);
                      }}
                      style={{
                        textAlign: "left",
                        padding: "0.4rem 0.5rem",
                        fontSize: "0.85rem",
                        borderRadius: "4px",
                        backgroundColor: category === cat.value ? "#f0f0f0" : "transparent",
                        fontWeight: category === cat.value ? 800 : 500,
                      }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "0.6rem" }}>
                  Top Brands
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", maxHeight: "180px", overflowY: "auto" }}>
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
                          padding: "0.4rem 0.5rem",
                          fontSize: "0.85rem",
                          borderRadius: "4px",
                          backgroundColor: brand.toLowerCase() === val.toLowerCase() ? "#f0f0f0" : "transparent",
                          fontWeight: brand.toLowerCase() === val.toLowerCase() ? 800 : 500,
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
                <h4 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "0.6rem" }}>
                  Price (INR)
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem" }}>
                  {[
                    { label: "All Prices", val: "all" },
                    { label: "Under ₹500", val: "under-500" },
                    { label: "₹500 to ₹1,000", val: "500-1000" },
                    { label: "₹1,000 to ₹2,500", val: "1000-2500" },
                    { label: "Above ₹2,500", val: "above-2500" },
                  ].map((item) => (
                    <label key={item.val} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <input
                        type="radio"
                        name="mobilePriceRange"
                        checked={priceRange === item.val}
                        onChange={() => {
                          updateParam("priceRange", item.val);
                          setMobileFilterOpen(false);
                        }}
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Discounts */}
              <div>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "0.6rem" }}>
                  Pro Discounts
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem" }}>
                  {[
                    { label: "All Discounts", val: "" },
                    { label: "10% off or more", val: "10" },
                    { label: "20% off or more", val: "20" },
                    { label: "30% off or more", val: "30" },
                    { label: "40% off or more", val: "40" },
                  ].map((item) => (
                    <label key={item.val} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <input
                        type="radio"
                        name="mobileMinDiscount"
                        checked={minDiscount === item.val}
                        onChange={() => {
                          updateParam("minDiscount", item.val);
                          setMobileFilterOpen(false);
                        }}
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div style={{ padding: "1.25rem", borderTop: "1px solid #eeeeee", display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="btn-pill-white"
                style={{ flex: 1, padding: "0.75rem", fontSize: "0.85rem" }}
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn-pill-black"
                style={{ flex: 1, padding: "0.75rem", fontSize: "0.85rem" }}
              >
                Done
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
    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center" }}>Loading pro catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
