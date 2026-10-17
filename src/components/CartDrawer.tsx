"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    freeShippingThreshold,
    amountUntilFreeShipping,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "PRO10") {
      setCouponApplied(true);
      setDiscountAmount(Math.round(subtotal * 0.1));
    } else if (couponCode.trim()) {
      alert("Invalid code. Try 'PRO10' for 10% pro discount!");
    }
  };

  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isCartOpen ? "active" : ""}`}
        onClick={closeCart}
      />

      {/* Slide-out Drawer */}
      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #e5e5e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShoppingBag size={20} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Your Bag ({totalItems})
            </h3>
          </div>
          <button
            onClick={closeCart}
            style={{
              padding: "0.4rem",
              borderRadius: "50%",
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div
          style={{
            padding: "0.85rem 1.5rem",
            backgroundColor: "#f8faf9",
            borderBottom: "1px solid #e5e5e5",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#111111",
              marginBottom: "0.4rem",
            }}
          >
            <Truck size={16} color="#30cb99" />
            {amountUntilFreeShipping === 0 ? (
              <span style={{ color: "#1b8764", fontWeight: 700 }}>
                🎉 You unlocked FREE Pro Delivery!
              </span>
            ) : (
              <span>
                Add <strong>₹{amountUntilFreeShipping.toLocaleString("en-IN")}</strong> more for <strong>FREE Delivery</strong>
              </span>
            )}
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              backgroundColor: "#e5e5e5",
              borderRadius: "9999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                backgroundColor: "#30cb99",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                color: "#666666",
                padding: "2rem 0",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <ShoppingBag size={32} color="#999999" />
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#000000", marginBottom: "0.4rem" }}>
                Your bag is empty
              </h4>
              <p style={{ fontSize: "0.85rem", maxWidth: "240px", marginBottom: "1.5rem" }}>
                Explore 4,200+ salon-grade beauty supplies and trade prices.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="btn-pill-black"
                style={{ padding: "0.7rem 1.8rem" }}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: "flex",
                  gap: "1rem",
                  paddingBottom: "1.25rem",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    position: "relative",
                    width: "76px",
                    height: "76px",
                    backgroundColor: "#fafafa",
                    borderRadius: "6px",
                    border: "1px solid #eaeaea",
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={item.product.image || "/placeholder.png"}
                    alt={item.product.name}
                    fill
                    sizes="76px"
                    style={{ objectFit: "contain", padding: "0.3rem" }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", color: "#666666" }}>
                      {item.product.brand}
                    </div>
                    <Link
                      href={`/product/${item.product.id}`}
                      onClick={closeCart}
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "#000000",
                        lineHeight: 1.3,
                        display: "block",
                      }}
                      className="line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "0.6rem",
                    }}
                  >
                    {/* Quantity Selector */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #e0e0e0",
                        borderRadius: "9999px",
                        backgroundColor: "#fafafa",
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{ padding: "0.3rem 0.6rem", display: "flex", alignItems: "center" }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ fontSize: "0.82rem", fontWeight: 700, minWidth: "22px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{ padding: "0.3rem 0.6rem", display: "flex", alignItems: "center" }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.95rem", fontWeight: 800 }}>
                        ₹{(item.product.salePrice * item.quantity).toLocaleString("en-IN")}
                      </div>
                      {item.quantity > 1 && (
                        <div style={{ fontSize: "0.72rem", color: "#777777" }}>
                          ₹{item.product.salePrice.toLocaleString("en-IN")} each
                        </div>
                      )}
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      style={{ color: "#999999", padding: "0.2rem" }}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderTop: "1px solid #e5e5e5",
              backgroundColor: "#fafafa",
            }}
          >
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              <input
                type="text"
                placeholder="Promo Code (use PRO10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: "0.5rem 0.8rem",
                  border: "1px solid #d4d4d4",
                  borderRadius: "6px",
                  fontSize: "0.82rem",
                  backgroundColor: "#ffffff",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  borderRadius: "6px",
                  padding: "0.5rem 1rem",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                Apply
              </button>
            </form>

            {couponApplied && (
              <div style={{ fontSize: "0.8rem", color: "#16a34a", fontWeight: 600, marginBottom: "0.5rem" }}>
                ✓ Promo code PRO10 applied (10% Pro Discount)
              </div>
            )}

            {/* Subtotals */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem", color: "#444444", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: "#000000" }}>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#16a34a" }}>
                  <span>Pro Discount</span>
                  <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Estimated Shipping</span>
                <span style={{ fontWeight: 600, color: shippingCost === 0 ? "#16a34a" : "#000000" }}>
                  {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "#000000",
                  paddingTop: "0.5rem",
                  borderTop: "1px solid #e0e0e0",
                }}
              >
                <span>Estimated Total</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ fontSize: "0.72rem", color: "#777777" }}>
                Inclusive of all taxes. Free shipping on orders over ₹1,500.
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <button
                onClick={() => {
                  alert("Proceeding to Beupros Pro Verified Checkout!");
                }}
                className="btn-pill-black"
                style={{ width: "100%", padding: "0.75rem", fontSize: "0.9rem" }}
              >
                <ShieldCheck size={18} /> Checkout Now
              </button>
              <Link
                href="/cart"
                onClick={closeCart}
                className="btn-pill-white"
                style={{ width: "100%", padding: "0.65rem", fontSize: "0.85rem" }}
              >
                View Full Bag & Savings <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
