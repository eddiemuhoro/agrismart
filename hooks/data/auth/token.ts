import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  exp: number;
}

export const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decodedToken: DecodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      }
    };
    getToken();
  }, []);

  return userId;
};
