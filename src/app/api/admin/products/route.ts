import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { Product } from "@/types/product";
import { productsStore } from "@/lib/stores";

export async function GET(request: Request) {
  try {
    const admin = await requireUser(request, "admin");
    if (admin instanceof Response) return admin;

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const stockStatus = searchParams.get("stockStatus"); // all, in_stock, low_stock, out_of_stock
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limitParam = searchParams.get("limit");
    const limit = limitParam === "all" ? 10000 : parseInt(limitParam || "20", 10);

    const allProducts = await productsStore.all();

    // Compute inventory aggregates over all products
    let totalStockValue = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    let inStockCount = 0;
    const categoryMap: { [cat: string]: { count: number; value: number } } = {};
    const brandSet = new Set<string>();

    allProducts.forEach((p) => {
      const stock = p.stock !== undefined ? p.stock : 0;
      const sVal = stock * p.salePrice;
      totalStockValue += sVal;

      if (stock === 0 || p.availability === "Out of Stock") {
        outOfStockCount++;
      } else if (stock <= 20 || p.availability === "Low Stock") {
        lowStockCount++;
      } else {
        inStockCount++;
      }

      if (p.category) {
        if (!categoryMap[p.category]) {
          categoryMap[p.category] = { count: 0, value: 0 };
        }
        categoryMap[p.category].count += 1;
        categoryMap[p.category].value += sVal;
      }

      if (p.brand) {
        brandSet.add(p.brand);
      }
    });

    let filtered = allProducts;

    if (category && category !== "All Categories") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (brand && brand !== "All Brands") {
      filtered = filtered.filter((p) => p.brand === brand);
    }

    if (stockStatus && stockStatus !== "all") {
      if (stockStatus === "in_stock") {
        filtered = filtered.filter((p) => (p.stock !== undefined && p.stock > 20) && p.availability !== "Out of Stock");
      } else if (stockStatus === "low_stock") {
        filtered = filtered.filter((p) => (p.stock !== undefined && p.stock > 0 && p.stock <= 20) || p.availability === "Low Stock");
      } else if (stockStatus === "out_of_stock") {
        filtered = filtered.filter((p) => (p.stock === undefined || p.stock === 0) || p.availability === "Out of Stock");
      }
    }

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.brand.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search) ||
          (p.sku && p.sku.toLowerCase().includes(search))
      );
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginatedProducts = filtered.slice(startIndex, startIndex + limit);

    const categoriesList = Object.keys(categoryMap).map((cat) => ({
      name: cat,
      count: categoryMap[cat].count,
      value: categoryMap[cat].value,
    }));

    // Sort categories by product count descending
    categoriesList.sort((a, b) => b.count - a.count);

    return NextResponse.json({
      products: paginatedProducts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      categories: categoriesList,
      brands: Array.from(brandSet).sort(),
      inventoryStats: {
        totalSKUs: allProducts.length,
        totalStockValue,
        inStockCount,
        lowStockCount,
        outOfStockCount,
        categoryValuations: categoriesList,
      },
    });
  } catch (error: any) {
    console.error("Admin GET products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireUser(request, "admin");
    if (admin instanceof Response) return admin;

    const body = await request.json();
    const { name, brand, category, salePrice, mrp, image, description, availability, stock, sku } = body;

    if (!name || !brand || !category || salePrice === undefined || mrp === undefined) {
      return NextResponse.json(
        { error: "Product name, brand, category, MRP, and sale price are required." },
        { status: 400 }
      );
    }

    const sPrice = Number(salePrice);
    const mPrice = Number(mrp);
    const discountPercent = mPrice > sPrice ? Math.round(((mPrice - sPrice) / mPrice) * 100) : 0;
    const discount = discountPercent > 0 ? `${discountPercent}% OFF` : "";

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      brand: brand.trim(),
      category: category.trim(),
      salePrice: sPrice,
      mrp: mPrice,
      discount,
      discountPercent,
      stock: stock !== undefined ? Number(stock) : 0,
      sku: sku ? sku.trim() : `BP-${Date.now().toString().slice(-4)}`,
      image: image || "/placeholder.png",
      rating: 4.8,
      reviewsCount: 1,
      description: description ? description.trim() : `${brand} professional grade product for salon use.`,
      availability: availability || "In Stock",
    };

    // Insert at front so new product shows up first
    await productsStore.put(newProduct, { front: true });

    return NextResponse.json({
      success: true,
      message: "Product added successfully to catalog",
      product: newProduct,
    });
  } catch (error: any) {
    console.error("Admin POST product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await requireUser(request, "admin");
    if (admin instanceof Response) return admin;

    const body = await request.json();
    const { id, name, brand, category, salePrice, mrp, image, description, availability, stock, sku } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const existing = (await productsStore.all()).find((p) => p.id === id);

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const target: Product = { ...existing };

    if (name) target.name = name.trim();
    if (brand) target.brand = brand.trim();
    if (category) target.category = category.trim();
    if (image) target.image = image.trim();
    if (description) target.description = description.trim();
    if (availability) target.availability = availability;
    if (stock !== undefined) target.stock = Number(stock);
    if (sku !== undefined) target.sku = sku.trim();

    if (salePrice !== undefined || mrp !== undefined) {
      const sPrice = salePrice !== undefined ? Number(salePrice) : target.salePrice;
      const mPrice = mrp !== undefined ? Number(mrp) : target.mrp;
      target.salePrice = sPrice;
      target.mrp = mPrice;
      target.discountPercent = mPrice > sPrice ? Math.round(((mPrice - sPrice) / mPrice) * 100) : 0;
      target.discount = target.discountPercent > 0 ? `${target.discountPercent}% OFF` : "";
    }

    await productsStore.put(target);

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product: target,
    });
  } catch (error: any) {
    console.error("Admin PUT product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await requireUser(request, "admin");
    if (admin instanceof Response) return admin;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    if (!(await productsStore.remove(id))) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const totalRemaining = (await productsStore.all()).length;
    return NextResponse.json({
      success: true,
      message: "Product removed from catalog",
      totalRemaining,
    });
  } catch (error: any) {
    console.error("Admin DELETE product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
