import React from 'react';
import classNames from 'classnames';
import '../styles/components/Profile.css';

const Profile = (props) => {
  const { data, onClickHandler, selected } = props;
  const { name, image, powerstats } = data;
  const profileClass = classNames('profile', { 'profile--selected': selected });
  return (
    <div className={profileClass} onClick={onClickHandler}>
      <div className='profile-picture'>
        <img alt='character' src={image.url} />
      </div>
      <div className='profile-info'>
        <p>{name}</p>
        {
          powerstats && Object.keys(powerstats).map(key => {
            return <p className='profile-stats' key={key}>{key}: {powerstats[key]}</p>
          })
        }
      </div>
    </div>
  )
};

export default Profile