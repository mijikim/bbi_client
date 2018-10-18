import React from 'react';
import PropTypes from 'prop-types';
import Picture from './Picture';
import Info from './Info';
import '../styles/components/Character.css';

const Character = (props) => {
  const { data } = props;
  const { name, image, powerstats, biography, appearance } = data;
  return (
    <div className='character'>
      <Picture className='character-picture' url={image.url} />
      <div className='character-details'>
        <p>Name: {name}</p>
        <p>Full Name: {biography['full-name']}</p>
        <Info data={{ ...appearance, ...powerstats }} className={'character-info'} />
      </div>
    </div>
  )
};

Character.propTypes = {
  data: PropTypes.object,
};

export default Character