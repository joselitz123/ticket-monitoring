import React from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import LoadingData from '../../../partials/loaderComponents/loadingData';

const ModalContent = ({ data, is_fetching_data }) => {

    if (is_fetching_data) {

        return (
            <Container>
                <Row className="justify-content-center">
                    <LoadingData />
                </Row>
            </Container>
        )

    }

    if (Object.values(data).length == 0) {
        return (
            <Container>
                <Row>
                    <div>Problem occured while fetching the data</div>
                </Row>
            </Container>
        )
    }

    return (
        <Container>
            <Row>
                <Col lg="6" md="12">
                    <Form>
                        <FormGroup>
                            <Label>Ticket Number:</Label>
                            <Input name="tckt_nmbr" disabled={true} value={data.tckt_nmbr} />
                        </FormGroup>
                    </Form>
                </Col>
                <Col lg="6" md="12">
                    <Form>
                        <FormGroup>
                            <Label>Application:</Label>
                            <Input name="application" disabled={true} value={data.application} />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Form>
                        <FormGroup>
                            <Label>Short Description:</Label>
                            <Input name="shrt_desc" disabled={true} value={data.shrt_desc} />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col lg="6" md="12">
                    <Form>
                        <FormGroup>
                            <Label>Asssigned To:</Label>
                            <Input name="ass_to" disabled={true} value={data.ass_to} />
                        </FormGroup>
                    </Form>
                </Col>
                <Col lg="6" md="12">
                    <Form>
                        <FormGroup>
                            <Label>Assignment Group:</Label>
                            <Input name="ass_group" disabled={true} value={data.ass_group} />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col lg="6" md="12">
                    <Form>
                        <FormGroup>
                            <Label>Updated By:</Label>
                            <Input name="updated_by" disabled={true} value={data.updated_by} />
                        </FormGroup>
                    </Form>
                </Col>
                <Col lg="6" md="12">
                    <Form>
                        <FormGroup>
                            <Label>Updated On:</Label>
                            <Input name="updated" disabled={true} value={data.updated} />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col lg="6" md="12">
                    <Form>
                        <FormGroup>
                            <Label>Task Type:</Label>
                            <Input name="task_type" disabled={true} value={data.task_type} />
                        </FormGroup>
                    </Form>
                </Col>
                <Col lg="6" md="12">
                    <Form>
                        <FormGroup>
                            <Label>Priority:</Label>
                            <Input name="priority" disabled={true} value={data.priority} />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

}

ModalContent.propTypes = {
    data: Proptypes.object.isRequired,
    is_fetching_data: Proptypes.bool.isRequired
}

const mapStateToProps = state => ({
    data: state.ticketDetailsReducer.data,
    is_fetching_data: state.ticketDetailsReducer.is_fetching_data
});

export default connect(mapStateToProps, {})(ModalContent);