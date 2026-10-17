"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
      }
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  // Focus input on open
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Live search debounce
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    let ignore = false;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(trimmed)}&limit=8`);
        const data = await res.json();
        if (!ignore) {
          setResults(data.products || []);
          setTotalCount(data.pagination?.total || 0);
        }
      } catch {
        // ignore
      } finally {
        if (!ignore) setLoading(false);
      }
    }, 200);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [query]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setResults([]);
      setTotalCount(0);
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  const handleClose = () => {
    setQuery("");
    setResults([]);
    setTotalCount(0);
    closeSearch();
  };

  if (!isSearchOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(6px)",
        zIndex: 130,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 1.5rem 2rem 1.5rem",
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "14px",
          width: "100%",
          maxWidth: "720px",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
          animation: "modalFadeIn 0.2s ease-out",
          display: "flex",
          flexDirection: "column",
          maxHeight: "85vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1.2rem 1.5rem",
            borderBottom: "1px solid #e5e5e5",
            gap: "1rem",
          }}
        >
          <Search size={22} color="#000000" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search 4,200+ salon products, brands, or categories..."
            style={{
              flex: 1,
              border: "none",
              fontSize: "1.05rem",
              fontWeight: 500,
              outline: "none",
              backgroundColor: "transparent",
            }}
          />
          {query && (
            <button
              onClick={() => handleQueryChange("")}
              style={{ padding: "0.2rem", color: "#888888" }}
              aria-label="Clear query"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={handleClose}
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              backgroundColor: "#f5f5f5",
              padding: "0.35rem 0.75rem",
              borderRadius: "6px",
              color: "#333333",
            }}
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#fafafa",
            borderBottom: "1px solid #eeeeee",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            overflowX: "auto",
            fontSize: "0.78rem",
          }}
          className="hide-scrollbar"
        >
          <span style={{ fontWeight: 700, color: "#777777", textTransform: "uppercase" }}>Popular:</span>
          {["Hair Color", "Babila", "Straightener", "Loreal", "Schwarzkopf", "Facial Kit", "Shampoo", "Wax Heater"].map(
            (term) => (
              <button
                key={term}
                onClick={() => handleQueryChange(term)}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "9999px",
                  padding: "0.25rem 0.65rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {term}
              </button>
            )
          )}
        </div>

        {/* Results Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#666666" }}>
              Searching catalog...
            </div>
          ) : results.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#666666", textTransform: "uppercase" }}>
                Products ({totalCount} found)
              </div>
              {results.map((product) => (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.6rem",
                    borderRadius: "8px",
                    transition: "background-color 0.15s ease",
                    border: "1px solid #f0f0f0",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fafafa")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
                >
                  <Link
                    href={`/product/${product.id}`}
                    onClick={handleClose}
                    style={{
                      position: "relative",
                      width: "55px",
                      height: "55px",
                      backgroundColor: "#f5f5f5",
                      borderRadius: "6px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={product.image || "/placeholder.png"}
                      alt={product.name}
                      fill
                      sizes="55px"
                      style={{ objectFit: "contain", padding: "0.3rem" }}
                    />
                  </Link>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", color: "#666666" }}>
                      {product.brand} • {product.category}
                    </div>
                    <Link
                      href={`/product/${product.id}`}
                      onClick={handleClose}
                      style={{ fontSize: "0.88rem", fontWeight: 600, color: "#000000", display: "block" }}
                      className="line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginTop: "0.2rem" }}>
                      <span style={{ fontSize: "0.95rem", fontWeight: 800 }}>
                        ₹{product.salePrice.toLocaleString("en-IN")}
                      </span>
                      {product.mrp > product.salePrice && (
                        <span style={{ fontSize: "0.8rem", textDecoration: "line-through", color: "#888888" }}>
                          ₹{product.mrp.toLocaleString("en-IN")}
                        </span>
                      )}
                      {product.discountPercent > 0 && (
                        <span style={{ fontSize: "0.72rem", color: "#16a34a", fontWeight: 700 }}>
                          {product.discount}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="btn-pill-black"
                    style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
                  >
                    <ShoppingBag size={14} /> Add
                  </button>
                </div>
              ))}
            </div>
          ) : query.trim() ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#666666" }}>
              No products found matching &quot;{query}&quot;. Try another brand or item.
            </div>
          ) : (
            <div style={{ padding: "2.5rem 1rem", textAlign: "center", color: "#888888", fontSize: "0.9rem" }}>
              Type to search through all 4,200+ salon-grade products, brands, and categories.
            </div>
          )}
        </div>

        {/* View All In Catalog Footer */}
        {results.length > 0 && (
          <div
            style={{
              padding: "0.9rem 1.5rem",
              borderTop: "1px solid #eeeeee",
              backgroundColor: "#fcfcfc",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "0.85rem", color: "#555555" }}>
              Showing {results.length} of {totalCount} matching products
            </span>
            <Link
              href={`/shop?search=${encodeURIComponent(query)}`}
              onClick={handleClose}
              className="btn-pill-black"
              style={{ fontSize: "0.8rem", padding: "0.45rem 1.1rem" }}
            >
              View All in Catalog <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
