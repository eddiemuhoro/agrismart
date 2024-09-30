import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router"; // Hook to get route params

import products from "./data/products.json"; // Assuming you have a products list
import { ThemedText } from "../ThemedText";
import { Icon } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";
import addresses from "./data/addresses.json";
import cart_items from "./data/cart.json";
import { useProduct } from "@/hooks/data/products/products";
import Topbar from "../topbar";
import CartItem from "./cart_item";

export default function Cart() {
  const [selectedValue, setSelectedValue] = React.useState(null);
  const { id } = useLocalSearchParams(); // Get the product ID from the URL

  const selectedAddress = addresses.find(
    (address) => address.id === selectedValue
  );
  const { product } = useProduct(id);

  // Find the product by ID
  // const product = products.find((item) => item.id === parseInt(id as string));

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const CouponSection = () => (
    <View style={styles.couponContainer}>
      <TouchableOpacity>
        <ThemedText type="subtitle" style={styles.couponText}>
          Apply Coupon
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  const InvoiceSection = () => (
    <View>
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
    </View>
  );

  const AddressSection = () => (
    <View>
      <ThemedText type="subtitle">Shipping Details</ThemedText>
      <View style={styles.priceContainer}>
        <View style={styles.priceItem}>
          <ThemedText type="subtitle">
            {selectedAddress?.name || "Select Address"}
          </ThemedText>
          <View style={styles.pickerWrapper}>
            {
              <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                {addresses.map((address) => (
                  <Picker.Item
                    key={address.id}
                    label={address.name}
                    value={address.id}
                  />
                ))}
              </Picker>
            }
          </View>
        </View>
        <View>
          <ThemedText type="defaultSemiBold">
            {`${selectedAddress?.address}, ${selectedAddress?.city}, ${selectedAddress?.state}`}
          </ThemedText>
          <ThemedText type="defaultSemiBold">
            {" "}
            {`${selectedAddress?.zip}, ${"Kenya"}`}
          </ThemedText>
          <ThemedText type="defaultSemiBold">
            {`${selectedAddress?.phone}`}
          </ThemedText>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <TouchableOpacity>
          <ThemedText type="link">Add pin location on map</ThemedText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.paymentButton}>
        <ThemedText style={styles.paymentButtonText} type="subtitle">
          Proceed to Payment
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Topbar />
      <View style={styles.container}>
        <FlatList
          data={cart_items} // Empty data as the footer (Products) will handle product rendering
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <CartItem item={item} />}
          ListFooterComponent={
            <>
              <CouponSection />
              <InvoiceSection />
              <AddressSection />
            </>
          }
          initialNumToRender={1}
        />
      </View>
    </>
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