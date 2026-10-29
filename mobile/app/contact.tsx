import React from "react";
import { Linking, Pressable, StyleSheet, Text } from "react-native";
import { Card, H1, P, Screen } from "../src/components/Screen";
import { colors } from "../src/theme";

const Action = ({ label, value, url }: { label: string; value: string; url: string }) => (
  <Pressable onPress={() => Linking.openURL(url)}>
    <Card>
      <Text style={s.k}>{label}</Text>
      <Text style={s.v}>{value}</Text>
    </Card>
  </Pressable>
);

export default function Contact() {
  return (
    <Screen>
      <H1>Talk to a salon relationship manager</H1>
      <P>We respond to trade enquiries within 2 business hours.</P>
      <Action label="Call" value="+91 98200 11223" url="tel:+919820011223" />
      <Action label="Trade enquiries" value="trade@beupros.com" url="mailto:trade@beupros.com" />
      <Action label="Support" value="support@beupros.com" url="mailto:support@beupros.com" />
      <Card>
        <Text style={s.k}>Head office</Text>
        <Text style={s.v}>Floor 4, Trade Center, Bandra Kurla Complex (BKC)</Text>
        <P>Mumbai, Maharashtra 400051, India</P>
      </Card>
    </Screen>
  );
}

const s = StyleSheet.create({
  k: { fontSize: 11, fontWeight: "700", color: colors.muted, textTransform: "uppercase" },
  v: { fontSize: 16, fontWeight: "700", color: colors.ink },
});
