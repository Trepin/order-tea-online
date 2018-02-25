import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SeriesItem from './SeriesItem/SeriesItem';
import './SeriesList.css';

class SeriesList extends Component{
	state = {
		MilkTeaSeries:[
			{
				name: 'Pearl Milk Tea',
				price: 3.75
			},
			{
				name: 'Oolong Milk Tea',
				price: 3.75
			},
			{
				name: 'Earl Grey Milk Tea',
				price: 4
			},
			{
				name: 'Caramel Milk Tea',
				price: 3.75
			},
			{
				name: 'Brown Sugar Ginger Milk Tea',
				price: 3.75
			},
			{
				name: 'Watermelon Milk Tea',
				price: 3.25
			}

		],
		BrewedTeaSeries:[
			{
				name: 'Green Tea',
				price: 3.00		
			},
			{
				name: 'Oolong Tea',
				price: 3.00
			},
			{
				name: 'Wintermelon Tea',
				price: 3.00				
			},
			{
				name: 'Black Tea',
				price: 3.00				
			},
			{
				name: 'Earl Grey Tea',
				price: 3.00				
			},
			{
				name: 'Wintermelon Oolong Tea',
				price: 3.00				
			}
		],
		MustacheSeries:[
			{
				name: 'Milk Foam Green Tea',
				price: 3.75
			},
			{
				name: 'Milk Foam Black Tea',
				price: 3.75
			},
			{
				name: 'Milk Foam Wintermelon Tea',
				price: 3.75
			},
			{
				name: 'Milk Foam Brown Sugar Ginger Tea',
				price: 4.00
			},
			{
				name: 'Milk Foam Oolong Tea',
				price: 3.75
			}
		],
		SlushSeries:[
			{
				name: 'Matcha Milk Slush',
				price: 4.75
			},
			{
				name: 'Mango Milk Slush',
				price: 4.75
			},
			{
				name: 'Lychee Slush',
				price: 4.75
			},
			{
				name: 'Caramel Chocalate Slush',
				price: 4.75
			},
			{
				name: 'Passionfruit Yogurt Slush',
				price: 4.75
			},
			{
				name: 'Taro Milk Slush',
				price: 4.75
			}
		]
	}

	render(){
		let seriesName = this.props.series.split(" ").join("");

		let seriesItems = this.state[seriesName].map(serieItem => (
				<SeriesItem 
					key={serieItem['name']}
					name={serieItem['name']}
					price={serieItem['price']}
					clicked={this.props.selectItem}
				/>
			));

		return(
		<div className='SeriesList'>
			{seriesItems}
		</div>
		)
	}
}

export default SeriesList;