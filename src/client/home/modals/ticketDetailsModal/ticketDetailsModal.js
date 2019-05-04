import React from 'react';
import {
    Modal,
    ModalBody,
    ModalFooter,
    Button,
    ModalHeader
} from 'reactstrap';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { toggleTicketDetailModal } from '../../../actions/home/modals/ticketDetailModal/actions';
import ModalContent from './modalContent';

const TicketDetailsModal = ({ modalToggle, toggleTicketDetailModal }) => {

    return (
        <Modal isOpen={modalToggle} toggle={() => toggleTicketDetailModal(false)} size="lg" centered={true} >
            <ModalHeader>Ticket Details</ModalHeader>
            <ModalBody>
                <ModalContent />
            </ModalBody>
            <ModalFooter>
                <Button size="sm" color="secondary" onClick={() => toggleTicketDetailModal(false)}>Close</Button>
            </ModalFooter>
        </Modal>
    )

}

TicketDetailsModal.propTypes = {
    modalToggle: Proptypes.bool.isRequired,
    toggleTicketDetailModal: Proptypes.func.isRequired
}

const mapStateToProps = state => ({
    modalToggle: state.ticketDetailsReducer.modal_visibility
});

export default connect(mapStateToProps, { toggleTicketDetailModal })(TicketDetailsModal);