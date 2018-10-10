import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCharacterByType } from '../selectors/characters';
import Character from '../components/Character';

class CharacterContainer extends Component {
  render() {
    const { character } = this.props;
    return character ? (
      <div className={`character-${this.props.type}`}>
        <Character data={character}/>
      </div>
    ) : null;
  }
}

CharacterContainer.propTypes = {
  character: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  character: getCharacterByType(state, props),
});

export default connect(mapStateToProps)(CharacterContainer)