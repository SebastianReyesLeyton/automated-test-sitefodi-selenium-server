import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {
        authenticated: (state, data) => {
            state = Object.assign({}, {user: data.payload.user, token: data.payload.token});
            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem('token', state.token);
            return state;
        },
        loginError: (state, data) => {
            state = Object.assign({}, data.payload);
            return state;
        },
        closeSession: (state) => {
            state = {}
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('avatar');
            return state;
        }
    }
});

export const { authenticated, loginError, closeSession } = authSlice.actions;
export default authSlice.reducer;