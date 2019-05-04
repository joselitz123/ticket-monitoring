import { SET_FETCHED_DATA, TOGGLE_TICKET_DETAIL_MODAL, TOGGLE_FETCHING_TICKET_DETAIL_ICON } from './actionTypes';
import axios from 'axios';

export const fetchDataAndToggleModal = ticket => dispatch => {

    dispatch({
        type: TOGGLE_TICKET_DETAIL_MODAL,
        payload: true
    })

    dispatch({
        type: TOGGLE_FETCHING_TICKET_DETAIL_ICON,
        payload: true
    });
    
    axios.get(`http://localhost:3000/tickets/${ticket}/details`)
    .then(data => {

        console.log(data.data);

        dispatch({
            type: SET_FETCHED_DATA,
            payload: data.data.data[0]
        })

        dispatch({
            type: TOGGLE_FETCHING_TICKET_DETAIL_ICON,
            payload: false
        });

    })
    .catch(err => {

        dispatch({
            type: TOGGLE_FETCHING_TICKET_DETAIL_ICON,
            payload: false
        });

        console.log(err);

    })

}

export const toggleTicketDetailModal = bool => dispatch => {

    dispatch({
        type: TOGGLE_TICKET_DETAIL_MODAL,
        payload: bool
    })

}