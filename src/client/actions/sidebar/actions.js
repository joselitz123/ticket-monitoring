import { POPULATE_LOGGEDIN_USER } from './actionTypes';
import Axios from 'axios';

export const alterCurrentUsername = (user) => (dispatch) => {
        dispatch({
            type: POPULATE_LOGGEDIN_USER,
            payload: user
        });
}