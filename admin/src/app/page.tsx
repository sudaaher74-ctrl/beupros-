"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/AdminHeader";
import { Clock, ShieldCheck, Package, Building2, Check, X, ArrowRight, RefreshCw } from "lucide-react";

interface SalonUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "pending" | "approved" | "rejected";
  salonName: string;
  businessType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstNumber?: string;
  licenseNumber?: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<SalonUser[]>([]);
  const [counts, setCounts] = useState({ all: 0, pending: 0, approved: 0, rejected: 0 });
  const [totalProducts, setTotalProducts] = useState(4276);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data.users || []);
      setCounts(data.counts || { all: 0, pending: 0, approved: 0, rejected: 0 });
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // Fetch product count
    fetch("/api/products?limit=1")
      .then((r) => r.json())
      .then((d) => {
        if (d.total) setTotalProducts(d.total);
      })
      .catch(() => {});
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    let reason: string | undefined;
    if (newStatus === "rejected") {
      const promptReason = prompt("Enter rejection reason for this salon (e.g. Invalid trade license / not a registered salon):");
      if (promptReason === null) return; // cancelled
      reason = promptReason;
    }

    setActionLoading(id);
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, rejectionReason: reason }),
      });
      if (res.ok) {
        await fetchUsers();
      }
    } catch {
      alert("Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  const pendingSalons = users.filter((u) => u.status === "pending");

  return (
    <>
      <AdminHeader
        title="Wholesale Trade Dashboard"
        subtitle="Manage salon user approvals, brand verification, and the 4,200+ product catalog"
      />

      <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Metric Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
          {/* Card 1: Pending Approvals */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "1.5rem",
              border: "1.5px solid #fde68a",
              boxShadow: "0 4px 15px rgba(245, 158, 11, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b45309" }}>
                Needs Verification
              </span>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Clock size={20} color="#d97706" />
              </div>
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#111111", marginTop: "0.5rem" }}>
              {counts.pending}
            </div>
            <div style={{ fontSize: "12.5px", color: "#6b7280", marginTop: "4px" }}>
              New salon accounts awaiting approval
            </div>
            <Link
              href="/users?status=pending"
              style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 800, color: "#b45309", marginTop: "1rem", textDecoration: "underline" }}
            >
              Review Pending Queue <ArrowRight size={13} />
            </Link>
          </div>

          {/* Card 2: Verified Pros */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "1.5rem",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#065f46" }}>
                Active Verified Pros
              </span>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShieldCheck size={20} color="#10b981" />
              </div>
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#111111", marginTop: "0.5rem" }}>
              {counts.approved}
            </div>
            <div style={{ fontSize: "12.5px", color: "#6b7280", marginTop: "4px" }}>
              Licensed salons with wholesale trade access
            </div>
            <Link
              href="/users?status=approved"
              style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 800, color: "#111111", marginTop: "1rem", textDecoration: "underline" }}
            >
              View Approved Salons <ArrowRight size={13} />
            </Link>
          </div>

          {/* Card 3: Products */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "1.5rem",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4b5563" }}>
                Catalog Products
              </span>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Package size={20} color="#111111" />
              </div>
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#111111", marginTop: "0.5rem" }}>
              {totalProducts.toLocaleString()}
            </div>
            <div style={{ fontSize: "12.5px", color: "#6b7280", marginTop: "4px" }}>
              Salon exclusive products & backbar supplies
            </div>
            <Link
              href="/products"
              style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 800, color: "#111111", marginTop: "1rem", textDecoration: "underline" }}
            >
              Manage Products <ArrowRight size={13} />
            </Link>
          </div>

          {/* Card 4: Total Applicants */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "1.5rem",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4b5563" }}>
                Total Salon Registrations
              </span>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Building2 size={20} color="#111111" />
              </div>
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#111111", marginTop: "0.5rem" }}>
              {counts.all}
            </div>
            <div style={{ fontSize: "12.5px", color: "#6b7280", marginTop: "4px" }}>
              Total trade accounts in database
            </div>
            <Link
              href="/users"
              style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 800, color: "#111111", marginTop: "1rem", textDecoration: "underline" }}
            >
              View All Accounts <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* PENDING SALON APPROVALS SECTION */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "1.25rem 1.75rem",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              backgroundColor: "#fffbeb",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Clock size={22} color="#d97706" />
              <div>
                <h2 style={{ fontSize: "1rem", fontWeight: 800, margin: 0, textTransform: "uppercase", color: "#92400e" }}>
                  Pending Salon Approvals Queue ({pendingSalons.length})
                </h2>
                <div style={{ fontSize: "12px", color: "#b45309" }}>
                  Clients cannot purchase until approved here. Verify location and brand before approving.
                </div>
              </div>
            </div>

            <button
              onClick={fetchUsers}
              className="btn-admin-white"
              style={{ padding: "6px 12px", fontSize: "12px" }}
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>

          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#6b7280" }}>
              Loading salon verification queue...
            </div>
          ) : pendingSalons.length === 0 ? (
            <div style={{ padding: "3.5rem 2rem", textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#ecfdf5", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto" }}>
                <Check size={26} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111111" }}>All Caught Up!</h3>
              <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
                There are no pending salon applications waiting for verification.
              </p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Salon Brand & Type</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Owner / Contact</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Location & Address</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Tax / License</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Applied</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700, textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingSalons.map((salon) => (
                    <tr key={salon.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ fontWeight: 800, color: "#111111", fontSize: "14px" }}>{salon.salonName}</div>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", backgroundColor: "#f3f4f6", padding: "2px 6px", borderRadius: "4px" }}>
                          {salon.businessType}
                        </span>
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ fontWeight: 600 }}>{salon.name}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>{salon.email}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>{salon.phone}</div>
                      </td>
                      <td style={{ padding: "14px 18px", maxWidth: "220px" }}>
                        <div style={{ fontWeight: 600, color: "#111111" }}>{salon.city}, {salon.state}</div>
                        <div style={{ fontSize: "11.5px", color: "#6b7280", lineHeight: 1.3 }} className="line-clamp-2">
                          {salon.address} - {salon.pincode}
                        </div>
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <div><strong>GSTIN:</strong> {salon.gstNumber || "None"}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}><strong>Lic:</strong> {salon.licenseNumber || "N/A"}</div>
                      </td>
                      <td style={{ padding: "14px 18px", color: "#6b7280", fontSize: "12px" }}>
                        {new Date(salon.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td style={{ padding: "14px 18px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "6px" }}>
                          <button
                            disabled={actionLoading === salon.id}
                            onClick={() => handleUpdateStatus(salon.id, "approved")}
                            className="btn-admin-approve"
                            title="Approve this salon for wholesale trading"
                          >
                            <Check size={14} /> Approve ID
                          </button>
                          <button
                            disabled={actionLoading === salon.id}
                            onClick={() => handleUpdateStatus(salon.id, "rejected")}
                            className="btn-admin-reject"
                            title="Reject application"
                          >
                            <X size={14} /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
