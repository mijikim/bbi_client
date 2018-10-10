import React from 'react';
import classNames from 'classnames';
import Picture from './Picture';
import Info from './Info';
import '../styles/components/Profile.css';

const Profile = (props) => {
  const { data, onClickHandler, selected } = props;
  const { name, image, powerstats } = data;
  const profileClass = classNames('profile', { 'profile--selected': selected });
  return (
    <div className={profileClass} onClick={onClickHandler}>
      <Picture className='profile-picture' url={image.url} />
      <div className='profile-info'>
        <p>{name}</p>
        {powerstats && <Info data={powerstats} className={'profile-stats'} />}
      </div>
    </div>
  )
};

export default Profile