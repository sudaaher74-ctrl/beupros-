import { Platform } from "react-native";
import { Product } from "../types/product";
import { Order } from "../types/order";

// Set EXPO_PUBLIC_API_URL to your deployed Next.js backend (e.g. https://beupros.com).
// For local dev on a physical phone use your computer's LAN IP, not localhost.
const fallback = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";
export const API_URL = (process.env.EXPO_PUBLIC_API_URL || fallback).replace(/\/$/, "");

export const imageUrl = (src?: string) => {
  if (!src) return `${API_URL}/placeholder.png`;
  return /^https?:\/\//.test(src) ? src : `${API_URL}${src}`;
};

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

let authToken: string | null = null;
export const setAuthToken = (t: string | null) => { authToken = t; };

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data as T;
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  search?: string;
  sort?: string;
  minDiscount?: number;
}

export async function fetchProducts(q: ProductQuery = {}) {
  const params = new URLSearchParams();
  Object.entries(q).forEach(([k, v]) => {
    if (v !== undefined && v !== "" && v !== null) params.set(k, String(v));
  });
  return request<{
    products: Product[];
    pagination: { total: number; page: number; totalPages: number; hasNext: boolean };
  }>(`/api/products?${params.toString()}`);
}

export async function fetchProduct(id: string) {
  const r = await request<{ products: Product[] }>(`/api/products?ids=${encodeURIComponent(id)}`);
  return r.products[0] ?? null;
}

export const placeOrder = (body: unknown) =>
  request<{ order: Order }>("/api/orders", { method: "POST", body: JSON.stringify(body) });

export const fetchMyOrders = () => request<{ orders: Order[] }>("/api/orders");

export const validateCoupon = (code: string, subtotal: number) =>
  request<{ discount: number; freeShipping: boolean; label: string }>("/api/coupons/validate", {
    method: "POST",
    body: JSON.stringify({ code, subtotal }),
  });

export const fetchMe = () => request<{ user: any }>("/api/auth/me");

export const loginRequest = (email: string, password: string) =>
  request<{ user: any; token: string }>("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });

export const registerRequest = (data: unknown) =>
  request<{ user: any; token: string }>("/api/auth/register", { method: "POST", body: JSON.stringify(data) });

export const chatRequest = (message: string) =>
  request<{ reply: string; recommendedProducts: Product[]; suggestedFollowUps: string[] }>("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
