import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import actions from '../sagas/actions';
import { addErrors, clearError } from '../reducers/errors';
import { activateSpinner } from '../reducers/spinner';
import ErrorAlert from './ErrorAlert';
import '../styles/components/Login.css';

class Login extends Component {
  state = {
    accessToken: '',
  };
  
  onLoginClick = () => {
    const { accessToken } = this.state;
    const { loginUser, addErrors, clearError, activateSpinner } = this.props;
    clearError();
    if (!accessToken || accessToken.length === 0) {
      addErrors(['Access token field is empty.']);
    } else {
      activateSpinner();
      loginUser(accessToken);
    }
  }

  onTokenChange = e => {
    const { clearError } = this.props;
    clearError();
    this.setState({ accessToken: e.target.value });
  }
  
  render() {
    const { redirectToReferrer, isAuthenticated } = this.props;

    if (redirectToReferrer && isAuthenticated) {
      return <Redirect to='/' />
    }

    return (
      <div className='login'>
        <div className='title'>Welcome Cadet</div>
        <fieldset className='login-field'>
          <label className='login-label' htmlFor='field'>Acess Token</label>
          <input
            autoFocus
            id='token'
            type='password'
            className='token-input'
            value={this.state.accessToken}
            onChange={this.onTokenChange}
          />
        </fieldset>
        <ErrorAlert errors={this.props.errors}/>
        <div className='container'>
          <button className='login-button' onClick={this.onLoginClick}>Login</button>
        </div>
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
  activateSpinner: () => dispatch(activateSpinner()),
  addErrors: (errors) => dispatch(addErrors(errors)),
  clearError: () => dispatch(clearError()),
  loginUser: (accessToken) => dispatch({ type: actions.LOGIN_USER, payload: { accessToken } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);