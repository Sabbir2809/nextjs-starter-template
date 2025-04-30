import { createAPI } from "@/lib/axios/createAPI";
import { AUTH_API_BASE_URL } from "../constants";

const AUTH = createAPI(AUTH_API_BASE_URL);

const registration = async (body: IAuth) => {
  const response = await AUTH.post<{ token: string }>("/registration", body);
  return response.token;
};

const login = async (body: { phone: string; password: string }) => {
  const response = await AUTH.post<{ token: string }>("/login", body);
  return response.token;
};

// refresh token
const refreshAuth = async () => {
  const response = await AUTH.get<{ token: string }>("/refresh-token");
  return response.token;
};

const myProfile = async () => {
  const response = await AUTH.get<IAuth>("/my-profile");
  return response;
};

export const AUTH_API = {
  registration,
  login,
  refreshAuth,
  myProfile,
};
