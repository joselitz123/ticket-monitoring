import { SHOW_OPTIONS, HIDE_OPTIONS, SET_TICKET_NO } from './actionTypes';


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
            y_coord: data.y_coord
        }
    });

    dispatch({
        type: SET_TICKET_NO,
        payload: data.ticket_no
    });
}

export const hideOptions = () => dispatch => {
    dispatch({
        type: HIDE_OPTIONS,
        payload: {
            show: false,
            x_coord: 0,
            y_coord: 0
        }
    })
}

export const setTicketNo = ticket_no => dispatch => {

    dispatch({
        type: SET_TICKET_NO,
        payload: ticket_no
    })

}