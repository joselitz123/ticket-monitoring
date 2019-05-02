import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ActionList from './actionList';
import { showOptions } from '../../actions/home/optExtension/ticketNotif/actions';
import { setSelectedTicketID } from '../../actions/home/modals/dismisssConfModal/actions';
import { makeTicketNotifications } from '../../reducers/home/tables/ticketNotifTable/ticketNotifTable';
import { useTransition, animated, config } from 'react-spring';

const NotifList = ({ showOptions, setSelectedTicketID, tickets }) => {

    const transitions = useTransition(tickets, ticket => ticket._id, {
        config: config.default,
        initial: {
            opacity: 0,
            transform: 'translate3d(100%, 0, 0)'
        },
        enter: {
            opacity: 1,
            transform: 'translate3d(0%, 0, 0)',
        },
        leave: {
            opacity: 0,
            transform: 'translate3d(100%, 0, 0)'
        },
        trail: 250
    })

    if (tickets.length == 0) {

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


    return transitions.map(({ item, keys, props }) => (
        <animated.div key={item._id} style={props} className={`card priority_${item.ticket_details.priority.charAt(0)}`}>
            <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                    <button className="btn btn-link" type="button" onContextMenu={e => optExtension(e, item._id)} data-toggle="collapse" data-target={`#${item._id}`} aria-expanded="false" aria-controls={item._id} onClick={() => setSelectedTicketID(item._id)} >
                        {`${item._id}: ${item.ticket_details.shrt_desc}`}
                    </button>
                </h2>
            </div>

            <div id={item._id} className="collapse" aria-labelledby="headingOne" data-parent="#ticketNotifAcc">
                <div className="card-body">
                    <div className="tab-content">
                        <div className="tab-pane active" id="profile">
                            <table className="table">
                                <tbody>
                                    <ActionList action_list={item.notifications} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </animated.div>
    ))


}


NotifList.propTypes = {
    showOptions: PropTypes.func.isRequired,
    setSelectedTicketID: PropTypes.func.isRequired,
    tickets: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({

    tickets: makeTicketNotifications(state),

})

export default connect(mapStateToProps, { showOptions, setSelectedTicketID })(NotifList);