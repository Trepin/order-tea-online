import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DrawerToggle.css';

const DrawerToggle = (props) => (
	<button type='button' className='navbar-toggle DrawerToggle' onClick={props.clicked} >
		<span className='navbar-toggler-icon'></span>
	</button>
);

export default DrawerToggle; 