import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    page: '1',
    limit: '10',
}

const baivietManSlice = createSlice({
    name: 'baivietManager',
    initialState,
    reducers: {
        ChangePage: (state, action) => {
            state.page = action.payload;
        },
        SearchUser: (state, action) => {
            state.search = action.payload;
            state.page = '1';
        }
    }
})

export const { ChangePage, SearchUser } = baivietManSlice.actions;
export default baivietManSlice.reducer