"use client";

import React, { useState } from "react";
import Image from "next/image";

export const InstagramShowcase: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, image: "/product-images/adc6027794b88762e89c.jpg", title: "Platinum Blonde Melt" },
    { id: 2, image: "/product-images/d156ecd4e3536f793f0c.jpg", title: "Glass Hair Blowout" },
    { id: 3, image: "/product-images/20353ab028fe675fc871.jpg", title: "Dimension Balayage" },
    { id: 4, image: "/product-images/1d3ab36e71b36a261415.jpg", title: "Copper Glow Foil" },
    { id: 5, image: "/product-images/93a3890c1812a5dc406d.jpg", title: "Chrome Glaze Nails" },
    { id: 6, image: "/product-images/c68c29149e55a8c6bcc1.jpg", title: "Lived-In Waves" },
  ]);

  const handleLoadMore = () => {
    setItems((prev) => [
      ...prev,
      { id: 7, image: "/product-images/99b1202890e241cbf437.jpg", title: "Aura Straight Finish" },
      { id: 8, image: "/product-images/c46d8590ae9e140188bb.jpg", title: "Salon Spa Glow" },
    ]);
  };

  return (
    <section style={{ padding: "3.5rem 0 3rem 0", backgroundColor: "#ffffff" }}>
      <div className="container-custom">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: "2.4rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#000000",
              marginBottom: "0.4rem",
            }}
          >
            @Beupros
          </h2>
          <p style={{ fontSize: "1.05rem", fontStyle: "italic", color: "#374151" }}>
            Use #ittakesapro on Instagram to get featured.
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2.5rem",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                aspectRatio: "1 / 1",
                backgroundColor: "#f5f5f5",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #e5e5e5",
                boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.04)";
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                style={{ objectFit: "contain", padding: "1rem" }}
              />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleLoadMore}
            className="btn-pill-white"
            style={{
              padding: "0.7rem 2.2rem",
              backgroundColor: "#f5f5f5",
              borderColor: "#d4d4d4",
              color: "#000000",
            }}
          >
            Load More
          </button>
        </div>
      </div>
    </section>
  );
};
