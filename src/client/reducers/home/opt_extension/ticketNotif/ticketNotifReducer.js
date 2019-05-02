import { SHOW_OPTIONS, HIDE_OPTIONS, SET_TICKET_NO } from '../../../../actions/home/optExtension/ticketNotif/actionTypes';

const initialState = {
    show: false,
    y_coord: 0,
    x_coord: 0,
    ticket_no: ''
}

export default function ticketNotifOptExtensionReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_OPTIONS:

        case HIDE_OPTIONS:

            return {
                ...state,
                show: action.payload.show,
                y_coord: action.payload.y_coord,
                x_coord: action.payload.x_coord
            }

        case SET_TICKET_NO:

            return {
                ...state,
                ticket_no: action.payload
            }

        default:

            return state;
    }
}