import { POPULATE_DATA, POPULATE_DATA_TICKETS } from './actionTypes';
import { tickets } from './schema';
import { normalize } from 'normalizr';


export const populateData = data => dispatch => {
    dispatch({
        type: POPULATE_DATA,
        payload: normalize(data, [tickets])
    });
}

export const populateDataTickets = data => dispatch => {
    dispatch({
        type: POPULATE_DATA_TICKETS,
        payload: data
    });
}