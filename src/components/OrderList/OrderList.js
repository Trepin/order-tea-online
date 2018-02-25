import React from 'react';
import './OrderList.css';
import formatDate from '../../shared/formatDate';

const orderList = (props) => {

	return(
		<ul className='OrderList'>
			<li className='OrderListItem'>{formatDate(new Date(props.order.orderDetails.date))}</li>
			<li className='OrderListItem'>{props.order.orderDetails.item}</li>
			<li className='OrderListItem'>${props.order.orderDetails.price.toFixed(2)}</li>
			<li className='OrderListItem-Contact'>
				<ul className='OrderList ContactDataList'>
					<li>Name: {props.order.contactData.fullname}</li>
					<li>Mobile: {props.order.contactData.phonenumber}</li>
					<li>Address: {props.order.contactData.address}</li>
				</ul>
			</li>
		</ul>
	)
}

export default orderList;