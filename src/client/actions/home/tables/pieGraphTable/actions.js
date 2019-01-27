import { SET_FETCHED_TICKETS, SET_FETCH_FAILURE, SET_FETCH_STATUS } from './actionTypes';

/**
 * Sets the ticket data fetched from backend
 * @param {*} data Ticket data
 */
export const setFetchedTickets = data => dispatch => {

    return dispatch({
        type: SET_FETCHED_TICKETS,
        payload: data
    });

}

/**
 * Sets the status and error message when fetching of data has failed
 * @param {*} errMsg Error Message
 */
export const setFetchFailed = errMsg => dispatch => {

    return dispatch({
        type: SET_FETCH_FAILURE,
        payload: {
            is_failed_fetch: true,
            error_msg: errMsg
        }
    });

}

/**
 * Sets the status of the data fetching
 * @param {Boolean} status Status of Fetching
 */
export const setFetchingStatus = status => dispatch => {
    
    return dispatch({
        type: SET_FETCH_STATUS,
        payload: status
    });

}

