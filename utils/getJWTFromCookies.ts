import { JWT_TOKEN_KEY } from "@/constants";
import { cookies } from "next/headers";

export async function getJWTFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(JWT_TOKEN_KEY)?.value ?? null;
  return token;
}
