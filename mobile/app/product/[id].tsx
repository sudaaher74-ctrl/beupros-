import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Product } from "../../src/types/product";
import { fetchProduct, formatINR, imageUrl } from "../../src/lib/api";
import { useCart } from "../../src/context/CartContext";
import { colors } from "../../src/theme";

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchProduct(String(id)).then(setProduct).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (!product) return <Text style={{ textAlign: "center", marginTop: 60 }}>Product not found.</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <Image source={{ uri: imageUrl(product.image) }} style={s.img} contentFit="contain" />
        <View style={s.body}>
          <Text style={s.brand}>{product.brand}</Text>
          <Text style={s.name}>{product.name}</Text>
          <Text style={s.rating}>★ {product.rating} ({product.reviewsCount} reviews)</Text>
          <View style={s.priceRow}>
            <Text style={s.price}>{formatINR(product.salePrice)}</Text>
            {product.mrp > product.salePrice && <Text style={s.mrp}>{formatINR(product.mrp)}</Text>}
            {product.discountPercent > 0 && <Text style={s.off}>{product.discount}</Text>}
          </View>
          <Text style={s.desc}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={s.footer}>
        <View style={s.qtyRow}>
          <Pressable style={s.q} onPress={() => setQty(Math.max(1, qty - 1))}><Text style={s.qT}>−</Text></Pressable>
          <Text style={s.qty}>{qty}</Text>
          <Pressable style={s.q} onPress={() => setQty(qty + 1)}><Text style={s.qT}>+</Text></Pressable>
        </View>
        <Pressable style={s.btn} onPress={() => { addToCart(product, qty); router.push("/cart"); }}>
          <Text style={s.btnT}>Add to Bag</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  img: { width: "100%", aspectRatio: 1, backgroundColor: colors.bg },
  body: { padding: 18, gap: 8 },
  brand: { fontSize: 12, fontWeight: "700", color: colors.muted, textTransform: "uppercase" },
  name: { fontSize: 20, fontWeight: "800", color: colors.ink },
  rating: { color: "#b45309", fontWeight: "600" },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: 10 },
  price: { fontSize: 24, fontWeight: "800", color: colors.ink },
  mrp: { fontSize: 14, color: colors.muted, textDecorationLine: "line-through" },
  off: { color: colors.green, fontWeight: "700" },
  desc: { color: colors.muted, lineHeight: 20, marginTop: 6 },
  footer: { flexDirection: "row", gap: 12, padding: 14, borderTopWidth: 1, borderColor: colors.border, alignItems: "center" },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  q: { width: 36, height: 36, borderRadius: 10, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  qT: { fontSize: 18, fontWeight: "700" },
  qty: { minWidth: 24, textAlign: "center", fontWeight: "700", fontSize: 16 },
  btn: { flex: 1, backgroundColor: colors.ink, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  btnT: { color: "#fff", fontWeight: "800" },
});
