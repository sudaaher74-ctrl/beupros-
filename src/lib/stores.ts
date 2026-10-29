import { docs } from "./db";
import { SalonUser } from "@/types/user";
import { Order } from "@/types/order";
import { Product } from "@/types/product";

export interface CouponItem {
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

export const usersStore = docs<SalonUser>("users");
export const ordersStore = docs<Order>("orders");
export const couponsStore = docs<CouponItem>("coupons");

const rawProducts = docs<Product>("products");
let cache: { at: number; rows: Product[] } | null = null;
const TTL_MS = 30_000;

/** Products store with a short in-memory read cache (catalog is read-heavy). */
export const productsStore = {
  async all(): Promise<Product[]> {
    if (cache && Date.now() - cache.at < TTL_MS) return cache.rows;
    const rows = await rawProducts.all();
    cache = { at: Date.now(), rows };
    return rows;
  },
  async put(p: Product, opts?: { front?: boolean }) {
    await rawProducts.put(p, opts);
    cache = null;
  },
  async remove(id: string) {
    const ok = await rawProducts.remove(id);
    cache = null;
    return ok;
  },
};
