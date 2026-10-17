"use client";

import React, { useState } from "react";
import Link from "next/link";

const allBrandsData = [
  { name: "Alan Truman", count: 72 },
  { name: "Asta Berry", count: 45 },
  { name: "AY.TY Pro", count: 70 },
  { name: "Babila", count: 322 },
  { name: "Beauty Basket", count: 100 },
  { name: "Berina", count: 54 },
  { name: "Blossom Kochhar", count: 82 },
  { name: "Brasil Cacau", count: 28 },
  { name: "Cadiveu", count: 35 },
  { name: "Cetaphil", count: 92 },
  { name: "De Fabulous", count: 48 },
  { name: "Delicate", count: 32 },
  { name: "FYC", count: 79 },
  { name: "Glam", count: 69 },
  { name: "Ikonic", count: 91 },
  { name: "Inatur", count: 22 },
  { name: "Jovees Herbal", count: 147 },
  { name: "L'Oréal Professionnel", query: "Loreal", count: 221 },
  { name: "Lotus Professional", query: "Lotus", count: 126 },
  { name: "Matrix", count: 97 },
  { name: "O3+", count: 64 },
  { name: "Qraa", count: 38 },
  { name: "Raaga Professional", count: 40 },
  { name: "Schwarzkopf Professional", query: "Schwarzkopf", count: 196 },
  { name: "Shahnaz Husain", count: 93 },
  { name: "Streax Professional", query: "Streax", count: 110 },
  { name: "Vega Professional", query: "Vega", count: 156 },
  { name: "Velvetree", count: 81 },
  { name: "Wella Professionals", query: "Wella", count: 163 },
];

export default function BrandsPage() {
  const [filter, setFilter] = useState("");
  const [activeLetter, setActiveLetter] = useState("ALL");

  const alphabet = ["ALL", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

  const filtered = allBrandsData.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(filter.toLowerCase());
    const matchesLetter = activeLetter === "ALL" || b.name.toUpperCase().startsWith(activeLetter);
    return matchesSearch && matchesLetter;
  });

  return (
    <div style={{ backgroundColor: "#ffffff", paddingBottom: "5rem" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#f5f5f5", borderBottom: "1px solid #e5e5e5", padding: "3rem 0" }}>
        <div className="container-custom">
          <h1 style={{ fontSize: "2.4rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Professional Salon Brands
          </h1>
          <p style={{ fontSize: "1rem", color: "#555555" }}>
            Explore 100% authentic, verified brands directly supplied through official distribution.
          </p>
        </div>
      </div>

      <div className="container-custom" style={{ paddingTop: "2.5rem" }}>
        {/* Search & Alphabet Filter Tabs */}
        <div style={{ marginBottom: "2.5rem" }}>
          <input
            type="text"
            placeholder="Search brands (e.g. Babila, Loreal, Wella, Matrix)..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "0.8rem 1.25rem",
              borderRadius: "9999px",
              border: "1.5px solid #d4d4d4",
              fontSize: "0.95rem",
              width: "100%",
              maxWidth: "480px",
              outline: "none",
              marginBottom: "1.25rem",
            }}
          />

          {/* A-Z Letter Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#666666", marginRight: "0.4rem" }}>
              Filter by Letter:
            </span>
            {alphabet.map((letter) => {
              const isActive = activeLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => setActiveLetter(letter)}
                  style={{
                    minWidth: "32px",
                    height: "32px",
                    padding: "0 0.4rem",
                    borderRadius: "6px",
                    fontSize: "0.78rem",
                    fontWeight: isActive ? 800 : 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    backgroundColor: isActive ? "#000000" : "#f5f5f5",
                    color: isActive ? "#ffffff" : "#444444",
                    border: isActive ? "1px solid #000000" : "1px solid #e0e0e0",
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Brand Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filtered.map((brand) => (
            <Link
              key={brand.name}
              href={`/shop?brand=${encodeURIComponent(brand.query || brand.name)}`}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e5e5",
                borderRadius: "10px",
                padding: "1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#000000";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e5e5";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.02)";
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#000000" }}>{brand.name}</h3>
                <span style={{ fontSize: "0.8rem", color: "#666666" }}>{brand.count} Products</span>
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, textDecoration: "underline" }}>
                View →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
