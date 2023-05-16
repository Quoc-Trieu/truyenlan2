import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: ''
}

const detailUserSlice = createSlice({
    name: 'detailUser',
    initialState,
    reducers: {
        selecUser: (state, action) => {
            state.email = action.payload;
            localStorage.setItem('emailUser', state.email);
        }
    }
})

export const { selecUser } = detailUserSlice.actions;
export default detailUserSlice.reducer