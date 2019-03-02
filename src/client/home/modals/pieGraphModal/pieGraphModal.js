import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { HideModal } from '../../../actions/home/doughnutGraphActions/actions';
import DataTable from './datatable';
import LoadingData from '../../../partials/loaderComponents/loadingData';



const PieGraphModal = ({toggleModal, HideModal, modalName, isFetching, data}) => {

    return (
        <Modal isOpen={toggleModal} toggle={HideModal} size="lg" centered={true} >
            <ModalHeader toggle={HideModal} >
                Active Tickets for {modalName}
            </ModalHeader>
            <ModalBody>
                {isFetching ? <LoadingData></LoadingData> : <DataTable />}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={HideModal} >Close</Button>
            </ModalFooter>
        </Modal>  
    )

}


PieGraphModal.propTypes = {
    toggleModal: PropTypes.bool.isRequired,
    HideModal: PropTypes.func.isRequired,
    modalName: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired    
}

const mapStateToProps = state => ({
    toggleModal: state.toggleModalForPieGraph.modal_visibility,
    modalName: state.toggleModalForPieGraph.modal_name,
    isFetching: state.setPieGraphTableData.is_fetching
});

export default connect(mapStateToProps, { HideModal })(PieGraphModal);