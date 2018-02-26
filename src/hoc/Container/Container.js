import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Container.css';

const Container = (props) => (
	<div className='container container-aux'>
		{props.children}
	</div>
)

export default Container;