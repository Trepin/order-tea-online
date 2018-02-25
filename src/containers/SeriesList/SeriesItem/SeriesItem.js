import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SeriesItem.css';

const seriesItem = (props) => (
	<div className='card SeriesItem' onClick={() => props.clicked(props.name, props.price)}>
		<div className="card-body">
			<h6 className="card-title seriesItemFont">{props.name}</h6>
		</div>
		<div className='priceText'>${props.price.toFixed(2)}</div>
	</div>
)

export default seriesItem;

