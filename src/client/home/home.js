import React from 'react';
import TicketPriorityBoard from './ticketPriorityBoard/ticketPriorityBoard';
import DoughnutGraph from './graphs/doughnutGraph';
import PieGraphModal from './modals/pieGraphModal/pieGraphModal';
import NotificationBoard from './notificationBoard/notificationBoard';
import DismissConfModal from './modals/dismissConfModal/dismissConfModal';
import TicketDetailsModal from './modals/ticketDetailsModal/ticketDetailsModal';
import TicketUpdateLogsModal from './modals/ticketUpdateLogsModal/ticketUpdateLogsModal';

const HomeLayout = () => {


	return (
		<div className="content">

			<div className="container-fluid" >
				<TicketPriorityBoard />

				<div className="row">
					<DoughnutGraph />
					<PieGraphModal />
					<DismissConfModal />
					<TicketDetailsModal />
					<TicketUpdateLogsModal />
					<NotificationBoard />

				</div>
			</div>
		</div>
	)
}



export default HomeLayout;