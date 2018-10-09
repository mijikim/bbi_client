import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import actions from '../sagas/actions';
import { addErrors, clearError } from '../reducers/errors';
import ErrorAlert from './ErrorAlert';

class Login extends Component {
  state = {
    accessToken: '',
  };
  
  onLoginClick = () => {
    const { accessToken } = this.state;
    const { loginUser, addErrors, clearError } = this.props;
    clearError();
    if (!accessToken || accessToken.length === 0) {
      addErrors(['Access token field is empty.']);
    } else {
      loginUser(accessToken);
    }
  };
  
  render() {
    const { redirectToReferrer, isAuthenticated } = this.props;

    if (redirectToReferrer && isAuthenticated) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <fieldset className='login-field'>
          <label className='login-label' htmlFor='field'>ACCESS TOKEN</label>
          <input
            autoFocus
            id='password'
            type='password'
            className={'password-input'}
            value={this.state.accessToken}
            onChange={e => {
              this.setState({ accessToken: e.target.value });
            }}
          />
        </fieldset>
        <button onClick={this.onLoginClick}>Login</button>
        <ErrorAlert errors={this.props.errors}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors.messages,
  redirectToReferrer: state.session.redirectToReferrer,
  isAuthenticated: state.session.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  addErrors: (errors) => dispatch(addErrors(errors)),
  clearError: () => dispatch(clearError()),
  loginUser: (accessToken) => dispatch({ type: actions.LOGIN_USER, payload: { accessToken } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);