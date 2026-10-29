import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export const Screen = ({ children }: { children: React.ReactNode }) => (
  <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 48 }}>
    {children}
  </ScrollView>
);

export const H1 = ({ children }: { children: React.ReactNode }) => <Text style={s.h1}>{children}</Text>;
export const P = ({ children }: { children: React.ReactNode }) => <Text style={s.p}>{children}</Text>;
export const Card = ({ children }: { children: React.ReactNode }) => <View style={s.card}>{children}</View>;

const s = StyleSheet.create({
  h1: { fontSize: 22, fontWeight: "800", color: colors.ink },
  p: { fontSize: 14, lineHeight: 21, color: colors.muted },
  card: { backgroundColor: "#fff", borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 14, gap: 8 },
});
