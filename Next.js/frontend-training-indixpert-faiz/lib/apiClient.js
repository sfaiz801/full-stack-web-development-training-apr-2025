import axios from "axios";
import { LOCAL_STORAGE_KEYS } from "@/constants";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
        if (!storedUser) {
          localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
          localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
          if (window.location.pathname !== "/signin" && window.location.pathname !== "/") {
            window.location.href = "/signin";
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
