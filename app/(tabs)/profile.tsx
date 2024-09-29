import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { commonStyles } from "@/constants/styles";
import Topbar from "@/components/topbar";
import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const profile = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    // Redirect to login screen
    router.navigate("/");
  };

  return (
    <View style={commonStyles.container}>
      <Topbar />
      <Text>profile</Text>
      <TouchableOpacity onPress={handleLogout}>
        <ThemedText>Logout</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
