import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authentication'

export default configureStore({
  reducer: {
    auth: authReducer,
  }
})
