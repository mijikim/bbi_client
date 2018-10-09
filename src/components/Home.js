import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addErrors, clearError } from '../reducers/errors';
import ErrorAlert from './ErrorAlert';
import SearchContainer from '../containers/SearchContainer';

class Home extends Component {
  onCompareClick = () => {
    const { history, selected, addErrors } = this.props;
    clearError();
    if (selected.hero && selected.villain) {
      history.push('/compare');
    } else {
      addErrors(['Please select both hero and a villain.']);
    }
  }

  render () {
    return (
      <div>
        <h1>HOME</h1>
        <SearchContainer type='hero' />
        <SearchContainer type='villain' />
        <ErrorAlert errors={this.props.errors}/>
        <button onClick={this.onCompareClick}>COMPARE</button>
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
  clearError: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
