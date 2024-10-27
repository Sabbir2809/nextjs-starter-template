import Friday from "@/utils/Friday";
const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;

export async function registration(body: object) {
  return await Friday.post(new URL(`${AUTH_BASE_URL}/registration`), { body });
}

export async function login(body: object) {
  return await Friday.post(new URL(`${AUTH_BASE_URL}/login`), { body });
}

export async function getProfile() {
  return await Friday.get(new URL(`${AUTH_BASE_URL}/`));
}
