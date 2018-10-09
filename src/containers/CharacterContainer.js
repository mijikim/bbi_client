import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCharacterByType } from '../selectors/characters';

class CharacterContainer extends Component {
  render() {
    const { character } = this.props;
    return character ? (
      <div>
        <img src={character.image.url} />
        <h3>{character.name}</h3>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state, props) => ({
  character: getCharacterByType(state, props),
});

export default connect(mapStateToProps)(CharacterContainer)