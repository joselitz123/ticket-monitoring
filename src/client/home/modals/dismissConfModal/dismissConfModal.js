import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { toggleDismissConfirmationPromp, setSelectedNotifID, populateData } from '../../../actions/home/ticketNotif/actions';



const DismissConfModal = ({modalToggle, setSelectedNotifID, toggleDismissConfirmationPromp, ticketID, populateData, notifData, notifID}) => {

    const dismissHandler = () => {

        setSelectedNotifID("");
        toggleDismissConfirmationPromp(false);

    }

    const updateNotificationData = () => {

        const ticketIndex = notifData.map(ticket => ticket._id).indexOf(ticketID);

        const notifIndex = notifData[ticketIndex].notifications.map(notif => notif.notif_id).indexOf(notifID);

        notifData[ticketIndex].notifications.splice(notifIndex, 1);

        populateData(notifData);

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
    notifData: PropTypes.array.isRequired,
    populateData: PropTypes.func.isRequired,
    notifID: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    modalToggle: state.ticketNotifTableReducer.toggleDismissPromp,
    ticketID: state.ticketNotifTableReducer.selectedTicketID,
    notifData: state.ticketNotifTableReducer.data,
    notifID: state.ticketNotifTableReducer.selectedNotifID
});

export default connect(mapStateToProps, { toggleDismissConfirmationPromp, setSelectedNotifID, populateData })(DismissConfModal);