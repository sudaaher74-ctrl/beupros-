"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Toast: React.FC = () => {
  const { toastMessage, isCartOpen } = useCart();

  if (!toastMessage || isCartOpen) return null;

  return (
    <div className="toast-banner">
      <CheckCircle2 size={18} color="#30cb99" />
      <span>{toastMessage}</span>
    </div>
  );
};
