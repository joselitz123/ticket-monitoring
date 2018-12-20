import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './client/bootstrap';
import LoginPage from './client/auth/login/login';
import RegisterPage from './client/auth/register/register';


if (document.getElementById('register_page')) {
	ReactDOM.render(<RegisterPage />, document.getElementById('register_page'));
}

if (document.getElementById('login_page')) {
	ReactDOM.render(<LoginPage />, document.getElementById('login_page'));
}

if (document.getElementById('react_target')) {
	ReactDOM.render(<App />, document.getElementById('react_target'));	
}

registerServiceWorker();
