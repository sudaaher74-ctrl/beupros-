"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export const HeroBanners: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: "gift-ready",
      bgColor: "#db3e51",
      textColor: "#ffffff",
      headlineBadge: "GIFT READY & GOING FAST",
      headlineDiscount: "Up to 50% OFF",
      subtext: "Pro Gift & Styling Sets",
      buttonText: "Shop Now",
      link: "/deals",
      image: "/product-images/d156ecd4e3536f793f0c.jpg",
    },
    {
      id: "hairspray",
      bgColor: "#173327",
      textColor: "#ffffff",
      headlineBadge: "HAIRSPRAY SALE",
      headlineBadgeColor: "#d8b4f8",
      headlineDiscount: "2 FOR ₹1,800",
      subtext: "From Great Hold To Sold",
      buttonText: "Shop Now",
      link: "/shop?category=Hair",
      image: "/product-images/adc6027794b88762e89c.jpg",
    },
    {
      id: "skincare",
      bgColor: "#e1e6d4",
      textColor: "#000000",
      headlineBadge: "SCALP & SKINCARE SALE",
      headlineDiscount: "Up to 30% OFF",
      subtext: "Rooted In Real Results",
      buttonText: "Shop Now",
      link: "/shop?category=Beauty",
      image: "/product-images/c68c29149e55a8c6bcc1.jpg",
    },
    {
      id: "essentials",
      bgColor: "#173327",
      textColor: "#ffffff",
      headlineBadge: "ESSENTIALS",
      headlineBadgeColor: "#d8b4f8",
      badgePill: true,
      headlineDiscount: "Up to 35% OFF",
      subtext: "Essentials That Work",
      buttonText: "Shop Now",
      link: "/shop?category=Tools",
      image: "/product-images/c46d8590ae9e140188bb.jpg",
    },
  ];

  return (
    <section style={{ padding: "2rem 0 1.5rem 0", backgroundColor: "#ffffff" }}>
      <div className="container-custom">
        {/* 4 Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              style={{
                backgroundColor: slide.bgColor,
                color: slide.textColor,
                borderRadius: "16px",
                padding: "2rem 1.75rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "440px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 15px 35px -5px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0,0,0,0.08)";
              }}
            >
              {/* Header Badge */}
              <div>
                {slide.badgePill ? (
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: slide.headlineBadgeColor || "#d8b4f8",
                      color: "#000000",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "6px",
                      fontSize: "0.95rem",
                      fontWeight: 900,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {slide.headlineBadge}
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 900,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      textTransform: "uppercase",
                      color: slide.headlineBadgeColor || slide.textColor,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {slide.headlineBadge}
                  </div>
                )}
              </div>

              {/* Product Visual */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "170px",
                  margin: "1rem 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "140px",
                    height: "140px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "0.75rem",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.headlineBadge}
                    fill
                    sizes="140px"
                    style={{ objectFit: "contain", padding: "0.5rem" }}
                  />
                </div>
              </div>

              {/* Offer and CTA Button */}
              <div>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    marginBottom: "0.3rem",
                  }}
                >
                  {slide.headlineDiscount}
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    opacity: 0.9,
                    marginBottom: "1.25rem",
                  }}
                >
                  {slide.subtext}
                </div>

                <Link
                  href={slide.link}
                  className="btn-pill-solid-white"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    padding: "0.7rem 1.6rem",
                  }}
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Pagination Indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "1.75rem",
          }}
        >
          {[0, 1].map((dot) => (
            <button
              key={dot}
              onClick={() => setActiveSlide(dot)}
              style={{
                width: dot === activeSlide ? "22px" : "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: dot === activeSlide ? "#000000" : "#cccccc",
                transition: "all 0.25s ease",
              }}
              aria-label={`Slide ${dot + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
