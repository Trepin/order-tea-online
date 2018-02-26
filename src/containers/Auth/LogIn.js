import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/authActions';
import { withRouter, Redirect } from 'react-router-dom';
import ErrorBox from '../../components/UI/ErrorBox/ErrorBox';

class LogIn extends Component{
	state = {
		email: null,
		password: null
	}

	inputChangedHandler = (event, id) => {
		this.setState({[id]: event.target.value});
	}

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onLogIn(this.state.email, this.state.password);
	}

	switchAuthClicked = () => {
		this.props.history.replace('/register');
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
			<div className='container auth'>
				{errorMessage}
				<h4 className='auth-header'>Sign In With Your Account</h4>
				<form>
					<div className='form-group'>
					    <input 
					    	type="email" 
					    	className='form-control'
					    	id="InputEmail" 
					    	placeholder="Email" 
					    	onChange = {event => this.inputChangedHandler(event, 'email')}
					    />
					</div>
					<div className='form-group'>
					    <input 
					    	type="password"
					    	className='form-control'
					    	id="InputPassword" 
					    	placeholder="Password" 
					    	onChange = {event => this.inputChangedHandler(event, 'password')}
					    />
					</div>
					<button type="submit" className="btn" onClick={this.submitHandler}>
						{this.props.loading ? 'Authenticating...' : 
							this.props.isAuthenticated ? 'Log In Success!' :'Sign In'}
					</button>
				</form>
				<div className='auth-switch'>
					Don't have an account? 
					<div className='auth-anchor' onClick={this.switchAuthClicked} >Create your account</div>
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
		onLogIn: (email, password) => dispatch(authActions.login(email, password))
	}
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )(LogIn) );