import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addErrors } from '../reducers/errors';
import { clearSelected } from '../reducers/characters';
import CharacterContainer from '../containers/CharacterContainer';

class Result extends Component {
  onBackToSearchClick = () => {
    const { history, clearSelected } = this.props;
    clearSelected();
    history.push('/');
  }

  render () {
    return (
      <div>
        <h1>RESULT</h1>
        <CharacterContainer type='hero' />
        <CharacterContainer type='villain' />
        <button onClick={this.onBackToSearchClick}>BACK TO SEARCH</button>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  errors: state.errors.messages,
  selected: state.characters.selected,
});

const mapDispatchToProps = dispatch => ({
  addErrors: (errors) => dispatch(addErrors(errors)),
  clearSelected: () => dispatch(clearSelected()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Result)
