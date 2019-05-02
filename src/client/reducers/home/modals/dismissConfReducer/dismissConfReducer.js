import { SET_SELECTED_TICKET_ID, SET_SELECTED_NOTIF_ID, TOGGLE_DISMISS_CONFIRMATION_PROMP } from '../../../../actions/home/modals/dismisssConfModal/actionTypes';

const initialState = {

    selectedTicketID: '',
    selectedNotifID: '',
    toggleDismissPromp: false
}

export default function dismissConfReducer(state = initialState, action) {

    switch (action.type) {

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

