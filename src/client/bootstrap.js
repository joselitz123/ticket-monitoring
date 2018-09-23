import React, { Component } from 'react';
import { MemoryRouter, Router, Route } from 'react-router-dom';
import Topbar from './partials/topbar';
import Topnavbar from './partials/topnavbar';
import { Provider } from 'react-redux';
import { routes } from './routes';
import createMemoryHistory from 'history/createMemoryHistory';
import store from './store';

const history = createMemoryHistory();

class App extends Component{

	render(){

		return(
			<Provider store={store} >
				<MemoryRouter>
					<Router history={history} >
						<div>
							<Topnavbar />
							
							{routes.map((route, index)=>{
								return <Route key={index} path={route.path} exact component={route.component} ></Route>	
							})}
									
							
						
						</div>
					</Router>
				</MemoryRouter>
			</Provider>
			)

	}	

}

export default App;