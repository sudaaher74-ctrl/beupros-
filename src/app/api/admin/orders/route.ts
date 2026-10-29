import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { Order, OrderStatus } from "@/types/order";
import { ordersStore } from "@/lib/stores";

export async function GET(request: Request) {
  try {
    const admin = await requireUser(request, "admin");
    if (admin instanceof Response) return admin;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // all, Pending, Confirmed, Packing, Dispatched, Delivered, Cancelled
    const search = searchParams.get("search")?.toLowerCase();

    const allOrders = await ordersStore.all();
    let orders = [...allOrders];

    // Sort newest first
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (status && status !== "all") {
      orders = orders.filter((o) => o.status.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      orders = orders.filter(
        (o) =>
          o.id.toLowerCase().includes(search) ||
          o.salonName.toLowerCase().includes(search) ||
          o.customerName.toLowerCase().includes(search) ||
          o.phone.toLowerCase().includes(search) ||
          o.shippingAddress.city.toLowerCase().includes(search) ||
          o.items.some((item) => item.name.toLowerCase().includes(search))
      );
    }

    const totalRevenue = allOrders
      .filter((o) => o.status !== "Cancelled")
      .reduce((sum, o) => sum + (o.total || 0), 0);

    const counts = {
      all: allOrders.length,
      pending: allOrders.filter((o) => o.status === "Pending").length,
      confirmed: allOrders.filter((o) => o.status === "Confirmed").length,
      packing: allOrders.filter((o) => o.status === "Packing").length,
      dispatched: allOrders.filter((o) => o.status === "Dispatched").length,
      delivered: allOrders.filter((o) => o.status === "Delivered").length,
      cancelled: allOrders.filter((o) => o.status === "Cancelled").length,
    };

    return NextResponse.json({
      orders,
      total: orders.length,
      counts,
      stats: {
        totalRevenue,
        pendingOrders: counts.pending + counts.confirmed + counts.packing,
        deliveredOrders: counts.delivered,
      },
    });
  } catch (error: any) {
    console.error("Orders GET error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireUser(request, "admin");
    if (admin instanceof Response) return admin;

    const body = await request.json();
    const {
      salonName,
      customerName,
      email,
      phone,
      shippingAddress,
      items,
      subtotal,
      discount,
      shipping,
      total,
      paymentMethod,
      notes,
    } = body;

    if (!salonName || !customerName || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Salon name, pro contact, and cart items are required." },
        { status: 400 }
      );
    }

    const newOrderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: newOrderId,
      createdAt: new Date().toISOString(),
      salonName: salonName.trim(),
      customerName: customerName.trim(),
      email: email ? email.trim() : "salon@beupros.com",
      phone: phone ? phone.trim() : "+91 98000 00000",
      shippingAddress: shippingAddress || {
        street: "Salon Main Commercial Complex",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
      },
      items: items.map((i: any) => ({
        productId: i.productId || i.id,
        name: i.name,
        brand: i.brand || "Pro Salon",
        image: i.image || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500",
        quantity: i.quantity || 1,
        price: i.price,
        mrp: i.mrp || i.price,
      })),
      subtotal: subtotal || total,
      discount: discount || 0,
      shipping: shipping || 0,
      total: total || subtotal,
      status: "Pending",
      paymentMethod: paymentMethod || "Pay on Delivery (Trade Wholesale)",
      paymentStatus: "Pending",
      notes: notes || undefined,
    };

    await ordersStore.put(newOrder, { front: true });

    return NextResponse.json({
      success: true,
      message: "Wholesale trade order placed successfully!",
      order: newOrder,
    });
  } catch (error: any) {
    console.error("Orders POST error:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await requireUser(request, "admin");
    if (admin instanceof Response) return admin;

    const body = await request.json();
    const { id, status, paymentStatus, trackingNumber, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const order = await ordersStore.get(id);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (status) order.status = status as OrderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (trackingNumber !== undefined) order.trackingNumber = trackingNumber;
    if (notes !== undefined) order.notes = notes;

    await ordersStore.put(order);

    return NextResponse.json({
      success: true,
      message: `Order status updated to ${order.status}`,
      order,
    });
  } catch (error: any) {
    console.error("Orders PUT error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await requireUser(request, "admin");
    if (admin instanceof Response) return admin;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    await ordersStore.remove(id);

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error: any) {
    console.error("Orders DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
