import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import useCartStore from "@/store/cart";
import { Text, View } from "react-native";

export default function TabLayout() {
  const itemCount = useCartStore((store) => store.itemCount);
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="shop"
        options={{
          title: "Products",
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="airplane" color={color} />
          ),
          headerRight: () => (
            <View className="flex-row pr-4">
              <Ionicons size={24} name="cart" />
              <Text>{itemCount}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="cart-sharp" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
