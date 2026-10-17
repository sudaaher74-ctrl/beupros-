"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/AdminHeader";
import { Search, Check, X, Trash2, Edit, Eye, ShieldCheck, Clock, XCircle } from "lucide-react";

interface SalonUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
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
  rejectionReason?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<SalonUser[]>([]);
  const [counts, setCounts] = useState({ all: 0, pending: 0, approved: 0, rejected: 0 });
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<SalonUser | null>(null);

  // Edit / Add modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<SalonUser>>({});

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedStatus !== "all") params.set("status", selectedStatus);
      if (search) params.set("search", search);

      const res = await fetch(`/api/users?${params.toString()}`);
      const data = await res.json();
      setUsers(data.users || []);
      if (data.counts) setCounts(data.counts);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleStatusChange = async (id: string, newStatus: "approved" | "rejected") => {
    let reason: string | undefined;
    if (newStatus === "rejected") {
      const promptReason = prompt("Rejection note / reason:");
      if (promptReason === null) return;
      reason = promptReason;
    }

    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, rejectionReason: reason }),
      });
      if (res.ok) {
        fetchUsers();
        if (selectedUser?.id === id) {
          setSelectedUser((prev) => (prev ? { ...prev, status: newStatus, rejectionReason: reason } : null));
        }
      }
    } catch {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string, salonName: string) => {
    if (!confirm(`Are you sure you want to permanently delete salon "${salonName}"?`)) return;
    try {
      const res = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchUsers();
        if (selectedUser?.id === id) setSelectedUser(null);
      }
    } catch {
      alert("Failed to delete user");
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData.id) return;
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });
      if (res.ok) {
        setIsEditModalOpen(false);
        fetchUsers();
      }
    } catch {
      alert("Failed to save changes");
    }
  };

  return (
    <>
      <AdminHeader
        title="Salon Accounts & Verification"
        subtitle="Review, approve, or reject salon trade license applications"
      />

      <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Top Controls: Tabs & Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            backgroundColor: "#ffffff",
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Status Tabs */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[
              { id: "all", label: `All Salons (${counts.all})` },
              { id: "pending", label: `Pending Review (${counts.pending})`, color: "#b45309" },
              { id: "approved", label: `Verified Pros (${counts.approved})`, color: "#065f46" },
              { id: "rejected", label: `Rejected (${counts.rejected})`, color: "#b91c1c" },
            ].map((tab) => {
              const isSelected = selectedStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStatus(tab.id)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: isSelected ? 800 : 600,
                    backgroundColor: isSelected ? "#111111" : "#f3f4f6",
                    color: isSelected ? "#ffffff" : "#4b5563",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "260px" }}>
            <div style={{ position: "relative", width: "100%" }}>
              <Search size={15} color="#9ca3af" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search by salon, owner, city, GST..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "7px 10px 7px 32px",
                  fontSize: "13px",
                  borderRadius: "6px",
                  border: "1.5px solid #d1d5db",
                  backgroundColor: "#ffffff",
                }}
              />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#6b7280" }}>Loading salons...</div>
          ) : users.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#6b7280" }}>
              No salon accounts match the selected filter.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Status</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Salon Brand & Category</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Owner / Email</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Location</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Tax & License</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Registered</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700, textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => {
                    const isPending = u.status === "pending";
                    const isApproved = u.status === "approved";
                    const isRejected = u.status === "rejected";

                    return (
                      <tr key={u.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "14px 18px" }}>
                          {isApproved && (
                            <span style={{ backgroundColor: "#ecfdf5", color: "#065f46", fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                              <ShieldCheck size={13} color="#10b981" /> APPROVED
                            </span>
                          )}
                          {isPending && (
                            <span style={{ backgroundColor: "#fef3c7", color: "#92400e", fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                              <Clock size={13} color="#d97706" /> PENDING
                            </span>
                          )}
                          {isRejected && (
                            <span style={{ backgroundColor: "#fef2f2", color: "#b91c1c", fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                              <XCircle size={13} color="#ef4444" /> REJECTED
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "14px 18px" }}>
                          <div style={{ fontWeight: 800, color: "#111111", fontSize: "14px" }}>{u.salonName}</div>
                          <div style={{ fontSize: "11px", color: "#6b7280" }}>{u.businessType}</div>
                        </td>
                        <td style={{ padding: "14px 18px" }}>
                          <div style={{ fontWeight: 600 }}>{u.name}</div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>{u.email}</div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>{u.phone}</div>
                        </td>
                        <td style={{ padding: "14px 18px", maxWidth: "200px" }}>
                          <div style={{ fontWeight: 600 }}>{u.city}, {u.state}</div>
                          <div style={{ fontSize: "11px", color: "#6b7280" }} className="line-clamp-1">{u.address} - {u.pincode}</div>
                        </td>
                        <td style={{ padding: "14px 18px", fontSize: "12px" }}>
                          <div>GST: {u.gstNumber || "None"}</div>
                          <div>Lic: {u.licenseNumber || "None"}</div>
                        </td>
                        <td style={{ padding: "14px 18px", fontSize: "12px", color: "#6b7280" }}>
                          {new Date(u.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td style={{ padding: "14px 18px", textAlign: "right" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            {isPending && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(u.id, "approved")}
                                  className="btn-admin-approve"
                                  title="Approve Salon ID"
                                >
                                  <Check size={14} /> Approve
                                </button>
                                <button
                                  onClick={() => handleStatusChange(u.id, "rejected")}
                                  className="btn-admin-reject"
                                  title="Reject Application"
                                >
                                  <X size={14} /> Reject
                                </button>
                              </>
                            )}
                            {isApproved && (
                              <button
                                onClick={() => handleStatusChange(u.id, "rejected")}
                                style={{ backgroundColor: "#fef2f2", color: "#b91c1c", border: "1px solid #fee2e2", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}
                                title="Suspend wholesale privileges"
                              >
                                Revoke Approval
                              </button>
                            )}
                            {isRejected && (
                              <button
                                onClick={() => handleStatusChange(u.id, "approved")}
                                style={{ backgroundColor: "#ecfdf5", color: "#065f46", border: "1px solid #a7f3d0", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}
                              >
                                Re-Approve
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setSelectedUser(u);
                              }}
                              style={{ backgroundColor: "#f3f4f6", border: "none", padding: "6px", borderRadius: "4px", cursor: "pointer" }}
                              title="View Full Salon Profile"
                            >
                              <Eye size={15} color="#4b5563" />
                            </button>
                            <button
                              onClick={() => {
                                setEditFormData(u);
                                setIsEditModalOpen(true);
                              }}
                              style={{ backgroundColor: "#f3f4f6", border: "none", padding: "6px", borderRadius: "4px", cursor: "pointer" }}
                              title="Edit Salon Info"
                            >
                              <Edit size={15} color="#4b5563" />
                            </button>
                            <button
                              onClick={() => handleDelete(u.id, u.salonName)}
                              style={{ backgroundColor: "#fef2f2", border: "none", padding: "6px", borderRadius: "4px", cursor: "pointer" }}
                              title="Delete Account"
                            >
                              <Trash2 size={15} color="#ef4444" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* SALON DETAIL MODAL */}
      {selectedUser && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 100,
          }}
          onClick={() => setSelectedUser(null)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              maxWidth: "600px",
              width: "100%",
              padding: "2rem",
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 900, textTransform: "uppercase", margin: 0 }}>
                  {selectedUser.salonName}
                </h3>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>{selectedUser.businessType}</span>
              </div>
              <button onClick={() => setSelectedUser(null)} style={{ border: "none", background: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", fontSize: "13px", marginBottom: "1.5rem" }}>
              <div style={{ padding: "0.75rem", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <div style={{ fontWeight: 800, color: "#6b7280", fontSize: "11px", textTransform: "uppercase" }}>Contact Person</div>
                <div style={{ fontWeight: 700, color: "#111111", marginTop: "2px" }}>{selectedUser.name}</div>
                <div>{selectedUser.email}</div>
                <div>{selectedUser.phone}</div>
              </div>
              <div style={{ padding: "0.75rem", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <div style={{ fontWeight: 800, color: "#6b7280", fontSize: "11px", textTransform: "uppercase" }}>Physical Address</div>
                <div style={{ fontWeight: 700, color: "#111111", marginTop: "2px" }}>{selectedUser.city}, {selectedUser.state}</div>
                <div>{selectedUser.address}</div>
                <div>Pincode: {selectedUser.pincode}</div>
              </div>
              <div style={{ padding: "0.75rem", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <div style={{ fontWeight: 800, color: "#6b7280", fontSize: "11px", textTransform: "uppercase" }}>Verification Documents</div>
                <div style={{ marginTop: "2px" }}><strong>GSTIN:</strong> {selectedUser.gstNumber || "Not Provided"}</div>
                <div><strong>License:</strong> {selectedUser.licenseNumber || "Not Provided"}</div>
              </div>
              <div style={{ padding: "0.75rem", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <div style={{ fontWeight: 800, color: "#6b7280", fontSize: "11px", textTransform: "uppercase" }}>Status & Date</div>
                <div style={{ fontWeight: 800, textTransform: "uppercase", marginTop: "2px", color: selectedUser.status === "approved" ? "#10b981" : selectedUser.status === "pending" ? "#d97706" : "#ef4444" }}>
                  {selectedUser.status}
                </div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>
                  Applied on {new Date(selectedUser.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {selectedUser.rejectionReason && (
              <div style={{ padding: "0.85rem", backgroundColor: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "8px", color: "#b91c1c", fontSize: "12px", marginBottom: "1.5rem" }}>
                <strong>Rejection Reason:</strong> {selectedUser.rejectionReason}
              </div>
            )}

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              {selectedUser.status !== "approved" && (
                <button
                  onClick={() => handleStatusChange(selectedUser.id, "approved")}
                  className="btn-admin-approve"
                  style={{ padding: "8px 16px" }}
                >
                  <Check size={16} /> Approve & Grant Wholesale Access
                </button>
              )}
              {selectedUser.status !== "rejected" && (
                <button
                  onClick={() => handleStatusChange(selectedUser.id, "rejected")}
                  className="btn-admin-reject"
                  style={{ padding: "8px 16px" }}
                >
                  <X size={16} /> Reject Application
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT SALON MODAL */}
      {isEditModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 100,
          }}
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              maxWidth: "500px",
              width: "100%",
              padding: "2rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1.25rem" }}>
              Edit Salon Information
            </h3>

            <form onSubmit={handleSaveEdit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  Salon Name
                </label>
                <input
                  type="text"
                  value={editFormData.salonName || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, salonName: e.target.value })}
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1.5px solid #d1d5db" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  City
                </label>
                <input
                  type="text"
                  value={editFormData.city || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1.5px solid #d1d5db" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  Phone
                </label>
                <input
                  type="text"
                  value={editFormData.phone || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1.5px solid #d1d5db" }}
                  required
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="btn-admin-white"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-admin-black">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
