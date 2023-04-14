import * as API from '../api/user/therapist';

import { successAlertState } from '../reducers/user';
import { storeUsers } from '../reducers/users';
import { updateObtainedUserState } from '../reducers/getUser';

import error from './errors';

export const registerTherapist = (userData, navigate) => async (dispatch) => {

    try {

        let response = await API.register(userData);

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(registerTherapist(userData, navigate));
                break;
            default:
                dispatch(successAlertState({ data: response.data }));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }

}

export const getTherapist = (id, navigate) => async (dispatch) => {

    try {
        
        let response = await API.get(id);

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(getTherapist(id, navigate));
                break;
            default:
                dispatch(updateObtainedUserState({ data: response.data.user } ));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }

}

export const getTherapists = ({ rows, offset }, navigate) => async (dispatch) => {
    try {
        
        let response = await API.getAll({ rows, offset });
        
        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(getTherapists({ rows, offset }, navigate));
                break;
            default:
                dispatch(storeUsers(response.data));
                break;
        }
        
    } catch (err) {
        dispatch(error(err, navigate));
    }

}

export const modifyTherapistState = ({ id, newState }, navigate) => async (dispatch) => {
    
    try {
        
        let response = await API.modifyState(id, newState);
        
        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(modifyTherapistState({ id, newState }, navigate));
                break;
            default:
                dispatch(successAlertState({ data: response.data }));
                break;
        }
        
    } catch (err) {
        dispatch(error(err, navigate));
    }

}

export const editTherapist = (data, navigate) => async (dispatch) => {
    
    try {
        
        let response = await API.edit(data);

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(editTherapist(data, navigate));
                break;
            default:
                dispatch(successAlertState({ data: response.data }));
                break;
        }
        
    } catch (err) {
        dispatch(error(err, navigate));
    }

}