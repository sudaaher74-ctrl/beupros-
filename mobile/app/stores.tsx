import React, { useMemo, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Card, Screen } from "../src/components/Screen";
import { STORE_HUBS } from "../src/data/stores";
import { colors } from "../src/theme";

export default function Stores() {
  const [q, setQ] = useState("");
  const hubs = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? STORE_HUBS.filter((h) => `${h.name} ${h.city} ${h.state} ${h.pincode}`.toLowerCase().includes(t)) : STORE_HUBS;
  }, [q]);

  return (
    <Screen>
      <TextInput style={s.search} placeholder="Search city or pincode…" value={q} onChangeText={setQ} />
      {hubs.map((h) => (
        <Card key={h.id}>
          <Text style={s.type}>{h.type} · {h.status}</Text>
          <Text style={s.name}>{h.name}</Text>
          <Text style={s.t}>{h.address}, {h.pincode}</Text>
          <Text style={s.t}>{h.hours}</Text>
          <View style={s.tags}>{h.services.map((x) => <Text key={x} style={s.tag}>{x}</Text>)}</View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable style={s.btn} onPress={() => Linking.openURL(`tel:${h.phone.replace(/\s/g, "")}`)}><Text style={s.btnT}>Call</Text></Pressable>
            <Pressable style={[s.btn, s.btn2]} onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${h.address} ${h.pincode}`)}`)}>
              <Text style={[s.btnT, { color: colors.ink }]}>Directions</Text>
            </Pressable>
          </View>
        </Card>
      ))}
      {hubs.length === 0 && <Text style={{ textAlign: "center", color: colors.muted }}>No hubs found.</Text>}
    </Screen>
  );
}

const s = StyleSheet.create({
  search: { backgroundColor: "#fff", borderRadius: 12, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 10 },
  type: { fontSize: 11, fontWeight: "700", color: colors.green, textTransform: "uppercase" },
  name: { fontSize: 16, fontWeight: "800", color: colors.ink },
  t: { fontSize: 13, color: colors.muted, lineHeight: 19 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: { fontSize: 11, backgroundColor: colors.bg, color: colors.ink, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 99, overflow: "hidden" },
  btn: { backgroundColor: colors.ink, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 9 },
  btn2: { backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border },
  btnT: { color: "#fff", fontWeight: "700", fontSize: 13 },
});
