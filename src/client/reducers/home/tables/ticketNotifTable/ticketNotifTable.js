import { POPULATE_DATA, POPULATE_DATA_TICKETS } from '../../../../actions/home/ticketNotif/actionTypes';
import { SET_SELECTED_TICKET_ID, SET_SELECTED_NOTIF_ID, TOGGLE_DISMISS_CONFIRMATION_PROMP } from '../../../../actions/home/modals/dismisssConfModal/actionTypes';
import { createSelector } from 'reselect';

const initialState = {
    notifications: {},
    ticket_details: {},
    tickets: {},
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

        default:

            return state;

    }

}

const convertObjTicketsToArrAndFilter = state => Object.values(state.ticketNotifTableReducer.tickets).filter(ticket => ticket.notifications.length > 0);
const selectTicketDetails = state => state.ticketNotifTableReducer.ticket_details;
const selectTicketNotifications = state => state.ticketNotifTableReducer.notifications;


export const makeTicketNotifications = createSelector(
    [convertObjTicketsToArrAndFilter, selectTicketDetails, selectTicketNotifications],
    (tickets, ticketDetails, notifications) => tickets.map(ticket => {

        const selectedNotifications = notif_ids => notif_ids.map(id => notifications[id]);

        return { ...ticket, ticket_details: ticketDetails[ticket.ticket_details], notifications: selectedNotifications(ticket.notifications) }


    })
)
