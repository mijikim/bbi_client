import React from 'react';

const Picture = (props) => {
  const { url, className } = props;
  return (
    <div className={className}>
      <img alt='character' src={url} />
    </div>
  )
};

export default Picture