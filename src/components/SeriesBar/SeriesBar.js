import React from 'react';
import Series from './Series/Series';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SeriesBar.css';

const SeriesBar = (props) => (
	<div className='list-group'>
		<Series name='Milk Tea Series' clicked={props.clicked} active={props.series === 'Milk Tea Series'}/>
		<Series name='Brewed Tea Series' clicked={props.clicked}  active={props.series === 'Brewed Tea Series'}/>
		<Series name='Mustache Series' clicked={props.clicked}  active={props.series === 'Mustache Series'}/>
		<Series name='Slush Series' clicked={props.clicked}  active={props.series === 'Slush Series'}/>
	</div>
)

export default SeriesBar;