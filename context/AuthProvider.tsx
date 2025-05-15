import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AUTH_USER_KEY, JWT_TOKEN_KEY } from "../constants";
import { AUTH_API } from "../services/auth-api";
import { AuthContext } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<IAuth | undefined>();
  const router = useRouter();

  const registration = async (data: IAuth) => {
    try {
      const token = await AUTH_API.registration(data);
      setCookie(JWT_TOKEN_KEY, token);
      const user = await AUTH_API.myProfile();
      setCookie(AUTH_USER_KEY, JSON.stringify(user));
      setAuth(user);
      toast.success("Registration successful");
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed");
    }
  };

  const login = async (data: ILoginPayload) => {
    try {
      const token = await AUTH_API.login(data);
      setCookie(JWT_TOKEN_KEY, token);
      const user = await AUTH_API.myProfile();
      setCookie(AUTH_USER_KEY, JSON.stringify(user));
      setAuth(user);
      toast.success("Login successful");
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed, please try again");
    }
  };

  const logout = () => {
    setAuth(undefined);
    deleteCookie(JWT_TOKEN_KEY);
    deleteCookie(AUTH_USER_KEY);
    localStorage.clear();
    toast.info("Logged out");
    router.push("/login");
  };

  const refreshToken = async () => {
    try {
      const token = await AUTH_API.refreshAuth();
      setCookie(JWT_TOKEN_KEY, token);
      const user = await AUTH_API.myProfile();
      setCookie(AUTH_USER_KEY, JSON.stringify(user));
      setAuth(user);
    } catch (error) {
      console.error("Refresh token failed:", error);
      logout();
    }
  };

  useEffect(() => {
    const token = getCookie(JWT_TOKEN_KEY) as string;
    const authCookie = getCookie(AUTH_USER_KEY) as string;

    if (token) {
      if (authCookie) {
        setAuth(JSON.parse(authCookie));
      } else {
        AUTH_API.myProfile()
          .then((user) => {
            setAuth(user);
            setCookie(AUTH_USER_KEY, JSON.stringify(user));
          })
          .catch(() => logout());
      }
    }
  }, []);

  const contextValue: IAuthContext = {
    auth,
    registration,
    login,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
