"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  ArrowRight,
  Truck,
  CheckCircle2,
  Tag,
  FileText,
} from "lucide-react";
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
  const gstEstimated = Math.round((subtotal * 18) / 118);

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
            padding: "16px 20px",
            borderBottom: "1px solid #f0f2f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#f8f9fa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingBag size={16} color="#0f172a" />
            </div>
            <h3
              style={{
                fontSize: "15px",
                fontWeight: 800,
                color: "#0f172a",
                margin: 0,
              }}
            >
              Salon Bag ({totalItems})
            </h3>
          </div>
          <button
            onClick={closeCart}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#f1f5f9",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#64748b",
            }}
            aria-label="Close cart"
          >
            <X size={16} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div
          style={{
            padding: "12px 20px",
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #f0f2f5",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "12px",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Truck
                size={15}
                color={amountUntilFreeShipping === 0 ? "#10b981" : "#0f172a"}
              />
              {amountUntilFreeShipping === 0 ? (
                <span style={{ color: "#059669", fontWeight: 700 }}>
                  🎉 FREE Pro Delivery unlocked!
                </span>
              ) : (
                <span style={{ color: "#334155" }}>
                  Add <strong>₹{amountUntilFreeShipping.toLocaleString("en-IN")}</strong> for{" "}
                  <strong>FREE Delivery</strong>
                </span>
              )}
            </div>
            <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700 }}>
              {progressPercent}%
            </span>
          </div>

          <div
            style={{
              width: "100%",
              height: "6px",
              backgroundColor: "#e2e8f0",
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

        {/* Cart Item List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
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
                color: "#64748b",
                padding: "2rem 0",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#f8f9fa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "12px",
                }}
              >
                <ShoppingBag size={28} color="#94a3b8" />
              </div>
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: "4px",
                }}
              >
                Your bag is empty
              </h4>
              <p
                style={{
                  fontSize: "13px",
                  maxWidth: "240px",
                  marginBottom: "1.25rem",
                  lineHeight: 1.5,
                }}
              >
                Explore 4,200+ salon-grade beauty supplies with trade wholesale pricing.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                style={{
                  display: "inline-flex",
                  padding: "9px 20px",
                  borderRadius: "9999px",
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
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
                  gap: "12px",
                  paddingBottom: "14px",
                  borderBottom: "1px solid #f0f2f5",
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    position: "relative",
                    width: "72px",
                    height: "72px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "12px",
                    border: "1px solid #f0f2f5",
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={item.product.image || "/placeholder.png"}
                    alt={item.product.name}
                    fill
                    sizes="72px"
                    style={{ objectFit: "contain", padding: "0.3rem" }}
                  />
                </div>

                {/* Details */}
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
                        fontSize: "10.5px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: "#64748b",
                      }}
                    >
                      {item.product.brand}
                    </div>
                    <Link
                      href={`/product/${item.product.id}`}
                      onClick={closeCart}
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#0f172a",
                        lineHeight: 1.3,
                        display: "block",
                        textDecoration: "none",
                        marginTop: "2px",
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
                      marginTop: "8px",
                      flexWrap: "wrap",
                      gap: "6px",
                    }}
                  >
                    {/* Quantity Selector */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #e2e8f0",
                        borderRadius: "9999px",
                        backgroundColor: "#ffffff",
                        padding: "1px 4px",
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          border: "none",
                          backgroundColor: "#f8f9fa",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          color: "#0f172a",
                        }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={11} />
                      </button>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          minWidth: "24px",
                          textAlign: "center",
                          color: "#0f172a",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          border: "none",
                          backgroundColor: "#f8f9fa",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          color: "#0f172a",
                        }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>
                        ₹{(item.product.salePrice * item.quantity).toLocaleString("en-IN")}
                      </div>
                      {item.quantity > 1 && (
                        <div style={{ fontSize: "10.5px", color: "#64748b" }}>
                          ₹{item.product.salePrice.toLocaleString("en-IN")} ea
                        </div>
                      )}
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      style={{
                        color: "#94a3b8",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "2px",
                      }}
                      title="Remove item"
                    >
                      <Trash2 size={15} />
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
              padding: "16px 20px",
              borderTop: "1px solid #f0f2f5",
              backgroundColor: "#ffffff",
            }}
          >
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
              <input
                type="text"
                placeholder="Promo Code (PRO10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: "7px 12px",
                  border: "1px solid #eef0f3",
                  borderRadius: "9999px",
                  fontSize: "12px",
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
                  borderRadius: "9999px",
                  padding: "7px 14px",
                  fontSize: "11.5px",
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
                  fontSize: "11.5px",
                  color: "#059669",
                  fontWeight: 700,
                  marginBottom: "10px",
                  backgroundColor: "#ecfdf5",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Tag size={12} /> PRO10 applied (10% Pro Discount)
              </div>
            )}

            {/* Subtotals */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                fontSize: "12.5px",
                color: "#475569",
                marginBottom: "14px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
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
                  <span>Pro Discount</span>
                  <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Shipping</span>
                <span
                  style={{
                    fontWeight: 700,
                    color: shippingCost === 0 ? "#059669" : "#0f172a",
                  }}
                >
                  {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "15px",
                  fontWeight: 800,
                  color: "#0f172a",
                  paddingTop: "8px",
                  borderTop: "1px solid #f0f2f5",
                }}
              >
                <span>Total Payable</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <FileText size={11} /> Incl. ₹{gstEstimated.toLocaleString("en-IN")} GST input tax credit
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                onClick={() => setIsCheckoutOpen(true)}
                style={{
                  width: "100%",
                  padding: "11px",
                  borderRadius: "9999px",
                  border: "none",
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
                }}
              >
                <ShieldCheck size={16} /> Proceed to Wholesale Checkout
              </button>
              <Link
                href="/cart"
                onClick={closeCart}
                style={{
                  width: "100%",
                  padding: "9px",
                  borderRadius: "9999px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                  color: "#0f172a",
                  fontSize: "12px",
                  fontWeight: 700,
                  textAlign: "center",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  boxSizing: "border-box",
                }}
              >
                View Full Bag & Savings <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
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
              padding: "26px",
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
                right: "16px",
                top: "16px",
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
                    margin: "0 auto 12px auto",
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
                <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "18px" }}>
                  Your order <strong style={{ color: "#0f172a", fontFamily: "monospace" }}>{confirmedOrder.id}</strong> has been received and routed to the BeuPROS warehouse.
                </p>

                <div
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: "16px",
                    padding: "16px",
                    textAlign: "left",
                    fontSize: "12.5px",
                    marginBottom: "18px",
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
                      closeCart();
                    }}
                    style={{
                      backgroundColor: "#0f172a",
                      color: "#ffffff",
                      padding: "9px 18px",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      textDecoration: "none",
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
                      backgroundColor: "#ffffff",
                      color: "#0f172a",
                      padding: "9px 18px",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      border: "1px solid #e2e8f0",
                      cursor: "pointer",
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
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
                    fontSize: "18px",
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
                  style={{ display: "flex", flexDirection: "column", gap: "10px" }}
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
                          padding: "8px 10px",
                          borderRadius: "10px",
                          border: "1px solid #eef0f3",
                          backgroundColor: "#f8f9fa",
                          fontSize: "12px",
                          marginTop: "3px",
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
                          padding: "8px 10px",
                          borderRadius: "10px",
                          border: "1px solid #eef0f3",
                          backgroundColor: "#f8f9fa",
                          fontSize: "12px",
                          marginTop: "3px",
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
                          padding: "8px 10px",
                          borderRadius: "10px",
                          border: "1px solid #eef0f3",
                          backgroundColor: "#f8f9fa",
                          fontSize: "12px",
                          marginTop: "3px",
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
                          padding: "8px 10px",
                          borderRadius: "10px",
                          border: "1px solid #eef0f3",
                          backgroundColor: "#f8f9fa",
                          fontSize: "12px",
                          marginTop: "3px",
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
                        padding: "8px 10px",
                        borderRadius: "10px",
                        border: "1px solid #eef0f3",
                        backgroundColor: "#f8f9fa",
                        fontSize: "12px",
                        marginTop: "3px",
                        boxSizing: "border-box",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                    <div>
                      <label style={{ fontSize: "10.5px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.city}
                        onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "7px 8px",
                          borderRadius: "8px",
                          border: "1px solid #eef0f3",
                          backgroundColor: "#f8f9fa",
                          fontSize: "11.5px",
                          marginTop: "3px",
                          boxSizing: "border-box",
                          outline: "none",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "10.5px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.state}
                        onChange={(e) => setCheckoutData({ ...checkoutData, state: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "7px 8px",
                          borderRadius: "8px",
                          border: "1px solid #eef0f3",
                          backgroundColor: "#f8f9fa",
                          fontSize: "11.5px",
                          marginTop: "3px",
                          boxSizing: "border-box",
                          outline: "none",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "10.5px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                        PIN Code
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.pincode}
                        onChange={(e) => setCheckoutData({ ...checkoutData, pincode: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "7px 8px",
                          borderRadius: "8px",
                          border: "1px solid #eef0f3",
                          backgroundColor: "#f8f9fa",
                          fontSize: "11.5px",
                          marginTop: "3px",
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
                        padding: "7px 10px",
                        borderRadius: "10px",
                        border: "1px solid #eef0f3",
                        backgroundColor: "#f8f9fa",
                        fontSize: "12px",
                        marginTop: "3px",
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

                  {/* Summary Box */}
                  <div
                    style={{
                      backgroundColor: "#f8f9fa",
                      borderRadius: "12px",
                      padding: "10px 12px",
                      border: "1px solid #f0f2f5",
                      marginTop: "2px",
                      fontSize: "12px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                      <span style={{ color: "#64748b" }}>Payable Amount:</span>
                      <strong style={{ fontSize: "14px", color: "#0f172a" }}>
                        ₹{grandTotal.toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "6px" }}>
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "9999px",
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#ffffff",
                        fontWeight: 700,
                        fontSize: "11.5px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submittingOrder}
                      style={{
                        padding: "8px 18px",
                        borderRadius: "9999px",
                        backgroundColor: "#0f172a",
                        color: "#ffffff",
                        border: "none",
                        fontWeight: 700,
                        fontSize: "12px",
                        cursor: submittingOrder ? "not-allowed" : "pointer",
                        opacity: submittingOrder ? 0.7 : 1,
                      }}
                    >
                      {submittingOrder ? "Confirming..." : "Confirm & Place Order"}
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
