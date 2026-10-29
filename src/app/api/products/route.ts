import { NextResponse } from "next/server";
import { productsStore } from "@/lib/stores";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "24", 10);
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const search = searchParams.get("search")?.toLowerCase().trim() || "";
  const minPrice = searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!, 10) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!, 10) : undefined;
  const minDiscount = searchParams.get("minDiscount") ? parseInt(searchParams.get("minDiscount")!, 10) : undefined;
  const sort = searchParams.get("sort") || "featured";
  const ids = searchParams.get("ids")?.split(",").filter(Boolean);

  let filtered = [...(await productsStore.all())];

  // Specific IDs
  if (ids && ids.length > 0) {
    const idSet = new Set(ids);
    filtered = filtered.filter((p) => idSet.has(p.id));
  }

  // Category filter
  if (category && category.toLowerCase() !== "all") {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Brand filter
  if (brand && brand.toLowerCase() !== "all") {
    filtered = filtered.filter(
      (p) => p.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  // Search filter
  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    );
  }

  // Price range filter
  if (minPrice !== undefined) {
    filtered = filtered.filter((p) => p.salePrice >= minPrice);
  }
  if (maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.salePrice <= maxPrice);
  }

  // Discount filter
  if (minDiscount !== undefined) {
    filtered = filtered.filter((p) => p.discountPercent >= minDiscount);
  }

  // Sorting
  switch (sort) {
    case "price-asc":
      filtered.sort((a, b) => a.salePrice - b.salePrice);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.salePrice - a.salePrice);
      break;
    case "discount":
      filtered.sort((a, b) => b.discountPercent - a.discountPercent);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
      break;
    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "featured":
    default:
      // Keep curated order
      break;
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    products: paginated,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  });
}
