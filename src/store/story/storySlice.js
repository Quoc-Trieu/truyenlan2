import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listStory: []
}

const getListStory = createSlice({
    name: 'listStory',
    initialState,
    reducers: {
        getList: (state, action) => {
            state.listStory = action.payload;
        }
    }
})

export const { getList } = getListStory.actions;
export default getListStory.reducer