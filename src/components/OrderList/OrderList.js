import React from 'react';
import './OrderList.css';
import formatDate from '../../shared/formatDate';

const orderList = (props) => {

	return(
		<ul className='orderlist'>
			<li className='orderlist-item'>{formatDate(new Date(props.order.orderDetails.date))}</li>
			<li className='orderlist-item'>{props.order.orderDetails.item}</li>
			<li className='orderlist-item'>${props.order.orderDetails.price.toFixed(2)}</li>
			<li className='orderlist-item-contact'>
				<ul className='orderlist orderlist-contact'>
					<li>Name: {props.order.contactData.fullname}</li>
					<li>Mobile: {props.order.contactData.phonenumber}</li>
					<li>Address: {props.order.contactData.address}</li>
				</ul>
			</li>
		</ul>
	)
}

export default orderList;