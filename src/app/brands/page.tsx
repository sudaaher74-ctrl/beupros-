"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, CheckCircle2, ChevronRight, Award } from "lucide-react";

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
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: "5rem" }}>
      {/* 1. Header Banner */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #f0f2f5",
          padding: "2.5rem 0 2rem 0",
        }}
      >
        <div className="container-custom">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.25rem",
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
                  letterSpacing: "0.06em",
                  color: "#64748b",
                  marginBottom: "6px",
                }}
              >
                <Sparkles size={13} color="#0f172a" />
                Verified Salon Distribution
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
                Authorized Salon Brand Partners
              </h1>
              <p style={{ fontSize: "14px", color: "#64748b", margin: 0, maxWidth: "600px" }}>
                Explore 100% genuine, manufacturer-sealed brands directly supplied through official pro channels.
              </p>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#f1f5f9",
                border: "1px solid #e2e8f0",
                padding: "8px 16px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              <CheckCircle2 size={15} color="#10b981" />
              Direct Brand Procurement • Zero Diversion
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom" style={{ paddingTop: "2rem" }}>
        {/* 2. Saledash Search & Alphabet Rail */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #f0f2f5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            padding: "20px 24px",
            marginBottom: "2rem",
          }}
        >
          {/* Search bar */}
          <div style={{ position: "relative", maxWidth: "440px", marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="Search brands (e.g. Babila, Loreal, Wella, Matrix)..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 14px 9px 36px",
                borderRadius: "9999px",
                border: "1px solid #eef0f3",
                backgroundColor: "#f8f9fa",
                fontSize: "13px",
                outline: "none",
                color: "#0f172a",
                boxSizing: "border-box",
              }}
            />
            <Search
              size={15}
              color="#94a3b8"
              style={{
                position: "absolute",
                left: "13px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </div>

          {/* A-Z Rail */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#64748b",
                marginRight: "6px",
              }}
            >
              Letter Index:
            </span>
            {alphabet.map((letter) => {
              const isActive = activeLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => setActiveLetter(letter)}
                  style={{
                    minWidth: "30px",
                    height: "30px",
                    padding: "0 6px",
                    borderRadius: "9999px",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    backgroundColor: isActive ? "#0f172a" : "#ffffff",
                    color: isActive ? "#ffffff" : "#475569",
                    border: isActive ? "1px solid #0f172a" : "1px solid #e2e8f0",
                    boxShadow: isActive
                      ? "0 2px 8px rgba(15, 23, 42, 0.2)"
                      : "0 1px 2px rgba(0,0,0,0.02)",
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Saledash Brand Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filtered.map((brand) => (
            <Link
              key={brand.name}
              href={`/shop?brand=${encodeURIComponent(brand.query || brand.name)}`}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #f0f2f5",
                borderRadius: "20px",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textDecoration: "none",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#f0f2f5";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                {/* Brand Initial Squircle */}
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "14px",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #f0f2f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: 900,
                    color: "#0f172a",
                    flexShrink: 0,
                  }}
                >
                  {brand.name.slice(0, 2).toUpperCase()}
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#0f172a",
                      margin: "0 0 3px 0",
                    }}
                  >
                    {brand.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        backgroundColor: "#f1f5f9",
                        color: "#475569",
                        padding: "1px 7px",
                        borderRadius: "9999px",
                      }}
                    >
                      {brand.count} SKUs
                    </span>
                    <span style={{ fontSize: "11px", color: "#10b981", fontWeight: 700 }}>
                      • Authorized
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#f8f9fa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0f172a",
                  flexShrink: 0,
                }}
              >
                <ChevronRight size={15} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
