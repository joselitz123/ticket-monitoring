import axios from 'axios';


export const fetchTicketUpdateLogs = ticket => dispatch => {

    axios.get(`http://localhost:3000/tickets/${ticket}/update_logs`)
    .then(data => {

        console.log(data);

    })
    .catch(err => {

        console.log(err);

    })

}