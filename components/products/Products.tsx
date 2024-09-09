import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
import products from "./products.json";
import { Icon, Image } from "@rneui/themed";
import { Link } from "expo-router";

const Products = () => {
  return (
    <View>
      <View style={styles.productsTitle}>
        <ThemedText type="subtitle">Products</ThemedText>
        <Link href="/(tabs)/explore">
          <ThemedText type="link">See all</ThemedText>
        </Link>
      </View>
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
            <ThemedText type="subtitle">{item.name}</ThemedText>
            <View style={styles.priceContainer}>
              <ThemedText type="defaultSemiBold">Ksh {item.price}</ThemedText>
              <View style={styles.rateContainer}>
                <Icon
                  name="star"
                  type="font-awesome"
                  color="#FFD700"
                  size={20}
                />
                <ThemedText type="defaultSemiBold">4.7 </ThemedText>
                <ThemedText type="link">({21})</ThemedText>
              </View>
            </View>
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
  productsTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  product: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "50%",
    padding: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 30,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
