import React from 'react';
import { connect } from 'react-redux';
import { setSelectedNotifID, toggleDismissConfirmationPromp } from '../../actions/home/ticketNotif/actions';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { normalize, schema } from 'normalizr';

const ActionList = ({ action_list, setSelectedNotifID, toggleDismissConfirmationPromp}) => {

    const dismissPrompHandler = id => {

        setSelectedNotifID(id);

        toggleDismissConfirmationPromp(true);        

    }

    /**
     * Evaluates if a ticket has a notifications in it, if it has
     * zero notif, then remove the ticket
     */
    const zeroNotifEval = () => {


    }

    return (
        <TransitionGroup component={null}>
            {action_list.map(list => (
                <CSSTransition timeout={500} key={list.notif_id} classNames="item">
                    <tr >
                        <td>{list.notif}</td>
                        <td className="options" style={{ "display": "flex" }} >
                            <a href="#" data-toggle="tooltip" title="Dismiss" onClick={() => dismissPrompHandler(list.notif_id)} style={{ "margin": "0px 5px" }} >
                                <i className="material-icons">clear</i>
                            </a>
                            <a href="#" onClick={() => setSelectedNotifID(list.notif_id)} style={{ "margin": "0px 5px" }} >
                                <i className="material-icons">snooze</i>
                            </a>
                        </td>
                    </tr>
                </CSSTransition>
            ))}
        </TransitionGroup>
    )
}


ActionList.propTypes = {
    action_list: PropTypes.array.isRequired,
    setSelectedNotifID: PropTypes.func.isRequired,
    toggleDismissConfirmationPromp: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
        
    // notif_id: state.ticketNotifTableReducer.selectedNotifID,
};

export default connect(mapStateToProps, { setSelectedNotifID, toggleDismissConfirmationPromp })(ActionList);