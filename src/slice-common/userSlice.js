import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userApi from 'api/userApi'


//create action with redux thunk
export const getMe = createAsyncThunk('user/getMe', async (params, thunkApi) => {
    // thunkApi.dispatch(...) ==> để dispatch những action khác

    const currentUser = await userApi.getMe()
    return currentUser
})



const userSlice = createSlice({
   name: 'user',
   initialState: {
       current: {},
       loading: false,
       error: '',
   },
   reducers: {

   },
   extraReducers: {
        //pending => khi đang chờ
        [getMe.pending]: (state) => {
          state.loading = true
        },

        //rejected => khi thất bại
        [getMe.rejected]: (state, action) => {
          state.loading = false
          state.error = action.payload
        },

        //fulfilled => khi thành công
        [getMe.fulfilled]: (state, action) => {
          state.loading = false
          state.current = action.payload
        },
   }
})

const { reducer: userReducer } = userSlice
export default userReducer