import { sign as generatedSign } from "./map-generated";
import { getContractAddress } from "../state";
import { sendTransactionAndWait } from "../client/transaction-api";

/**
 * API for the token contract.
 * This minimal implementation only allows for transferring tokens to a single address.
 *
 * The implementation uses the TransactionApi to send transactions, and ABI for the contract to be
 * able to build the RPC for the transfer transaction.
 */
export class MapApi {
  transactionApi;

  constructor(transactionApi) {
    this.transactionApi = transactionApi;
  }

  /**
   * Build and send sign transaction.
   */
  sign = () => {
    const address = getContractAddress();
    if (address === undefined) {
      throw new Error("No address provided");
    }
    // First build the RPC buffer that is the payload of the transaction.
    const rpc = sign();
    // Then send the payload via the transaction API.
    return this.transactionApi.sendTransactionAndWait(address, rpc, 10_000);
  };
}

const sign = async (contractAddress, accountAddress, data) => {
    if (contractAddress === undefined) {
      throw new Error("No address provided");
    }

    // First build the RPC buffer that is the payload of the transaction.
    const rpc = generatedSign(data.coordX, data.coordY, data.description, data.eventType, data.createDateUtcMillis, data.duration);
    // Then send the payload via the transaction API.
    return await sendTransactionAndWait(accountAddress, contractAddress, rpc, 100_000);
  };

export {
  sign,
}
