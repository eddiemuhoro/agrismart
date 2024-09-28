import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, AppState } from "react-native";
import { Button, Input, Text } from "@rneui/themed";
import { ThemedView } from "../ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Correct import for AsyncStorage
import { Redirect, useNavigation, useRouter } from "expo-router";
import { ThemedText } from "../ThemedText";

const url = "https://shpp-backend.onrender.com/login";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("token", data.token);
        router.push("/(tabs)/");
        Alert.alert("Success", "You have been signed in");
      } else {
        Alert.alert("Error", "Invalid email or password");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedView style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            label="Email"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </ThemedView>
        <ThemedView style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
          />
        </ThemedView>
        <ThemedView style={[styles.verticallySpaced, styles.mt20]}>
          <Button title="Sign in" disabled={loading} onPress={signIn} />
        </ThemedView>
        <ThemedText>
          {loading ? "Loading..." : "Don't have an account?"}
        </ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    height: "100%",
    justifyContent: "center",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
