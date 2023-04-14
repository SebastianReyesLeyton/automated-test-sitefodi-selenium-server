import { createSlice } from '@reduxjs/toolkit';

const getUserSlice = createSlice({
    name: 'obtainedUser',
    initialState: {},
    reducers: {
        updateObtainedUserState: (state, { payload }) => {
            state = Object.assign({}, payload.data);
            return state;
        },
        resetObtainedUserState: (state) => {
            state = {};
            return state;
        }
    }
});

export const { updateObtainedUserState, resetObtainedUserState } = getUserSlice.actions;
export default getUserSlice.reducer;