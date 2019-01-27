import { SET_FETCHED_TICKETS, SET_FETCH_FAILURE, SET_FETCH_STATUS } from '../../../../actions/home/tables/pieGraphTable/actionTypes';

const initialState = {
    app_tickets: [],
    is_fetch_failed: false,
    is_fetching: false,
    error_msg: ''
}

export default function setPieGraphTableData(state = initialState, action) {

    switch (action.type) {
        case SET_FETCH_FAILURE: 
            return {...state,  is_fetch_failed: action.payload.is_fetch_failed, error_msg: action.payload.error_msg}

        case SET_FETCHED_TICKETS:
            return {...state, app_tickets: action.payload}

        case SET_FETCH_STATUS:
            return {...state, is_fetching: action.payload}
    
        default:
            return state;
    }

}


