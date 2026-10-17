import { NextResponse } from "next/server";
import productsData from "@/data/products.json";
import { Product } from "@/types/product";

const allProducts = productsData as Product[];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // Find related products in same category or brand
  const related = allProducts
    .filter((p) => p.id !== id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 8);

  return NextResponse.json({
    product,
    related,
  });
}
