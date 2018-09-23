import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Topnavbar extends Component{

	render(){

		return(

			<div className="subnavbar">
			  <div className="subnavbar-inner">
			    <div className="container">
			      <ul className="mainnav">
			        <li className="active"><Link to="/"><i className="icon-dashboard"></i><span>Dashboard</span> </Link> </li>
			        <li><a href="reports.html"><i className="icon-list-alt"></i><span>Reports</span> </a> </li>
			        <li><a href="guidely.html"><i className="icon-facetime-video"></i><span>App Tour</span> </a></li>
			        <li><a href="charts.html"><i className="icon-bar-chart"></i><span>Charts</span> </a> </li>
			        <li><a href="shortcodes.html"><i className="icon-code"></i><span>Shortcodes</span> </a> </li>
			        <li className="dropdown"><a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown"> <i className="icon-long-arrow-down"></i><span>Drops</span> <b className="caret"></b></a>
			          <ul className="dropdown-menu">
			            <li><a href="icons.html">Icons</a></li>
			            <li><a href="faq.html">FAQ</a></li>
			            <li><a href="pricing.html">Pricing Plans</a></li>
			            <li><a href="login.html">Login</a></li>
			            <li><a href="signup.html">Signup</a></li>
			            <li><a href="error.html">404</a></li>
			          </ul>
			        </li>
			      </ul>
			    </div>
			  </div>
			</div>

			)

	}

}

export default Topnavbar;