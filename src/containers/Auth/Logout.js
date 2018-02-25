import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/authActions';
import * as orderActions from '../../store/actions/orderActions';

class Logout extends Component{
	componentDidMount(){
		this.props.onLogout();
		this.props.onToggleModal(false);
		this.props.onSelectSugarLevel('full');
		this.props.onSelectIceLevel('full');
		this.props.onSelectItem(null, null);

	}
	render(){
		return(
			<Redirect to='/' />
		)
	}
}

const mapDispathToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(authActions.logout()),
		onSelectItem: (item, price) => dispatch(orderActions.selectItem(item, price)),
		onToggleModal: modalShown => dispatch(orderActions.toggleModal(modalShown)),
		onSelectSugarLevel: sugarLevel => dispatch(orderActions.selectSugarLevel(sugarLevel)),
		onSelectIceLevel: iceLevel => dispatch(orderActions.selectIceLevel(iceLevel))
	}

}

export default connect(null, mapDispathToProps)(Logout);