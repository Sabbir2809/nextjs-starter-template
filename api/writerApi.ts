import Friday from "@/utils/Friday";
const WRITE_BASE_URL = process.env.NEXT_PUBLIC_WRITE_BASE_URL;

export async function createWriter(body: object) {
  return await Friday.post(new URL(`${WRITE_BASE_URL}/`), { body });
}
