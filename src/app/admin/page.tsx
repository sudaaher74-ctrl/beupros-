"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  Home,
  Users,
  Package,
  Truck,
  BarChart2,
  UserCheck,
  Boxes,
  Tag,
  Settings,
  Search,
  Bell,
  ChevronRight,
  ChevronLeft,
  Plus,
  X,
  Trash2,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Percent,
  TrendingUp,
  Clock,
  PanelLeftClose,
  PanelLeftOpen,
  Copy,
  Check,
} from "lucide-react";

// ============================================================================
// DATA TYPES
// ============================================================================
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
  sku?: string;
  salePrice: number;
  mrp: number;
  discount: string;
  discountPercent: number;
  stock?: number;
  image: string;
  availability: string;
  description: string;
}

interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  quantity: number;
  price: number;
  mrp: number;
  sku?: string;
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
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax?: number;
  total: number;
  status: "Pending" | "Confirmed" | "Packing" | "Dispatched" | "Delivered" | "Cancelled";
  paymentMethod: string;
  paymentStatus: "Pending" | "Paid" | "COD";
  trackingNumber?: string;
  courier?: string;
  dispatchDate?: string;
  estimatedDelivery?: string;
  notes?: string;
}

interface CouponItem {
  id: string;
  code: string;
  name: string;
  type: "percentage" | "flat" | "free_shipping";
  discountText: string;
  discountValue: number;
  minOrder: number;
  usageLimit: number;
  usedCount: number;
  validity: string;
  status: "active" | "scheduled" | "expired";
  category: string;
}

interface CategoryValuation {
  name: string;
  count: number;
  value: number;
}

export default function DedicatedAdminDashboard() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "verifications" | "catalog" | "orders" | "analytics" | "customers" | "inventory" | "coupons" | "settings"
  >("dashboard");

  // Collapsible / Hideable Sidebar State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Global Search
  const [globalSearch, setGlobalSearch] = useState("");

  // --------------------------------------------------------------------------
  // REAL DATA STATES (NO DEMO DATA)
  // --------------------------------------------------------------------------
  // Users
  const [users, setUsers] = useState<SalonUser[]>([]);
  const [userFilterStatus, setUserFilterStatus] = useState<string>("all");
  const [selectedUserDetail, setSelectedUserDetail] = useState<SalonUser | null>(null);

  // Products & Inventory
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategoryTab, setSelectedCategoryTab] = useState("All Categories");
  const [selectedBrandFilter, setSelectedBrandFilter] = useState("All Brands");
  const [selectedStockFilter, setSelectedStockFilter] = useState("all");
  const [productPage, setProductPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [categoriesList, setCategoriesList] = useState<CategoryValuation[]>([]);
  const [brandsList, setBrandsList] = useState<string[]>([]);
  const [inventoryStats, setInventoryStats] = useState({
    totalSKUs: 0,
    totalStockValue: 0,
    inStockCount: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    categoryValuations: [] as CategoryValuation[],
  });

  // Product Add / Edit Drawer
  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    brand: "",
    category: "",
    sku: "",
    wholesalePrice: 0,
    mrp: 0,
    stock: 25,
    availability: "In Stock",
    image: "",
    description: "",
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [orderStatusTab, setOrderStatusTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Customers Tab States
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerStatusFilter, setCustomerStatusFilter] = useState("all");
  const [customerCityFilter, setCustomerCityFilter] = useState("all");
  const [customerSort, setCustomerSort] = useState("newest");
  const [selectedCustomer, setSelectedCustomer] = useState<SalonUser | null>(null);
  const [customerDrawerTab, setCustomerDrawerTab] = useState<"overview" | "orders" | "documents">("overview");

  // Inventory Tab Specific States
  const [inventoryStockTab, setInventoryStockTab] = useState<"all" | "in_stock" | "low_stock" | "out_of_stock">("all");
  const [isAdjustStockModalOpen, setIsAdjustStockModalOpen] = useState(false);
  const [adjustingStockItem, setAdjustingStockItem] = useState<Product | null>(null);
  const [stockAdjustUnits, setStockAdjustUnits] = useState(0);

  // Coupons
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [couponsLoading, setCouponsLoading] = useState(true);
  const [isCreateCouponDrawerOpen, setIsCreateCouponDrawerOpen] = useState(false);
  const [copiedCouponCode, setCopiedCouponCode] = useState<string | null>(null);
  const [newCouponForm, setNewCouponForm] = useState({
    code: "",
    name: "",
    type: "percentage" as "percentage" | "flat" | "free_shipping",
    discountValue: 10,
    minOrder: 1000,
    usageLimit: 100,
    validFrom: "",
    validUntil: "",
    category: "All Categories",
    isActive: true,
  });

  // --------------------------------------------------------------------------
  // FETCH REAL DATA (100% LIVE, 0 DEMO DATA)
  // --------------------------------------------------------------------------
  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/users?status=${userFilterStatus !== "all" ? userFilterStatus : ""}`);
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch {
      setUsers([]);
    }
  }, [userFilterStatus]);

  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const categoryParam = selectedCategoryTab !== "All Categories" ? selectedCategoryTab : "";
      const brandParam = selectedBrandFilter !== "All Brands" ? selectedBrandFilter : "";
      const res = await fetch(
        `/api/admin/products?page=${productPage}&limit=12&search=${productSearch}&category=${categoryParam}&brand=${brandParam}&stockStatus=${selectedStockFilter}`
      );
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
        setTotalProducts(data.total || 0);
        setTotalPages(data.totalPages || 1);
        if (data.categories) setCategoriesList(data.categories);
        if (data.brands) setBrandsList(data.brands);
        if (data.inventoryStats) setInventoryStats(data.inventoryStats);
      }
    } catch {
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  }, [productPage, productSearch, selectedCategoryTab, selectedBrandFilter, selectedStockFilter]);

  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?status=${orderStatusTab !== "all" ? orderStatusTab : ""}`);
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
        if (data.orders.length > 0 && !selectedOrder) {
          setSelectedOrder(data.orders[0]);
        }
      }
    } catch {
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }, [orderStatusTab, selectedOrder]);

  const fetchCoupons = useCallback(async () => {
    setCouponsLoading(true);
    try {
      const res = await fetch(`/api/admin/coupons`);
      const data = await res.json();
      if (data.coupons) {
        setCoupons(data.coupons);
      }
    } catch {
      setCoupons([]);
    } finally {
      setCouponsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  // --------------------------------------------------------------------------
  // DYNAMIC COMPUTED METRICS
  // --------------------------------------------------------------------------
  const salonUsers = useMemo(() => users.filter((u) => u.role !== "admin"), [users]);

  const userMetrics = useMemo(() => {
    const total = salonUsers.length;
    const verified = salonUsers.filter((u) => u.status === "approved").length;
    const pending = salonUsers.filter((u) => u.status === "pending").length;
    const rejected = salonUsers.filter((u) => u.status === "rejected").length;
    return { total, verified, pending, rejected };
  }, [salonUsers]);

  const orderMetrics = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter((o) => o.status !== "Cancelled")
      .reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingCount = orders.filter((o) => o.status === "Pending").length;
    const confirmedCount = orders.filter((o) => o.status === "Confirmed").length;
    const packingCount = orders.filter((o) => o.status === "Packing").length;
    const dispatchedCount = orders.filter((o) => o.status === "Dispatched").length;
    const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
    const cancelledCount = orders.filter((o) => o.status === "Cancelled").length;

    return {
      totalOrders,
      totalRevenue,
      pendingCount,
      confirmedCount,
      packingCount,
      dispatchedCount,
      deliveredCount,
      cancelledCount,
    };
  }, [orders]);

  // Real Salon Customer Orders & Spend Mapping
  const salonsWithMetrics = useMemo(() => {
    return salonUsers.map((salon) => {
      const salonOrders = orders.filter(
        (o) =>
          (o.email && o.email.toLowerCase() === salon.email.toLowerCase()) ||
          (o.phone && o.phone === salon.phone) ||
          (o.salonName && o.salonName.toLowerCase() === salon.salonName.toLowerCase())
      );
      const spend = salonOrders.reduce((sum, o) => sum + (o.total || 0), 0);
      const avgValue = salonOrders.length > 0 ? Math.round(spend / salonOrders.length) : 0;
      return {
        ...salon,
        totalOrders: salonOrders.length,
        totalSpend: spend,
        avgOrderValue: avgValue,
        ordersList: salonOrders,
      };
    });
  }, [salonUsers, orders]);

  // Filtered Salons in Customer tab
  const filteredSalons = useMemo(() => {
    return salonsWithMetrics
      .filter((s) => {
        const matchesSearch =
          customerSearch === "" ||
          s.salonName.toLowerCase().includes(customerSearch.toLowerCase()) ||
          s.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
          s.city.toLowerCase().includes(customerSearch.toLowerCase()) ||
          s.phone.includes(customerSearch) ||
          (s.gstNumber && s.gstNumber.toLowerCase().includes(customerSearch.toLowerCase()));
        const matchesStatus = customerStatusFilter === "all" || s.status === customerStatusFilter;
        const matchesCity = customerCityFilter === "all" || s.city.toLowerCase() === customerCityFilter.toLowerCase();
        return matchesSearch && matchesStatus && matchesCity;
      })
      .sort((a, b) => {
        if (customerSort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (customerSort === "spend") return b.totalSpend - a.totalSpend;
        if (customerSort === "orders") return b.totalOrders - a.totalOrders;
        return a.salonName.localeCompare(b.salonName);
      });
  }, [salonsWithMetrics, customerSearch, customerStatusFilter, customerCityFilter, customerSort]);

  const selectedSalonMetrics = useMemo(() => {
    if (!selectedCustomer) return null;
    return salonsWithMetrics.find((s) => s.id === selectedCustomer.id) || null;
  }, [selectedCustomer, salonsWithMetrics]);

  const userCities = useMemo(() => {
    const set = new Set<string>();
    salonUsers.forEach((u) => {
      if (u.city) set.add(u.city);
    });
    return Array.from(set).sort();
  }, [salonUsers]);

  const realLowStockProducts = useMemo(() => {
    return products.filter((p) => (p.stock !== undefined && p.stock > 0 && p.stock <= 20) || p.availability === "Low Stock");
  }, [products]);

  // --------------------------------------------------------------------------
  // USER ACTIONS
  // --------------------------------------------------------------------------
  const handleApproveUser = async (id: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "approved" }),
      });
      if (res.ok) {
        fetchUsers();
      } else {
        alert("Failed to approve salon");
      }
    } catch {
      alert("Error approving salon");
    }
  };

  const handleRejectUser = async (id: string) => {
    const reason = prompt("Enter reason for rejection:");
    if (!reason) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "rejected", rejectionReason: reason }),
      });
      if (res.ok) {
        fetchUsers();
      } else {
        alert("Failed to reject salon");
      }
    } catch {
      alert("Error rejecting salon");
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      if (res.ok) {
        fetchOrders();
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch {
      alert("Error updating order status");
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = "/api/admin/products";
      const method = editingProductId ? "PUT" : "POST";
      const body = {
        id: editingProductId || undefined,
        name: productForm.name,
        brand: productForm.brand,
        category: productForm.category,
        salePrice: productForm.wholesalePrice,
        mrp: productForm.mrp,
        image: productForm.image,
        availability: productForm.availability,
        description: productForm.description,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setIsProductDrawerOpen(false);
        fetchProducts();
      } else {
        alert("Failed to save product");
      }
    } catch {
      alert("Error saving product");
    }
  };

  const handleApplyStockAdjustment = async () => {
    if (!adjustingStockItem) return;
    try {
      const newAvail = stockAdjustUnits === 0 ? "Out of Stock" : stockAdjustUnits <= 20 ? "Low Stock" : "In Stock";
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: adjustingStockItem.id,
          availability: newAvail,
        }),
      });

      if (res.ok) {
        setIsAdjustStockModalOpen(false);
        fetchProducts();
      }
    } catch {
      alert("Error updating product stock");
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCouponForm),
      });

      if (res.ok) {
        setIsCreateCouponDrawerOpen(false);
        fetchCoupons();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create coupon");
      }
    } catch {
      alert("Error creating coupon");
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    try {
      const res = await fetch(`/api/admin/coupons?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCoupons();
      }
    } catch {
      alert("Error deleting coupon");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: "#0f172a" }}>
      {/* ===================================================================== */}
      {/* SIDEBAR: COLLAPSIBLE & HIDEABLE WITH 1-CLICK */}
      {/* ===================================================================== */}
      <aside
        style={{
          width: isSidebarCollapsed ? "72px" : "250px",
          backgroundColor: "#0d111d",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          borderRight: "1px solid #1a2234",
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 60,
          transition: "width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: isSidebarCollapsed ? "1.5rem 0.5rem" : "1.75rem 1.5rem 1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: isSidebarCollapsed ? "center" : "space-between",
          }}
        >
          {isSidebarCollapsed ? (
            <div style={{ fontFamily: "serif, 'Playfair Display', Georgia", fontSize: "1.45rem", fontWeight: 900, color: "#e5b95f" }}>
              BP
            </div>
          ) : (
            <div>
              <div style={{ fontFamily: "serif, 'Playfair Display', Georgia", fontSize: "1.55rem", fontWeight: 900, color: "#e5b95f", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
                Beu<span style={{ color: "#ffffff" }}>PROS</span>
              </div>
              <div style={{ fontSize: "9px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.3em", textTransform: "uppercase", marginTop: "3px", whiteSpace: "nowrap" }}>
                B 2 B &nbsp; W H O L E S A L E
              </div>
            </div>
          )}

          {!isSidebarCollapsed && (
            <button
              onClick={() => setIsSidebarCollapsed(true)}
              title="Collapse sidebar"
              style={{
                background: "none",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <PanelLeftClose size={18} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: isSidebarCollapsed ? "0.75rem 0.4rem" : "0.75rem 0.85rem", display: "flex", flexDirection: "column", gap: "3px", flex: 1, overflowY: "auto" }}>
          {[
            { id: "dashboard", label: "Dashboard", icon: Home },
            { id: "verifications", label: "Salon Verifications", icon: Users, badge: userMetrics.pending },
            { id: "catalog", label: "Product Catalog", icon: Package, badge: totalProducts },
            { id: "orders", label: "Orders & Fulfillment", icon: Truck, badge: orderMetrics.pendingCount },
            { id: "analytics", label: "Analytics", icon: BarChart2 },
            { id: "customers", label: "Customers (Salons)", icon: UserCheck, badge: userMetrics.total },
            { id: "inventory", label: "Inventory", icon: Boxes, badge: inventoryStats.lowStockCount },
            { id: "coupons", label: "Coupons & Pricing", icon: Tag, badge: coupons.length },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                title={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isSidebarCollapsed ? "center" : "space-between",
                  padding: isSidebarCollapsed ? "0.75rem 0" : "0.7rem 0.95rem",
                  borderRadius: "8px",
                  fontSize: "0.86rem",
                  fontWeight: 700,
                  backgroundColor: isActive ? "#1e293b" : "transparent",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background-color 0.15s ease",
                  whiteSpace: "nowrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Icon size={18} color={isActive ? "#818cf8" : "#64748b"} style={{ flexShrink: 0 }} />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </div>
                {!isSidebarCollapsed && item.badge !== undefined && item.badge > 0 && (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "2px 7px",
                      borderRadius: "9999px",
                      backgroundColor: item.id === "verifications" ? "#ef4444" : item.id === "orders" ? "#f59e0b" : "#1e293b",
                      color: item.id === "verifications" || item.id === "orders" ? "#ffffff" : "#94a3b8",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Profile */}
        <div
          style={{
            padding: isSidebarCollapsed ? "1rem 0.5rem" : "1rem 1.25rem",
            borderTop: "1px solid #1a2234",
            display: "flex",
            alignItems: "center",
            justifyContent: isSidebarCollapsed ? "center" : "flex-start",
            gap: "10px",
          }}
        >
          <div
            title="Sudarshan Aher (Superadmin)"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#e5b95f",
              color: "#0d111d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "13px",
              flexShrink: 0,
            }}
          >
            SA
          </div>
          {!isSidebarCollapsed && (
            <div style={{ overflow: "hidden", minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#ffffff", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                Sudarshan Aher
              </div>
              <div style={{ fontSize: "11px", color: "#64748b", whiteSpace: "nowrap" }}>Wholesale Superadmin</div>
            </div>
          )}
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* MAIN VIEWPORT */}
      {/* ===================================================================== */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflowX: "hidden" }}>
        {/* Top Header Bar */}
        <header
          style={{
            height: "64px",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.75rem",
            position: "sticky",
            top: 0,
            zIndex: 40,
            gap: "1rem",
          }}
        >
          {/* Left: Hide / Expand Sidebar Toggle + Search */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, maxWidth: "560px", minWidth: 0 }}>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              title={isSidebarCollapsed ? "Expand Sidebar" : "Hide Sidebar"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "0.45rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: isSidebarCollapsed ? "#0f172a" : "#ffffff",
                color: isSidebarCollapsed ? "#ffffff" : "#334155",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 700,
                flexShrink: 0,
                transition: "all 0.15s ease",
              }}
            >
              {isSidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
              <span style={{ display: "inline-block" }}>{isSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}</span>
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "0.45rem 0.85rem",
                flex: 1,
                minWidth: 0,
              }}
            >
              <Search size={15} color="#94a3b8" style={{ flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search catalog, orders, salons, GST..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  fontSize: "0.82rem",
                  width: "100%",
                  outline: "none",
                  color: "#0f172a",
                  minWidth: 0,
                }}
              />
            </div>
          </div>

          {/* Right Header Status */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#16a34a", backgroundColor: "#f0fdf4", padding: "4px 10px", borderRadius: "9999px", fontWeight: 700, whiteSpace: "nowrap" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#16a34a" }} />
              Live DB
            </div>

            <button
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#64748b",
                position: "relative",
              }}
            >
              <Bell size={17} />
              {userMetrics.pending > 0 && (
                <span style={{ position: "absolute", top: "7px", right: "7px", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
              )}
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div style={{ padding: "1.75rem", flex: 1, minWidth: 0 }}>
          {/* ================================================================= */}
          {/* TAB: DASHBOARD */}
          {/* ================================================================= */}
          {activeTab === "dashboard" && (
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>
                  Wholesale Operations Dashboard
                </h1>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                  Real-time wholesale platform metrics and live store activity
                </p>
              </div>

              {/* Responsive KPI Grid: wraps cleanly on all screens */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Total Revenue</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <TrendingUp size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={`₹ ${orderMetrics.totalRevenue.toLocaleString("en-IN")}`}>
                    ₹ {orderMetrics.totalRevenue.toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                    From {orderMetrics.totalOrders} live orders
                  </div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Total Orders</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Truck size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0f172a" }}>
                    {orderMetrics.totalOrders}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                    {orderMetrics.pendingCount} pending fulfillment
                  </div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Verified Salons</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#fdf2f8", color: "#db2777", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0f172a" }}>
                    {userMetrics.verified}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                    Of {userMetrics.total} registered salons
                  </div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Pending Verifications</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#fffbeb", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Clock size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: userMetrics.pending > 0 ? "#d97706" : "#0f172a" }}>
                    {userMetrics.pending}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                    {userMetrics.pending > 0 ? "Awaiting document review" : "Verification queue clear"}
                  </div>
                </div>
              </div>

              {/* 2 Grids: Applications & Inventory Summary */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
                {/* Recent Applications */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Pending Salon Applications</h3>
                    <button onClick={() => setActiveTab("verifications")} style={{ border: "none", background: "none", color: "#2563eb", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
                      View Queue ({userMetrics.pending})
                    </button>
                  </div>
                  {salonUsers.filter((u) => u.status === "pending").length === 0 ? (
                    <div style={{ padding: "2rem 1rem", textAlign: "center", color: "#64748b", fontSize: "12px" }}>
                      No pending applications at this time.
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {salonUsers
                        .filter((u) => u.status === "pending")
                        .slice(0, 4)
                        .map((u) => (
                          <div key={u.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem", borderRadius: "8px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", gap: "10px" }}>
                            <div style={{ minWidth: 0, overflow: "hidden" }}>
                              <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "13px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.salonName}</div>
                              <div style={{ fontSize: "11px", color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.name} • {u.city}</div>
                            </div>
                            <button onClick={() => handleApproveUser(u.id)} style={{ padding: "4px 10px", borderRadius: "4px", border: "none", backgroundColor: "#0f172a", color: "#fff", fontSize: "11px", fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>
                              Approve
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Live Inventory Status */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Catalog Inventory Summary</h3>
                    <button onClick={() => setActiveTab("inventory")} style={{ border: "none", background: "none", color: "#2563eb", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
                      Manage Inventory
                    </button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "0.75rem", marginBottom: "1rem" }}>
                    <div style={{ backgroundColor: "#f8fafc", borderRadius: "8px", padding: "0.75rem", textAlign: "center", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>Catalog SKUs</div>
                      <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>{totalProducts}</div>
                    </div>
                    <div style={{ backgroundColor: "#f8fafc", borderRadius: "8px", padding: "0.75rem", textAlign: "center", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>Stock Value</div>
                      <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0f172a", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={`₹ ${inventoryStats.totalStockValue.toLocaleString("en-IN")}`}>
                        ₹ {inventoryStats.totalStockValue.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div style={{ backgroundColor: "#f8fafc", borderRadius: "8px", padding: "0.75rem", textAlign: "center", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>Low Stock</div>
                      <div style={{ fontSize: "1.25rem", fontWeight: 900, color: inventoryStats.lowStockCount > 0 ? "#d97706" : "#16a34a", marginTop: "2px" }}>
                        {inventoryStats.lowStockCount}
                      </div>
                    </div>
                  </div>
                  {realLowStockProducts.length > 0 && (
                    <div style={{ fontSize: "12px", color: "#b45309", backgroundColor: "#fffbeb", padding: "0.6rem 0.8rem", borderRadius: "6px", border: "1px solid #fef3c7" }}>
                      ⚠️ {realLowStockProducts.length} products currently at or below reorder threshold.
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Orders Table */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Recent Wholesale Orders</h3>
                  <button onClick={() => setActiveTab("orders")} style={{ border: "none", background: "none", color: "#2563eb", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
                    View All ({orders.length})
                  </button>
                </div>
                {orders.length === 0 ? (
                  <div style={{ padding: "3rem", textAlign: "center", color: "#64748b", fontSize: "13px" }}>
                    No orders placed yet.
                  </div>
                ) : (
                  <div style={{ width: "100%", overflowX: "auto" }}>
                    <table style={{ width: "100%", minWidth: "750px", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Order ID</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Salon Partner</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Items</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Total Value</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Status</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((ord) => (
                          <tr key={ord.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "0.75rem 1rem", fontWeight: 800, fontFamily: "monospace", color: "#0f172a", whiteSpace: "nowrap" }}>{ord.id}</td>
                            <td style={{ padding: "0.75rem 1rem", minWidth: "180px" }}>
                              <div style={{ fontWeight: 700, color: "#0f172a" }}>{ord.salonName}</div>
                              <div style={{ fontSize: "11px", color: "#64748b" }}>{ord.customerName}</div>
                            </td>
                            <td style={{ padding: "0.75rem 1rem", color: "#475569", whiteSpace: "nowrap" }}>{ord.items.length} items</td>
                            <td style={{ padding: "0.75rem 1rem", fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap" }}>₹ {ord.total.toLocaleString("en-IN")}</td>
                            <td style={{ padding: "0.75rem 1rem", whiteSpace: "nowrap" }}>
                              <span style={{ fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "9999px", backgroundColor: ord.status === "Delivered" ? "#dcfce7" : ord.status === "Dispatched" ? "#e0e7ff" : "#fef3c7", color: ord.status === "Delivered" ? "#16a34a" : ord.status === "Dispatched" ? "#4338ca" : "#b45309" }}>
                                {ord.status}
                              </span>
                            </td>
                            <td style={{ padding: "0.75rem 1rem", color: "#64748b", fontSize: "11px", whiteSpace: "nowrap" }}>{new Date(ord.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB: SALON VERIFICATIONS */}
          {/* ================================================================= */}
          {activeTab === "verifications" && (
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Salon Verifications Queue</h1>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                  Review trade licenses and GST registrations for wholesale pro authorization
                </p>
              </div>

              {/* Status Tabs */}
              <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid #e2e8f0", marginBottom: "1.25rem", overflowX: "auto" }}>
                {[
                  { id: "all", label: `All (${userMetrics.total})` },
                  { id: "pending", label: `Pending (${userMetrics.pending})` },
                  { id: "approved", label: `Verified Pro (${userMetrics.verified})` },
                  { id: "rejected", label: `Rejected (${userMetrics.rejected})` },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setUserFilterStatus(t.id)}
                    style={{
                      padding: "0.55rem 1rem",
                      border: "none",
                      backgroundColor: "transparent",
                      borderBottom: userFilterStatus === t.id ? "2px solid #0f172a" : "2px solid transparent",
                      color: userFilterStatus === t.id ? "#0f172a" : "#64748b",
                      fontSize: "0.85rem",
                      fontWeight: userFilterStatus === t.id ? 800 : 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Verifications Table with Horizontal Scroll Wrap */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                {salonUsers.length === 0 ? (
                  <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>
                    No salon accounts found.
                  </div>
                ) : (
                  <div style={{ width: "100%", overflowX: "auto" }}>
                    <table style={{ width: "100%", minWidth: "850px", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Salon Name</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Owner / Stylist</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>City & State</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>GST / Trade License</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Status</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, textAlign: "right", whiteSpace: "nowrap" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salonUsers.map((u) => (
                          <tr key={u.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "0.85rem 1rem", minWidth: "180px" }}>
                              <div style={{ fontWeight: 800, color: "#0f172a" }}>{u.salonName}</div>
                              <div style={{ fontSize: "11px", color: "#64748b" }}>{u.businessType}</div>
                            </td>
                            <td style={{ padding: "0.85rem 1rem", minWidth: "150px" }}>
                              <div style={{ fontWeight: 600, color: "#1e293b" }}>{u.name}</div>
                              <div style={{ fontSize: "11px", color: "#64748b" }}>{u.phone}</div>
                            </td>
                            <td style={{ padding: "0.85rem 1rem", color: "#334155", whiteSpace: "nowrap" }}>
                              {u.city}, {u.state}
                            </td>
                            <td style={{ padding: "0.85rem 1rem", fontFamily: "monospace", color: "#475569", whiteSpace: "nowrap" }}>
                              {u.gstNumber || u.licenseNumber || "Not Provided"}
                            </td>
                            <td style={{ padding: "0.85rem 1rem", whiteSpace: "nowrap" }}>
                              <span style={{ fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "9999px", backgroundColor: u.status === "approved" ? "#dcfce7" : u.status === "pending" ? "#fef3c7" : "#fee2e2", color: u.status === "approved" ? "#16a34a" : u.status === "pending" ? "#b45309" : "#dc2626" }}>
                                {u.status === "approved" ? "Verified Pro" : u.status === "pending" ? "Pending Review" : "Rejected"}
                              </span>
                            </td>
                            <td style={{ padding: "0.85rem 1rem", textAlign: "right", whiteSpace: "nowrap" }}>
                              <div style={{ display: "inline-flex", gap: "6px" }}>
                                <button onClick={() => setSelectedUserDetail(u)} style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>
                                  Inspect
                                </button>
                                {u.status !== "approved" && (
                                  <button onClick={() => handleApproveUser(u.id)} style={{ padding: "4px 8px", borderRadius: "4px", border: "none", backgroundColor: "#0f172a", color: "#fff", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>
                                    Approve
                                  </button>
                                )}
                                {u.status !== "rejected" && (
                                  <button onClick={() => handleRejectUser(u.id)} style={{ padding: "4px 8px", borderRadius: "4px", border: "none", backgroundColor: "#ef4444", color: "#fff", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>
                                    Reject
                                  </button>
                                )}
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
          )}

          {/* ================================================================= */}
          {/* TAB: PRODUCT CATALOG */}
          {/* ================================================================= */}
          {activeTab === "catalog" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Product Catalog</h1>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Manage all {totalProducts} active products in your live wholesale inventory database
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingProductId(null);
                    setProductForm({
                      name: "",
                      brand: "",
                      category: "",
                      sku: `BP-${Date.now().toString().slice(-4)}`,
                      wholesalePrice: 0,
                      mrp: 0,
                      stock: 25,
                      availability: "In Stock",
                      image: "",
                      description: "",
                    });
                    setIsProductDrawerOpen(true);
                  }}
                  style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0.6rem 1.15rem", borderRadius: "8px", border: "none", backgroundColor: "#0f172a", fontSize: "0.82rem", fontWeight: 700, color: "#ffffff", cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  <Plus size={15} />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Filters */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "0.85rem 1rem", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "0.45rem 0.8rem", flex: "1 1 260px", maxWidth: "380px" }}>
                  <Search size={15} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="Search product by name, brand, SKU..."
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value);
                      setProductPage(1);
                    }}
                    style={{ border: "none", backgroundColor: "transparent", fontSize: "0.82rem", width: "100%", outline: "none" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <select
                    value={selectedCategoryTab}
                    onChange={(e) => {
                      setSelectedCategoryTab(e.target.value);
                      setProductPage(1);
                    }}
                    style={{ padding: "0.45rem 0.85rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", fontSize: "0.8rem", fontWeight: 600, color: "#334155", cursor: "pointer" }}
                  >
                    <option value="All Categories">All Categories ({categoriesList.length})</option>
                    {categoriesList.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} ({c.count})
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedBrandFilter}
                    onChange={(e) => {
                      setSelectedBrandFilter(e.target.value);
                      setProductPage(1);
                    }}
                    style={{ padding: "0.45rem 0.85rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", fontSize: "0.8rem", fontWeight: 600, color: "#334155", cursor: "pointer" }}
                  >
                    <option value="All Brands">All Brands ({brandsList.length})</option>
                    {brandsList.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products Table with Horizontal Scroll */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                {productsLoading ? (
                  <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>Loading live catalog...</div>
                ) : products.length === 0 ? (
                  <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>No products found matching criteria.</div>
                ) : (
                  <div style={{ width: "100%", overflowX: "auto" }}>
                    <table style={{ width: "100%", minWidth: "900px", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Product</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Brand</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Category</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Wholesale Price</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>MRP</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Status</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, textAlign: "right", whiteSpace: "nowrap" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((p) => (
                          <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "0.75rem 1rem", minWidth: "220px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{ width: "36px", height: "36px", borderRadius: "6px", overflow: "hidden", backgroundColor: "#f1f5f9", position: "relative", flexShrink: 0 }}>
                                  <Image src={p.image || "/placeholder.png"} alt={p.name} fill style={{ objectFit: "cover" }} />
                                </div>
                                <div style={{ maxWidth: "260px" }}>
                                  <div style={{ fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {p.name}
                                  </div>
                                  <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace" }}>ID: {p.id}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#334155", whiteSpace: "nowrap" }}>{p.brand}</td>
                            <td style={{ padding: "0.75rem 1rem", color: "#475569", whiteSpace: "nowrap" }}>{p.category}</td>
                            <td style={{ padding: "0.75rem 1rem", fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap" }}>₹ {p.salePrice.toLocaleString("en-IN")}</td>
                            <td style={{ padding: "0.75rem 1rem", color: "#64748b", whiteSpace: "nowrap" }}>₹ {p.mrp.toLocaleString("en-IN")}</td>
                            <td style={{ padding: "0.75rem 1rem", whiteSpace: "nowrap" }}>
                              <span style={{ fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "9999px", backgroundColor: p.availability === "Out of Stock" ? "#fee2e2" : p.availability === "Low Stock" ? "#fef3c7" : "#dcfce7", color: p.availability === "Out of Stock" ? "#dc2626" : p.availability === "Low Stock" ? "#b45309" : "#16a34a" }}>
                                {p.availability || "In Stock"}
                              </span>
                            </td>
                            <td style={{ padding: "0.75rem 1rem", textAlign: "right", whiteSpace: "nowrap" }}>
                              <button
                                onClick={() => {
                                  setEditingProductId(p.id);
                                  setProductForm({
                                    name: p.name,
                                    brand: p.brand,
                                    category: p.category,
                                    sku: p.sku || `BP-${p.id}`,
                                    wholesalePrice: p.salePrice,
                                    mrp: p.mrp,
                                    stock: p.stock || 25,
                                    availability: p.availability || "In Stock",
                                    image: p.image,
                                    description: p.description || "",
                                  });
                                  setIsProductDrawerOpen(true);
                                }}
                                style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Pagination */}
                <div style={{ padding: "0.85rem 1rem", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    Showing page {productPage} of {totalPages} ({totalProducts} total products)
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      disabled={productPage <= 1}
                      onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                      style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", cursor: productPage <= 1 ? "not-allowed" : "pointer", opacity: productPage <= 1 ? 0.5 : 1 }}
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      disabled={productPage >= totalPages}
                      onClick={() => setProductPage((p) => Math.min(totalPages, p + 1))}
                      style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", cursor: productPage >= totalPages ? "not-allowed" : "pointer", opacity: productPage >= totalPages ? 0.5 : 1 }}
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB: ORDERS & FULFILLMENT */}
          {/* ================================================================= */}
          {activeTab === "orders" && (
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Orders & Fulfillment</h1>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                  Track live wholesale salon orders from checkout through delivery
                </p>
              </div>

              {/* Status Tabs */}
              <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid #e2e8f0", marginBottom: "1.25rem", overflowX: "auto" }}>
                {[
                  { id: "all", label: `All (${orderMetrics.totalOrders})` },
                  { id: "Pending", label: `Pending (${orderMetrics.pendingCount})` },
                  { id: "Packing", label: `Packing (${orderMetrics.packingCount})` },
                  { id: "Dispatched", label: `Dispatched (${orderMetrics.dispatchedCount})` },
                  { id: "Delivered", label: `Delivered (${orderMetrics.deliveredCount})` },
                  { id: "Cancelled", label: `Cancelled (${orderMetrics.cancelledCount})` },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setOrderStatusTab(t.id)}
                    style={{
                      padding: "0.55rem 1rem",
                      border: "none",
                      backgroundColor: "transparent",
                      borderBottom: orderStatusTab === t.id ? "2px solid #0f172a" : "2px solid transparent",
                      color: orderStatusTab === t.id ? "#0f172a" : "#64748b",
                      fontSize: "0.85rem",
                      fontWeight: orderStatusTab === t.id ? 800 : 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Orders Table with Horizontal Scroll */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                {ordersLoading ? (
                  <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>Loading real orders...</div>
                ) : orders.length === 0 ? (
                  <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>No orders found for this status.</div>
                ) : (
                  <div style={{ width: "100%", overflowX: "auto" }}>
                    <table style={{ width: "100%", minWidth: "900px", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Order ID</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Salon Partner</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Items Count</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Total Value</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Payment</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Fulfillment Status</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, textAlign: "right", whiteSpace: "nowrap" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((ord) => (
                          <tr key={ord.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "0.85rem 1rem", fontWeight: 800, fontFamily: "monospace", color: "#0f172a", whiteSpace: "nowrap" }}>{ord.id}</td>
                            <td style={{ padding: "0.85rem 1rem", minWidth: "180px" }}>
                              <div style={{ fontWeight: 800, color: "#0f172a" }}>{ord.salonName}</div>
                              <div style={{ fontSize: "11px", color: "#64748b" }}>{ord.customerName} • {ord.shippingAddress.city}</div>
                            </td>
                            <td style={{ padding: "0.85rem 1rem", color: "#475569", whiteSpace: "nowrap" }}>{ord.items.length} items</td>
                            <td style={{ padding: "0.85rem 1rem", fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap" }}>₹ {ord.total.toLocaleString("en-IN")}</td>
                            <td style={{ padding: "0.85rem 1rem", whiteSpace: "nowrap" }}>
                              <span style={{ fontSize: "11px", fontWeight: 700, color: ord.paymentStatus === "Paid" ? "#16a34a" : "#b45309" }}>
                                {ord.paymentMethod} ({ord.paymentStatus})
                              </span>
                            </td>
                            <td style={{ padding: "0.85rem 1rem", whiteSpace: "nowrap" }}>
                              <select
                                value={ord.status}
                                onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                                style={{ padding: "3px 8px", borderRadius: "6px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", fontSize: "11px", fontWeight: 800, cursor: "pointer" }}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Packing">Packing</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td style={{ padding: "0.85rem 1rem", textAlign: "right", whiteSpace: "nowrap" }}>
                              <button
                                onClick={() => setSelectedOrder(ord)}
                                style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB: ANALYTICS */}
          {/* ================================================================= */}
          {activeTab === "analytics" && (
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Wholesale Analytics</h1>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                  Revenue trends and top buyer salons calculated directly from actual orders
                </p>
              </div>

              {/* 3 Analytics KPI cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem", minWidth: 0 }}>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Delivered Orders GMV</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a", marginTop: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    ₹ {orderMetrics.totalRevenue.toLocaleString("en-IN")}
                  </div>
                </div>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem", minWidth: 0 }}>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Avg Order Value</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a", marginTop: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    ₹ {orderMetrics.totalOrders > 0 ? Math.round(orderMetrics.totalRevenue / orderMetrics.totalOrders).toLocaleString("en-IN") : 0}
                  </div>
                </div>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem", minWidth: 0 }}>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Active Buying Salons</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a", marginTop: "4px" }}>
                    {salonsWithMetrics.filter((s) => s.totalOrders > 0).length}
                  </div>
                </div>
              </div>

              {/* Top Salons Table */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 1rem 0" }}>Top Salon Buyers</h3>
                {salonsWithMetrics.filter((s) => s.totalOrders > 0).length === 0 ? (
                  <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>No buyer history available yet.</div>
                ) : (
                  <div style={{ width: "100%", overflowX: "auto" }}>
                    <table style={{ width: "100%", minWidth: "750px", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Salon Partner</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Owner</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>City</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Orders Count</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Total Spend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salonsWithMetrics
                          .filter((s) => s.totalOrders > 0)
                          .sort((a, b) => b.totalSpend - a.totalSpend)
                          .map((s) => (
                            <tr key={s.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "0.75rem 1rem", fontWeight: 800, color: "#0f172a", minWidth: "180px" }}>{s.salonName}</td>
                              <td style={{ padding: "0.75rem 1rem", color: "#475569", whiteSpace: "nowrap" }}>{s.name}</td>
                              <td style={{ padding: "0.75rem 1rem", color: "#64748b", whiteSpace: "nowrap" }}>{s.city}</td>
                              <td style={{ padding: "0.75rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>{s.totalOrders}</td>
                              <td style={{ padding: "0.75rem 1rem", fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap" }}>₹ {s.totalSpend.toLocaleString("en-IN")}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB: CUSTOMERS (SALONS) */}
          {/* ================================================================= */}
          {activeTab === "customers" && (
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Customers (Salons)</h1>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                  Manage registered salon partners, verification status & wholesale accounts
                </p>
              </div>

              {/* 4 KPI Cards (Responsive Grid) */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Total Customers</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Users size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0f172a" }}>{userMetrics.total}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Registered salon accounts</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Verified Pro Salons</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0f172a" }}>{userMetrics.verified}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>With approved trade license</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Pending Verification</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#fffbeb", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Clock size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: userMetrics.pending > 0 ? "#d97706" : "#0f172a" }}>
                    {userMetrics.pending}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Awaiting document review</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Rejected Applications</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#fef2f2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <XCircle size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0f172a" }}>{userMetrics.rejected}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Incomplete documents</div>
                </div>
              </div>

              {/* Filters */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "0.85rem 1rem", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "0.45rem 0.8rem", flex: "1 1 260px", maxWidth: "380px" }}>
                  <Search size={15} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="Search salons by name, owner, city, phone..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    style={{ border: "none", backgroundColor: "transparent", fontSize: "0.82rem", width: "100%", outline: "none" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <select
                    value={customerStatusFilter}
                    onChange={(e) => setCustomerStatusFilter(e.target.value)}
                    style={{ padding: "0.5rem 0.85rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", fontSize: "0.8rem", fontWeight: 600, color: "#334155", cursor: "pointer" }}
                  >
                    <option value="all">All Status ({userMetrics.total})</option>
                    <option value="approved">Verified Pro ({userMetrics.verified})</option>
                    <option value="pending">Pending ({userMetrics.pending})</option>
                    <option value="rejected">Rejected ({userMetrics.rejected})</option>
                  </select>

                  <select
                    value={customerCityFilter}
                    onChange={(e) => setCustomerCityFilter(e.target.value)}
                    style={{ padding: "0.5rem 0.85rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", fontSize: "0.8rem", fontWeight: 600, color: "#334155", cursor: "pointer" }}
                  >
                    <option value="all">All Cities</option>
                    {userCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>

                  <select
                    value={customerSort}
                    onChange={(e) => setCustomerSort(e.target.value)}
                    style={{ padding: "0.5rem 0.85rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", fontSize: "0.8rem", fontWeight: 600, color: "#334155", cursor: "pointer" }}
                  >
                    <option value="newest">Sort: Newest First</option>
                    <option value="spend">Sort: Highest Spend</option>
                    <option value="orders">Sort: Most Orders</option>
                    <option value="name">Sort: Alphabetical</option>
                  </select>
                </div>
              </div>

              {/* Salons List Table with Horizontal Scroll Wrap */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                {filteredSalons.length === 0 ? (
                  <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>No salons found matching your criteria.</div>
                ) : (
                  <div style={{ width: "100%", overflowX: "auto" }}>
                    <table style={{ width: "100%", minWidth: "950px", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Salon Name</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Owner / Stylist</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>City</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Business Type</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Status</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Orders Placed</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Total Spend</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, textAlign: "right", whiteSpace: "nowrap" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSalons.map((salon) => (
                          <tr key={salon.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "0.85rem 1rem", minWidth: "180px" }}>
                              <div style={{ fontWeight: 800, color: "#0f172a" }}>{salon.salonName}</div>
                              <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace" }}>ID: {salon.id}</div>
                            </td>
                            <td style={{ padding: "0.85rem 1rem", minWidth: "150px" }}>
                              <div style={{ fontWeight: 600, color: "#1e293b" }}>{salon.name}</div>
                              <div style={{ fontSize: "11px", color: "#64748b" }}>{salon.phone}</div>
                            </td>
                            <td style={{ padding: "0.85rem 1rem", color: "#334155", fontWeight: 600, whiteSpace: "nowrap" }}>
                              {salon.city}, {salon.state}
                            </td>
                            <td style={{ padding: "0.85rem 1rem", color: "#475569", whiteSpace: "nowrap" }}>{salon.businessType}</td>
                            <td style={{ padding: "0.85rem 1rem", whiteSpace: "nowrap" }}>
                              <span style={{ fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "9999px", backgroundColor: salon.status === "approved" ? "#dcfce7" : salon.status === "pending" ? "#fef3c7" : "#fee2e2", color: salon.status === "approved" ? "#16a34a" : salon.status === "pending" ? "#b45309" : "#dc2626" }}>
                                {salon.status === "approved" ? "Verified Pro" : salon.status === "pending" ? "Pending" : "Rejected"}
                              </span>
                            </td>
                            <td style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap" }}>
                              {salon.totalOrders > 0 ? `${salon.totalOrders} orders` : "—"}
                            </td>
                            <td style={{ padding: "0.85rem 1rem", fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap" }}>
                              {salon.totalSpend > 0 ? `₹ ${salon.totalSpend.toLocaleString("en-IN")}` : "₹ 0"}
                            </td>
                            <td style={{ padding: "0.85rem 1rem", textAlign: "right", whiteSpace: "nowrap" }}>
                              <button
                                onClick={() => setSelectedCustomer(salon)}
                                style={{ padding: "0.4rem 0.85rem", borderRadius: "6px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", color: "#0f172a", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                              >
                                Inspect
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB: INVENTORY */}
          {/* ================================================================= */}
          {activeTab === "inventory" && (
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Inventory Management</h1>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                  Track stock levels, reorder thresholds & warehouse valuation across all categories
                </p>
              </div>

              {/* 4 KPI Cards (Responsive Grid) */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Total Stock Value</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <TrendingUp size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={`₹ ${inventoryStats.totalStockValue.toLocaleString("en-IN")}`}>
                    ₹ {inventoryStats.totalStockValue.toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Sum of physical stock × wholesale price</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Total SKUs</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Boxes size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0f172a" }}>{totalProducts}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Across {categoriesList.length} categories</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Low Stock Items</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#fffbeb", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <AlertTriangle size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: inventoryStats.lowStockCount > 0 ? "#d97706" : "#0f172a" }}>
                    {inventoryStats.lowStockCount}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Below 20 units threshold</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Out of Stock</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#fef2f2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <XCircle size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: inventoryStats.outOfStockCount > 0 ? "#dc2626" : "#0f172a" }}>
                    {inventoryStats.outOfStockCount}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>0 units available</div>
                </div>
              </div>

              {/* Status Tabs */}
              <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid #e2e8f0", marginBottom: "1.25rem", overflowX: "auto" }}>
                {[
                  { id: "all", label: `All Products (${totalProducts})` },
                  { id: "in_stock", label: `In Stock (${inventoryStats.inStockCount})` },
                  { id: "low_stock", label: `Low Stock (${inventoryStats.lowStockCount})` },
                  { id: "out_of_stock", label: `Out of Stock (${inventoryStats.outOfStockCount})` },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setInventoryStockTab(t.id as any);
                      setSelectedStockFilter(t.id);
                      setProductPage(1);
                    }}
                    style={{
                      padding: "0.55rem 1rem",
                      border: "none",
                      backgroundColor: "transparent",
                      borderBottom: inventoryStockTab === t.id ? "2px solid #0f172a" : "2px solid transparent",
                      color: inventoryStockTab === t.id ? "#0f172a" : "#64748b",
                      fontSize: "0.85rem",
                      fontWeight: inventoryStockTab === t.id ? 800 : 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Responsive Layout: Left Table + Right Valuation Widget */}
              <div style={{ display: "flex", flexDirection: "row", gap: "1.25rem", flexWrap: "wrap", alignItems: "flex-start" }}>
                {/* Main Table Container */}
                <div style={{ flex: "1 1 600px", minWidth: 0, backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  <div style={{ width: "100%", overflowX: "auto" }}>
                    <table style={{ width: "100%", minWidth: "750px", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
                          <th style={{ padding: "0.85rem 0.75rem", fontWeight: 700, whiteSpace: "nowrap" }}>Product & SKU</th>
                          <th style={{ padding: "0.85rem 0.75rem", fontWeight: 700, whiteSpace: "nowrap" }}>Category</th>
                          <th style={{ padding: "0.85rem 0.75rem", fontWeight: 700, whiteSpace: "nowrap" }}>Available Units</th>
                          <th style={{ padding: "0.85rem 0.75rem", fontWeight: 700, whiteSpace: "nowrap" }}>Stock Value</th>
                          <th style={{ padding: "0.85rem 0.75rem", fontWeight: 700, whiteSpace: "nowrap" }}>Status</th>
                          <th style={{ padding: "0.85rem 0.75rem", fontWeight: 700, textAlign: "right", whiteSpace: "nowrap" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((item) => {
                          const stockUnits = item.stock !== undefined ? item.stock : 25;
                          const stockVal = stockUnits * item.salePrice;
                          return (
                            <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "0.75rem", minWidth: "200px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                  <div style={{ width: "36px", height: "36px", borderRadius: "6px", overflow: "hidden", backgroundColor: "#f1f5f9", flexShrink: 0, position: "relative" }}>
                                    <Image src={item.image || "/placeholder.png"} alt={item.name} fill style={{ objectFit: "cover" }} />
                                  </div>
                                  <div style={{ maxWidth: "230px" }}>
                                    <div style={{ fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                      {item.name}
                                    </div>
                                    <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace" }}>SKU: {item.sku || `BP-${item.id}`}</div>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: "0.75rem", color: "#475569", whiteSpace: "nowrap" }}>{item.category}</td>
                              <td style={{ padding: "0.75rem", whiteSpace: "nowrap" }}>
                                <span style={{ fontWeight: 800, color: stockUnits === 0 ? "#dc2626" : stockUnits <= 20 ? "#d97706" : "#16a34a" }}>
                                  {stockUnits} units
                                </span>
                              </td>
                              <td style={{ padding: "0.75rem", fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap" }}>
                                ₹ {stockVal.toLocaleString("en-IN")}
                              </td>
                              <td style={{ padding: "0.75rem", whiteSpace: "nowrap" }}>
                                <span style={{ backgroundColor: item.availability === "Out of Stock" ? "#fee2e2" : item.availability === "Low Stock" ? "#fef3c7" : "#dcfce7", color: item.availability === "Out of Stock" ? "#dc2626" : item.availability === "Low Stock" ? "#b45309" : "#16a34a", padding: "3px 8px", borderRadius: "9999px", fontSize: "11px", fontWeight: 800 }}>
                                  {item.availability || "In Stock"}
                                </span>
                              </td>
                              <td style={{ padding: "0.75rem", textAlign: "right", whiteSpace: "nowrap" }}>
                                <button
                                  onClick={() => {
                                    setAdjustingStockItem(item);
                                    setStockAdjustUnits(stockUnits);
                                    setIsAdjustStockModalOpen(true);
                                  }}
                                  style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", color: "#0f172a", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}
                                >
                                  Update
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div style={{ padding: "0.85rem 1rem", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>
                      Showing page {productPage} of {totalPages}
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        disabled={productPage <= 1}
                        onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                        style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", cursor: productPage <= 1 ? "not-allowed" : "pointer", opacity: productPage <= 1 ? 0.5 : 1 }}
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        disabled={productPage >= totalPages}
                        onClick={() => setProductPage((p) => Math.min(totalPages, p + 1))}
                        style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", cursor: productPage >= totalPages ? "not-allowed" : "pointer", opacity: productPage >= totalPages ? 0.5 : 1 }}
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Category Stock Valuation */}
                <div style={{ flex: "0 0 320px", maxWidth: "340px", width: "100%", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 1rem 0" }}>Category Stock Valuation</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {categoriesList.slice(0, 7).map((c) => (
                        <div key={c.name}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "3px" }}>
                            <span style={{ fontWeight: 600, color: "#475569", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "160px" }}>{c.name}</span>
                            <span style={{ fontWeight: 800, color: "#0f172a" }}>₹ {c.value.toLocaleString("en-IN")}</span>
                          </div>
                          <div style={{ height: "6px", backgroundColor: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                            <div
                              style={{
                                width: `${Math.min(100, (c.value / (inventoryStats.totalStockValue || 1)) * 100)}%`,
                                height: "100%",
                                backgroundColor: "#0f172a",
                                borderRadius: "9999px",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Low Stock Alerts */}
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.85rem 0" }}>
                      Low Stock Alerts ({inventoryStats.lowStockCount})
                    </h3>
                    {realLowStockProducts.length === 0 ? (
                      <div style={{ fontSize: "12px", color: "#64748b" }}>All products sufficiently stocked.</div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {realLowStockProducts.slice(0, 3).map((item) => (
                          <div key={item.id} style={{ padding: "0.6rem", borderRadius: "8px", backgroundColor: "#fffbeb", border: "1px solid #fef3c7" }}>
                            <div style={{ fontSize: "11px", fontWeight: 800, color: "#92400e" }}>{item.name}</div>
                            <div style={{ fontSize: "10px", color: "#b45309" }}>{item.stock || 0} units left in catalog</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB: COUPONS & PRICING */}
          {/* ================================================================= */}
          {activeTab === "coupons" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Coupons & Pricing Rules</h1>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Manage wholesale discount codes and promotional campaigns
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateCouponDrawerOpen(true)}
                  style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0.6rem 1.15rem", borderRadius: "8px", border: "none", backgroundColor: "#0f172a", fontSize: "0.82rem", fontWeight: 700, color: "#ffffff", cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  <Plus size={15} />
                  <span>Create New Coupon</span>
                </button>
              </div>

              {/* 4 KPI Cards (Responsive Grid) */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Total Coupons</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Tag size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0f172a" }}>{coupons.length}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Configured promo codes</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Active Coupons</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0f172a" }}>
                    {coupons.filter((c) => c.status === "active").length}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Currently live at checkout</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Expired Coupons</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#f8fafc", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Clock size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0f172a" }}>
                    {coupons.filter((c) => c.status === "expired").length}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Past promotional campaigns</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Avg Discount Value</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#faf5ff", color: "#9333ea", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Percent size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0f172a" }}>
                    {coupons.length > 0 ? `${Math.round(coupons.reduce((sum, c) => sum + (c.discountValue || 0), 0) / coupons.length)}%` : "0%"}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Across wholesale codes</div>
                </div>
              </div>

              {/* Coupons Table with Horizontal Scroll Wrap */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                {couponsLoading ? (
                  <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>Loading coupons...</div>
                ) : coupons.length === 0 ? (
                  <div style={{ padding: "3.5rem 2rem", textAlign: "center" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto", color: "#64748b" }}>
                      <Tag size={24} />
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.5rem 0" }}>
                      No Promotional Coupons Configured
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", maxWidth: "420px", margin: "0 auto 1.25rem auto" }}>
                      Create wholesale discount codes for first-time buyers, bulk orders, or seasonal salon promotions.
                    </p>
                    <button
                      onClick={() => setIsCreateCouponDrawerOpen(true)}
                      style={{ padding: "0.55rem 1.15rem", borderRadius: "8px", border: "none", backgroundColor: "#0f172a", color: "#fff", fontWeight: 800, fontSize: "12px", cursor: "pointer" }}
                    >
                      + Create First Coupon
                    </button>
                  </div>
                ) : (
                  <div style={{ width: "100%", overflowX: "auto" }}>
                    <table style={{ width: "100%", minWidth: "850px", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Coupon Code</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Campaign Name</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Discount</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Min. Order</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Usage</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>Status</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, textAlign: "right", whiteSpace: "nowrap" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coupons.map((coupon) => (
                          <tr key={coupon.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "0.85rem 1rem", whiteSpace: "nowrap" }}>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                <span style={{ fontFamily: "monospace", fontWeight: 800, backgroundColor: "#f1f5f9", padding: "4px 8px", borderRadius: "6px" }}>
                                  {coupon.code}
                                </span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard?.writeText(coupon.code);
                                    setCopiedCouponCode(coupon.code);
                                    setTimeout(() => setCopiedCouponCode(null), 2000);
                                  }}
                                  title="Copy code"
                                  style={{ border: "none", background: "none", cursor: "pointer", color: copiedCouponCode === coupon.code ? "#16a34a" : "#94a3b8" }}
                                >
                                  {copiedCouponCode === coupon.code ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                              </div>
                            </td>
                            <td style={{ padding: "0.85rem 1rem", minWidth: "180px" }}>
                              <div style={{ fontWeight: 700, color: "#0f172a" }}>{coupon.name}</div>
                              <div style={{ fontSize: "11px", color: "#64748b" }}>{coupon.category}</div>
                            </td>
                            <td style={{ padding: "0.85rem 1rem", fontWeight: 800, color: "#2563eb", whiteSpace: "nowrap" }}>{coupon.discountText}</td>
                            <td style={{ padding: "0.85rem 1rem", fontWeight: 700, whiteSpace: "nowrap" }}>₹ {coupon.minOrder.toLocaleString("en-IN")}</td>
                            <td style={{ padding: "0.85rem 1rem", color: "#64748b", whiteSpace: "nowrap" }}>{coupon.usedCount} / {coupon.usageLimit}</td>
                            <td style={{ padding: "0.85rem 1rem", whiteSpace: "nowrap" }}>
                              <span style={{ fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "9999px", backgroundColor: coupon.status === "active" ? "#dcfce7" : "#f1f5f9", color: coupon.status === "active" ? "#16a34a" : "#64748b" }}>
                                {coupon.status}
                              </span>
                            </td>
                            <td style={{ padding: "0.85rem 1rem", textAlign: "right", whiteSpace: "nowrap" }}>
                              <button
                                onClick={() => handleDeleteCoupon(coupon.id)}
                                style={{ padding: "4px 6px", borderRadius: "4px", border: "1px solid #fee2e2", backgroundColor: "#fff", color: "#dc2626", cursor: "pointer" }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB: SETTINGS */}
          {/* ================================================================= */}
          {activeTab === "settings" && (
            <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#0f172a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Settings size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>BeuPROS System Settings</h2>
                  <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "2px 0 0 0" }}>
                    Wholesale store configuration, taxes, notification webhooks & verified B2B policies
                  </p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
                <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.2rem", backgroundColor: "#f8fafc" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.5rem 0" }}>Store Identity</h3>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 1rem 0" }}>Store name, brand logos, support contact</p>
                  <button onClick={() => alert("Store settings updated")} style={{ padding: "0.45rem 0.9rem", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff", fontWeight: 700, fontSize: "11px", cursor: "pointer" }}>
                    Configure Store
                  </button>
                </div>

                <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.2rem", backgroundColor: "#f8fafc" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.5rem 0" }}>GST & Invoicing</h3>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 1rem 0" }}>Tax slabs (18% GST), HSN codes, invoice prefixes</p>
                  <button onClick={() => alert("Tax settings saved")} style={{ padding: "0.45rem 0.9rem", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff", fontWeight: 700, fontSize: "11px", cursor: "pointer" }}>
                    Manage Taxes
                  </button>
                </div>

                <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.2rem", backgroundColor: "#f8fafc" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.5rem 0" }}>Shipping & Delivery</h3>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 1rem 0" }}>Delhivery & Blue Dart API integration, tracking links</p>
                  <button onClick={() => alert("Shipping partners connected")} style={{ padding: "0.45rem 0.9rem", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff", fontWeight: 700, fontSize: "11px", cursor: "pointer" }}>
                    Courier Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODALS & SLIDE-OUT DRAWERS */}
      {/* ===================================================================== */}

      {/* Salon Details Inspector Modal */}
      {selectedUserDetail && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 120, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "550px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "2rem", position: "relative" }}>
            <button
              onClick={() => setSelectedUserDetail(null)}
              style={{ position: "absolute", right: "1.25rem", top: "1.25rem", background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
            >
              <X size={20} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#0f172a", color: "#e5b95f", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>
                {selectedUserDetail.salonName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 900, margin: 0, color: "#0f172a" }}>{selectedUserDetail.salonName}</h3>
                <div style={{ fontSize: "11px", color: "#64748b" }}>{selectedUserDetail.businessType}</div>
              </div>
            </div>

            <div style={{ backgroundColor: "#f8fafc", padding: "1rem", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", marginBottom: "1.25rem" }}>
              <div><span style={{ color: "#64748b" }}>Owner / Stylist:</span> <strong>{selectedUserDetail.name}</strong></div>
              <div><span style={{ color: "#64748b" }}>Contact Phone:</span> <strong>{selectedUserDetail.phone}</strong></div>
              <div><span style={{ color: "#64748b" }}>Email:</span> <strong>{selectedUserDetail.email}</strong></div>
              <div><span style={{ color: "#64748b" }}>GST Number:</span> <strong>{selectedUserDetail.gstNumber || "Not Provided"}</strong></div>
              <div><span style={{ color: "#64748b" }}>Trade License:</span> <strong>{selectedUserDetail.licenseNumber || "Not Provided"}</strong></div>
              <div>
                <span style={{ color: "#64748b" }}>Salon Address:</span>
                <div>{selectedUserDetail.address}, {selectedUserDetail.city}, {selectedUserDetail.state} - {selectedUserDetail.pincode}</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                onClick={() => setSelectedUserDetail(null)}
                style={{ padding: "0.55rem 1.1rem", borderRadius: "6px", border: "1px solid #e2e8f0", backgroundColor: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "12px" }}
              >
                Close
              </button>
              {selectedUserDetail.status !== "approved" && (
                <button
                  onClick={() => {
                    handleApproveUser(selectedUserDetail.id);
                    setSelectedUserDetail(null);
                  }}
                  style={{ padding: "0.55rem 1.25rem", borderRadius: "6px", border: "none", backgroundColor: "#0f172a", color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: "12px" }}
                >
                  Approve Verified Pro
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Customer (Salon) Inspector Right Drawer */}
      {selectedCustomer && selectedSalonMetrics && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: "100%", maxWidth: "520px", backgroundColor: "#ffffff", height: "100vh", display: "flex", flexDirection: "column", boxShadow: "-10px 0 25px rgba(0,0,0,0.15)" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{selectedCustomer.salonName}</h2>
                  <span style={{ fontSize: "10px", fontWeight: 800, color: selectedCustomer.status === "approved" ? "#16a34a" : selectedCustomer.status === "pending" ? "#b45309" : "#dc2626", backgroundColor: selectedCustomer.status === "approved" ? "#dcfce7" : selectedCustomer.status === "pending" ? "#fef3c7" : "#fee2e2", padding: "2px 6px", borderRadius: "4px" }}>
                    {selectedCustomer.status === "approved" ? "Verified Pro" : selectedCustomer.status === "pending" ? "Pending" : "Rejected"}
                  </span>
                </div>
                <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                  ID: {selectedCustomer.id} • Registered {new Date(selectedCustomer.createdAt).toLocaleDateString()}
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0", padding: "0 1.5rem", gap: "1.5rem", backgroundColor: "#f8fafc" }}>
              {[
                { id: "overview", label: "Overview" },
                { id: "orders", label: `Orders (${selectedSalonMetrics.totalOrders})` },
                { id: "documents", label: "Documents" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCustomerDrawerTab(tab.id as any)}
                  style={{
                    padding: "0.75rem 0",
                    border: "none",
                    backgroundColor: "transparent",
                    borderBottom: customerDrawerTab === tab.id ? "2px solid #0f172a" : "2px solid transparent",
                    color: customerDrawerTab === tab.id ? "#0f172a" : "#64748b",
                    fontSize: "0.82rem",
                    fontWeight: customerDrawerTab === tab.id ? 800 : 600,
                    cursor: "pointer",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
              {customerDrawerTab === "overview" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "1.1rem" }}>
                    <h3 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.85rem 0", textTransform: "uppercase" }}>
                      Basic Information
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.85rem", fontSize: "12px" }}>
                      <div><span style={{ color: "#64748b", display: "block" }}>Owner / Stylist</span><strong>{selectedCustomer.name}</strong></div>
                      <div><span style={{ color: "#64748b", display: "block" }}>Contact Phone</span><strong>{selectedCustomer.phone}</strong></div>
                      <div><span style={{ color: "#64748b", display: "block" }}>Email</span><strong>{selectedCustomer.email}</strong></div>
                      <div><span style={{ color: "#64748b", display: "block" }}>Business Type</span><strong>{selectedCustomer.businessType}</strong></div>
                      <div><span style={{ color: "#64748b", display: "block" }}>GST Number</span><strong>{selectedCustomer.gstNumber || "Not Provided"}</strong></div>
                      <div><span style={{ color: "#64748b", display: "block" }}>Trade License</span><strong>{selectedCustomer.licenseNumber || "Not Provided"}</strong></div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.85rem 0", textTransform: "uppercase" }}>
                      Live Business Activity
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.75rem" }}>
                      <div style={{ backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "0.85rem" }}>
                        <span style={{ fontSize: "11px", color: "#64748b" }}>Total Orders Placed</span>
                        <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>{selectedSalonMetrics.totalOrders}</div>
                      </div>
                      <div style={{ backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "0.85rem" }}>
                        <span style={{ fontSize: "11px", color: "#64748b" }}>Total Spend</span>
                        <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={`₹ ${selectedSalonMetrics.totalSpend.toLocaleString("en-IN")}`}>
                          ₹ {selectedSalonMetrics.totalSpend.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {customerDrawerTab === "orders" && (
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 1rem 0" }}>Orders by this Salon</h3>
                  {selectedSalonMetrics.ordersList.length === 0 ? (
                    <div style={{ padding: "2rem", textAlign: "center", color: "#64748b", fontSize: "12px" }}>
                      This salon has not placed any wholesale orders yet.
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {selectedSalonMetrics.ordersList.map((ord) => (
                        <div key={ord.id} style={{ padding: "0.85rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <strong style={{ fontFamily: "monospace", color: "#0f172a" }}>{ord.id}</strong>
                            <div style={{ fontSize: "11px", color: "#64748b" }}>{new Date(ord.createdAt).toLocaleDateString()} • {ord.items.length} items</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <strong style={{ color: "#0f172a" }}>₹ {ord.total.toLocaleString("en-IN")}</strong>
                            <div style={{ fontSize: "11px", color: "#16a34a", fontWeight: 700 }}>{ord.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {customerDrawerTab === "documents" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1rem", backgroundColor: "#f8fafc" }}>
                    <strong style={{ color: "#0f172a", fontSize: "12px" }}>Trade License Certificate</strong>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>{selectedCustomer.licenseNumber || "Document not uploaded"}</div>
                  </div>
                  <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1rem", backgroundColor: "#f8fafc" }}>
                    <strong style={{ color: "#0f172a", fontSize: "12px" }}>GST Registration</strong>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>{selectedCustomer.gstNumber || "Document not uploaded"}</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #e2e8f0", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button onClick={() => setSelectedCustomer(null)} style={{ padding: "0.55rem 1.1rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Adjust Stock Modal */}
      {isAdjustStockModalOpen && adjustingStockItem && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 120, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "460px", width: "100%", padding: "1.75rem", position: "relative" }}>
            <button onClick={() => setIsAdjustStockModalOpen(false)} style={{ position: "absolute", right: "1.25rem", top: "1.25rem", background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
              <X size={18} />
            </button>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px 0" }}>Update Physical Inventory</h3>
            <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 1.25rem 0" }}>{adjustingStockItem.name}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Available Units</label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button onClick={() => setStockAdjustUnits((u) => Math.max(0, u - 5))} style={{ padding: "0.5rem 0.85rem", borderRadius: "6px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", fontWeight: 800, cursor: "pointer" }}>
                    -5
                  </button>
                  <input
                    type="number"
                    value={stockAdjustUnits}
                    onChange={(e) => setStockAdjustUnits(parseInt(e.target.value) || 0)}
                    style={{ flex: 1, padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px", fontWeight: 800, textAlign: "center" }}
                  />
                  <button onClick={() => setStockAdjustUnits((u) => u + 5)} style={{ padding: "0.5rem 0.85rem", borderRadius: "6px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", fontWeight: 800, cursor: "pointer" }}>
                    +5
                  </button>
                </div>
              </div>

              <div style={{ backgroundColor: "#f8fafc", padding: "0.85rem", borderRadius: "8px", fontSize: "12px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Calculated Stock Value:</span>
                <strong style={{ color: "#0f172a" }}>₹ {(stockAdjustUnits * adjustingStockItem.salePrice).toLocaleString("en-IN")}</strong>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "1.5rem" }}>
              <button onClick={() => setIsAdjustStockModalOpen(false)} style={{ padding: "0.55rem 1.1rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#fff", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={handleApplyStockAdjustment} style={{ padding: "0.55rem 1.25rem", borderRadius: "8px", border: "none", backgroundColor: "#0f172a", color: "#fff", fontWeight: 800, fontSize: "12px", cursor: "pointer" }}>
                Save Stock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Add / Edit Drawer */}
      {isProductDrawerOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
          <form onSubmit={handleSaveProduct} style={{ width: "100%", maxWidth: "500px", backgroundColor: "#ffffff", height: "100vh", display: "flex", flexDirection: "column", boxShadow: "-10px 0 25px rgba(0,0,0,0.15)" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                  {editingProductId ? "Edit Product" : "Add Product to Catalog"}
                </h2>
                <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "2px 0 0 0" }}>Saves directly to your products database</p>
              </div>
              <button type="button" onClick={() => setIsProductDrawerOpen(false)} style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Product Name</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Brand</label>
                  <input
                    type="text"
                    required
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Category</label>
                  <input
                    type="text"
                    required
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Wholesale Sale Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.wholesalePrice}
                    onChange={(e) => setProductForm({ ...productForm, wholesalePrice: parseFloat(e.target.value) || 0 })}
                    style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Retail MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.mrp}
                    onChange={(e) => setProductForm({ ...productForm, mrp: parseFloat(e.target.value) || 0 })}
                    style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Image URL / Path</label>
                <input
                  type="text"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="/product-images/..."
                  style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Description</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  style={{ width: "100%", height: "80px", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                />
              </div>
            </div>

            <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #e2e8f0", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setIsProductDrawerOpen(false)} style={{ padding: "0.55rem 1.1rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
                Cancel
              </button>
              <button type="submit" style={{ padding: "0.55rem 1.25rem", borderRadius: "8px", border: "none", backgroundColor: "#0f172a", color: "#ffffff", fontWeight: 800, fontSize: "12px", cursor: "pointer" }}>
                Save to Catalog
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Create New Coupon Right Drawer */}
      {isCreateCouponDrawerOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
          <form onSubmit={handleCreateCoupon} style={{ width: "100%", maxWidth: "480px", backgroundColor: "#ffffff", height: "100vh", display: "flex", flexDirection: "column", boxShadow: "-10px 0 25px rgba(0,0,0,0.15)" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Create Wholesale Coupon</h2>
                <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "2px 0 0 0" }}>Configures a live promotional discount code</p>
              </div>
              <button type="button" onClick={() => setIsCreateCouponDrawerOpen(false)} style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Coupon Code</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    required
                    value={newCouponForm.code}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. WELCOME10"
                    style={{ flex: 1, padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", fontFamily: "monospace", fontWeight: 800 }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const randomCode = `PRO${Math.floor(100 + Math.random() * 900)}`;
                      setNewCouponForm({ ...newCouponForm, code: randomCode });
                    }}
                    style={{ padding: "0.55rem 0.85rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", fontSize: "11px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Campaign Name</label>
                <input
                  type="text"
                  required
                  value={newCouponForm.name}
                  onChange={(e) => setNewCouponForm({ ...newCouponForm, name: e.target.value })}
                  placeholder="e.g. Salon Pro First Order Discount"
                  style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Discount Type</label>
                  <select
                    value={newCouponForm.type}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, type: e.target.value as any })}
                    style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                    <option value="free_shipping">Free Shipping</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Discount Value</label>
                  <input
                    type="number"
                    value={newCouponForm.discountValue}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, discountValue: parseInt(e.target.value) || 0 })}
                    style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Min. Order Value (₹)</label>
                  <input
                    type="number"
                    value={newCouponForm.minOrder}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, minOrder: parseInt(e.target.value) || 0 })}
                    style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Total Usage Limit</label>
                  <input
                    type="number"
                    value={newCouponForm.usageLimit}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, usageLimit: parseInt(e.target.value) || 0 })}
                    style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #e2e8f0", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setIsCreateCouponDrawerOpen(false)} style={{ padding: "0.55rem 1.1rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
                Cancel
              </button>
              <button type="submit" style={{ padding: "0.55rem 1.25rem", borderRadius: "8px", border: "none", backgroundColor: "#0f172a", color: "#ffffff", fontWeight: 800, fontSize: "12px", cursor: "pointer" }}>
                Create Coupon
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
