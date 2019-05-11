import React, { Fragment } from 'react';
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
import _ from 'lodash';
import moment from 'moment-business-days';

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

    if (data.length == 0) {
        return (
            <Container>
                <Row>
                    <div>Problem occured while fetching the data</div>
                </Row>
            </Container>
        )
    }

    const customStyle = {
        "display": 'flex',
        "alignItems": 'center',
        "justifyContent": "flex-end"
    }

    const content = data.map((dataUpdate, index) => {

        const { date_updated, update_content, comment_content, resource, _id } = dataUpdate;

        return (
            <Fragment key={_id}>
                <FormGroup>
                    <Row>
                        <Col xs="2" style={customStyle}><Label for="date_updated">Date of Update:</Label></Col>
                        <Col xs="10">{moment(date_updated).format('LLLL')}</Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs="2" style={customStyle}><Label for="date_updated">Resource:</Label></Col>
                        <Col xs="10">{resource}</Col>
                    </Row>
                </FormGroup>
                <FormGroup> 
                    <Row>
                        <Col xs="2" style={customStyle}><Label for="update_content">Update Content:</Label></Col>
                        <Col xs="10"><div dangerouslySetInnerHTML={{__html: _.unescape(update_content)}}></div></Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs="2" style={customStyle}><Label for="comment_content">Comment Content:</Label></Col>
                        <Col xs="10"><div dangerouslySetInnerHTML={{ __html: _.unescape(comment_content)}}></div></Col>
                    </Row>
                </FormGroup>
                {index != data.length - 1 ? <hr /> : ''} 
            </Fragment>
        )

    })

    return (
        <Container>
            {content}
        </Container>
    )

}

ModalContent.propTypes = {
    data: Proptypes.array.isRequired,
    is_fetching_data: Proptypes.bool.isRequired
}

const mapStateToProps = state => ({
    data: state.ticketUpdateLogs.data,
    is_fetching_data: state.ticketUpdateLogs.is_fetching
});

export default connect(mapStateToProps, {})(ModalContent);