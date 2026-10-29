import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { Card, P, Screen } from "../src/components/Screen";
import { fetchMyOrders, formatINR } from "../src/lib/api";
import { useAuth } from "../src/context/AuthContext";
import { Order } from "../src/types/order";
import { colors } from "../src/theme";

export default function Orders() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    fetchMyOrders().then((r) => setOrders(r.orders)).catch((e) => setError(e.message));
  }, [user]);

  if (authLoading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (!user)
    return (
      <Screen>
        <P>Sign in to see your orders.</P>
        <Pressable style={s.btn} onPress={() => router.push("/login")}><Text style={s.btnT}>Sign In</Text></Pressable>
      </Screen>
    );
  if (error) return <Screen><P>{error}</P></Screen>;
  if (!orders) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <Screen>
      {orders.length === 0 && <P>No orders yet.</P>}
      {orders.map((o) => (
        <Card key={o.id}>
          <Text style={s.id}>{o.id}</Text>
          <Text style={s.status}>{o.status} · Payment {o.paymentStatus}</Text>
          <P>{new Date(o.createdAt).toLocaleDateString("en-IN")} · {o.items.length} item(s)</P>
          {o.items.slice(0, 3).map((i) => <Text key={i.productId} style={s.item} numberOfLines={1}>{i.quantity} × {i.name}</Text>)}
          <Text style={s.total}>{formatINR(o.total)}</Text>
          {o.trackingNumber ? <P>Tracking: {o.trackingNumber}</P> : null}
        </Card>
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({
  id: { fontWeight: "800", fontSize: 15, color: colors.ink },
  status: { fontWeight: "700", color: colors.green, fontSize: 12 },
  item: { fontSize: 13, color: colors.ink },
  total: { fontWeight: "800", fontSize: 16, color: colors.ink },
  btn: { backgroundColor: colors.ink, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  btnT: { color: "#fff", fontWeight: "800" },
});
