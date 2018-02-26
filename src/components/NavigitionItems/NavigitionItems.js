import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigitionItem from './NavigitionItem/NavigitionItem';
import Aux from '../../hoc/Aux/Aux';

const NavigitionItems = (props) => (
	<ul className='navbar-nav navigition-items'>
		{props.isAuthenticated 
			? 
				<Aux>
					<NavigitionItem link='/' exact>Order Now</NavigitionItem>
					<NavigitionItem link='/orders'>Order History</NavigitionItem>
					<NavigitionItem link='/logout'>LogOut</NavigitionItem>
				</Aux>
			:
				<Aux>
					<NavigitionItem link='/' exact>Order Now</NavigitionItem>
					<NavigitionItem link='/register'>SignUp</NavigitionItem>
					<NavigitionItem link='/login'>SignIn</NavigitionItem>
				</Aux>
		}
	</ul>
);

export default NavigitionItems;

