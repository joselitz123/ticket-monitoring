import { POPULATE_DATA } from './actionTypes';

export const populateData = data => dispatch => {
    dispatch({
        type: POPULATE_DATA,
        payload: data
    });
}