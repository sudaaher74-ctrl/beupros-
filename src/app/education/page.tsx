"use client";

import React from "react";
import Link from "next/link";
import { PlayCircle, Award, Clock, X, CheckCircle, ArrowRight } from "lucide-react";

export default function EducationPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [activeCourse, setActiveCourse] = React.useState<any | null>(null);

  const masterclasses = [
    {
      id: "1",
      category: "cutting",
      title: "Precision Hair Cutting & Texturizing",
      instructor: "Philip Wolff & Master Artists",
      duration: "1h 45m",
      level: "Advanced Stylists",
      description: "Master dry-cutting, slide texturizing, and weight removal to create high-movement dimensional salon shapes.",
      chapters: ["01: Sectioning & Density Analysis", "02: Tension Control with Wet vs Dry Cut", "03: Internal Weight Removal Techniques", "04: Finishing & Styling for Movement"],
      shopCategory: "Tools",
    },
    {
      id: "2",
      category: "color",
      title: "Foilayage & Seamless Color Melting",
      instructor: "Global Redken & L'Oreal Educators",
      duration: "2h 10m",
      level: "All Pro Colorists",
      description: "Step-by-step masterclass on shadow roots, zone toning, and butter-blonde foils for seamless transitions.",
      chapters: ["01: Foil Placement & Angle Mapping", "02: High-Lift Bleach Formulation", "03: Shadow Root Blending Technique", "04: Acidic Gloss Toning Formulas"],
      shopCategory: "Hair",
    },
    {
      id: "3",
      category: "smoothing",
      title: "Keratin & Thermal Smoothing Systems",
      instructor: "Brasil Cacau & Cadiveu Specialists",
      duration: "1h 15m",
      level: "Intermediate",
      description: "Learn proper iron temperature control, sectioning, and post-treatment maintenance to eliminate 100% of frizz.",
      chapters: ["01: Hair Porosity & Chemical Prep", "02: Product Saturation & Blowout", "03: Iron Pass Speed & Temperature", "04: Home Maintenance Recommendations"],
      shopCategory: "Hair",
    },
    {
      id: "4",
      category: "business",
      title: "Salon Profitability & Retail Merchandising",
      instructor: "Beupros Business Development Team",
      duration: "55m",
      level: "Salon Owners & Managers",
      description: "Maximize your front-of-house retail margin and consumable inventory turnover to increase salon net profits.",
      chapters: ["01: Service Cost-Per-Client Calculations", "02: Retail Display Positioning", "03: Staff Commission Incentive Structures", "04: Re-Order Cadence Optimization"],
      shopCategory: "Beauty",
    },
    {
      id: "5",
      category: "cutting",
      title: "Advanced Fade & Modern Scissor Work",
      instructor: "Master Barber Marcus Vance",
      duration: "1h 30m",
      level: "Barbers & Stylists",
      description: "Master skin fades, clipper-over-comb blending, and taper transitions using ergonomic professional clippers.",
      chapters: ["01: Guard Selection & Lever Work", "02: Scissor Over Comb Detailing", "03: Texture Shears for Weight Dispersal", "04: Razor Sharp Edging & Finish"],
      shopCategory: "Tools",
    },
    {
      id: "6",
      category: "color",
      title: "Corrective Color & Dark Base Removal",
      instructor: "Schwarzkopf Color Ambassadors",
      duration: "2h 30m",
      level: "Master Colorists",
      description: "Safe color extraction, pre-pigmentation protocols, and banding correction without compromising hair integrity.",
      chapters: ["01: Strand Test Diagnostics", "02: Controlled Decolorizing Steps", "03: Neutralizing Unwanted Undertones", "04: Bond Rebuilding & Conditioning"],
      shopCategory: "Hair",
    },
  ];

  const filteredCourses = masterclasses.filter(
    (c) => selectedCategory === "all" || c.category === selectedCategory
  );

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
        {/* Header & Tabs */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.25rem", marginBottom: "2.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, textTransform: "uppercase", margin: 0 }}>
              Featured Masterclasses
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#666666", marginTop: "0.25rem" }}>
              Explore industry-standard lessons led by verified global platform artists.
            </p>
          </div>

          {/* Education Category Tabs */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All Classes" },
              { id: "cutting", label: "Cutting & Fade" },
              { id: "color", label: "Color & Lightening" },
              { id: "smoothing", label: "Keratin & Texture" },
              { id: "business", label: "Salon Business" },
            ].map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  style={{
                    padding: "0.5rem 1.1rem",
                    borderRadius: "9999px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backgroundColor: isActive ? "#000000" : "#f5f5f5",
                    color: isActive ? "#ffffff" : "#444444",
                    border: isActive ? "1.5px solid #000000" : "1.5px solid #e5e5e5",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masterclasses Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          {filteredCourses.map((course) => (
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
                  onClick={() => setActiveCourse(course)}
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

      {/* Interactive Masterclass Player Modal */}
      {activeCourse && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={() => setActiveCourse(null)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              maxWidth: "720px",
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fake Video Screen */}
            <div
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "3.5rem 2rem",
                textAlign: "center",
                position: "relative",
              }}
            >
              <button
                onClick={() => setActiveCourse(null)}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={18} />
              </button>

              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  backgroundColor: "#e8ff3b",
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem auto",
                  cursor: "pointer",
                  boxShadow: "0 0 30px rgba(232, 255, 59, 0.4)",
                }}
              >
                <PlayCircle size={38} />
              </div>
              <div style={{ fontSize: "0.8rem", color: "#e8ff3b", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                BEUPROS MASTERCLASS STREAMING • {activeCourse.duration}
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase" }}>
                {activeCourse.title}
              </h3>
              <div style={{ fontSize: "0.88rem", opacity: 0.85, marginTop: "0.3rem" }}>
                Instructor: {activeCourse.instructor}
              </div>
            </div>

            {/* Course Details */}
            <div style={{ padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#16a34a", fontWeight: 700, fontSize: "0.88rem", marginBottom: "1rem" }}>
                <CheckCircle size={17} /> Eligible for 2.0 State Board Pro CE Renewal Credits
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                  Class Syllabus & Key Modules:
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", fontSize: "0.85rem" }}>
                  {activeCourse.chapters?.map((ch: string) => (
                    <div key={ch} style={{ backgroundColor: "#f9f9f9", padding: "0.6rem 0.8rem", borderRadius: "6px", border: "1px solid #eeeeee" }}>
                      {ch}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href={`/shop?category=${encodeURIComponent(activeCourse.shopCategory)}`}
                  onClick={() => setActiveCourse(null)}
                  className="btn-pill-black"
                  style={{ flex: 1, padding: "0.8rem 1.5rem", fontSize: "0.9rem" }}
                >
                  Shop Products Used In This Class <ArrowRight size={15} />
                </Link>
                <button
                  onClick={() => setActiveCourse(null)}
                  className="btn-pill-white"
                  style={{ padding: "0.8rem 1.5rem", fontSize: "0.9rem" }}
                >
                  Close Player
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
