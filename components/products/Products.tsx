import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
import products from "./products.json";
import { Image } from "@rneui/themed";

const Products = () => {
  return (
    <View>
      <ThemedText type="subtitle">Products</ThemedText>
      <FlatList
        data={products} // Pass the products data here
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1591271300850-22d6784e0a7f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              style={styles.image}
            />
            <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
            <ThemedText type="defaultSemiBold">{item.price}</ThemedText>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    gap: 16, // Add gap between items
  },
  product: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "50%",
    padding: 8,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
});
