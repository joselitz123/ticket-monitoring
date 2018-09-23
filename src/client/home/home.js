import React, { Component } from 'react';
import axios from 'axios';


class HomeLayout extends Component{

	

	render(){

		return(

			<div className="main">
				<div className="main-inner">
					<div className="container">
						<div className="row">
							<div className="span12">
								<div className="info-box">
									<div className="row-fluid stats-box">
										<div className="span3">
											<div className="stats-box-title">Critical Ticket(s)</div>
											<div className="stats-box-all-info">
												<i className="icon-warning-sign" style={{color: 'rgb(243, 26, 26)'}} ></i>
												0
											</div>
										</div>
										<div className="span3">
											<div className="stats-box-title">High Ticket(s)</div>
											<div className="stats-box-all-info">
												<i className="icon-arrow-up" style={{color: 'rgb(247, 200, 32)'}} ></i>
												0
											</div>
										</div>
										<div className="span3">
											<div className="stats-box-title">Moderate Ticket(s)</div>
											<div className="stats-box-all-info">
												<i className="icon-minus-sign" style={{color: '#3366cc'}} ></i>
												0
											</div>
										</div>
										<div className="span3">
											<div className="stats-box-title">Low Ticket(s)</div>
											<div className="stats-box-all-info">
												<i className="icon-arrow-down" style={{color: 'rgb(51, 204, 98)'}} ></i>
												0
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			)

	}

}

export default HomeLayout;