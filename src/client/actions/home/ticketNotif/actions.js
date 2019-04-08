import { POPULATE_DATA, SET_SELECTED_TICKET_ID, SET_SELECTED_NOTIF_ID, TOGGLE_DISMISS_CONFIRMATION_PROMP, UPDATE_NOTIF_DATA } from './actionTypes';

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

export const setSelectedNotifID = notifID => dispatch => {
    dispatch({
        type: SET_SELECTED_NOTIF_ID,
        payload: notifID
    });
}

export const toggleDismissConfirmationPromp = boolVal => dispatch => {
    dispatch({
        type: TOGGLE_DISMISS_CONFIRMATION_PROMP,
        payload: boolVal
    });
}

