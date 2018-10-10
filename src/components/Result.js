import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addErrors } from '../reducers/errors';
import { clearSelected } from '../reducers/characters';
import CharacterContainer from '../containers/CharacterContainer';
import '../styles/components/Result.css';

class Result extends Component {
  onBackToSearchClick = () => {
    const { history, clearSelected } = this.props;
    clearSelected();
    history.push('/');
  }

  render () {
    return (
      <div className='result'>
        <div className='title'>RESULT</div>
        <CharacterContainer type='hero' />
        <CharacterContainer type='villain' />
        <button onClick={this.onBackToSearchClick}>BACK TO SEARCH</button>
      </div>
    )
  }
}

Result.propTypes = {
  errors: PropTypes.array,
  addErrors: PropTypes.func,
  history: PropTypes.object,
  selected: PropTypes.object,
  clearSelected: PropTypes.func,
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
