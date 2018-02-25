import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigitionItem from '../NavigitionItems/NavigitionItem/NavigitionItem';
import './SideDrawer.css';
import Aux from '../../hoc/Aux/Aux';

const SideDrawer = (props) => {
	let attachedClasses = ['navbar', 'navbar-light', 'bg-light', 'Mobile-Only', 'SideDrawerClose'];
	if(props.open){
		attachedClasses = ['navbar', 'navbar-light', 'bg-light', 'Mobile-Only'];
	};
	// console.log(attachedClasses.join(' '))

	return(
		<nav onClick={props.sideDrawerToggleClicked} className={attachedClasses.join(' ')} >
			<ul className='navbar-nav'>
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
		</nav>
	);
};

export default SideDrawer; 