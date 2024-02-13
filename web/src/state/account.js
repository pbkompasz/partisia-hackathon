import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    id: '',
    email: '',
    firstname: '',
    lastname: '',
    shardId: '',
    accountCoins: {},
    contracts: [],
    address: '',
    // role: '',
    // role: "driver",
    // role: "dispatcher",
    role: "manufacturer",
  },
  reducers: {
    updateAccountChain: (state, action) => {
      state.shardId = action.payload.shardId;
      state.accountCoins = action.payload.accountCoins;
    },
    updateAccountHost: (state, action) => {
      console.log(action.payload);
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.contracts = action.payload.contracts;
      state.role = action.payload.role;
    },
    updateAccountContracts: (state, action) => {
      state.contracts = action.payload.contracts;
    },
    updateAccountLogin: (state, action) => {
      state.address = action.payload.address;
      state.signAndSendTransaction = action.payload.signAndSendTransaction;
    },
    changeRole: (state, action) => {
      state.role = action.payload.role;
    },
  }
})

export const { updateAccountHost, updateAccountChain, updateAccountLogin, updateAccountContracts, } = accountSlice.actions;

export default accountSlice.reducer;
