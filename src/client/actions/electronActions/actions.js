import { LOAD_TICKET_DATA } from './actionTypes';

export const loadTicketData = (data)=>(dispatch)=>{
    dispatch({
        type: LOAD_TICKET_DATA,
        payload: data
    });
}
