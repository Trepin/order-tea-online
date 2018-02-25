import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '../../hoc/Container/Container';
import './Order.css';
import SeriesBar from '../../components/SeriesBar/SeriesBar';
import SeriesList from '../SeriesList/SeriesList';
import Modal from '../../components/UI/Modal/Modal.js';
import { connect } from 'react-redux';
import * as orderActions from '../../store/actions/orderActions';

class Order extends Component{

	seriesClickedHandler = (series) => {
		this.props.onSelectSeries(series);
	} 

	toggleModalHandler = () => {
		let modalShown = !this.props.modalShown;
		this.props.onToggleModal(modalShown);
		this.props.onSelectSugarLevel('full');
		this.props.onSelectIceLevel('full');
		this.props.onSelectItem(null);
	}

	selectItemHandler = (item, price) => {
		this.props.onToggleModal(true);
		this.props.onSelectItem(item, price);
	}

	selectSugarLevelHandler = (sugarLevel) => {
		this.props.onSelectSugarLevel(sugarLevel);
	}

	selectIceLevelHandler = (iceLevel) => {
		this.props.onSelectIceLevel(iceLevel);
	}

	render(){
		return(
			<div className='OrderTopping'>
				<Modal 
					isAuthenticated={this.props.isAuthenticated} 
					sugarLevel={this.props.sugarLevel} 
					iceLevel={this.props.iceLevel} 
					show={this.props.modalShown} 
					close={this.toggleModalHandler} 
					selectSugarLevel={this.selectSugarLevelHandler} 
					selectIceLevel={this.selectIceLevelHandler}
				/>
				<Container>
					<h4>Choose Series</h4>
					<SeriesBar series={this.props.series} clicked={this.seriesClickedHandler}/>
				</Container>
				<Container>
					<h4>{this.props.series}</h4>
					<SeriesList series={this.props.series} selectItem={this.selectItemHandler}/>
				</Container>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		series: state.order.series,
		modalShown: state.order.modalShown,
		sugarLevel: state.order.sugarLevel,
		iceLevel: state.order.iceLevel,
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onSelectSeries: series => dispatch(orderActions.selectSeries(series)),
		onSelectItem: (item, price) => dispatch(orderActions.selectItem(item, price)),
		onToggleModal: modalShown => dispatch(orderActions.toggleModal(modalShown)),
		onSelectSugarLevel: sugarLevel => dispatch(orderActions.selectSugarLevel(sugarLevel)),
		onSelectIceLevel: iceLevel => dispatch(orderActions.selectIceLevel(iceLevel))
	}
}

export default connect( mapStateToProps, mapDispatchToProps )(Order);