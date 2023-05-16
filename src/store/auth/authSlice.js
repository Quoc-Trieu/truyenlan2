import { createSlice } from '@reduxjs/toolkit'
import { fetchLogin, getUserInfor } from './authThunk'

const initialState = {
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            console.log(action);
            state.user = action.payload
        })
        builder.addCase(getUserInfor.fulfilled, (state, action) => {
            state.user = action.payload
        })

    }
})

export default authSlice.reducer;