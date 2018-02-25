import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Order from './containers/Order/Order';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import './App.css';
import Register from './containers/Auth/Register';
import LogIn from './containers/Auth/LogIn';
import Logout from './containers/Auth/Logout';
import ContactData from './containers/ContactData/ContactData';
import OrderHistory from './containers/OrderHistory/OrderHistory'
import { connect } from 'react-redux';
import * as authActions from './store/actions/authActions';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
  	let route = (
  		<Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={LogIn} />
  			<Route path='/' component={Order} />
  			<Redirect to='/' />
  		</Switch>
  	)

    if(this.props.isAuthenticated){
      route = (
        <Switch>
          <Route path='/logout' component={Logout} />
          <Route path='/contactdata' component={ContactData} />
          <Route path='/orders' component={OrderHistory} />
          <Route path='/' component={Order} />
          <Redirect to='/' />
        </Switch>
      )      
    }

    return (
      <div className='App' >
        <Layout>
        	{route}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authActions.checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispathToProps)(App));
