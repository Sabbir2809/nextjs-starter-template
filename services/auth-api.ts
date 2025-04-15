import { AUTH_BACKEND_BASE_URL } from "@/constants";
import { createAPI } from "@/lib/apiClient";
import { IAuth } from "@/types/auth";

const AUTH = createAPI(AUTH_BACKEND_BASE_URL);

const registration = async (body: IAuth) => {
  const response = await AUTH.post("/registration", body);
  return response;
};

const login = async (body: { phone: string; password: string }) => {
  const response = await AUTH.post("/login", body);
  return response;
};

const myProfile = async () => {
  const response = await AUTH.get<IAuth>("/my-profile");
  return response;
};

export const AUTH_API = {
  registration,
  login,
  myProfile,
};
