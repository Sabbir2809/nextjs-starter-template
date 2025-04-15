import { getClientJwt } from "@/utils/clientJWT";
import { getServerJwt } from "@/utils/serverJWT";
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { toast } from "react-toastify";

// Create and configure Axios instance
const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
  });

  // Request Interceptor
  instance.interceptors.request.use(
    async (config) => {
      const token = getClientJwt() || getServerJwt();

      if (token) {
        if (!(config.headers instanceof AxiosHeaders)) {
          config.headers = new AxiosHeaders(config.headers);
        }
        config.headers.set("Authorization", `Bearer ${token}`);
      }

      return config;
    },
    (error: AxiosError) => {
      toast.error(error.message);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const message =
        (error.response?.data as { message?: string })?.message ||
        error.message ||
        "Something went wrong!";
      console.log(message);
      return Promise.reject(error);
    }
  );

  return instance;
};

// Export reusable API functions
export const createAPI = (baseURL: string) => {
  const instance = createAxiosInstance(baseURL);

  return {
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
      const { data } = await instance.get<T>(url, config);
      return data;
    },

    post: async <T, D = unknown>(
      url: string,
      body?: D,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const { data } = await instance.post<T>(url, body, config);
      return data;
    },

    put: async <T, D = unknown>(
      url: string,
      body?: D,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const { data } = await instance.put<T>(url, body, config);
      return data;
    },

    patch: async <T, D = unknown>(
      url: string,
      body?: D,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const { data } = await instance.patch<T>(url, body, config);
      return data;
    },

    delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
      const { data } = await instance.delete<T>(url, config);
      return data;
    },

    upload: async <T>(
      url: string,
      formData: FormData,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const uploadConfig: AxiosRequestConfig = {
        ...config,
        headers: new AxiosHeaders({
          ...(config?.headers || {}),
          "Content-Type": "multipart/form-data",
        }),
      };

      const { data } = await instance.post<T>(url, formData, uploadConfig);
      return data;
    },
  };
};
