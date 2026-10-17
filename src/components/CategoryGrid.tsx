"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const CategoryGrid: React.FC = () => {
  const categories = [
    {
      id: "deals",
      name: "DEALS",
      link: "/deals",
      image: "/product-images/d156ecd4e3536f793f0c.jpg",
      bgColor: "#fef2f2",
    },
    {
      id: "new",
      name: "NEW",
      link: "/shop?sort=featured",
      image: "/product-images/adc6027794b88762e89c.jpg",
      bgColor: "#f0fdf4",
    },
    {
      id: "hair-color",
      name: "HAIR COLOR",
      link: "/shop?category=Hair",
      image: "/product-images/1d3ab36e71b36a261415.jpg",
      bgColor: "#faf5ff",
    },
    {
      id: "hair-care",
      name: "HAIR CARE",
      link: "/shop?category=Hair",
      image: "/product-images/20353ab028fe675fc871.jpg",
      bgColor: "#f8fafc",
    },
    {
      id: "styling",
      name: "STYLING",
      link: "/shop?category=Hair",
      image: "/product-images/adc6027794b88762e89c.jpg",
      bgColor: "#f5f3ff",
    },
    {
      id: "skin-body",
      name: "SKIN & BODY",
      link: "/shop?category=Beauty",
      image: "/product-images/c68c29149e55a8c6bcc1.jpg",
      bgColor: "#fdf2f8",
    },
    {
      id: "appliances",
      name: "APPLIANCES",
      link: "/shop?category=Tools",
      image: "/product-images/99b1202890e241cbf437.jpg",
      bgColor: "#f1f5f9",
    },
    {
      id: "nails",
      name: "NAILS",
      link: "/shop?category=Nails",
      image: "/product-images/93a3890c1812a5dc406d.jpg",
      bgColor: "#fff1f2",
    },
    {
      id: "salon-essentials",
      name: "SALON ESSENTIALS",
      link: "/shop?category=Tools",
      image: "/product-images/d77cf030d096b131944b.jpg",
      bgColor: "#f3f4f6",
    },
    {
      id: "minis",
      name: "MINIS & MORE",
      link: "/shop?category=Beauty",
      image: "/product-images/f17f32cc641895205c4c.jpg",
      bgColor: "#ecfdf5",
    },
    {
      id: "brands",
      name: "BRANDS",
      link: "/brands",
      image: "/product-images/024f8a44c5b7d06ff573.jpg",
      bgColor: "#f8fafc",
    },
    {
      id: "clearance",
      name: "CLEARANCE",
      link: "/deals",
      image: "/product-images/c46d8590ae9e140188bb.jpg",
      bgColor: "#fae8ff",
      badge: "!",
    },
  ];

  return (
    <section style={{ padding: "3rem 0 3.5rem 0", backgroundColor: "#ffffff" }}>
      <div className="container-custom">
        <h2
          style={{
            fontSize: "1.9rem",
            fontWeight: 800,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            marginBottom: "2.5rem",
          }}
        >
          Shop By Category
        </h2>

        {/* 6-Column Grid matching SalonCentric */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "1.5rem",
          }}
          className="category-grid-responsive"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.link}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textDecoration: "none",
                color: "#000000",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {/* Rounded Square Image Tile */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  backgroundColor: cat.bgColor,
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #e8e8e8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
                  marginBottom: "0.85rem",
                }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
                  style={{ objectFit: "contain", padding: "1rem" }}
                />
                {cat.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      backgroundColor: "#c91f37",
                      color: "#ffffff",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                    }}
                  >
                    {cat.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .category-grid-responsive {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .category-grid-responsive {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};
