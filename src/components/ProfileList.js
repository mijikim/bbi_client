import React from 'react';
import PropTypes from 'prop-types';
import Profile from './Profile';

const ProfileList = (props) => {
  const { characters, searchBy, type, selectedId, onCharacterSelect } = props;
  if (searchBy[type]) {
    const insertLine = (index) => {
      return characters.length > 1 && index !== characters.length - 1;
    };
    const profile = characters && characters.length > 0 ? characters.map((character, index) => {
      const { id } = character;
      return (
        <div key={id}>
          <Profile
            data={character}
            onClickHandler={() => onCharacterSelect(id)}
            selected={selectedId === id}
          />
          {insertLine(index) && <hr />}
        </div>
      )
    }) : <p>No character was found</p>;
    return <div className='profile-list'>{profile}</div>;
  }
  return null;
};

ProfileList.propTypes = {
  characters: PropTypes.array,
  onCharacterSelect: PropTypes.func,
  searchBy: PropTypes.object,
  selectedId: PropTypes.string,
  type: PropTypes.string,
};

export default ProfileList