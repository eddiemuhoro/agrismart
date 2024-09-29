import React from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";
import { Icon, Image } from "@rneui/themed"; // This is for the filter icon; you can use react-native-vector-icons as well
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Categories from "@/components/products/Categories";
import Products from "@/components/products/Products";
import images from "../../components/products/data/banner_images.json";
import Topbar from "@/components/topbar";
import { commonStyles } from "@/constants/styles";

export default function HomeScreen() {
  // Render the header component (search and categories)
  const renderHeader = () => (
    <ThemedView>
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
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <Categories />
      </View>
      <ThemedView style={styles.bannerContainer}>
        <Image
          source={require("../../assets/images/offer.png")}
          style={styles.bannerImage}
        />
      </ThemedView>
    </ThemedView>
  );

  return (
    <View style={commonStyles.container}>
      <Topbar />
      <FlatList
        style={styles.flatList}
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
  flatList: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingVertical: 32,
    gap: 8,
  },
  header: {
    height: 70, // Fixed height for the static header
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#DFF1E6",
  },
  title: {
    color: "#007E2F",
  },
  iconBar: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#DFF1E6",
  },

  iconsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  bellIconWrapper: {
    position: "relative", // Allows absolute positioning of the dot
  },
  notificationDot: {
    position: "absolute",
    top: 10, // Adjust the position as needed
    right: 14, // Adjust the position as needed
    width: 6, // Size of the dot
    height: 6, // Size of the dot
    borderRadius: 4, // Makes the dot circular
    backgroundColor: "green", // Color of the notification dot
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
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
    paddingHorizontal: 16,
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderRadius: 30,
  },
});
