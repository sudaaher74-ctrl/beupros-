import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../src/context/AuthContext";
import { CartProvider } from "../src/context/CartContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerTintColor: "#0f172a" }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="product/[id]" options={{ title: "Product", headerBackTitle: "Back" }} />
            <Stack.Screen name="login" options={{ title: "Trade Login", presentation: "modal" }} />
            <Stack.Screen name="register" options={{ title: "Apply for Trade Account", presentation: "modal" }} />
            <Stack.Screen name="chat" options={{ title: "Pro Stylist AI" }} />
            <Stack.Screen name="orders" options={{ title: "My Orders" }} />
            <Stack.Screen name="education" options={{ title: "Education" }} />
            <Stack.Screen name="blogs/index" options={{ title: "Pro Blog" }} />
            <Stack.Screen name="blogs/[id]" options={{ title: "Article" }} />
            <Stack.Screen name="stores" options={{ title: "Store Locator" }} />
            <Stack.Screen name="about" options={{ title: "About BeuPros" }} />
            <Stack.Screen name="contact" options={{ title: "Contact Us" }} />
            <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
          </Stack>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
