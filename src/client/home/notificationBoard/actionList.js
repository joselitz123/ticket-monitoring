import React from 'react';
import { connect } from 'react-redux';
import { setSelectedNotifID, toggleDismissConfirmationPromp } from '../../actions/home/ticketNotif/actions';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ActionList = ({ action_list, setSelectedNotifID, toggleDismissConfirmationPromp, notif_id, dismiss_animation }) => {

    const dismissPrompHandler = id => {

        setSelectedNotifID(id);

        toggleDismissConfirmationPromp(true);

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
    dismiss_animation: PropTypes.bool.isRequired,
    setSelectedNotifID: PropTypes.func.isRequired,
    toggleDismissConfirmationPromp: PropTypes.func.isRequired,
    notif_id: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    dismiss_animation: state.ticketNotifTableReducer.notifDismissAnimation,
    notif_id: state.ticketNotifTableReducer.selectedNotifID
});

export default connect(mapStateToProps, { setSelectedNotifID, toggleDismissConfirmationPromp })(ActionList);