"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingBag,
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
  Check,
  Menu,
  TrendingUp,
  FileText,
  Truck
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

interface Order {
  id: string;
  createdAt: string;
  salonName: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    productId: string;
    name: string;
    brand: string;
    image: string;
    quantity: number;
    price: number;
    mrp: number;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: "Pending" | "Confirmed" | "Packing" | "Dispatched" | "Delivered" | "Cancelled";
  paymentMethod: string;
  paymentStatus: "Pending" | "Paid";
  trackingNumber?: string;
  notes?: string;
}

export default function AdminPortalPage() {
  const [activeNav, setActiveNav] = useState<"dashboard" | "users" | "products" | "orders">("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [orderFilterStatus, setOrderFilterStatus] = useState("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderCounts, setOrderCounts] = useState({ all: 0, pending: 0, packing: 0, dispatched: 0, delivered: 0, cancelled: 0 });
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<Order | null>(null);
  const [totalRevenue, setTotalRevenue] = useState(0);

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

  // Fetch Orders
  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const params = new URLSearchParams();
      if (orderFilterStatus !== "all") params.set("status", orderFilterStatus);
      if (orderSearch) params.set("search", orderSearch);

      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      const data = await res.json();
      setOrders(data.orders || []);
      if (data.counts) setOrderCounts(data.counts);
      if (data.stats) setTotalRevenue(data.stats.totalRevenue || 0);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setOrdersLoading(false);
    }
  }, [orderFilterStatus, orderSearch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Handle Salon Status Change
  const handleUpdateUserStatus = async (id: string, newStatus: "approved" | "rejected") => {
    let reason: string | undefined;
    if (newStatus === "rejected") {
      const promptReason = prompt("Reason for rejection:");
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
        alert("Failed to update status");
      }
    } catch {
      alert("Error updating salon status");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (id: string, salonName: string) => {
    if (!confirm(`Delete salon "${salonName}"?`)) return;
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      if (res.ok) await fetchUsers();
    } catch {
      alert("Error deleting user");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Handle Product Save
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
    if (!confirm(`Delete "${productName}" from wholesale catalog?`)) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      if (res.ok) await fetchProducts();
    } catch {
      alert("Error deleting product");
    }
  };

  // Handle Update Order Status
  const handleUpdateOrderStatus = async (id: string, newStatus: Order["status"], tracking?: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, trackingNumber: tracking }),
      });
      if (res.ok) {
        await fetchOrders();
        if (selectedOrderDetail && selectedOrderDetail.id === id) {
          setSelectedOrderDetail((prev) => prev ? { ...prev, status: newStatus, trackingNumber: tracking ?? prev.trackingNumber } : null);
        }
      }
    } catch {
      alert("Error updating order status");
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
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "system-ui, -apple-system, sans-serif", color: "#0f172a" }}>
      {/* ========================================================================= */}
      {/* DEDICATED ADMIN SIDEBAR */}
      {/* ========================================================================= */}
      <aside
        style={{
          width: "270px",
          backgroundColor: "#090d16",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          borderRight: "1px solid #1e293b",
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 60,
          transition: "transform 0.3s ease",
        }}
      >
        {/* Brand Bar */}
        <div style={{ padding: "1.5rem 1.25rem", borderBottom: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", backgroundColor: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", color: "#000000", fontWeight: 900 }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <div style={{ fontSize: "1.1rem", fontWeight: 900, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Beu<span style={{ color: "#34d399" }}>PROS</span>
                </div>
                <div style={{ fontSize: "10px", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Admin Workspace
                </div>
              </div>
            </div>
            <span style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "2px 7px", borderRadius: "9999px", fontSize: "10px", fontWeight: 800 }}>
              LIVE
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ padding: "1.25rem 0.85rem", display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflowY: "auto" }}>
          <button
            onClick={() => setActiveNav("dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: 700,
              backgroundColor: activeNav === "dashboard" ? "#1e293b" : "transparent",
              color: activeNav === "dashboard" ? "#ffffff" : "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <LayoutDashboard size={18} color={activeNav === "dashboard" ? "#34d399" : "#64748b"} />
              <span>Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => setActiveNav("users")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: 700,
              backgroundColor: activeNav === "users" ? "#1e293b" : "transparent",
              color: activeNav === "users" ? "#ffffff" : "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Users size={18} color={activeNav === "users" ? "#34d399" : "#64748b"} />
              <span>Salon Verifications</span>
            </div>
            {userCounts.pending > 0 && (
              <span style={{ backgroundColor: "#f59e0b", color: "#000000", fontSize: "11px", fontWeight: 900, padding: "2px 7px", borderRadius: "9999px" }}>
                {userCounts.pending}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveNav("products")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: 700,
              backgroundColor: activeNav === "products" ? "#1e293b" : "transparent",
              color: activeNav === "products" ? "#ffffff" : "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Package size={18} color={activeNav === "products" ? "#34d399" : "#64748b"} />
              <span>Products Catalog</span>
            </div>
            <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700 }}>4.2k</span>
          </button>

          <button
            onClick={() => setActiveNav("orders")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: 700,
              backgroundColor: activeNav === "orders" ? "#1e293b" : "transparent",
              color: activeNav === "orders" ? "#ffffff" : "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <ShoppingBag size={18} color={activeNav === "orders" ? "#34d399" : "#64748b"} />
              <span>Wholesale Orders</span>
            </div>
            {orderCounts.pending > 0 && (
              <span style={{ backgroundColor: "#3b82f6", color: "#ffffff", fontSize: "11px", fontWeight: 900, padding: "2px 7px", borderRadius: "9999px" }}>
                {orderCounts.pending}
              </span>
            )}
          </button>
        </nav>

        {/* Footer Admin Status & Storefront Link */}
        <div style={{ padding: "1.25rem 1rem", borderTop: "1px solid #1e293b", backgroundColor: "#060910" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.85rem" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#334155", display: "flex", alignItems: "center", justifyContent: "center", color: "#f8fafc", fontWeight: 800, fontSize: "13px" }}>
              AD
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#f8fafc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Master Administrator
              </div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>admin@beupros.com</div>
            </div>
          </div>

          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "0.55rem",
              borderRadius: "6px",
              backgroundColor: "#1e293b",
              color: "#cbd5e1",
              fontSize: "0.8rem",
              fontWeight: 700,
              textDecoration: "none",
              border: "1px solid #334155",
            }}
          >
            <ExternalLink size={14} /> Open Storefront
          </Link>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN ADMIN WORKSPACE */}
      {/* ========================================================================= */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Executive Header Bar */}
        <header
          style={{
            height: "70px",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2rem",
            position: "sticky",
            top: 0,
            zIndex: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="mobile-only"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#0f172a" }}
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 style={{ fontSize: "1.25rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.02em", color: "#0f172a", margin: 0 }}>
                {activeNav === "dashboard" && "Dashboard & Real-time Metrics"}
                {activeNav === "users" && "Salon Verifications & Pro Accounts"}
                {activeNav === "products" && "Product Catalog & Wholesale Inventory"}
                {activeNav === "orders" && "Wholesale Trade Orders Fulfillment"}
              </h1>
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                BeuPROS Pro Commerce Network • Dedicated Administration Console
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {activeNav === "products" && (
              <button
                onClick={openAddProductModal}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  padding: "0.6rem 1.1rem",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Plus size={15} /> Add New SKU
              </button>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", padding: "4px 10px", borderRadius: "9999px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981" }} />
              <span style={{ fontSize: "11px", fontWeight: 800, color: "#065f46", textTransform: "uppercase" }}>
                Auto Sync Active
              </span>
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <main style={{ padding: "2rem", flex: 1, overflowY: "auto" }}>
          {/* ===================================================================== */}
          {/* 1. DASHBOARD OVERVIEW */}
          {/* ===================================================================== */}
          {activeNav === "dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Executive Metric Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.25rem" }}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#64748b" }}>Pending Salon Approvals</span>
                    <div style={{ backgroundColor: "#fef3c7", padding: "6px", borderRadius: "8px", color: "#d97706" }}>
                      <Clock size={18} />
                    </div>
                  </div>
                  <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#b45309" }}>{userCounts.pending}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#d97706", marginTop: "4px", fontWeight: 600 }}>
                    Needs license verification
                  </div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#64748b" }}>Verified Pro Salons</span>
                    <div style={{ backgroundColor: "#ecfdf5", padding: "6px", borderRadius: "8px", color: "#059669" }}>
                      <ShieldCheck size={18} />
                    </div>
                  </div>
                  <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#065f46" }}>{userCounts.approved}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#059669", marginTop: "4px", fontWeight: 600 }}>
                    <TrendingUp size={14} /> Full wholesale ordering access
                  </div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#64748b" }}>Wholesale Pipeline</span>
                    <div style={{ backgroundColor: "#eff6ff", padding: "6px", borderRadius: "8px", color: "#2563eb" }}>
                      <ShoppingBag size={18} />
                    </div>
                  </div>
                  <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#1e3a8a" }}>
                    ₹{totalRevenue.toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "12px", color: "#2563eb", marginTop: "4px", fontWeight: 600 }}>
                    {orderCounts.all} salon trade orders placed
                  </div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#64748b" }}>Wholesale Catalog SKUs</span>
                    <div style={{ backgroundColor: "#faf5ff", padding: "6px", borderRadius: "8px", color: "#9333ea" }}>
                      <Package size={18} />
                    </div>
                  </div>
                  <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#581c87" }}>
                    {totalProducts > 0 ? totalProducts.toLocaleString("en-IN") : "4,200+"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#9333ea", marginTop: "4px", fontWeight: 600 }}>
                    Active salon professional items
                  </div>
                </div>
              </div>

              {/* Action Required: Salon Approvals Review Queue */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "1.75rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <div>
                    <h2 style={{ fontSize: "1.15rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.02em", color: "#0f172a", margin: 0 }}>
                      Pending Salon Applications ({pendingUsers.length})
                    </h2>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                      Salons cannot access wholesale trade discounts until an administrator approves their application.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveNav("users")}
                    style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0f172a", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                  >
                    View All in Users Tab →
                  </button>
                </div>

                {pendingUsers.length === 0 ? (
                  <div style={{ padding: "3rem 1rem", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "10px", border: "1.5px dashed #cbd5e1" }}>
                    <CheckCircle2 size={38} color="#10b981" style={{ margin: "0 auto 0.75rem auto" }} />
                    <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>All Salon Applications Processed</div>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                      There are currently no salon applications awaiting review.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
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
                          <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Store size={22} />
                          </div>
                          <div>
                            <div style={{ fontSize: "1rem", fontWeight: 900, color: "#0f172a" }}>{user.salonName}</div>
                            <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
                              {user.name} • {user.city}, {user.state} • {user.phone}
                            </div>
                            {user.gstNumber && (
                              <div style={{ fontSize: "0.75rem", color: "#b45309", fontWeight: 700, marginTop: "2px" }}>
                                GST: {user.gstNumber} {user.licenseNumber ? `• Trade Lic: ${user.licenseNumber}` : ""}
                              </div>
                            )}
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <button
                            onClick={() => setSelectedUserDetail(user)}
                            style={{ padding: "0.5rem 0.85rem", borderRadius: "6px", backgroundColor: "#ffffff", border: "1px solid #cbd5e1", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
                          >
                            <Eye size={14} /> Inspect
                          </button>
                          <button
                            onClick={() => handleUpdateUserStatus(user.id, "approved")}
                            disabled={actionLoadingId === user.id}
                            style={{ padding: "0.5rem 1.1rem", borderRadius: "6px", backgroundColor: "#059669", color: "#ffffff", border: "none", fontSize: "0.82rem", fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
                          >
                            <Check size={14} /> Approve Verified Pro
                          </button>
                          <button
                            onClick={() => handleUpdateUserStatus(user.id, "rejected")}
                            disabled={actionLoadingId === user.id}
                            style={{ padding: "0.5rem 0.85rem", borderRadius: "6px", backgroundColor: "#dc2626", color: "#ffffff", border: "none", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Orders Snapshot */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "1.75rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <div>
                    <h2 style={{ fontSize: "1.15rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.02em", color: "#0f172a", margin: 0 }}>
                      Recent Wholesale Orders
                    </h2>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                      Latest salon product shipments placed across the country.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveNav("orders")}
                    style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0f172a", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                  >
                    View All Orders →
                  </button>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #e2e8f0", color: "#64748b", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 800 }}>
                        <th style={{ padding: "0.75rem 1rem" }}>Order #</th>
                        <th style={{ padding: "0.75rem 1rem" }}>Salon Partner</th>
                        <th style={{ padding: "0.75rem 1rem" }}>Items</th>
                        <th style={{ padding: "0.75rem 1rem" }}>Total Amount</th>
                        <th style={{ padding: "0.75rem 1rem" }}>Status</th>
                        <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "0.85rem 1rem", fontWeight: 800, fontFamily: "monospace", color: "#0f172a" }}>
                            {o.id}
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <div style={{ fontWeight: 800, color: "#0f172a" }}>{o.salonName}</div>
                            <div style={{ fontSize: "11px", color: "#64748b" }}>{o.shippingAddress.city}, {o.shippingAddress.state}</div>
                          </td>
                          <td style={{ padding: "0.85rem 1rem", color: "#475569" }}>
                            {o.items?.length || 1} SKUs
                          </td>
                          <td style={{ padding: "0.85rem 1rem", fontWeight: 900, color: "#059669" }}>
                            ₹{o.total?.toLocaleString("en-IN")}
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <span style={{ backgroundColor: o.status === "Delivered" ? "#ecfdf5" : o.status === "Dispatched" ? "#eff6ff" : "#fffbeb", color: o.status === "Delivered" ? "#065f46" : o.status === "Dispatched" ? "#1e40af" : "#92400e", padding: "3px 8px", borderRadius: "9999px", fontSize: "11px", fontWeight: 800 }}>
                              {o.status}
                            </span>
                          </td>
                          <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                            <button
                              onClick={() => setSelectedOrderDetail(o)}
                              style={{ padding: "0.4rem 0.75rem", borderRadius: "6px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", fontSize: "11px", fontWeight: 800, cursor: "pointer" }}
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* 2. SALON APPROVALS & USERS TAB */}
          {/* ===================================================================== */}
          {activeNav === "users" && (
            <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "1.75rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              {/* Header Filters & Search */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 900, textTransform: "uppercase", color: "#0f172a", margin: 0 }}>
                    Salon Business Verifications
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Inspect salon trade registrations, trade licenses, and manage wholesale permissions.
                  </p>
                </div>

                {/* Filter Pills */}
                <div style={{ display: "flex", gap: "6px", backgroundColor: "#f1f5f9", padding: "4px", borderRadius: "8px" }}>
                  {(["all", "pending", "approved", "rejected"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setUserFilterStatus(st)}
                      style={{
                        padding: "0.45rem 0.9rem",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: 800,
                        textTransform: "capitalize",
                        border: "none",
                        backgroundColor: userFilterStatus === st ? "#0f172a" : "transparent",
                        color: userFilterStatus === st ? "#ffffff" : "#64748b",
                        cursor: "pointer",
                      }}
                    >
                      {st} {st !== "all" && `(${userCounts[st] || 0})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <Search size={18} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "14px" }} />
                <input
                  type="text"
                  placeholder="Search salons by brand name, stylist owner, city, email, or GST..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem 0.75rem 2.75rem",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    boxSizing: "border-box",
                    backgroundColor: "#f8fafc",
                  }}
                />
              </div>

              {/* Users Table */}
              {usersLoading ? (
                <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#64748b" }}>Loading salon partners...</div>
              ) : users.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#64748b" }}>No salons found matching your criteria.</div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #e2e8f0", color: "#64748b", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 800 }}>
                        <th style={{ padding: "0.85rem 1rem" }}>Salon / Business</th>
                        <th style={{ padding: "0.85rem 1rem" }}>Contact Person</th>
                        <th style={{ padding: "0.85rem 1rem" }}>City & State</th>
                        <th style={{ padding: "0.85rem 1rem" }}>Status</th>
                        <th style={{ padding: "0.85rem 1rem", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "1rem" }}>
                            <div style={{ fontWeight: 900, color: "#0f172a", fontSize: "0.95rem" }}>{u.salonName}</div>
                            <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "2px" }}>
                              {u.businessType || "Salon Pro"} {u.gstNumber ? `• GST: ${u.gstNumber}` : ""}
                            </div>
                          </td>
                          <td style={{ padding: "1rem" }}>
                            <div style={{ fontWeight: 700, color: "#0f172a" }}>{u.name}</div>
                            <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{u.email}</div>
                            <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{u.phone}</div>
                          </td>
                          <td style={{ padding: "1rem" }}>
                            <div style={{ color: "#334155", fontWeight: 600 }}>{u.city}, {u.state}</div>
                            <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>PIN: {u.pincode}</div>
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
                                style={{ padding: "0.45rem", borderRadius: "6px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", cursor: "pointer" }}
                              >
                                <Eye size={15} color="#475569" />
                              </button>
                              {u.status !== "approved" && (
                                <button
                                  onClick={() => handleUpdateUserStatus(u.id, "approved")}
                                  title="Approve Verified Pro"
                                  style={{ padding: "0.45rem 0.85rem", borderRadius: "6px", backgroundColor: "#059669", color: "#fff", border: "none", fontSize: "11px", fontWeight: 900, cursor: "pointer" }}
                                >
                                  Approve
                                </button>
                              )}
                              {u.status !== "rejected" && (
                                <button
                                  onClick={() => handleUpdateUserStatus(u.id, "rejected")}
                                  title="Reject Application"
                                  style={{ padding: "0.45rem 0.85rem", borderRadius: "6px", backgroundColor: "#dc2626", color: "#fff", border: "none", fontSize: "11px", fontWeight: 900, cursor: "pointer" }}
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

          {/* ===================================================================== */}
          {/* 3. PRODUCTS CATALOG TAB */}
          {/* ===================================================================== */}
          {activeNav === "products" && (
            <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "1.75rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              {/* Header Controls */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 900, textTransform: "uppercase", color: "#0f172a", margin: 0 }}>
                    Catalog Inventory & Pricing
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Manage wholesale pricing, stock availability, and SKU margins.
                  </p>
                </div>

                <button
                  onClick={openAddProductModal}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    padding: "0.65rem 1.25rem",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Plus size={16} /> Add New SKU
                </button>
              </div>

              {/* Search & Category Filter */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ position: "relative" }}>
                  <Search size={18} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "14px" }} />
                  <input
                    type="text"
                    placeholder="Search 4,200+ products by brand, title, or formula..."
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value);
                      setProductPage(1);
                    }}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem 0.75rem 2.75rem",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      boxSizing: "border-box",
                      backgroundColor: "#f8fafc",
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
                    border: "1.5px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    backgroundColor: "#f8fafc",
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
                <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#64748b" }}>Loading catalog...</div>
              ) : products.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#64748b" }}>No products found.</div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #e2e8f0", color: "#64748b", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 800 }}>
                        <th style={{ padding: "0.85rem 1rem" }}>Product SKU</th>
                        <th style={{ padding: "0.85rem 1rem" }}>Category</th>
                        <th style={{ padding: "0.85rem 1rem" }}>Wholesale Sale Price</th>
                        <th style={{ padding: "0.85rem 1rem" }}>Retail MRP</th>
                        <th style={{ padding: "0.85rem 1rem" }}>Discount Margin</th>
                        <th style={{ padding: "0.85rem 1rem" }}>Stock Status</th>
                        <th style={{ padding: "0.85rem 1rem", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                              <div style={{ width: "42px", height: "42px", position: "relative", backgroundColor: "#f8fafc", borderRadius: "6px", overflow: "hidden", flexShrink: 0 }}>
                                <Image
                                  src={p.image || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200"}
                                  alt={p.name}
                                  fill
                                  sizes="42px"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <div>
                                <div style={{ fontSize: "0.75rem", fontWeight: 900, color: "#d97706", textTransform: "uppercase" }}>{p.brand}</div>
                                <div style={{ fontWeight: 700, color: "#0f172a", maxWidth: "260px" }} className="line-clamp-1">{p.name}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <span style={{ backgroundColor: "#f1f5f9", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>
                              {p.category}
                            </span>
                          </td>
                          <td style={{ padding: "0.85rem 1rem", fontWeight: 900, color: "#059669" }}>
                            ₹{p.salePrice.toLocaleString("en-IN")}
                          </td>
                          <td style={{ padding: "0.85rem 1rem", color: "#64748b" }}>
                            ₹{p.mrp.toLocaleString("en-IN")}
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <span style={{ color: "#dc2626", fontWeight: 800, fontSize: "12px" }}>
                              {p.discount || `${p.discountPercent}% OFF`}
                            </span>
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <span style={{ fontSize: "11px", fontWeight: 800, color: p.availability === "In Stock" ? "#059669" : "#d97706" }}>
                              {p.availability}
                            </span>
                          </td>
                          <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                            <div style={{ display: "inline-flex", gap: "6px" }}>
                              <button
                                onClick={() => openEditProductModal(p)}
                                title="Edit Product"
                                style={{ padding: "0.45rem", borderRadius: "6px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", cursor: "pointer" }}
                              >
                                <Edit size={14} color="#334155" />
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

              {/* Pagination */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  Page <span style={{ fontWeight: 800, color: "#0f172a" }}>{productPage}</span> of <span style={{ fontWeight: 800, color: "#0f172a" }}>{totalProductPages}</span> ({totalProducts.toLocaleString("en-IN")} items)
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                    disabled={productPage === 1}
                    style={{ padding: "0.5rem 0.85rem", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff", cursor: productPage === 1 ? "not-allowed" : "pointer", fontSize: "0.82rem", fontWeight: 700 }}
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>
                  <button
                    onClick={() => setProductPage((p) => Math.min(totalProductPages, p + 1))}
                    disabled={productPage >= totalProductPages}
                    style={{ padding: "0.5rem 0.85rem", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff", cursor: productPage >= totalProductPages ? "not-allowed" : "pointer", fontSize: "0.82rem", fontWeight: 700 }}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* 4. WHOLESALE ORDERS TAB */}
          {/* ===================================================================== */}
          {activeNav === "orders" && (
            <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "1.75rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 900, textTransform: "uppercase", color: "#0f172a", margin: 0 }}>
                    Wholesale Trade Orders
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Manage fulfillment, generate packing slips, and update dispatch tracking.
                  </p>
                </div>

                {/* Order Filter Pills */}
                <div style={{ display: "flex", gap: "6px", backgroundColor: "#f1f5f9", padding: "4px", borderRadius: "8px" }}>
                  {(["all", "Pending", "Packing", "Dispatched", "Delivered"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilterStatus(st)}
                      style={{
                        padding: "0.45rem 0.9rem",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: 800,
                        textTransform: "capitalize",
                        border: "none",
                        backgroundColor: orderFilterStatus === st ? "#0f172a" : "transparent",
                        color: orderFilterStatus === st ? "#ffffff" : "#64748b",
                        cursor: "pointer",
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Orders */}
              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <Search size={18} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "14px" }} />
                <input
                  type="text"
                  placeholder="Search orders by Order #, salon name, city, or phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem 0.75rem 2.75rem",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    boxSizing: "border-box",
                    backgroundColor: "#f8fafc",
                  }}
                />
              </div>

              {ordersLoading ? (
                <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#64748b" }}>Loading wholesale orders...</div>
              ) : orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#64748b" }}>No orders found.</div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #e2e8f0", color: "#64748b", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 800 }}>
                        <th style={{ padding: "0.85rem 1rem" }}>Order #</th>
                        <th style={{ padding: "0.85rem 1rem" }}>Salon Details</th>
                        <th style={{ padding: "0.85rem 1rem" }}>Products</th>
                        <th style={{ padding: "0.85rem 1rem" }}>Grand Total</th>
                        <th style={{ padding: "0.85rem 1rem" }}>Payment</th>
                        <th style={{ padding: "0.85rem 1rem" }}>Fulfillment Status</th>
                        <th style={{ padding: "0.85rem 1rem", textAlign: "right" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "1rem", fontWeight: 900, fontFamily: "monospace", color: "#0f172a" }}>
                            {o.id}
                            <div style={{ fontSize: "11px", fontWeight: 500, color: "#94a3b8", fontFamily: "sans-serif" }}>
                              {new Date(o.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td style={{ padding: "1rem" }}>
                            <div style={{ fontWeight: 800, color: "#0f172a" }}>{o.salonName}</div>
                            <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{o.customerName} • {o.phone}</div>
                            <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{o.shippingAddress.city}, {o.shippingAddress.state}</div>
                          </td>
                          <td style={{ padding: "1rem", color: "#334155" }}>
                            <div style={{ fontWeight: 700 }}>{o.items?.length || 1} SKUs</div>
                            <div style={{ fontSize: "0.75rem", color: "#64748b", maxWidth: "200px" }} className="line-clamp-1">
                              {o.items?.map((i) => i.name).join(", ")}
                            </div>
                          </td>
                          <td style={{ padding: "1rem", fontWeight: 900, color: "#059669", fontSize: "0.95rem" }}>
                            ₹{o.total?.toLocaleString("en-IN")}
                          </td>
                          <td style={{ padding: "1rem" }}>
                            <span style={{ fontSize: "11px", fontWeight: 700, color: o.paymentStatus === "Paid" ? "#059669" : "#b45309" }}>
                              ● {o.paymentMethod}
                            </span>
                          </td>
                          <td style={{ padding: "1rem" }}>
                            <select
                              value={o.status}
                              onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as Order["status"])}
                              style={{
                                padding: "4px 8px",
                                borderRadius: "6px",
                                fontSize: "11px",
                                fontWeight: 800,
                                border: "1px solid #cbd5e1",
                                backgroundColor: o.status === "Delivered" ? "#ecfdf5" : o.status === "Dispatched" ? "#eff6ff" : "#fffbeb",
                                color: o.status === "Delivered" ? "#065f46" : o.status === "Dispatched" ? "#1e40af" : "#92400e",
                                cursor: "pointer",
                              }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Packing">Packing</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td style={{ padding: "1rem", textAlign: "right" }}>
                            <button
                              onClick={() => setSelectedOrderDetail(o)}
                              style={{ padding: "0.45rem 0.85rem", borderRadius: "6px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", fontSize: "11px", fontWeight: 800, cursor: "pointer" }}
                            >
                              Inspect Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: SALON DETAILS INSPECTOR */}
      {/* ========================================================================= */}
      {selectedUserDetail && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "2rem", position: "relative", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            <button
              onClick={() => setSelectedUserDetail(null)}
              style={{ position: "absolute", right: "1.5rem", top: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
            >
              <X size={22} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "10px", backgroundColor: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Store size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 900, margin: 0, color: "#0f172a" }}>{selectedUserDetail.salonName}</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "2px 0 0 0" }}>{selectedUserDetail.businessType} • Registered {new Date(selectedUserDetail.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", backgroundColor: "#f8fafc", padding: "1.25rem", borderRadius: "10px", marginBottom: "1.25rem", fontSize: "0.88rem" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 800 }}>Stylist / Owner</span>
                <div style={{ fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{selectedUserDetail.name}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 800 }}>Email Address</span>
                <div style={{ fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{selectedUserDetail.email}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 800 }}>Contact Phone</span>
                <div style={{ fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{selectedUserDetail.phone}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 800 }}>GST / Tax Number</span>
                <div style={{ fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{selectedUserDetail.gstNumber || "Not Provided"}</div>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem", fontSize: "0.88rem" }}>
              <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 800 }}>Salon Street Address</span>
              <div style={{ backgroundColor: "#f8fafc", padding: "0.85rem", borderRadius: "8px", marginTop: "4px", color: "#334155", fontWeight: 600 }}>
                {selectedUserDetail.address}, {selectedUserDetail.city}, {selectedUserDetail.state} - {selectedUserDetail.pincode}
              </div>
            </div>

            {selectedUserDetail.licenseNumber && (
              <div style={{ marginBottom: "1.5rem", fontSize: "0.88rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 800 }}>Trade License Number</span>
                <div style={{ backgroundColor: "#f8fafc", padding: "0.85rem", borderRadius: "8px", marginTop: "4px", fontWeight: 800, color: "#0f172a" }}>
                  {selectedUserDetail.licenseNumber}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", borderTop: "1px solid #e2e8f0", paddingTop: "1.25rem" }}>
              <button
                onClick={() => setSelectedUserDetail(null)}
                style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#fff", fontWeight: 700, cursor: "pointer" }}
              >
                Close
              </button>
              {selectedUserDetail.status !== "approved" && (
                <button
                  onClick={() => {
                    handleUpdateUserStatus(selectedUserDetail.id, "approved");
                    setSelectedUserDetail(null);
                  }}
                  style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", backgroundColor: "#059669", color: "#fff", border: "none", fontWeight: 900, cursor: "pointer" }}
                >
                  Approve Application
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ORDER DETAILS INSPECTOR */}
      {/* ========================================================================= */}
      {selectedOrderDetail && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "680px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "2rem", position: "relative", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            <button
              onClick={() => setSelectedOrderDetail(null)}
              style={{ position: "absolute", right: "1.5rem", top: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
            >
              <X size={22} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
              <div style={{ width: "45px", height: "45px", borderRadius: "10px", backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FileText size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 900, margin: 0, color: "#0f172a" }}>
                  Order {selectedOrderDetail.id}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "2px 0 0 0" }}>
                  Placed on {new Date(selectedOrderDetail.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Salon Details */}
            <div style={{ backgroundColor: "#f8fafc", padding: "1.25rem", borderRadius: "10px", marginBottom: "1.25rem", fontSize: "0.88rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>Salon Partner</span>
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>{selectedOrderDetail.salonName}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{selectedOrderDetail.customerName} ({selectedOrderDetail.phone})</div>
                </div>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>Payment Details</span>
                  <div style={{ fontWeight: 800, color: "#0f172a" }}>{selectedOrderDetail.paymentMethod}</div>
                  <div style={{ fontSize: "0.8rem", color: selectedOrderDetail.paymentStatus === "Paid" ? "#059669" : "#d97706", fontWeight: 700 }}>
                    Status: {selectedOrderDetail.paymentStatus}
                  </div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>Delivery Destination</span>
                <div style={{ color: "#334155", fontWeight: 600 }}>
                  {selectedOrderDetail.shippingAddress.street}, {selectedOrderDetail.shippingAddress.city}, {selectedOrderDetail.shippingAddress.state} - {selectedOrderDetail.shippingAddress.pincode}
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div style={{ marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                Order Items ({selectedOrderDetail.items?.length})
              </span>
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
                {selectedOrderDetail.items?.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderBottom: idx !== selectedOrderDetail.items.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", position: "relative", backgroundColor: "#f8fafc", borderRadius: "4px", overflow: "hidden" }}>
                        <Image src={item.image} alt={item.name} fill sizes="36px" style={{ objectFit: "contain" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a" }}>{item.name}</div>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>{item.brand} • Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 900, color: "#059669", fontSize: "0.9rem" }}>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div style={{ backgroundColor: "#f8fafc", borderRadius: "8px", padding: "0.85rem", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                <span style={{ color: "#64748b" }}>Subtotal:</span>
                <span>₹{selectedOrderDetail.subtotal?.toLocaleString("en-IN")}</span>
              </div>
              {selectedOrderDetail.discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#059669", marginBottom: "3px" }}>
                  <span>Pro Trade Discount:</span>
                  <span>-₹{selectedOrderDetail.discount?.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e2e8f0", paddingTop: "6px", marginTop: "6px", fontSize: "1rem", fontWeight: 900 }}>
                <span>Grand Total:</span>
                <span style={{ color: "#059669" }}>₹{selectedOrderDetail.total?.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Tracking update */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <Truck size={18} color="#64748b" />
              <input
                type="text"
                placeholder="Shipping Tracking / AWB Number (e.g. BLUEDART-882910)"
                defaultValue={selectedOrderDetail.trackingNumber || ""}
                onBlur={(e) => handleUpdateOrderStatus(selectedOrderDetail.id, selectedOrderDetail.status, e.target.value)}
                style={{ flex: 1, padding: "0.55rem 0.85rem", border: "1.5px solid #cbd5e1", borderRadius: "6px", fontSize: "0.85rem" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                onClick={() => setSelectedOrderDetail(null)}
                style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#fff", fontWeight: 700, cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT PRODUCT */}
      {/* ========================================================================= */}
      {isProductModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "650px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "2rem", position: "relative", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            <button
              onClick={() => setIsProductModalOpen(false)}
              style={{ position: "absolute", right: "1.5rem", top: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
            >
              <X size={22} />
            </button>

            <h3 style={{ fontSize: "1.3rem", fontWeight: 900, margin: "0 0 1.25rem 0", textTransform: "uppercase" }}>
              {editingProductId ? "Edit Wholesale SKU" : "Add New Wholesale SKU"}
            </h3>

            <form onSubmit={handleSaveProduct} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#334155" }}>Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Olaplex No. 3 Hair Perfector 100ml"
                  value={productFormData.name || ""}
                  onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #cbd5e1", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#334155" }}>Brand</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Olaplex, L'Oréal, Redken"
                    value={productFormData.brand || ""}
                    onChange={(e) => setProductFormData({ ...productFormData, brand: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #cbd5e1", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#334155" }}>Category</label>
                  <select
                    value={productFormData.category || "Hair"}
                    onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #cbd5e1", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box", backgroundColor: "#fff" }}
                  >
                    {["Hair", "Beauty", "Tools", "Nails", "Skin", "Styling"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#334155" }}>Wholesale Sale Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productFormData.salePrice || ""}
                    onChange={(e) => setProductFormData({ ...productFormData, salePrice: Number(e.target.value) })}
                    style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #cbd5e1", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#334155" }}>Retail MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={productFormData.mrp || ""}
                    onChange={(e) => setProductFormData({ ...productFormData, mrp: Number(e.target.value) })}
                    style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #cbd5e1", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#334155" }}>Stock Availability</label>
                  <select
                    value={productFormData.availability || "In Stock"}
                    onChange={(e) => setProductFormData({ ...productFormData, availability: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #cbd5e1", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box", backgroundColor: "#fff" }}
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#334155" }}>Product Image URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={productFormData.image || ""}
                  onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #cbd5e1", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#334155" }}>Description</label>
                <textarea
                  rows={3}
                  placeholder="Professional salon grade formula details..."
                  value={productFormData.description || ""}
                  onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem", border: "1.5px solid #cbd5e1", borderRadius: "8px", marginTop: "4px", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  style={{ padding: "0.65rem 1.25rem", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#fff", fontWeight: 700, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "0.65rem 1.5rem", borderRadius: "8px", backgroundColor: "#0f172a", color: "#fff", border: "none", fontWeight: 800, cursor: "pointer" }}
                >
                  {editingProductId ? "Update SKU" : "Create SKU"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
