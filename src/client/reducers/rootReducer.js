import { combineReducers } from 'redux';
import setUserName from './sidebar/sidebarReducer';
import setPriorityTotal from './home/homeReducer';
import setAppTicketCount from './home/doughnutGraphReducer';
import toggleModal from './home/modals/pieGraphReducer/pieGrahpReducer';


export default combineReducers({
    setUserName: setUserName,
    setPiorityTotal: setPriorityTotal,
    setAppTicketCount: setAppTicketCount,
    toggleModal: toggleModal
});