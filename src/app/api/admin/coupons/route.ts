import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const couponsFilePath = path.join(process.cwd(), "src/data/coupons.json");

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

function getCoupons(): CouponItem[] {
  try {
    if (!fs.existsSync(couponsFilePath)) {
      return [];
    }
    const fileContent = fs.readFileSync(couponsFilePath, "utf-8");
    return JSON.parse(fileContent) as CouponItem[];
  } catch {
    return [];
  }
}

function saveCoupons(coupons: CouponItem[]) {
  fs.writeFileSync(couponsFilePath, JSON.stringify(coupons, null, 2), "utf-8");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const status = searchParams.get("status");

    let coupons = getCoupons();

    if (status && status !== "all") {
      coupons = coupons.filter((c) => c.status === status);
    }

    if (search) {
      coupons = coupons.filter(
        (c) =>
          c.code.toLowerCase().includes(search) ||
          c.name.toLowerCase().includes(search) ||
          c.category.toLowerCase().includes(search)
      );
    }

    const allCoupons = getCoupons();
    const activeCoupons = allCoupons.filter((c) => c.status === "active").length;
    const expiredCoupons = allCoupons.filter((c) => c.status === "expired").length;

    const avgDiscount =
      allCoupons.length > 0
        ? Math.round(
            allCoupons.reduce((sum, c) => sum + (c.discountValue || 0), 0) /
              allCoupons.length
          )
        : 0;

    return NextResponse.json({
      coupons,
      total: allCoupons.length,
      counts: {
        all: allCoupons.length,
        active: activeCoupons,
        expired: expiredCoupons,
        avgDiscount,
      },
    });
  } catch (error: any) {
    console.error("Admin GET coupons error:", error);
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, name, type, discountValue, minOrder, usageLimit, validFrom, validUntil, category, isActive } = body;

    if (!code || !name) {
      return NextResponse.json({ error: "Coupon code and campaign name are required." }, { status: 400 });
    }

    const coupons = getCoupons();
    const normalizedCode = code.trim().toUpperCase();

    if (coupons.some((c) => c.code === normalizedCode)) {
      return NextResponse.json({ error: "Coupon code already exists." }, { status: 400 });
    }

    const dVal = Number(discountValue) || 0;
    const discountText =
      type === "percentage"
        ? `${dVal}% OFF`
        : type === "flat"
        ? `₹ ${dVal} OFF`
        : "Free Delivery";

    const validity = validFrom && validUntil ? `${validFrom} – ${validUntil}` : "Ongoing Campaign";

    const newCoupon: CouponItem = {
      id: `cp-${Date.now()}`,
      code: normalizedCode,
      name: name.trim(),
      type: type || "percentage",
      discountText,
      discountValue: dVal,
      minOrder: Number(minOrder) || 0,
      usageLimit: Number(usageLimit) || 100,
      usedCount: 0,
      validity,
      status: isActive ? "active" : "scheduled",
      category: category || "All Categories",
    };

    coupons.unshift(newCoupon);
    saveCoupons(coupons);

    return NextResponse.json({
      success: true,
      message: "Coupon created successfully",
      coupon: newCoupon,
    });
  } catch (error: any) {
    console.error("Admin POST coupon error:", error);
    return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Coupon ID is required" }, { status: 400 });
    }

    let coupons = getCoupons();
    const initialLen = coupons.length;
    coupons = coupons.filter((c) => c.id !== id);

    if (coupons.length === initialLen) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    saveCoupons(coupons);
    return NextResponse.json({ success: true, message: "Coupon deleted successfully" });
  } catch (error: any) {
    console.error("Admin DELETE coupon error:", error);
    return NextResponse.json({ error: "Failed to delete coupon" }, { status: 500 });
  }
}
