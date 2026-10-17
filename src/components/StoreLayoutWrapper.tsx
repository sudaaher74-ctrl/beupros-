"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { SearchModal } from "@/components/SearchModal";
import { Toast } from "@/components/Toast";
import { ProStylistChat } from "@/components/ProStylistChat";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Footer } from "@/components/Footer";

export const StoreLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    // Dedicated full-screen admin app without consumer store header, footer, bottom nav, or store chat
    return <main style={{ minHeight: "100vh", backgroundColor: "#0f172a" }}>{children}</main>;
  }

  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <Toast />
      <ProStylistChat />
      <MobileBottomNav />
      <Footer />
    </>
  );
};
