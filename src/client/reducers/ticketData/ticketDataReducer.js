import { LOAD_TICKET_DATA } from '../../actions/electronActions/actionTypes';


const initialState = {
    ticket_data: []
}

export default function setTicketData(state = initialState, action){
    switch (action.type) {
        case LOAD_TICKET_DATA:
            
            return {...state,ticket_data: action.payload}
    
        default:

            return state;

    }
}