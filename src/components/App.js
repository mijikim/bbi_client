import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Login from './Login';
import Home from './Home';
import PrivateRoute from './PrivateRoute';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Switch>
          <PrivateRoute exact path='/' component={Home}/>
          <Route path='/login' component={Login} />
          <Redirect path='*' to='/' />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
