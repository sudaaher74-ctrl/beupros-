import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";
import { colors } from "../../src/theme";

export default function Account() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user)
    return (
      <View style={s.center}>
        <Text style={s.title}>Welcome to BeuPros</Text>
        <Text style={s.sub}>Sign in with your salon trade account to order wholesale.</Text>
        <Pressable style={s.btn} onPress={() => router.push("/login")}><Text style={s.btnT}>Sign In</Text></Pressable>
        <Pressable onPress={() => router.push("/register")}><Text style={s.link}>Apply for a trade account</Text></Pressable>
      </View>
    );

  const rows: [string, string][] = [
    ["Salon", user.salonName], ["Business type", user.businessType], ["Email", user.email], ["Phone", user.phone],
    ["Address", `${user.address}, ${user.city}, ${user.state} ${user.pincode}`],
  ];
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={s.title}>{user.name}</Text>
      <Text style={[s.status, user.status === "approved" ? { color: colors.green } : user.status === "rejected" ? { color: colors.red } : { color: "#b45309" }]}>
        Account status: {user.status}
      </Text>
      {user.status === "rejected" && user.rejectionReason ? <Text style={s.sub}>{user.rejectionReason}</Text> : null}
      <View style={s.card}>
        {rows.map(([k, v]) => (
          <View key={k} style={s.row}><Text style={s.k}>{k}</Text><Text style={s.v}>{v}</Text></View>
        ))}
      </View>
      <Pressable style={s.btn} onPress={() => router.push("/orders")}><Text style={s.btnT}>My Orders</Text></Pressable>
      <Pressable style={s.btn} onPress={logout}><Text style={s.btnT}>Sign Out</Text></Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 14 },
  title: { fontSize: 22, fontWeight: "800", color: colors.ink },
  sub: { color: colors.muted, textAlign: "center" },
  status: { fontWeight: "700", textTransform: "capitalize" },
  link: { color: colors.ink, fontWeight: "700" },
  card: { backgroundColor: "#fff", borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 14, gap: 10 },
  row: { gap: 2 },
  k: { fontSize: 11, color: colors.muted, fontWeight: "700", textTransform: "uppercase" },
  v: { fontSize: 14, color: colors.ink, fontWeight: "600" },
  btn: { backgroundColor: colors.ink, borderRadius: 12, paddingVertical: 13, paddingHorizontal: 30, alignItems: "center" },
  btnT: { color: "#fff", fontWeight: "800" },
});
