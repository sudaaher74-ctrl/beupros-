"use client";

import React from "react";
import Link from "next/link";

export const PlaybookEducation: React.FC = () => {
  const classes = [
    {
      id: "cutting",
      title: "New Cutting Techniques",
      instructor: "Featuring Master Stylists & Industry Leaders",
      cta: "View Classes",
      link: "/education",
    },
    {
      id: "online",
      title: "Exclusive Online Classes",
      instructor: "Master Color & Cutting Techniques From Anywhere",
      cta: "Watch The Replay",
      link: "/education",
    },
    {
      id: "color",
      title: "Color Obsessed",
      instructor: "Learn the Latest Foil, Balayage & Glossing Techniques",
      cta: "View Classes",
      link: "/education",
    },
    {
      id: "melting",
      title: "Pro Honey Melt",
      instructor: "Master Seamless Color Melting & High Dimension",
      cta: "View Classes",
      link: "/education",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "#e8ff3b",
        color: "#000000",
        padding: "4rem 0 3.5rem 0",
      }}
    >
      <div className="container-custom">
        {/* Playbook Header Badge */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            style={{
              display: "inline-block",
              border: "3px solid #000000",
              padding: "0.6rem 2.2rem",
              borderRadius: "4px",
              backgroundColor: "transparent",
            }}
          >
            <div style={{ fontSize: "0.75rem", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              BEUPROS PRO EDUCATION
            </div>
            <div
              style={{
                fontSize: "2.8rem",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              THE PLAYBOOK
            </div>
          </div>
        </div>

        {/* 4 Class Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {classes.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "160px",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.25,
                    marginBottom: "0.4rem",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.85rem", fontWeight: 500, color: "#222222", lineHeight: 1.4 }}>
                  {item.instructor}
                </p>
              </div>

              <div style={{ marginTop: "1.25rem" }}>
                <Link
                  href={item.link}
                  className="btn-pill-black"
                  style={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    padding: "0.65rem 1.6rem",
                  }}
                >
                  {item.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Link */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/education"
            style={{
              fontSize: "0.78rem",
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "underline",
              color: "#000000",
            }}
          >
            VIEW ALL EDUCATION
          </Link>
        </div>
      </div>
    </section>
  );
};
