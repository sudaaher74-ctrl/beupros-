import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Product } from "../../src/types/product";
import { fetchProducts } from "../../src/lib/api";
import { ProductCard } from "../../src/components/ProductCard";
import { colors } from "../../src/theme";

const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price ↑" },
  { key: "price-desc", label: "Price ↓" },
  { key: "discount", label: "Discount" },
];

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useLocalSearchParams<{ category?: string; search?: string }>();
  const category = params.category;
  const [search, setSearch] = useState(params.search ?? "");
  const [query, setQuery] = useState(params.search ?? "");

  useEffect(() => {
    setSearch(params.search ?? "");
    setQuery(params.search ?? "");
  }, [params.search, params.category]);
  const [sort, setSort] = useState("featured");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setQuery(search), 350);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [search]);

  const load = useCallback(async (p: number, replace: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetchProducts({ page: p, limit: 20, search: query, sort, category });
      setProducts((prev) => (replace ? r.products : [...prev, ...r.products]));
      setHasNext(r.pagination.hasNext);
      setPage(p);
    } catch (e: any) {
      setError(e.message || "Could not load products");
    } finally {
      setLoading(false);
    }
  }, [query, sort, category]);

  useEffect(() => { load(1, true); }, [load]);

  return (
    <View style={s.root}>
      <TextInput style={s.search} placeholder="Search salon products…" value={search} onChangeText={setSearch} autoCorrect={false} />
      <View style={s.sorts}>
        {SORTS.map((o) => (
          <Pressable key={o.key} onPress={() => setSort(o.key)} style={[s.chip, sort === o.key && s.chipOn]}>
            <Text style={[s.chipText, sort === o.key && { color: "#fff" }]}>{o.label}</Text>
          </Pressable>
        ))}
      </View>
      {category ? <Text style={s.cat}>Category: {category}</Text> : null}
      {error && <Text style={s.error}>{error}</Text>}
      <FlatList
        data={products}
        keyExtractor={(p) => p.id}
        numColumns={2}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={{ padding: 6 }}
        onEndReachedThreshold={0.5}
        onEndReached={() => { if (hasNext && !loading) load(page + 1, false); }}
        ListFooterComponent={loading ? <ActivityIndicator style={{ margin: 20 }} /> : undefined}
        ListEmptyComponent={!loading ? <Text style={s.empty}>No products found.</Text> : undefined}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  search: { margin: 12, marginBottom: 6, backgroundColor: "#fff", borderRadius: 12, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14 },
  sorts: { flexDirection: "row", gap: 8, paddingHorizontal: 12, paddingBottom: 6 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, borderWidth: 1, borderColor: colors.border, backgroundColor: "#fff" },
  chipOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipText: { fontSize: 12, fontWeight: "600", color: colors.ink },
  cat: { paddingHorizontal: 14, paddingBottom: 4, color: colors.muted, fontWeight: "600", fontSize: 12 },
  error: { color: colors.red, textAlign: "center", padding: 8 },
  empty: { textAlign: "center", color: colors.muted, marginTop: 40 },
});
