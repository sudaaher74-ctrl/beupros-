import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { Card, Screen } from "../../src/components/Screen";
import { BLOG_POSTS } from "../../src/data/blogs";
import { colors } from "../../src/theme";

export default function Blogs() {
  const router = useRouter();
  return (
    <Screen>
      {BLOG_POSTS.map((b) => (
        <Pressable key={b.id} onPress={() => router.push(`/blogs/${b.id}`)}>
          <Card>
            <Text style={s.cat}>{b.categoryLabel} · {b.readTime}</Text>
            <Text style={s.title}>{b.title}</Text>
            <Text style={s.ex}>{b.excerpt}</Text>
            <Text style={s.by}>{b.author} · {b.date}</Text>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({
  cat: { fontSize: 11, fontWeight: "700", color: colors.green, textTransform: "uppercase" },
  title: { fontSize: 17, fontWeight: "800", color: colors.ink },
  ex: { fontSize: 13, color: colors.muted, lineHeight: 19 },
  by: { fontSize: 12, color: colors.muted, fontWeight: "600" },
});
