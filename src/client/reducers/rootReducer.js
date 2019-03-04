import { combineReducers } from 'redux';
import setUserName from './sidebar/sidebarReducer';
import setPriorityTotal from './home/homeReducer';
import setAppTicketCount from './home/doughnutGraphReducer';
import toggleModalForPieGraph from './home/modals/pieGraphReducer/pieGrahpReducer';
import setPieGraphTableData from './home/tables/pieGraphTable/tableReducer';
import ticketNotifTableReducer from './home/tables/ticketNotifTable/ticketNotifTable';
import ticketNotifOptExtension from './home/opt_extension/ticketNotif/ticketNotifReducer';

export default combineReducers({
    setUserName: setUserName,
    setPiorityTotal: setPriorityTotal,
    setAppTicketCount: setAppTicketCount,
    toggleModalForPieGraph: toggleModalForPieGraph,
    setPieGraphTableData: setPieGraphTableData,
    ticketNotifTableReducer: ticketNotifTableReducer,
    ticketNotifOptExtension: ticketNotifOptExtension
});