import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Aux from '../../../hoc/Aux/Aux.js';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import LevelPicker from '../../LevelPicker/LevelPicker';
import {withRouter} from 'react-router-dom';

class Modal extends Component{

	checkoutHandler = () => {
		if(this.props.isAuthenticated){
			this.props.history.push('/contactdata');
		}else{
			this.props.history.push('/login');
		}
	}

	render(){
	let modalClass = ['fade', 'Modal'];
	if(this.props.show){
		modalClass.push('ModalShown');
	}

	return(	
		<Aux>
			<Backdrop show={this.props.show} clicked={this.props.close}/>
			<div className={modalClass.join(' ')} tabIndex="-1">
				<div className='modal-content'>
					<div className='modal-header'>
						<h4 className='modal-title'>Choose Your Sugar and Ice Level</h4> 
						<button type='button' className='close' onClick={this.props.close}>
							<span>&times;</span>
						</button>
					</div>
					<div className="modal-body ModalBodyFont">
						<div>Which level of sugar would you like?</div>
						<LevelPicker level={this.props.sugarLevel} selectLevel={this.props.selectSugarLevel} choices={['full', 'less', 'half', 'little', 'none']}/>
						<div>Which level of ice would you like?</div>
						<LevelPicker level={this.props.iceLevel} selectLevel={this.props.selectIceLevel}  choices={['full', 'less', 'none']}/>
		      		</div>
				 	<div className="modal-footer">
				        <button type="button" className="btn ModalButton" onClick={this.checkoutHandler} >Check Out</button>
			      	</div>
		      	</div>
	      	</div>
	    </Aux>
	)
	}
}

export default withRouter(Modal);