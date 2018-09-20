import React, { Component } from 'react';
import axios from 'axios';
const { ipcRenderer }  = window.require('electron');


class UnameField extends Component{

	render(){

		return(

			<div className={this.props.error.length != 0 ? "control-group error" : "control-group"}>
				<label htmlFor="username">Username</label>
				<input type="text" id="username" name="username" value={this.props.value} onChange={(e)=>{this.props.input(e.target.value)}} placeholder="Username" className=" login username-field" />
				{this.props.error.length != 0 ? <span className="help-inline">{this.props.error}</span> : ''}
			</div>

			)

	}

}

class PwordField extends Component{

	render(){

		return(

			<div className={this.props.error.length != 0 ? "control-group error" : "control-group"}>
				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" value={this.props.value} onChange={(e)=>{this.props.input(e.target.value)}} placeholder="Password" className="login password-field"/>
				{this.props.error.length != 0 ? <span className="help-inline">{this.props.error}</span> : ''}
			</div>

			)

	}

}

class LoginPage extends Component{

	constructor(props){

		super(props);

		this.state = {
			fields: {
				username: {
					value: '',
					error: ''
				},
				password: {
					value: '',
					error: ''
				}
			},
			formError: '',
			isLoading: false
		}

		this.triggerSubmit = this.triggerSubmit.bind(this);

		this.emptyValidator = this.emptyValidator.bind(this);

		this.submitCredentials = this.submitCredentials.bind(this);
	}

	triggerSubmit(e){

		e.preventDefault();

		const fields = this.state.fields;

		const pwordIsEmpty = this.emptyValidator('password', fields.password.value, `Password can't be empty`);
		const unameIsEmpty = this.emptyValidator('username', fields.username.value, `Username can't be empty`);

		if (unameIsEmpty == false && pwordIsEmpty == false) {

			this.submitCredentials();

		}


	}

	submitCredentials(){

		const fields = this.state.fields;

		axios.post(`http://localhost:3000/auth/login`,{
			username: fields.username.value,
			password: fields.password.value
		})
		.then((data)=>{
			
			if (data.data.auth == true) {

				ipcRenderer.send('isAuthenticated', [data.data.token]);
				ipcRenderer.send('close-login');

			}else{

				

			}
		})
		.catch((error)=>{
			if (error.response == undefined) {

				this.setState({formError: 'An error occured while logging in'});				

			}else{

				this.setState({formError: error.response.data.msg});

			}
			
		})
		
	}

	/**
	 * validates the field
	 * @param {String} fieldname 
	 * @param {String} fieldValue 
	 * @param {String} errorNotif 
	 */
	emptyValidator(fieldname, fieldValue, errorNotif){

		const fields = this.state.fields;

		if (fieldValue.length == 0) {

			this.setState((prevstate, props)=>{
				return {fields: {...prevstate.fields, [fieldname]: {...prevstate.fields[fieldname], error: errorNotif}}};
			});

			return true;

		}else if (fieldValue.length != 0 && fields[fieldname].error.length != 0) {}{

			this.setState((prevstate, props)=>{
				return {fields: {...prevstate.fields, [fieldname]: {...prevstate.fields[fieldname], error: ''}}};
			});

			return false;

		}

	}

	/**
	 * sends signal to electron to close this login browserWindow
	 */
	closeLoginForm(){
		ipcRenderer.send('close-login');
	}


	render(){

		const fields = this.state.fields;

		return(
			<div id="lgn" className="account-container">
	
				<div className="content input_cont clearfix">
					
					<form onSubmit={(e)=>{this.triggerSubmit(e)}} action="#" method="post">
					
						<h1>Member Login</h1>		
						
						<div className="login-fields">
							
							{this.state.formError.length != 0 ? <p className="error-text">{this.state.formError}</p> : <p>Please provide your details</p>}
							
							<UnameField {...fields.username} input={(value)=>{this.setState({fields: {...fields, username: {...fields.username, value: value}}})}} />
							
							<PwordField {...fields.password} input={(value)=>{this.setState({fields: {...fields, password: {...fields.password, value: value}}})}} />
							
						</div>
						
						<div className="login-actions">
							
							{/* <span className="login-checkbox">
								<input id="Field" name="Field" type="checkbox" className="field login-checkbox" value="First Choice" tabIndex="4" />
								<label className="choice" htmlFor="Field">Keep me signed in</label>
							</span> */}
							
							<button type="submit" style={{float: "right", width: 20} } className="button btn btn-success">{/*Sign In*/}<i className="icon-spin icon-spinner"></i></button>
							<button onClick={this.closeLoginForm} style={{float: "right", marginRight: 5}} type="button" className="button btn" >Cancel</button>
						</div>
						
					</form>
					
				</div>
				
			</div>
			)

	}

}

export default LoginPage;