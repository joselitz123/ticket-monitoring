import React, { Component } from 'react';
import { FirstName, LastName, EmailAd, Username, Pword, CPword, PGShortname, SNowId } from './fields';
import axios from 'axios';
const { ipcRenderer } = window.require('electron');



class RegisterPage extends Component{

    constructor(props) {
        super(props);

        this.state = {
            fields: { //field states
                firstname: {
                    input: '',
                    error: '',
                },
                lastname: {
                    input: '',
                    error: '',
                },
                email: {
                    input: '',
                    error: '',
                },
                pg_shortname: {
                    input: '',
                    error: '',
                },
                snow_id: {
                    input: '',
                    error: '',
                },
                username: {
                    input: '',
                    error: '',
                },
                password: {
                    input: '',
                    error: '',
                },
                confirm_password: {
                    input: '',
                    error: '',
                }
            },
            validations: { //declare the validations to perform for each field
                firstname:{
                    isEmpty: `First name can't be empty`
                },
                lastname:{
                    isEmpty: `Last name can't be empty`
                },
                email: {
                    isEmpty: `Email can't be empty`,
                    invalidEmail: 'Invalid email',
                    alreadyExisted: ['Email already existed']
                },
                pg_shortname: {
                    isEmpty: `P&G shortname is required`,
                    invalidPGShortname: 'P&G shortname is invalid'
                },
                snow_id: {
                    isEmpty: `Snow ID can't be empty`,
                },
                username: {
                    isEmpty: `Username can't be empty`,
                    noSpace: 'Username must not contain white space',
                    notLessThan: [6,'Username must contain more than 6 characters'],
                    alreadyExisted: 'Username already existed',
                },
                password: {
                    isEmpty: `Password can't be empty`,
                    noSpace: 'Username must not contain white space',
                    notLessThan: [6, 'Username must contain more than 6 characters'],
                },
                confirm_password: {
                    isEmpty: 'Please confirm your password',
                    doNotMatch: ['password',`Values entered doesn't match with password`]
                }    
            },
            ongoingEval: 0 //numbers of ongoing evaluation of validation from database for existing values
        }

        this.triggerSubmit = this.triggerSubmit.bind(this);

        this.inputHandler = this.inputHandler.bind(this);

        this.validationHandler = this.validationHandler.bind(this);

        this.errorHandler = this.errorHandler.bind(this);

        this.validateAllFields = this.validateAllFields.bind(this);

        this.fieldValueExistHandler = this.fieldValueExistHandler.bind(this);

        this.evaluationCountHander = this.evaluationCountHander.bind(this);

        this.checkFieldErrorHandler = this.checkFieldErrorHandler.bind(this);

        this.triggerSubmit = this.triggerSubmit.bind(this);
    }

    inputHandler(field, input) {

        this.setState((prevState, props) => {
            
            return {fields: {...prevState.fields, [field]: {...prevState.fields[field], input: input}}}
        });

    }


    //loops into the validations declared on the form field validations state
    async validationHandler(fieldName) {

        const validations = this.state.validations[fieldName];
        const field = this.state.fields[fieldName];

        this.errorHandler(fieldName, ''); //remove first any errors in the field

        for (const key in validations) {
            
            let continueLoop = false;
            switch (key) { //existing validations for the form fields
                case 'isEmpty':
                    this.emptyInputValidationHandler(field) ? this.errorHandler(fieldName, validations[key]) : continueLoop = true;
                    break;
                case 'noSpace':
                    this.whiteSpaceValidationHandler(field) ? this.errorHandler(fieldName, validations[key]) : continueLoop = true;
                    break;
                case 'notLessThan':
                    this.minimumInputLengthHandler(field, validations[key][0]) ? this.errorHandler(fieldName, validations[key][1]) : continueLoop = true;
                    break;
                case 'doNotMatch':
                    this.fieldMatchHandler(field, this.state.fields[validations[key][0]]) ? this.errorHandler(fieldName, validations[key][1]) : continueLoop = true;
                    break;
                case 'invalidEmail':
                    this.invalidEmailHandler(field) ? this.errorHandler(fieldName, validations[key]) : continueLoop = true;
                    break;
                case 'alreadyExisted':
                    await this.fieldValueExistHandler(field, fieldName) ? this.errorHandler(fieldName, validations[key]) : continueLoop = true;
                    break;
                case 'invalidPGShortname':
                    this.validatePGShortnameHandler(field) ? this.errorHandler(fieldName, validations[key]) : continueLoop = true;
                    break;
                default:
                    break;
            }

            if (continueLoop == true) {
                continue;
            }else{
                break;
            }  
        }                

    }

    /**
     * 
     * @param {String} fieldname 
     * @param {String} error 
     */
    errorHandler(fieldname, error) {
        this.setState(prevState => {
            return {fields: {...prevState.fields, [fieldname]: {...prevState.fields[fieldname], error: error}}}
        });

    }   

    /**
     * 
     * @param {Object} fieldObject 
     */
    emptyInputValidationHandler(fieldObject) {
        
        return fieldObject.input.length == 0 ? true : false;

    }

    whiteSpaceValidationHandler(fieldObject) {
        
        return /\s/.test(fieldObject.input) ? true : false;
        
    }

    minimumInputLengthHandler(fieldObject, minInputLength) {
        
        return (fieldObject.input.length < minInputLength) == true ? true : false;

    }

    fieldMatchHandler(fieldObject, fieldToMatch) {
       
        return fieldObject.input != fieldToMatch.input ? true : false; 

    }

    evaluationCountHander(isIncrease){ //sets state for the ongoing evalution checks from the backend
    
        this.setState(prevState => {
            
            return {ongoingEval: isIncrease ? prevState.ongoingEval+1 : prevState.ongoingEval-1}
        })
    }

    /**
     * 
     * @param {Object} fieldObject 
     * @param {String} fieldName 
     */
    fieldValueExistHandler(fieldObject, fieldName) {
        this.evaluationCountHander(true);
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/auth/register/usernameisexist', {
                fieldvalue: fieldObject.input,
                fieldname: fieldName
            })
            .then((data) => {
                this.evaluationCountHander(false);
                resolve(data.data)
            })
            .catch((err) => {
                this.evaluationCountHander(false);
                reject(err);
            })
        })
    }


    invalidEmailHandler(fieldObject) {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(fieldObject.input) ? false : true;        
        
    }

    validatePGShortnameHandler(fieldObject){

        return /((?:[a-z][a-z0-9_]*)\.(?:[a-z0-9_]*))\S/gy.test(fieldObject.input) ? false : true;

    }

    /**
     * 
     * @param {object} e 
     */
    triggerSubmit(e) {
        
        e.preventDefault();
        this.validateAllFields()
        .then(()=>{
        
            if (this.checkFieldErrorHandler()) {

                const fields = this.state.fields;

                let data = {};

                for (const field in fields) {
                    
                    data[field] = fields[field].input;

                }
                
                const payload = JSON.stringify({...data});
                
                
                axios.post('http://localhost:3000/auth/register',{payload: payload})
                .then((data)=>{
                    if (data.data.auth == true) {
                        ipcRenderer.send('isAuthenticated', [data.data.token]);
                        ipcRenderer.send('close-register');
                    }
                    
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
            
        });
        
    }

    /**
     * returns boolean type
     * returs true if no error is fould in all fields
     */
    checkFieldErrorHandler(){

        const fields = this.state.fields;
        let errorCount = 0;
        for (const field in fields) {

            if (fields[field].error.length != 0) {
                errorCount++;
            }

        }

        if (errorCount > 0) {
            return false;
        }else{
            return true;
        }

    }

    cancelRegister(){
        console.log('cancelled');
        ipcRenderer.send('close-register');
    }

    async validateAllFields() {
                
                const fields = this.state.fields;        

                let arrayValidations = [];
                
                for (const fieldName in fields) {

                    arrayValidations.push(this.validationHandler(fieldName));

                }

                return await Promise.all(arrayValidations);
    }

    render() {
        const fields = this.state.fields;
        return (

            <div className="account-container register">
	
                <div className="content clearfix">
                    
                    <form action="#" method="post" onSubmit={this.triggerSubmit} >
                    
                        <h1>Signup for Free Account</h1>			
                        
                        <div className="login-fields">
                            
                            <p>Create your free account:</p>
                            
                            <FirstName {...fields.firstname} onChange={e=>this.inputHandler(e.target.name, e.target.value)} validate={e=>this.validationHandler(e.target.name)} />
                            
                            <LastName {...fields.lastname} onChange={e=>this.inputHandler(e.target.name, e.target.value)} validate={e=>this.validationHandler(e.target.name)} />
                            
                            <EmailAd {...fields.email} onChange={e=>this.inputHandler(e.target.name, e.target.value)} validate={e=>this.validationHandler(e.target.name)} />

                            <PGShortname {...fields.pg_shortname} onChange={e=>this.inputHandler(e.target.name, e.target.value)} validate={e=>this.validationHandler(e.target.name)} />

                            <SNowId {...fields.snow_id} onChange={e=>this.inputHandler(e.target.name, e.target.value)} validate={e=>this.validationHandler(e.target.name)} />

                            <Username {...fields.username} onChange={e=>this.inputHandler(e.target.name, e.target.value)} validate={e=>this.validationHandler(e.target.name)} />
                            
                            <Pword {...fields.password} onChange={e=>this.inputHandler(e.target.name, e.target.value)} validate={e=>this.validationHandler(e.target.name)} />

                            <CPword {...fields.confirm_password} onChange={e=>this.inputHandler(e.target.name, e.target.value)} validate={e=>this.validationHandler(e.target.name)} />
                            
                        </div>
                        
                        <div className="login-actions">
                            
                            {/* <span className="login-checkbox">
                                <input id="Field" name="Field" type="checkbox" className="field login-checkbox" value="First Choice" tabIndex="4" />
                                <label className="choice" htmlFor="Field">Agree with the Terms & Conditions.</label>
                            </span> */}
                            
                            <button  style={{float: 'right'}} type="submit" className="button btn btn-primary ">Register</button>
                            <button onClick={this.cancelRegister} style={{float: 'right', marginRight: 5}} type="button" className="button btn " >Cancel</button>
                            
                        </div>
                        
                    </form>
                    
                </div>
                
            </div> 
        
        )

    }

}

export default RegisterPage;