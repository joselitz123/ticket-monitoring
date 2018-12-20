import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types'
import { loadPriorityDigits } from '../../actions/home/actions';
import io from 'socket.io-client'

const TicketPriorityBoard = ({ticketData, loadPriorityDigits})=>{
    
    const socket = io.connect('http://localhost:3000/priorities_dashboard');

    socket.on('ticket_count', (data)=>{

        function definedObjectIdentifier(ticket_count){

            return typeof ticket_count == 'undefined' ? 0 : ticket_count;
            
        }

        const ticket_data = data.reduce((aggregator, currentValue)=>{

            const priority_name = currentValue.priority_name;

            const ticket_count = currentValue.total_tickets;

            

            switch (priority_name){

                case '1 - Critical':

                    return {...aggregator, critical: definedObjectIdentifier(ticket_count)}

                case '2 - High':

                    return {...aggregator, high: definedObjectIdentifier(ticket_count)}

                case '3 - Moderate':

                    return {...aggregator, moderate: definedObjectIdentifier(ticket_count)}
                
                case '4 - Low':

                    return {...aggregator, low: definedObjectIdentifier(ticket_count)}
            }
    
        }, {});

        loadPriorityDigits(ticket_data);

    });
    

    return (
        <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
            <div className="card card-stats">
                <div className="card-header card-header-danger card-header-icon">
                <div className="card-icon">
                    <i className="material-icons">report_problem</i>
                </div>
                <p className="card-category">Critical Tickets</p>
                <h3 className="card-title">{ticketData.critical}</h3>
                </div>
                <div className="card-footer">
                <div className="stats">
                    <i className="material-icons text-warning">error_outline</i>
                    <a href="#pablo" className="warning-link">Get More Space...</a>
                </div>
                </div>
            </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
            <div className="card card-stats">
                <div className="card-header card-header-warning card-header-icon">
                <div className="card-icon">
                    <i className="material-icons">error_outline</i>
                </div>
                <p className="card-category">High Tickets</p>
                <h3 className="card-title">{ticketData.high}</h3>
                </div>
                <div className="card-footer">
                <div className="stats">
                    <i className="material-icons">date_range</i> Last 24 Hours
                </div>
                </div>
            </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
            <div className="card card-stats">
                <div className="card-header card-header-info card-header-icon">
                <div className="card-icon">
                    <i className="material-icons">network_check</i>
                </div>
                <p className="card-category">Moderate Tickets</p>
                <h3 className="card-title">{ticketData.moderate}</h3>
                </div>
                <div className="card-footer">
                <div className="stats">
                    <i className="material-icons">network_check</i> Tracked from Github
                </div>
                </div>
            </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
            <div className="card card-stats">
                <div className="card-header card-header-success card-header-icon">
                <div className="card-icon">
                <i className="material-icons">low_priority</i>
                </div>
                <p className="card-category">Low Tickets</p>
                <h3 className="card-title">{ticketData.low}</h3>
                </div>
                <div className="card-footer">
                <div className="stats">
                    <i className="material-icons">low_priority</i> Just Updated
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}


const mapStateToProps = state =>({
    ticketData: state.setPiorityTotal
});

TicketPriorityBoard.propTypes = {
    ticketData: PropTypes.object.isRequired
}

export default connect(mapStateToProps,{ loadPriorityDigits})(TicketPriorityBoard);