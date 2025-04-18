import { AxiosRequestConfig } from "axios";
import createAxiosInstance from "./axiosInstance";

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
        headers: {
          ...(config?.headers || {}),
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await instance.post<T>(url, formData, uploadConfig);
      return data;
    },
  };
};
