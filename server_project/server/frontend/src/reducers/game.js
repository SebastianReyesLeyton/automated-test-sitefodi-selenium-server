import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        numQuestions: 0,
        curQuestion: {} 
    },
    reducers: {
        setNumQuestions: ( state, { payload } ) => {
            state.numQuestions = payload.data;
            return state;
        },
        setNewQuestion: (state, { payload } ) => {
            state.curQuestion = Object.assign({}, payload.data);
            return state;
        },
        resetGame: (state) => {
            state = { numQuestions: 0, curQuestion: {}};
            return state;
        }
    }
});

export const { setNumQuestions, setNewQuestion, resetGame } = gameSlice.actions;
export default gameSlice.reducer;