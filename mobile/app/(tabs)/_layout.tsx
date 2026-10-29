import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../src/context/CartContext";

export default function TabsLayout() {
  const { totalItems } = useCart();
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#0f172a", headerTitleStyle: { fontWeight: "800" } }}>
      <Tabs.Screen name="index" options={{ title: "BeuPros", tabBarLabel: "Home", tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color as string} size={size} /> }} />
      <Tabs.Screen name="shop" options={{ title: "Shop", tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" color={color as string} size={size} /> }} />
      <Tabs.Screen name="cart" options={{ title: "Bag", tabBarBadge: totalItems > 0 ? totalItems : undefined, tabBarIcon: ({ color, size }) => <Ionicons name="bag-outline" color={color as string} size={size} /> }} />
      <Tabs.Screen name="account" options={{ title: "Account", tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color as string} size={size} /> }} />
      <Tabs.Screen name="more" options={{ title: "More", tabBarIcon: ({ color, size }) => <Ionicons name="menu-outline" color={color as string} size={size} /> }} />
    </Tabs>
  );
}
