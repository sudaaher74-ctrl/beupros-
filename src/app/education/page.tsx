"use client";

import React from "react";
import Link from "next/link";
import { PlayCircle, Award, Clock } from "lucide-react";

export default function EducationPage() {
  const masterclasses = [
    {
      id: "1",
      title: "Precision Hair Cutting & Texturizing",
      instructor: "Philip Wolff & Master Artists",
      duration: "1h 45m",
      level: "Advanced Stylists",
      description: "Master dry-cutting, slide texturizing, and weight removal to create high-movement dimensional salon shapes.",
    },
    {
      id: "2",
      title: "Foilayage & Seamless Color Melting",
      instructor: "Global Redken & L'Oreal Educators",
      duration: "2h 10m",
      level: "All Pro Colorists",
      description: "Step-by-step masterclass on shadow roots, zone toning, and butter-blonde foils for seamless transitions.",
    },
    {
      id: "3",
      title: "Keratin & Thermal Smoothing Systems",
      instructor: "Brasil Cacau & Cadiveu Specialists",
      duration: "1h 15m",
      level: "Intermediate",
      description: "Learn proper iron temperature control, sectioning, and post-treatment maintenance to eliminate 100% of frizz.",
    },
    {
      id: "4",
      title: "Salon Profitability & Retail Merchandising",
      instructor: "Beupros Business Development Team",
      duration: "55m",
      level: "Salon Owners & Managers",
      description: "Maximize your front-of-house retail margin and consumable inventory turnover to increase salon net profits.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#ffffff", paddingBottom: "5rem" }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: "#e8ff3b",
          color: "#000000",
          padding: "4.5rem 0 3.5rem 0",
          textAlign: "center",
        }}
      >
        <div className="container-custom">
          <div
            style={{
              display: "inline-block",
              border: "3px solid #000000",
              padding: "0.5rem 1.8rem",
              borderRadius: "4px",
              marginBottom: "1.25rem",
            }}
          >
            <div style={{ fontSize: "0.75rem", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              BEUPROS PRO EDUCATION
            </div>
            <div style={{ fontSize: "2.6rem", fontWeight: 900, textTransform: "uppercase", lineHeight: 1 }}>
              THE PLAYBOOK
            </div>
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, textTransform: "uppercase", marginTop: "1rem" }}>
            Free Online Classes & Masterclasses For Beauty Pros
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#222222", maxWidth: "680px", margin: "0.75rem auto 0 auto" }}>
            Learn next-level haircutting, advanced color formulation, and salon growth strategies from world-class industry artists.
          </p>
        </div>
      </div>

      <div className="container-custom" style={{ paddingTop: "3.5rem" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "2rem" }}>
          Featured Masterclasses
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          {masterclasses.map((course) => (
            <div
              key={course.id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e5e5e5",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.8rem", color: "#666666", marginBottom: "0.75rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Clock size={15} /> {course.duration}
                  </span>
                  <span>•</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Award size={15} /> {course.level}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, lineHeight: 1.3, marginBottom: "0.5rem" }}>
                  {course.title}
                </h3>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#16a34a", marginBottom: "0.75rem" }}>
                  {course.instructor}
                </div>
                <p style={{ fontSize: "0.9rem", color: "#444444", lineHeight: 1.5 }}>
                  {course.description}
                </p>
              </div>

              <div style={{ marginTop: "1.75rem" }}>
                <button
                  onClick={() => alert(`Launching masterclass: ${course.title}`)}
                  className="btn-pill-black"
                  style={{ width: "100%", padding: "0.75rem" }}
                >
                  <PlayCircle size={18} /> Watch Masterclass
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Shop banner */}
        <div
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "12px",
            padding: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, textTransform: "uppercase" }}>
              Equip Your Station With Pro Tools
            </h3>
            <p style={{ fontSize: "0.95rem", color: "#555555", marginTop: "0.25rem" }}>
              Shop the exact styling products, irons, and color bowls used in our masterclasses.
            </p>
          </div>
          <Link href="/shop" className="btn-pill-black" style={{ padding: "0.75rem 1.8rem" }}>
            Shop Pro Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
