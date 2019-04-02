import { POPULATE_DATA, SET_SELECTED_TICKET_ID } from './actionTypes';

export const populateData = data => dispatch => {
    dispatch({
        type: POPULATE_DATA,
        payload: data
    });
}

export const setSelectedTicketID = ticketID => dispatch => {
    dispatch({
        type: SET_SELECTED_TICKET_ID,
        payload: ticketID
    });
}