import { SHOW_MODAL, HIDE_MODAL, SET_APPLICATION} from './actionTypes';
import axios from 'axios';

export const ShowModal = () => dispatch => {
    return dispatch({
        type: SHOW_MODAL,
        payload: true
    })
}

export const HideModal = () => dispatch => {
    return dispatch({
        type: HIDE_MODAL,
        payload: false
    })
}

export const setAppName = application => dispatch => {
    return dispatch({
        type: SET_APPLICATION,
        payload: application
    })
}
