import { FETCH_DATA_AND_TOGGLE_MODAL } from './actionTypes';
import axios from 'axios';

export const fetchDataAndToggleModal = ticket => dispatch => {
    
    axios.get(`http://localhost:3000/tickets/${ticket}/details`)
    .then(data => {

        console.log(data);

    })
    .catch(err => {

        console.log(err);

    })

}