import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Field } from "../src/components/Field";
import { useAuth } from "../src/context/AuthContext";
import { SalonBusinessType } from "../src/types/user";
import { colors } from "../src/theme";

const TYPES: SalonBusinessType[] = ["Hair Salon", "Beauty Parlour", "Nail Studio", "Aesthetic Clinic / Spa", "Freelance Stylist", "Cosmetology Academy"];

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [f, setF] = useState({
    name: "", email: "", password: "", phone: "", salonName: "", businessType: TYPES[0] as SalonBusinessType,
    address: "", city: "", state: "", pincode: "", gstNumber: "", licenseNumber: "",
  });
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    setBusy(true);
    const r = await register(f);
    setBusy(false);
    if (r.success) {
      Alert.alert("Application submitted", "Your trade account is pending approval.");
      router.back();
    } else Alert.alert("Registration failed", r.error);
  };

  return (
    <ScrollView contentContainerStyle={s.c}>
      <Field label="Your name *" value={f.name} onChangeText={set("name")} autoCapitalize="words" />
      <Field label="Email *" value={f.email} onChangeText={set("email")} keyboardType="email-address" />
      <Field label="Password *" value={f.password} onChangeText={set("password")} secureTextEntry />
      <Field label="Phone *" value={f.phone} onChangeText={set("phone")} keyboardType="phone-pad" />
      <Field label="Salon name *" value={f.salonName} onChangeText={set("salonName")} autoCapitalize="words" />
      <Text style={s.label}>Business type *</Text>
      <View style={s.chips}>
        {TYPES.map((t) => (
          <Pressable key={t} onPress={() => setF((p) => ({ ...p, businessType: t }))} style={[s.chip, f.businessType === t && s.chipOn]}>
            <Text style={[s.chipT, f.businessType === t && { color: "#fff" }]}>{t}</Text>
          </Pressable>
        ))}
      </View>
      <Field label="Address *" value={f.address} onChangeText={set("address")} autoCapitalize="sentences" />
      <Field label="City *" value={f.city} onChangeText={set("city")} autoCapitalize="words" />
      <Field label="State *" value={f.state} onChangeText={set("state")} autoCapitalize="words" />
      <Field label="Pincode *" value={f.pincode} onChangeText={set("pincode")} keyboardType="number-pad" />
      <Field label="GST number" value={f.gstNumber} onChangeText={set("gstNumber")} autoCapitalize="characters" />
      <Field label="License number" value={f.licenseNumber} onChangeText={set("licenseNumber")} />
      <Pressable style={[s.btn, busy && { opacity: 0.6 }]} disabled={busy} onPress={submit}>
        <Text style={s.btnT}>{busy ? "Submitting…" : "Submit Application"}</Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  c: { padding: 20, gap: 12, paddingBottom: 60 },
  label: { fontSize: 12, fontWeight: "700", color: colors.ink },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 99, borderWidth: 1, borderColor: colors.border, backgroundColor: "#fff" },
  chipOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipT: { fontSize: 12, fontWeight: "600", color: colors.ink },
  btn: { backgroundColor: colors.ink, borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 6 },
  btnT: { color: "#fff", fontWeight: "800" },
});
