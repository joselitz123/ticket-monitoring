import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { loadTicketData } from '../actions/electronActions/actions';
import TicketPriorityBoard from './ticketPriorityBoard/ticketPriorityBoard';
import DoughnutGraph from './graphs/doughnutGraph';
import PieGraphModal from './modals/pieGraphModal/pieGraphModal';
import NotificationBoard from './notificationBoard/notificationBoard';

const HomeLayout = ()=>{
		

		return (
			<div className="content">

				<div className="container-fluid">
					<TicketPriorityBoard />

				<div className="row">
					<DoughnutGraph />
					<PieGraphModal />
					<NotificationBoard />

				</div>
				</div>
			</div>
		)
	}



export default HomeLayout;