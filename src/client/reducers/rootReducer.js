import { combineReducers } from 'redux';
import setUserName from './sidebar/sidebarReducer';
import setPriorityTotal from './home/homeReducer';
import setAppTicketCount from './home/doughnutGraphReducer';
import toggleModalForPieGraph from './home/modals/pieGraphReducer/pieGrahpReducer';
import setPieGraphTableData from './home/tables/pieGraphTable/tableReducer';


export default combineReducers({
    setUserName: setUserName,
    setPiorityTotal: setPriorityTotal,
    setAppTicketCount: setAppTicketCount,
    toggleModalForPieGraph: toggleModalForPieGraph,
    setPieGraphTableData: setPieGraphTableData
});