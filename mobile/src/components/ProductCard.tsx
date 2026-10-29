import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Product } from "../types/product";
import { formatINR, imageUrl } from "../lib/api";
import { useCart } from "../context/CartContext";
import { colors } from "../theme";

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  return (
    <Pressable style={s.card} onPress={() => router.push(`/product/${product.id}`)}>
      <View style={s.imgBox}>
        {product.discountPercent > 0 && (
          <Text style={s.badge}>{product.discount}</Text>
        )}
        <Image source={{ uri: imageUrl(product.image) }} style={s.img} contentFit="contain" />
      </View>
      <View style={s.body}>
        <Text style={s.brand}>{product.brand}</Text>
        <Text style={s.name} numberOfLines={2}>{product.name}</Text>
        <View style={s.row}>
          <Text style={s.price}>{formatINR(product.salePrice)}</Text>
          {product.mrp > product.salePrice && <Text style={s.mrp}>{formatINR(product.mrp)}</Text>}
        </View>
        <Pressable style={s.btn} onPress={() => addToCart(product, 1)}>
          <Text style={s.btnText}>Add to Bag</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: { flex: 1, margin: 6, backgroundColor: colors.card, borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  imgBox: { aspectRatio: 1, backgroundColor: colors.bg },
  img: { width: "100%", height: "100%" },
  badge: { position: "absolute", top: 8, left: 8, zIndex: 2, backgroundColor: colors.ink, color: "#fff", fontSize: 10, fontWeight: "700", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 99, overflow: "hidden" },
  body: { padding: 10, gap: 4 },
  brand: { fontSize: 10, fontWeight: "700", color: colors.muted, textTransform: "uppercase" },
  name: { fontSize: 13, fontWeight: "600", color: colors.ink, minHeight: 34 },
  row: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  price: { fontSize: 15, fontWeight: "800", color: colors.ink },
  mrp: { fontSize: 11, color: colors.muted, textDecorationLine: "line-through" },
  btn: { marginTop: 6, backgroundColor: colors.ink, borderRadius: 10, paddingVertical: 9, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 12 },
});
