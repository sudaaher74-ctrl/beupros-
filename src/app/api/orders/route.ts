import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { couponsStore, ordersStore, productsStore } from "@/lib/stores";
import { evaluateCoupon } from "@/lib/coupons";
import { Order, OrderItem, PaymentMethod } from "@/types/order";

const FREE_SHIPPING_THRESHOLD = 1500;
const SHIPPING_FEE = 99;
const METHODS: PaymentMethod[] = [
  "Pay on Delivery (Trade Wholesale)",
  "UPI / Direct Bank Transfer",
  "Pro Trade Credit (Net 30)",
];

/** Orders of the logged-in user. */
export async function GET(request: Request) {
  const user = await requireUser(request);
  if (user instanceof Response) return user;
  const orders = (await ordersStore.all())
    .filter((o) => o.userId === user.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json({ orders });
}

/** Place an order. Prices, discounts and totals are computed server-side. */
export async function POST(request: Request) {
  try {
    const user = await requireUser(request, "approved");
    if (user instanceof Response) return user;

    const body = await request.json();
    const { items, shippingAddress, paymentMethod, notes, couponCode, salonName, customerName, phone, email } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart items are required." }, { status: 400 });
    }

    const catalog = new Map((await productsStore.all()).map((p) => [p.id, p]));
    const orderItems: OrderItem[] = [];
    for (const i of items) {
      const p = catalog.get(String(i.productId));
      const qty = Math.floor(Number(i.quantity));
      if (!p || !(qty > 0) || qty > 10000) {
        return NextResponse.json({ error: "One or more items are unavailable." }, { status: 400 });
      }
      orderItems.push({
        productId: p.id, name: p.name, brand: p.brand, image: p.image,
        quantity: qty, price: p.salePrice, mrp: p.mrp,
      });
    }

    const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);

    let discount = 0;
    let freeShipping = false;
    let appliedCoupon = null;
    if (couponCode && String(couponCode).trim()) {
      const code = String(couponCode).trim().toUpperCase();
      const r = evaluateCoupon((await couponsStore.all()).find((c) => c.code === code), subtotal);
      if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
      discount = r.discount;
      freeShipping = r.freeShipping;
      appliedCoupon = r.coupon;
    }

    const shipping = freeShipping || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const total = Math.max(0, subtotal - discount + shipping);

    const order: Order = {
      id: `ORD-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
      salonName: String(salonName || user.salonName).trim(),
      customerName: String(customerName || user.name).trim(),
      email: String(email || user.email).trim(),
      phone: String(phone || user.phone).trim(),
      shippingAddress: {
        street: shippingAddress?.street || user.address,
        city: shippingAddress?.city || user.city,
        state: shippingAddress?.state || user.state,
        pincode: shippingAddress?.pincode || user.pincode,
      },
      items: orderItems,
      subtotal, discount, shipping, total,
      status: "Pending",
      paymentMethod: METHODS.includes(paymentMethod) ? paymentMethod : METHODS[0],
      paymentStatus: "Pending",
      notes: notes ? String(notes).slice(0, 1000) : undefined,
    };

    await ordersStore.put(order, { front: true });
    if (appliedCoupon) await couponsStore.put({ ...appliedCoupon, usedCount: appliedCoupon.usedCount + 1 });

    return NextResponse.json({ success: true, message: "Wholesale trade order placed successfully!", order });
  } catch (error) {
    console.error("Orders POST error:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
