import { CouponItem } from "./stores";

export type CouponResult =
  | { ok: true; discount: number; freeShipping: boolean; coupon: CouponItem }
  | { ok: false; error: string };

export function evaluateCoupon(coupon: CouponItem | undefined, subtotal: number): CouponResult {
  if (!coupon) return { ok: false, error: "Invalid coupon code." };
  if (coupon.status !== "active") return { ok: false, error: "This coupon is not active." };
  if (coupon.usedCount >= coupon.usageLimit) return { ok: false, error: "This coupon has reached its usage limit." };
  if (subtotal < coupon.minOrder) return { ok: false, error: `Minimum order ₹${coupon.minOrder} required for this coupon.` };
  if (coupon.type === "percentage") {
    return { ok: true, discount: Math.round((subtotal * coupon.discountValue) / 100), freeShipping: false, coupon };
  }
  if (coupon.type === "flat") {
    return { ok: true, discount: Math.min(coupon.discountValue, subtotal), freeShipping: false, coupon };
  }
  return { ok: true, discount: 0, freeShipping: true, coupon };
}
