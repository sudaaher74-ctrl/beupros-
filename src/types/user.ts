export type UserStatus = "pending" | "approved" | "rejected";
export type UserRole = "salon_pro" | "admin";

export type SalonBusinessType =
  | "Hair Salon"
  | "Beauty Parlour"
  | "Nail Studio"
  | "Aesthetic Clinic / Spa"
  | "Freelance Stylist"
  | "Cosmetology Academy";

export interface SalonUser {
  id: string;
  email: string;
  password?: string;
  name: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  salonName: string;
  businessType: SalonBusinessType;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstNumber?: string;
  licenseNumber?: string;
  createdAt: string;
  rejectionReason?: string;
}
