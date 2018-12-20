import { LOAD_APP_TOTAL_TICKET_COUNT, SET_ACTIVE_INDEX } from './actionTypes';
 
 /**
  *Loads the total ticket count for each application 
  * @param {*} data 
  */
 export const loadAppTicketCount = data => dispatch => {
    dispatch({
        type: LOAD_APP_TOTAL_TICKET_COUNT,
        payload: data
    });
}

 /**
  *Set the active index that is used for the doughnut graph
  * @param {*} data 
  */
 export const setActiveIndex = (data, index) => dispatch => {
    dispatch({
        type: SET_ACTIVE_INDEX,
        payload: index
    });
}