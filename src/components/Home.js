import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addErrors, clearError } from '../reducers/errors';
import SearchContainer from '../containers/SearchContainer';
import ErrorAlert from './ErrorAlert';
import '../styles/components/Home.css';

class Home extends Component {
  onCompareClick = () => {
    const { history, selected, addErrors, clearError } = this.props;
    clearError();
    if (selected.hero && selected.villain) {
      history.push('/compare');
    } else {
      addErrors(['Please select both hero and a villain.']);
    }
  }

  render () {
    return (
      <div className='home'>
        <SearchContainer type='hero' />
        <SearchContainer type='villain' />
        <ErrorAlert errors={this.props.errors}/>
        <button className='compare-button' onClick={this.onCompareClick}>COMPARE</button>
      </div>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object,
  selected: PropTypes.object,
  addError: PropTypes.func,
  clearError: PropTypes.func,
};

const mapStateToProps = (state) => ({
  errors: state.errors.messages,
  selected: state.characters.selected,
});

const mapDispatchToProps = dispatch => ({
  addErrors: (errors) => dispatch(addErrors(errors)),
  clearError: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
