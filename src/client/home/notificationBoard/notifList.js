import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ActionList from './actionList';
import { showOptions } from '../../actions/home/optExtension/ticketNotif/actions';
import { setSelectedTicketID } from '../../actions/home/ticketNotif/actions';
import { makeTicketNotifications } from '../../reducers/home/tables/ticketNotifTable/ticketNotifTable';


const NotifList = ({ data, showOptions, setSelectedTicketID, tickets }) => {

    // if (data.length == 0) {

    //     return (
    //         <div className="empty_container"><div>No data can be displayed yet.</div></div>
    //     );

    // }

    const optExtension = (e, ticket_no) => {
        showOptions({
            y_coord: e.clientY,
            x_coord: e.clientX,
            ticket_no: ticket_no
        });
    }

    return tickets.map(ticket =>
        (
            <div key={ticket._id} className={`card priority_${ticket.ticket_details.priority.charAt(0)}`}  >
                <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                        <button className="btn btn-link" type="button" onContextMenu={e => optExtension(e, ticket._id)} data-toggle="collapse" data-target={`#${ticket._id}`} aria-expanded="false" aria-controls={ticket._id} onClick={() => setSelectedTicketID(ticket._id)} >
                            {`${ticket._id}: ${ticket.ticket_details.shrt_desc}`}
                        </button>
                    </h2>
                </div>

                <div id={ticket._id} className="collapse" aria-labelledby="headingOne" data-parent="#ticketNotifAcc">
                    <div className="card-body">
                        <div className="tab-content">
                            <div className="tab-pane active" id="profile">
                                <table className="table">
                                    <tbody>
                                        <ActionList action_list={ticket.notifications} />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
};

NotifList.propTypes = {
    showOptions: PropTypes.func.isRequired,
    setSelectedTicketID: PropTypes.func.isRequired
}

const mapStateToProps = state => ({

    tickets: makeTicketNotifications(state),

})



export default connect(mapStateToProps, { showOptions, setSelectedTicketID })(NotifList);