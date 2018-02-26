import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Series.css';

const Series = (props) => {
	let classes = ['list-group-item series'];
	if(props.active){
		classes.push('series-active');
	}

	return(
		<button type="button" onClick={() => props.clicked(props.name)} className={classes.join(' ')}>
			<h6 className='series-title'>{props.name}</h6>
		</button>
	)
};

export default Series;