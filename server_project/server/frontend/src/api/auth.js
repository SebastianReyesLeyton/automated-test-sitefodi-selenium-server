import axios from 'axios';
import { AUTH_BASE_URL } from './conf';

export const loginRequest = (data) => axios.post(
    `${AUTH_BASE_URL}/login`, 
    data,
    {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }
);

export const logoutRequest = () => axios.get(
    `${AUTH_BASE_URL}/logout`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
);