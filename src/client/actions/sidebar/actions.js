import { POPULATE_LOGGEDIN_USER } from './actionTypes';

export const alterCurrentUsername = (user) => (dispatch) => {
        dispatch({
            type: POPULATE_LOGGEDIN_USER,
            payload: user
        });
}