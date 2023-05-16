import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    page: '1',
    take: '5',
    search: '',
    order : "DESC"
}

const saleSlice = createSlice({
    name: 'saleManager',
    initialState,
    reducers: {
        changePageSale: (state, action) => {
            state.page = action.payload;
        },
        searchSale: (state, action) => {
            state.search = action.payload;
            state.page = '1';
        }
    }
})

export const { changePageSale, searchSale } = saleSlice.actions;
export default saleSlice.reducer