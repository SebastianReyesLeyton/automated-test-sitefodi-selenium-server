import { createSlice } from '@reduxjs/toolkit';

const getTestSlice = createSlice({
    name: 'obtainedTest',
    initialState: {},
    reducers: {
        updateObtainedTestState: (state, { payload }) => {
            state = Object.assign({}, payload.data);
            return state;
        },
        resetObtainedTestState: (state) => {
            state = {};
            return state;
        }
    }
});

export const { updateObtainedTestState, resetObtainedTestState } = getTestSlice.actions;
export default getTestSlice.reducer;