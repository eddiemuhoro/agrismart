import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useLocalSearchParams } from "expo-router"; // Hook to get route params

import products from "./products.json"; // Assuming you have a products list
import { ThemedText } from "../ThemedText";
import { Icon } from "@rneui/themed";

export default function ProductDetail() {
  const { id } = useLocalSearchParams(); // Get the product ID from the URL

  // Find the product by ID
  const product = products.find((item) => item.id === parseInt(id as string));

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.titleSection}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <ThemedText type="subtitle" style={styles.title}>
              {product.name}
            </ThemedText>
          </View>
          <ThemedText type="subtitle" style={styles.price}>
            Ksh {product.price}
          </ThemedText>
        </View>

        <View style={styles.headerBottom}>
          <Link href="/(tabs)/explore">
            <ThemedText type="link">Add more Items</ThemedText>
          </Link>
          <View style={styles.quantity}>
            <TouchableOpacity>
              <Icon name="minus" type="font-awesome" color="white" size={15} />
            </TouchableOpacity>
            <ThemedText type="defaultSemiBold" style={{ color: "#ffffff" }}>
              1
            </ThemedText>
            <TouchableOpacity>
              <Icon name="plus" type="font-awesome" color="white" size={15} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.couponContainer}>
        <TouchableOpacity>
          <ThemedText type="subtitle" style={styles.couponText}>
            Apply Coupon
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedText type="subtitle">Invoice</ThemedText>

      <View style={styles.priceContainer}>
        <View style={styles.priceItem}>
          <ThemedText type="defaultSemiBold">Original Price</ThemedText>
          <ThemedText type="defaultSemiBold">Ksh {product.price}</ThemedText>
        </View>
        <View style={styles.priceItem}>
          <ThemedText type="defaultSemiBold">Delivery</ThemedText>
          <ThemedText type="defaultSemiBold" style={{ color: "red" }}>
            Ksh {product.price}
          </ThemedText>
        </View>
        <View style={styles.priceItem}>
          <ThemedText type="defaultSemiBold">GST</ThemedText>
          <ThemedText type="defaultSemiBold" style={{ color: "red" }}>
            Ksh {product.price}
          </ThemedText>
        </View>
        <View style={styles.priceItem}>
          <ThemedText type="defaultSemiBold">Discount</ThemedText>
          <ThemedText type="defaultSemiBold">Ksh {product.price}</ThemedText>
        </View>

        <View style={styles.priceItem}>
          <ThemedText type="subtitle" style={{ color: "#007E2F" }}>
            Discount
          </ThemedText>
          <ThemedText type="subtitle" style={{ color: "#007E2F" }}>
            Ksh {product.price}
          </ThemedText>
        </View>
      </View>

      <ThemedText type="subtitle">Shipping Details</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DFF1E6",
    padding: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
  },
  title: {
    fontWeight: "bold",
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    color: "green",
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
  },
  couponContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DFF1E6",
    padding: 10,
  },
  couponText: {
    color: "#007E2F",
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "column",
    gap: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DFF1E6",
    padding: 10,
  },
  priceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
