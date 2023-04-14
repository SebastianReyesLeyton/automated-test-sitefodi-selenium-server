import * as API from '../api/auth';
import { authenticated, loginError, closeSession  } from '../reducers/auth';
import { resetAlertState } from '../reducers/user';

export const login = (userData, navigate) => async (dispatch) => {

    try {
        const response = await API.loginRequest(userData);
        dispatch(authenticated(response.data));
        navigate("/home", { replace: true });
    } catch (err) {
        switch (err.message) {
            case "Request failed with status code 400":
                dispatch(loginError(err.response.data));
                break;
            default:
                console.log('Error', err);
                break;
        }
    }

}

export const logout = (navigate) => async (dispatch) => {

    try {
        let response = await API.logoutRequest();
        
        switch (response.data.message) {
            case "tiene refresh token":
                localStorage.setItem('token', response.data.accessToken);
                dispatch(logout(navigate));
                break;
            default:
                dispatch(resetAlertState());
                dispatch(closeSession());
                navigate("/", { replace: true })
                break;
        }

    } catch (err) {
        
        switch (err.message) {
            case 'Request failed with status code 401':
                if (err.response.data.error === 'token no valido' ) {
                    dispatch(resetAlertState());
                    dispatch(closeSession());
                    navigate("/", { replace: true })
                } else {
                    console.log(err);
                }
                break;
            default:
                console.log(err);
        }
    }
}