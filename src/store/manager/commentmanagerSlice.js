import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    page: '1',
    limit: '10',
}

const commentManSlice = createSlice({
    name: 'commentManager',
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

export const { ChangePage, SearchUser } = commentManSlice.actions;
export default commentManSlice.reducer