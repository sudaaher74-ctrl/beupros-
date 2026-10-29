import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Card, H1, P, Screen } from "../../src/components/Screen";
import { BLOG_POSTS } from "../../src/data/blogs";
import { colors } from "../../src/theme";

export default function BlogPost() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const post = BLOG_POSTS.find((b) => b.id === id);
  if (!post) return <Text style={{ textAlign: "center", marginTop: 60 }}>Article not found.</Text>;

  // recommendedTool.link looks like "/shop?category=Hair&search=Bond"
  const q = new URLSearchParams(post.recommendedTool.link.split("?")[1] || "");
  const params: Record<string, string> = {};
  q.forEach((v, k) => { params[k] = v; });

  return (
    <Screen>
      <Text style={s.cat}>{post.categoryLabel} · {post.readTime}</Text>
      <H1>{post.title}</H1>
      <Text style={s.by}>{post.author}, {post.authorRole} · {post.date}</Text>
      {post.content.map((c, i) => <P key={i}>{c}</P>)}
      <Card>
        <Text style={s.k}>Key takeaways</Text>
        {post.keyTakeaways.map((t) => <Text key={t} style={s.t}>• {t}</Text>)}
      </Card>
      <Pressable style={s.btn} onPress={() => router.push({ pathname: "/shop", params })}>
        <Text style={s.btnT}>Shop: {post.recommendedTool.name}</Text>
      </Pressable>
    </Screen>
  );
}

const s = StyleSheet.create({
  cat: { fontSize: 11, fontWeight: "700", color: colors.green, textTransform: "uppercase" },
  by: { fontSize: 12, color: colors.muted, fontWeight: "600" },
  k: { fontWeight: "800", fontSize: 15, color: colors.ink },
  t: { fontSize: 13, color: colors.muted, lineHeight: 19 },
  btn: { backgroundColor: colors.ink, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  btnT: { color: "#fff", fontWeight: "800" },
});
