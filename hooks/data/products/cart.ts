import { baseUrl } from "@/constants/baseUrl";
import { useUserId } from "../auth/token";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useSWR from "swr";

export const useCartItems = () => {
  const token = AsyncStorage.getItem("token");
  const userId = useUserId();
  const url = `${baseUrl}/order/fetch/cart/${userId}`;
  const fetcher = async () => {
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  };
  const { data, isLoading } = useSWR(url, fetcher);
  //   console.log("bjhsf", data);

  console.log(url);
  return {
    cart_items: data,
    isLoading,
  };
};
