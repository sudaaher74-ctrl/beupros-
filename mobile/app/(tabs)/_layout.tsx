import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../src/context/CartContext";

export default function TabsLayout() {
  const { totalItems } = useCart();
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#0f172a", headerTitleStyle: { fontWeight: "800" } }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "BeuPros",
          tabBarLabel: "Home",
          tabBarIcon: (props) => (
            <Ionicons name="home-outline" color={props.color as string} size={props.size} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: (props) => (
            <Ionicons name="grid-outline" color={props.color as string} size={props.size} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Bag",
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarIcon: (props) => (
            <Ionicons name="bag-outline" color={props.color as string} size={props.size} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: (props) => (
            <Ionicons name="person-outline" color={props.color as string} size={props.size} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: (props) => (
            <Ionicons name="menu-outline" color={props.color as string} size={props.size} />
          ),
        }}
      />
    </Tabs>
  );
}
