import Friday from "@/utils/Friday";
const READER_BASE_URL = process.env.NEXT_PUBLIC_READER_BASE_URL;

export async function getReader() {
  return await Friday.get(new URL(`${READER_BASE_URL}/`));
}
