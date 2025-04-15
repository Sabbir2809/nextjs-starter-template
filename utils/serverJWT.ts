import { JWT_TOKEN_KEY } from "@/constants";
import { getCookie } from "cookies-next";

export async function getServerJwt() {
  return await getCookie(JWT_TOKEN_KEY);
}
