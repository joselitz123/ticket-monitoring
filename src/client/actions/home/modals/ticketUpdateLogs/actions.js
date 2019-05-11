import axios from 'axios';
import { TOGGLE_TICKET_UPDATE_LOGS_MODAL, TOGGLE_FETCHING_DATA_ICON, SET_TICKET_UPDATE_LOGS_DATA } from './actionsTypes';

export const fetchTicketUpdateLogs = ticket => dispatch => {

    dispatch({
        type: TOGGLE_TICKET_UPDATE_LOGS_MODAL,
        payload: true
    });

    dispatch({
        type: TOGGLE_FETCHING_DATA_ICON,
        payload: true
    });

    axios.get(`http://localhost:3000/tickets/${ticket}/update_logs`)
        .then(data => {

            dispatch({
                type: SET_TICKET_UPDATE_LOGS_DATA,
                payload: data.data
            });

            dispatch({
                type: TOGGLE_FETCHING_DATA_ICON,
                payload: false
            });

        })
        .catch(err => {

            dispatch({
                type: SET_TICKET_UPDATE_LOGS_DATA,
                payload: []
            });

            dispatch({
                type: TOGGLE_FETCHING_DATA_ICON,
                payload: false
            });

            console.log(err);

        })

}

export const toggleTicketUpdateLogsModal = bool => dispatch => {

    dispatch({
        type: TOGGLE_TICKET_UPDATE_LOGS_MODAL,
        payload: bool
    })

}