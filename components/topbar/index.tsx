import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { Icon } from "@rneui/themed";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";

const Topbar = () => {
  const router = useRouter();
  const route = useRoute();

  const title = route.name || "Farmer";
  //title starts with a capital letter
  const screenTitle = title.charAt(0).toUpperCase() + title.slice(1);
  return (
    <ThemedView style={styles.header}>
      <ThemedText type="title" style={styles.title}>
        {screenTitle == "Index" ? "Farmer" : screenTitle}
      </ThemedText>
      <View style={styles.iconsContainer}>
        {/* <Icon
          style={styles.iconBar}
          name="shopping-cart"
          type="font-awesome"
          color="#007E2F"
        /> */}
        <View style={styles.bellIconWrapper}>
          <Icon
            style={styles.iconBar}
            name="bell-o"
            type="font-awesome"
            color="#007E2F"
          />
          {/* Green dot for notifications */}
          <View style={styles.notificationDot} />
        </View>
        {/* <Icon
          style={styles.iconBar}
          name="user"
          type="font-awesome"
          color="#007E2F"
          onPress={() => router.navigate("/(tabs)/profile")}
        /> */}
      </View>
    </ThemedView>
  );
};

export default Topbar;

const styles = StyleSheet.create({
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
});
