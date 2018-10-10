import React from 'react';
import PropTypes from 'prop-types';

const formatValue = val => (val === 'null' || val === '-' || !val) ? '--' : val;

const Info = (props) => {
  const { data, className } = props;
  return (
    Object.keys(data).map(key => {
      const info = formatValue(typeof data[key] === 'string' ?
        data[key] : data[key][0]);
      return <p className={className} key={key}>{key}: {info}</p>
    })
  )
};

Info.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
};

export default Info