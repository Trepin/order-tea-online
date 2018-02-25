import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigitionItem.css';
import { NavLink } from 'react-router-dom';

const NavigitionItem = (props) => (
	<li className='NavigitionItem'>
		<NavLink 
			to={props.link}
			exact={props.exact}
			className='nav-link'>
				{props.children}
		</NavLink>
	</li>
);

export default NavigitionItem;
