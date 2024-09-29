import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
import { Button, Icon, Image } from "@rneui/themed";
import { Link, usePathname, useRouter } from "expo-router";
import { useProducts } from "@/hooks/data/products/products";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useUserId } from "@/hooks/data/auth/token";
import Toast from "react-native-toast-message";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

const Products = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { products, isLoading } = useProducts();
  const [loading, setLoading] = React.useState(false);
  const userId = useUserId();

  //add to  cart using user id and product id
  const addToCart = async (productId: string) => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    const url = "http://localhost:4200/order/add/cart";
    const data = {
      buyer_id: userId,
      product_id: productId,
    };

    const response = await fetch(url, {
      method: "POST",

      body: JSON.stringify(data),
    });
    if (response.ok) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Product added to cart",
      });
      Alert.alert("Success", "Product added to cart");
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred",
      });
      Alert.alert("Error", "An error occurred");
    }
    setLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <ThemedText type="subtitle">Loading....</ThemedText>
        </View>
      ) : (
        <View style={styles.productsContainer}>
          <View style={styles.productsTitle}>
            <ThemedText type="subtitle">Products</ThemedText>
            <Link href="/(tabs)/explore">
              <ThemedText type="link">See all</ThemedText>
            </Link>
          </View>
          <FlatList
            data={products || []} // Pass the products data here
            renderItem={({ item }) => (
              <View style={styles.product}>
                <View style={styles.favoriteIcon}>
                  <Icon
                    name="heart"
                    type="font-awesome"
                    color={`${item.isFavorite ? "#FF0000" : "#000000"}`}
                    size={20}
                  />
                </View>
                <Image
                  source={{
                    uri: item.images[0],
                  }}
                  style={styles.image}
                />
                <ThemedText type="subtitle">{item.name}</ThemedText>
                <View style={styles.priceContainer}>
                  <ThemedText type="defaultSemiBold">
                    Ksh {item.price}
                  </ThemedText>
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
                {pathname === "/explore" && (
                  <TouchableOpacity
                    //add to cart button styling plus functionality for loading using the spread operator
                    style={{
                      ...styles.addToCartButton,
                      opacity: loading ? 0.5 : 1,
                    }}
                    onPress={() => addToCart(item.id)}
                  >
                    <ThemedText
                      type="defaultSemiBold"
                      style={styles.buttonText}
                    >
                      Add to Cart
                    </ThemedText>
                  </TouchableOpacity>
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.container}
          />
        </View>
      )}
    </>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    gap: 16, // Add gap between items
    flex: 1,
    backgroundColor: "#fff",
  },
  productsContainer: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
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
    position: "relative",
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
  addToCartButton: {
    backgroundColor: "#007E2F",
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
});
