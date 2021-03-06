import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/ErrorAlert.css';

const ErrorAlert = (props) => {
  const { errors } = props;
  return errors && errors.length > 0 ? (
    <div className='error-alert'>
      {errors.map((err, index) => <p className='error' key={index}>{err}</p>)}
  </div>) : null;
};

ErrorAlert.propTypes = {
  errors: PropTypes.array
};

export default ErrorAlert;