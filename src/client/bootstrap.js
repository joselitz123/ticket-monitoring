import React, { Component } from 'react';
import { MemoryRouter, Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routes } from './routes';
import createMemoryHistory from 'history/createMemoryHistory';
import store from './store';
import Sidebar from './partials/sidebar';
import Topnavbar from './partials/topnavbar';
import Footer from './partials/footer';

const history = createMemoryHistory();

class App extends Component{

	render(){

		return(
			<Provider store={store} >
				<MemoryRouter>
					<Router history={history} >		
						<div className="wrapper ">
							<Sidebar />
							<div className="main-panel">
								<Topnavbar />

								{routes.map((route, index)=>{
									return <Route key={index} path={route.path} exact component={route.component} ></Route>	
								})}
								
								<Footer />

							</div>
						</div>
					</Router>
				</MemoryRouter>
			</Provider>
			)

	}	

}

export default App;