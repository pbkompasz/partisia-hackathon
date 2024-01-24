import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: "Driver",
    authenticated: true,
    // role: "logistics-driver",
    // role: "logistics-dispatcher",
    role: "manufacturer",
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
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
