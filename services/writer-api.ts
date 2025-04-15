import { WRITE_BACKEND_BASE_URL } from "@/constants";
import { createAPI } from "@/lib/apiClient";

const WRITER = createAPI(WRITE_BACKEND_BASE_URL);

export const updateOrder = async (orderId: string, body: object) => {
  const response = await WRITER.put(`/orders/${orderId}`, body);
  return response;
};

export const WRITER_API = {
  updateOrder,
};
