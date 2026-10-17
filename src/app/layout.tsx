import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { SearchModal } from "@/components/SearchModal";
import { Toast } from "@/components/Toast";
import { ProStylistChat } from "@/components/ProStylistChat";
import { Footer } from "@/components/Footer";

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
        <CartProvider>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <CartDrawer />
          <QuickViewModal />
          <SearchModal />
          <Toast />
          <ProStylistChat />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
