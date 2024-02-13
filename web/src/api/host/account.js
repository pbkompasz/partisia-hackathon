import { axiosClient } from "./client";

// TODO
const getAccount = async (id) => {
  try {
    const account = await axiosClient.get(`account/${id}`);
    return account.data.account;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

const getContracts = async (accountId) => {
  try {
    const account = await axiosClient.get(`account/${accountId}/contracts`);
    return account.data.contracts;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export {
  getAccount,
  getContracts,
}
