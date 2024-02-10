import type { RequestOptions } from "./types"
import { getUserByName, createRequest as createRequestDB, } from "./queries";

const isClient = (name: string) => {
  try {
    return getUserByName(name);
  } catch (error) {
    return false; 
  } 
}



const createRequest = async (clientName: string, itemName: string, quantity: string, destination: string, options: RequestOptions) => {
  if (!isClient) {
    throw new Error('Not on client list');
  }
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
