import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Field } from "../src/components/Field";
import { FREE_SHIPPING_THRESHOLD, useCart } from "../src/context/CartContext";
import { useAuth } from "../src/context/AuthContext";
import { formatINR, placeOrder, validateCoupon } from "../src/lib/api";
import { Order, PaymentMethod } from "../src/types/order";
import { colors } from "../src/theme";

const METHODS: PaymentMethod[] = ["Pay on Delivery (Trade Wholesale)", "UPI / Direct Bank Transfer", "Pro Trade Credit (Net 30)"];

export default function Checkout() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, subtotal, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [freeShip, setFreeShip] = useState(false);
  const [busy, setBusy] = useState(false);
  const [confirmed, setConfirmed] = useState<Order | null>(null);
  const [f, setF] = useState({
    salonName: user?.salonName ?? "", customerName: user?.name ?? "", phone: user?.phone ?? "", email: user?.email ?? "",
    street: user?.address ?? "", city: user?.city ?? "", state: user?.state ?? "", pincode: user?.pincode ?? "",
    paymentMethod: METHODS[0], notes: "",
  });
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const shipping = freeShip || subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discount + shipping);

  const applyCoupon = async () => {
    const c = coupon.trim();
    if (!c) return;
    try {
      const r = await validateCoupon(c, subtotal);
      setDiscount(r.discount);
      setFreeShip(r.freeShipping);
      setAppliedCode(c.toUpperCase());
    } catch (e: any) {
      setDiscount(0);
      setFreeShip(false);
      setAppliedCode(null);
      Alert.alert("Invalid code", e.message);
    }
  };

  const submit = async () => {
    setBusy(true);
    try {
      const r = await placeOrder({
        salonName: f.salonName, customerName: f.customerName, phone: f.phone, email: f.email,
        shippingAddress: { street: f.street, city: f.city, state: f.state, pincode: f.pincode },
        items: cart.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
        couponCode: appliedCode ?? undefined,
        paymentMethod: f.paymentMethod,
        notes: f.notes,
      });
      setConfirmed(r.order);
      clearCart();
    } catch (e: any) {
      Alert.alert("Order failed", e.message);
    } finally {
      setBusy(false);
    }
  };

  if (confirmed)
    return (
      <View style={s.done}>
        <Text style={{ fontSize: 48 }}>✅</Text>
        <Text style={s.h}>Order placed!</Text>
        <Text style={s.sub}>Order ID: {confirmed.id}</Text>
        <Text style={s.sub}>Total: {formatINR(confirmed.total)}</Text>
        <Pressable style={s.btn} onPress={() => router.replace("/shop")}><Text style={s.btnT}>Continue Shopping</Text></Pressable>
      </View>
    );

  if (!user)
    return (
      <View style={s.done}>
        <Text style={s.h}>Sign in to order</Text>
        <Text style={s.sub}>Wholesale ordering is for approved salon trade accounts.</Text>
        <Pressable style={s.btn} onPress={() => router.push("/login")}><Text style={s.btnT}>Sign In</Text></Pressable>
      </View>
    );

  if (user.role !== "admin" && user.status !== "approved")
    return (
      <View style={s.done}>
        <Text style={s.h}>Account {user.status}</Text>
        <Text style={s.sub}>You can order once your trade account is approved.</Text>
      </View>
    );

  if (cart.length === 0) return <Text style={{ textAlign: "center", marginTop: 60 }}>Your bag is empty.</Text>;

  return (
    <ScrollView contentContainerStyle={s.c}>
      <Field label="Salon name *" value={f.salonName} onChangeText={set("salonName")} autoCapitalize="words" />
      <Field label="Contact name *" value={f.customerName} onChangeText={set("customerName")} autoCapitalize="words" />
      <Field label="Phone" value={f.phone} onChangeText={set("phone")} keyboardType="phone-pad" />
      <Field label="Email" value={f.email} onChangeText={set("email")} keyboardType="email-address" />
      <Field label="Street address" value={f.street} onChangeText={set("street")} autoCapitalize="sentences" />
      <Field label="City" value={f.city} onChangeText={set("city")} autoCapitalize="words" />
      <Field label="State" value={f.state} onChangeText={set("state")} autoCapitalize="words" />
      <Field label="Pincode" value={f.pincode} onChangeText={set("pincode")} keyboardType="number-pad" />
      <Text style={s.label}>Payment method</Text>
      {METHODS.map((m) => (
        <Pressable key={m} onPress={() => setF((p) => ({ ...p, paymentMethod: m }))} style={[s.opt, f.paymentMethod === m && s.optOn]}>
          <Text style={[s.optT, f.paymentMethod === m && { color: "#fff" }]}>{m}</Text>
        </Pressable>
      ))}
      <Field label="Order notes" value={f.notes} onChangeText={set("notes")} multiline autoCapitalize="sentences" />
      <View style={{ flexDirection: "row", gap: 8, alignItems: "flex-end" }}>
        <View style={{ flex: 1 }}><Field label="Coupon code" value={coupon} onChangeText={setCoupon} autoCapitalize="characters" /></View>
        <Pressable style={s.apply} onPress={applyCoupon}><Text style={s.btnT}>Apply</Text></Pressable>
      </View>
      <View style={s.sum}>
        <Row k="Subtotal" v={formatINR(subtotal)} />
        {discount > 0 && <Row k="Discount" v={`− ${formatINR(discount)}`} />}
        <Row k="Shipping" v={shipping === 0 ? "FREE" : formatINR(shipping)} />
        <Row k="Total" v={formatINR(total)} bold />
      </View>
      <Pressable style={[s.btn, busy && { opacity: 0.6 }]} disabled={busy || !f.salonName || !f.customerName} onPress={submit}>
        <Text style={s.btnT}>{busy ? "Placing order…" : "Place Order"}</Text>
      </Pressable>
    </ScrollView>
  );
}

const Row = ({ k, v, bold }: { k: string; v: string; bold?: boolean }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <Text style={{ color: colors.muted, fontWeight: bold ? "800" : "600" }}>{k}</Text>
    <Text style={{ color: colors.ink, fontWeight: bold ? "800" : "600", fontSize: bold ? 18 : 14 }}>{v}</Text>
  </View>
);

const s = StyleSheet.create({
  c: { padding: 16, gap: 12, paddingBottom: 60 },
  label: { fontSize: 12, fontWeight: "700", color: colors.ink },
  opt: { padding: 12, borderRadius: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: "#fff" },
  optOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  optT: { fontWeight: "600", color: colors.ink },
  apply: { backgroundColor: colors.ink, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 12 },
  sum: { backgroundColor: "#fff", borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 14, gap: 8 },
  btn: { backgroundColor: colors.ink, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 24, alignItems: "center" },
  btnT: { color: "#fff", fontWeight: "800" },
  done: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10, padding: 24 },
  h: { fontSize: 22, fontWeight: "800", color: colors.ink },
  sub: { color: colors.muted },
});
