export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Packing"
  | "Dispatched"
  | "Delivered"
  | "Cancelled";

export type PaymentMethod =
  | "Pay on Delivery (Trade Wholesale)"
  | "UPI / Direct Bank Transfer"
  | "Pro Trade Credit (Net 30)";

export type PaymentStatus = "Pending" | "Paid";

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  quantity: number;
  price: number;
  mrp: number;
}

export interface Order {
  id: string;
  userId?: string;
  createdAt: string;
  salonName: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  trackingNumber?: string;
  notes?: string;
}
