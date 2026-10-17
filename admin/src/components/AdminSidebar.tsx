"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Package, ExternalLink } from "lucide-react";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Salon Approvals & Users", href: "/users", icon: Users },
    { label: "Products Catalog", href: "/products", icon: Package },
  ];

  return (
    <aside
      style={{
        width: "260px",
        backgroundColor: "#111111",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #222222",
        flexShrink: 0,
        minHeight: "100vh",
      }}
    >
      {/* Brand Header */}
      <div style={{ padding: "1.75rem 1.5rem", borderBottom: "1px solid #222222" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "#f59e0b",
              color: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "16px",
            }}
          >
            B
          </div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: 900, letterSpacing: "-0.02em", color: "#ffffff", textTransform: "uppercase" }}>
              Beupros Admin
            </div>
            <div style={{ fontSize: "10px", color: "#f59e0b", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Trade Portal Control
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
        <div style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "#6b7280", letterSpacing: "0.1em", paddingLeft: "12px", marginBottom: "6px" }}>
          Main Management
        </div>

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                borderRadius: "8px",
                fontSize: "13.5px",
                fontWeight: isActive ? 800 : 600,
                color: isActive ? "#ffffff" : "#9ca3af",
                backgroundColor: isActive ? "#262626" : "transparent",
                transition: "all 0.15s ease",
                borderLeft: isActive ? "3px solid #f59e0b" : "3px solid transparent",
              }}
            >
              <Icon size={18} color={isActive ? "#f59e0b" : "#9ca3af"} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div style={{ height: "1px", backgroundColor: "#222222", margin: "1rem 0" }} />

        <div style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "#6b7280", letterSpacing: "0.1em", paddingLeft: "12px", marginBottom: "6px" }}>
          Live Storefront
        </div>

        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#9ca3af",
            transition: "all 0.15s ease",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ExternalLink size={16} /> Open Public Store
          </span>
          <span style={{ fontSize: "10px", backgroundColor: "#1f2937", padding: "2px 6px", borderRadius: "4px" }}>:3000</span>
        </a>
      </nav>

      {/* Admin User Badge */}
      <div style={{ padding: "1.25rem", borderTop: "1px solid #222222", backgroundColor: "#0a0a0a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#262626", border: "1px solid #f59e0b", display: "flex", alignItems: "center", justifyContent: "center", color: "#f59e0b", fontWeight: 800, fontSize: "12px" }}>
            SA
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "12px", fontWeight: 800, color: "#ffffff" }}>Super Admin</div>
            <div style={{ fontSize: "11px", color: "#9ca3af" }}>admin@beupros.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
