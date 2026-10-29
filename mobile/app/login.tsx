import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { Field } from "../src/components/Field";
import { useAuth } from "../src/context/AuthContext";
import { colors } from "../src/theme";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    const r = await login(email.trim(), password);
    setBusy(false);
    if (r.success) router.back();
    else Alert.alert("Login failed", r.error);
  };

  return (
    <ScrollView contentContainerStyle={s.c}>
      <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Field label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Pressable style={[s.btn, busy && { opacity: 0.6 }]} disabled={busy} onPress={submit}>
        <Text style={s.btnT}>{busy ? "Signing in…" : "Sign In"}</Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/register")}><Text style={s.link}>New salon? Apply for a trade account</Text></Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  c: { padding: 20, gap: 14 },
  btn: { backgroundColor: colors.ink, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  btnT: { color: "#fff", fontWeight: "800" },
  link: { textAlign: "center", color: colors.muted, fontWeight: "600", marginTop: 6 },
});
