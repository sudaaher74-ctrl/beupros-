"use client";

import React from "react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle }) => {
  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        padding: "1.25rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div>
        <h1 style={{ fontSize: "1.35rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.02em", color: "#111111", margin: 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: "12.5px", color: "#6b7280", margin: "3px 0 0 0" }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", padding: "4px 10px", borderRadius: "9999px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981" }} />
          <span style={{ fontSize: "11px", fontWeight: 800, color: "#065f46", textTransform: "uppercase" }}>
            Trade Verification Engine Active
          </span>
        </div>
      </div>
    </header>
  );
};
