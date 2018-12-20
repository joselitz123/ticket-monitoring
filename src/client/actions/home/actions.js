import { LOAD_TICKET_PRIORITY_COUNT } from './actionTypes';

/**
 * Loads the total of priority for each
 * @param {*} data 
 */
export const loadPriorityDigits = data => dispatch => {
    dispatch({
        type: LOAD_TICKET_PRIORITY_COUNT,
        payload: data
    });
}


