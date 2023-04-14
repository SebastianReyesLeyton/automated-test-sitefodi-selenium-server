import axios from "axios";
import { RESULTS_BASE_URL } from "./conf";

export const storeResponse = (data, { idTherapy, qType, idQuestion }) => axios.post(
    `${RESULTS_BASE_URL}/store/${idTherapy}/${qType}/${idQuestion}`,
    data,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
);

export const getResults = (idTherapy) => axios.get(
    `${RESULTS_BASE_URL}/${idTherapy}`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
)