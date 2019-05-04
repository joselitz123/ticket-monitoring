import React, { Component } from 'react';
import NotifList from './notifList';
import OptExtension from './optExtension';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { populateData } from '../../actions/home/ticketNotif/actions';

class NotificationBoard extends Component{

    componentDidMount() {

        const socket = io.connect('http://localhost:3000/action_notification');

        socket.on('action_notification', data => {

            this.props.populateData(data);

        });

    }

    render() {

        return (
            <div className="col-lg-6 col-md-12">
                <div className="card">
                    <div className="card-header card-header-primary">
                    <h4 className="card-title">For your Attention / Action</h4>
                    </div>
                    <div className="card-body table-responsive">
                        <div className="accordion" id="ticketNotifAcc" style={{"overflowX": "hidden"}}>
                            <NotifList  />
                            <OptExtension />
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

NotificationBoard.propTypes = {
    populateData: PropTypes.func.isRequired
}

export default connect(null, { populateData })(NotificationBoard);