import React, { Component } from 'react';
import './Auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/authActions';
import checkValidity from '../../shared/checkValidity';
import { withRouter, Redirect } from 'react-router-dom';
import ErrorBox from '../../components/UI/ErrorBox/ErrorBox';

class Register extends Component{
	state = {
		email:{
			value: '',
			valid: false,
			touched: false,
			validitionRules: {
				isEmail: true,
				required: true
			},
			errMessage: 'email is required'
		},
		password:{
			value: '',
			valid: false,
			touched:false,
			validitionRules: {
				minLength: 8,
				required: true
			},
			errMessage: 'password is required'
		}
	}

	inputChangedHandler = (event, id) => {
		let updatedObject = {
			...this.state[id],
			value: event.target.value,
			valid: checkValidity(event.target.value, this.state[id].validitionRules, id).isValid,
			errMessage: checkValidity(event.target.value, this.state[id].validitionRules, id).errMessage,
			touched:true
		};
		this.setState({[id]: updatedObject});
	}

	submitHandler = (event) => {
		event.preventDefault();
		if(!this.state.email.touched){
			let updatedObject = {
				...this.state['email'],
				touched: true
			};
			this.setState({email: updatedObject});
		}

		if(!this.state.password.touched){
			let updatedObject = {
				...this.state['password'],
				touched: true
			};
			this.setState({password: updatedObject});
		}

		if(this.state.email.valid && this.state.password.valid){
			this.props.onRegister(this.state.email.value, this.state.password.value);
		}
	}

	switchAuthClicked = () => {
		this.props.history.replace('/login');
	}

	render(){
		let authRedirect = null;
		if ( this.props.isAuthenticated ) {
            authRedirect = <Redirect to='/' />
        }

		let errorMessage = null;
        if(this.props.error !== null){
        	errorMessage = <ErrorBox>{this.props.error}</ErrorBox>;
        }

		return(
			<div className='container Register'>
				{errorMessage}
				<h4 className='RegisterHeader'>Create Your Account</h4>
				<form>
					<div className='form-group NameInput'>
						<input type='text' className='form-control' id='InputFirstName' placeholder='First Name' />
						<input type='text' className='form-control' id='InputLastName' placeholder='Last Name' />
					</div>
					<div className='form-group'>
					    <input 
					    	type="email" 
					    	className={this.state.email.valid || !this.state.email.touched ? 'form-control' : 'form-control FormInvalid'}
					    	id="InputEmail" 
					    	placeholder="Email" 
					    	onChange={event => this.inputChangedHandler(event, 'email')} 
					    	/>
					    <div className='InputError'>{this.state.email.touched ? this.state.email.errMessage : null}</div>
					</div>
					<div className='form-group'>
					    <input 
					    	type="password"
					    	className={this.state.password.valid || !this.state.password.touched ? 'form-control' : 'form-control FormInvalid'}
					    	id="InputPassword" 
					    	placeholder="Password (8 character minimum)" 
					    	onChange={event => this.inputChangedHandler(event, 'password')} 
					    	/>
					    	<div className='InputError'>{this.state.password.touched ? this.state.password.errMessage : null}</div>
					</div>
					<button type="submit" className="btn" onClick={this.submitHandler}>
						{this.props.loading ? 'Creating Account...' : 'Create Your Account'}
					</button>
				</form>
				<div className='AuthSwitch'>
					Have an account? 
					<div className='AuthAnchor' onClick={this.switchAuthClicked} >Sign in</div>
				</div>
				{authRedirect}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		loading: state.auth.loading,
		isAuthenticated: state.auth.token !== null,
		error: state.auth.error
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onRegister: (email, password) => dispatch(authActions.register(email, password))
	}
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )(Register) );