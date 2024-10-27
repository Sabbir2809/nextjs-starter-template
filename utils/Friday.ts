/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "react-toastify";
import { getAuthorizationHeader } from "./getAuthorizationHeader";

interface IFridayOptions {
  body?: object | string;
  headers?: object;
  showToast?: boolean;
}

// Create an Axios instance with a base URL
const axiosInstance = axios.create({});
// axios with friday
export default class Friday {
  static get(url: URL, options?: IFridayOptions) {
    return handleResponse(
      axiosInstance.get(url.href, {
        headers: {
          ...options?.headers,
          ...getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
      }),
      options
    );
  }

  static post(url: URL, options?: IFridayOptions) {
    return handleResponse(
      axiosInstance.post(url.href, options?.body, {
        headers: {
          ...options?.headers,
          ...getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
      }),
      options
    );
  }

  static put(url: URL, options?: IFridayOptions) {
    return handleResponse(
      axiosInstance.put(url.href, options?.body, {
        headers: {
          ...options?.headers,
          ...getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
      }),
      options
    );
  }

  static delete(url: URL, options?: IFridayOptions) {
    return handleResponse(
      axiosInstance.delete(url.href, {
        data: options?.body,
        headers: {
          ...options?.headers,
          ...getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
      }),
      options
    );
  }

  static upload(url: URL, body: FormData, options?: IFridayOptions) {
    return handleResponse(
      axiosInstance.post(url.href, body, {
        headers: {
          ...getAuthorizationHeader(),
          // "Content-Type": "multipart/form-data",
        },
      }),
      options
    );
  }
}

// errors handler
const handleResponse = async (
  promise: Promise<any>,
  options?: IFridayOptions
) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.error?.message || error.response?.data?.message
      : (error as Error).message;

    if (message && options?.showToast === undefined) {
      toast.error(message);
    }
    return null;
  }
};
