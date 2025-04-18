import { READER_BACKEND_BASE_URL } from "@/constants";
import { createAPI } from "@/lib/axios/createAPI";

const READER = createAPI(READER_BACKEND_BASE_URL);

export const getTodos = async () => {
  const response = await READER.get("/todos");
  return response;
};

export const READER_API = { getTodos };
