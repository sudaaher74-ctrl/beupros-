import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors } from "../theme";

export function Field({ label, ...props }: { label: string } & TextInputProps) {
  return (
    <View style={{ gap: 4 }}>
      <Text style={s.label}>{label}</Text>
      <TextInput style={s.input} placeholderTextColor="#94a3b8" autoCapitalize="none" {...props} />
    </View>
  );
}

const s = StyleSheet.create({
  label: { fontSize: 12, fontWeight: "700", color: colors.ink },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 },
});
