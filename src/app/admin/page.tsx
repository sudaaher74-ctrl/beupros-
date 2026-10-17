"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Package,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Store,
  Layers,
  ArrowRight,
  Check
} from "lucide-react";

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
  rejectionReason?: string;
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  salePrice: number;
  mrp: number;
  discount: string;
  discountPercent: number;
  image: string;
  availability: string;
  description: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "products">("overview");

  // Users State
  const [users, setUsers] = useState<SalonUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [userCounts, setUserCounts] = useState({ all: 0, pending: 0, approved: 0, rejected: 0 });
  const [userFilterStatus, setUserFilterStatus] = useState<string>("all");
  const [userSearch, setUserSearch] = useState("");
  const [selectedUserDetail, setSelectedUserDetail] = useState<SalonUser | null>(null);

  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productSearch, setProductSearch] = useState("");
  const [productCategory, setProductCategory] = useState("All Categories");
  const [productPage, setProductPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalProductPages, setTotalProductPages] = useState(1);

  // Product Add / Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productFormData, setProductFormData] = useState<Partial<Product>>({
    name: "",
    brand: "",
    category: "Hair",
    salePrice: 500,
    mrp: 650,
    image: "",
    availability: "In Stock",
    description: "",
  });

  // Action Loading
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Fetch Users
  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const params = new URLSearchParams();
      if (userFilterStatus !== "all") params.set("status", userFilterStatus);
      if (userSearch) params.set("search", userSearch);

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      const data = await res.json();
      setUsers(data.users || []);
      if (data.counts) setUserCounts(data.counts);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setUsersLoading(false);
    }
  }, [userFilterStatus, userSearch]);

  // Fetch Products
  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", productPage.toString());
      params.set("limit", "20");
      if (productSearch) params.set("search", productSearch);
      if (productCategory !== "All Categories") params.set("category", productCategory);

      const res = await fetch(`/api/admin/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotalProducts(data.total || 0);
      setTotalProductPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setProductsLoading(false);
    }
  }, [productPage, productSearch, productCategory]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle Salon Status Change (Approve / Reject)
  const handleUpdateUserStatus = async (id: string, newStatus: "approved" | "rejected") => {
    let reason: string | undefined;
    if (newStatus === "rejected") {
      const promptReason = prompt("Reason for application rejection (sent to salon pro):");
      if (promptReason === null) return;
      reason = promptReason;
    }

    setActionLoadingId(id);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, rejectionReason: reason }),
      });
      if (res.ok) {
        await fetchUsers();
      } else {
        alert("Failed to update salon status.");
      }
    } catch {
      alert("Error updating salon status.");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (id: string, salonName: string) => {
    if (!confirm(`Are you sure you want to permanently delete account: "${salonName}"?`)) return;

    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchUsers();
      } else {
        alert("Failed to delete user");
      }
    } catch {
      alert("Error deleting user");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Handle Product Save (Add / Edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = "/api/admin/products";
      const method = editingProductId ? "PUT" : "POST";
      const bodyData = editingProductId ? { id: editingProductId, ...productFormData } : productFormData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        setIsProductModalOpen(false);
        setEditingProductId(null);
        await fetchProducts();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to save product");
      }
    } catch {
      alert("Error saving product");
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id: string, productName: string) => {
    if (!confirm(`Are you sure you want to delete "${productName}" from the catalog?`)) return;

    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch {
      alert("Error deleting product");
    }
  };

  const openAddProductModal = () => {
    setEditingProductId(null);
    setProductFormData({
      name: "",
      brand: "",
      category: "Hair",
      salePrice: 500,
      mrp: 650,
      image: "",
      availability: "In Stock",
      description: "",
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProductId(product.id);
    setProductFormData({
      name: product.name,
      brand: product.brand,
      category: product.category,
      salePrice: product.salePrice,
      mrp: product.mrp,
      image: product.image,
      availability: product.availability,
      description: product.description,
    });
    setIsProductModalOpen(true);
  };

  const pendingUsers = users.filter((u) => u.status === "pending");

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: "5rem" }}>
      {/* Top Admin Command Header */}
      <div style={{ backgroundColor: "#0b0f19", borderBottom: "1px solid #1f2937", color: "#ffffff", padding: "1.5rem 0" }}>
        <div className="container-custom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#065f46", color: "#6ee7b7", fontSize: "11px", fontWeight: 800, padding: "3px 10px", borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
              <ShieldCheck size={14} /> Trade Verification & Catalog Engine
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0 }}>
              BeuPROS Admin Command Center
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "4px" }}>
              Manage registered salon partners, verify trade accounts, and control the 4,200+ wholesale catalog in real time.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#1f2937",
                color: "#e5e7eb",
                padding: "0.6rem 1.1rem",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontWeight: 700,
                border: "1px solid #374151",
              }}
            >
              <ExternalLink size={15} /> Storefront
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: "70px", zIndex: 40, boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
        <div className="container-custom" style={{ display: "flex", gap: "2rem", overflowX: "auto" }}>
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "1rem 0.25rem",
              fontSize: "0.95rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              color: activeTab === "overview" ? "#000000" : "#6b7280",
              borderBottom: activeTab === "overview" ? "3px solid #000000" : "3px solid transparent",
              background: "none",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              cursor: "pointer",
            }}
          >
            <Layers size={18} /> Overview
          </button>

          <button
            onClick={() => setActiveTab("users")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "1rem 0.25rem",
              fontSize: "0.95rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              color: activeTab === "users" ? "#000000" : "#6b7280",
              borderBottom: activeTab === "users" ? "3px solid #000000" : "3px solid transparent",
              background: "none",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              cursor: "pointer",
            }}
          >
            <Users size={18} /> Salon Approvals & Users
            {userCounts.pending > 0 && (
              <span style={{ backgroundColor: "#f59e0b", color: "#000000", fontSize: "11px", fontWeight: 800, padding: "1px 7px", borderRadius: "9999px" }}>
                {userCounts.pending}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("products")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "1rem 0.25rem",
              fontSize: "0.95rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              color: activeTab === "products" ? "#000000" : "#6b7280",
              borderBottom: activeTab === "products" ? "3px solid #000000" : "3px solid transparent",
              background: "none",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              cursor: "pointer",
            }}
          >
            <Package size={18} /> Products Catalog
            <span style={{ backgroundColor: "#f3f4f6", color: "#374151", fontSize: "11px", fontWeight: 700, padding: "1px 7px", borderRadius: "9999px" }}>
              {totalProducts > 0 ? totalProducts.toLocaleString("en-IN") : "4,200+"}
            </span>
          </button>
        </div>
      </div>

      <div className="container-custom" style={{ marginTop: "2rem" }}>
        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Metric Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Pending Approvals</span>
                  <div style={{ backgroundColor: "#fef3c7", padding: "0.5rem", borderRadius: "8px", color: "#d97706" }}>
                    <Clock size={20} />
                  </div>
                </div>
                <div style={{ fontSize: "2.25rem", fontWeight: 900, color: "#b45309" }}>{userCounts.pending}</div>
                <p style={{ fontSize: "0.75rem", color: "#92400e", marginTop: "4px" }}>Awaiting license verification review</p>
              </div>

              <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Verified Salons</span>
                  <div style={{ backgroundColor: "#d1fae5", padding: "0.5rem", borderRadius: "8px", color: "#059669" }}>
                    <CheckCircle2 size={20} />
                  </div>
                </div>
                <div style={{ fontSize: "2.25rem", fontWeight: 900, color: "#065f46" }}>{userCounts.approved}</div>
                <p style={{ fontSize: "0.75rem", color: "#047857", marginTop: "4px" }}>Full trade wholesale ordering access</p>
              </div>

              <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Total Salon Accounts</span>
                  <div style={{ backgroundColor: "#e0e7ff", padding: "0.5rem", borderRadius: "8px", color: "#4f46e5" }}>
                    <Users size={20} />
                  </div>
                </div>
                <div style={{ fontSize: "2.25rem", fontWeight: 900, color: "#1e1b4b" }}>{userCounts.all}</div>
                <p style={{ fontSize: "0.75rem", color: "#4338ca", marginTop: "4px" }}>Registered salon network profiles</p>
              </div>

              <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Product Inventory</span>
                  <div style={{ backgroundColor: "#f3e8ff", padding: "0.5rem", borderRadius: "8px", color: "#9333ea" }}>
                    <Package size={20} />
                  </div>
                </div>
                <div style={{ fontSize: "2.25rem", fontWeight: 900, color: "#581c87" }}>
                  {totalProducts > 0 ? totalProducts.toLocaleString("en-IN") : "4,200+"}
                </div>
                <p style={{ fontSize: "0.75rem", color: "#7e22ce", marginTop: "4px" }}>Active wholesale pro SKUs</p>
              </div>
            </div>

            {/* Pending Salon Approvals Queue */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", color: "#111827", margin: 0 }}>
                    Urgent: Salon Approvals Review Queue
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "4px 0 0 0" }}>
                    {pendingUsers.length === 0
                      ? "All salon applications have been processed. Great job!"
                      : `You have ${pendingUsers.length} pending salon applications awaiting verification.`}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setUserFilterStatus("pending");
                    setActiveTab("users");
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#000000",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  View All in Users Tab <ArrowRight size={14} />
                </button>
              </div>

              {pendingUsers.length === 0 ? (
                <div style={{ padding: "3rem 1rem", textAlign: "center", backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px dashed #d1d5db" }}>
                  <CheckCircle2 size={36} color="#10b981" style={{ margin: "0 auto 0.75rem auto" }} />
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#111827" }}>No Pending Approvals</div>
                  <p style={{ fontSize: "0.85rem", color: "#6b7280", maxWidth: "400px", margin: "4px auto 0 auto" }}>
                    When a new salon registers at <code style={{ backgroundColor: "#e5e7eb", padding: "2px 6px", borderRadius: "4px", fontSize: "12px" }}>/register</code>, their credentials and license details will appear here instantly.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {pendingUsers.map((user) => (
                    <div
                      key={user.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "1rem",
                        padding: "1rem 1.25rem",
                        backgroundColor: "#fffbeb",
                        borderRadius: "10px",
                        border: "1px solid #fde68a",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{ width: "42px", height: "42px", borderRadius: "50%", backgroundColor: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", color: "#b45309", fontWeight: 800 }}>
                          <Store size={20} />
                        </div>
                        <div>
                          <div style={{ fontSize: "1rem", fontWeight: 800, color: "#111827" }}>{user.salonName}</div>
                          <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                            {user.name} • {user.city}, {user.state} • {user.phone}
                          </div>
                          {user.gstNumber && (
                            <div style={{ fontSize: "0.75rem", color: "#92400e", fontWeight: 600, marginTop: "2px" }}>
                              GST: {user.gstNumber} {user.licenseNumber && `• Trade Lic: ${user.licenseNumber}`}
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <button
                          onClick={() => setSelectedUserDetail(user)}
                          style={{
                            padding: "0.5rem 0.85rem",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #d1d5db",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Eye size={14} /> Inspect
                        </button>
                        <button
                          onClick={() => handleUpdateUserStatus(user.id, "approved")}
                          disabled={actionLoadingId === user.id}
                          style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "6px",
                            backgroundColor: "#059669",
                            color: "#ffffff",
                            border: "none",
                            fontSize: "0.8rem",
                            fontWeight: 800,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Check size={14} /> Approve Verified Pro
                        </button>
                        <button
                          onClick={() => handleUpdateUserStatus(user.id, "rejected")}
                          disabled={actionLoadingId === user.id}
                          style={{
                            padding: "0.5rem 0.85rem",
                            borderRadius: "6px",
                            backgroundColor: "#dc2626",
                            color: "#ffffff",
                            border: "none",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <X size={14} /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SALON APPROVALS & USERS */}
        {/* ========================================================================= */}
        {activeTab === "users" && (
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            {/* Header Controls */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 800, textTransform: "uppercase", color: "#111827", margin: 0 }}>
                  Salon Accounts & Verifications
                </h2>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "4px 0 0 0" }}>
                  Filter, inspect, and approve salon businesses for trade wholesale pricing.
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div style={{ display: "flex", gap: "6px", backgroundColor: "#f3f4f6", padding: "4px", borderRadius: "8px" }}>
                {(["all", "pending", "approved", "rejected"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setUserFilterStatus(st)}
                    style={{
                      padding: "0.45rem 0.9rem",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textTransform: "capitalize",
                      border: "none",
                      backgroundColor: userFilterStatus === st ? "#000000" : "transparent",
                      color: userFilterStatus === st ? "#ffffff" : "#4b5563",
                      cursor: "pointer",
                    }}
                  >
                    {st} {st !== "all" && `(${userCounts[st] || 0})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Filter Bar */}
            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <Search size={18} color="#9ca3af" style={{ position: "absolute", left: "14px", top: "14px" }} />
              <input
                type="text"
                placeholder="Search salons by name, brand, email, city, or GST number..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 2.75rem",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  boxSizing: "border-box",
                  backgroundColor: "#fafafa",
                }}
              />
            </div>

            {/* Users Table */}
            {usersLoading ? (
              <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#6b7280" }}>Loading registered salons...</div>
            ) : users.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#6b7280" }}>No salon accounts match your search/filter criteria.</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #e5e7eb", color: "#6b7280", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 800 }}>
                      <th style={{ padding: "0.85rem 1rem" }}>Salon / Business</th>
                      <th style={{ padding: "0.85rem 1rem" }}>Contact Person</th>
                      <th style={{ padding: "0.85rem 1rem" }}>Location</th>
                      <th style={{ padding: "0.85rem 1rem" }}>Status</th>
                      <th style={{ padding: "0.85rem 1rem", textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "1rem" }}>
                          <div style={{ fontWeight: 800, color: "#111827", fontSize: "0.95rem" }}>{u.salonName}</div>
                          <div style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: "2px" }}>
                            {u.businessType || "Salon Pro"} {u.gstNumber ? `• GST: ${u.gstNumber}` : ""}
                          </div>
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <div style={{ fontWeight: 600, color: "#111827" }}>{u.name}</div>
                          <div style={{ fontSize: "0.78rem", color: "#6b7280" }}>{u.email}</div>
                          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{u.phone}</div>
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <div style={{ color: "#374151" }}>{u.city}, {u.state}</div>
                          <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>PIN: {u.pincode}</div>
                        </td>
                        <td style={{ padding: "1rem" }}>
                          {u.status === "approved" && (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "#ecfdf5", color: "#065f46", border: "1px solid #a7f3d0", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase" }}>
                              <CheckCircle2 size={13} /> Verified Pro
                            </span>
                          )}
                          {u.status === "pending" && (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "#fffbeb", color: "#92400e", border: "1px solid #fde68a", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase" }}>
                              <Clock size={13} /> Pending Review
                            </span>
                          )}
                          {u.status === "rejected" && (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase" }}>
                              <XCircle size={13} /> Rejected
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "1rem", textAlign: "right" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <button
                              onClick={() => setSelectedUserDetail(u)}
                              title="Inspect Details"
                              style={{ padding: "0.45rem", borderRadius: "6px", backgroundColor: "#f3f4f6", border: "1px solid #e5e7eb", cursor: "pointer" }}
                            >
                              <Eye size={15} color="#4b5563" />
                            </button>
                            {u.status !== "approved" && (
                              <button
                                onClick={() => handleUpdateUserStatus(u.id, "approved")}
                                title="Approve Verified Pro"
                                style={{ padding: "0.45rem 0.75rem", borderRadius: "6px", backgroundColor: "#059669", color: "#fff", border: "none", fontSize: "11px", fontWeight: 800, cursor: "pointer" }}
                              >
                                Approve
                              </button>
                            )}
                            {u.status !== "rejected" && (
                              <button
                                onClick={() => handleUpdateUserStatus(u.id, "rejected")}
                                title="Reject Application"
                                style={{ padding: "0.45rem 0.75rem", borderRadius: "6px", backgroundColor: "#dc2626", color: "#fff", border: "none", fontSize: "11px", fontWeight: 800, cursor: "pointer" }}
                              >
                                Reject
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(u.id, u.salonName)}
                              title="Delete Account"
                              style={{ padding: "0.45rem", borderRadius: "6px", backgroundColor: "#fee2e2", border: "1px solid #fecaca", cursor: "pointer" }}
                            >
                              <Trash2 size={15} color="#dc2626" />
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
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PRODUCTS CATALOG */}
        {/* ========================================================================= */}
        {activeTab === "products" && (
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            {/* Header & Add Button */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 800, textTransform: "uppercase", color: "#111827", margin: 0 }}>
                  Catalog Inventory & Pricing
                </h2>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "4px 0 0 0" }}>
                  Manage 4,200+ wholesale items, stock quantities, and salon trade discounts.
                </p>
              </div>

              <button
                onClick={openAddProductModal}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  padding: "0.65rem 1.25rem",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Plus size={16} /> Add New Product
              </button>
            </div>

            {/* Search & Category Filter */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ position: "relative" }}>
                <Search size={18} color="#9ca3af" style={{ position: "absolute", left: "14px", top: "14px" }} />
                <input
                  type="text"
                  placeholder="Search products by brand, name, or formula..."
                  value={productSearch}
                  onChange={(e) => {
                    setProductSearch(e.target.value);
                    setProductPage(1);
                  }}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem 0.75rem 2.75rem",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    boxSizing: "border-box",
                    backgroundColor: "#fafafa",
                  }}
                />
              </div>

              <select
                value={productCategory}
                onChange={(e) => {
                  setProductCategory(e.target.value);
                  setProductPage(1);
                }}
                style={{
                  padding: "0.75rem 1rem",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  backgroundColor: "#fafafa",
                  cursor: "pointer",
                }}
              >
                {["All Categories", "Hair", "Beauty", "Tools", "Nails", "Skin", "Styling"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Products Table */}
            {productsLoading ? (
              <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#6b7280" }}>Loading product catalog...</div>
            ) : products.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#6b7280" }}>No products found matching your search.</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #e5e7eb", color: "#6b7280", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 800 }}>
                      <th style={{ padding: "0.85rem 1rem" }}>Product</th>
                      <th style={{ padding: "0.85rem 1rem" }}>Category</th>
                      <th style={{ padding: "0.85rem 1rem" }}>Wholesale Trade Price</th>
                      <th style={{ padding: "0.85rem 1rem" }}>Retail MRP</th>
                      <th style={{ padding: "0.85rem 1rem" }}>Margin / Discount</th>
                      <th style={{ padding: "0.85rem 1rem" }}>Status</th>
                      <th style={{ padding: "0.85rem 1rem", textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "0.85rem 1rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div style={{ width: "45px", height: "45px", position: "relative", backgroundColor: "#f9fafb", borderRadius: "6px", overflow: "hidden", flexShrink: 0 }}>
                              <Image
                                src={p.image || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200"}
                                alt={p.name}
                                fill
                                sizes="45px"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#d97706", textTransform: "uppercase" }}>{p.brand}</div>
                              <div style={{ fontWeight: 700, color: "#111827", maxWidth: "280px" }} className="line-clamp-1">{p.name}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "0.85rem 1rem" }}>
                          <span style={{ backgroundColor: "#f3f4f6", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 600 }}>
                            {p.category}
                          </span>
                        </td>
                        <td style={{ padding: "0.85rem 1rem", fontWeight: 800, color: "#065f46" }}>
                          ₹{p.salePrice.toLocaleString("en-IN")}
                        </td>
                        <td style={{ padding: "0.85rem 1rem", color: "#6b7280" }}>
                          ₹{p.mrp.toLocaleString("en-IN")}
                        </td>
                        <td style={{ padding: "0.85rem 1rem" }}>
                          <span style={{ color: "#dc2626", fontWeight: 700, fontSize: "12px" }}>
                            {p.discount || `${p.discountPercent}% OFF`}
                          </span>
                        </td>
                        <td style={{ padding: "0.85rem 1rem" }}>
                          <span style={{ fontSize: "11px", fontWeight: 700, color: p.availability === "In Stock" ? "#059669" : "#d97706" }}>
                            {p.availability}
                          </span>
                        </td>
                        <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "6px" }}>
                            <button
                              onClick={() => openEditProductModal(p)}
                              title="Edit Product"
                              style={{ padding: "0.45rem", borderRadius: "6px", backgroundColor: "#f3f4f6", border: "1px solid #e5e7eb", cursor: "pointer" }}
                            >
                              <Edit size={14} color="#374151" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              title="Delete Product"
                              style={{ padding: "0.45rem", borderRadius: "6px", backgroundColor: "#fee2e2", border: "1px solid #fecaca", cursor: "pointer" }}
                            >
                              <Trash2 size={14} color="#dc2626" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                Showing page <span style={{ fontWeight: 700, color: "#111827" }}>{productPage}</span> of <span style={{ fontWeight: 700, color: "#111827" }}>{totalProductPages}</span> ({totalProducts.toLocaleString("en-IN")} products)
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => setProductPage((prev) => Math.max(1, prev - 1))}
                  disabled={productPage === 1}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "0.5rem 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: productPage === 1 ? "#f9fafb" : "#ffffff",
                    color: productPage === 1 ? "#9ca3af" : "#111827",
                    cursor: productPage === 1 ? "not-allowed" : "pointer",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <button
                  onClick={() => setProductPage((prev) => Math.min(totalProductPages, prev + 1))}
                  disabled={productPage >= totalProductPages}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "0.5rem 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: productPage >= totalProductPages ? "#f9fafb" : "#ffffff",
                    color: productPage >= totalProductPages ? "#9ca3af" : "#111827",
                    cursor: productPage >= totalProductPages ? "not-allowed" : "pointer",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: SALON DETAILS INSPECTOR */}
      {/* ========================================================================= */}
      {selectedUserDetail && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "2rem", position: "relative", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)" }}>
            <button
              onClick={() => setSelectedUserDetail(null)}
              style={{ position: "absolute", right: "1.5rem", top: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}
            >
              <X size={22} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "10px", backgroundColor: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Store size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "#111827" }}>{selectedUserDetail.salonName}</h3>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "2px 0 0 0" }}>{selectedUserDetail.businessType} • Registered {new Date(selectedUserDetail.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", backgroundColor: "#f9fafb", padding: "1.25rem", borderRadius: "10px", marginBottom: "1.25rem", fontSize: "0.88rem" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 700 }}>Owner / Stylist</span>
                <div style={{ fontWeight: 700, color: "#111827", marginTop: "2px" }}>{selectedUserDetail.name}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 700 }}>Email Address</span>
                <div style={{ fontWeight: 700, color: "#111827", marginTop: "2px" }}>{selectedUserDetail.email}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 700 }}>Phone</span>
                <div style={{ fontWeight: 700, color: "#111827", marginTop: "2px" }}>{selectedUserDetail.phone}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 700 }}>GST Number</span>
                <div style={{ fontWeight: 700, color: "#111827", marginTop: "2px" }}>{selectedUserDetail.gstNumber || "Not Provided"}</div>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem", fontSize: "0.88rem" }}>
              <span style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 700 }}>Full Salon Physical Address</span>
              <div style={{ backgroundColor: "#f9fafb", padding: "0.85rem", borderRadius: "8px", marginTop: "4px", color: "#374151" }}>
                {selectedUserDetail.address}, {selectedUserDetail.city}, {selectedUserDetail.state} - {selectedUserDetail.pincode}
              </div>
            </div>

            {selectedUserDetail.licenseNumber && (
              <div style={{ marginBottom: "1.5rem", fontSize: "0.88rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 700 }}>Trade License Number</span>
                <div style={{ backgroundColor: "#f9fafb", padding: "0.85rem", borderRadius: "8px", marginTop: "4px", fontWeight: 700, color: "#111827" }}>
                  {selectedUserDetail.licenseNumber}
                </div>
              </div>
            )}

            {/* Quick Action Footer */}
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", borderTop: "1px solid #e5e7eb", paddingTop: "1.25rem" }}>
              <button
                onClick={() => setSelectedUserDetail(null)}
                style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", border: "1px solid #d1d5db", backgroundColor: "#fff", fontWeight: 700, cursor: "pointer" }}
              >
                Close
              </button>
              {selectedUserDetail.status !== "approved" && (
                <button
                  onClick={() => {
                    handleUpdateUserStatus(selectedUserDetail.id, "approved");
                    setSelectedUserDetail(null);
                  }}
                  style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", backgroundColor: "#059669", color: "#fff", border: "none", fontWeight: 800, cursor: "pointer" }}
                >
                  Approve Application
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT PRODUCT */}
      {/* ========================================================================= */}
      {isProductModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "650px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "2rem", position: "relative", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)" }}>
            <button
              onClick={() => setIsProductModalOpen(false)}
              style={{ position: "absolute", right: "1.5rem", top: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}
            >
              <X size={22} />
            </button>

            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: "0 0 1.25rem 0", textTransform: "uppercase" }}>
              {editingProductId ? "Edit Wholesale Product" : "Add New Wholesale SKU"}
            </h3>

            <form onSubmit={handleSaveProduct} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Olaplex No. 3 Hair Perfector 100ml"
                  value={productFormData.name || ""}
                  onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #d1d5db", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>Brand</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Olaplex, L'Oréal, Redken"
                    value={productFormData.brand || ""}
                    onChange={(e) => setProductFormData({ ...productFormData, brand: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #d1d5db", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>Category</label>
                  <select
                    value={productFormData.category || "Hair"}
                    onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #d1d5db", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box", backgroundColor: "#fff" }}
                  >
                    {["Hair", "Beauty", "Tools", "Nails", "Skin", "Styling"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>Wholesale Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productFormData.salePrice || ""}
                    onChange={(e) => setProductFormData({ ...productFormData, salePrice: Number(e.target.value) })}
                    style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #d1d5db", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>Retail MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={productFormData.mrp || ""}
                    onChange={(e) => setProductFormData({ ...productFormData, mrp: Number(e.target.value) })}
                    style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #d1d5db", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>Availability</label>
                  <select
                    value={productFormData.availability || "In Stock"}
                    onChange={(e) => setProductFormData({ ...productFormData, availability: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #d1d5db", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box", backgroundColor: "#fff" }}
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>Image URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={productFormData.image || ""}
                  onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #d1d5db", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>Product Description</label>
                <textarea
                  rows={3}
                  placeholder="Professional salon grade formula details..."
                  value={productFormData.description || ""}
                  onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #d1d5db", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  style={{ padding: "0.65rem 1.25rem", borderRadius: "8px", border: "1px solid #d1d5db", backgroundColor: "#fff", fontWeight: 700, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "0.65rem 1.5rem", borderRadius: "8px", backgroundColor: "#000", color: "#fff", border: "none", fontWeight: 800, cursor: "pointer" }}
                >
                  {editingProductId ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
