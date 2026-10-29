import { NextResponse } from "next/server";
import { couponsStore } from "@/lib/stores";
import { evaluateCoupon } from "@/lib/coupons";

export async function POST(request: Request) {
  try {
    const { code, subtotal } = await request.json();
    const normalized = String(code || "").trim().toUpperCase();
    const coupons = await couponsStore.all();
    const result = evaluateCoupon(
      coupons.find((c) => c.code === normalized),
      Number(subtotal) || 0
    );
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({
      valid: true,
      code: result.coupon.code,
      discount: result.discount,
      freeShipping: result.freeShipping,
      label: result.coupon.discountText,
    });
  } catch {
    return NextResponse.json({ error: "Failed to validate coupon" }, { status: 500 });
  }
}
