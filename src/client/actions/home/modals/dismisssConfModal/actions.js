import { SET_SELECTED_TICKET_ID, SET_SELECTED_NOTIF_ID, TOGGLE_DISMISS_CONFIRMATION_PROMP } from './actionTypes';



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

