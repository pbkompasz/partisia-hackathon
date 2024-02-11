import PartisiaSdk from "partisia-sdk";

import {
  CLIENT,
  resetAccount,
  setAccount,
} from "./state";
import { TransactionApi } from "./client/transaction-api";
import { serializeTransaction } from "./serialize";


// TODO Create state for loading or move logic to component
const setConnectionStatus = () => {}
// const toggleVisibility = (asd) => {}

const handleWalletConnect = async (connect) => {
  // Clean up state
  resetAccount();
  setConnectionStatus("Connecting...");
  try {
   const userAccount = await connect();
    setAccount(userAccount);

    // Fix UI
    setConnectionStatus(`Logged in: ${userAccount.address}`);
    // toggleVisibility("#wallet-connect");
    // toggleVisibility("#metamask-connect");
    // toggleVisibility("#private-key-connect");
    // toggleVisibility("#wallet-disconnect");
    // updateInteractionVisibility();
  
  } catch (error) {
    if ("message" in error) {
      setConnectionStatus(error.message);
    } else {
      setConnectionStatus("An error occurred trying to connect wallet: " + error);
    }
  }
   
};


const connectMpcWalletClick = async () => {
  // Call Partisia SDK to initiate connection
  const partisiaSdk = new PartisiaSdk();
  let userAccount;
  let connect = async () => {
  try {
    await partisiaSdk.connect({
      // eslint-disable-next-line
      permissions: ["sign"],
      dappName: "Wallet integration demo",
      chainId: "Partisia Blockchain Testnet",
    })

    const connection = partisiaSdk.connection;
    if (connection != null) {
      // User connection was successful. Use the connection to build up a connected wallet
      // in state.
      userAccount = {
        address: connection.account.address,
        signAndSendTransaction: (payload, cost = 0) => {
          // To send a transaction we need some up-to-date account information, i.e. the
          // current account nonce.
          return CLIENT.getAccountData(connection.account.address).then((accountData) => {
            if (accountData == null) {
              throw new Error("Account data was null");
            }
            // Account data was fetched, build and serialize the transaction
            // data.
            const serializedTx = serializeTransaction(
              {
                cost: String(cost),
                nonce: accountData.nonce,
                validTo: String(new Date().getTime() + TransactionApi.TRANSACTION_TTL),
              },
              payload
            );
            // Ask the MPC wallet to sign and send the transaction.
            return partisiaSdk
              .signMessage({
                payload: serializedTx.toString("hex"),
                payloadType: "hex",
                dontBroadcast: false,
              })
              .then((value) => {
                return {
                  putSuccessful: true,
                  shard: CLIENT.shardForAddress(connection.account.address),
                  transactionHash: value.trxHash,
                };
              })
              .catch(() => ({
                putSuccessful: false,
              }));
          });
        },
      };
        return userAccount;
      } else {
      throw new Error("Unable to establish connection to MPC wallet");
    }
  } catch (error) {
      
    // Something went wrong with the connection.
    if (error instanceof Error) {
      if (error.message === "Extension not Found") {
        throw new Error("Partisia Wallet Extension not found.");
      } else if (error.message === "user closed confirm window") {
        throw new Error("Sign in using MPC wallet was cancelled");
      } else if (error.message === "user rejected") {
        throw new Error("Sign in using MPC wallet was rejected");
      } else {
        throw error;
      }
    } else {
      throw new Error(error);
    }
    
    }
  }
  await handleWalletConnect(
    connect,
  );
  return userAccount;
};

export {
  connectMpcWalletClick,
};
