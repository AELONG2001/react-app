import { configureStore } from '@reduxjs/toolkit'
import photoReducer from 'features/Photo/PhotoSlice'
import userReducer from 'slice-common/userSlice'

const rootReducer = {
  photos: photoReducer,
  user: userReducer
}

const store = configureStore({
  reducer: rootReducer
})

export default store