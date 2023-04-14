import { closeSession } from '../reducers/auth';
import { errorAlertState } from '../reducers/user';
import { loginError } from '../reducers/auth';

const error = (err, navigate) => async (dispatch) => {
    switch (err.message) {
        case 'Request failed with status code 401':
            if (err.response.data.error === 'token no valido' ) {
                dispatch(closeSession());
                navigate("/", { replace: true });
            } else if ( err.response.data.error === 'inconsistencia en la petición' ) {
                dispatch(closeSession());
                dispatch(loginError(err.response.data));
                navigate("/", { replace: true });
            } else {
                console.log(err);
            }
            break;
        case 'Request failed with status code 400':
            dispatch(errorAlertState( { data: err.response.data })); 
            break;
        case 'Request failed with status code 402':
            dispatch(closeSession());
            dispatch(loginError(err.response.data));
            navigate("/", { replace: true });
            break;
        default:
            console.log(err);
    }
}

export default error;