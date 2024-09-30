import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
import { Link } from "expo-router";
import { Icon } from "@rneui/themed";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <View style={styles.container}>
      <View key={item.id} style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.titleSection}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <ThemedText type="subtitle" style={styles.title}>
              {item.name}
            </ThemedText>
          </View>
          <ThemedText type="subtitle" style={styles.price}>
            Ksh {item.price}
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
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 10,
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
  picker: {
    width: 150, // Adjust width of the picker to fit the space
  },
  pickerWrapper: {
    flex: 1, // Ensure picker takes only the necessary space
    maxWidth: 150, // Limit the picker width
  },
  paymentButton: {
    backgroundColor: "#007E2F",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  paymentButtonText: {
    color: "#ffffff",
  },
});
