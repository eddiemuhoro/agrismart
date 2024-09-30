import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router"; // Hook to get route params

import { ThemedText } from "../ThemedText";
import { Icon } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";
import addresses from "./data/addresses.json";
import { useProduct } from "@/hooks/data/products/products";
import Topbar from "../topbar";
import CartItem from "./cart_item";
import { useCartItems } from "@/hooks/data/products/cart";

export default function Cart() {
  const [selectedValue, setSelectedValue] = React.useState(null);
  const { id } = useLocalSearchParams(); // Get the product ID from the URL
  const { cart_items, isLoading } = useCartItems();

  const selectedAddress = addresses.find(
    (address) => address.id === selectedValue
  );
  const { product } = useProduct(id);

  // Check if the product is loading
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007E2F" />
        <Text>Loading Cart Items...</Text>
      </View>
    );
  }

  // If no cart items are found after loading
  if (!cart_items || cart_items.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No items in the cart</Text>
      </View>
    );
  }

  const totalPrice = cart_items?.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );
  console.log("totalPrice", totalPrice);

  const CouponSection = () => (
    <View style={[styles.sectionContainer, styles.couponContainer]}>
      <TouchableOpacity>
        <ThemedText type="subtitle" style={styles.couponText}>
          Apply Coupon
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  const InvoiceSection = () => (
    <View style={styles.sectionContainer}>
      <ThemedText type="subtitle">Invoice</ThemedText>

      <View style={styles.priceContainer}>
        <View style={styles.priceItem}>
          <ThemedText type="defaultSemiBold">Original Price</ThemedText>
          <ThemedText type="defaultSemiBold">Ksh {totalPrice}</ThemedText>
        </View>
        <View style={styles.priceItem}>
          <ThemedText type="defaultSemiBold">Delivery Price</ThemedText>
          <ThemedText type="defaultSemiBold" style={{ color: "red" }}>
            Ksh 243
          </ThemedText>
        </View>
        <View style={styles.priceItem}>
          <ThemedText type="defaultSemiBold">GST</ThemedText>
          <ThemedText type="defaultSemiBold" style={{ color: "red" }}>
            Ksh 434
          </ThemedText>
        </View>
        <View style={styles.priceItem}>
          <ThemedText type="defaultSemiBold">Discount</ThemedText>
          <ThemedText type="defaultSemiBold">Ksh 324</ThemedText>
        </View>

        <View style={styles.priceItem}>
          <ThemedText type="subtitle" style={{ color: "#007E2F" }}>
            Total Price
          </ThemedText>
          <ThemedText type="subtitle" style={{ color: "#007E2F" }}>
            Ksh {totalPrice + 243 + 434 - 324}
          </ThemedText>
        </View>
      </View>
    </View>
  );

  const AddressSection = () => (
    <View style={styles.sectionContainer}>
      <ThemedText type="subtitle">Shipping Details</ThemedText>
      <View style={styles.priceContainer}>
        <View style={styles.priceItem}>
          <ThemedText type="subtitle">
            {selectedAddress?.name || "Select Address"}
          </ThemedText>
          <View style={styles.pickerWrapper}>
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
    </View>
  );

  const MapSection = () => (
    <View style={[styles.priceContainer, styles.sectionContainer]}>
      <TouchableOpacity>
        <ThemedText type="link">Add pin location on map</ThemedText>
      </TouchableOpacity>
    </View>
  );

  const PaymentButton = () => (
    <TouchableOpacity style={styles.paymentButton}>
      <ThemedText style={styles.paymentButtonText} type="subtitle">
        Proceed to Payment
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <>
      <Topbar />
      <View style={styles.container}>
        <FlatList
          data={cart_items} // Cart items data
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <CartItem item={item} />}
          ListFooterComponent={
            <>
              <CouponSection />
              <InvoiceSection />
              <AddressSection />
              <MapSection />
              <PaymentButton />
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
  },
  sectionContainer: {
    marginBottom: 16, // Adds space between sections
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
