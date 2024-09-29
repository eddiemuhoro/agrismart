import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { commonStyles } from "@/constants/styles";
import Cart from "@/components/products/cart";

const cart = () => {
  return (
    <View style={commonStyles.container}>
      <Cart />
    </View>
  );
};

export default cart;

const styles = StyleSheet.create({});
