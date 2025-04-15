import { AUTH_USER_KEY, JWT_TOKEN_KEY, USER_TYPE } from "@/constants";
import { AUTH_API } from "@/services/auth-api";
import { IAuth, IAuthContext } from "@/types/auth";
import { deleteCookie, getCookie, setCookie } from "cookies-next/client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialState: IAuthContext = {
  isLoading: true,
  auth: undefined,
  registration: async () => {},
  login: async () => {},
  updateAuth: () => {},
  refreshAuth: async () => {},
  logout: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState<IAuth>();

  const registration = async (data: IAuth) => {
    try {
      setIsLoading(true);
      const token = await AUTH_API.registration(data);
      if (token) {
        setCookie(JWT_TOKEN_KEY, token);
        await refreshAuth();
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (phone: string, password: string) => {
    try {
      setIsLoading(true);
      const token = await AUTH_API.login({ phone, password });
      if (token) {
        setCookie(JWT_TOKEN_KEY, token);
        await refreshAuth();
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateAuth = (newAuth: IAuth) => {
    setAuth(newAuth);
    setCookie(AUTH_USER_KEY, JSON.stringify(newAuth));
  };

  const refreshAuth = async () => {
    setIsLoading(true);
    try {
      const data = await AUTH_API.myProfile();
      if (data && data.type.includes(USER_TYPE)) {
        setAuth(data);
        setCookie(AUTH_USER_KEY, JSON.stringify(data));
      } else {
        toast.error("Invalid user type.");
      }
    } catch (error) {
      console.error("Refresh Error:", error);
      toast.error("Failed to refresh user.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAuth(undefined);
    deleteCookie(AUTH_USER_KEY);
    deleteCookie(JWT_TOKEN_KEY);
    window.location.href = "/";
  };

  useEffect(() => {
    const storedUser = getCookie(AUTH_USER_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser as string) as IAuth;
        setAuth(parsedUser);
      } catch {
        deleteCookie(AUTH_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        auth,
        registration,
        login,
        updateAuth,
        refreshAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
