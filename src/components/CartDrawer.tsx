"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Truck, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    freeShippingThreshold,
    amountUntilFreeShipping,
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  const [checkoutData, setCheckoutData] = useState({
    salonName: "Studio Elegance Salon",
    customerName: "Rohan Varma",
    phone: "+91 98765 01234",
    email: "rohan@elegancesalon.in",
    street: "Shop 4, Ground Floor, Grand Galleria Mall",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    paymentMethod: "Pay on Delivery (Trade Wholesale)",
    notes: "Please call upon arrival at salon premises.",
  });

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
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.75rem" }}>
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="btn-pill-black"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                <ShieldCheck size={18} /> Proceed to Wholesale Checkout
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

      {/* ========================================================================= */}
      {/* WHOLESALE TRADE CHECKOUT MODAL */}
      {/* ========================================================================= */}
      {isCheckoutOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.65)", zIndex: 120, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "560px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "1.75rem", position: "relative", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setConfirmedOrder(null);
              }}
              style={{ position: "absolute", right: "1.25rem", top: "1.25rem", background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}
            >
              <X size={22} />
            </button>

            {confirmedOrder ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto", color: "#059669" }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 900, textTransform: "uppercase", color: "#111827", margin: "0 0 0.5rem 0" }}>
                  Trade Order Confirmed!
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#4b5563", marginBottom: "1.25rem" }}>
                  Thank you! Your order <strong style={{ color: "#000", fontFamily: "monospace" }}>{confirmedOrder.id}</strong> has been received and routed to the BeuPROS fulfillment warehouse.
                </p>

                <div style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "1rem", textAlign: "left", fontSize: "0.85rem", marginBottom: "1.5rem", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ color: "#6b7280" }}>Salon:</span>
                    <strong style={{ color: "#111827" }}>{confirmedOrder.salonName}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ color: "#6b7280" }}>Payment:</span>
                    <strong style={{ color: "#111827" }}>{confirmedOrder.paymentMethod}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ color: "#6b7280" }}>Items:</span>
                    <strong style={{ color: "#111827" }}>{confirmedOrder.items?.length} SKUs</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e5e7eb", paddingTop: "6px", marginTop: "6px", fontSize: "1rem", fontWeight: 900 }}>
                    <span>Order Total:</span>
                    <span style={{ color: "#065f46" }}>₹{confirmedOrder.total?.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                  <Link
                    href="/admin"
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setConfirmedOrder(null);
                      closeCart();
                    }}
                    style={{
                      backgroundColor: "#111827",
                      color: "#f59e0b",
                      padding: "0.65rem 1.25rem",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      border: "1px solid #f59e0b",
                    }}
                  >
                    View in Admin Orders →
                  </Link>
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setConfirmedOrder(null);
                      closeCart();
                    }}
                    style={{
                      backgroundColor: "#f3f4f6",
                      color: "#374151",
                      padding: "0.65rem 1.25rem",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      border: "1px solid #d1d5db",
                      cursor: "pointer",
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                  <div style={{ backgroundColor: "#065f46", color: "#6ee7b7", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase" }}>
                    Wholesale Pro Checkout
                  </div>
                </div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 900, textTransform: "uppercase", color: "#111827", margin: "0 0 1.25rem 0" }}>
                  Confirm Salon Trade Order
                </h3>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSubmittingOrder(true);
                    try {
                      const res = await fetch("/api/admin/orders", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          salonName: checkoutData.salonName,
                          customerName: checkoutData.customerName,
                          phone: checkoutData.phone,
                          email: checkoutData.email,
                          shippingAddress: {
                            street: checkoutData.street,
                            city: checkoutData.city,
                            state: checkoutData.state,
                            pincode: checkoutData.pincode,
                          },
                          items: cart.map((item) => ({
                            productId: item.product.id,
                            name: item.product.name,
                            brand: item.product.brand,
                            image: item.product.image,
                            quantity: item.quantity,
                            price: item.product.salePrice,
                            mrp: item.product.mrp,
                          })),
                          subtotal,
                          discount: discountAmount,
                          shipping: shippingCost,
                          total: grandTotal,
                          paymentMethod: checkoutData.paymentMethod,
                          notes: checkoutData.notes,
                        }),
                      });

                      const data = await res.json();
                      if (res.ok && data.order) {
                        setConfirmedOrder(data.order);
                        clearCart();
                      } else {
                        alert(data.error || "Failed to place order.");
                      }
                    } catch {
                      alert("Error processing wholesale order.");
                    } finally {
                      setSubmittingOrder(false);
                    }
                  }}
                  style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>Salon Name</label>
                      <input
                        type="text"
                        required
                        value={checkoutData.salonName}
                        onChange={(e) => setCheckoutData({ ...checkoutData, salonName: e.target.value })}
                        style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1.5px solid #d1d5db", borderRadius: "6px", fontSize: "0.85rem", marginTop: "3px", boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>Stylist / Owner Name</label>
                      <input
                        type="text"
                        required
                        value={checkoutData.customerName}
                        onChange={(e) => setCheckoutData({ ...checkoutData, customerName: e.target.value })}
                        style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1.5px solid #d1d5db", borderRadius: "6px", fontSize: "0.85rem", marginTop: "3px", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={checkoutData.phone}
                        onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                        style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1.5px solid #d1d5db", borderRadius: "6px", fontSize: "0.85rem", marginTop: "3px", boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>Email Address</label>
                      <input
                        type="email"
                        required
                        value={checkoutData.email}
                        onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                        style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1.5px solid #d1d5db", borderRadius: "6px", fontSize: "0.85rem", marginTop: "3px", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>Salon Delivery Address</label>
                    <input
                      type="text"
                      required
                      placeholder="Shop / Unit number, street, landmark"
                      value={checkoutData.street}
                      onChange={(e) => setCheckoutData({ ...checkoutData, street: e.target.value })}
                      style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1.5px solid #d1d5db", borderRadius: "6px", fontSize: "0.85rem", marginTop: "3px", boxSizing: "border-box" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                    <div>
                      <label style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>City</label>
                      <input
                        type="text"
                        required
                        value={checkoutData.city}
                        onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                        style={{ width: "100%", padding: "0.55rem", border: "1.5px solid #d1d5db", borderRadius: "6px", fontSize: "0.82rem", marginTop: "3px", boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>State</label>
                      <input
                        type="text"
                        required
                        value={checkoutData.state}
                        onChange={(e) => setCheckoutData({ ...checkoutData, state: e.target.value })}
                        style={{ width: "100%", padding: "0.55rem", border: "1.5px solid #d1d5db", borderRadius: "6px", fontSize: "0.82rem", marginTop: "3px", boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>PIN Code</label>
                      <input
                        type="text"
                        required
                        value={checkoutData.pincode}
                        onChange={(e) => setCheckoutData({ ...checkoutData, pincode: e.target.value })}
                        style={{ width: "100%", padding: "0.55rem", border: "1.5px solid #d1d5db", borderRadius: "6px", fontSize: "0.82rem", marginTop: "3px", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#374151" }}>Trade Payment Method</label>
                    <select
                      value={checkoutData.paymentMethod}
                      onChange={(e) => setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })}
                      style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1.5px solid #d1d5db", borderRadius: "6px", fontSize: "0.85rem", marginTop: "3px", boxSizing: "border-box", backgroundColor: "#fff" }}
                    >
                      <option value="Pay on Delivery (Trade Wholesale)">Pay on Delivery (Trade Wholesale)</option>
                      <option value="UPI / Direct Bank Transfer">UPI / Direct Bank Transfer</option>
                      <option value="Pro Trade Credit (Net 30)">Pro Trade Credit (Net 30)</option>
                    </select>
                  </div>

                  {/* Summary Box */}
                  <div style={{ backgroundColor: "#f9fafb", borderRadius: "8px", padding: "0.75rem", border: "1px solid #e5e7eb", marginTop: "0.25rem", fontSize: "0.82rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                      <span style={{ color: "#6b7280" }}>Subtotal ({totalItems} items):</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#16a34a", marginBottom: "2px" }}>
                        <span>Pro Discount:</span>
                        <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ color: "#6b7280" }}>Shipping:</span>
                      <span style={{ color: shippingCost === 0 ? "#16a34a" : "#000", fontWeight: 700 }}>
                        {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e5e7eb", paddingTop: "4px", fontSize: "0.95rem", fontWeight: 900 }}>
                      <span>Total Payable:</span>
                      <span style={{ color: "#065f46" }}>₹{grandTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      style={{ padding: "0.6rem 1.1rem", borderRadius: "8px", border: "1px solid #d1d5db", backgroundColor: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submittingOrder}
                      style={{
                        padding: "0.6rem 1.4rem",
                        borderRadius: "8px",
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        border: "none",
                        fontWeight: 800,
                        cursor: submittingOrder ? "not-allowed" : "pointer",
                        fontSize: "0.85rem",
                        opacity: submittingOrder ? 0.7 : 1,
                      }}
                    >
                      {submittingOrder ? "Confirming Order..." : "Confirm & Place Order"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

