import { View, Text, FlatList, Image, Pressable } from "react-native";
import React from "react";
import products from "@/data/products.json";
import Ionicons from "@expo/vector-icons/Ionicons";
import useCartStore from "@/store/cart";

export default function Shop() {
  const { addProduct, removeProduct } = useCartStore();
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View className="border-b border-gray-200" />
        )}
        renderItem={({ item }) => (
          <View className="flex-row items-start p-2 gap-4">
            <Image source={{ uri: item.image }} width={50} height={50} />
            <View className="flex-1">
              <Text>{item.title}</Text>
              <Text>Price: ${item.price}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Pressable onPress={() => addProduct(item)}>
                <Ionicons name="add-circle" size={20} />
              </Pressable>
              <Pressable onPress={() => removeProduct(item)}>
                <Ionicons name="remove-circle" size={20} />
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
