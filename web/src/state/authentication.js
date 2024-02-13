import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: "Driver",
    authenticated: false,
  },
  reducers: {
    logout: state => {
      state.authenticated = false;
    },
    login: state => {
      state.authenticated = true;
    },
  }
})

// Action creators are generated for each case reducer function
export const { login, logout, changeRole, } = authSlice.actions;

export default authSlice.reducer;
