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
