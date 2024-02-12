import { CLIENT } from "../state";
import PartisiaSdk from "partisia-sdk";
import { serializeTransaction } from "../serialize";
import account from "../../state/account";

export const TRANSACTION_TTL = 60_000;
const DELAY_BETWEEN_RETRIES = 1_000;
const MAX_TRIES = TRANSACTION_TTL / DELAY_BETWEEN_RETRIES;

const waitForTransaction = async (
    shard,
    identifier,
    tryCount = 0
  ) => {
    const executedTransaction = await CLIENT.getExecutedTransaction(shard, identifier)
    if (executedTransaction == null) {
      if (tryCount >= MAX_TRIES) {
        throw new Error(
          'Transaction "' + identifier + '" not finalized at shard "' + shard + '"'
        );
      } else {
        return this.delay(DELAY_BETWEEN_RETRIES).then(() =>
          this.waitForTransaction(shard, identifier, tryCount + 1)
        );
      }
    } else if (!executedTransaction.executionSucceeded) {
      throw new Error('Transaction "' + identifier + '" failed at shard "' + shard + '"');
    } else {
      return await Promise.all(
        executedTransaction.events.map((e) =>
          this.waitForTransaction(e.destinationShard, e.identifier)
        )
      )
    }
  };

export const sendTransactionAndWait = async (
  accountAddress,
    address,
    rpc,
    gasCost
  ) => {
    console.log(address, rpc, account, gasCost)
  const putResponse = await signAndSendTransaction(
    accountAddress,
    {
      rpc,
      address,
    },
    gasCost
  )
  console.log(putResponse)
  if (putResponse.putSuccessful) {
    await waitForTransaction(putResponse.shard, putResponse.transactionHash);
    return putResponse.transactionHash;
  } else {
    throw new Error("Transaction could not be sent");
  }
  
};

const signAndSendTransaction = async (accountAddress, payload, cost = 100000) => {
  // To send a transaction we need some up-to-date account information, i.e. the
  // current account nonce.
  const partisiaSdk = new PartisiaSdk();
  await partisiaSdk
      .connect({
        // eslint-disable-next-line
        permissions: ["sign"],
        dappName: "ChainMove",
        chainId: "Partisia Blockchain Testnet",
      })
  const connection = partisiaSdk.connection;

  const accountData = await CLIENT.getAccountData(accountAddress)
  if (accountData == null) {
    throw new Error("Account data was null");
  }
  // Account data was fetched, build and serialize the transaction
  // data.
  const serializedTx = serializeTransaction(
    {
      cost: String(cost),
      nonce: accountData.nonce,
      validTo: String(new Date().getTime() + TRANSACTION_TTL),
    },
    payload
  );
  // Ask the MPC wallet to sign and send the transaction.
  try {
    const value = await partisiaSdk.signMessage({
      payload: serializedTx.toString("hex"),
      payloadType: "hex",
      dontBroadcast: false,
    })
    console.log(value)
    return {
      putSuccessful: true,
      shard: CLIENT.shardForAddress(connection.account.address),
      transactionHash: value.trxHash,
    }; 
  } catch (error) {
    console.log(error)
      return {
        putSuccessful: false,
      }
  }
};
