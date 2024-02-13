import { deserializeMapState } from "./contract/map-generated";
import { deserializeDeliveryContractState } from "./contract/delivery-generated";
import { deserializeStatisticsContractState } from "./contract/statistics-generated";
import { CLIENT } from "./state";

export const updateContractState = async (name, address) => {
  if (address === undefined) {
    throw new Error("No address provided");
  }

  const contract = await CLIENT.getContractData(address)
  console.log(contract);
  
  if (contract != null) {
    // Reads the state of the contract
    const stateBuffer = Buffer.from(contract.serializedContract.state.data, "base64");
    console.log(stateBuffer)

    let state;
    if (name === 'map') {
      state = deserializeMapState({ state: stateBuffer });
    // } else if (name === 'bid') {
    //   state = deserializeMapState({ state: stateBuffer });
    } else if (name === 'zk-report') {
      state = deserializeStatisticsContractState({ state: stateBuffer });
    } else if (name === 'delivery') {
      state = deserializeDeliveryContractState({ state: stateBuffer });
    } else {
      throw new Error("No such contract");
    }

    console.log(state);

    return state;

  } else {
    throw new Error("Could not find data for contract");
  }

};