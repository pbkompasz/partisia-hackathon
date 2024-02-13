import { createSlice } from '@reduxjs/toolkit'

export const mapContractSlice = createSlice({
  name: 'map-contract',
  initialState: {
    id: '',
    name: 'Map Contract',
    shardId: '',
    address: '',
    events: [],
    startDateUtcMillis: 0,
    description: '',
  },
  reducers: {
    setContract: (state, action)  => {
      state.name = action.payload.name;
      state.address = action.payload.address;
    },
    setContractState: (state, action) => {
      console.log(action.payload)
      state.events = action.payload.events;
      state.description = action.payload.description;
      state.startDateUtcMillis = action.payload.startDateUtcMillis;
    }
    // TODO
    // Set public keys for a contract
    // setEngineKey: (state, action) => {
    //   const { name, keys } = action.payload;
    // }
  }
})

export const { addContract, setContractState, } = mapContractSlice.actions;

export default mapContractSlice.reducer;
