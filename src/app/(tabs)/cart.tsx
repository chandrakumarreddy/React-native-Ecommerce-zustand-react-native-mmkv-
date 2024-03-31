import useCartStore from "@/store/cart";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabCart() {
  const products = useCartStore((store) => store.products);
  const addProduct = useCartStore((store) => store.addProduct);
  const removeProduct = useCartStore((store) => store.removeProduct);
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={products}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center pt-12">
            <Text className="text-3xl font-bold">Cart is Empty</Text>
          </View>
        )}
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
            <View>
              <View className="flex-row items-center gap-1">
                <Pressable onPress={() => addProduct(item)}>
                  <Ionicons name="add-circle" size={20} />
                </Pressable>
                <Pressable onPress={() => removeProduct(item)}>
                  <Ionicons name="remove-circle" size={20} />
                </Pressable>
              </View>
              <Text>Quantity:{item.quantity}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
