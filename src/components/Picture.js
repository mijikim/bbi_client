import React from 'react';
import PropTypes from 'prop-types';

const Picture = (props) => {
  const { url, className } = props;
  return (
    <div className={className}>
      <img alt='character' src={url} />
    </div>
  )
};

Picture.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string,
};

export default Picture