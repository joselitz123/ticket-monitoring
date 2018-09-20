import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Topbar from './partials/topbar';
import Topnavbar from './partials/topnavbar';
import { Provider } from 'react-redux';


class App extends Component{

	render(){

		return(
			<Provider >
				<Router>
					<div>
						<Topnavbar />
					</div>
				</Router>
			</Provider>
			)

	}	

}

export default App;