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
import { toggleTicketUpdateLogsModal } from '../../../actions/home/modals/ticketUpdateLogs/actions';
import ModalContent from './modalContent';

const TicketUpdateLogsModal = ({ toggleModal, toggleTicketUpdateLogsModal }) => {

    return (
        <Modal isOpen={toggleModal} toggle={() => toggleTicketUpdateLogsModal(false)} size="lg" centered={true} >
            <ModalHeader>Ticket Details</ModalHeader>
            <ModalBody>
                <ModalContent/>
            </ModalBody>
            <ModalFooter>
                <Button size="sm" color="secondary" onClick={() => toggleTicketUpdateLogsModal(false)}>Close</Button>
            </ModalFooter>
        </Modal>
    )

}

TicketUpdateLogsModal.propTypes = {
    toggleModal: Proptypes.bool.isRequired,
    toggleTicketUpdateLogsModal: Proptypes.func.isRequired
}

const mapStateToProps = state => ({
    toggleModal: state.ticketUpdateLogs.toggleModal
});

export default connect(mapStateToProps, { toggleTicketUpdateLogsModal })(TicketUpdateLogsModal);