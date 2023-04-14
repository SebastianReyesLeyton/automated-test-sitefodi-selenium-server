import axios from "axios";
import { USER_BASE_URL } from "../conf";

const PATIENT_BASE_URL = USER_BASE_URL + '/patient';

export const register = (data) => axios.post(
    `${PATIENT_BASE_URL}/register`,
    data,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
);

export const get = (id) => axios.get(
    `${PATIENT_BASE_URL}/get/${id}`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
);

export const getAll = ({ rows, offset }) => axios.get(
    `${PATIENT_BASE_URL}/all/${rows}/${offset}`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
);

export const modifyState = (id, newState) => axios.get(
    `${PATIENT_BASE_URL}/modify-state/${id}/${newState}`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
);

export const edit = (data) => axios.post(
    `${PATIENT_BASE_URL}/edit`,
    data,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
);