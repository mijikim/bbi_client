import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Login from './Login';
import Home from './Home';
import Result from './Result';
import PrivateRoute from './PrivateRoute';
import '../styles/components/App.css';

class App extends Component {
  render() {
    const { isLoading } = this.props;
    return (
      <div className='app'>
        { isLoading && <div className='overlay'><div className='spinner'/></div> }
        <Switch>
          <PrivateRoute exact path='/' component={Home}/>
          <PrivateRoute path='/compare' component={Result} />
          <Route path='/login' component={Login} />
          <Redirect path='*' to='/' />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(state => ({ isLoading: state.spinner.default }))(App));
