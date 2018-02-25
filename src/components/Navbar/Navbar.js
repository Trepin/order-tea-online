import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import teaLogo from '../../assets/images/bubble_tea-512.png';
import NavigitionItems from '../NavigitionItems/NavigitionItems';
import './Navbar.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => (
	<nav className='navbar navbar-dark bg-dark Navbar' >
		<NavLink 
			to='/'
			className='navbar-brand text-white' >
				<img src={teaLogo} width='30' height='30' className="d-inline-block align-top" alt=''/>
				Loyal Tea
		</NavLink>
		<div>
			<DrawerToggle clicked={props.sideDrawerToggleClicked}/>
			<div className='DeskTop-Only'>
				<NavigitionItems isAuthenticated={props.isAuthenticated}/>
			</div>
		</div>
	</nav>
) 

export default Navbar;