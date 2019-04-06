import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { toggleDismissConfirmationPromp, setSelectedNotifID } from '../../../actions/home/ticketNotif/actions';



const DismissConfModal = ({modalToggle, setSelectedNotifID, toggleDismissConfirmationPromp, ticketID}) => {

    const dismissHander = () => {

        setSelectedNotifID("");
        toggleDismissConfirmationPromp(false);

    }

    return (
        <Modal isOpen={modalToggle} toggle={dismissHander} size="md" centered={true} >
            <ModalBody>
                Are you sure that you've already checked {ticketID}?
            </ModalBody>
            <ModalFooter>
                <Button size="sm" color="secondary" onClick={dismissHander} >Cancel</Button>
                <Button size="sm" color="success" >Already Checked</Button>
            </ModalFooter>
        </Modal>  
    )

}


DismissConfModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    toggleDismissConfirmationPromp: PropTypes.func.isRequired,
    setSelectedNotifID: PropTypes.func.isRequired,
    ticketID: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    modalToggle: state.ticketNotifTableReducer.toggleDismissPromp,
    ticketID: state.ticketNotifTableReducer.selectedTicketID
});

export default connect(mapStateToProps, { toggleDismissConfirmationPromp, setSelectedNotifID })(DismissConfModal);