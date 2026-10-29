import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FREE_SHIPPING_THRESHOLD, useCart } from "../../src/context/CartContext";
import { formatINR, imageUrl } from "../../src/lib/api";
import { colors } from "../../src/theme";

export default function Cart() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
  const left = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (cart.length === 0)
    return (
      <View style={s.empty}>
        <Text style={s.emptyT}>Your bag is empty</Text>
        <Pressable style={s.btn} onPress={() => router.push("/shop")}><Text style={s.btnT}>Browse products</Text></Pressable>
      </View>
    );

  return (
    <View style={s.root}>
      <Text style={s.ship}>{left > 0 ? `Add ${formatINR(left)} more for free shipping` : "🎉 You've unlocked free shipping"}</Text>
      <FlatList
        data={cart}
        keyExtractor={(i) => i.product.id}
        contentContainerStyle={{ padding: 12, gap: 10 }}
        renderItem={({ item }) => (
          <View style={s.row}>
            <Image source={{ uri: imageUrl(item.product.image) }} style={s.img} contentFit="contain" />
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={s.name} numberOfLines={2}>{item.product.name}</Text>
              <Text style={s.price}>{formatINR(item.product.salePrice)}</Text>
              <View style={s.qtyRow}>
                <Pressable style={s.q} onPress={() => updateQuantity(item.product.id, item.quantity - 1)}><Text style={s.qT}>−</Text></Pressable>
                <Text style={s.qty}>{item.quantity}</Text>
                <Pressable style={s.q} onPress={() => updateQuantity(item.product.id, item.quantity + 1)}><Text style={s.qT}>+</Text></Pressable>
                <Pressable onPress={() => removeFromCart(item.product.id)} style={{ marginLeft: "auto" }}><Text style={{ color: colors.red, fontWeight: "600" }}>Remove</Text></Pressable>
              </View>
            </View>
          </View>
        )}
      />
      <View style={s.footer}>
        <View style={s.sumRow}><Text style={s.sumL}>Subtotal</Text><Text style={s.sumV}>{formatINR(subtotal)}</Text></View>
        <Pressable style={s.btn} onPress={() => router.push("/checkout")}><Text style={s.btnT}>Proceed to Checkout</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
  emptyT: { fontSize: 18, fontWeight: "700", color: colors.ink },
  ship: { textAlign: "center", padding: 10, backgroundColor: "#ecfdf5", color: "#065f46", fontWeight: "600", fontSize: 12 },
  row: { flexDirection: "row", gap: 12, backgroundColor: "#fff", borderRadius: 14, padding: 10, borderWidth: 1, borderColor: colors.border },
  img: { width: 80, height: 80, backgroundColor: colors.bg, borderRadius: 10 },
  name: { fontSize: 13, fontWeight: "600", color: colors.ink },
  price: { fontSize: 15, fontWeight: "800", color: colors.ink },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  q: { width: 28, height: 28, borderRadius: 8, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  qT: { fontSize: 16, fontWeight: "700" },
  qty: { minWidth: 20, textAlign: "center", fontWeight: "700" },
  footer: { padding: 16, backgroundColor: "#fff", borderTopWidth: 1, borderColor: colors.border, gap: 12 },
  sumRow: { flexDirection: "row", justifyContent: "space-between" },
  sumL: { color: colors.muted, fontWeight: "600" },
  sumV: { fontSize: 18, fontWeight: "800", color: colors.ink },
  btn: { backgroundColor: colors.ink, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 24, alignItems: "center" },
  btnT: { color: "#fff", fontWeight: "800" },
});
