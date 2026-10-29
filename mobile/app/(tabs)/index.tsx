import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Product } from "../../src/types/product";
import { fetchProducts } from "../../src/lib/api";
import { ProductCard } from "../../src/components/ProductCard";
import { useAuth } from "../../src/context/AuthContext";
import { colors } from "../../src/theme";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [deals, setDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ limit: 10, sort: "discount" })
      .then((r) => setDeals(r.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={s.root}>
      <View style={s.hero}>
        <Text style={s.kicker}>PROFESSIONAL SALON SUPPLIES</Text>
        <Text style={s.title}>One stop solution for all salon consumables</Text>
        <Text style={s.sub}>Wholesale prices · Cash on Delivery · Free shipping over ₹1,500</Text>
        <Pressable style={s.cta} onPress={() => router.push("/shop")}>
          <Text style={s.ctaText}>Shop Now</Text>
        </Pressable>
        {!user && (
          <Pressable onPress={() => router.push("/register")}>
            <Text style={s.link}>Apply for a trade account →</Text>
          </Pressable>
        )}
      </View>
      <View style={s.quick}>
        {[["Pro Stylist AI", "/chat"], ["Education", "/education"], ["Pro Blog", "/blogs"], ["Stores", "/stores"]].map(([l, h]) => (
          <Pressable key={l} style={s.q} onPress={() => router.push(h as any)}><Text style={s.qT}>{l}</Text></Pressable>
        ))}
      </View>
      <Text style={s.h2}>Top Deals</Text>
      {loading ? (
        <ActivityIndicator style={{ margin: 30 }} />
      ) : (
        <FlatList
          horizontal
          data={deals}
          keyExtractor={(p) => p.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          renderItem={({ item }) => <View style={{ width: 180 }}><ProductCard product={item} /></View>}
        />
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  hero: { backgroundColor: colors.ink, padding: 24, gap: 10 },
  kicker: { color: "#94a3b8", fontSize: 11, fontWeight: "700", letterSpacing: 1.2 },
  title: { color: "#fff", fontSize: 26, fontWeight: "800" },
  sub: { color: "#cbd5e1", fontSize: 13 },
  cta: { backgroundColor: "#fff", alignSelf: "flex-start", paddingHorizontal: 22, paddingVertical: 11, borderRadius: 99, marginTop: 6 },
  ctaText: { fontWeight: "800", color: colors.ink },
  link: { color: "#e2e8f0", fontSize: 13, fontWeight: "600", marginTop: 4 },
  quick: { flexDirection: "row", flexWrap: "wrap", gap: 8, padding: 14 },
  q: { backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, borderRadius: 99, paddingHorizontal: 14, paddingVertical: 8 },
  qT: { fontWeight: "700", color: colors.ink, fontSize: 12 },
  h2: { fontSize: 18, fontWeight: "800", color: colors.ink, margin: 16 },
});
