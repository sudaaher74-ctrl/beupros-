"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
  Tag,
  FileText,
  X,
  Sparkles,
} from "lucide-react";
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

  // 18% GST estimate for salon input credit
  const gstEstimated = Math.round((subtotal * 18) / 118);

  if (cart.length === 0) {
    return (
      <div style={{ backgroundColor: "#f8f9fa", minHeight: "85vh", padding: "6rem 1.5rem", textAlign: "center" }}>
        <div className="container-custom" style={{ maxWidth: "520px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: "1px solid #f0f2f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem auto",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            }}
          >
            <ShoppingBag size={32} color="#94a3b8" />
          </div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.015em",
              marginBottom: "8px",
            }}
          >
            Your Salon Bag is Empty
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "2rem", lineHeight: 1.6 }}>
            You haven&apos;t added any salon formulations yet. Explore 4,200+ authentic pro products with verified trade pricing.
          </p>
          <Link
            href="/shop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              borderRadius: "9999px",
              backgroundColor: "#0f172a",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "13.5px",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(15, 23, 42, 0.15)",
            }}
          >
            Explore Pro Catalog <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "2.5rem 0 6rem 0" }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#64748b",
              marginBottom: "4px",
            }}
          >
            <Sparkles size={13} color="#0f172a" />
            Verified Wholesale Cart
          </div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Shopping Bag & Pro Savings
          </h1>
        </div>

        {/* Free Shipping Progress Meter Card */}
        <div
          style={{
            padding: "16px 20px",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #f0f2f5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "10px",
              flexWrap: "wrap",
              gap: "6px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: amountUntilFreeShipping === 0 ? "#ecfdf5" : "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Truck size={16} color={amountUntilFreeShipping === 0 ? "#10b981" : "#0f172a"} />
              </div>
              {amountUntilFreeShipping === 0 ? (
                <span style={{ color: "#059669", fontWeight: 700 }}>
                  🎉 You unlocked FREE Express Pro Delivery on this order!
                </span>
              ) : (
                <span style={{ color: "#334155" }}>
                  Add <strong>₹{amountUntilFreeShipping.toLocaleString("en-IN")}</strong> more to unlock{" "}
                  <strong style={{ color: "#0f172a" }}>FREE Pro Delivery</strong> (Target: ₹1,500)
                </span>
              )}
            </div>
            <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 700 }}>
              {progressPercent}% Complete
            </span>
          </div>

          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "#f1f5f9",
              borderRadius: "9999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                backgroundColor: amountUntilFreeShipping === 0 ? "#10b981" : "#0f172a",
                borderRadius: "9999px",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "2rem",
            alignItems: "flex-start",
          }}
        >
          {/* Left Column: Items Card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #f0f2f5",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              padding: "24px",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid #f0f2f5",
                paddingBottom: "14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#0f172a",
                }}
              >
                Salon Line Items ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
              <button
                onClick={clearCart}
                style={{
                  fontSize: "12px",
                  color: "#ef4444",
                  fontWeight: 700,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Clear All
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: "flex",
                    gap: "1.25rem",
                    padding: "1.25rem 0",
                    borderBottom: "1px solid #f0f2f5",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "84px",
                      height: "84px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "14px",
                      border: "1px solid #f0f2f5",
                      flexShrink: 0,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={item.product.image || "/placeholder.png"}
                      alt={item.product.name}
                      fill
                      sizes="84px"
                      style={{ objectFit: "contain", padding: "0.5rem" }}
                    />
                  </div>

                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minWidth: 0,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          color: "#64748b",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {item.product.brand} • {item.product.category}
                      </div>
                      <Link
                        href={`/product/${item.product.id}`}
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#0f172a",
                          lineHeight: 1.35,
                          textDecoration: "none",
                          marginTop: "3px",
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
                        marginTop: "12px",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      {/* Stepper */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #e2e8f0",
                          borderRadius: "9999px",
                          padding: "2px 6px",
                          backgroundColor: "#ffffff",
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "50%",
                            border: "none",
                            backgroundColor: "#f8f9fa",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "#0f172a",
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          style={{
                            minWidth: "32px",
                            textAlign: "center",
                            fontWeight: 700,
                            fontSize: "13px",
                            color: "#0f172a",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "50%",
                            border: "none",
                            backgroundColor: "#f8f9fa",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "#0f172a",
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Line total */}
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a" }}>
                          ₹{(item.product.salePrice * item.quantity).toLocaleString("en-IN")}
                        </div>
                        {item.quantity > 1 && (
                          <div style={{ fontSize: "11px", color: "#64748b" }}>
                            ₹{item.product.salePrice.toLocaleString("en-IN")} each
                          </div>
                        )}
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{
                          color: "#94a3b8",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "4px",
                        }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ paddingTop: "16px" }}>
              <Link
                href="/shop"
                style={{
                  fontSize: "12.5px",
                  fontWeight: 700,
                  color: "#0f172a",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                ← Continue Adding Pro Products
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "20px",
              border: "1px solid #f0f2f5",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            }}
          >
            <h2
              style={{
                fontSize: "15px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#0f172a",
                marginBottom: "16px",
              }}
            >
              Wholesale Order Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <input
                type="text"
                placeholder="Promo Code (e.g. PRO10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: "9px 14px",
                  border: "1px solid #eef0f3",
                  borderRadius: "9999px",
                  fontSize: "12.5px",
                  backgroundColor: "#f8f9fa",
                  outline: "none",
                  color: "#0f172a",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  padding: "9px 18px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Apply
              </button>
            </form>

            {couponApplied && (
              <div
                style={{
                  fontSize: "12px",
                  color: "#059669",
                  fontWeight: 700,
                  marginBottom: "16px",
                  backgroundColor: "#ecfdf5",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Tag size={13} /> Coupon applied! 10% Pro Discount saved.
              </div>
            )}

            {/* Subtotals breakdown */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "13px",
                color: "#475569",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal (Catalog Value)</span>
                <span style={{ fontWeight: 700, color: "#0f172a" }}>
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {discountAmount > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#059669",
                    fontWeight: 700,
                  }}
                >
                  <span>Trade Discount (10%)</span>
                  <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Estimated Express Shipping</span>
                <span
                  style={{
                    fontWeight: 700,
                    color: shippingCost === 0 ? "#059669" : "#0f172a",
                  }}
                >
                  {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                </span>
              </div>

              {/* GST Input Credit Note */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #f0f2f5",
                  fontSize: "11.5px",
                  color: "#64748b",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <FileText size={13} /> Incl. GST (18% ITC)
                </span>
                <span style={{ fontWeight: 700, color: "#0f172a" }}>
                  ₹{gstEstimated.toLocaleString("en-IN")}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "18px",
                  fontWeight: 900,
                  color: "#0f172a",
                  paddingTop: "12px",
                  borderTop: "1px solid #f0f2f5",
                }}
              >
                <span>Total Payable</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>

              <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                Inclusive of all taxes & insurance. B2B GST tax invoice generated on dispatch.
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "9999px",
                border: "none",
                backgroundColor: "#0f172a",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "13.5px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.18)",
              }}
            >
              <ShieldCheck size={18} /> Proceed to Wholesale Checkout
            </button>

            {/* Trust Strip Under Summary */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "10px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  color: "#64748b",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: 700, color: "#0f172a" }}>Direct Sourced</div>
                <div>100% Genuine batch</div>
              </div>
              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "10px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  color: "#64748b",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: 700, color: "#0f172a" }}>Safe Dispatch</div>
                <div>Damage-proof pack</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SALEDASH WHOLESALE TRADE CHECKOUT MODAL */}
      {/* ========================================================================= */}
      {isCheckoutOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.45)",
            backdropFilter: "blur(4px)",
            zIndex: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              maxWidth: "540px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "28px",
              position: "relative",
              boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
              border: "1px solid #f0f2f5",
            }}
          >
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setConfirmedOrder(null);
              }}
              style={{
                position: "absolute",
                right: "18px",
                top: "18px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "#f1f5f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              <X size={16} />
            </button>

            {confirmedOrder ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "#ecfdf5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px auto",
                    color: "#059669",
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#0f172a",
                    margin: "0 0 6px 0",
                  }}
                >
                  Trade Order Confirmed!
                </h3>
                <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>
                  Your order <strong style={{ color: "#0f172a", fontFamily: "monospace" }}>{confirmedOrder.id}</strong> has been received and routed to the BeuPROS warehouse.
                </p>

                <div
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: "16px",
                    padding: "16px",
                    textAlign: "left",
                    fontSize: "12.5px",
                    marginBottom: "20px",
                    border: "1px solid #f0f2f5",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ color: "#64748b" }}>Salon:</span>
                    <strong style={{ color: "#0f172a" }}>{confirmedOrder.salonName}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ color: "#64748b" }}>Payment:</span>
                    <strong style={{ color: "#0f172a" }}>{confirmedOrder.paymentMethod}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ color: "#64748b" }}>Items:</span>
                    <strong style={{ color: "#0f172a" }}>{confirmedOrder.items?.length} SKUs</strong>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "1px solid #e2e8f0",
                      paddingTop: "8px",
                      marginTop: "8px",
                      fontSize: "14px",
                      fontWeight: 800,
                    }}
                  >
                    <span>Order Total:</span>
                    <span style={{ color: "#0f172a" }}>₹{confirmedOrder.total?.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                  <Link
                    href="/admin"
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setConfirmedOrder(null);
                    }}
                    style={{
                      backgroundColor: "#0f172a",
                      color: "#ffffff",
                      padding: "10px 20px",
                      borderRadius: "9999px",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    View in Admin Orders →
                  </Link>
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setConfirmedOrder(null);
                    }}
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#0f172a",
                      padding: "10px 20px",
                      borderRadius: "9999px",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      border: "1px solid #e2e8f0",
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span
                    style={{
                      backgroundColor: "#ecfdf5",
                      color: "#059669",
                      padding: "3px 8px",
                      borderRadius: "9999px",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    Wholesale Dispatch
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#0f172a",
                    margin: "0 0 16px 0",
                  }}
                >
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
                  style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                        Salon Name
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.salonName}
                        onChange={(e) => setCheckoutData({ ...checkoutData, salonName: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          border: "1px solid #eef0f3",
                          backgroundColor: "#f8f9fa",
                          fontSize: "12.5px",
                          marginTop: "4px",
                          boxSizing: "border-box",
                          outline: "none",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                        Owner / Stylist
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.customerName}
                        onChange={(e) => setCheckoutData({ ...checkoutData, customerName: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          border: "1px solid #eef0f3",
                          backgroundColor: "#f8f9fa",
                          fontSize: "12.5px",
                          marginTop: "4px",
                          boxSizing: "border-box",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={checkoutData.phone}
                        onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          border: "1px solid #eef0f3",
                          backgroundColor: "#f8f9fa",
                          fontSize: "12.5px",
                          marginTop: "4px",
                          boxSizing: "border-box",
                          outline: "none",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={checkoutData.email}
                        onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          border: "1px solid #eef0f3",
                          backgroundColor: "#f8f9fa",
                          fontSize: "12.5px",
                          marginTop: "4px",
                          boxSizing: "border-box",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                      Salon Delivery Address
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Shop/Floor, Street, Landmark"
                      value={checkoutData.street}
                      onChange={(e) => setCheckoutData({ ...checkoutData, street: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        border: "1px solid #eef0f3",
                        backgroundColor: "#f8f9fa",
                        fontSize: "12.5px",
                        marginTop: "4px",
                        boxSizing: "border-box",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.city}
                        onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          borderRadius: "10px",
                          border: "1px solid #eef0f3",
                          backgroundColor: "#f8f9fa",
                          fontSize: "12px",
                          marginTop: "4px",
                          boxSizing: "border-box",
                          outline: "none",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.state}
                        onChange={(e) => setCheckoutData({ ...checkoutData, state: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          borderRadius: "10px",
                          border: "1px solid #eef0f3",
                          backgroundColor: "#f8f9fa",
                          fontSize: "12px",
                          marginTop: "4px",
                          boxSizing: "border-box",
                          outline: "none",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                        PIN Code
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.pincode}
                        onChange={(e) => setCheckoutData({ ...checkoutData, pincode: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          borderRadius: "10px",
                          border: "1px solid #eef0f3",
                          backgroundColor: "#f8f9fa",
                          fontSize: "12px",
                          marginTop: "4px",
                          boxSizing: "border-box",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                      Trade Payment Method
                    </label>
                    <select
                      value={checkoutData.paymentMethod}
                      onChange={(e) => setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        border: "1px solid #eef0f3",
                        backgroundColor: "#f8f9fa",
                        fontSize: "12.5px",
                        marginTop: "4px",
                        boxSizing: "border-box",
                        outline: "none",
                        fontWeight: 600,
                        color: "#0f172a",
                      }}
                    >
                      <option value="Pay on Delivery (Trade Wholesale)">Pay on Delivery (Trade Wholesale)</option>
                      <option value="UPI / Direct Bank Transfer">UPI / Direct Bank Transfer</option>
                      <option value="Pro Trade Credit (Net 30)">Pro Trade Credit (Net 30)</option>
                    </select>
                  </div>

                  {/* Order Total Pill */}
                  <div
                    style={{
                      backgroundColor: "#f8f9fa",
                      borderRadius: "14px",
                      padding: "12px 14px",
                      border: "1px solid #f0f2f5",
                      marginTop: "4px",
                      fontSize: "12.5px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ color: "#64748b" }}>Payable Amount:</span>
                      <strong style={{ fontSize: "15px", color: "#0f172a" }}>
                        ₹{grandTotal.toLocaleString("en-IN")}
                      </strong>
                    </div>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                      Includes 18% GST invoice and all shipping insurance.
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "8px" }}>
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      style={{
                        padding: "9px 16px",
                        borderRadius: "9999px",
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#ffffff",
                        fontWeight: 700,
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submittingOrder}
                      style={{
                        padding: "9px 20px",
                        borderRadius: "9999px",
                        backgroundColor: "#0f172a",
                        color: "#ffffff",
                        border: "none",
                        fontWeight: 700,
                        fontSize: "12.5px",
                        cursor: submittingOrder ? "not-allowed" : "pointer",
                        opacity: submittingOrder ? 0.7 : 1,
                        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
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
    </div>
  );
}
