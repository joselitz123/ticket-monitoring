import { TOGGLE_FETCHING_DATA_ICON, TOGGLE_TICKET_UPDATE_LOGS_MODAL, SET_TICKET_UPDATE_LOGS_DATA } from '../../../../actions/home/modals/ticketUpdateLogs/actionsTypes';

const initialState = {
    toggleModal: false,
    is_fetching: false,
    data: []
}

export default function ticketUpdateLogs(state = initialState, action) {

    switch (action.type) {
        case TOGGLE_FETCHING_DATA_ICON:

            return {...state, is_fetching: action.payload}

        case TOGGLE_TICKET_UPDATE_LOGS_MODAL:

            return {...state, toggleModal: action.payload}

        case SET_TICKET_UPDATE_LOGS_DATA:

            return {...state, data: action.payload}

        default:

            return state;

    }

}