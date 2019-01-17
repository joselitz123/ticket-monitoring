import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { HideModal } from '../../../actions/home/doughnutGraphActions/actions';

const PieGraphModal = ({toggleModal, HideModal}) => {

    // $('#exampleModal').modal('show');
    
    return <Modal isOpen={toggleModal} toggle={HideModal} >
                <ModalHeader toggle={HideModal} >Hello World</ModalHeader>
                <ModalBody>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</ModalBody>
                <ModalFooter>
                    <Button color="primary">Save</Button>
                    <Button color="secondary" onClick={HideModal} >Close</Button>
                </ModalFooter>
            </Modal>
}

PieGraphModal.propTypes = {
    toggleModal: PropTypes.bool.isRequired,
    HideModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    toggleModal: state.toggleModal.modal_visibility
});

export default connect(mapStateToProps, { HideModal })(PieGraphModal);