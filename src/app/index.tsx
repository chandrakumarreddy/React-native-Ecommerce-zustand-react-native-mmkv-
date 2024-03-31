import { Link } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as DropdownMenu from "zeego/dropdown-menu";

export default function Page() {
  return (
    <View className="flex flex-1">
      <DropdownMenu.Item
        // this is required when ItemTitle has a React element child
        textValue="Cars"
        key="cars"
      >
        <DropdownMenu.ItemTitle>
          <Text>Cars</Text>
        </DropdownMenu.ItemTitle>
      </DropdownMenu.Item>
    </View>
  );
}
