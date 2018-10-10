import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCharacterByType } from '../selectors/characters';
import Character from '../components/Character';

class CharacterContainer extends Component {
  render() {
    const { character } = this.props;
    return character ? (
      <div className={'character-wrapper'}>
        <Character data={character}/>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state, props) => ({
  character: getCharacterByType(state, props),
});

export default connect(mapStateToProps)(CharacterContainer)