import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Auth from "@/components/authentication/Auth";
import { ThemedView } from "@/components/ThemedView";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import Toast from "react-native-toast-message";

const index = () => {
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        setSession(token);

        const decodedToken = jwtDecode(token);
        //current time in seconds
        const currentTime = new Date().getTime() / 1000;
        //commpare the current time with the expiry time
        if (
          decodedToken &&
          decodedToken.exp &&
          decodedToken.exp < currentTime
        ) {
          await AsyncStorage.removeItem("token");
          setSession(null);
        }
      }
    };

    getSession();
  }, [session]);

  console.log("🚀 ~ file: index.tsx ~ line 38 ~ index ~ session", session);

  return (
    <>
      <ThemedView>
        {session !== null ? <Redirect href="/(tabs)/" /> : <Auth />}
      </ThemedView>
      <Toast />
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
