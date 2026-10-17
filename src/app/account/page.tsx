"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Clock, XCircle, LogOut, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const router = useRouter();
  const { user, isApproved, isPending, isRejected, isAdmin, logout } = useAuth();

  if (!user) {
    return (
      <div style={{ padding: "4rem 1rem", textAlign: "center", minHeight: "60vh" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>Please Sign In</h2>
        <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
          You need to be logged in to view your salon trade profile.
        </p>
        <Link href="/login" className="btn-pill-black">
          Go To Login
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "85vh", padding: "3rem 1rem" }}>
      <div className="container-custom" style={{ maxWidth: "800px" }}>
        {/* Profile Card */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e5e7eb", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ backgroundColor: "#111111", color: "#ffffff", padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", margin: 0 }}>
                  {user.salonName || user.name}
                </h1>
                {isApproved && (
                  <span style={{ backgroundColor: "rgba(16, 185, 129, 0.2)", color: "#10b981", fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <ShieldCheck size={13} /> VERIFIED PRO
                  </span>
                )}
                {isPending && (
                  <span style={{ backgroundColor: "rgba(245, 158, 11, 0.2)", color: "#f59e0b", fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={13} /> PENDING APPROVAL
                  </span>
                )}
                {isRejected && (
                  <span style={{ backgroundColor: "rgba(239, 68, 68, 0.2)", color: "#ef4444", fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <XCircle size={13} /> NOT VERIFIED
                  </span>
                )}
                {isAdmin && (
                  <span style={{ backgroundColor: "#f59e0b", color: "#000000", fontSize: "11px", fontWeight: 900, padding: "3px 8px", borderRadius: "4px" }}>
                    ADMINISTRATOR
                  </span>
                )}
              </div>
              <p style={{ fontSize: "0.85rem", color: "#a1a1aa", marginTop: "4px" }}>
                Member since {new Date(user.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              {isAdmin && (
                <Link href="/admin" className="btn-pill-solid-white" style={{ fontSize: "12px", padding: "0.5rem 1rem" }}>
                  Open Admin Dashboard
                </Link>
              )}
              <button onClick={handleLogout} className="btn-pill-white" style={{ fontSize: "12px", padding: "0.5rem 1rem" }}>
                <LogOut size={14} /> Log Out
              </button>
            </div>
          </div>

          {/* Status Banner */}
          {isPending && (
            <div style={{ backgroundColor: "#fffbeb", borderBottom: "1px solid #fde68a", padding: "1rem 2rem", display: "flex", alignItems: "center", gap: "10px", color: "#92400e", fontSize: "13.5px" }}>
              <Clock size={20} color="#d97706" style={{ flexShrink: 0 }} />
              <div>
                <strong>Account Application Pending Admin Approval:</strong> Your salon details and location are being reviewed. While pending, you can preview the 4,200+ catalog, but trade wholesale order checkout is locked.
              </div>
            </div>
          )}

          {isApproved && (
            <div style={{ backgroundColor: "#ecfdf5", borderBottom: "1px solid #a7f3d0", padding: "1rem 2rem", display: "flex", alignItems: "center", gap: "10px", color: "#065f46", fontSize: "13.5px" }}>
              <ShieldCheck size={20} color="#10b981" style={{ flexShrink: 0 }} />
              <div>
                <strong>Trade Access Active:</strong> You have unlocked wholesale trade distributor discounts, priority dispatch, and bulk can orders.
              </div>
            </div>
          )}

          {/* Salon Details Grid */}
          <div style={{ padding: "2rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "1.25rem", color: "#111111" }}>
              Salon & Trade Credentials
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
              <div style={{ padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#6b7280", marginBottom: "4px" }}>
                  Owner / Representative
                </div>
                <div style={{ fontWeight: 700, color: "#111111" }}>{user.name}</div>
                <div style={{ fontSize: "13px", color: "#4b5563", marginTop: "2px" }}>{user.email}</div>
                <div style={{ fontSize: "13px", color: "#4b5563" }}>{user.phone}</div>
              </div>

              <div style={{ padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#6b7280", marginBottom: "4px" }}>
                  Salon Location
                </div>
                <div style={{ fontWeight: 700, color: "#111111" }}>{user.salonName}</div>
                <div style={{ fontSize: "13px", color: "#4b5563", marginTop: "2px" }}>{user.address}</div>
                <div style={{ fontSize: "13px", color: "#4b5563" }}>{user.city}, {user.state} - {user.pincode}</div>
              </div>

              <div style={{ padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#6b7280", marginBottom: "4px" }}>
                  Business Category
                </div>
                <div style={{ fontWeight: 700, color: "#111111" }}>{user.businessType}</div>
                <div style={{ fontSize: "13px", color: "#4b5563", marginTop: "4px" }}>
                  <strong>GSTIN:</strong> {user.gstNumber || "Not Provided"}
                </div>
                <div style={{ fontSize: "13px", color: "#4b5563" }}>
                  <strong>License:</strong> {user.licenseNumber || "Verified"}
                </div>
              </div>
            </div>

            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
              <Link href="/shop" className="btn-pill-black">
                <ShoppingBag size={15} /> Shop Wholesale Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
