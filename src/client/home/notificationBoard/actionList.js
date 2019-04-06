import React from 'react';
import { connect } from 'react-redux';
import { setSelectedNotifID, toggleDismissConfirmationPromp } from '../../actions/home/ticketNotif/actions';
import PropTypes from 'prop-types';

const ActionList = ({action_list, setSelectedNotifID, toggleDismissConfirmationPromp}) => {

    const dismissPrompHandler = id => {
        
        setSelectedNotifID(id);

        toggleDismissConfirmationPromp(true);

    }

    return action_list.map(list => (
        <tr key={list.notif_id} >     
            <td>{list.notif}</td>            
            <td className="options" style={{"display": "flex"}} >
                <a href="#" data-toggle="tooltip" title="Dismiss" onClick={()=>dismissPrompHandler(list.notif_id)} style={{"margin": "0px 5px"}} >
                    <i className="material-icons">clear</i>
                </a>
                <a  href="#" onClick={()=>setSelectedNotifID(list.notif_id)} style={{"margin": "0px 5px"}} >
                    <i className="material-icons">snooze</i>
                </a>
            </td>
        </tr>
    ))
}

ActionList.propTypes = {
    ActionList: PropTypes.array.isRequired,
    setSelectedNotifID: PropTypes.func.isRequired,
    toggleDismissConfirmationPromp: PropTypes.func.isRequired
}

ActionList.propTypes = {
    action_list: PropTypes.array.isRequired
}

export default connect(null, { setSelectedNotifID, toggleDismissConfirmationPromp })(ActionList);