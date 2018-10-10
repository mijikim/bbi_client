import React from 'react';

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

export default Info