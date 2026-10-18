"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Clock,
  XCircle,
  LogOut,
  ShoppingBag,
  Sparkles,
  Store,
  FileText,
  User,
  MapPin,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const router = useRouter();
  const { user, isApproved, isPending, isRejected, isAdmin, logout } = useAuth();

  if (!user) {
    return (
      <div
        style={{
          backgroundColor: "#f8f9fa",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #f0f2f5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            padding: "3rem 2rem",
            maxWidth: "440px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "#f8f9fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
            }}
          >
            <User size={26} color="#64748b" />
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
            Salon Sign In Required
          </h2>
          <p style={{ color: "#64748b", fontSize: "13.5px", marginBottom: "24px", lineHeight: 1.5 }}>
            Sign in to view your salon trade profile, verified credentials, and wholesale purchase history.
          </p>
          <Link
            href="/login"
            style={{
              display: "inline-flex",
              padding: "10px 24px",
              borderRadius: "9999px",
              backgroundColor: "#0f172a",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
            }}
          >
            Go To Salon Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "2.5rem 0 5rem 0" }}>
      <div className="container-custom" style={{ maxWidth: "860px" }}>
        {/* Profile Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            border: "1px solid #f0f2f5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "24px 28px",
              borderBottom: "1px solid #f0f2f5",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #f0f2f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0f172a",
                  flexShrink: 0,
                }}
              >
                <Store size={24} />
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <h1
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#0f172a",
                      margin: 0,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {user.salonName || user.name}
                  </h1>

                  {isApproved && (
                    <span
                      style={{
                        backgroundColor: "#ecfdf5",
                        color: "#059669",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "9999px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <ShieldCheck size={13} /> Verified Pro
                    </span>
                  )}
                  {isPending && (
                    <span
                      style={{
                        backgroundColor: "#fffbeb",
                        color: "#d97706",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "9999px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Clock size={13} /> Pending Verification
                    </span>
                  )}
                  {isRejected && (
                    <span
                      style={{
                        backgroundColor: "#fef2f2",
                        color: "#ef4444",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "9999px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <XCircle size={13} /> Not Verified
                    </span>
                  )}
                  {isAdmin && (
                    <span
                      style={{
                        backgroundColor: "#f8f9fa",
                        color: "#0f172a",
                        border: "1px solid #e2e8f0",
                        fontSize: "11px",
                        fontWeight: 800,
                        padding: "3px 8px",
                        borderRadius: "9999px",
                      }}
                    >
                      Administrator
                    </span>
                  )}
                </div>

                <p style={{ fontSize: "12.5px", color: "#64748b", margin: "4px 0 0 0" }}>
                  Trade Member since{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {isAdmin && (
                <Link
                  href="/admin"
                  style={{
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  Admin Console <ExternalLink size={13} />
                </Link>
              )}
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#0f172a",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  border: "1px solid #e2e8f0",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <LogOut size={13} /> Sign Out
              </button>
            </div>
          </div>

          {/* Status Banner */}
          {isPending && (
            <div
              style={{
                backgroundColor: "#fffbeb",
                borderBottom: "1px solid #fde68a",
                padding: "14px 28px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#92400e",
                fontSize: "13px",
              }}
            >
              <Clock size={18} color="#d97706" style={{ flexShrink: 0 }} />
              <div>
                <strong>Trade Verification Under Review:</strong> Your salon details and location
                are currently being verified by our compliance team. Wholesale order checkout will
                be unlocked as soon as your account is approved.
              </div>
            </div>
          )}

          {isApproved && (
            <div
              style={{
                backgroundColor: "#ecfdf5",
                borderBottom: "1px solid #a7f3d0",
                padding: "14px 28px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#065f46",
                fontSize: "13px",
              }}
            >
              <ShieldCheck size={18} color="#10b981" style={{ flexShrink: 0 }} />
              <div>
                <strong>Active Wholesale Trade Access:</strong> You have full access to wholesale
                distributor pricing, priority fulfillment, and bulk commercial packs.
              </div>
            </div>
          )}

          {/* Salon Details Grid */}
          <div style={{ padding: "28px" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "16px",
                color: "#0f172a",
              }}
            >
              Salon & Trade Credentials
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "14px",
              }}
            >
              {/* Card 1: Owner */}
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "16px",
                  border: "1px solid #f0f2f5",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "#64748b",
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <User size={13} />
                  Owner / Representative
                </div>
                <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "14px" }}>{user.name}</div>
                <div style={{ fontSize: "12.5px", color: "#64748b", marginTop: "3px" }}>
                  {user.email}
                </div>
                <div style={{ fontSize: "12.5px", color: "#64748b" }}>{user.phone}</div>
              </div>

              {/* Card 2: Location */}
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "16px",
                  border: "1px solid #f0f2f5",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "#64748b",
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <MapPin size={13} />
                  Salon Location
                </div>
                <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "14px" }}>
                  {user.salonName}
                </div>
                <div style={{ fontSize: "12.5px", color: "#64748b", marginTop: "3px" }}>
                  {user.address}
                </div>
                <div style={{ fontSize: "12.5px", color: "#64748b" }}>
                  {user.city}, {user.state} - {user.pincode}
                </div>
              </div>

              {/* Card 3: Business & Tax */}
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "16px",
                  border: "1px solid #f0f2f5",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "#64748b",
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <FileText size={13} />
                  Business Category
                </div>
                <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "14px" }}>
                  {user.businessType}
                </div>
                <div style={{ fontSize: "12.5px", color: "#64748b", marginTop: "4px" }}>
                  <strong>GSTIN:</strong> {user.gstNumber || "Not Provided"}
                </div>
                <div style={{ fontSize: "12.5px", color: "#64748b" }}>
                  <strong>License:</strong> {user.licenseNumber || "Verified Trade License"}
                </div>
              </div>
            </div>

            <div style={{ marginTop: "24px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Link
                href="/shop"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 22px",
                  borderRadius: "9999px",
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
                }}
              >
                <ShoppingBag size={14} /> Shop Wholesale Catalog
              </Link>
              <Link
                href="/cart"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 22px",
                  borderRadius: "9999px",
                  backgroundColor: "#ffffff",
                  color: "#0f172a",
                  border: "1px solid #e2e8f0",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                View Cart & Invoices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
