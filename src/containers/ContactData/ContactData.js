import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactData.css';
import checkValidity from '../../shared/checkValidity';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as orderActions from '../../store/actions/orderActions';
import ErrorBox from '../../components/UI/ErrorBox/ErrorBox';

class ContactData extends Component{
	state = {
		fullname:{
			value: '',
			valid: false,
			touched: false,
			validitionRules: {
				required: true
			},
			errMessage: 'fullname is required'
		},
		address:{
			value: '',
			valid: false,
			touched:false,
			validitionRules: {
				required: true
			},
			errMessage: 'address is required'
		},
		phonenumber:{
			value: '',
			valid: false,
			touched:false,
			validitionRules: {
				required: true,
				isNumeric: true
			},
			errMessage: 'phone number is required'
		},
		notification: false,
		loading: false,
		error: false,
		purchased: false
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

	checkboxClickedHandler = () => {
		this.setState(prevState => ({notification: !prevState.notification}))
	}

	submitHandler = (event) => {
		event.preventDefault();
		if(!this.state.fullname.touched){
			let updatedObject = {
				...this.state['fullname'],
				touched: true
			};
			this.setState({fullname: updatedObject});
		}

		if(!this.state.address.touched){
			let updatedObject = {
				...this.state['address'],
				touched: true
			};
			this.setState({address: updatedObject});
		}

		if(!this.state.phonenumber.touched){
			let updatedObject = {
				...this.state['phonenumber'],
				touched: true
			};
			this.setState({phonenumber: updatedObject});
		}

		if(this.state.fullname.valid && this.state.address.valid && this.state.phonenumber.valid){
			if(this.props.token !== null){
				this.setState({loading: true});
				this.props.onToggleModal(false);
				this.props.onSelectSugarLevel('full');
				this.props.onSelectIceLevel('full');
				this.props.onSelectItem(null, null);

				let orderData = {};

				let contactData = {
					fullname: this.state.fullname.value,
					address: this.state.address.value,
					phonenumber: this.state.phonenumber.value,
					notification: this.state.notification
				};

				let orderDetails = {
					date: new Date(),
					series: this.props.series,
					item:this.props.item,
					price:this.props.price,
					iceLevel: this.props.iceLevel,
					sugarLevel: this.props.sugarLevel
				}

				orderData = {
					orderDetails: orderDetails,
					contactData: contactData,
					userId: this.props.userId
				};


				axios.post( 'https://orderteaonline-a3641.firebaseio.com/orders.json?auth=' + this.props.token, orderData )
	            .then(response => {
	            	this.setState({purchased: true});
	            	this.props.history.push('/orders');
	            }
	            )
	            .catch(err => {	            	
	            	this.setState({error: true});
	            });				
			}else{
				this.props.history.push('/login');
			}
		}
	}

	render(){
		let postError = null;

		if(this.state.error){
			postError = 
				<ErrorBox>
					Something went wrong! Please try again later!
				</ErrorBox>
		}

		return(
			<div className='container contactdata'>
				{postError}
				<h4 className='contactdata-header'>Enter Your Contact Data</h4>
				<form>
					<div className='form-group'>
					    <input 
					    	type="text" 		
					    	id="fullname" 
					    	placeholder="Full Name" 
					    	onChange={event => this.inputChangedHandler(event, 'fullname')} 
					    	className={this.state.fullname.valid || !this.state.fullname.touched ? 'form-control' : 'form-control form-invalid'}
					    />
					    <div className='input-error'>{this.state.fullname.touched ? this.state.fullname.errMessage : null}</div>
					</div>
					<div className='form-group'>
					    <input 
					    	type="text"					 
					    	id="address" 
					    	placeholder="Address" 
					    	className={this.state.address.valid || !this.state.address.touched ? 'form-control' : 'form-control form-invalid'}
					    	onChange={event => this.inputChangedHandler(event, 'address')} 
					    />
					    <div className='input-error'>{this.state.address.touched ? this.state.address.errMessage : null}</div>
					</div>
					<div className='form-group'>
					    <input 
					    	type="text"					 
					    	id="phone" 
					    	placeholder="Phone Number" 
					    	className={this.state.phonenumber.valid || !this.state.phonenumber.touched ? 'form-control' : 'form-control form-invalid'}
					    	onChange={event => this.inputChangedHandler(event, 'phonenumber')} 
					    />
					    <div className='input-error'>{this.state.phonenumber.touched ? this.state.phonenumber.errMessage : null}</div>
					</div>
					<div className="form-check">
						<input type="checkbox" className="form-check-input" id="notification" onClick={this.checkboxClickedHandler} />
    					<label className="form-check-label" htmlFor="notification">Reiceive text message notifications</label>
					</div>
					<button type="submit" className="btn" onClick={this.submitHandler}>
						{this.state.purchased ? 'Success!' : (this.state.loading ? 'Sending Data...' : 'Confirm')}
					</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		token: state.auth.token,
		userId: state.auth.userId,
		series: state.order.series,
		item: state.order.item,
		price: state.order.price,
		sugarLevel: state.order.sugarLevel,
		iceLevel:state.order.iceLevel 
	}
}

const mapDispathToProps = (dispatch) => {
	return {
		onSelectItem: (item, price) => dispatch(orderActions.selectItem(item, price)),
		onToggleModal: modalShown => dispatch(orderActions.toggleModal(modalShown)),
		onSelectSugarLevel: sugarLevel => dispatch(orderActions.selectSugarLevel(sugarLevel)),
		onSelectIceLevel: iceLevel => dispatch(orderActions.selectIceLevel(iceLevel)),
	}
}

export default withRouter( connect( mapStateToProps, mapDispathToProps )( ContactData ) );