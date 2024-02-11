import { createSlice } from '@reduxjs/toolkit'

export const demoSlice = createSlice({
  name: 'demo',
  initialState: {
    status: false,
    // role: "logistics-driver",
    role: "logistics-dispatcher",
    // role: "manufacturer",
  },
  reducers: {
    enable: state => {
      state.status = true;
    },
    disable: state => {
      state.status = false;
    },
  }
})

// Action creators are generated for each case reducer function
export const { enable, disable, } = demoSlice.actions;

export default demoSlice.reducer;
