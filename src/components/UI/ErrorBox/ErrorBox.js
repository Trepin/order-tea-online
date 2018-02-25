import React from 'react';
import exclamationMark from '../../../assets/images/exclamation-mark.png';
import './ErrorBox.css';

const errorBox = (props) => {
	return(
		<div className='ErrorBox' >
			<img src={exclamationMark} alt='' />
			{props.children}
		</div>
	)
}

export default errorBox;