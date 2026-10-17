"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const BrandPromoGrid: React.FC = () => {
  const topChips = [
    { title: "3 NEW! Red Shades", sub: "FOR COUNTLESS TRENDY LOOKS", link: "/shop?category=Hair" },
    { title: "Buy 4 Semis, Get 1 FREE!", sub: "W/ PURCHASE OF 4 OR MORE", link: "/deals" },
    { title: "Try For ₹499", sub: "NEW! DEMI LIQUID BUNDLE", link: "/shop?category=Hair" },
  ];

  const brandCards = [
    {
      id: "matrix",
      brand: "matrix",
      title: "FREE! House of Foils",
      sub: "W/ PURCHASE OF 12+ SUPER SYNC",
      bgGradient: "linear-gradient(135deg, #2b1055 0%, #431b6e 100%)",
      image: "/product-images/1d3ab36e71b36a261415.jpg",
      link: "/shop?brand=Matrix",
    },
    {
      id: "schwarzkopf",
      brand: "SCHWARZKOPF",
      title: "ALL VIVIDS ₹499",
      sub: "PLUS 15% OFF LIGHTENERS",
      bgGradient: "linear-gradient(135deg, #4b5563 0%, #374151 100%)",
      image: "/product-images/20353ab028fe675fc871.jpg",
      link: "/shop?brand=Schwarzkopf",
    },
    {
      id: "wella",
      brand: "WELLA PROFESSIONALS",
      title: "NEW! Koleston Natural",
      sub: "BLUE ASH PERMANENT COLOR",
      bgGradient: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      image: "/product-images/adc6027794b88762e89c.jpg",
      link: "/shop?brand=Wella",
    },
    {
      id: "loreal",
      brand: "L'ORÉAL PROFESSIONNEL",
      title: "FOUR NEW! BEIGE SHADES",
      sub: "UNLOCK THE BEIGE CODE",
      bgGradient: "linear-gradient(135deg, #78350f 0%, #451a03 100%)",
      image: "/product-images/d156ecd4e3536f793f0c.jpg",
      link: "/shop?brand=Loreal",
    },
  ];

  return (
    <section style={{ padding: "1.5rem 0 2.5rem 0", backgroundColor: "#ffffff" }}>
      <div className="container-custom">
        {/* Top 3 Promotional Chips */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {topChips.map((chip, i) => (
            <Link
              key={i}
              href={chip.link}
              style={{
                backgroundColor: "#5a5a5e",
                color: "#ffffff",
                padding: "1rem 1.25rem",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#444448")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5a5a5e")}
            >
              <div style={{ fontSize: "1rem", fontWeight: 800, textTransform: "uppercase" }}>{chip.title}</div>
              <div style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em", opacity: 0.9, marginTop: "2px" }}>
                {chip.sub}
              </div>
            </Link>
          ))}
        </div>

        {/* 4 Brand Promo Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {brandCards.map((card) => (
            <Link
              key={card.id}
              href={card.link}
              style={{
                background: card.bgGradient,
                borderRadius: "12px",
                color: "#ffffff",
                height: "260px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1.5rem",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                boxShadow: "0 6px 15px rgba(0,0,0,0.12)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.12)";
              }}
            >
              {/* Top Brand Name */}
              <div style={{ fontSize: "0.95rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {card.brand}
              </div>

              {/* Product Visual Accent */}
              <div
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "30px",
                  width: "110px",
                  height: "110px",
                  opacity: 0.85,
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="110px"
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Bottom Headlines */}
              <div style={{ zIndex: 2 }}>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.2 }}>
                  {card.title}
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", opacity: 0.85, marginTop: "4px" }}>
                  {card.sub}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
