"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types/product";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isChatOpen: boolean;
  openChat: (initialQuery?: string) => void;
  closeChat: () => void;
  toggleChat: () => void;
  chatInitialQuery: string | null;
  clearChatInitialQuery: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("beupros_cart");
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save to localStorage when cart changes
  useEffect(() => {
    try {
      localStorage.setItem("beupros_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.salePrice * item.quantity,
    0
  );
  const freeShippingThreshold = 1500;
  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        freeShippingThreshold,
        amountUntilFreeShipping,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        quickViewProduct,
        openQuickView: (product) => setQuickViewProduct(product),
        closeQuickView: () => setQuickViewProduct(null),
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        isChatOpen,
        openChat: (initialQuery?: string) => {
          if (initialQuery) setChatInitialQuery(initialQuery);
          setIsChatOpen(true);
        },
        closeChat: () => setIsChatOpen(false),
        toggleChat: () => setIsChatOpen((prev) => !prev),
        chatInitialQuery,
        clearChatInitialQuery: () => setChatInitialQuery(null),
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
