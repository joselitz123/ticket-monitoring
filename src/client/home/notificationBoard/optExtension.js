import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hideOptions, setTicketNo } from '../../actions/home/optExtension/ticketNotif/actions';
import { fetchDataAndToggleModal } from '../../actions/home/modals/ticketDetailModal/actions';
const { shell } = window.require('electron');

class OptExtension extends Component {

    constructor(props) {
        super(props);

        this.addEvent = this.addEvent.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.openTicketInBrowser = this.openTicketInBrowser.bind(this);
        this.viewTicketDetailsHander = this.viewTicketDetailsHander.bind(this);
    }

    addEvent() {

        window.addEventListener('scroll', this.scrollHandler, true);
        window.addEventListener('click', this.scrollHandler, true);

    }

    removeEvent() {

        window.removeEventListener('scroll', this.scrollHandler, true);
        window.removeEventListener('click', this.scrollHandler, true);

    }

    scrollHandler() {

        this.props.hideOptions();

    }

    openTicketInBrowser() {

        const { ticket_no, setTicketNo } = this.props;

        if (ticket_no.indexOf('RITM') != -1) {

            shell.openExternal(`https://pgglobalenterprise.service-now.com/sc_req_item.do?sys_id=${ticket_no}`);

            setTicketNo('');

        } else {

            shell.openExternal(`https://pgglobalenterprise.service-now.com/incident.do?sys_id=${ticket_no}`);

            setTicketNo('');

        }

    }

    viewTicketDetailsHander() {

        const { setTicketNo, ticket_no, fetchDataAndToggleModal } = this.props;

        fetchDataAndToggleModal(ticket_no);

        setTicketNo('');

    }

    render() {

        const { show, x_coord, y_coord } = this.props;

        show ? this.addEvent() : this.removeEvent();



        return (
            <div className="opt_extension" style={{
                'visibility': show == true ? 'visible' : 'hidden',
                'left': x_coord,
                'top': y_coord
            }}>
                <ul>
                    <a href="#" onClick={this.viewTicketDetailsHander}><li>View ticket details</li></a>
                    <a href="#"><li>View updates</li></a>
                    <a href="#" onClick={this.openTicketInBrowser}><li>Open ticket in browser</li></a>
                </ul>
            </div>
        );

    }

}

const mapStateToProps = state => ({
    show: state.ticketNotifOptExtension.show,
    x_coord: state.ticketNotifOptExtension.x_coord,
    y_coord: state.ticketNotifOptExtension.y_coord,
    ticket: state.dismissConfReducer.selectedTicketID,
    ticket_no: state.ticketNotifOptExtension.ticket_no
});

OptExtension.propTypes = {
    show: PropTypes.bool.isRequired,
    x_coord: PropTypes.number.isRequired,
    y_coord: PropTypes.number.isRequired,
    hideOptions: PropTypes.func.isRequired,
    ticket: PropTypes.string.isRequired,
    ticket_no: PropTypes.string.isRequired,
    fetchDataAndToggleModal: PropTypes.func.isRequired,
    setTicketNo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { hideOptions, fetchDataAndToggleModal, setTicketNo })(OptExtension);