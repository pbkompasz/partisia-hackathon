import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authentication";
import demoReducer from "./demo";
import accountReducer from "./account";

export default configureStore({
  reducer: {
    auth: authReducer,
    demo: demoReducer,
    account: accountReducer,
  }
})
