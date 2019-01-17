import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { loadTicketData } from '../actions/electronActions/actions';
import TicketPriorityBoard from './ticketPriorityBoard/ticketPriorityBoard';
import DoughnutGraph from './graphs/doughnutGraph';
import PieGraphModal from './modals/pieGraphModal/pieGraphModal';

const HomeLayout = ()=>{
		

		return (
			<div className="content">

				<div className="container-fluid">
					<TicketPriorityBoard />

				<div className="row">
					<DoughnutGraph />
					<PieGraphModal />
					<div className="col-lg-6 col-md-12">
					<div className="card">
						<div className="card-header card-header-primary">
						<h4 className="card-title">For your Attention / Action</h4>
						<p className="card-category">Please check the following below for any action needed.</p>
						</div>
						<div className="card-body table-responsive">
						<table className="table table-hover">
							<thead className="text-warning">
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Salary</th>
									<th>Country</th>
								</tr>
							</thead>
							<tbody>
							<tr>
								<td>1</td>
								<td>Dakota Rice</td>
								<td>$36,738</td>
								<td>Niger</td>
							</tr>
							<tr>
								<td>2</td>
								<td>Minerva Hooper</td>
								<td>$23,789</td>
								<td>Curaçao</td>
							</tr>
							<tr>
								<td>3</td>
								<td>Sage Rodriguez</td>
								<td>$56,142</td>
								<td>Netherlands</td>
							</tr>
							<tr>
								<td>4</td>
								<td>Philip Chaney</td>
								<td>$38,735</td>
								<td>Korea, South</td>
							</tr>
							</tbody>
						</table>
						</div>
					</div>
					</div>
					<div className="col-lg-6 col-md-12">
					<div className="card">
						<div className="card-header card-header-tabs card-header-warning">
						<div className="nav-tabs-navigation">
							<div className="nav-tabs-wrapper">
							<span className="nav-tabs-title">Tasks:</span>
							<ul className="nav nav-tabs" data-tabs="tabs">
								<li className="nav-item">
								<a className="nav-link active" href="#profile" data-toggle="tab">
									<i className="material-icons">bug_report</i> Bugs
									<div className="ripple-container"></div>
								</a>
								</li>
								<li className="nav-item">
								<a className="nav-link" href="#messages" data-toggle="tab">
									<i className="material-icons">code</i> Website
									<div className="ripple-container"></div>
								</a>
								</li>
								<li className="nav-item">
								<a className="nav-link" href="#settings" data-toggle="tab">
									<i className="material-icons">cloud</i> Server
									<div className="ripple-container"></div>
								</a>
								</li>
							</ul>
							</div>
						</div>
						</div>
						<div className="card-body">
						<div className="tab-content">
							<div className="tab-pane active" id="profile">
							<table className="table">
								<tbody>
								<tr>
									<td>
									<div className="form-check">
										<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value="" defaultChecked />
										<span className="form-check-sign">
											<span className="check"></span>
										</span>
										</label>
									</div>
									</td>
									<td>Sign contract for "What are conference organizers afraid of?"</td>
									<td className="td-actions text-right">
									<button type="button" rel="tooltip" title="Edit Task" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">edit</i>
									</button>
									<button type="button" rel="tooltip" title="Remove" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">close</i>
									</button>
									</td>
								</tr>
								<tr>
									<td>
									<div className="form-check">
										<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value="" />
										<span className="form-check-sign">
											<span className="check"></span>
										</span>
										</label>
									</div>
									</td>
									<td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>
									<td className="td-actions text-right">
									<button type="button" rel="tooltip" title="Edit Task" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">edit</i>
									</button>
									<button type="button" rel="tooltip" title="Remove" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">close</i>
									</button>
									</td>
								</tr>
								<tr>
									<td>
									<div className="form-check">
										<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value="" />
										<span className="form-check-sign">
											<span className="check"></span>
										</span>
										</label>
									</div>
									</td>
									<td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
									</td>
									<td className="td-actions text-right">
									<button type="button" rel="tooltip" title="Edit Task" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">edit</i>
									</button>
									<button type="button" rel="tooltip" title="Remove" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">close</i>
									</button>
									</td>
								</tr>
								<tr>
									<td>
									<div className="form-check">
										<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value="" defaultChecked />
										<span className="form-check-sign">
											<span className="check"></span>
										</span>
										</label>
									</div>
									</td>
									<td>Create 4 Invisible User Experiences you Never Knew About</td>
									<td className="td-actions text-right">
									<button type="button" rel="tooltip" title="Edit Task" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">edit</i>
									</button>
									<button type="button" rel="tooltip" title="Remove" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">close</i>
									</button>
									</td>
								</tr>
								</tbody>
							</table>
							</div>
							<div className="tab-pane" id="messages">
							<table className="table">
								<tbody>
								<tr>
									<td>
									<div className="form-check">
										<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value="" defaultChecked />
										<span className="form-check-sign">
											<span className="check"></span>
										</span>
										</label>
									</div>
									</td>
									<td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
									</td>
									<td className="td-actions text-right">
									<button type="button" rel="tooltip" title="Edit Task" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">edit</i>
									</button>
									<button type="button" rel="tooltip" title="Remove" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">close</i>
									</button>
									</td>
								</tr>
								<tr>
									<td>
									<div className="form-check">
										<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value="" />
										<span className="form-check-sign">
											<span className="check"></span>
										</span>
										</label>
									</div>
									</td>
									<td>Sign contract for "What are conference organizers afraid of?"</td>
									<td className="td-actions text-right">
									<button type="button" rel="tooltip" title="Edit Task" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">edit</i>
									</button>
									<button type="button" rel="tooltip" title="Remove" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">close</i>
									</button>
									</td>
								</tr>
								</tbody>
							</table>
							</div>
							<div className="tab-pane" id="settings">
							<table className="table">
								<tbody>
								<tr>
									<td>
									<div className="form-check">
										<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value="" />
										<span className="form-check-sign">
											<span className="check"></span>
										</span>
										</label>
									</div>
									</td>
									<td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>
									<td className="td-actions text-right">
									<button type="button" rel="tooltip" title="Edit Task" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">edit</i>
									</button>
									<button type="button" rel="tooltip" title="Remove" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">close</i>
									</button>
									</td>
								</tr>
								<tr>
									<td>
									<div className="form-check">
										<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value="" defaultChecked />
										<span className="form-check-sign">
											<span className="check"></span>
										</span>
										</label>
									</div>
									</td>
									<td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
									</td>
									<td className="td-actions text-right">
									<button type="button" rel="tooltip" title="Edit Task" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">edit</i>
									</button>
									<button type="button" rel="tooltip" title="Remove" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">close</i>
									</button>
									</td>
								</tr>
								<tr>
									<td>
									<div className="form-check">
										<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value="" defaultChecked />
										<span className="form-check-sign">
											<span className="check"></span>
										</span>
										</label>
									</div>
									</td>
									<td>Sign contract for "What are conference organizers afraid of?"</td>
									<td className="td-actions text-right">
									<button type="button" rel="tooltip" title="Edit Task" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">edit</i>
									</button>
									<button type="button" rel="tooltip" title="Remove" className="btn btn-white btn-link btn-sm">
										<i className="material-icons">close</i>
									</button>
									</td>
								</tr>
								</tbody>
							</table>
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



export default HomeLayout;