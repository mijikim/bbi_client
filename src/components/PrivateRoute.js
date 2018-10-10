import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (<Component {...props} />) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.func,
};

const mapStateToProps = state => ({ isAuthenticated: state.session.isAuthenticated });

export default connect(mapStateToProps)(PrivateRoute);