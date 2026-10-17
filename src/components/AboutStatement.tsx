"use client";

import React from "react";

export const AboutStatement: React.FC = () => {
  return (
    <section style={{ padding: "4rem 0 3rem 0", backgroundColor: "#ffffff" }}>
      <div className="container-custom" style={{ maxWidth: "980px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "2.4rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "1.25rem",
          }}
        >
          Beupros
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.7,
            fontStyle: "italic",
            color: "#374151",
            marginBottom: "3rem",
          }}
        >
          Beupros is a wholesale beauty supplier dedicated to beauty pros. We provide salon professional beauty products for hair stylists, barbers, makeup artists, and cosmetologists — everything from hair color to nail polish, education and the essentials in between. Dedicated to serving pros across the nation with 100% authentic products, competitive trade pricing, and reliable delivery.
        </p>

        <p
          style={{
            fontSize: "0.72rem",
            color: "#888888",
            lineHeight: 1.5,
            borderTop: "1px solid #eeeeee",
            paddingTop: "1.5rem",
          }}
        >
          ^^Valid for verified beauty professionals and registered salons. Orders over ₹1,500 qualify for free standard pro delivery. Same-day local dispatch available for orders placed before 2:00 PM on working days.
        </p>
      </div>
    </section>
  );
};
