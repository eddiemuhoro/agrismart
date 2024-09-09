import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from "react";
import data from "./data.json";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

const Categories = () => {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.categoriesTitle}>
        <ThemedText type="subtitle">Categories</ThemedText>
        <Link href="/(tabs)/explore">
          <ThemedText type="link">See all</ThemedText>
        </Link>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      >
        {data.map((category: any, index: number) => (
          <ThemedView key={index} style={styles.category}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1591271300850-22d6784e0a7f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              style={styles.image}
            />
            <ThemedText type="defaultSemiBold">{category.name}</ThemedText>
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: 0, // Ensure no top margin
    paddingTop: 0, // Ensure no top padding
    flexDirection: "column",
    gap: 16,
  },
  categoriesTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoriesList: {
    flexDirection: "row",
    overflow: "scroll",
    gap: 16,
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#4D4D4D28",
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#8FC5786A",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
