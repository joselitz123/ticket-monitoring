import { SHOW_OPTIONS, HIDE_OPTIONS } from './actionTypes';


/**
 * Shows up the option
 * @param {Object} coords
 */
export const showOptions = data => dispatch => {
    dispatch({
        type: SHOW_OPTIONS,
        payload: {
            show: true,
            x_coord: data.x_coord,
            y_coord: data.y_coord,
            ticket_no: data.ticket_no
        }
    })
}

export const hideOptions = () => dispatch => {
    dispatch({
        type: HIDE_OPTIONS,
        payload: {
            show: false,
            x_coord: 0,
            y_coord: 0,
            ticket_no: ''
        }
    })
}