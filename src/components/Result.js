import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
  history: PropTypes.object,
  clearSelected: PropTypes.func,
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  clearSelected: () => dispatch(clearSelected()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Result)
