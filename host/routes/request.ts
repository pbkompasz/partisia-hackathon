import type { RequestOptions } from "../types"
import { getAccountByEmail, createRequest as createRequestDB, } from "../queries/queries";

const createRequest = async (clientName: string, itemName: string, quantity: string, destination: string, options: RequestOptions) => {
  try {
    const id = await createRequestDB(clientName, itemName, quantity, destination, options);
    console.log(id);
    return String(id);
  } catch (error) {
    throw error;  
  }
}

export {
  createRequest,
}
