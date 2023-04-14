import axios from "axios";
import { TEST_BASE_URL } from "./conf";

export const createTest = (data) => axios.post(
    `${TEST_BASE_URL}/create`,
    data,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
);

export const getInProgressTests = ({rows, offset}) => axios.get(
    `${TEST_BASE_URL}/all/in-progress/${rows}/${offset}`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
);

export const getAvailableTests = ({rows, offset}) => axios.get(
    `${TEST_BASE_URL}/all/available/${rows}/${offset}`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
)

export const getQuestionTypes = () => axios.get(
    `${TEST_BASE_URL}/question-types`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
);

export const publish = (id) => axios.get(
    `${TEST_BASE_URL}/publish/${id}`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
);

export const getTestById = (id) => axios.get(
    `${TEST_BASE_URL}/${id}`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
);

export const addQuestion = (idTest, idQuestion, data) => axios.post(
    `${TEST_BASE_URL}/${idTest}/add-question/${idQuestion}`,
    data,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
);

export const getQuestionsByTest = (idTest) => axios.get(
    `${TEST_BASE_URL}/${idTest}/questions`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
)

export const getNumberOfQuestion = (idTest) => axios.get(
    `${TEST_BASE_URL}/${idTest}/number-of-questions`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
)

export const getQuestion = (idTest, currentQuestion) => axios.get(
    `${TEST_BASE_URL}/${idTest}/question-number/${currentQuestion}`,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-user": JSON.parse(localStorage.getItem("user")).id,
            "x-access-token": localStorage.getItem("token")
        }
    }
)