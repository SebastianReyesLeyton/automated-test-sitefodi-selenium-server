import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'usersRequest',
    initialState: [],
    reducers: {
        storeUsers: (state, { payload }) => {
            state = payload.users;
            return state;
        },
        resetUsers: ( state ) => {
            state = [];
            return state;
        }
    }
});

export const { storeUsers, resetUsers } = usersSlice.actions;
export default usersSlice.reducer;