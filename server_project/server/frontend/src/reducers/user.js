import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'userRequest',
    initialState: {},
    reducers: {
        successAlertState: (state, { payload }) => {
            state = Object.assign({}, payload.data);
            return state;
        },
        errorAlertState: (state, { payload }) => {
            state = Object.assign({}, payload.data);
            return state;
        },
        resetAlertState: (state) => {
            state = {}
            return state;
        }
    }
});

export const { successAlertState, errorAlertState, resetAlertState } = userSlice.actions;
export default userSlice.reducer;