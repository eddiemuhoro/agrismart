import { StyleSheet, View, TextInput } from "react-native";
import { Icon } from "@rneui/themed"; // This is for the filter icon; you can use react-native-vector-icons as well
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Categories from "@/components/products/Categories";
import Products from "@/components/products/Products";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      title="Farmer"
      headerBackgroundColor={{ dark: "#000", light: "#fff" }}
      // leftIcon={<Icon name="arrow-back" type="ionicon" color="#000" />}
      rightIcon={<Icon name="settings" type="ionicon" color="#000" />}
      onRightIconPress={() => console.log("Settings icon pressed")}
    >
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

      <View style={styles.categoriesContainer}>
        <Categories />
      </View>

      <View>
        <Products />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
  },
  scrollView: {
    flex: 1,
    padding: 0,
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
    height: 40, // Adjust height as needed
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000", // Adjust input text color as needed
  },
  categoriesContainer: {
    marginTop: 0,
    paddingTop: 0,
  },
});
