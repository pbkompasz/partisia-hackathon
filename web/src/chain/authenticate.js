import PartisiaSdk from "partisia-sdk";

const handleWalletConnect = async (connect) => {
  return await connect();
};

const connectMpcWalletClick = async () => {
  // Call Partisia SDK to initiate connection
  const partisiaSdk = new PartisiaSdk();
  let connect = async () => {
    try {
      await partisiaSdk.connect({
        // eslint-disable-next-line
        permissions: ["sign"],
        dappName: "ChainMove",
        chainId: "Partisia Blockchain Testnet",
      })

      const connection = partisiaSdk.connection;
      if (connection != null) {
        // User connection was successful. Use the connection to build up a connected wallet
        // in state.
        return connection.account.address;
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
  return await handleWalletConnect(
    connect,
  );
};

export {
  connectMpcWalletClick,
};
