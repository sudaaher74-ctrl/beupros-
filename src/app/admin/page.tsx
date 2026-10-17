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
  CheckCircle2,
  AlertTriangle,
  Percent,
  TrendingUp,
  Clock,
  Check,
  MoreVertical,
  Sliders
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
    "dashboard" | "verifications" | "catalog" | "orders" | "analytics" | "customers" | "inventory" | "coupons" | "settings"
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

  // --------------------------------------------------------------------------
  // CUSTOMERS (SALONS) STATE
  // --------------------------------------------------------------------------
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerStatusFilter, setCustomerStatusFilter] = useState("all");
  const [customerCityFilter, setCustomerCityFilter] = useState("all");
  const [customerTypeFilter, setCustomerTypeFilter] = useState("all");
  const [customerSort, setCustomerSort] = useState("newest");
  const [customerDrawerTab, setCustomerDrawerTab] = useState<"overview" | "orders" | "documents" | "notes" | "activity">("overview");
  const [selectedCustomer, setSelectedCustomer] = useState<{
    id: string;
    salonId: string;
    name: string;
    owner: string;
    phone: string;
    email: string;
    city: string;
    state: string;
    businessType: string;
    status: "approved" | "pending" | "rejected";
    gstNumber: string;
    tradeLicense: string;
    address: string;
    joinDate: string;
    totalOrders: number;
    totalSpend: number;
    avgOrderValue: number;
    avatarColor: string;
    recentOrders: { id: string; date: string; amount: number; items: number; status: string }[];
  } | null>(null);

  const [salonsList, setSalonsList] = useState([
    {
      id: "sln-1",
      salonId: "SLN-0428",
      name: "Glow Studio Salon",
      owner: "Priya Sharma",
      phone: "+91 98765 43210",
      email: "priya@glowstudio.com",
      city: "Mumbai",
      state: "Maharashtra",
      businessType: "Salon Chain (3 Branches)",
      status: "approved" as const,
      gstNumber: "27AABCG1234F1Z5",
      tradeLicense: "TL-MUM-2024-9981",
      address: "Plot 42, Road No. 36, Bandra West, Mumbai, MH - 400050",
      joinDate: "12 Oct 2026",
      totalOrders: 12,
      totalSpend: 124500,
      avgOrderValue: 10375,
      avatarColor: "#6366f1",
      recentOrders: [
        { id: "#BP-10045", date: "17 Oct 2026", amount: 28450, items: 4, status: "Dispatched" },
        { id: "#BP-10038", date: "10 Oct 2026", amount: 18200, items: 3, status: "Delivered" },
        { id: "#BP-10022", date: "28 Sep 2026", amount: 34800, items: 6, status: "Delivered" },
      ],
    },
    {
      id: "sln-2",
      salonId: "SLN-0427",
      name: "The Hair Lounge",
      owner: "Rohit Mehta",
      phone: "+91 98220 11223",
      email: "rohit@thehairlounge.in",
      city: "Pune",
      state: "Maharashtra",
      businessType: "Premium Hair Salon",
      status: "approved" as const,
      gstNumber: "27AABCR5566G1Z2",
      tradeLicense: "TL-PUN-2023-4412",
      address: "Shop 12, FC Road, Deccan Gymkhana, Pune, MH - 411004",
      joinDate: "10 Oct 2026",
      totalOrders: 9,
      totalSpend: 88400,
      avgOrderValue: 9822,
      avatarColor: "#ec4899",
      recentOrders: [
        { id: "#BP-10044", date: "17 Oct 2026", amount: 19820, items: 2, status: "Packing" },
        { id: "#BP-10031", date: "04 Oct 2026", amount: 24500, items: 5, status: "Delivered" },
      ],
    },
    {
      id: "sln-3",
      salonId: "SLN-0426",
      name: "Style & Scissors",
      owner: "Neha Verma",
      phone: "+91 98450 99887",
      email: "neha@stylescissors.com",
      city: "Bengaluru",
      state: "Karnataka",
      businessType: "Unisex Salon & Academy",
      status: "approved" as const,
      gstNumber: "29AABCS8899H1Z8",
      tradeLicense: "TL-BLR-2025-1109",
      address: "100 Feet Road, Indiranagar, Bengaluru, KA - 560038",
      joinDate: "08 Oct 2026",
      totalOrders: 14,
      totalSpend: 156800,
      avgOrderValue: 11200,
      avatarColor: "#10b981",
      recentOrders: [
        { id: "#BP-10043", date: "16 Oct 2026", amount: 12600, items: 3, status: "Confirmed" },
        { id: "#BP-10029", date: "02 Oct 2026", amount: 41200, items: 8, status: "Delivered" },
      ],
    },
    {
      id: "sln-4",
      salonId: "SLN-0425",
      name: "Urban Touch Salon",
      owner: "Amit Desai",
      phone: "+91 98980 33445",
      email: "amit@urbantouch.in",
      city: "Ahmedabad",
      state: "Gujarat",
      businessType: "Independent Salon",
      status: "approved" as const,
      gstNumber: "24AABCU9911K1Z3",
      tradeLicense: "TL-AHM-2024-7721",
      address: "SG Highway, Bodakdev, Ahmedabad, GJ - 380054",
      joinDate: "05 Oct 2026",
      totalOrders: 6,
      totalSpend: 52300,
      avgOrderValue: 8716,
      avatarColor: "#f59e0b",
      recentOrders: [
        { id: "#BP-10042", date: "16 Oct 2026", amount: 8900, items: 2, status: "Delivered" },
      ],
    },
    {
      id: "sln-5",
      salonId: "SLN-0424",
      name: "Toni & Guy Franchise",
      owner: "Kavita Patel",
      phone: "+91 98110 55443",
      email: "kavita@toniandguy-mumbai.com",
      city: "Mumbai",
      state: "Maharashtra",
      businessType: "Salon Chain (5 Branches)",
      status: "approved" as const,
      gstNumber: "27AABCT4411P1Z9",
      tradeLicense: "TL-MUM-2023-0182",
      address: "Linking Road, Khar West, Mumbai, MH - 400052",
      joinDate: "01 Oct 2026",
      totalOrders: 22,
      totalSpend: 284000,
      avgOrderValue: 12909,
      avatarColor: "#8b5cf6",
      recentOrders: [
        { id: "#BP-10040", date: "14 Oct 2026", amount: 46500, items: 9, status: "Delivered" },
      ],
    },
    {
      id: "sln-6",
      salonId: "SLN-0423",
      name: "Envi Salons Bandra",
      owner: "Farhan Akhtar",
      phone: "+91 98200 44991",
      email: "farhan@envisalons.in",
      city: "Mumbai",
      state: "Maharashtra",
      businessType: "Salon Chain (4 Branches)",
      status: "approved" as const,
      gstNumber: "27AABCE7722M1Z0",
      tradeLicense: "TL-MUM-2024-3382",
      address: "Hill Road, Bandra West, Mumbai, MH - 400050",
      joinDate: "28 Sep 2026",
      totalOrders: 18,
      totalSpend: 194200,
      avgOrderValue: 10788,
      avatarColor: "#06b6d4",
      recentOrders: [
        { id: "#BP-10037", date: "11 Oct 2026", amount: 31200, items: 5, status: "Delivered" },
      ],
    },
    {
      id: "sln-7",
      salonId: "SLN-0422",
      name: "Looks Salon CP",
      owner: "Sanjay Gupta",
      phone: "+91 98101 22334",
      email: "sanjay@lookssalon.com",
      city: "Delhi",
      state: "Delhi NCR",
      businessType: "Salon Chain (8 Branches)",
      status: "approved" as const,
      gstNumber: "07AABCL3399J1Z4",
      tradeLicense: "TL-DEL-2024-5541",
      address: "Inner Circle, Connaught Place, New Delhi - 110001",
      joinDate: "24 Sep 2026",
      totalOrders: 15,
      totalSpend: 168900,
      avgOrderValue: 11260,
      avatarColor: "#3b82f6",
      recentOrders: [
        { id: "#BP-10035", date: "09 Oct 2026", amount: 37400, items: 7, status: "Delivered" },
      ],
    },
    {
      id: "sln-8",
      salonId: "SLN-0421",
      name: "Mirror Mirror Beauty Bar",
      owner: "Simran Kaur",
      phone: "+91 98711 77665",
      email: "simran@mirrormirror.in",
      city: "Delhi",
      state: "Delhi NCR",
      businessType: "Spa & Salon",
      status: "pending" as const,
      gstNumber: "07AABCM6611N1Z2",
      tradeLicense: "TL-DEL-2025-9921",
      address: "GK-1 M Block Market, New Delhi - 110048",
      joinDate: "18 Sep 2026",
      totalOrders: 0,
      totalSpend: 0,
      avgOrderValue: 0,
      avatarColor: "#f97316",
      recentOrders: [],
    },
    {
      id: "sln-9",
      salonId: "SLN-0420",
      name: "Elite Hair Studio",
      owner: "Arjun Nair",
      phone: "+91 98490 88776",
      email: "arjun@elitehairstudio.com",
      city: "Hyderabad",
      state: "Telangana",
      businessType: "Independent Salon",
      status: "pending" as const,
      gstNumber: "36AABCE1122D1Z6",
      tradeLicense: "TL-HYD-2024-6651",
      address: "Jubilee Hills Road No. 10, Hyderabad, TS - 500033",
      joinDate: "15 Sep 2026",
      totalOrders: 0,
      totalSpend: 0,
      avgOrderValue: 0,
      avatarColor: "#14b8a6",
      recentOrders: [],
    },
    {
      id: "sln-10",
      salonId: "SLN-0419",
      name: "Bella Donna Spa & Salon",
      owner: "Pooja Kulkarni",
      phone: "+91 98230 44556",
      email: "pooja@belladonna.co.in",
      city: "Pune",
      state: "Maharashtra",
      businessType: "Spa & Salon",
      status: "rejected" as const,
      gstNumber: "27AABCB0000X1Z1",
      tradeLicense: "TL-PUN-2022-0012",
      address: "Koregaon Park North Main Road, Pune, MH - 411001",
      joinDate: "10 Sep 2026",
      totalOrders: 0,
      totalSpend: 0,
      avgOrderValue: 0,
      avatarColor: "#ef4444",
      recentOrders: [],
    },
  ]);

  // --------------------------------------------------------------------------
  // INVENTORY STATE
  // --------------------------------------------------------------------------
  const [inventorySearch, setInventorySearch] = useState("");
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState("All Categories");
  const [inventoryStockTab, setInventoryStockTab] = useState<"all" | "in_stock" | "low_stock" | "out_of_stock" | "discontinued">("all");
  const [isAdjustStockModalOpen, setIsAdjustStockModalOpen] = useState(false);
  const [adjustingStockItem, setAdjustingStockItem] = useState<{
    id: string;
    sku: string;
    name: string;
    category: string;
    currentStock: number;
    reorderLevel: number;
    warehouse: string;
    wholesalePrice: number;
  } | null>(null);
  const [stockAdjustUnits, setStockAdjustUnits] = useState(50);
  const [stockAdjustReorder, setStockAdjustReorder] = useState(25);
  const [stockAdjustReason, setStockAdjustReason] = useState("Restock Shipment Received");

  const [inventoryList, setInventoryList] = useState([
    {
      id: "inv-1",
      sku: "LP-0012",
      name: "L'Oréal Professionnel Absolut Repair Shampoo 1L",
      brand: "L'Oréal Professionnel",
      category: "Hair Care",
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300",
      warehouse: "Mumbai Central WH",
      currentStock: 142,
      reorderLevel: 25,
      wholesalePrice: 1350,
      mrp: 1950,
      status: "In Stock" as const,
    },
    {
      id: "inv-2",
      sku: "LP-0089",
      name: "L'Oréal Serie Expert Absolut Repair Mask 500ml",
      brand: "L'Oréal Professionnel",
      category: "Hair Care",
      image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=300",
      warehouse: "Mumbai Central WH",
      currentStock: 8,
      reorderLevel: 25,
      wholesalePrice: 1150,
      mrp: 1650,
      status: "Low Stock" as const,
    },
    {
      id: "inv-3",
      sku: "OL-0098",
      name: "Olaplex No. 3 Hair Perfector 100ml",
      brand: "Olaplex",
      category: "Hair Care",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300",
      warehouse: "Bengaluru Hub",
      currentStock: 64,
      reorderLevel: 20,
      wholesalePrice: 2450,
      mrp: 3200,
      status: "In Stock" as const,
    },
    {
      id: "inv-4",
      sku: "OL-0044",
      name: "Olaplex No. 4 Bond Maintenance Shampoo 1L",
      brand: "Olaplex",
      category: "Hair Care",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300",
      warehouse: "Mumbai Central WH",
      currentStock: 5,
      reorderLevel: 20,
      wholesalePrice: 3850,
      mrp: 4950,
      status: "Low Stock" as const,
    },
    {
      id: "inv-5",
      sku: "KR-0789",
      name: "Kérastase Discipline Oleo-Relax Mask 500ml",
      brand: "Kérastase",
      category: "Hair Care",
      image: "https://images.unsplash.com/photo-1608248597359-00f724d9c792?w=300",
      warehouse: "Mumbai Central WH",
      currentStock: 36,
      reorderLevel: 15,
      wholesalePrice: 2980,
      mrp: 4250,
      status: "In Stock" as const,
    },
    {
      id: "inv-6",
      sku: "SK-0451",
      name: "Schwarzkopf Igora Royal 6-0 Dark Blonde 60ml",
      brand: "Schwarzkopf",
      category: "Hair Color",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300",
      warehouse: "Delhi North WH",
      currentStock: 11,
      reorderLevel: 30,
      wholesalePrice: 420,
      mrp: 650,
      status: "Low Stock" as const,
    },
    {
      id: "inv-7",
      sku: "WL-0211",
      name: "Wella Professionals Blondor Multi Blonde Powder 800g",
      brand: "Wella",
      category: "Hair Color",
      image: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=300",
      warehouse: "Mumbai Central WH",
      currentStock: 0,
      reorderLevel: 15,
      wholesalePrice: 2150,
      mrp: 2900,
      status: "Out of Stock" as const,
    },
    {
      id: "inv-8",
      sku: "DY-9001",
      name: "Dyson Supersonic Pro Hair Dryer Silver/Nickel",
      brand: "Dyson",
      category: "Electrical",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300",
      warehouse: "Mumbai Central WH",
      currentStock: 0,
      reorderLevel: 5,
      wholesalePrice: 32500,
      mrp: 39900,
      status: "Out of Stock" as const,
    },
    {
      id: "inv-9",
      sku: "TIG-0034",
      name: "TIGI Bed Head Manipulator Texture Paste 100ml",
      brand: "TIGI",
      category: "Hair Styling",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300",
      warehouse: "Bengaluru Hub",
      currentStock: 85,
      reorderLevel: 20,
      wholesalePrice: 650,
      mrp: 950,
      status: "In Stock" as const,
    },
    {
      id: "inv-10",
      sku: "MO-0100",
      name: "Moroccanoil Treatment Original 100ml",
      brand: "Moroccanoil",
      category: "Hair Care",
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300",
      warehouse: "Mumbai Central WH",
      currentStock: 52,
      reorderLevel: 15,
      wholesalePrice: 2800,
      mrp: 3800,
      status: "In Stock" as const,
    },
    {
      id: "inv-11",
      sku: "O3-8821",
      name: "O3+ Bridal Facial Kit Oxygen Glow 120g",
      brand: "O3+",
      category: "Skin Care",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300",
      warehouse: "Delhi North WH",
      currentStock: 44,
      reorderLevel: 10,
      wholesalePrice: 3200,
      mrp: 4500,
      status: "In Stock" as const,
    },
  ]);

  // --------------------------------------------------------------------------
  // COUPONS & PRICING STATE
  // --------------------------------------------------------------------------
  const [couponSearch, setCouponSearch] = useState("");
  const [couponStatusFilter, setCouponStatusFilter] = useState("all");
  const [couponSubTab, setCouponSubTab] = useState<"coupons" | "tiers" | "bulk" | "special">("coupons");
  const [isCreateCouponDrawerOpen, setIsCreateCouponDrawerOpen] = useState(false);
  const [copiedCouponCode, setCopiedCouponCode] = useState<string | null>(null);

  const [newCouponForm, setNewCouponForm] = useState({
    code: "DIWALI25",
    name: "Diwali Salon Stockup Fest",
    type: "percentage" as "percentage" | "flat" | "free_shipping",
    discountValue: 20,
    minOrder: 15000,
    usageLimit: 500,
    perSalonLimit: 2,
    validFrom: "2026-10-15",
    validUntil: "2026-11-05",
    category: "All Categories",
    isActive: true,
  });

  const [couponsList, setCouponsList] = useState([
    {
      id: "cp-1",
      code: "BEUPROS10",
      name: "Wholesale Welcome Discount",
      type: "percentage",
      discountText: "10% OFF",
      discountValue: 10,
      minOrder: 5000,
      usageLimit: 500,
      usedCount: 124,
      validity: "01 Oct 2026 – 31 Oct 2026",
      status: "active" as const,
      category: "All Products",
    },
    {
      id: "cp-2",
      code: "SALON20",
      name: "Diwali Mega Salon Sale",
      type: "percentage",
      discountText: "20% OFF",
      discountValue: 20,
      minOrder: 15000,
      usageLimit: 1000,
      usedCount: 312,
      validity: "15 Oct 2026 – 05 Nov 2026",
      status: "active" as const,
      category: "Hair Care & Styling",
    },
    {
      id: "cp-3",
      code: "FREESHIP",
      name: "Free Wholesale Freight Pan-India",
      type: "free_shipping",
      discountText: "Free Delivery",
      discountValue: 0,
      minOrder: 3000,
      usageLimit: 1000,
      usedCount: 480,
      validity: "Ongoing Campaign",
      status: "active" as const,
      category: "All Orders",
    },
    {
      id: "cp-4",
      code: "FLAT500",
      name: "Flat Off First Pro Salon Order",
      type: "flat",
      discountText: "₹ 500 OFF",
      discountValue: 500,
      minOrder: 2500,
      usageLimit: 200,
      usedCount: 89,
      validity: "01 Oct 2026 – 31 Oct 2026",
      status: "active" as const,
      category: "All Products",
    },
    {
      id: "cp-5",
      code: "BULK15",
      name: "High-Volume Bulk Inventory Margin",
      type: "percentage",
      discountText: "15% OFF",
      discountValue: 15,
      minOrder: 25000,
      usageLimit: 100,
      usedCount: 45,
      validity: "Ongoing Campaign",
      status: "active" as const,
      category: "Hair Color & Shampoos",
    },
    {
      id: "cp-6",
      code: "FESTIVE26",
      name: "Pre-Festive Salon Restock",
      type: "percentage",
      discountText: "18% OFF",
      discountValue: 18,
      minOrder: 12000,
      usageLimit: 300,
      usedCount: 0,
      validity: "Starts 25 Oct 2026",
      status: "scheduled" as const,
      category: "All Products",
    },
    {
      id: "cp-7",
      code: "SUMMER26",
      name: "Summer Hair Hydration Promo",
      type: "percentage",
      discountText: "12% OFF",
      discountValue: 12,
      minOrder: 8000,
      usageLimit: 200,
      usedCount: 200,
      validity: "Expired 31 Aug 2026",
      status: "expired" as const,
      category: "Hair Masks",
    },
  ]);

  const [tierPricingRules, setTierPricingRules] = useState([
    {
      id: "tier-1",
      tierName: "Verified Pro Salon",
      badgeColor: "#10b981",
      minOrder: 2000,
      wholesaleMargin: "20% OFF MRP",
      freeShippingAbove: "₹ 5,000",
      paymentTerms: "Net 15 / Instant UPI",
      activeSalons: 384,
      status: true,
    },
    {
      id: "tier-2",
      tierName: "Salon Chain (3+ Outlets)",
      badgeColor: "#6366f1",
      minOrder: 10000,
      wholesaleMargin: "25% OFF MRP",
      freeShippingAbove: "Always Free",
      paymentTerms: "Net 30 Days Approved",
      activeSalons: 32,
      status: true,
    },
    {
      id: "tier-3",
      tierName: "Independent Salon",
      badgeColor: "#f59e0b",
      minOrder: 3000,
      wholesaleMargin: "18% OFF MRP",
      freeShippingAbove: "₹ 5,000",
      paymentTerms: "Instant UPI / COD",
      activeSalons: 64,
      status: true,
    },
    {
      id: "tier-4",
      tierName: "First-Time Salon Buyer",
      badgeColor: "#06b6d4",
      minOrder: 2000,
      wholesaleMargin: "15% OFF MRP + Gift",
      freeShippingAbove: "₹ 3,000",
      paymentTerms: "Instant UPI Pre-paid",
      activeSalons: 12,
      status: true,
    },
  ]);

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
            onClick={() => setActiveTab("coupons")}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.7rem 1rem",
              borderRadius: "8px",
              fontSize: "0.88rem",
              fontWeight: 700,
              backgroundColor: activeTab === "coupons" ? "#1e293b" : "transparent",
              color: activeTab === "coupons" ? "#ffffff" : "#94a3b8",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              gap: "12px",
            }}
          >
            <Tag size={17} color={activeTab === "coupons" ? "#818cf8" : "#64748b"} />
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

          {/* ===================================================================== */}
          {/* TAB: CUSTOMERS (SALONS) */}
          {/* ===================================================================== */}
          {activeTab === "customers" && (
            <div>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <div>
                  <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Customers (Salons)</h1>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Manage registered salon partners, verification status & wholesale accounts
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => alert("Exporting salons roster CSV...")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "0.6rem 1rem",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "#334155",
                      cursor: "pointer",
                    }}
                  >
                    <Download size={15} />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => {
                      alert("Opening Add Salon Form...");
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "0.6rem 1.15rem",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "#0f172a",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    <Plus size={15} />
                    <span>Add Salon</span>
                  </button>
                </div>
              </div>

              {/* Top 4 KPI Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b" }}>Total Customers</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Users size={16} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontSize: "1.7rem", fontWeight: 900, color: "#0f172a" }}>428</span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#16a34a", backgroundColor: "#dcfce7", padding: "2px 6px", borderRadius: "4px" }}>
                      ↑ 12% this month
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Active salon accounts</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b" }}>Verified Pro Salons</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontSize: "1.7rem", fontWeight: 900, color: "#0f172a" }}>384</span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#16a34a", backgroundColor: "#dcfce7", padding: "2px 6px", borderRadius: "4px" }}>
                      90% of total
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>With GST & Trade License</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b" }}>Pending Verification</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#fffbeb", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Clock size={16} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontSize: "1.7rem", fontWeight: 900, color: "#0f172a" }}>12</span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#b45309", backgroundColor: "#fef3c7", padding: "2px 6px", borderRadius: "4px" }}>
                      Action required
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Awaiting document review</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b" }}>Rejected Applications</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#fef2f2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <XCircle size={16} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontSize: "1.7rem", fontWeight: 900, color: "#0f172a" }}>32</span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#dc2626", backgroundColor: "#fee2e2", padding: "2px 6px", borderRadius: "4px" }}>
                      8% rejection rate
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Incomplete documents</div>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  padding: "0.85rem 1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: "260px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      padding: "0.45rem 0.8rem",
                      width: "100%",
                      maxWidth: "380px",
                    }}
                  >
                    <Search size={15} color="#94a3b8" />
                    <input
                      type="text"
                      placeholder="Search salons by name, owner, city, phone, GST..."
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        fontSize: "0.82rem",
                        width: "100%",
                        outline: "none",
                        color: "#0f172a",
                      }}
                    />
                    {customerSearch && (
                      <button onClick={() => setCustomerSearch("")} style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}>
                        <X size={13} color="#94a3b8" />
                      </button>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <select
                    value={customerStatusFilter}
                    onChange={(e) => setCustomerStatusFilter(e.target.value)}
                    style={{
                      padding: "0.5rem 0.85rem",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#334155",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <option value="all">All Status (428)</option>
                    <option value="approved">Verified Pro (384)</option>
                    <option value="pending">Pending (12)</option>
                    <option value="rejected">Rejected (32)</option>
                  </select>

                  <select
                    value={customerCityFilter}
                    onChange={(e) => setCustomerCityFilter(e.target.value)}
                    style={{
                      padding: "0.5rem 0.85rem",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#334155",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <option value="all">All Cities</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>

                  <select
                    value={customerTypeFilter}
                    onChange={(e) => setCustomerTypeFilter(e.target.value)}
                    style={{
                      padding: "0.5rem 0.85rem",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#334155",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <option value="all">All Business Types</option>
                    <option value="Chain">Salon Chain</option>
                    <option value="Independent">Independent Salon</option>
                    <option value="Spa">Spa & Salon</option>
                  </select>

                  <select
                    value={customerSort}
                    onChange={(e) => setCustomerSort(e.target.value)}
                    style={{
                      padding: "0.5rem 0.85rem",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#334155",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <option value="newest">Sort by: Newest First</option>
                    <option value="spend">Sort by: Highest Spend</option>
                    <option value="orders">Sort by: Most Orders</option>
                    <option value="name">Sort by: Alphabetical</option>
                  </select>
                </div>
              </div>

              {/* Salons List Table */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
                      <th style={{ padding: "0.85rem 1rem", width: "40px" }}>
                        <input type="checkbox" style={{ cursor: "pointer" }} />
                      </th>
                      <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Salon Name</th>
                      <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Owner / Stylist</th>
                      <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>City</th>
                      <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Business Type</th>
                      <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Join Date</th>
                      <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Status</th>
                      <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Total Orders</th>
                      <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Total Spend</th>
                      <th style={{ padding: "0.85rem 1rem", fontWeight: 700, textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salonsList
                      .filter((s) => {
                        const matchesSearch =
                          customerSearch === "" ||
                          s.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                          s.owner.toLowerCase().includes(customerSearch.toLowerCase()) ||
                          s.city.toLowerCase().includes(customerSearch.toLowerCase()) ||
                          s.phone.includes(customerSearch) ||
                          s.gstNumber.toLowerCase().includes(customerSearch.toLowerCase());
                        const matchesStatus = customerStatusFilter === "all" || s.status === customerStatusFilter;
                        const matchesCity = customerCityFilter === "all" || s.city.toLowerCase() === customerCityFilter.toLowerCase();
                        const matchesType = customerTypeFilter === "all" || s.businessType.toLowerCase().includes(customerTypeFilter.toLowerCase());
                        return matchesSearch && matchesStatus && matchesCity && matchesType;
                      })
                      .sort((a, b) => {
                        if (customerSort === "newest") return b.id.localeCompare(a.id);
                        if (customerSort === "spend") return b.totalSpend - a.totalSpend;
                        if (customerSort === "orders") return b.totalOrders - a.totalOrders;
                        return a.name.localeCompare(b.name);
                      })
                      .map((salon) => (
                        <tr
                          key={salon.id}
                          style={{
                            borderBottom: "1px solid #f1f5f9",
                            backgroundColor: selectedCustomer?.id === salon.id ? "#f8fafc" : "transparent",
                            transition: "background-color 0.15s ease",
                          }}
                        >
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <input type="checkbox" style={{ cursor: "pointer" }} />
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div
                                style={{
                                  width: "36px",
                                  height: "36px",
                                  borderRadius: "8px",
                                  backgroundColor: salon.avatarColor,
                                  color: "#ffffff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: 800,
                                  fontSize: "13px",
                                  flexShrink: 0,
                                }}
                              >
                                {salon.name.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div style={{ fontWeight: 800, color: "#0f172a" }}>{salon.name}</div>
                                <div style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "monospace" }}>{salon.salonId}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <div style={{ fontWeight: 600, color: "#1e293b" }}>{salon.owner}</div>
                            <div style={{ fontSize: "11px", color: "#64748b" }}>{salon.phone}</div>
                          </td>
                          <td style={{ padding: "0.85rem 1rem", color: "#334155", fontWeight: 600 }}>
                            {salon.city}, {salon.state.substring(0, 2).toUpperCase()}
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <span
                              style={{
                                backgroundColor: salon.businessType.includes("Chain") ? "#eff6ff" : "#f1f5f9",
                                color: salon.businessType.includes("Chain") ? "#2563eb" : "#475569",
                                padding: "3px 8px",
                                borderRadius: "4px",
                                fontSize: "11px",
                                fontWeight: 700,
                              }}
                            >
                              {salon.businessType}
                            </span>
                          </td>
                          <td style={{ padding: "0.85rem 1rem", color: "#64748b", whiteSpace: "nowrap" }}>{salon.joinDate}</td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <span
                              style={{
                                backgroundColor:
                                  salon.status === "approved" ? "#dcfce7" : salon.status === "pending" ? "#fef3c7" : "#fee2e2",
                                color:
                                  salon.status === "approved" ? "#16a34a" : salon.status === "pending" ? "#b45309" : "#dc2626",
                                padding: "3px 9px",
                                borderRadius: "9999px",
                                fontSize: "11px",
                                fontWeight: 800,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  backgroundColor:
                                    salon.status === "approved" ? "#16a34a" : salon.status === "pending" ? "#b45309" : "#dc2626",
                                }}
                              />
                              {salon.status === "approved" ? "Verified Pro" : salon.status === "pending" ? "Pending" : "Rejected"}
                            </span>
                          </td>
                          <td style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "#1e293b" }}>
                            {salon.totalOrders > 0 ? `${salon.totalOrders} orders` : "—"}
                          </td>
                          <td style={{ padding: "0.85rem 1rem", fontWeight: 800, color: "#0f172a" }}>
                            {salon.totalSpend > 0 ? `₹ ${salon.totalSpend.toLocaleString("en-IN")}` : "₹ 0"}
                          </td>
                          <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                            <div style={{ display: "inline-flex", gap: "6px" }}>
                              <button
                                onClick={() => setSelectedCustomer(salon)}
                                style={{
                                  padding: "0.4rem 0.85rem",
                                  borderRadius: "6px",
                                  border: "1px solid #e2e8f0",
                                  backgroundColor: "#ffffff",
                                  color: "#0f172a",
                                  fontSize: "0.78rem",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                }}
                              >
                                View
                              </button>
                              <button
                                onClick={() => setSelectedCustomer(salon)}
                                style={{
                                  padding: "0.4rem 0.5rem",
                                  borderRadius: "6px",
                                  border: "1px solid #e2e8f0",
                                  backgroundColor: "#ffffff",
                                  color: "#64748b",
                                  cursor: "pointer",
                                }}
                              >
                                <MoreVertical size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB: INVENTORY */}
          {/* ===================================================================== */}
          {activeTab === "inventory" && (
            <div>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <div>
                  <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Inventory Management</h1>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Track stock levels, reorder thresholds & warehouse valuation across all categories
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => alert("Exporting live inventory report CSV...")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "0.6rem 1rem",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "#334155",
                      cursor: "pointer",
                    }}
                  >
                    <Download size={15} />
                    <span>Export Inventory</span>
                  </button>
                  <button
                    onClick={() => {
                      if (inventoryList.length > 0) {
                        setAdjustingStockItem(inventoryList[0]);
                        setStockAdjustUnits(inventoryList[0].currentStock);
                        setStockAdjustReorder(inventoryList[0].reorderLevel);
                        setIsAdjustStockModalOpen(true);
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "0.6rem 1.15rem",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "#0f172a",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    <Sliders size={15} />
                    <span>Adjust Stock</span>
                  </button>
                </div>
              </div>

              {/* Top 4 KPI Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b" }}>Total Stock Value</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <TrendingUp size={16} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontSize: "1.7rem", fontWeight: 900, color: "#0f172a" }}>₹ 28,65,420</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#16a34a" }}>↑ 4.2%</span>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>Across all warehouses</span>
                  </div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b" }}>Total SKUs</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Boxes size={16} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontSize: "1.7rem", fontWeight: 900, color: "#0f172a" }}>4,236</span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#2563eb", backgroundColor: "#eff6ff", padding: "2px 6px", borderRadius: "4px" }}>
                      Active
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>In 8 product categories</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b" }}>Low Stock Items</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#fffbeb", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <AlertTriangle size={16} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontSize: "1.7rem", fontWeight: 900, color: "#0f172a" }}>68</span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#b45309", backgroundColor: "#fef3c7", padding: "2px 6px", borderRadius: "4px" }}>
                      Needs attention
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Below reorder threshold</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b" }}>Out of Stock</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#fef2f2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <XCircle size={16} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontSize: "1.7rem", fontWeight: 900, color: "#0f172a" }}>24</span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#dc2626", backgroundColor: "#fee2e2", padding: "2px 6px", borderRadius: "4px" }}>
                      Critical action
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>0 units available</div>
                </div>
              </div>

              {/* Status Tabs */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  borderBottom: "1px solid #e2e8f0",
                  marginBottom: "1.25rem",
                  paddingBottom: "2px",
                }}
              >
                {[
                  { id: "all", label: "All Products (4,236)" },
                  { id: "in_stock", label: "In Stock (3,982)" },
                  { id: "low_stock", label: "Low Stock (68)" },
                  { id: "out_of_stock", label: "Out of Stock (24)" },
                  { id: "discontinued", label: "Discontinued (12)" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setInventoryStockTab(t.id as any)}
                    style={{
                      padding: "0.55rem 1rem",
                      border: "none",
                      backgroundColor: "transparent",
                      borderBottom: inventoryStockTab === t.id ? "2px solid #0f172a" : "2px solid transparent",
                      color: inventoryStockTab === t.id ? "#0f172a" : "#64748b",
                      fontSize: "0.85rem",
                      fontWeight: inventoryStockTab === t.id ? 800 : 600,
                      cursor: "pointer",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* 2-Column Side-by-Side Layout */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.25rem", alignItems: "start" }}>
                {/* Main Table Column */}
                <div>
                  {/* Search and Category Filter */}
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      padding: "0.75rem 1rem",
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "0.45rem 0.8rem",
                        flex: 1,
                      }}
                    >
                      <Search size={15} color="#94a3b8" />
                      <input
                        type="text"
                        placeholder="Search SKU, product name, barcode..."
                        value={inventorySearch}
                        onChange={(e) => setInventorySearch(e.target.value)}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          fontSize: "0.82rem",
                          width: "100%",
                          outline: "none",
                          color: "#0f172a",
                        }}
                      />
                    </div>

                    <select
                      value={inventoryCategoryFilter}
                      onChange={(e) => setInventoryCategoryFilter(e.target.value)}
                      style={{
                        padding: "0.45rem 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#ffffff",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#334155",
                        cursor: "pointer",
                      }}
                    >
                      <option value="All Categories">All Categories</option>
                      <option value="Hair Care">Hair Care</option>
                      <option value="Hair Color">Hair Color</option>
                      <option value="Hair Styling">Hair Styling</option>
                      <option value="Skin Care">Skin Care</option>
                      <option value="Electrical">Electrical</option>
                    </select>
                  </div>

                  {/* Table */}
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
                          <th style={{ padding: "0.85rem 0.75rem", width: "35px" }}>
                            <input type="checkbox" style={{ cursor: "pointer" }} />
                          </th>
                          <th style={{ padding: "0.85rem 0.75rem", fontWeight: 700 }}>Product & SKU</th>
                          <th style={{ padding: "0.85rem 0.75rem", fontWeight: 700 }}>Category</th>
                          <th style={{ padding: "0.85rem 0.75rem", fontWeight: 700 }}>Warehouse</th>
                          <th style={{ padding: "0.85rem 0.75rem", fontWeight: 700 }}>Current Stock</th>
                          <th style={{ padding: "0.85rem 0.75rem", fontWeight: 700 }}>Reorder Level</th>
                          <th style={{ padding: "0.85rem 0.75rem", fontWeight: 700 }}>Stock Value</th>
                          <th style={{ padding: "0.85rem 0.75rem", fontWeight: 700 }}>Status</th>
                          <th style={{ padding: "0.85rem 0.75rem", fontWeight: 700, textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventoryList
                          .filter((item) => {
                            const matchesSearch =
                              inventorySearch === "" ||
                              item.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
                              item.sku.toLowerCase().includes(inventorySearch.toLowerCase()) ||
                              item.brand.toLowerCase().includes(inventorySearch.toLowerCase());
                            const matchesCategory =
                              inventoryCategoryFilter === "All Categories" || item.category === inventoryCategoryFilter;
                            const matchesStockTab =
                              inventoryStockTab === "all" ||
                              (inventoryStockTab === "in_stock" && item.status === "In Stock") ||
                              (inventoryStockTab === "low_stock" && item.status === "Low Stock") ||
                              (inventoryStockTab === "out_of_stock" && item.status === "Out of Stock");
                            return matchesSearch && matchesCategory && matchesStockTab;
                          })
                          .map((item) => {
                            const stockValue = item.currentStock * item.wholesalePrice;
                            return (
                              <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                <td style={{ padding: "0.75rem" }}>
                                  <input type="checkbox" style={{ cursor: "pointer" }} />
                                </td>
                                <td style={{ padding: "0.75rem" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <div style={{ width: "38px", height: "38px", borderRadius: "6px", overflow: "hidden", backgroundColor: "#f1f5f9", flexShrink: 0, position: "relative" }}>
                                      <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                                    </div>
                                    <div style={{ maxWidth: "230px" }}>
                                      <div style={{ fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {item.name}
                                      </div>
                                      <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace" }}>{item.sku}</div>
                                    </div>
                                  </div>
                                </td>
                                <td style={{ padding: "0.75rem", color: "#475569" }}>{item.category}</td>
                                <td style={{ padding: "0.75rem", color: "#64748b", fontSize: "11px" }}>{item.warehouse}</td>
                                <td style={{ padding: "0.75rem" }}>
                                  <span
                                    style={{
                                      fontWeight: 800,
                                      color: item.currentStock === 0 ? "#dc2626" : item.currentStock <= item.reorderLevel ? "#d97706" : "#16a34a",
                                    }}
                                  >
                                    {item.currentStock} units
                                  </span>
                                </td>
                                <td style={{ padding: "0.75rem", color: "#64748b" }}>{item.reorderLevel} units</td>
                                <td style={{ padding: "0.75rem", fontWeight: 800, color: "#0f172a" }}>
                                  ₹ {stockValue.toLocaleString("en-IN")}
                                </td>
                                <td style={{ padding: "0.75rem" }}>
                                  <span
                                    style={{
                                      backgroundColor:
                                        item.status === "In Stock" ? "#dcfce7" : item.status === "Low Stock" ? "#fef3c7" : "#fee2e2",
                                      color:
                                        item.status === "In Stock" ? "#16a34a" : item.status === "Low Stock" ? "#b45309" : "#dc2626",
                                      padding: "3px 8px",
                                      borderRadius: "9999px",
                                      fontSize: "11px",
                                      fontWeight: 800,
                                    }}
                                  >
                                    {item.status}
                                  </span>
                                </td>
                                <td style={{ padding: "0.75rem", textAlign: "right" }}>
                                  <button
                                    onClick={() => {
                                      setAdjustingStockItem(item);
                                      setStockAdjustUnits(item.currentStock);
                                      setStockAdjustReorder(item.reorderLevel);
                                      setIsAdjustStockModalOpen(true);
                                    }}
                                    style={{
                                      padding: "4px 8px",
                                      borderRadius: "4px",
                                      border: "1px solid #e2e8f0",
                                      backgroundColor: "#ffffff",
                                      color: "#0f172a",
                                      fontSize: "11px",
                                      fontWeight: 700,
                                      cursor: "pointer",
                                    }}
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
                </div>

                {/* Right Side Widgets Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {/* Widget 1: Inventory Overview Donut */}
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 1rem 0" }}>Inventory Overview</h3>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", height: "160px" }}>
                      <svg width="150" height="150" viewBox="0 0 100 100">
                        {/* Background track */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                        {/* In stock 94% */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#10b981"
                          strokeWidth="12"
                          strokeDasharray="236 251"
                          strokeDashoffset="0"
                          transform="rotate(-90 50 50)"
                        />
                        {/* Low stock 2% */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#f59e0b"
                          strokeWidth="12"
                          strokeDasharray="6 251"
                          strokeDashoffset="-236"
                          transform="rotate(-90 50 50)"
                        />
                        {/* Out of stock 1% */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#ef4444"
                          strokeWidth="12"
                          strokeDasharray="4 251"
                          strokeDashoffset="-242"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div style={{ position: "absolute", textAlign: "center" }}>
                        <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a" }}>4,236</div>
                        <div style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Total SKUs</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981" }} />
                          <span style={{ color: "#334155", fontWeight: 600 }}>In Stock</span>
                        </div>
                        <span style={{ fontWeight: 800, color: "#0f172a" }}>3,982 (94%)</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#f59e0b" }} />
                          <span style={{ color: "#334155", fontWeight: 600 }}>Low Stock</span>
                        </div>
                        <span style={{ fontWeight: 800, color: "#0f172a" }}>68 (2%)</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
                          <span style={{ color: "#334155", fontWeight: 600 }}>Out of Stock</span>
                        </div>
                        <span style={{ fontWeight: 800, color: "#0f172a" }}>24 (1%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Widget 2: Stock Value by Category */}
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 1rem 0" }}>Stock Value by Category</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {[
                        { cat: "Hair Care", val: "₹ 8,42,000", pct: 75, color: "#6366f1" },
                        { cat: "Hair Color", val: "₹ 5,21,000", pct: 55, color: "#8b5cf6" },
                        { cat: "Hair Styling", val: "₹ 4,10,000", pct: 44, color: "#ec4899" },
                        { cat: "Skin Care", val: "₹ 3,85,000", pct: 38, color: "#10b981" },
                        { cat: "Nail Care", val: "₹ 2,90,000", pct: 28, color: "#f59e0b" },
                        { cat: "Tools & Access.", val: "₹ 2,45,000", pct: 24, color: "#06b6d4" },
                        { cat: "Electrical", val: "₹ 1,72,420", pct: 18, color: "#3b82f6" },
                      ].map((c) => (
                        <div key={c.cat}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "3px" }}>
                            <span style={{ fontWeight: 600, color: "#475569" }}>{c.cat}</span>
                            <span style={{ fontWeight: 800, color: "#0f172a" }}>{c.val}</span>
                          </div>
                          <div style={{ height: "6px", backgroundColor: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                            <div style={{ width: `${c.pct}%`, height: "100%", backgroundColor: c.color, borderRadius: "9999px" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Widget 3: Low Stock Alerts */}
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
                      <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Low Stock Alerts (68)</h3>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#b45309", backgroundColor: "#fef3c7", padding: "2px 6px", borderRadius: "4px" }}>
                        Urgent
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {[
                        { name: "L'Oréal Serie Expert Mask 500ml", sku: "LP-0089", left: 8, min: 25 },
                        { name: "Olaplex No. 4 Shampoo 1L", sku: "OL-0044", left: 5, min: 20 },
                        { name: "Schwarzkopf Igora Royal 60ml", sku: "SK-0451", left: 11, min: 30 },
                      ].map((item, idx) => (
                        <div key={idx} style={{ padding: "0.6rem", borderRadius: "8px", backgroundColor: "#fffbeb", border: "1px solid #fef3c7", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div>
                            <div style={{ fontSize: "11px", fontWeight: 800, color: "#92400e" }}>{item.name}</div>
                            <div style={{ fontSize: "10px", color: "#b45309" }}>{item.left} left • Min threshold {item.min}</div>
                          </div>
                          <button
                            onClick={() => {
                              const match = inventoryList.find((i) => i.sku === item.sku);
                              if (match) {
                                setAdjustingStockItem(match);
                                setStockAdjustUnits(match.currentStock);
                                setStockAdjustReorder(match.reorderLevel);
                                setIsAdjustStockModalOpen(true);
                              }
                            }}
                            style={{ padding: "3px 8px", borderRadius: "4px", border: "none", backgroundColor: "#d97706", color: "#fff", fontSize: "10px", fontWeight: 800, cursor: "pointer" }}
                          >
                            Update
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Widget 4: Out of Stock Alerts */}
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
                      <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Out of Stock (24)</h3>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#dc2626", backgroundColor: "#fee2e2", padding: "2px 6px", borderRadius: "4px" }}>
                        Critical
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {[
                        { name: "Wella Blondor Powder 800g", sku: "WL-0211" },
                        { name: "Dyson Supersonic Pro Dryer", sku: "DY-9001" },
                      ].map((item, idx) => (
                        <div key={idx} style={{ padding: "0.6rem", borderRadius: "8px", backgroundColor: "#fef2f2", border: "1px solid #fee2e2", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div>
                            <div style={{ fontSize: "11px", fontWeight: 800, color: "#991b1b" }}>{item.name}</div>
                            <div style={{ fontSize: "10px", color: "#dc2626" }}>0 units left in warehouse</div>
                          </div>
                          <button
                            onClick={() => {
                              const match = inventoryList.find((i) => i.sku === item.sku);
                              if (match) {
                                setAdjustingStockItem(match);
                                setStockAdjustUnits(50);
                                setStockAdjustReorder(match.reorderLevel);
                                setIsAdjustStockModalOpen(true);
                              }
                            }}
                            style={{ padding: "3px 8px", borderRadius: "4px", border: "none", backgroundColor: "#dc2626", color: "#fff", fontSize: "10px", fontWeight: 800, cursor: "pointer" }}
                          >
                            Restock
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB: COUPONS & PRICING */}
          {/* ===================================================================== */}
          {activeTab === "coupons" && (
            <div>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <div>
                  <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Coupons & Pricing Rules</h1>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Manage wholesale discount codes, salon tier margins & promotional campaigns
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => alert("Exporting coupons roster CSV...")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "0.6rem 1rem",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "#334155",
                      cursor: "pointer",
                    }}
                  >
                    <Download size={15} />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => setIsCreateCouponDrawerOpen(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "0.6rem 1.15rem",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "#0f172a",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    <Plus size={15} />
                    <span>Create New Coupon</span>
                  </button>
                </div>
              </div>

              {/* Top 4 KPI Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b" }}>Total Coupons</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Tag size={16} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontSize: "1.7rem", fontWeight: 900, color: "#0f172a" }}>24</span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#16a34a", backgroundColor: "#dcfce7", padding: "2px 6px", borderRadius: "4px" }}>
                      +3 this month
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Configured promo codes</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b" }}>Active Coupons</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontSize: "1.7rem", fontWeight: 900, color: "#0f172a" }}>18</span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#16a34a", backgroundColor: "#dcfce7", padding: "2px 6px", borderRadius: "4px" }}>
                      Currently live
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Redeemable at checkout</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b" }}>Expired Coupons</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#f8fafc", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Clock size={16} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontSize: "1.7rem", fontWeight: 900, color: "#0f172a" }}>4</span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", backgroundColor: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>
                      Archived
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Past promotional campaigns</div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b" }}>Avg Discount Value</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#faf5ff", color: "#9333ea", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Percent size={16} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontSize: "1.7rem", fontWeight: 900, color: "#0f172a" }}>18%</span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#9333ea", backgroundColor: "#f3e8ff", padding: "2px 6px", borderRadius: "4px" }}>
                      ₹ 1,420 avg
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Across wholesale orders</div>
                </div>
              </div>

              {/* Sub-Tabs */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  borderBottom: "1px solid #e2e8f0",
                  marginBottom: "1.25rem",
                  paddingBottom: "2px",
                }}
              >
                {[
                  { id: "coupons", label: "Coupons (24)" },
                  { id: "tiers", label: "Wholesale Tier Pricing" },
                  { id: "bulk", label: "Bulk Quantity Discounts" },
                  { id: "special", label: "Special Offers" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setCouponSubTab(t.id as any)}
                    style={{
                      padding: "0.55rem 1rem",
                      border: "none",
                      backgroundColor: "transparent",
                      borderBottom: couponSubTab === t.id ? "2px solid #0f172a" : "2px solid transparent",
                      color: couponSubTab === t.id ? "#0f172a" : "#64748b",
                      fontSize: "0.85rem",
                      fontWeight: couponSubTab === t.id ? 800 : 600,
                      cursor: "pointer",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Active SubTab: Coupons Table */}
              {couponSubTab === "coupons" && (
                <div>
                  {/* Search and Status Filter */}
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      padding: "0.75rem 1rem",
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "0.45rem 0.8rem",
                        width: "360px",
                      }}
                    >
                      <Search size={15} color="#94a3b8" />
                      <input
                        type="text"
                        placeholder="Search by coupon code, campaign name..."
                        value={couponSearch}
                        onChange={(e) => setCouponSearch(e.target.value)}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          fontSize: "0.82rem",
                          width: "100%",
                          outline: "none",
                          color: "#0f172a",
                        }}
                      />
                    </div>

                    <select
                      value={couponStatusFilter}
                      onChange={(e) => setCouponStatusFilter(e.target.value)}
                      style={{
                        padding: "0.45rem 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#ffffff",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#334155",
                        cursor: "pointer",
                      }}
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>

                  {/* Coupons Table */}
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: "2rem" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Coupon Code</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Campaign Name</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Discount</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Min. Order</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Usage Limit</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Validity Range</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Status</th>
                          <th style={{ padding: "0.85rem 1rem", fontWeight: 700, textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {couponsList
                          .filter((cp) => {
                            const matchesSearch =
                              couponSearch === "" ||
                              cp.code.toLowerCase().includes(couponSearch.toLowerCase()) ||
                              cp.name.toLowerCase().includes(couponSearch.toLowerCase());
                            const matchesStatus = couponStatusFilter === "all" || cp.status === couponStatusFilter;
                            return matchesSearch && matchesStatus;
                          })
                          .map((coupon) => (
                            <tr key={coupon.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "0.85rem 1rem" }}>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                  <span
                                    style={{
                                      fontFamily: "monospace",
                                      fontWeight: 800,
                                      fontSize: "12px",
                                      backgroundColor: "#f1f5f9",
                                      color: "#0f172a",
                                      padding: "4px 8px",
                                      borderRadius: "6px",
                                      border: "1px solid #e2e8f0",
                                      letterSpacing: "0.05em",
                                    }}
                                  >
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
                              <td style={{ padding: "0.85rem 1rem" }}>
                                <div style={{ fontWeight: 700, color: "#0f172a" }}>{coupon.name}</div>
                                <div style={{ fontSize: "11px", color: "#64748b" }}>{coupon.category}</div>
                              </td>
                              <td style={{ padding: "0.85rem 1rem" }}>
                                <span style={{ fontWeight: 800, color: "#2563eb", backgroundColor: "#eff6ff", padding: "3px 8px", borderRadius: "4px" }}>
                                  {coupon.discountText}
                                </span>
                              </td>
                              <td style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "#1e293b" }}>
                                ₹ {coupon.minOrder.toLocaleString("en-IN")}
                              </td>
                              <td style={{ padding: "0.85rem 1rem" }}>
                                <div style={{ fontSize: "11px", color: "#475569", marginBottom: "4px" }}>
                                  {coupon.usedCount} / {coupon.usageLimit} used
                                </div>
                                <div style={{ height: "5px", width: "100px", backgroundColor: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                                  <div
                                    style={{
                                      width: `${Math.min(100, (coupon.usedCount / coupon.usageLimit) * 100)}%`,
                                      height: "100%",
                                      backgroundColor: "#0f172a",
                                      borderRadius: "9999px",
                                    }}
                                  />
                                </div>
                              </td>
                              <td style={{ padding: "0.85rem 1rem", color: "#64748b", fontSize: "11px", whiteSpace: "nowrap" }}>
                                {coupon.validity}
                              </td>
                              <td style={{ padding: "0.85rem 1rem" }}>
                                <span
                                  style={{
                                    backgroundColor:
                                      coupon.status === "active" ? "#dcfce7" : coupon.status === "scheduled" ? "#dbeafe" : "#f1f5f9",
                                    color:
                                      coupon.status === "active" ? "#16a34a" : coupon.status === "scheduled" ? "#2563eb" : "#64748b",
                                    padding: "3px 8px",
                                    borderRadius: "9999px",
                                    fontSize: "11px",
                                    fontWeight: 800,
                                  }}
                                >
                                  {coupon.status === "active" ? "Active" : coupon.status === "scheduled" ? "Scheduled" : "Expired"}
                                </span>
                              </td>
                              <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                                <div style={{ display: "inline-flex", gap: "6px" }}>
                                  <button
                                    onClick={() => alert(`Editing coupon ${coupon.code}`)}
                                    style={{ padding: "4px 6px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", cursor: "pointer", color: "#475569" }}
                                  >
                                    <Edit2 size={13} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (confirm(`Delete coupon ${coupon.code}?`)) {
                                        setCouponsList((prev) => prev.filter((c) => c.id !== coupon.id));
                                      }
                                    }}
                                    style={{ padding: "4px 6px", borderRadius: "4px", border: "1px solid #fee2e2", backgroundColor: "#fff", cursor: "pointer", color: "#dc2626" }}
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Wholesale Pricing Rules Summary Widget */}
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                      <div>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Wholesale Salon Tier Margins</h3>
                        <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "2px 0 0 0" }}>
                          Automatic pricing rules applied at checkout based on verified salon tier
                        </p>
                      </div>
                      <button
                        onClick={() => alert("Tier margin manager")}
                        style={{ padding: "0.45rem 0.9rem", borderRadius: "6px", border: "1px solid #e2e8f0", backgroundColor: "#fff", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}
                      >
                        Edit Tier Rules
                      </button>
                    </div>

                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700 }}>Salon Tier</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700 }}>Min. Order</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700 }}>Wholesale Margin</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700 }}>Free Freight</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700 }}>Payment Terms</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700 }}>Active Salons</th>
                          <th style={{ padding: "0.75rem 1rem", fontWeight: 700 }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tierPricingRules.map((tier) => (
                          <tr key={tier.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "0.85rem 1rem" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: tier.badgeColor }} />
                                <span style={{ fontWeight: 800, color: "#0f172a" }}>{tier.tierName}</span>
                              </div>
                            </td>
                            <td style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "#334155" }}>
                              ₹ {tier.minOrder.toLocaleString("en-IN")}
                            </td>
                            <td style={{ padding: "0.85rem 1rem" }}>
                              <span style={{ fontWeight: 800, color: "#16a34a", backgroundColor: "#dcfce7", padding: "3px 8px", borderRadius: "4px" }}>
                                {tier.wholesaleMargin}
                              </span>
                            </td>
                            <td style={{ padding: "0.85rem 1rem", color: "#475569", fontWeight: 600 }}>{tier.freeShippingAbove}</td>
                            <td style={{ padding: "0.85rem 1rem", color: "#64748b" }}>{tier.paymentTerms}</td>
                            <td style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "#1e293b" }}>{tier.activeSalons} salons</td>
                            <td style={{ padding: "0.85rem 1rem" }}>
                              <span style={{ fontSize: "11px", fontWeight: 800, color: "#16a34a", backgroundColor: "#dcfce7", padding: "2px 7px", borderRadius: "9999px" }}>
                                Active
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SubTab: Tier Pricing */}
              {couponSubTab === "tiers" && (
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 1rem 0" }}>Salon Tier Margin Settings</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>
                    Configure automatic wholesale discounting tiers for independent salons, chains, and new verified buyers.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                    {tierPricingRules.map((tier) => (
                      <div key={tier.id} style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.2rem", backgroundColor: "#f8fafc" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                          <span style={{ fontWeight: 800, color: "#0f172a", fontSize: "0.95rem" }}>{tier.tierName}</span>
                          <span style={{ backgroundColor: "#dcfce7", color: "#16a34a", fontSize: "11px", fontWeight: 800, padding: "2px 7px", borderRadius: "4px" }}>
                            {tier.wholesaleMargin}
                          </span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#475569" }}>
                          <div>Min Order: <strong>₹ {tier.minOrder.toLocaleString("en-IN")}</strong></div>
                          <div>Free Freight: <strong>{tier.freeShippingAbove}</strong></div>
                          <div>Terms: <strong>{tier.paymentTerms}</strong></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other subtabs */}
              {(couponSubTab === "bulk" || couponSubTab === "special") && (
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "2.5rem", textAlign: "center" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.5rem 0" }}>
                    {couponSubTab === "bulk" ? "Bulk Volume Discount Tiers" : "Special Seasonal Deals"}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", maxWidth: "450px", margin: "0 auto" }}>
                    Configure quantity breaks (e.g. 5% extra on 10+ cases, 10% on 25+ cases) to encourage high-volume salon stocking.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB: SETTINGS */}
          {/* ===================================================================== */}
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

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
                <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.2rem", backgroundColor: "#f8fafc" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.5rem 0" }}>Store Identity</h3>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 1rem 0" }}>Store name, brand logos, support contact</p>
                  <button onClick={() => alert("Configured")} style={{ padding: "0.45rem 0.9rem", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff", fontWeight: 700, fontSize: "11px", cursor: "pointer" }}>
                    Configure Store
                  </button>
                </div>

                <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.2rem", backgroundColor: "#f8fafc" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.5rem 0" }}>GST & Invoicing</h3>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 1rem 0" }}>Tax slabs (18% GST), HSN codes, invoice prefixes</p>
                  <button onClick={() => alert("Configured")} style={{ padding: "0.45rem 0.9rem", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff", fontWeight: 700, fontSize: "11px", cursor: "pointer" }}>
                    Manage Taxes
                  </button>
                </div>

                <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.2rem", backgroundColor: "#f8fafc" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.5rem 0" }}>Shipping & Delivery</h3>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 1rem 0" }}>Delhivery & Blue Dart API integration, tracking links</p>
                  <button onClick={() => alert("Configured")} style={{ padding: "0.45rem 0.9rem", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff", fontWeight: 700, fontSize: "11px", cursor: "pointer" }}>
                    Courier Settings
                  </button>
                </div>
              </div>
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
      {/* Customer (Salon) Inspector Right Drawer */}
      {selectedCustomer && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 100,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              backgroundColor: "#ffffff",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-10px 0 25px rgba(0,0,0,0.15)",
            }}
          >
            {/* Header */}
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: selectedCustomer.avatarColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px" }}>
                  {selectedCustomer.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{selectedCustomer.name}</h2>
                    <span style={{ fontSize: "10px", fontWeight: 800, color: selectedCustomer.status === "approved" ? "#16a34a" : selectedCustomer.status === "pending" ? "#b45309" : "#dc2626", backgroundColor: selectedCustomer.status === "approved" ? "#dcfce7" : selectedCustomer.status === "pending" ? "#fef3c7" : "#fee2e2", padding: "2px 6px", borderRadius: "4px" }}>
                      {selectedCustomer.status === "approved" ? "Verified Pro" : selectedCustomer.status === "pending" ? "Pending" : "Rejected"}
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                    {selectedCustomer.salonId} • Joined {selectedCustomer.joinDate}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            {/* Sub-Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0", padding: "0 1.5rem", gap: "1.5rem", backgroundColor: "#f8fafc" }}>
              {[
                { id: "overview", label: "Overview" },
                { id: "orders", label: `Orders (${selectedCustomer.totalOrders})` },
                { id: "documents", label: "Documents (2)" },
                { id: "notes", label: "Notes" },
                { id: "activity", label: "Activity" },
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

            {/* Drawer Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
              {customerDrawerTab === "overview" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {/* Basic Information */}
                  <div style={{ backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "1.1rem" }}>
                    <h3 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.85rem 0", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      Basic Information
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.85rem", fontSize: "12px" }}>
                      <div>
                        <span style={{ color: "#64748b", display: "block" }}>Owner / Stylist</span>
                        <strong style={{ color: "#0f172a" }}>{selectedCustomer.owner}</strong>
                      </div>
                      <div>
                        <span style={{ color: "#64748b", display: "block" }}>Contact Phone</span>
                        <strong style={{ color: "#0f172a" }}>{selectedCustomer.phone}</strong>
                      </div>
                      <div>
                        <span style={{ color: "#64748b", display: "block" }}>Email</span>
                        <strong style={{ color: "#0f172a" }}>{selectedCustomer.email}</strong>
                      </div>
                      <div>
                        <span style={{ color: "#64748b", display: "block" }}>Business Type</span>
                        <strong style={{ color: "#0f172a" }}>{selectedCustomer.businessType}</strong>
                      </div>
                      <div>
                        <span style={{ color: "#64748b", display: "block" }}>GST Number</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <strong style={{ color: "#0f172a", fontFamily: "monospace" }}>{selectedCustomer.gstNumber}</strong>
                          <button onClick={() => navigator.clipboard?.writeText(selectedCustomer.gstNumber)} style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b" }}>
                            <Copy size={11} />
                          </button>
                        </div>
                      </div>
                      <div>
                        <span style={{ color: "#64748b", display: "block" }}>Trade License</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <strong style={{ color: "#0f172a", fontFamily: "monospace" }}>{selectedCustomer.tradeLicense}</strong>
                          <button onClick={() => navigator.clipboard?.writeText(selectedCustomer.tradeLicense)} style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b" }}>
                            <Copy size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: "0.85rem", paddingTop: "0.75rem", borderTop: "1px solid #e2e8f0", fontSize: "12px" }}>
                      <span style={{ color: "#64748b", display: "block" }}>Salon Address</span>
                      <strong style={{ color: "#0f172a" }}>{selectedCustomer.address}</strong>
                    </div>
                  </div>

                  {/* Business Activity */}
                  <div>
                    <h3 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.85rem 0", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      Business Activity
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
                      <div style={{ backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "0.85rem" }}>
                        <span style={{ fontSize: "11px", color: "#64748b" }}>Total Orders</span>
                        <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>{selectedCustomer.totalOrders}</div>
                      </div>
                      <div style={{ backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "0.85rem" }}>
                        <span style={{ fontSize: "11px", color: "#64748b" }}>Total Spend</span>
                        <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>₹ {selectedCustomer.totalSpend.toLocaleString("en-IN")}</div>
                      </div>
                      <div style={{ backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "0.85rem" }}>
                        <span style={{ fontSize: "11px", color: "#64748b" }}>Avg Order Value</span>
                        <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>₹ {selectedCustomer.avgOrderValue.toLocaleString("en-IN")}</div>
                      </div>
                      <div style={{ backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "0.85rem" }}>
                        <span style={{ fontSize: "11px", color: "#64748b" }}>Customer Since</span>
                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginTop: "5px" }}>Oct 2026</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders Section */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                      <h3 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        Recent Orders
                      </h3>
                      <button onClick={() => setCustomerDrawerTab("orders")} style={{ border: "none", background: "none", fontSize: "11px", fontWeight: 700, color: "#2563eb", cursor: "pointer" }}>
                        View all {selectedCustomer.totalOrders} orders
                      </button>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {selectedCustomer.recentOrders.map((ord) => (
                        <div
                          key={ord.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                            backgroundColor: "#ffffff",
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "12px", fontFamily: "monospace" }}>{ord.id}</div>
                            <div style={{ fontSize: "11px", color: "#64748b" }}>{ord.date} • {ord.items} items</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "12px" }}>₹ {ord.amount.toLocaleString("en-IN")}</div>
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: 800,
                                color: ord.status === "Delivered" ? "#16a34a" : "#2563eb",
                                backgroundColor: ord.status === "Delivered" ? "#dcfce7" : "#eff6ff",
                                padding: "2px 6px",
                                borderRadius: "4px",
                              }}
                            >
                              {ord.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {customerDrawerTab === "orders" && (
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 1rem 0" }}>All Orders History</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {selectedCustomer.recentOrders.map((ord) => (
                      <div key={ord.id} style={{ padding: "0.85rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <strong style={{ fontFamily: "monospace", color: "#0f172a" }}>{ord.id}</strong>
                          <div style={{ fontSize: "11px", color: "#64748b" }}>Placed on {ord.date}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <strong style={{ color: "#0f172a" }}>₹ {ord.amount.toLocaleString("en-IN")}</strong>
                          <div style={{ fontSize: "11px", color: "#16a34a", fontWeight: 700 }}>{ord.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {customerDrawerTab === "documents" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1rem", backgroundColor: "#f8fafc" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <strong style={{ color: "#0f172a", fontSize: "12px" }}>Trade License Certificate</strong>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>{selectedCustomer.tradeLicense} (Verified)</div>
                      </div>
                      <button onClick={() => alert("Viewing Trade License Document...")} style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>
                        View
                      </button>
                    </div>
                  </div>

                  <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1rem", backgroundColor: "#f8fafc" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <strong style={{ color: "#0f172a", fontSize: "12px" }}>GST Registration Certificate</strong>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>{selectedCustomer.gstNumber} (Verified)</div>
                      </div>
                      <button onClick={() => alert("Viewing GST Certificate...")} style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>
                        View
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {customerDrawerTab === "notes" && (
                <div>
                  <textarea
                    placeholder="Add internal notes about this salon customer..."
                    style={{ width: "100%", height: "120px", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px", outline: "none" }}
                    defaultValue="VIP wholesale partner. Prefers delivery between 9 AM and 11 AM before clients arrive."
                  />
                  <button onClick={() => alert("Notes saved successfully")} style={{ marginTop: "8px", padding: "0.5rem 1rem", borderRadius: "6px", border: "none", backgroundColor: "#0f172a", color: "#fff", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>
                    Save Note
                  </button>
                </div>
              )}

              {customerDrawerTab === "activity" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "12px", color: "#475569" }}>
                  <div>• Order #BP-10045 dispatched on Oct 17, 2026</div>
                  <div>• Wholesale credit limit verified on Oct 12, 2026</div>
                  <div>• Salon account approved as Verified Pro on Oct 12, 2026</div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #e2e8f0", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setSelectedCustomer(null)}
                style={{ padding: "0.55rem 1.1rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}
              >
                Close
              </button>
              <button
                onClick={() => alert(`Message sent to ${selectedCustomer.owner}`)}
                style={{ padding: "0.55rem 1.15rem", borderRadius: "8px", border: "none", backgroundColor: "#0f172a", color: "#ffffff", fontWeight: 800, fontSize: "12px", cursor: "pointer" }}
              >
                Contact Salon
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Adjust Stock Modal */}
      {isAdjustStockModalOpen && adjustingStockItem && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 120, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "480px", width: "100%", padding: "1.75rem", position: "relative" }}>
            <button onClick={() => setIsAdjustStockModalOpen(false)} style={{ position: "absolute", right: "1.25rem", top: "1.25rem", background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
              <X size={18} />
            </button>

            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px 0" }}>Update Warehouse Stock</h3>
            <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 1.25rem 0" }}>
              {adjustingStockItem.name} ({adjustingStockItem.sku})
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                  Current Physical Units in Warehouse
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    onClick={() => setStockAdjustUnits((u) => Math.max(0, u - 10))}
                    style={{ padding: "0.5rem 0.85rem", borderRadius: "6px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", fontWeight: 800, cursor: "pointer" }}
                  >
                    -10
                  </button>
                  <input
                    type="number"
                    value={stockAdjustUnits}
                    onChange={(e) => setStockAdjustUnits(parseInt(e.target.value) || 0)}
                    style={{ flex: 1, padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px", fontWeight: 800, textAlign: "center" }}
                  />
                  <button
                    onClick={() => setStockAdjustUnits((u) => u + 10)}
                    style={{ padding: "0.5rem 0.85rem", borderRadius: "6px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", fontWeight: 800, cursor: "pointer" }}
                  >
                    +10
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                  Reorder Threshold Level (Alert Trigger)
                </label>
                <input
                  type="number"
                  value={stockAdjustReorder}
                  onChange={(e) => setStockAdjustReorder(parseInt(e.target.value) || 0)}
                  style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                  Reason for Stock Adjustment
                </label>
                <select
                  value={stockAdjustReason}
                  onChange={(e) => setStockAdjustReason(e.target.value)}
                  style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                >
                  <option value="Restock Shipment Received">Restock Shipment Received</option>
                  <option value="Physical Audit Count">Physical Inventory Audit Count</option>
                  <option value="Damaged / Expired Goods">Damaged or Expired Goods Written Off</option>
                  <option value="Inter-Warehouse Transfer">Inter-Warehouse Transfer</option>
                </select>
              </div>

              <div style={{ backgroundColor: "#f8fafc", padding: "0.85rem", borderRadius: "8px", fontSize: "12px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>New Stock Value:</span>
                <strong style={{ color: "#0f172a" }}>
                  ₹ {(stockAdjustUnits * adjustingStockItem.wholesalePrice).toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "1.5rem" }}>
              <button
                onClick={() => setIsAdjustStockModalOpen(false)}
                style={{ padding: "0.55rem 1.1rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#fff", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setInventoryList((prev) =>
                    prev.map((item) =>
                      item.id === adjustingStockItem.id
                        ? {
                            ...item,
                            currentStock: stockAdjustUnits,
                            reorderLevel: stockAdjustReorder,
                            status: stockAdjustUnits === 0 ? "Out of Stock" : stockAdjustUnits <= stockAdjustReorder ? "Low Stock" : "In Stock",
                          }
                        : item
                    )
                  );
                  setIsAdjustStockModalOpen(false);
                }}
                style={{ padding: "0.55rem 1.25rem", borderRadius: "8px", border: "none", backgroundColor: "#0f172a", color: "#fff", fontWeight: 800, fontSize: "12px", cursor: "pointer" }}
              >
                Apply Adjustment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Coupon Right Drawer */}
      {isCreateCouponDrawerOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: "100%", maxWidth: "480px", backgroundColor: "#ffffff", height: "100vh", display: "flex", flexDirection: "column", boxShadow: "-10px 0 25px rgba(0,0,0,0.15)" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Create New Coupon</h2>
                <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "2px 0 0 0" }}>Set up a new wholesale discount code</p>
              </div>
              <button onClick={() => setIsCreateCouponDrawerOpen(false)} style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Coupon Code</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    value={newCouponForm.code}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. FESTIVE20"
                    style={{ flex: 1, padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", fontFamily: "monospace", fontWeight: 800 }}
                  />
                  <button
                    onClick={() => {
                      const randomCode = `PRO${Math.floor(100 + Math.random() * 900)}`;
                      setNewCouponForm({ ...newCouponForm, code: randomCode });
                    }}
                    style={{ padding: "0.55rem 0.85rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Campaign Name</label>
                <input
                  type="text"
                  value={newCouponForm.name}
                  onChange={(e) => setNewCouponForm({ ...newCouponForm, name: e.target.value })}
                  placeholder="e.g. Diwali Salon Restock Fest"
                  style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
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
                    placeholder="20"
                    style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", fontWeight: 700 }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Min. Order Value (₹)</label>
                  <input
                    type="number"
                    value={newCouponForm.minOrder}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, minOrder: parseInt(e.target.value) || 0 })}
                    placeholder="5000"
                    style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Total Usage Limit</label>
                  <input
                    type="number"
                    value={newCouponForm.usageLimit}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, usageLimit: parseInt(e.target.value) || 0 })}
                    placeholder="500"
                    style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Valid From</label>
                  <input
                    type="date"
                    value={newCouponForm.validFrom}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, validFrom: e.target.value })}
                    style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Valid Until</label>
                  <input
                    type="date"
                    value={newCouponForm.validUntil}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, validUntil: e.target.value })}
                    style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>Applicable Category</label>
                <select
                  value={newCouponForm.category}
                  onChange={(e) => setNewCouponForm({ ...newCouponForm, category: e.target.value })}
                  style={{ width: "100%", padding: "0.55rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                >
                  <option value="All Categories">All Categories & Products</option>
                  <option value="Hair Care">Hair Care Only</option>
                  <option value="Hair Color">Hair Color Only</option>
                  <option value="Skin Care">Skin Care Only</option>
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
                <input
                  type="checkbox"
                  id="activeToggle"
                  checked={newCouponForm.isActive}
                  onChange={(e) => setNewCouponForm({ ...newCouponForm, isActive: e.target.checked })}
                  style={{ cursor: "pointer" }}
                />
                <label htmlFor="activeToggle" style={{ fontSize: "12px", fontWeight: 700, color: "#334155", cursor: "pointer" }}>
                  Activate immediately upon creation
                </label>
              </div>
            </div>

            <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #e2e8f0", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setIsCreateCouponDrawerOpen(false)}
                style={{ padding: "0.55rem 1.1rem", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newCp = {
                    id: `cp-${Date.now()}`,
                    code: newCouponForm.code,
                    name: newCouponForm.name,
                    type: newCouponForm.type,
                    discountText:
                      newCouponForm.type === "percentage"
                        ? `${newCouponForm.discountValue}% OFF`
                        : newCouponForm.type === "flat"
                        ? `₹ ${newCouponForm.discountValue} OFF`
                        : "Free Delivery",
                    discountValue: newCouponForm.discountValue,
                    minOrder: newCouponForm.minOrder,
                    usageLimit: newCouponForm.usageLimit,
                    usedCount: 0,
                    validity: `${newCouponForm.validFrom} – ${newCouponForm.validUntil}`,
                    status: newCouponForm.isActive ? ("active" as const) : ("scheduled" as const),
                    category: newCouponForm.category,
                  };
                  setCouponsList([newCp, ...couponsList]);
                  setIsCreateCouponDrawerOpen(false);
                }}
                style={{ padding: "0.55rem 1.25rem", borderRadius: "8px", border: "none", backgroundColor: "#0f172a", color: "#ffffff", fontWeight: 800, fontSize: "12px", cursor: "pointer" }}
              >
                Create Coupon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
