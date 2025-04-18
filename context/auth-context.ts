import { createContext } from "react";

export const initialState: IAuthContext = {
  isLoading: true,
  auth: undefined,
  registration: async () => {},
  login: async () => {},
  logout: () => {},
  refreshToken: async () => {},
};

export const AuthContext = createContext<IAuthContext>(initialState);
