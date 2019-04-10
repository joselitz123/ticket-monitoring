import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ActionList from './actionList';
import { showOptions } from '../../actions/home/optExtension/ticketNotif/actions';
import { setSelectedTicketID } from '../../actions/home/ticketNotif/actions';

const NotifList = ({ data, showOptions, setSelectedTicketID }) => {

    if (data.length == 0) {

        return (
            <div className="empty_container"><div>No data can be displayed yet.</div></div>
        );

    }

    const optExtension = (e, ticket_no) => {
        showOptions({
            y_coord: e.clientY,
            x_coord: e.clientX,
            ticket_no: ticket_no
        });
    }

    return data.map(data =>
        (
            <div key={data._id} className={`card priority_${data.ticket_details.priority.charAt(0)}`}  >
                <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                        <button className="btn btn-link" type="button" onContextMenu={e => optExtension(e, data._id)} data-toggle="collapse" data-target={`#${data._id}`} aria-expanded="false" aria-controls={data._id} onClick={() => setSelectedTicketID(data._id)} >
                            {`${data._id}: ${data.ticket_details.shrt_desc}`}
                        </button>
                    </h2>
                </div>

                <div id={data._id} className="collapse" aria-labelledby="headingOne" data-parent="#ticketNotifAcc">
                    <div className="card-body">
                        <div className="tab-content">
                            <div className="tab-pane active" id="profile">
                                <table className="table">
                                    <tbody>
                                        <ActionList action_list={data.notifications} />
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
    data: PropTypes.array.isRequired,
    showOptions: PropTypes.func.isRequired,
    setSelectedTicketID: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    data: state.ticketNotifTableReducer.data
})



export default connect(mapStateToProps, { showOptions, setSelectedTicketID })(NotifList);