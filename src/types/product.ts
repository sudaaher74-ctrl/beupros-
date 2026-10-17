export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  salePrice: number;
  mrp: number;
  discount: string;
  discountPercent: number;
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  availability: string;
  sourceUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
