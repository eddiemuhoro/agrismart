import React from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";
import { Icon, Image } from "@rneui/themed"; // This is for the filter icon; you can use react-native-vector-icons as well
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Categories from "@/components/products/Categories";
import Products from "@/components/products/Products";
import images from "../../components/products/data/banner_images.json";
import Topbar from "@/components/topbar";

export default function HomeScreen() {
  // Render the header component (search and categories)
  const renderHeader = () => (
    <ThemedView>
      {/* Static Header */}
      {/* Search Bar and Categories */}
      <ThemedView style={styles.searchContainer}>
        <View style={styles.textInputWrapper}>
          <Icon
            name="search"
            type="font-awesome"
            color="#A1CEDC"
            style={styles.icon}
          />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#A1CEDC"
            style={styles.textInput}
          />
        </View>
        <Icon name="filter" type="font-awesome" color="#A1CEDC" />
      </ThemedView>

      <ThemedView style={styles.bannerContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1715368063081-affe2d866eb0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerDots}>
          {images.map((_: any, index: number) => (
            <Icon
              key={index}
              name="circle"
              type="font-awesome"
              size={10}
              color={index === 0 ? "#007E2F" : "#A1CEDC"}
            />
          ))}
        </View>
      </ThemedView>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <Categories />
      </View>
    </ThemedView>
  );

  return (
    <View style={styles.container}>
      {/* Static Header */}
      <Topbar />

      <FlatList
        data={[]} // Empty data as the footer (Products) will handle product rendering
        renderItem={null}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={<Products />} // Render Products at the bottom
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: 16,
  },
  textInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#4D4D4D28",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  categoriesContainer: {
    marginTop: 0,
    paddingTop: 0,
  },
  bannerContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderRadius: 30,
  },
  bannerDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
});
