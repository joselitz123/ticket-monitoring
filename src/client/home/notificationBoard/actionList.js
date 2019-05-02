import React from 'react';
import { connect } from 'react-redux';
import { populateDataTickets } from '../../actions/home/ticketNotif/actions';
import { setSelectedNotifID, toggleDismissConfirmationPromp } from '../../actions/home/modals/dismisssConfModal/actions';
import PropTypes from 'prop-types';
import { useTransition, config, animated } from 'react-spring';



const ActionList = ({ action_list, setSelectedNotifID, toggleDismissConfirmationPromp }) => {

    const transitions = useTransition(action_list, list => list.notif_id, {
        config: config.default,
        initial: {
            opacity: 1,
            transform: 'translate3d(0%, 0, 0)',
        },
        leave: {
            opacity: 0,
            transform: 'translate3d(100%, 0, 0)',
        }
    })

    const dismissPrompHandler = id => {

        setSelectedNotifID(id);

        toggleDismissConfirmationPromp(true);

    }


    return (
        transitions.map(({item, key, props}) => (
            <animated.tr key={key} style={transitions.length != 1 ? props : {}}>
                <td>{item.notif}</td>
                <td className="options" style={{ "display": "flex" }} >
                    <a href="#" data-toggle="tooltip" title="Dismiss" onClick={() => dismissPrompHandler(item.notif_id)} style={{ "margin": "0px 5px" }} >
                        <i className="material-icons">clear</i>
                    </a>
                    <a href="#" onClick={() => setSelectedNotifID(item.notif_id)} style={{ "margin": "0px 5px" }} >
                        <i className="material-icons">snooze</i>
                    </a>
                </td>
            </animated.tr>
        ))

        // action_list.map(list => (
        //     <tr key={list.notif_id}>
        //         <td>{list.notif}</td>
        //         <td className="options" style={{ "display": "flex" }} >
        //             <a href="#" data-toggle="tooltip" title="Dismiss" onClick={() => dismissPrompHandler(list.notif_id)} style={{ "margin": "0px 5px" }} >
        //                 <i className="material-icons">clear</i>
        //             </a>
        //             <a href="#" onClick={() => setSelectedNotifID(list.notif_id)} style={{ "margin": "0px 5px" }} >
        //                 <i className="material-icons">snooze</i>
        //             </a>
        //         </td>
        //     </tr>
        // ))
    )
}


ActionList.propTypes = {
    action_list: PropTypes.array.isRequired,
    setSelectedNotifID: PropTypes.func.isRequired,
    toggleDismissConfirmationPromp: PropTypes.func.isRequired,
    populateDataTickets: PropTypes.func.isRequired
}

export default connect(null, { setSelectedNotifID, toggleDismissConfirmationPromp, populateDataTickets })(ActionList);