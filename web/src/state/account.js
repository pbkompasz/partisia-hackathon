import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    shardId: '',
    accountCoins: {},
  },
  reducers: {
    updateAccountChain: async (state, action) => {
      state.shardId = action.payload.account.shardId;
      state.accountCoins = action.payload.account.accountCoins;
    },
    updateAccountHost: async (state, action) => {
      state.username = action.payload.account.username;
      state.email = action.payload.account.email;
      state.firstname = action.payload.account.firstname;
      state.lastname = action.payload.account.lastname;
    },
  }
})

export const { updateAccountHost, updateAccountChain, } = accountSlice.actions;

export default accountSlice.reducer;
