import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import useSWR from "swr";

const url = "https://shpp-backend.onrender.com/product";
const token = AsyncStorage.getItem("token");

export const useProducts = () => {
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
  console.log("bjhsf", data);
  return {
    products: data,
    isLoading,
  };
};

export const useProduct = (product_id: any) => {
  const fetcher = async () => {
    return axios
      .get(`${url}/${product_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  };

  const { data } = useSWR(url, fetcher, {
    revalidateOnFocus: true,
  });

  return {
    product: data,
  };
};
