import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

// custom hooks
export const useAuth = () => useContext(AuthContext);
