import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    page: '1',
    limit: '10',
}

const userManSlice = createSlice({
    name: 'userManager',
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

export const { ChangePage, SearchUser } = userManSlice.actions;
export default userManSlice.reducer