import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Aux from '../Aux/Aux';
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
			<Aux>
				<Navbar isAuthenticated={this.props.isAuthenticated} sideDrawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer sideDrawerToggleClicked={this.sideDrawerToggleHandler} isAuthenticated={this.props.isAuthenticated} open={this.state.sideDrawerOpen}/>
				<main className='layout'>
					{this.props.children}
				</main>
			</Aux>
		)

	}
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);