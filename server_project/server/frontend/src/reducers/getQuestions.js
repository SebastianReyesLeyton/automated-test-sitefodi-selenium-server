import { createSlice } from '@reduxjs/toolkit';

const questionsSlice = createSlice({
    name: 'questionsRequest',
    initialState: [],
    reducers: {
        storeQuestions: (state, { payload }) => {
            state = payload.data;
            return state;
        },
        resetQuestions: ( state ) => {
            state = [];
            return state;
        }
    }
});

export const { storeQuestions, resetQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;