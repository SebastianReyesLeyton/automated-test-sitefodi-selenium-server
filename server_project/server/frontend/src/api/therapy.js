import axios from 'axios';
import { THERAPY_BASE_URL } from './conf';

export const schedule = (data) => axios.post(
    `${THERAPY_BASE_URL}/schedule`,
    data,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
)

export const getNotFinished = ({ rows, offset }) => axios.get(
    `${THERAPY_BASE_URL}/all/not-finished/${rows}/${offset}`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
)

export const getFinished = ({ rows, offset, idRelation }) => axios.get(
    (Boolean(idRelation)) ? `${THERAPY_BASE_URL}/all/finished/${rows}/${offset}/${idRelation}` : `${THERAPY_BASE_URL}/all/finished/${rows}/${offset}`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
)

export const updateQuestionLocation = ({idTherapy, currentQuestion}) => axios.get(
    `${THERAPY_BASE_URL}/${idTherapy}/update-current-question/${currentQuestion}`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
)

export const finishTherapySession = (idTherapy) => axios.get(
    `${THERAPY_BASE_URL}/${idTherapy}/finish`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
)