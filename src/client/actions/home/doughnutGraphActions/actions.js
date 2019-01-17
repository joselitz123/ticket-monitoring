import { SHOW_MODAL, HIDE_MODAL } from './actionTypes';

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