import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Product } from "@/types/product";

const productsFilePath = path.join(process.cwd(), "src/data/products.json");

function getProducts(): Product[] {
  try {
    const fileContent = fs.readFileSync(productsFilePath, "utf-8");
    return JSON.parse(fileContent) as Product[];
  } catch {
    return [];
  }
}

function saveProducts(products: Product[]) {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), "utf-8");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const stockStatus = searchParams.get("stockStatus"); // all, in_stock, low_stock, out_of_stock
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limitParam = searchParams.get("limit");
    const limit = limitParam === "all" ? 10000 : parseInt(limitParam || "20", 10);

    const allProducts = getProducts();

    // Compute inventory aggregates over all products
    let totalStockValue = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    let inStockCount = 0;
    const categoryMap: { [cat: string]: { count: number; value: number } } = {};
    const brandSet = new Set<string>();

    allProducts.forEach((p) => {
      const stock = p.stock !== undefined ? p.stock : 25;
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
        filtered = filtered.filter((p) => (p.stock !== undefined ? p.stock > 20 : true) && p.availability !== "Out of Stock");
      } else if (stockStatus === "low_stock") {
        filtered = filtered.filter((p) => (p.stock !== undefined ? p.stock > 0 && p.stock <= 20 : false) || p.availability === "Low Stock");
      } else if (stockStatus === "out_of_stock") {
        filtered = filtered.filter((p) => p.stock === 0 || p.availability === "Out of Stock");
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
    const body = await request.json();
    const { name, brand, category, salePrice, mrp, image, description, availability } = body;

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
      image: image || "/placeholder.png",
      rating: 4.8,
      reviewsCount: 1,
      description: description ? description.trim() : `${brand} professional grade product for salon use.`,
      availability: availability || "In Stock",
    };

    const products = getProducts();
    // Insert at front so new product shows up first
    products.unshift(newProduct);
    saveProducts(products);

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
    const body = await request.json();
    const { id, name, brand, category, salePrice, mrp, image, description, availability } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const products = getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const target = products[index];

    if (name) target.name = name.trim();
    if (brand) target.brand = brand.trim();
    if (category) target.category = category.trim();
    if (image) target.image = image.trim();
    if (description) target.description = description.trim();
    if (availability) target.availability = availability;

    if (salePrice !== undefined || mrp !== undefined) {
      const sPrice = salePrice !== undefined ? Number(salePrice) : target.salePrice;
      const mPrice = mrp !== undefined ? Number(mrp) : target.mrp;
      target.salePrice = sPrice;
      target.mrp = mPrice;
      target.discountPercent = mPrice > sPrice ? Math.round(((mPrice - sPrice) / mPrice) * 100) : 0;
      target.discount = target.discountPercent > 0 ? `${target.discountPercent}% OFF` : "";
    }

    products[index] = target;
    saveProducts(products);

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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    let products = getProducts();
    const initialLength = products.length;
    products = products.filter((p) => p.id !== id);

    if (products.length === initialLength) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    saveProducts(products);
    return NextResponse.json({
      success: true,
      message: "Product removed from catalog",
      totalRemaining: products.length,
    });
  } catch (error: any) {
    console.error("Admin DELETE product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
