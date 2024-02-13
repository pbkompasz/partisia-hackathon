import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authentication";
import demoReducer from "./demo";
import accountReducer from "./account";
import mapContractReducer from "./map-contract";
import deliveryContractReducer from "./delivery-contract";

export default configureStore({
  reducer: {
    auth: authReducer,
    demo: demoReducer,
    account: accountReducer,
    mapContract: mapContractReducer,
    deliveryContract: deliveryContractReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
