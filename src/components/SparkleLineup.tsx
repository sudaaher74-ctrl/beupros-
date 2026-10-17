"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";

const sparkleTabs = [
  { id: "exclusives", label: "Beupros Exclusives", sub: "SEASONAL SELECTS", category: "Hair" },
  { id: "limited", label: "Limited Editions", sub: "HIDDEN GEMS, FOUND", category: "Tools" },
  { id: "minis", label: "Mini Must-Haves", sub: "LITTLE GIFTS, BIG JOY", category: "Beauty" },
];

export const SparkleLineup: React.FC = () => {
  const [activeTab, setActiveTab] = useState("exclusives");
  const [products, setProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selected = sparkleTabs.find((t) => t.id === activeTab);
    fetch(`/api/products?category=${selected?.category || "Hair"}&limit=8`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => {});
  }, [activeTab]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section style={{ padding: "3rem 0 2rem 0", backgroundColor: "#ffffff" }}>
      <div className="container-custom">
        {/* Section Heading */}
        <h2
          style={{
            fontSize: "1.9rem",
            fontWeight: 800,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            marginBottom: "2rem",
          }}
        >
          Products That Sparkle: The Pro Beauty Lineup
        </h2>

        {/* Carousel Control Arrows & Filter Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid #d4d4d4",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              transition: "all 0.2s ease",
            }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={22} />
          </button>

          {/* 3 Main Tabs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              flex: 1,
              maxWidth: "960px",
            }}
          >
            {sparkleTabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    backgroundColor: isActive ? "#000000" : "#6b7280",
                    color: "#ffffff",
                    padding: "1rem 1.25rem",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    boxShadow: isActive ? "0 6px 15px rgba(0,0,0,0.15)" : "none",
                  }}
                >
                  <div style={{ fontSize: "0.95rem", fontWeight: 800 }}>{tab.label}</div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", opacity: 0.85, marginTop: "2px" }}>
                    {tab.sub}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid #d4d4d4",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              transition: "all 0.2s ease",
            }}
            aria-label="Scroll right"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="hide-scrollbar scroll-snap-x"
          style={{
            display: "flex",
            gap: "1.25rem",
            overflowX: "auto",
            paddingBottom: "1.5rem",
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="snap-card"
              style={{
                width: "280px",
                flexShrink: 0,
              }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
