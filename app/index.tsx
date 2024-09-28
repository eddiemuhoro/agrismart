import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Auth from "@/components/authentication/Auth";
import { ThemedView } from "@/components/ThemedView";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        setSession(token);

        // const decodedToken = JSON.parse(token);
        // const currentTime = Date.now() / 1000;
        // if (decodedToken.exp < currentTime) {
        //   await AsyncStorage.removeItem("token");
        // } else {
        //   setSession(token);
        // }
      }
    };

    getSession();
  }, []);

  return (
    <>
      <ThemedView>
        {session ? <Redirect href="/(tabs)/" /> : <Auth />}
      </ThemedView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
