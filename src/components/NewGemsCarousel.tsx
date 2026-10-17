"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";

export const NewGemsCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/products?limit=12&sort=featured")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => {});
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section style={{ padding: "2.5rem 0 3.5rem 0", backgroundColor: "#ffffff" }}>
      <div className="container-custom">
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.75rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
            }}
          >
            New Gems Just In: Pro Sets Have Arrived
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link href="/shop" className="btn-pill-black" style={{ padding: "0.55rem 1.4rem" }}>
              Shop All
            </Link>

            <div style={{ display: "flex", gap: "0.4rem" }}>
              <button
                onClick={() => scroll("left")}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  border: "1px solid #d4d4d4",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  border: "1px solid #d4d4d4",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="hide-scrollbar scroll-snap-x"
          style={{
            display: "flex",
            gap: "1.25rem",
            overflowX: "auto",
            paddingBottom: "1rem",
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="snap-card"
              style={{
                width: "270px",
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
