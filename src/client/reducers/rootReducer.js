import { combineReducers } from 'redux';
import setUserName from './sidebar/sidebarReducer';
import setPriorityTotal from './home/homeReducer';
import setAppTicketCount from './home/doughnutGraphReducer';

export default combineReducers({
    setUserName: setUserName,
    setPiorityTotal: setPriorityTotal,
    setAppTicketCount: setAppTicketCount
});