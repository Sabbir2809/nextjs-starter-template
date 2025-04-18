import FullScreenLoader from "@/app/loading";
import { deleteCookie, getCookie, setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { JWT_TOKEN_KEY } from "../constants";
import { AUTH_API } from "../services/auth-api";
import { AuthContext } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<IAuth | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useRouter();

  // registration
  const registration = async (data: IAuth) => {
    try {
      setIsLoading(true);
      const token = await AUTH_API.registration(data);
      setCookie(JWT_TOKEN_KEY, token);
      toast.success("Registration successful");
      navigate.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // login
  const login = async (data: ILoginPayload) => {
    try {
      setIsLoading(true);
      const token = await AUTH_API.login(data);
      setCookie(JWT_TOKEN_KEY, token);
      const user = await AUTH_API.myProfile();
      setAuth(user);
      toast.success("Login successful");
      navigate.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  // logout
  const logout = () => {
    setAuth(undefined);
    deleteCookie(JWT_TOKEN_KEY);
    toast.info("Logged out");
    navigate.push("/login");
  };

  // refresh token
  const refreshToken = async () => {
    try {
      const token = await AUTH_API.refreshAuth();
      setCookie(JWT_TOKEN_KEY, token);
      const user = await AUTH_API.myProfile();
      setAuth(user);
    } catch (error) {
      console.error("Refresh token failed:", error);
      logout();
    }
  };

  // hydrate token on first load
  useEffect(() => {
    const token = getCookie(JWT_TOKEN_KEY);
    if (token) {
      refreshToken().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  // Context value
  const contextValue = {
    isLoading,
    auth,
    registration,
    login,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {isLoading ? <FullScreenLoader /> : children}
    </AuthContext.Provider>
  );
};
