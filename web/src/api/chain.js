import axios from "axios";

const URL = 'https://node1.testnet.partisiablockchain.com';

const axiosClient = axios.create({
  baseURL: URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosClient.interceptors.request.use(
  // TODO Set loading true
  (config) => {
    // Do something with the request before it is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  // TODO Set loading false
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

const makeRequest = async (method, route) => {
  try {
    if (method === 'get') {
      return (await axiosClient.get(route)).data;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

const getTransaction = async (shard = 'Shard1', transactionId) => {
  return await makeRequest('get', `/shards/${shard}/blockchain/transaction/${transactionId}`); 
}

const getContract = async (contractId) => {
  return await makeRequest('get', `/chain/contracts/${contractId}`);
}

const getAccount = async (accountId) => {
  return await makeRequest('get', `/chain/accounts/${accountId}`);
}

const getChain = async () => {
  return await makeRequest('get', '/chain');
}

export {
  getTransaction,
  getContract,
  getAccount,
  getChain,
}

