"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    freeShippingThreshold,
    amountUntilFreeShipping,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "PRO10" || code === "BEUPROS10") {
      setCouponApplied(true);
      setDiscountAmount(Math.round(subtotal * 0.1));
    } else if (couponCode.trim()) {
      alert("Invalid code. Try 'PRO10' or 'BEUPROS10' for 10% pro discount!");
    }
  };

  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div style={{ backgroundColor: "#ffffff", padding: "6rem 1.5rem", textAlign: "center" }}>
        <div className="container-custom" style={{ maxWidth: "550px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem auto",
            }}
          >
            <ShoppingBag size={40} color="#777777" />
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Your Bag is Empty
          </h1>
          <p style={{ fontSize: "1rem", color: "#666666", marginBottom: "2rem" }}>
            You haven&apos;t added any salon products yet. Browse through 4,200+ authentic pro items.
          </p>
          <Link href="/shop" className="btn-pill-black" style={{ padding: "0.85rem 2.2rem" }}>
            Start Shopping Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#ffffff", padding: "3rem 0 6rem 0" }}>
      <div className="container-custom">
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}
        >
          Shopping Bag & Pro Savings
        </h1>

        {/* Free Shipping Progress Meter */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            backgroundColor: "#f8faf9",
            borderRadius: "10px",
            border: "1px solid #d1fae5",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.6rem" }}>
            <Truck size={20} color="#30cb99" />
            {amountUntilFreeShipping === 0 ? (
              <span style={{ color: "#16a34a", fontWeight: 700 }}>
                🎉 You unlocked FREE Pro Delivery on this order!
              </span>
            ) : (
              <span>
                Add <strong>₹{amountUntilFreeShipping.toLocaleString("en-IN")}</strong> more to your bag to get <strong>FREE Pro Shipping</strong>!
              </span>
            )}
          </div>
          <div style={{ width: "100%", height: "8px", backgroundColor: "#e5e5e5", borderRadius: "9999px", overflow: "hidden" }}>
            <div style={{ width: `${progressPercent}%`, height: "100%", backgroundColor: "#30cb99", transition: "width 0.4s ease" }} />
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "3rem",
            alignItems: "flex-start",
          }}
        >
          {/* Left Column: Items */}
          <div>
            <div style={{ borderBottom: "1px solid #e5e5e5", paddingBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", color: "#666666" }}>
                Items ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
              <button
                onClick={clearCart}
                style={{ fontSize: "0.8rem", color: "#dc2626", fontWeight: 600, textDecoration: "underline" }}
              >
                Clear Bag
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    padding: "1.5rem 0",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100px",
                      height: "100px",
                      backgroundColor: "#fafafa",
                      borderRadius: "8px",
                      border: "1px solid #eeeeee",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.product.image || "/placeholder.png"}
                      alt={item.product.name}
                      fill
                      sizes="100px"
                      style={{ objectFit: "contain", padding: "0.5rem" }}
                    />
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", color: "#666666" }}>
                        {item.product.brand} • {item.product.category}
                      </div>
                      <Link
                        href={`/product/${item.product.id}`}
                        style={{ fontSize: "1rem", fontWeight: 700, color: "#000000", lineHeight: 1.3, marginTop: "0.2rem" }}
                      >
                        {item.product.name}
                      </Link>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1.5px solid #000000",
                          borderRadius: "9999px",
                          padding: "0.2rem 0.6rem",
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{ padding: "0.2rem 0.5rem", display: "flex", alignItems: "center" }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ minWidth: "28px", textAlign: "center", fontWeight: 700, fontSize: "0.9rem" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{ padding: "0.2rem 0.5rem", display: "flex", alignItems: "center" }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "1.15rem", fontWeight: 900 }}>
                          ₹{(item.product.salePrice * item.quantity).toLocaleString("en-IN")}
                        </div>
                        {item.quantity > 1 && (
                          <div style={{ fontSize: "0.75rem", color: "#666666" }}>
                            ₹{item.product.salePrice.toLocaleString("en-IN")} each
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{ color: "#999999", padding: "0.4rem" }}
                        title="Remove"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "2rem",
              borderRadius: "14px",
              border: "1px solid #e5e5e5",
            }}
          >
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <input
                type="text"
                placeholder="Enter Promo Code (PRO10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: "0.6rem 0.9rem",
                  border: "1.5px solid #d4d4d4",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  backgroundColor: "#ffffff",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                }}
              >
                Apply
              </button>
            </form>

            {couponApplied && (
              <div style={{ fontSize: "0.85rem", color: "#16a34a", fontWeight: 700, marginBottom: "1rem" }}>
                ✓ Coupon PRO10 applied! (10% Pro Discount)
              </div>
            )}

            {/* Subtotals breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem", color: "#444444", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 700, color: "#000000" }}>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#16a34a", fontWeight: 600 }}>
                  <span>Pro Discount (10%)</span>
                  <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Estimated Shipping</span>
                <span style={{ fontWeight: 700, color: shippingCost === 0 ? "#16a34a" : "#000000" }}>
                  {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.4rem",
                  fontWeight: 900,
                  color: "#000000",
                  paddingTop: "0.75rem",
                  borderTop: "2px solid #e0e0e0",
                }}
              >
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "#777777" }}>
                Inclusive of all taxes. Free standard pro shipping over ₹1,500.
              </div>
            </div>

            <button
              onClick={() => alert("Proceeding to Beupros Verified Pro Checkout!")}
              className="btn-pill-black"
              style={{ width: "100%", padding: "0.9rem", fontSize: "1rem" }}
            >
              <ShieldCheck size={20} /> Proceed to Pro Checkout
            </button>

            <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
              <Link href="/shop" style={{ fontSize: "0.85rem", fontWeight: 700, textDecoration: "underline", color: "#000000" }}>
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
