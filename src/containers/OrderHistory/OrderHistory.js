import React, { Component } from 'react';
import './OrderHistory.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import axios from 'axios';
import ErrorBox from '../../components/UI/ErrorBox/ErrorBox';
import OrderList from '../../components/OrderList/OrderList';

class OrderHistory extends Component {
	state = {
		orders: {},
		fetching: false,
		error: null
	}

	componentDidMount(){

		this.setState({
			fetching: true
		})

		const queryParams = '?auth=' + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId + '"';

		const url = 'https://orderteaonline-a3641.firebaseio.com/orders.json' + queryParams;
		
		axios.get(url)
			.then(res => {
				this.setState({orders: res.data});
				}
			)
			.catch(err => {
				this.setState({error: err.response.data.error});
			}
			)
	}

	render(){
		let errorMessage = null;

		if(this.state.error !== null){
			errorMessage = <ErrorBox>{this.state.error}</ErrorBox>;
		}

		let orderList = [];

		for(let key in this.state.orders){
			orderList.push(
				<OrderList key={key} order={this.state.orders[key]}/>
			)
		}

		orderList.sort((a, b) => {
			return new Date(b.props.order.orderDetails.date).getTime() - new Date(a.props.order.orderDetails.date).getTime();
		});

		return(
			<div className='container orderhistory' >
				{errorMessage}
				<h4 className='order-title'>Order History</h4>
				<ul className='orderhistory-header'>
					<li className='orderhistory-content'>Date</li>
					<li className='orderhistory-content'>Item</li>
					<li className='orderhistory-content'>Price</li>
					<li className='orderhistory-content-contact'>Contact Info</li>
				</ul>
				{orderList}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		token: state.auth.token,
		userId: state.auth.userId
	}
}

export default connect( mapStateToProps )( OrderHistory );