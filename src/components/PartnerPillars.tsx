"use client";

import React from "react";
import Link from "next/link";

export const PartnerPillars: React.FC = () => {
  const pillars = [
    {
      title: "Join Our Loyalty Program",
      desc: "Earn Points on every order, Enjoy Extra Savings, Exclusive Trade Offers and Free Shipping Perks!",
      link: "/shop",
    },
    {
      title: "Business Resource Center",
      desc: "Unlock services, wholesale supplies and salon support tools to take your beauty business to the next level.",
      link: "/shop",
    },
    {
      title: "Committed To An Inclusive Beauty Community",
      desc: "We support an atmosphere where every artist and stylist in our industry feels included, valued, and empowered.",
      link: "/shop",
    },
    {
      title: "So Many Ways To Shop",
      desc: "Find the salon supplies you need, right when you need them, with our flexible ordering and fast delivery options.",
      link: "/shop",
    },
  ];

  return (
    <section style={{ padding: "4.5rem 0 3.5rem 0", backgroundColor: "#ffffff" }}>
      <div className="container-custom">
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            marginBottom: "3.5rem",
          }}
        >
          Your Partner in Pro Beauty: Shop, Earn, Belong
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {pillars.map((p, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                    marginBottom: "0.85rem",
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#4b5563", lineHeight: 1.55 }}>
                  {p.desc}
                </p>
              </div>

              <div style={{ marginTop: "1.25rem" }}>
                <Link
                  href={p.link}
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    textDecoration: "underline",
                    color: "#000000",
                    letterSpacing: "0.04em",
                  }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
