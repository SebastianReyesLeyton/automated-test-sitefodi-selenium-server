import * as API from "../api/results";
import { storeQuestions } from "../reducers/getQuestions";

import error from "./errors";

export const storeResponse = ( data, params, navigate ) => async (dispatch) => {
    
    try {
        
        console.log(data, params);

        let response = await API.storeResponse(data, params);

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(storeResponse(data, params, navigate));
                break;
            default:
                console.log('Bien');
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }
}


export const getResults = ( data, navigate ) => async (dispatch) => {
    
    try {
        
        console.log(data);

        let response = await API.getResults(data);

        console.log(response);

        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(getResults(data, navigate));
                break;
            default:
                dispatch(storeQuestions({ data: response.data.results} ));
                break;
        }

    } catch (err) {
        dispatch(error(err, navigate));
    }
}
