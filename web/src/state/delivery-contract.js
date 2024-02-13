import { createSlice } from '@reduxjs/toolkit'

export const deliveryContractSlice = createSlice({
  name: 'delivery-contract',
  initialState: {
    id: '',
    name: 'Delivery',
    address: '',
    actions: [],
    current_action: 0,
    deadline: 0,
    isUrgent: false,
    loggingLevel: 0,
    isFragile: false,
    takePhotos: false,
    minWeight: 0,
  },
  reducers: {
    setContract: (state, action)  => {
      state.name = action.payload.name;
      state.address = action.payload.address;
    },
    setContractState: (state, action) => {
      state.actions = action.payload.actions;
      state.currentAction = action.payload.currentAction;
      state.deadline = action.payload.deadline;
      state.isUrgent = action.payload.isUrgent;
      state.loggingLevel = action.payload.loggingLevel;
      state.isFragile = action.payload.isFragile;
      state.takePhotos = action.payload.takePhotos;
      state.minWeight = action.payload.minWeight;
    }
  }
})

export const { addContract, setContractState, } = deliveryContractSlice.actions;

export default deliveryContractSlice.reducer;
