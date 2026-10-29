import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Href, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/theme";

const ITEMS: { icon: keyof typeof Ionicons.glyphMap; label: string; sub: string; href: Href }[] = [
  { icon: "chatbubbles-outline", label: "Pro Stylist AI", sub: "Ask about products, formulas & techniques", href: "/chat" },
  { icon: "receipt-outline", label: "My Orders", sub: "Track your wholesale orders", href: "/orders" },
  { icon: "school-outline", label: "Education", sub: "Pro masterclasses", href: "/education" },
  { icon: "newspaper-outline", label: "Pro Blog", sub: "Color, tools & salon business", href: "/blogs" },
  { icon: "storefront-outline", label: "Store Locator", sub: "Pro hubs across India", href: "/stores" },
  { icon: "information-circle-outline", label: "About BeuPros", sub: "Who we are", href: "/about" },
  { icon: "call-outline", label: "Contact Us", sub: "Talk to a relationship manager", href: "/contact" },
];

export default function More() {
  const router = useRouter();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16, gap: 10 }}>
      {ITEMS.map((i) => (
        <Pressable key={i.label} style={s.row} onPress={() => router.push(i.href)}>
          <Ionicons name={i.icon} size={24} color={colors.ink} />
          <View style={{ flex: 1 }}>
            <Text style={s.label}>{i.label}</Text>
            <Text style={s.sub}>{i.sub}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: "#fff", borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 14 },
  label: { fontSize: 15, fontWeight: "700", color: colors.ink },
  sub: { fontSize: 12, color: colors.muted, marginTop: 2 },
});
