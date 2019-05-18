import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { toggleDismissConfirmationPromp, setSelectedNotifID } from '../../../actions/home/modals/dismisssConfModal/actions';
import { populateDataTickets } from '../../../actions/home/ticketNotif/actions';
import _ from 'lodash';
import axios from 'axios';


const DismissConfModal = ({ modalToggle, setSelectedNotifID, toggleDismissConfirmationPromp, ticketID, populateDataTickets, notifID, notifs }) => {

    const dismissHandler = () => {

        setSelectedNotifID("");
        toggleDismissConfirmationPromp(false);

    }

    const updateNotificationData = () => {

        axios.post(`http://localhost:3000/notifications/${notifID}/acknowledge`);

        let NotifInidexToRemove = 0;

        const cloned_notifs = _.cloneDeep(notifs); // Cloned the notifs to avoid mutating the original state in redux directly

        cloned_notifs[ticketID].notifications.find((notif, index) => {
            if (notif == notifID) {
                NotifInidexToRemove = index;
                return notif;
            }
        });

        cloned_notifs[ticketID].notifications.splice(NotifInidexToRemove, 1);

        

        setTimeout(()=>{
            populateDataTickets(cloned_notifs);
        },300);

        dismissHandler();

    }


    return (
        <Modal isOpen={modalToggle} toggle={dismissHandler} size="md" centered={true} >
            <ModalBody>
                Are you sure that you've already checked {ticketID}?
            </ModalBody>
            <ModalFooter>
                <Button size="sm" color="secondary" onClick={dismissHandler} >Cancel</Button>
                <Button size="sm" color="success" onClick={updateNotificationData} >Already Checked</Button>
            </ModalFooter>
        </Modal>
    )

}

DismissConfModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    toggleDismissConfirmationPromp: PropTypes.func.isRequired,
    setSelectedNotifID: PropTypes.func.isRequired,
    ticketID: PropTypes.string.isRequired,
    populateDataTickets: PropTypes.func.isRequired,
    notifID: PropTypes.string.isRequired,
    notifs: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    modalToggle: state.dismissConfReducer.toggleDismissPromp,
    ticketID: state.dismissConfReducer.selectedTicketID,
    notifID: state.dismissConfReducer.selectedNotifID,
    notifs: state.ticketNotifTableReducer.tickets,
});

export default connect(mapStateToProps, { toggleDismissConfirmationPromp, setSelectedNotifID, populateDataTickets })(DismissConfModal);