import React from 'react';
import PropTypes from 'prop-types';
import Picture from './Picture';
import Info from './Info';
import '../styles/components/Character.css';

const Character = (props) => {
  const { data } = props;
  const { name, image, powerstats, biography, appearance } = data;
  const getInfo = () => {
    const info = [];
    [powerstats, appearance].forEach((data, index) => {
      if (data) {
        info.push(<Info key={index} data={appearance} className={'character-info'} />);
      }
    });
    return info;
  };
  return (
    <div className='character'>
      <Picture className='character-picture' url={image.url} />
      <div className='character-details'>
        <p>Name: {name}</p>
        <p>Full Name: {biography['full-name']}</p>
        {getInfo()}
      </div>
    </div>
  )
};

Character.propTypes = {
  data: PropTypes.object,
};

export default Character