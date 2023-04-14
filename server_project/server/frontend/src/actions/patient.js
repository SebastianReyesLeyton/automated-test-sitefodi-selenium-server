import * as API from '../api/user/patient';
import * as API2 from '../api/user/therapist';
import { successAlertState } from '../reducers/user';
import { storeUsers } from '../reducers/users';
import error from './errors';

import { updateObtainedUserState } from '../reducers/getUser';

export const registerPatient = (userData, navigate) => async (dispatch) => {
    try {
        
        let response = await API.register(userData);
        
        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(registerPatient(userData, navigate));
                break;
            default:
                await API2.relatePatient(response.data.id);
                dispatch(successAlertState({ data: response.data }));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }
}

export const getPatient = (id, navigate) => async (dispatch) => {

    try {
        
        let response = await API.get(id);

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(getPatient(id, navigate));
                break;
            default:
                dispatch(updateObtainedUserState({ data: response.data.user } ));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }

}

export const getPatients = ({ rows, offset }, navigate) => async (dispatch) => {

    try {
        
        let response = await API.getAll({ rows, offset });
        
        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(getPatients({ rows, offset }, navigate));
                break;
            default:
                dispatch(storeUsers(response.data));
                break;
        }
        
    } catch (err) {
        dispatch(error(err, navigate));
    }
}

export const modifyPatientState = ({ id, newState }, navigate) => async (dispatch) => {
    
    try {
        
        let response = await API.modifyState(id, newState);

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(modifyPatientState({ id, newState }, navigate));
                break;
            default:
                dispatch(successAlertState({ data: response.data }));
                break;
        }
        
    } catch (err) {
        dispatch(error(err, navigate));
    }
}

export const editPatient = (data, navigate) => async (dispatch) => {
    
    try {
        
        let response = await API.edit(data);

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(editPatient(data, navigate));
                break;
            default:
                dispatch(successAlertState({ data: response.data }));
                break;
        }
        
    } catch (err) {
        dispatch(error(err, navigate));
    }

}