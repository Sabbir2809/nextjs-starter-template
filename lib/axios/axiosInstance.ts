import { getClientJwt } from "@/utils/clientJWT";
import { getServerJwt } from "@/utils/serverJWT";
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";

// Check if we are on the client-side or server-side
const isClient = (): boolean => typeof window !== "undefined";

// Create Axios instance with baseURL
const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      // Add other headers if necessary
    },
  });

  // 🔐 Attach JWT token to requests
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = isClient() ? getClientJwt() : getServerJwt();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      console.error("[Request-Error]:", error.message);
      return Promise.reject(error);
    }
  );

  // ⚠️ Centralized error handler for API responses
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const { response } = error;
      let errorMessage = "Something went wrong!";

      // Handle error based on response status
      if (response) {
        const { status } = response;
        switch (status) {
          case 400:
            errorMessage = `Bad Request (${status}): Invalid request. Please check your input.`;
            break;
          case 401:
            errorMessage = `Unauthorized (${status}): You need to log in again.`;
            break;
          case 403:
            errorMessage = `Forbidden (${status}): You don’t have permission for this action.`;
            break;
          case 404:
            errorMessage = `Not Found (${status}): Resource not found. Please check the URL.`;
            break;
          case 500:
            errorMessage = `Internal Server Error (${status}): Something went wrong on our side. Please try again later.`;
            break;
          default:
            errorMessage = `Unknown Error (${status}): An unexpected error occurred. Please try again.`;
        }
      } else if (error.request) {
        errorMessage = "Network error! Please check your internet connection.";
      }

      // Show error messages in a toast (client-side only)
      if (isClient()) toast.error(errorMessage);

      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;
