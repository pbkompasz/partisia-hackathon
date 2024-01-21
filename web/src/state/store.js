import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './authentication'

export default configureStore({
  reducer: {
    counter: counterReducer,
  }
})
