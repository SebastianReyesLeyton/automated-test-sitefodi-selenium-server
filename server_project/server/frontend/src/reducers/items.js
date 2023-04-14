import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
    name: 'usersRequest',
    initialState: [],
    reducers: {
        storeItems: (state, { payload }) => {
            state = payload.data;
            return state;
        },
        resetItems: ( state ) => {
            state = [];
            return state;
        }
    }
});

export const { storeItems, resetItems } = itemsSlice.actions;
export default itemsSlice.reducer;