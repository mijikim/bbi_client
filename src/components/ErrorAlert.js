import React from 'react';
import PropTypes from 'prop-types';

const ErrorAlert = (props) => {
  const { errors } = props;
  return errors && errors.length > 0 ? (<div className='error-alert'>
    {errors.map((err, index) => {
      return <p className='error' key={index}>{err}</p>
    })}
  </div>) : null;
};

ErrorAlert.propTypes = {
  errors: PropTypes.array
};

export default ErrorAlert;