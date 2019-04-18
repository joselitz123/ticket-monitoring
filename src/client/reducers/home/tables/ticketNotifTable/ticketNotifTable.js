import { POPULATE_DATA, SET_SELECTED_TICKET_ID, SET_SELECTED_NOTIF_ID, TOGGLE_DISMISS_CONFIRMATION_PROMP, POPULATE_DATA_TICKETS } from '../../../../actions/home/ticketNotif/actionTypes';
import { tickets } from '../../../../actions/home/ticketNotif/schema';
import { normalize } from 'normalizr';
import { createSelector } from 'reselect';

const initialState = {
    notifications: {},
    ticket_details: {},
    tickets: {},
    selectedTicketID: '',
    selectedNotifID: '',
    toggleDismissPromp: false,
    notifDismissAnimation: false,
    ticketDismissAnimation: false
}

export default function ticketNotifTableReducer(state = initialState, action) {

    switch (action.type) {

        case POPULATE_DATA:

            return {
                ...state,
                notifications: { ...action.payload.entities.notifications },
                ticket_details: { ...action.payload.entities.ticket_details },
                tickets: { ...action.payload.entities.tickets }
            }

        case POPULATE_DATA_TICKETS:

            return {
                ...state,
                tickets: action.payload
            }

        case SET_SELECTED_TICKET_ID:

            return {
                ...state, selectedTicketID: action.payload
            }

        case SET_SELECTED_NOTIF_ID:

            return {
                ...state, selectedNotifID: action.payload
            }

        case TOGGLE_DISMISS_CONFIRMATION_PROMP:

            return {
                ...state, toggleDismissPromp: action.payload
            }

        default:

            return state;

    }

}

const convertObjTicketsToArr = state => Object.values(state.ticketNotifTableReducer.tickets);
const selectTicketDetails = state => state.ticketNotifTableReducer.ticket_details;
const selectTicketNotifications = state => state.ticketNotifTableReducer.notifications;

export const makeTicketNotifications = createSelector(
    [convertObjTicketsToArr, selectTicketDetails, selectTicketNotifications],
    (tickets, ticketDetails, notifications) => tickets.map(ticket => {

        const selectedNotifications = notif_ids => notif_ids.map(id => notifications[id]);

        return { ...ticket, ticket_details: ticketDetails[ticket.ticket_details], notifications: selectedNotifications(ticket.notifications) }


    })
)