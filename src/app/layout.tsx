import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { StoreLayoutWrapper } from "@/components/StoreLayoutWrapper";

export const metadata: Metadata = {
  title: "Beupros | Pro Salon Beauty Supplies, Hair Color & Professional Products",
  description:
    "Beupros is the premier wholesale beauty supplier dedicated to beauty pros. Shop 4,200+ salon-exclusive hair care, color, styling, appliances, and salon essentials with pro trade pricing.",
  keywords: "salon supplies, hair color, hair care, salon equipment, beauty wholesale, Babila, Loreal, Schwarzkopf, Wella, Matrix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
