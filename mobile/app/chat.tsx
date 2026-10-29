import React, { useRef, useState } from "react";
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { chatRequest } from "../src/lib/api";
import { Product } from "../src/types/product";
import { ProductCard } from "../src/components/ProductCard";
import { colors } from "../src/theme";

interface Msg { id: string; sender: "user" | "assistant"; text: string; products?: Product[]; followUps?: string[] }

const SAMPLES = [
  "Which hair color is best for curly hair?",
  "How to get 100% resistant grey coverage?",
  "What iron temperature for keratin smoothing?",
];

export default function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "0", sender: "assistant", text: "Hi! I'm your Pro Stylist assistant. Ask me about formulas, techniques or products.", followUps: SAMPLES },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const list = useRef<FlatList<Msg>>(null);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    setInput("");
    setMsgs((m) => [...m, { id: `u${Date.now()}`, sender: "user", text: q }]);
    setBusy(true);
    try {
      const r = await chatRequest(q);
      setMsgs((m) => [...m, { id: `a${Date.now()}`, sender: "assistant", text: r.reply, products: r.recommendedProducts, followUps: r.suggestedFollowUps }]);
    } catch (e: any) {
      setMsgs((m) => [...m, { id: `e${Date.now()}`, sender: "assistant", text: e.message || "Something went wrong. Please try again." }]);
    } finally {
      setBusy(false);
      setTimeout(() => list.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={90}>
      <FlatList
        ref={list}
        data={msgs}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: 12, gap: 10 }}
        onContentSizeChange={() => list.current?.scrollToEnd({ animated: true })}
        ListFooterComponent={busy ? <ActivityIndicator style={{ margin: 10 }} /> : undefined}
        renderItem={({ item }) => (
          <View style={{ gap: 8 }}>
            <View style={[s.bubble, item.sender === "user" ? s.user : s.bot]}>
              <Text style={{ color: item.sender === "user" ? "#fff" : colors.ink, lineHeight: 20 }}>{item.text.replace(/\*\*/g, "")}</Text>
            </View>
            {item.products && item.products.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {item.products.map((p) => <View key={p.id} style={{ width: 170 }}><ProductCard product={p} /></View>)}
              </ScrollView>
            )}
            {item.followUps && item.followUps.length > 0 && item.id === msgs[msgs.length - 1].id && (
              <View style={{ gap: 6 }}>
                {item.followUps.map((f) => (
                  <Pressable key={f} style={s.follow} onPress={() => send(f)}><Text style={s.followT}>{f}</Text></Pressable>
                ))}
              </View>
            )}
          </View>
        )}
      />
      <View style={s.inputRow}>
        <TextInput style={s.input} value={input} onChangeText={setInput} placeholder="Ask the Pro Stylist…" onSubmitEditing={() => send(input)} returnKeyType="send" />
        <Pressable style={[s.send, busy && { opacity: 0.5 }]} disabled={busy} onPress={() => send(input)}><Text style={s.sendT}>Send</Text></Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  bubble: { maxWidth: "88%", padding: 12, borderRadius: 14 },
  user: { alignSelf: "flex-end", backgroundColor: colors.ink },
  bot: { alignSelf: "flex-start", backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border },
  follow: { alignSelf: "flex-start", borderWidth: 1, borderColor: colors.border, backgroundColor: "#fff", borderRadius: 99, paddingHorizontal: 12, paddingVertical: 7 },
  followT: { fontSize: 12, fontWeight: "600", color: colors.ink },
  inputRow: { flexDirection: "row", gap: 8, padding: 10, borderTopWidth: 1, borderColor: colors.border, backgroundColor: "#fff" },
  input: { flex: 1, backgroundColor: colors.bg, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10 },
  send: { backgroundColor: colors.ink, borderRadius: 12, paddingHorizontal: 18, justifyContent: "center" },
  sendT: { color: "#fff", fontWeight: "800" },
});
