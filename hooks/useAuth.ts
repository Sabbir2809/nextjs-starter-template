import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

// custom hooks
export const useAuth = () => useContext(AuthContext);
