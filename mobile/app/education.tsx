import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Card, Screen } from "../src/components/Screen";
import { MASTERCLASSES } from "../src/data/education";
import { colors } from "../src/theme";

const TABS = [
  { id: "all", label: "All Classes" },
  { id: "cutting", label: "Cutting & Fade" },
  { id: "color", label: "Color & Lightening" },
  { id: "smoothing", label: "Keratin & Texture" },
  { id: "business", label: "Salon Business" },
];

export default function Education() {
  const router = useRouter();
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState<string | null>(null);
  const list = MASTERCLASSES.filter((c) => tab === "all" || c.category === tab);

  return (
    <Screen>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        {TABS.map((t) => (
          <Pressable key={t.id} onPress={() => setTab(t.id)} style={[s.chip, tab === t.id && s.chipOn]}>
            <Text style={[s.chipT, tab === t.id && { color: "#fff" }]}>{t.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      {list.map((c) => (
        <Card key={c.id}>
          <Text style={s.meta}>{c.duration} · {c.level}</Text>
          <Text style={s.title}>{c.title}</Text>
          <Text style={s.by}>{c.instructor}</Text>
          <Text style={s.desc}>{c.description}</Text>
          {open === c.id && (
            <View style={{ gap: 4 }}>
              {c.chapters.map((ch) => <Text key={ch} style={s.desc}>• {ch}</Text>)}
            </View>
          )}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable style={s.btn2} onPress={() => setOpen(open === c.id ? null : c.id)}>
              <Text style={[s.btnT, { color: colors.ink }]}>{open === c.id ? "Hide chapters" : "Chapters"}</Text>
            </Pressable>
            <Pressable style={s.btn} onPress={() => router.push({ pathname: "/shop", params: { category: c.shopCategory } })}>
              <Text style={s.btnT}>Shop gear</Text>
            </Pressable>
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99, borderWidth: 1, borderColor: colors.border, backgroundColor: "#fff" },
  chipOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipT: { fontSize: 12, fontWeight: "700", color: colors.ink },
  meta: { fontSize: 11, fontWeight: "700", color: colors.green, textTransform: "uppercase" },
  title: { fontSize: 17, fontWeight: "800", color: colors.ink },
  by: { fontSize: 12, color: colors.muted, fontWeight: "600" },
  desc: { fontSize: 13, color: colors.muted, lineHeight: 19 },
  btn: { backgroundColor: colors.ink, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 9 },
  btn2: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 9 },
  btnT: { color: "#fff", fontWeight: "700", fontSize: 13 },
});
