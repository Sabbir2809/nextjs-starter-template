import { JWT_TOKEN_KEY } from "@/constants";
import { getCookie } from "cookies-next/client";

export function getClientJwt() {
  return getCookie(JWT_TOKEN_KEY);
}
