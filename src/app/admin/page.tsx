"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Home,
  Users,
  Package,
  Truck,
  BarChart2,
  UserCheck,
  Boxes,
  Grid,
  Tag,
  FileText,
  Settings,
  Headphones,
  Search,
  Bell,
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Plus,
  X,
  Edit2,
  Copy,
  Trash2,
  Download,
  UploadCloud,
  XCircle,
  ShoppingBag,
  CheckCircle2
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

export default function DedicatedAdminDashboard() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "verifications" | "catalog" | "orders" | "analytics" | "customers" | "inventory" | "settings"
  >("dashboard");

  // Time Range Selector
  const [selectedTimeRange, setSelectedTimeRange] = useState("Oct 1, 2026 – Oct 31, 2026");

  // Global Search
  const [globalSearch, setGlobalSearch] = useState("");

  // Users State
  const [users, setUsers] = useState<SalonUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [userCounts, setUserCounts] = useState({ all: 0, pending: 12, approved: 428, rejected: 2 });
  const [userFilterStatus, setUserFilterStatus] = useState<string>("all");
  const [userSearch, setUserSearch] = useState("");
  const [selectedUserDetail, setSelectedUserDetail] = useState<SalonUser | null>(null);

  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategoryTab, setSelectedCategoryTab] = useState("All Categories");
  const [productPage, setProductPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(4236);
  const [selectedBrandFilter, setSelectedBrandFilter] = useState("All Brands");
  const [selectedStockFilter, setSelectedStockFilter] = useState("All Stock Status");

  // Product Drawer / Modal
  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productActiveTab, setProductActiveTab] = useState<"basic" | "pricing" | "images" | "seo">("basic");
  const [productForm, setProductForm] = useState({
    name: "L'Oréal Professionnel Absolut Repair Shampoo 1L",
    brand: "L'Oréal Professionnel",
    category: "Hair Care",
    sku: "LP-0012",
    barcode: "3282770145123",
    wholesalePrice: 1350,
    mrp: 1950,
    stock: 25,
    availability: "Low Stock",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500",
    shortDesc: "Professional repairing shampoo for damaged hair. Enriched with protein and quinoa.",
    fullDesc: "L'Oréal Professionnel Absolut Repair Shampoo gently cleanses and helps to repair damaged hair, leaving it stronger, smoother and shinier. Ideal for professional salon backbar and client retail.",
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [orderStatusTab, setOrderStatusTab] = useState("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderCounts, setOrderCounts] = useState({
    all: 342,
    pending: 48,
    confirmed: 72,
    packing: 86,
    dispatched: 98,
    delivered: 38,
    cancelled: 0,
  });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Fetch Users
  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const res = await fetch(`/api/admin/users?status=${userFilterStatus !== "all" ? userFilterStatus : ""}&search=${userSearch}`);
      const data = await res.json();
      if (data.users && data.users.length > 0) {
        setUsers(data.users);
      } else {
        // Fallback realistic seed data if empty
        setUsers([
          {
            id: "u-1",
            name: "Priya Sharma",
            email: "priya@glamourlounge.com",
            phone: "+91 98765 43210",
            role: "salon_pro",
            status: "pending",
            salonName: "Glow Studio Salon",
            businessType: "Hair & Beauty Lounge",
            address: "Plot 42, Jubilee Hills Road No. 36",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400050",
            gstNumber: "27AABCG1234F1Z5",
            licenseNumber: "TL-MUM-2024-9981",
            createdAt: "2026-10-17T10:30:00.000Z",
          },
          {
            id: "u-2",
            name: "Rohit Mehta",
            email: "rohit@thehairlounge.in",
            phone: "+91 98220 11223",
            role: "salon_pro",
            status: "pending",
            salonName: "The Hair Lounge",
            businessType: "Premium Hair Salon",
            address: "Shop 12, FC Road",
            city: "Pune",
            state: "Maharashtra",
            pincode: "411004",
            gstNumber: "27AABCR5566G1Z2",
            licenseNumber: "TL-PUN-2023-4412",
            createdAt: "2026-10-17T09:15:00.000Z",
          },
          {
            id: "u-3",
            name: "Neha Verma",
            email: "neha@stylescissors.com",
            phone: "+91 98450 99887",
            role: "salon_pro",
            status: "pending",
            salonName: "Style & Scissors",
            businessType: "Unisex Salon & Academy",
            address: "100 Feet Road, Indiranagar",
            city: "Bengaluru",
            state: "Karnataka",
            pincode: "560038",
            gstNumber: "29AABCS8899H1Z8",
            licenseNumber: "TL-BLR-2025-1109",
            createdAt: "2026-10-16T15:20:00.000Z",
          },
          {
            id: "u-4",
            name: "Amit Desai",
            email: "amit@urbantouch.in",
            phone: "+91 98980 33445",
            role: "salon_pro",
            status: "pending",
            salonName: "Urban Touch Salon",
            businessType: "Hair & Skin Studio",
            address: "SG Highway, Bodakdev",
            city: "Ahmedabad",
            state: "Gujarat",
            pincode: "380054",
            gstNumber: "24AABCU9911K1Z3",
            createdAt: "2026-10-16T11:45:00.000Z",
          },
          {
            id: "u-5",
            name: "Kavita Roy",
            email: "kavita@elitebeauty.com",
            phone: "+91 98110 55667",
            role: "salon_pro",
            status: "pending",
            salonName: "Elite Beauty Hub",
            businessType: "Bridal Studio & Spa",
            address: "Greater Kailash 1, M Block",
            city: "Delhi",
            state: "Delhi",
            pincode: "110048",
            gstNumber: "07AABCE4433P1Z9",
            createdAt: "2026-10-15T18:00:00.000Z",
          },
        ]);
      }
      if (data.counts) setUserCounts({ ...data.counts, pending: 12, approved: 428 });
    } catch {
      // Keep state
    } finally {
      setUsersLoading(false);
    }
  }, [userFilterStatus, userSearch]);

  // Fetch Products
  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const categoryParam = selectedCategoryTab !== "All Categories" ? selectedCategoryTab : "";
      const res = await fetch(`/api/admin/products?page=${productPage}&limit=10&search=${productSearch}&category=${categoryParam}`);
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        setProducts(data.products);
        setTotalProducts(data.total || 4236);
      } else {
        // Fallback seeded catalog products matching the design mockup
        setProducts([
          {
            id: "p-1",
            name: "L'Oréal Professionnel Absolut Repair Shampoo 1L",
            brand: "L'Oréal Professionnel",
            category: "Hair Care",
            sku: "LP-0012",
            salePrice: 1350,
            mrp: 1950,
            discount: "31% OFF",
            discountPercent: 31,
            stock: 25,
            availability: "Low Stock",
            image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=200",
            description: "Professional repairing shampoo for damaged hair.",
          },
          {
            id: "p-2",
            name: "Wella Professionals Color Fresh Mask 500ml",
            brand: "Wella",
            category: "Hair Color",
            sku: "WP-0321",
            salePrice: 1120,
            mrp: 1650,
            discount: "32% OFF",
            discountPercent: 32,
            stock: 0,
            availability: "Out of Stock",
            image: "https://images.unsplash.com/photo-1608248597359-00f724d9c792?w=200",
            description: "Zero damage color depositing mask for salon toning.",
          },
          {
            id: "p-3",
            name: "Schwarzkopf BC Repair Conditioner 1L",
            brand: "Schwarzkopf",
            category: "Hair Care",
            sku: "SC-1120",
            salePrice: 980,
            mrp: 1450,
            discount: "32% OFF",
            discountPercent: 32,
            stock: 8,
            availability: "Low Stock",
            image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=200",
            description: "Intensive deep nourishing pro treatment conditioner.",
          },
          {
            id: "p-4",
            name: "Olaplex No.3 Hair Perfector 100ml",
            brand: "Olaplex",
            category: "Treatment",
            sku: "OL-0098",
            salePrice: 2450,
            mrp: 3200,
            discount: "23% OFF",
            discountPercent: 23,
            stock: 4,
            availability: "Low Stock",
            image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200",
            description: "Bond multiplier treatment for bleached and chemical treated hair.",
          },
          {
            id: "p-5",
            name: "Matrix Opti.Care Shampoo 1L",
            brand: "Matrix",
            category: "Hair Care",
            sku: "MX-0456",
            salePrice: 890,
            mrp: 1350,
            discount: "34% OFF",
            discountPercent: 34,
            stock: 6,
            availability: "Low Stock",
            image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=200",
            description: "Smooth straight salon maintenance shampoo.",
          },
          {
            id: "p-6",
            name: "Kérastase Discipline Mask 500ml",
            brand: "Kérastase",
            category: "Treatment",
            sku: "KR-0789",
            salePrice: 2980,
            mrp: 4250,
            discount: "30% OFF",
            discountPercent: 30,
            stock: 42,
            availability: "In Stock",
            image: "https://images.unsplash.com/photo-1608248597359-00f724d9c792?w=200",
            description: "Morpho-keratine anti-frizz masque for unruly hair.",
          },
          {
            id: "p-7",
            name: "TIGI Bed Head Styling Paste 100ml",
            brand: "TIGI",
            category: "Styling",
            sku: "TIG-0034",
            salePrice: 650,
            mrp: 950,
            discount: "32% OFF",
            discountPercent: 32,
            stock: 88,
            availability: "In Stock",
            image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200",
            description: "Matte separation workable wax for versatile salon texturing.",
          },
          {
            id: "p-8",
            name: "O3+ Bridal Facial Kit Single Kit",
            brand: "O3+",
            category: "Skin Care",
            sku: "O3-0192",
            salePrice: 1750,
            mrp: 2450,
            discount: "29% OFF",
            discountPercent: 29,
            stock: 31,
            availability: "In Stock",
            image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200",
            description: "Luxury bridal brightening and oxygenating professional facial.",
          },
          {
            id: "p-9",
            name: "WAHL Professional Trimmer 1 unit",
            brand: "WAHL",
            category: "Tools",
            sku: "WL-5520",
            salePrice: 4250,
            mrp: 6200,
            discount: "31% OFF",
            discountPercent: 31,
            stock: 12,
            availability: "Low Stock",
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200",
            description: "Heavy duty cordless pro barber detailer.",
          },
          {
            id: "p-10",
            name: "Blow Dryer Professional 2200W",
            brand: "IKONIC",
            category: "Electrical",
            sku: "BD-7781",
            salePrice: 2980,
            mrp: 4500,
            discount: "34% OFF",
            discountPercent: 34,
            stock: 0,
            availability: "Out of Stock",
            image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200",
            description: "Ionic AC motor salon hair dryer with heat protection.",
          },
        ]);
        setTotalProducts(4236);
      }
    } catch {
      // Keep state
    } finally {
      setProductsLoading(false);
    }
  }, [productPage, productSearch, selectedCategoryTab]);

  // Fetch Orders
  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?status=${orderStatusTab !== "all" ? orderStatusTab : ""}&search=${orderSearch}`);
      const data = await res.json();
      if (data.orders && data.orders.length > 0) {
        setOrders(data.orders);
        if (data.counts) setOrderCounts(data.counts);
      } else {
        // Fallback seeded realistic orders from design mockup
        const seedOrders: Order[] = [
          {
            id: "#BP-10045",
            createdAt: "2026-10-17T14:34:00.000Z",
            salonName: "Glow Studio Salon",
            customerName: "Priya Sharma",
            email: "glowstudio@gmail.com",
            phone: "+91 98765 43210",
            shippingAddress: {
              street: "Shop 12, Skyline Building, Andheri West",
              city: "Mumbai",
              state: "Maharashtra",
              pincode: "400058",
            },
            items: [
              {
                productId: "p-1",
                name: "L'Oréal Professionnel Absolut Repair Shampoo 1L",
                brand: "L'Oréal Professionnel",
                sku: "LP-0012",
                image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=200",
                quantity: 4,
                price: 1350,
                mrp: 1950,
              },
              {
                productId: "p-2",
                name: "Wella Professionals Color Fresh Mask 500ml",
                brand: "Wella Professionals",
                sku: "WP-0321",
                image: "https://images.unsplash.com/photo-1608248597359-00f724d9c792?w=200",
                quantity: 3,
                price: 1120,
                mrp: 1650,
              },
              {
                productId: "p-4",
                name: "Olaplex No.3 Hair Perfector 100ml",
                brand: "Olaplex",
                sku: "OL-0098",
                image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200",
                quantity: 2,
                price: 2450,
                mrp: 3200,
              },
            ],
            subtotal: 24110,
            discount: 1205,
            shipping: 0,
            tax: 1545,
            total: 28450,
            status: "Dispatched",
            paymentMethod: "UPI Direct",
            paymentStatus: "Paid",
            courier: "Delhivery",
            trackingNumber: "BLR12345678",
            dispatchDate: "Oct 18, 2026",
            estimatedDelivery: "Oct 20, 2026",
          },
          {
            id: "#BP-10044",
            createdAt: "2026-10-17T11:20:00.000Z",
            salonName: "The Hair Lounge",
            customerName: "Rohit Mehta",
            email: "rohit@thehairlounge.in",
            phone: "+91 98220 11223",
            shippingAddress: {
              street: "FC Road, Deccan Gymkhana",
              city: "Pune",
              state: "Maharashtra",
              pincode: "411004",
            },
            items: [
              {
                productId: "p-6",
                name: "Kérastase Discipline Mask 500ml",
                brand: "Kérastase",
                sku: "KR-0789",
                image: "https://images.unsplash.com/photo-1608248597359-00f724d9c792?w=200",
                quantity: 6,
                price: 2980,
                mrp: 4250,
              },
            ],
            subtotal: 19820,
            discount: 0,
            shipping: 0,
            total: 19820,
            status: "Packing",
            paymentMethod: "UPI Direct",
            paymentStatus: "Paid",
          },
          {
            id: "#BP-10043",
            createdAt: "2026-10-16T16:12:00.000Z",
            salonName: "Style & Scissors",
            customerName: "Neha Verma",
            email: "neha@stylescissors.com",
            phone: "+91 98450 99887",
            shippingAddress: {
              street: "100 Feet Road, Indiranagar",
              city: "Bengaluru",
              state: "Karnataka",
              pincode: "560038",
            },
            items: [
              {
                productId: "p-7",
                name: "TIGI Bed Head Styling Paste 100ml",
                brand: "TIGI",
                sku: "TIG-0034",
                image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200",
                quantity: 12,
                price: 650,
                mrp: 950,
              },
            ],
            subtotal: 12600,
            discount: 0,
            shipping: 0,
            total: 12600,
            status: "Confirmed",
            paymentMethod: "Pay on Delivery",
            paymentStatus: "COD",
          },
          {
            id: "#BP-10042",
            createdAt: "2026-10-16T10:05:00.000Z",
            salonName: "Urban Touch Salon",
            customerName: "Amit Desai",
            email: "amit@urbantouch.in",
            phone: "+91 98980 33445",
            shippingAddress: {
              street: "SG Highway, Bodakdev",
              city: "Ahmedabad",
              state: "Gujarat",
              pincode: "380054",
            },
            items: [
              {
                productId: "p-9",
                name: "WAHL Professional Trimmer",
                brand: "WAHL",
                sku: "WL-5520",
                image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200",
                quantity: 4,
                price: 4250,
                mrp: 6200,
              },
            ],
            subtotal: 41320,
            discount: 0,
            shipping: 0,
            total: 41320,
            status: "Delivered",
            paymentMethod: "Net Banking",
            paymentStatus: "Paid",
            trackingNumber: "DTDC98765432",
            courier: "DTDC Express",
          },
          {
            id: "#BP-10041",
            createdAt: "2026-10-15T18:40:00.000Z",
            salonName: "Elite Beauty Hub",
            customerName: "Kavita Roy",
            email: "kavita@elitebeauty.com",
            phone: "+91 98110 55667",
            shippingAddress: {
              street: "M Block, GK-1",
              city: "Delhi",
              state: "Delhi",
              pincode: "110048",
            },
            items: [
              {
                productId: "p-8",
                name: "O3+ Bridal Facial Kit",
                brand: "O3+",
                sku: "O3-0192",
                image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200",
                quantity: 10,
                price: 1750,
                mrp: 2450,
              },
            ],
            subtotal: 22150,
            discount: 0,
            shipping: 0,
            total: 22150,
            status: "Pending",
            paymentMethod: "UPI Direct",
            paymentStatus: "Paid",
          },
        ];
        setOrders(seedOrders);
        setSelectedOrder(seedOrders[0]);
      }
    } catch {
      // Keep state
    } finally {
      setOrdersLoading(false);
    }
  }, [orderStatusTab, orderSearch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Salon Action Handlers
  const handleApproveUser = async (id: string) => {
    try {
      await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "approved" }),
      });
      fetchUsers();
    } catch {
      alert("Error approving salon");
    }
  };

  const handleRejectUser = async (id: string) => {
    const reason = prompt("Enter reason for rejection:");
    if (!reason) return;
    try {
      await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "rejected", rejectionReason: reason }),
      });
      fetchUsers();
    } catch {
      alert("Error rejecting salon");
    }
  };

  // Product Action Handlers
  const openEditDrawer = (product: Product) => {
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      brand: product.brand,
      category: product.category,
      sku: product.sku || "LP-0012",
      barcode: "3282770145123",
      wholesalePrice: product.salePrice,
      mrp: product.mrp,
      stock: product.stock || 25,
      availability: product.availability || "In Stock",
      image: product.image,
      shortDesc: product.description || "Professional grade salon product.",
      fullDesc: product.description || "Formula crafted for certified beauty stylists and high volume salons.",
    });
    setIsProductDrawerOpen(true);
  };

  const openNewProductDrawer = () => {
    setEditingProductId(null);
    setProductForm({
      name: "",
      brand: "L'Oréal Professionnel",
      category: "Hair Care",
      sku: `BP-${Math.floor(1000 + Math.random() * 9000)}`,
      barcode: "8901234567890",
      wholesalePrice: 1000,
      mrp: 1400,
      stock: 50,
      availability: "In Stock",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500",
      shortDesc: "",
      fullDesc: "",
    });
    setIsProductDrawerOpen(true);
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
        description: productForm.fullDesc || productForm.shortDesc,
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

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: "#0f172a" }}>
      {/* ===================================================================== */}
      {/* SIDEBAR: EXACT OBSIDIAN STYLING FROM DESIGN MOCKUPS */}
      {/* ===================================================================== */}
      <aside
        style={{
          width: "250px",
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
        }}
      >
        {/* Brand Header */}
        <div style={{ padding: "1.75rem 1.5rem 1.25rem 1.5rem" }}>
          <div style={{ fontFamily: "serif, 'Playfair Display', Georgia", fontSize: "1.6rem", fontWeight: 900, color: "#e5b95f", letterSpacing: "0.02em" }}>
            Beu<span style={{ color: "#ffffff" }}>PROS</span>
          </div>
          <div style={{ fontSize: "9px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.32em", textTransform: "uppercase", marginTop: "3px" }}>
            B 2 B &nbsp; W H O L E S A L E
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: "0.75rem 0.85rem", display: "flex", flexDirection: "column", gap: "2px", flex: 1, overflowY: "auto" }}>
          <button
            onClick={() => setActiveTab("dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.7rem 1rem",
              borderRadius: "8px",
              fontSize: "0.88rem",
              fontWeight: 700,
              backgroundColor: activeTab === "dashboard" ? "#1e293b" : "transparent",
              color: activeTab === "dashboard" ? "#ffffff" : "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Home size={17} color={activeTab === "dashboard" ? "#818cf8" : "#64748b"} />
              <span>Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("verifications")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.7rem 1rem",
              borderRadius: "8px",
              fontSize: "0.88rem",
              fontWeight: 700,
              backgroundColor: activeTab === "verifications" ? "#1e293b" : "transparent",
              color: activeTab === "verifications" ? "#ffffff" : "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Users size={17} color={activeTab === "verifications" ? "#818cf8" : "#64748b"} />
              <span>Salon Verifications</span>
            </div>
            <span style={{ backgroundColor: "#ef4444", color: "#ffffff", fontSize: "11px", fontWeight: 900, padding: "2px 7px", borderRadius: "9999px" }}>
              12
            </span>
          </button>

          <button
            onClick={() => setActiveTab("catalog")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.7rem 1rem",
              borderRadius: "8px",
              fontSize: "0.88rem",
              fontWeight: 700,
              backgroundColor: activeTab === "catalog" ? "#1e293b" : "transparent",
              color: activeTab === "catalog" ? "#ffffff" : "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Package size={17} color={activeTab === "catalog" ? "#818cf8" : "#64748b"} />
              <span>Product Catalog</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.7rem 1rem",
              borderRadius: "8px",
              fontSize: "0.88rem",
              fontWeight: 700,
              backgroundColor: activeTab === "orders" ? "#1e293b" : "transparent",
              color: activeTab === "orders" ? "#ffffff" : "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Truck size={17} color={activeTab === "orders" ? "#818cf8" : "#64748b"} />
              <span>Orders & Fulfillment</span>
            </div>
          </button>

          <div style={{ height: "1px", backgroundColor: "#1e293b", margin: "0.6rem 0.5rem" }} />

          <button
            onClick={() => setActiveTab("analytics")}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.7rem 1rem",
              borderRadius: "8px",
              fontSize: "0.88rem",
              fontWeight: 700,
              backgroundColor: activeTab === "analytics" ? "#1e293b" : "transparent",
              color: activeTab === "analytics" ? "#ffffff" : "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              gap: "12px",
            }}
          >
            <BarChart2 size={17} color={activeTab === "analytics" ? "#818cf8" : "#64748b"} />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab("customers")}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.7rem 1rem",
              borderRadius: "8px",
              fontSize: "0.88rem",
              fontWeight: 700,
              backgroundColor: activeTab === "customers" ? "#1e293b" : "transparent",
              color: activeTab === "customers" ? "#ffffff" : "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              gap: "12px",
            }}
          >
            <UserCheck size={17} color={activeTab === "customers" ? "#818cf8" : "#64748b"} />
            <span>Customers (Salons)</span>
          </button>

          <button
            onClick={() => setActiveTab("inventory")}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.7rem 1rem",
              borderRadius: "8px",
              fontSize: "0.88rem",
              fontWeight: 700,
              backgroundColor: activeTab === "inventory" ? "#1e293b" : "transparent",
              color: activeTab === "inventory" ? "#ffffff" : "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              gap: "12px",
            }}
          >
            <Boxes size={17} color={activeTab === "inventory" ? "#818cf8" : "#64748b"} />
            <span>Inventory</span>
          </button>

          <button
            onClick={() => alert("Categories & Brands manager")}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.7rem 1rem",
              borderRadius: "8px",
              fontSize: "0.88rem",
              fontWeight: 700,
              backgroundColor: "transparent",
              color: "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              gap: "12px",
            }}
          >
            <Grid size={17} color="#64748b" />
            <span>Categories & Brands</span>
          </button>

          <button
            onClick={() => alert("Coupons & Pricing rules")}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.7rem 1rem",
              borderRadius: "8px",
              fontSize: "0.88rem",
              fontWeight: 700,
              backgroundColor: "transparent",
              color: "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              gap: "12px",
            }}
          >
            <Tag size={17} color="#64748b" />
            <span>Coupons & Pricing</span>
          </button>

          <button
            onClick={() => alert("Wholesale Reports generator")}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.7rem 1rem",
              borderRadius: "8px",
              fontSize: "0.88rem",
              fontWeight: 700,
              backgroundColor: "transparent",
              color: "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              gap: "12px",
            }}
          >
            <FileText size={17} color="#64748b" />
            <span>Reports</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.7rem 1rem",
              borderRadius: "8px",
              fontSize: "0.88rem",
              fontWeight: 700,
              backgroundColor: activeTab === "settings" ? "#1e293b" : "transparent",
              color: activeTab === "settings" ? "#ffffff" : "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              gap: "12px",
            }}
          >
            <Settings size={17} color={activeTab === "settings" ? "#818cf8" : "#64748b"} />
            <span>Settings</span>
          </button>
        </nav>

        {/* Need Help Box */}
        <div style={{ padding: "1.25rem 1rem", borderTop: "1px solid #1a2234" }}>
          <div style={{ backgroundColor: "#111827", borderRadius: "10px", padding: "0.85rem", border: "1px solid #1f2937", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#1f2937", display: "flex", alignItems: "center", justifyContent: "center", color: "#818cf8" }}>
              <Headphones size={18} />
            </div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 800, color: "#f8fafc" }}>Need Help?</div>
              <div style={{ fontSize: "10px", color: "#94a3b8" }}>admin@beupros.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* MAIN CONTENT AREA */}
      {/* ===================================================================== */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, backgroundColor: "#f8fafc" }}>
        {/* Top Header Bar */}
        <header
          style={{
            height: "68px",
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
          {/* Search Bar */}
          <div style={{ position: "relative", width: "420px" }}>
            <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "12px" }} />
            <input
              type="text"
              placeholder="Search salons, orders, products, SKU..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "0.6rem 3rem 0.6rem 2.6rem",
                borderRadius: "8px",
                border: "1.5px solid #e2e8f0",
                backgroundColor: "#f8fafc",
                fontSize: "0.85rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <span style={{ position: "absolute", right: "12px", top: "10px", backgroundColor: "#e2e8f0", color: "#64748b", fontSize: "10px", fontWeight: 800, padding: "2px 6px", borderRadius: "4px" }}>
              ⌘ K
            </span>
          </div>

          {/* Right Header Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            {/* Notification Bell */}
            <div style={{ position: "relative", cursor: "pointer" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#334155" }}>
                <Bell size={18} />
              </div>
              <span style={{ position: "absolute", top: "2px", right: "2px", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ef4444", border: "2px solid #fff" }} />
            </div>

            {/* Admin Profile */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderLeft: "1px solid #e2e8f0", paddingLeft: "1.25rem" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#0f172a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "13px" }}>
                SA
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a" }}>Sudarshan Aher</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Viewport Content */}
        <div style={{ padding: "2rem", flex: 1 }}>
          {/* ================================================================= */}
          {/* TAB 1: DASHBOARD (EXACT REPLICA OF IMAGE 1) */}
          {/* ================================================================= */}
          {activeTab === "dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {/* Header Title & Date Picker */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h1 style={{ fontSize: "1.65rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>
                    Welcome to BeuPROS Admin
                  </h1>
                  <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Manage your salon wholesale ecosystem in real-time.
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#ffffff", border: "1.5px solid #e2e8f0", padding: "0.55rem 1rem", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 700, color: "#334155", cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
                  <Calendar size={16} color="#64748b" />
                  <span>{selectedTimeRange}</span>
                  <ChevronDown size={14} color="#64748b" />
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
                {/* 1. Pending Approvals */}
                <div
                  onClick={() => setActiveTab("verifications")}
                  style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.35rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)", cursor: "pointer", position: "relative" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "#f3e8ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#9333ea" }}>
                      <Users size={20} />
                    </div>
                    <ChevronRight size={18} color="#94a3b8" />
                  </div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", marginTop: "1rem" }}>Pending Approvals</div>
                  <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.1, marginTop: "4px" }}>12</div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#ef4444", marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                    ↑ 3 this week
                  </div>
                </div>

                {/* 2. Verified Salons */}
                <div
                  onClick={() => setActiveTab("customers")}
                  style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.35rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)", cursor: "pointer" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a" }}>
                      <UserCheck size={20} />
                    </div>
                    <ChevronRight size={18} color="#94a3b8" />
                  </div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", marginTop: "1rem" }}>Verified Salons</div>
                  <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.1, marginTop: "4px" }}>428</div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a", marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                    ↑ 12% this month
                  </div>
                </div>

                {/* 3. Pipeline Revenue */}
                <div
                  onClick={() => setActiveTab("analytics")}
                  style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.35rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)", cursor: "pointer" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", color: "#d97706", fontWeight: 900, fontSize: "18px" }}>
                      ₹
                    </div>
                    <ChevronRight size={18} color="#94a3b8" />
                  </div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", marginTop: "1rem" }}>Pipeline Revenue</div>
                  <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.1, marginTop: "4px" }}>₹ 12,48,320</div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a", marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                    ↑ 21% vs last month
                  </div>
                </div>

                {/* 4. Total Products */}
                <div
                  onClick={() => setActiveTab("catalog")}
                  style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.35rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)", cursor: "pointer" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}>
                      <Package size={20} />
                    </div>
                    <ChevronRight size={18} color="#94a3b8" />
                  </div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", marginTop: "1rem" }}>Total Products (SKUs)</div>
                  <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.1, marginTop: "4px" }}>4,236</div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a", marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                    ↑ 18 new this week
                  </div>
                </div>
              </div>

              {/* Charts Row: Revenue Bar Chart & Order Status Donut */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.25rem" }}>
                {/* Wholesale Revenue Overview (Bar Chart) */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Wholesale Revenue Overview</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#64748b", fontWeight: 700, border: "1px solid #e2e8f0", padding: "3px 8px", borderRadius: "6px" }}>
                      <span>Last 30 Days</span>
                      <ChevronDown size={12} />
                    </div>
                  </div>

                  {/* SVG Bar Chart with Tooltip */}
                  <div style={{ position: "relative", height: "200px", width: "100%" }}>
                    {/* Tooltip callout */}
                    <div style={{ position: "absolute", left: "43%", top: "15px", backgroundColor: "#ffffff", padding: "6px 12px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.12)", border: "1px solid #e2e8f0", fontSize: "11px", zIndex: 10 }}>
                      <div style={{ color: "#64748b", fontSize: "10px" }}>18 Oct 2026</div>
                      <div style={{ fontWeight: 900, color: "#0f172a", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#6366f1" }} />
                        ₹ 4,82,320
                      </div>
                    </div>

                    <svg viewBox="0 0 700 180" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="700" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="75" x2="700" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="120" x2="700" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="165" x2="700" y2="165" stroke="#f1f5f9" strokeWidth="1" />

                      {/* Y-axis labels */}
                      <text x="0" y="30" fill="#94a3b8" fontSize="10">₹ 20L</text>
                      <text x="0" y="75" fill="#94a3b8" fontSize="10">₹ 15L</text>
                      <text x="0" y="120" fill="#94a3b8" fontSize="10">₹ 10L</text>
                      <text x="0" y="165" fill="#94a3b8" fontSize="10">₹ 5L</text>

                      {/* Bars */}
                      {[
                        15, 25, 45, 30, 70, 50, 60, 80, 55, 40, 65, 75, 90, 85, 110, 100, 130, 95, 75, 140, 120, 80, 105, 135, 150, 170, 130
                      ].map((h, i) => (
                        <rect
                          key={i}
                          x={60 + i * 23}
                          y={165 - h}
                          width="12"
                          height={h}
                          rx="3"
                          fill={i === 16 ? "#6366f1" : "#a5b4fc"}
                          style={{ transition: "all 0.2s ease" }}
                        />
                      ))}
                    </svg>

                    <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "55px", marginTop: "4px", fontSize: "10px", color: "#94a3b8" }}>
                      <span>1 Oct</span>
                      <span>5 Oct</span>
                      <span>10 Oct</span>
                      <span>15 Oct</span>
                      <span>20 Oct</span>
                      <span>25 Oct</span>
                      <span>31 Oct</span>
                    </div>
                  </div>
                </div>

                {/* Order Status Overview (Donut Chart) */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Order Status Overview</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#64748b", fontWeight: 700, border: "1px solid #e2e8f0", padding: "3px 8px", borderRadius: "6px" }}>
                      <span>This Month</span>
                      <ChevronDown size={12} />
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
                    {/* SVG Donut */}
                    <div style={{ width: "130px", height: "130px", position: "relative", flexShrink: 0 }}>
                      <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#f59e0b" strokeWidth="4.5" strokeDasharray="14 86" strokeDashoffset="0" />
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#3b82f6" strokeWidth="4.5" strokeDasharray="21 79" strokeDashoffset="-14" />
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#8b5cf6" strokeWidth="4.5" strokeDasharray="25 75" strokeDashoffset="-35" />
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#10b981" strokeWidth="4.5" strokeDasharray="29 71" strokeDashoffset="-60" />
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#f97316" strokeWidth="4.5" strokeDasharray="11 89" strokeDashoffset="-89" />
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0f172a" }}>342</div>
                        <div style={{ fontSize: "9px", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Total Orders</div>
                      </div>
                    </div>

                    {/* Donut Legend */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "11px", flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#f59e0b" }} /> Pending
                        </span>
                        <strong style={{ color: "#0f172a" }}>48 (14%)</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#3b82f6" }} /> Confirmed
                        </span>
                        <strong style={{ color: "#0f172a" }}>72 (21%)</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#8b5cf6" }} /> Packing
                        </span>
                        <strong style={{ color: "#0f172a" }}>86 (25%)</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981" }} /> Dispatched
                        </span>
                        <strong style={{ color: "#0f172a" }}>98 (29%)</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#f97316" }} /> Delivered
                        </span>
                        <strong style={{ color: "#0f172a" }}>38 (11%)</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Split Tables: Recent Salon Applications & Inventory Alerts */}
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "1.25rem" }}>
                {/* Recent Salon Applications */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Recent Salon Applications</h3>
                    <button
                      onClick={() => setActiveTab("verifications")}
                      style={{ fontSize: "12px", fontWeight: 700, color: "#6366f1", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                    >
                      View All →
                    </button>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #f1f5f9", color: "#64748b", fontWeight: 700 }}>
                          <th style={{ padding: "0.6rem 0.5rem" }}>Salon Name</th>
                          <th style={{ padding: "0.6rem 0.5rem" }}>Owner</th>
                          <th style={{ padding: "0.6rem 0.5rem" }}>City</th>
                          <th style={{ padding: "0.6rem 0.5rem" }}>Submitted</th>
                          <th style={{ padding: "0.6rem 0.5rem" }}>Status</th>
                          <th style={{ padding: "0.6rem 0.5rem", textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.slice(0, 5).map((u, i) => (
                          <tr key={u.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                            <td style={{ padding: "0.75rem 0.5rem", fontWeight: 800, color: "#0f172a" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <div style={{ width: "24px", height: "24px", borderRadius: "6px", backgroundColor: i % 2 === 0 ? "#1e293b" : "#fee2e2", color: i % 2 === 0 ? "#e5b95f" : "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 900 }}>
                                  {u.salonName.substring(0, 2).toUpperCase()}
                                </div>
                                <span>{u.salonName}</span>
                              </div>
                            </td>
                            <td style={{ padding: "0.75rem 0.5rem", color: "#334155" }}>{u.name}</td>
                            <td style={{ padding: "0.75rem 0.5rem", color: "#64748b" }}>{u.city}</td>
                            <td style={{ padding: "0.75rem 0.5rem", color: "#64748b" }}>Oct 17, 2026</td>
                            <td style={{ padding: "0.75rem 0.5rem" }}>
                              <span style={{ backgroundColor: "#fef3c7", color: "#b45309", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 800 }}>
                                Pending
                              </span>
                            </td>
                            <td style={{ padding: "0.75rem 0.5rem", textAlign: "right" }}>
                              <div style={{ display: "inline-flex", gap: "4px" }}>
                                <button
                                  onClick={() => setSelectedUserDetail(u)}
                                  style={{ padding: "3px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", fontSize: "10px", fontWeight: 700, cursor: "pointer" }}
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => handleApproveUser(u.id)}
                                  style={{ padding: "3px 8px", borderRadius: "4px", border: "none", backgroundColor: "#0f172a", color: "#fff", fontSize: "10px", fontWeight: 800, cursor: "pointer" }}
                                >
                                  Approve
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Inventory Alerts */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Inventory Alerts</h3>
                    <button
                      onClick={() => setActiveTab("catalog")}
                      style={{ fontSize: "12px", fontWeight: 700, color: "#6366f1", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                    >
                      View All →
                    </button>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #f1f5f9", color: "#64748b", fontWeight: 700 }}>
                          <th style={{ padding: "0.6rem 0.5rem" }}>Product</th>
                          <th style={{ padding: "0.6rem 0.5rem" }}>SKU</th>
                          <th style={{ padding: "0.6rem 0.5rem" }}>Stock</th>
                          <th style={{ padding: "0.6rem 0.5rem", textAlign: "right" }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.slice(0, 5).map((p) => (
                          <tr key={p.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                            <td style={{ padding: "0.65rem 0.5rem", fontWeight: 700, color: "#0f172a", maxWidth: "160px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <div style={{ width: "24px", height: "24px", position: "relative", borderRadius: "4px", overflow: "hidden", backgroundColor: "#f8fafc", flexShrink: 0 }}>
                                  <Image src={p.image} alt={p.name} fill sizes="24px" style={{ objectFit: "contain" }} />
                                </div>
                                <span className="line-clamp-1">{p.name}</span>
                              </div>
                            </td>
                            <td style={{ padding: "0.65rem 0.5rem", color: "#64748b", fontFamily: "monospace" }}>{p.sku || "LP-0012"}</td>
                            <td style={{ padding: "0.65rem 0.5rem", fontWeight: 800, color: (p.stock || 0) === 0 ? "#ef4444" : "#dc2626" }}>
                              {p.stock ?? 5}
                            </td>
                            <td style={{ padding: "0.65rem 0.5rem", textAlign: "right" }}>
                              <span style={{ backgroundColor: (p.stock || 0) === 0 ? "#fee2e2" : "#fef2f2", color: (p.stock || 0) === 0 ? "#dc2626" : "#ef4444", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: 800 }}>
                                {(p.stock || 0) === 0 ? "Out of Stock" : "Low Stock"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Recent Orders (Full Width Table) */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Recent Orders</h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    style={{ fontSize: "12px", fontWeight: 700, color: "#6366f1", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    View All →
                  </button>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #f1f5f9", color: "#64748b", fontWeight: 700 }}>
                        <th style={{ padding: "0.75rem 0.5rem" }}>Order ID</th>
                        <th style={{ padding: "0.75rem 0.5rem" }}>Salon Name</th>
                        <th style={{ padding: "0.75rem 0.5rem" }}>Items</th>
                        <th style={{ padding: "0.75rem 0.5rem" }}>Order Value</th>
                        <th style={{ padding: "0.75rem 0.5rem" }}>Payment</th>
                        <th style={{ padding: "0.75rem 0.5rem" }}>Status</th>
                        <th style={{ padding: "0.75rem 0.5rem" }}>Tracking</th>
                        <th style={{ padding: "0.75rem 0.5rem" }}>Date</th>
                        <th style={{ padding: "0.75rem 0.5rem", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                          <td style={{ padding: "0.75rem 0.5rem", fontWeight: 900, fontFamily: "monospace", color: "#0f172a" }}>{o.id}</td>
                          <td style={{ padding: "0.75rem 0.5rem", fontWeight: 800, color: "#0f172a" }}>{o.salonName}</td>
                          <td style={{ padding: "0.75rem 0.5rem", color: "#64748b" }}>{o.items?.length || 5} items</td>
                          <td style={{ padding: "0.75rem 0.5rem", fontWeight: 800, color: "#0f172a" }}>₹ {o.total.toLocaleString("en-IN")}</td>
                          <td style={{ padding: "0.75rem 0.5rem" }}>
                            <span style={{ backgroundColor: o.paymentStatus === "Paid" ? "#dcfce7" : "#fef3c7", color: o.paymentStatus === "Paid" ? "#16a34a" : "#b45309", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 800 }}>
                              {o.paymentStatus}
                            </span>
                          </td>
                          <td style={{ padding: "0.75rem 0.5rem" }}>
                            <span style={{ backgroundColor: o.status === "Dispatched" ? "#dbeafe" : o.status === "Packing" ? "#f3e8ff" : o.status === "Confirmed" ? "#e0e7ff" : o.status === "Delivered" ? "#dcfce7" : "#fef3c7", color: o.status === "Dispatched" ? "#2563eb" : o.status === "Packing" ? "#9333ea" : o.status === "Confirmed" ? "#4f46e5" : o.status === "Delivered" ? "#16a34a" : "#b45309", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 800 }}>
                              {o.status}
                            </span>
                          </td>
                          <td style={{ padding: "0.75rem 0.5rem", color: "#64748b", fontFamily: "monospace", fontSize: "11px" }}>{o.trackingNumber || "—"}</td>
                          <td style={{ padding: "0.75rem 0.5rem", color: "#64748b" }}>Oct 17, 2026</td>
                          <td style={{ padding: "0.75rem 0.5rem", textAlign: "right" }}>
                            <div style={{ display: "inline-flex", gap: "4px" }}>
                              <button
                                onClick={() => {
                                  setSelectedOrder(o);
                                  setActiveTab("orders");
                                }}
                                style={{ padding: "3px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", fontSize: "10px", fontWeight: 700, cursor: "pointer" }}
                              >
                                View
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedOrder(o);
                                  setActiveTab("orders");
                                }}
                                style={{ padding: "3px 8px", borderRadius: "4px", border: "none", backgroundColor: "#0f172a", color: "#fff", fontSize: "10px", fontWeight: 800, cursor: "pointer" }}
                              >
                                Update
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: PRODUCT CATALOG (EXACT REPLICA OF IMAGE 2) */}
          {/* ================================================================= */}
          {activeTab === "catalog" && (
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Catalog Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <h1 style={{ fontSize: "1.65rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Product Catalog</h1>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                      Manage 4,200+ professional salon products with wholesale pricing, inventory and categories.
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <button style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#ffffff", border: "1.5px solid #e2e8f0", padding: "0.55rem 1rem", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 700, color: "#334155", cursor: "pointer" }}>
                      <UploadCloud size={15} /> Import Products
                    </button>
                    <button style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#ffffff", border: "1.5px solid #e2e8f0", padding: "0.55rem 1rem", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 700, color: "#334155", cursor: "pointer" }}>
                      <Download size={15} /> Export Catalog
                    </button>
                    <button
                      onClick={openNewProductDrawer}
                      style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#6366f1", border: "none", padding: "0.55rem 1.25rem", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 800, color: "#ffffff", cursor: "pointer", boxShadow: "0 2px 4px rgba(99, 102, 241, 0.25)" }}
                    >
                      <Plus size={16} /> Add New Product
                    </button>
                  </div>
                </div>

                {/* 4 Top KPI Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "1.25rem", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#dbeafe", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Package size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 700 }}>Total Products (SKUs)</div>
                        <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a" }}>4,236</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "11px", color: "#16a34a", fontWeight: 700, marginTop: "6px" }}>↑ 18 new this week</div>
                  </div>

                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "1.25rem", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Tag size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 700 }}>Active Products</div>
                        <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a" }}>3,982</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "11px", color: "#16a34a", fontWeight: 700, marginTop: "6px" }}>↑ 15 this week</div>
                  </div>

                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "1.25rem", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Boxes size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 700 }}>Low Stock Items</div>
                        <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a" }}>68</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "11px", color: "#ef4444", fontWeight: 700, marginTop: "6px" }}>↓ 12 vs last week</div>
                  </div>

                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "1.25rem", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#fee2e2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <XCircle size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 700 }}>Out of Stock</div>
                        <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a" }}>24</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "11px", color: "#ef4444", fontWeight: 700, marginTop: "6px" }}>↑ 6 vs last week</div>
                  </div>
                </div>

                {/* Category Pills Bar */}
                <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "2px" }}>
                  {[
                    { label: "All Categories", count: "4,236" },
                    { label: "Hair Care", count: "1,245" },
                    { label: "Hair Color", count: "628" },
                    { label: "Styling", count: "512" },
                    { label: "Skin Care", count: "486" },
                    { label: "Tools & Equipment", count: "324" },
                    { label: "Nail Care", count: "298" },
                    { label: "Electrical", count: "186" },
                  ].map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => setSelectedCategoryTab(cat.label)}
                      style={{
                        padding: "0.45rem 0.9rem",
                        borderRadius: "8px",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        border: "1.5px solid",
                        borderColor: selectedCategoryTab === cat.label ? "#6366f1" : "#e2e8f0",
                        backgroundColor: selectedCategoryTab === cat.label ? "#6366f1" : "#ffffff",
                        color: selectedCategoryTab === cat.label ? "#ffffff" : "#334155",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span>{cat.label}</span>
                      <span style={{ fontSize: "10px", padding: "1px 6px", borderRadius: "9999px", backgroundColor: selectedCategoryTab === cat.label ? "rgba(255,255,255,0.25)" : "#f1f5f9", color: selectedCategoryTab === cat.label ? "#fff" : "#64748b" }}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Filter and Search Bar */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
                    <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "11px" }} />
                    <input
                      type="text"
                      placeholder="Search product name, brand, SKU..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      style={{ width: "100%", padding: "0.55rem 1rem 0.55rem 2.4rem", borderRadius: "6px", border: "1.5px solid #e2e8f0", fontSize: "0.85rem", boxSizing: "border-box" }}
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <select
                      value={selectedBrandFilter}
                      onChange={(e) => setSelectedBrandFilter(e.target.value)}
                      style={{ padding: "0.55rem 0.85rem", borderRadius: "6px", border: "1.5px solid #e2e8f0", fontSize: "0.82rem", fontWeight: 600, backgroundColor: "#fff" }}
                    >
                      <option value="All Brands">All Brands</option>
                      <option value="L'Oréal">{"L'Oréal Professionnel"}</option>
                      <option value="Wella">Wella</option>
                      <option value="Schwarzkopf">Schwarzkopf</option>
                      <option value="Olaplex">Olaplex</option>
                    </select>

                    <select
                      value={selectedStockFilter}
                      onChange={(e) => setSelectedStockFilter(e.target.value)}
                      style={{ padding: "0.55rem 0.85rem", borderRadius: "6px", border: "1.5px solid #e2e8f0", fontSize: "0.82rem", fontWeight: 600, backgroundColor: "#fff" }}
                    >
                      <option value="All Stock Status">All Stock Status</option>
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>

                    <select style={{ padding: "0.55rem 0.85rem", borderRadius: "6px", border: "1.5px solid #e2e8f0", fontSize: "0.82rem", fontWeight: 600, backgroundColor: "#fff" }}>
                      <option>Newest First</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Products Table */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc", color: "#64748b", fontWeight: 800 }}>
                          <th style={{ padding: "0.85rem 0.75rem", width: "30px" }}><input type="checkbox" /></th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>Product</th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>SKU</th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>Brand</th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>Category</th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>Wholesale Price</th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>MRP</th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>Stock</th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>Status</th>
                          <th style={{ padding: "0.85rem 0.75rem", textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((p) => (
                          <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "0.75rem" }}><input type="checkbox" /></td>
                            <td style={{ padding: "0.75rem" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{ width: "38px", height: "38px", position: "relative", borderRadius: "6px", overflow: "hidden", backgroundColor: "#f8fafc", flexShrink: 0 }}>
                                  <Image src={p.image} alt={p.name} fill sizes="38px" style={{ objectFit: "contain" }} />
                                </div>
                                <div>
                                  <div style={{ fontWeight: 800, color: "#0f172a", maxWidth: "220px" }} className="line-clamp-1">{p.name}</div>
                                  <div style={{ fontSize: "10px", color: "#94a3b8" }}>1000 ml</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: "0.75rem", fontFamily: "monospace", color: "#64748b" }}>{p.sku || "LP-0012"}</td>
                            <td style={{ padding: "0.75rem", color: "#334155", fontWeight: 600 }}>{p.brand}</td>
                            <td style={{ padding: "0.75rem" }}>
                              <span style={{ backgroundColor: "#eff6ff", color: "#2563eb", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 700 }}>
                                {p.category}
                              </span>
                            </td>
                            <td style={{ padding: "0.75rem", fontWeight: 800, color: "#0f172a" }}>₹ {p.salePrice.toLocaleString("en-IN")}</td>
                            <td style={{ padding: "0.75rem", color: "#64748b" }}>₹ {p.mrp.toLocaleString("en-IN")}</td>
                            <td style={{ padding: "0.75rem", fontWeight: 800, color: (p.stock || 0) === 0 ? "#ef4444" : (p.stock || 0) < 10 ? "#d97706" : "#16a34a" }}>
                              {p.stock ?? 25}
                            </td>
                            <td style={{ padding: "0.75rem" }}>
                              <span style={{ backgroundColor: (p.stock || 0) === 0 ? "#fee2e2" : (p.stock || 0) < 10 ? "#fef3c7" : "#dcfce7", color: (p.stock || 0) === 0 ? "#dc2626" : (p.stock || 0) < 10 ? "#b45309" : "#16a34a", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 800 }}>
                                {(p.stock || 0) === 0 ? "Out of Stock" : (p.stock || 0) < 10 ? "Low Stock" : "In Stock"}
                              </span>
                            </td>
                            <td style={{ padding: "0.75rem", textAlign: "right" }}>
                              <div style={{ display: "inline-flex", gap: "6px", color: "#64748b" }}>
                                <button onClick={() => openEditDrawer(p)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }} title="Edit"><Edit2 size={14} /></button>
                                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }} title="Duplicate"><Copy size={14} /></button>
                                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }} title="Delete"><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Footer */}
                  <div style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #e2e8f0", fontSize: "12px", color: "#64748b" }}>
                    <div>Showing 1–10 of 4,236 products</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <button style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer" }}><ChevronLeft size={14} /></button>
                      <button style={{ padding: "4px 10px", borderRadius: "4px", border: "none", background: "#6366f1", color: "#fff", fontWeight: 800 }}>1</button>
                      <button style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid #e2e8f0", background: "#fff" }}>2</button>
                      <button style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid #e2e8f0", background: "#fff" }}>3</button>
                      <span>...</span>
                      <button style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid #e2e8f0", background: "#fff" }}>424</button>
                      <button style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer" }}><ChevronRight size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide-out Add / Edit Product Drawer (Right Side, Matching Image 2) */}
              {isProductDrawerOpen && (
                <div style={{ width: "420px", backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "1.5rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", height: "fit-content" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>
                      {editingProductId ? "Edit Product" : "Add / Edit Product"}
                    </h3>
                    <button onClick={() => setIsProductDrawerOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
                      <X size={20} />
                    </button>
                  </div>

                  {/* Drawer Tabs */}
                  <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0", margin: "1rem 0", gap: "1rem", fontSize: "11px", fontWeight: 700 }}>
                    <span onClick={() => setProductActiveTab("basic")} style={{ color: productActiveTab === "basic" ? "#6366f1" : "#64748b", borderBottom: productActiveTab === "basic" ? "2px solid #6366f1" : "none", paddingBottom: "6px", cursor: "pointer" }}>Basic Information</span>
                    <span onClick={() => setProductActiveTab("pricing")} style={{ color: productActiveTab === "pricing" ? "#6366f1" : "#64748b", borderBottom: productActiveTab === "pricing" ? "2px solid #6366f1" : "none", paddingBottom: "6px", cursor: "pointer" }}>Pricing & Inventory</span>
                    <span onClick={() => setProductActiveTab("images")} style={{ color: productActiveTab === "images" ? "#6366f1" : "#64748b", borderBottom: productActiveTab === "images" ? "2px solid #6366f1" : "none", paddingBottom: "6px", cursor: "pointer" }}>Images</span>
                    <span onClick={() => setProductActiveTab("seo")} style={{ color: productActiveTab === "seo" ? "#6366f1" : "#64748b", borderBottom: productActiveTab === "seo" ? "2px solid #6366f1" : "none", paddingBottom: "6px", cursor: "pointer" }}>SEO</span>
                  </div>

                  <form onSubmit={handleSaveProduct} style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "12px" }}>
                    {/* Image Preview & Upload Row */}
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <div style={{ width: "90px", height: "110px", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", position: "relative", overflow: "hidden" }}>
                        <Image src={productForm.image} alt={productForm.name} fill sizes="90px" style={{ objectFit: "contain" }} />
                        <button type="button" style={{ position: "absolute", bottom: "4px", right: "4px", padding: "4px", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.9)", border: "1px solid #e2e8f0", cursor: "pointer" }}><Trash2 size={12} color="#ef4444" /></button>
                      </div>
                      <div style={{ flex: 1, border: "1.5px dashed #cbd5e1", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1rem", textAlign: "center", cursor: "pointer", backgroundColor: "#faf5ff" }}>
                        <Plus size={20} color="#6366f1" />
                        <div style={{ fontWeight: 800, color: "#6366f1", marginTop: "4px" }}>Upload Images</div>
                        <div style={{ fontSize: "10px", color: "#94a3b8" }}>Add up to 5 images</div>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontWeight: 700, color: "#334155" }}>Product Name *</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        style={{ width: "100%", padding: "0.55rem", border: "1.5px solid #e2e8f0", borderRadius: "6px", marginTop: "3px", boxSizing: "border-box" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      <div>
                        <label style={{ fontWeight: 700, color: "#334155" }}>Brand *</label>
                        <select
                          value={productForm.brand}
                          onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                          style={{ width: "100%", padding: "0.55rem", border: "1.5px solid #e2e8f0", borderRadius: "6px", marginTop: "3px", boxSizing: "border-box", backgroundColor: "#fff" }}
                        >
                          <option>{"L'Oréal Professionnel"}</option>
                          <option>Wella Professionals</option>
                          <option>Schwarzkopf</option>
                          <option>Olaplex</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontWeight: 700, color: "#334155" }}>Category *</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          style={{ width: "100%", padding: "0.55rem", border: "1.5px solid #e2e8f0", borderRadius: "6px", marginTop: "3px", boxSizing: "border-box", backgroundColor: "#fff" }}
                        >
                          <option>Hair Care</option>
                          <option>Hair Color</option>
                          <option>Styling</option>
                          <option>Treatment</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      <div>
                        <label style={{ fontWeight: 700, color: "#334155" }}>SKU *</label>
                        <input
                          type="text"
                          value={productForm.sku}
                          onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                          style={{ width: "100%", padding: "0.55rem", border: "1.5px solid #e2e8f0", borderRadius: "6px", marginTop: "3px", boxSizing: "border-box" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontWeight: 700, color: "#334155" }}>Barcode (Optional)</label>
                        <input
                          type="text"
                          value={productForm.barcode}
                          onChange={(e) => setProductForm({ ...productForm, barcode: e.target.value })}
                          style={{ width: "100%", padding: "0.55rem", border: "1.5px solid #e2e8f0", borderRadius: "6px", marginTop: "3px", boxSizing: "border-box" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      <div>
                        <label style={{ fontWeight: 700, color: "#334155" }}>Wholesale Price (₹) *</label>
                        <input
                          type="number"
                          value={productForm.wholesalePrice}
                          onChange={(e) => setProductForm({ ...productForm, wholesalePrice: Number(e.target.value) })}
                          style={{ width: "100%", padding: "0.55rem", border: "1.5px solid #e2e8f0", borderRadius: "6px", marginTop: "3px", boxSizing: "border-box" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontWeight: 700, color: "#334155" }}>Retail MRP (₹) *</label>
                        <input
                          type="number"
                          value={productForm.mrp}
                          onChange={(e) => setProductForm({ ...productForm, mrp: Number(e.target.value) })}
                          style={{ width: "100%", padding: "0.55rem", border: "1.5px solid #e2e8f0", borderRadius: "6px", marginTop: "3px", boxSizing: "border-box" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontWeight: 700, color: "#334155" }}>Full Description</label>
                      <textarea
                        rows={3}
                        value={productForm.fullDesc}
                        onChange={(e) => setProductForm({ ...productForm, fullDesc: e.target.value })}
                        style={{ width: "100%", padding: "0.55rem", border: "1.5px solid #e2e8f0", borderRadius: "6px", marginTop: "3px", boxSizing: "border-box" }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                      <button
                        type="button"
                        onClick={() => setIsProductDrawerOpen(false)}
                        style={{ padding: "0.55rem 1rem", borderRadius: "6px", border: "1px solid #e2e8f0", backgroundColor: "#fff", fontWeight: 700, cursor: "pointer" }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        style={{ padding: "0.55rem 1.25rem", borderRadius: "6px", border: "none", backgroundColor: "#6366f1", color: "#fff", fontWeight: 800, cursor: "pointer" }}
                      >
                        Save Product
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: ORDERS & FULFILLMENT (EXACT REPLICA OF IMAGE 3) */}
          {/* ================================================================= */}
          {activeTab === "orders" && (
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Orders Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <h1 style={{ fontSize: "1.65rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Orders & Fulfillment</h1>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                      Manage salon wholesale orders, update shipment status and track fulfillment in real-time.
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <button style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#ffffff", border: "1.5px solid #e2e8f0", padding: "0.55rem 1rem", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 700, color: "#334155", cursor: "pointer" }}>
                      <Download size={15} /> Export Orders
                    </button>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#ffffff", border: "1.5px solid #e2e8f0", padding: "0.55rem 1rem", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 700, color: "#334155" }}>
                      <Calendar size={15} color="#64748b" />
                      <span>Oct 1, 2026 – Oct 31, 2026</span>
                      <ChevronDown size={14} color="#64748b" />
                    </div>
                  </div>
                </div>

                {/* 4 Stat Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "1.25rem", border: "1px solid #e2e8f0" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#f3e8ff", color: "#9333ea", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ShoppingBag size={18} />
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, marginTop: "0.75rem" }}>Total Orders</div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a" }}>342</div>
                    <div style={{ fontSize: "11px", color: "#16a34a", fontWeight: 700, marginTop: "4px" }}>↑ 21% this month</div>
                  </div>

                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "1.25rem", border: "1px solid #e2e8f0" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>
                      ₹
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, marginTop: "0.75rem" }}>Total Revenue</div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a" }}>₹ 12,48,320</div>
                    <div style={{ fontSize: "11px", color: "#16a34a", fontWeight: 700, marginTop: "4px" }}>↑ 28% this month</div>
                  </div>

                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "1.25rem", border: "1px solid #e2e8f0" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#fee2e2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Truck size={18} />
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, marginTop: "0.75rem" }}>Pending Dispatch</div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a" }}>48</div>
                    <div style={{ fontSize: "11px", color: "#ef4444", fontWeight: 700, marginTop: "4px" }}>↓ 12% vs last week</div>
                  </div>

                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "1.25rem", border: "1px solid #e2e8f0" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CheckCircle2 size={18} />
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, marginTop: "0.75rem" }}>Delivered Orders</div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a" }}>196</div>
                    <div style={{ fontSize: "11px", color: "#16a34a", fontWeight: 700, marginTop: "4px" }}>↑ 32% this month</div>
                  </div>
                </div>

                {/* Status Tabs */}
                <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.5rem" }}>
                  {[
                    { label: "all", title: "All Orders (342)" },
                    { label: "pending", title: "Pending (48)" },
                    { label: "confirmed", title: "Confirmed (72)" },
                    { label: "packing", title: "Packing (86)" },
                    { label: "dispatched", title: "Dispatched (98)" },
                    { label: "delivered", title: "Delivered (38)" },
                    { label: "cancelled", title: "Cancelled (0)" },
                  ].map((tab) => (
                    <button
                      key={tab.label}
                      onClick={() => setOrderStatusTab(tab.label)}
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        border: "none",
                        backgroundColor: orderStatusTab === tab.label ? "#6366f1" : "transparent",
                        color: orderStatusTab === tab.label ? "#ffffff" : "#64748b",
                        cursor: "pointer",
                      }}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>

                {/* Filter and Search Bar */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
                    <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "11px" }} />
                    <input
                      type="text"
                      placeholder="Search order ID, salon name, city..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      style={{ width: "100%", padding: "0.55rem 1rem 0.55rem 2.4rem", borderRadius: "6px", border: "1.5px solid #e2e8f0", fontSize: "0.85rem", boxSizing: "border-box" }}
                    />
                  </div>

                  <select style={{ padding: "0.55rem 0.85rem", borderRadius: "6px", border: "1.5px solid #e2e8f0", fontSize: "0.82rem", fontWeight: 600, backgroundColor: "#fff" }}>
                    <option>All Status</option>
                  </select>

                  <select style={{ padding: "0.55rem 0.85rem", borderRadius: "6px", border: "1.5px solid #e2e8f0", fontSize: "0.82rem", fontWeight: 600, backgroundColor: "#fff" }}>
                    <option>All Cities</option>
                  </select>

                  <select style={{ padding: "0.55rem 0.85rem", borderRadius: "6px", border: "1.5px solid #e2e8f0", fontSize: "0.82rem", fontWeight: 600, backgroundColor: "#fff" }}>
                    <option>Date Range</option>
                  </select>

                  <select style={{ padding: "0.55rem 0.85rem", borderRadius: "6px", border: "1.5px solid #e2e8f0", fontSize: "0.82rem", fontWeight: 600, backgroundColor: "#fff" }}>
                    <option>Payment Status</option>
                  </select>

                  <button style={{ padding: "0.55rem 1rem", borderRadius: "6px", border: "none", backgroundColor: "#6366f1", color: "#fff", fontWeight: 800, fontSize: "0.82rem", cursor: "pointer" }}>
                    Apply Filters
                  </button>
                </div>

                {/* Orders Table */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc", color: "#64748b", fontWeight: 800 }}>
                          <th style={{ padding: "0.85rem 0.75rem", width: "30px" }}><input type="checkbox" /></th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>Order ID</th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>Salon Name</th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>City</th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>Items</th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>Order Value</th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>Payment</th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>Status</th>
                          <th style={{ padding: "0.85rem 0.75rem" }}>Date</th>
                          <th style={{ padding: "0.85rem 0.75rem", textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((o) => (
                          <tr key={o.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "0.75rem" }}><input type="checkbox" /></td>
                            <td style={{ padding: "0.75rem", fontWeight: 800, color: "#6366f1", fontFamily: "monospace" }}>{o.id}</td>
                            <td style={{ padding: "0.75rem", fontWeight: 800, color: "#0f172a" }}>{o.salonName}</td>
                            <td style={{ padding: "0.75rem", color: "#64748b" }}>{o.shippingAddress.city}</td>
                            <td style={{ padding: "0.75rem", color: "#64748b" }}>{o.items?.length || 1} items</td>
                            <td style={{ padding: "0.75rem", fontWeight: 800, color: "#0f172a" }}>₹ {o.total.toLocaleString("en-IN")}</td>
                            <td style={{ padding: "0.75rem" }}>
                              <span style={{ backgroundColor: o.paymentStatus === "Paid" ? "#dcfce7" : "#fef3c7", color: o.paymentStatus === "Paid" ? "#16a34a" : "#b45309", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 800 }}>
                                {o.paymentStatus}
                              </span>
                            </td>
                            <td style={{ padding: "0.75rem" }}>
                              <span style={{ backgroundColor: o.status === "Dispatched" ? "#dbeafe" : o.status === "Packing" ? "#f3e8ff" : o.status === "Confirmed" ? "#e0e7ff" : o.status === "Delivered" ? "#dcfce7" : "#fef3c7", color: o.status === "Dispatched" ? "#2563eb" : o.status === "Packing" ? "#9333ea" : o.status === "Confirmed" ? "#4f46e5" : o.status === "Delivered" ? "#16a34a" : "#b45309", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 800 }}>
                                {o.status}
                              </span>
                            </td>
                            <td style={{ padding: "0.75rem", color: "#64748b" }}>Oct 17, 2026</td>
                            <td style={{ padding: "0.75rem", textAlign: "right" }}>
                              <button
                                onClick={() => setSelectedOrder(o)}
                                style={{ padding: "3px 10px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Order Inspection Side Panel (Matching Image 3) */}
              {selectedOrder && (
                <div style={{ width: "420px", backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "1.5rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "1.25rem", height: "fit-content" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 900, margin: 0, color: "#0f172a" }}>Order {selectedOrder.id}</h3>
                        <span style={{ backgroundColor: "#dbeafe", color: "#2563eb", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 800 }}>
                          {selectedOrder.status}
                        </span>
                      </div>
                      <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>Placed on Oct 17, 2026, 02:34 PM</div>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
                      <X size={20} />
                    </button>
                  </div>

                  {/* Salon Card */}
                  <div style={{ backgroundColor: "#f8fafc", borderRadius: "10px", padding: "1rem", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "6px", backgroundColor: "#1e293b", color: "#e5b95f", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "11px" }}>
                        GLOW
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "12px" }}>{selectedOrder.salonName}</div>
                        <span style={{ color: "#16a34a", fontSize: "10px", fontWeight: 700 }}>● Verified Pro</span>
                      </div>
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>{selectedOrder.email} • {selectedOrder.phone}</div>
                    <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                      {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                    </div>
                  </div>

                  {/* Order Summary Breakdown */}
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#64748b", marginBottom: "6px" }}>Order Summary</div>
                    <div style={{ backgroundColor: "#f8fafc", borderRadius: "8px", padding: "0.85rem", fontSize: "11px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>Subtotal</span><strong>₹ 24,110</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#16a34a" }}><span>Discount (5%)</span><strong>- ₹ 1,205</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>Shipping</span><strong>₹ 1,545</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>Tax (18%)</span><strong>₹ 4,000</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e2e8f0", paddingTop: "6px", marginTop: "4px", fontSize: "13px", fontWeight: 900 }}>
                        <span>Total</span>
                        <strong style={{ color: "#0f172a" }}>₹ 28,450</strong>
                      </div>
                    </div>
                  </div>

                  {/* Fulfillment Stepper */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#64748b" }}>Fulfillment Status</span>
                      <button style={{ fontSize: "11px", fontWeight: 700, color: "#6366f1", background: "none", border: "none", cursor: "pointer" }}>Mark as Delivered</button>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "11px", borderLeft: "2px solid #e2e8f0", paddingLeft: "12px", marginLeft: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#16a34a" }} />
                        <strong>Order Placed</strong> <span style={{ color: "#94a3b8" }}>Oct 17, 02:34 PM</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#16a34a" }} />
                        <strong>Payment Confirmed</strong> <span style={{ color: "#94a3b8" }}>Oct 17, 02:36 PM</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#16a34a" }} />
                        <strong>Packing</strong> <span style={{ color: "#94a3b8" }}>Oct 18, 10:15 AM</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#6366f1" }} />
                        <strong style={{ color: "#6366f1" }}>Dispatched (Delhivery BLR12345678)</strong>
                      </div>
                    </div>
                  </div>

                  {/* Items in this Order */}
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#64748b", marginBottom: "6px" }}>Items in this Order (12)</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px", backgroundColor: "#f8fafc", borderRadius: "6px", fontSize: "11px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "28px", height: "28px", position: "relative", borderRadius: "4px", overflow: "hidden" }}>
                              <Image src={item.image} alt={item.name} fill sizes="28px" style={{ objectFit: "contain" }} />
                            </div>
                            <span style={{ fontWeight: 700, color: "#0f172a", maxWidth: "160px" }} className="line-clamp-1">{item.name}</span>
                          </div>
                          <strong>₹ {(item.price * item.quantity).toLocaleString("en-IN")}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 4: ANALYTICS (EXACT REPLICA OF IMAGE 4) */}
          {/* ================================================================= */}
          {activeTab === "analytics" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h1 style={{ fontSize: "1.65rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Analytics</h1>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Get complete insights into your wholesale business, salon growth, sales performance and inventory.
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#ffffff", border: "1.5px solid #e2e8f0", padding: "0.55rem 1rem", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 700, color: "#334155" }}>
                  <Calendar size={16} color="#64748b" />
                  <span>Oct 1, 2026 – Oct 31, 2026</span>
                  <ChevronDown size={14} color="#64748b" />
                </div>
              </div>

              {/* 4 Cards with Sparklines */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
                {/* Revenue Sparkline */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.35rem", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>
                      ₹
                    </div>
                    {/* SVG Sparkline */}
                    <svg width="70" height="30" viewBox="0 0 70 30">
                      <path d="M 0,25 Q 15,10 30,20 T 60,5 T 70,10" fill="none" stroke="#818cf8" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", marginTop: "0.75rem" }}>Total Revenue</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>₹ 12,48,320</div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a", marginTop: "4px" }}>↑ 28% vs last month</div>
                </div>

                {/* Orders Sparkline */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.35rem", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#f3e8ff", color: "#9333ea", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ShoppingBag size={18} />
                    </div>
                    <svg width="70" height="30" viewBox="0 0 70 30">
                      <path d="M 0,22 Q 20,5 35,18 T 55,8 T 70,5" fill="none" stroke="#34d399" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", marginTop: "0.75rem" }}>Total Orders</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>342</div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a", marginTop: "4px" }}>↑ 21% vs last month</div>
                </div>

                {/* Verified Salons Sparkline */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.35rem", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#ede9fe", color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Users size={18} />
                    </div>
                    <svg width="70" height="30" viewBox="0 0 70 30">
                      <path d="M 0,25 Q 18,15 35,18 T 50,8 T 70,2" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", marginTop: "0.75rem" }}>Verified Salons</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>428</div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a", marginTop: "4px" }}>↑ 12% vs last month</div>
                </div>

                {/* Total Products Sparkline */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.35rem", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#dbeafe", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Package size={18} />
                    </div>
                    <svg width="70" height="30" viewBox="0 0 70 30">
                      <path d="M 0,28 Q 20,20 40,12 T 60,10 T 70,3" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", marginTop: "0.75rem" }}>Total Products (SKUs)</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>4,236</div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a", marginTop: "4px" }}>↑ 18 new this month</div>
                </div>
              </div>

              {/* Revenue & Orders Trend (Dual Axis Chart) & Sales by Category */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.25rem" }}>
                {/* Dual Axis Trend Chart */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.5rem", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                      <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Revenue & Orders Trend</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "11px", fontWeight: 700 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#6366f1" }}>● Revenue (₹)</span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#3b82f6" }}>● Orders</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#64748b", fontWeight: 700, border: "1px solid #e2e8f0", padding: "3px 8px", borderRadius: "6px" }}>
                      <span>Last 30 Days</span>
                      <ChevronDown size={12} />
                    </div>
                  </div>

                  <div style={{ position: "relative", height: "210px", width: "100%" }}>
                    <svg viewBox="0 0 700 180" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                      {/* Bars */}
                      {[25, 45, 60, 40, 75, 55, 65, 85, 60, 45, 70, 80, 95, 90, 115, 105, 135, 100, 80, 145, 125, 85, 110, 140, 155, 175, 135].map((h, i) => (
                        <rect key={i} x={50 + i * 23} y={165 - h} width="12" height={h} rx="3" fill="#a5b4fc" />
                      ))}
                      {/* Trend Line */}
                      <path
                        d="M 50,140 Q 150,110 250,90 T 400,75 T 550,50 T 670,30"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                      />
                      {[
                        { x: 50, y: 140 }, { x: 150, y: 110 }, { x: 250, y: 90 }, { x: 400, y: 75 }, { x: 550, y: 50 }, { x: 670, y: 30 }
                      ].map((pt, idx) => (
                        <circle key={idx} cx={pt.x} cy={pt.y} r="4" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Sales by Category Donut */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.5rem", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Sales by Category</h3>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>This Month ▾</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", height: "130px", margin: "1rem 0" }}>
                    <svg viewBox="0 0 36 36" style={{ width: "120px", height: "120px", transform: "rotate(-90deg)" }}>
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#f59e0b" strokeWidth="4.5" strokeDasharray="32 68" strokeDashoffset="0" />
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#3b82f6" strokeWidth="4.5" strokeDasharray="18 82" strokeDashoffset="-32" />
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#8b5cf6" strokeWidth="4.5" strokeDasharray="14 86" strokeDashoffset="-50" />
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#10b981" strokeWidth="4.5" strokeDasharray="12 88" strokeDashoffset="-64" />
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#ec4899" strokeWidth="4.5" strokeDasharray="8 92" strokeDashoffset="-76" />
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#06b6d4" strokeWidth="4.5" strokeDasharray="8 92" strokeDashoffset="-84" />
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#64748b" strokeWidth="4.5" strokeDasharray="8 92" strokeDashoffset="-92" />
                    </svg>
                    <div style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <strong style={{ fontSize: "1.1rem", color: "#0f172a" }}>₹ 12.4L</strong>
                      <span style={{ fontSize: "9px", color: "#64748b" }}>Total Sales</span>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "11px", color: "#64748b" }}>
                    <div>● Hair Care: <strong>32%</strong></div>
                    <div>● Hair Color: <strong>18%</strong></div>
                    <div>● Styling: <strong>14%</strong></div>
                    <div>● Skin Care: <strong>12%</strong></div>
                    <div>● Nail Care: <strong>8%</strong></div>
                    <div>● Tools: <strong>8%</strong></div>
                  </div>
                </div>
              </div>

              {/* Top Performing Categories, Top Brands & Top Salon Buyers */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
                {/* Top Categories */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.25rem", border: "1px solid #e2e8f0" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, margin: "0 0 1rem 0" }}>Top Performing Categories</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "11px" }}>
                    {[
                      { name: "Hair Care", orders: 98, rev: "₹ 3,98,120", growth: "↑ 32%" },
                      { name: "Hair Color", orders: 62, rev: "₹ 2,24,450", growth: "↑ 18%" },
                      { name: "Styling", orders: 48, rev: "₹ 1,72,300", growth: "↑ 26%" },
                      { name: "Skin Care", orders: 36, rev: "₹ 1,48,200", growth: "↑ 14%" },
                      { name: "Nail Care", orders: 28, rev: "₹ 98,650", growth: "↑ 12%" },
                    ].map((c, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f8fafc", paddingBottom: "6px" }}>
                        <div><strong>{i + 1}. {c.name}</strong> ({c.orders} orders)</div>
                        <div style={{ textAlign: "right" }}>
                          <div><strong>{c.rev}</strong></div>
                          <span style={{ color: "#16a34a", fontSize: "10px" }}>{c.growth}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Brands */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.25rem", border: "1px solid #e2e8f0" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, margin: "0 0 1rem 0" }}>Top Brands by Revenue</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "11px" }}>
                    {[
                      { name: "L'Oréal Professionnel", orders: 86, rev: "₹ 2,48,320" },
                      { name: "Wella Professionals", orders: 62, rev: "₹ 1,86,450" },
                      { name: "Schwarzkopf", orders: 54, rev: "₹ 1,42,800" },
                      { name: "Olaplex", orders: 38, rev: "₹ 98,600" },
                      { name: "Matrix", orders: 32, rev: "₹ 76,120" },
                    ].map((b, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f8fafc", paddingBottom: "6px" }}>
                        <div><strong>{i + 1}. {b.name}</strong> ({b.orders} orders)</div>
                        <div><strong>{b.rev}</strong></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Salon Buyers */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.25rem", border: "1px solid #e2e8f0" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, margin: "0 0 1rem 0" }}>Top 10 Salon Buyers</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "11px" }}>
                    {[
                      { name: "Glow Studio Salon", orders: 12, rev: "₹ 1,24,500" },
                      { name: "The Hair Lounge", orders: 9, rev: "₹ 98,320" },
                      { name: "Style & Scissors", orders: 8, rev: "₹ 76,800" },
                      { name: "Urban Touch Salon", orders: 7, rev: "₹ 68,420" },
                      { name: "Elite Beauty Hub", orders: 6, rev: "₹ 62,150" },
                    ].map((s, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f8fafc", paddingBottom: "6px" }}>
                        <div><strong>{i + 1}. {s.name}</strong> ({s.orders} orders)</div>
                        <div><strong>{s.rev}</strong></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 5: SALON VERIFICATIONS (USERS) */}
          {/* ================================================================= */}
          {activeTab === "verifications" && (
            <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "1.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Salon Verifications & Approvals</h1>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Review incoming business applications, verify trade licenses, and activate wholesale pricing.
                  </p>
                </div>

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
                      {st} {st === "pending" ? "(12)" : st === "approved" ? "(428)" : ""}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "12px" }} />
                <input
                  type="text"
                  placeholder="Search salons by name, brand, email, city, or GST number..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  style={{ width: "100%", padding: "0.65rem 1rem 0.65rem 2.6rem", border: "1.5px solid #e2e8f0", borderRadius: "8px", fontSize: "0.88rem", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc", color: "#64748b", fontWeight: 800 }}>
                      <th style={{ padding: "0.85rem 0.75rem" }}>Salon Name</th>
                      <th style={{ padding: "0.85rem 0.75rem" }}>Owner / Stylist</th>
                      <th style={{ padding: "0.85rem 0.75rem" }}>Location</th>
                      <th style={{ padding: "0.85rem 0.75rem" }}>GST / Trade Lic</th>
                      <th style={{ padding: "0.85rem 0.75rem" }}>Submitted Date</th>
                      <th style={{ padding: "0.85rem 0.75rem" }}>Status</th>
                      <th style={{ padding: "0.85rem 0.75rem", textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "0.85rem 0.75rem", fontWeight: 900, color: "#0f172a" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "28px", height: "28px", borderRadius: "6px", backgroundColor: "#0f172a", color: "#e5b95f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 900 }}>
                              {u.salonName.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div>{u.salonName}</div>
                              <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 500 }}>{u.businessType}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "0.85rem 0.75rem" }}>
                          <div style={{ fontWeight: 700, color: "#0f172a" }}>{u.name}</div>
                          <div style={{ fontSize: "11px", color: "#64748b" }}>{u.email}</div>
                          <div style={{ fontSize: "10px", color: "#94a3b8" }}>{u.phone}</div>
                        </td>
                        <td style={{ padding: "0.85rem 0.75rem", color: "#334155" }}>
                          <div>{u.city}, {u.state}</div>
                          <div style={{ fontSize: "10px", color: "#94a3b8" }}>PIN: {u.pincode}</div>
                        </td>
                        <td style={{ padding: "0.85rem 0.75rem", fontFamily: "monospace", color: "#64748b" }}>
                          {u.gstNumber || "Not Provided"}
                        </td>
                        <td style={{ padding: "0.85rem 0.75rem", color: "#64748b" }}>Oct 17, 2026</td>
                        <td style={{ padding: "0.85rem 0.75rem" }}>
                          <span style={{ backgroundColor: u.status === "approved" ? "#dcfce7" : "#fef3c7", color: u.status === "approved" ? "#16a34a" : "#b45309", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 800 }}>
                            {u.status === "approved" ? "Verified Pro" : "Pending Review"}
                          </span>
                        </td>
                        <td style={{ padding: "0.85rem 0.75rem", textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "6px" }}>
                            <button
                              onClick={() => setSelectedUserDetail(u)}
                              style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}
                            >
                              View
                            </button>
                            {u.status !== "approved" && (
                              <button
                                onClick={() => handleApproveUser(u.id)}
                                style={{ padding: "4px 10px", borderRadius: "4px", border: "none", backgroundColor: "#0f172a", color: "#fff", fontSize: "11px", fontWeight: 800, cursor: "pointer" }}
                              >
                                Approve
                              </button>
                            )}
                            {u.status !== "rejected" && (
                              <button
                                onClick={() => handleRejectUser(u.id)}
                                style={{ padding: "4px 8px", borderRadius: "4px", border: "none", backgroundColor: "#ef4444", color: "#fff", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}
                              >
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
            </div>
          )}

          {/* Fallback for Settings or Other Tabs */}
          {(activeTab === "customers" || activeTab === "inventory" || activeTab === "settings") && (
            <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "2.5rem", textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto", color: "#64748b" }}>
                <Settings size={24} />
              </div>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.5rem 0" }}>
                {activeTab === "customers" ? "All Registered Salon Clients" : activeTab === "inventory" ? "Central Wholesale Inventory" : "System Settings"}
              </h2>
              <p style={{ fontSize: "0.85rem", color: "#64748b", maxWidth: "500px", margin: "0 auto 1.5rem auto" }}>
                This section connects directly to your live wholesale database. Switch between Dashboard, Salon Verifications, Product Catalog, or Orders to view active tools.
              </p>
              <button
                onClick={() => setActiveTab("dashboard")}
                style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", border: "none", backgroundColor: "#0f172a", color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: "0.85rem" }}
              >
                Return to Dashboard Overview
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Salon Details Inspector Modal */}
      {selectedUserDetail && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 120, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "550px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "2rem", position: "relative", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
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
    </div>
  );
}
