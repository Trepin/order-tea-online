import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import './Layout.css';
import { connect } from 'react-redux';

class Layout extends Component {
	state = {
		sideDrawerOpen: false
	}

	sideDrawerToggleHandler = () => {
		this.setState(
			(prevState) => {
				return { sideDrawerOpen: !prevState.sideDrawerOpen };
			}
		)
	}

	render() {
		return(
			<div className='layout'>
				<Navbar isAuthenticated={this.props.isAuthenticated} sideDrawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer sideDrawerToggleClicked={this.sideDrawerToggleHandler} isAuthenticated={this.props.isAuthenticated} open={this.state.sideDrawerOpen}/>
				<main>
					{this.props.children}
				</main>
			</div>
		)

	}
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);