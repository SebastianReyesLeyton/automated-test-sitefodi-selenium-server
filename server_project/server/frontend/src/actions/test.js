import * as API from "../api/test";

import { successAlertState } from "../reducers/user";
import { storeItems } from "../reducers/items";
import { updateObtainedTestState } from "../reducers/getTest";
import { storeQuestions } from "../reducers/getQuestions";
import { setNumQuestions, setNewQuestion } from "../reducers/game";

import error from './errors';

export const createTest = (testData, navigate) => async (dispatch) => {

    try {

        let response = await API.createTest(testData);

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(createTest(testData, navigate));
                break;
            default:
                dispatch(successAlertState({ data: response.data }));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }

}

export const getInProgressTests = ({ rows, offset }, navigate) => async (dispatch) => {

    try {

        let response = await API.getInProgressTests({ rows, offset });

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(getInProgressTests({ rows, offset }, navigate));
                break;
            default:
                dispatch(storeItems({ data: response.data.tests}));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }
} 

export const getAvailableTests = ({ rows, offset }, navigate) => async (dispatch) => {

    try {

        let response = await API.getAvailableTests({ rows, offset });

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(getAvailableTests({ rows, offset }, navigate));
                break;
            default:
                dispatch(storeItems({ data: response.data.tests}));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }
} 

export const getQuestionTypes = (navigate) => async (dispatch) => {

    try {
        
        let response = await API.getQuestionTypes();

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(getQuestionTypes(navigate));
                break;
            default:
                dispatch(storeItems({ data: response.data.types }));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }

}

export const getTestById = (id, navigate) => async (dispatch) => {

    try {
        
        let response = await API.getTestById(id);

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(getTestById(id, navigate));
                break;
            default:
                dispatch(updateObtainedTestState({ data: response.data.test }));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }

}

export const publishTest = (id, navigate) => async (dispatch) => {

    try {
        
        let response = await API.publish(id);

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(publishTest(id, navigate));
                break;
            default:
                dispatch(successAlertState({ data: response.data }));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }

} 

export const addQuestion = (idTest, idQuestion, data, navigate) => async (dispatch) => {

    try {
        
        let response = await API.addQuestion(idTest, idQuestion, data);

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(addQuestion(idTest, idQuestion, data, navigate));
                break;
            default:
                dispatch(successAlertState({ data: response.data }));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }

}

export const getQuestionsByTest = (id, navigate) => async (dispatch) => {

    try {
        
        let response = await API.getQuestionsByTest(id);

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(getQuestionsByTest(id, navigate));
                break;
            default:
                dispatch(storeQuestions({ data: response.data.questions }));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }

}

export const getNumberOfQuestion = (id, navigate) => async (dispatch) => {

    try {
        
        let response = await API.getNumberOfQuestion(id);

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(getNumberOfQuestion(id, navigate));
                break;
            default:
                dispatch(setNumQuestions({ data: response.data.quantity }));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }

} 

export const getQuestion = (idTest, currentQuestion, navigate) => async (dispatch) => {

    try {
        
        let response = await API.getQuestion(idTest, currentQuestion);
        console.log('Question', response); 

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(getQuestion(idTest, currentQuestion, navigate));
                break;
            default:
                dispatch(setNewQuestion({ data: response.data.question }));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }

}