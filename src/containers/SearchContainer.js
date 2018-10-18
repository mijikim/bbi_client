import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../sagas/actions';
import { addErrors, clearError } from '../reducers/errors';
import { activateSpinner } from '../reducers/spinner';
import { setSelectedCharacter } from '../reducers/characters';
import { getCharactersByType, getSelectedIdByType } from '../selectors/characters';
import ProfileList from '../components/ProfileList';
import { errorMessageMap } from '../utils/maps';
import '../styles/containers/SearchContainer.css';

class SearchContainer extends Component {
  state = {
    name: '',
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSearchClick();
    }
  }

  onSearchChange = (e) => {
    this.setState({ name: e.target.value });
  }

  onSearchClick = () => {
    const { name } = this.state;
    const { searchCharacters, type, activateSpinner, addErrors, clearError } = this.props;
    clearError();
    if (name.length === 0) {
      addErrors([errorMessageMap.missingName])
    } else {
      activateSpinner();
      searchCharacters({ name, type });
    }
  }

  onCharacterSelect = id => {
    const { type, setSelectedCharacter } = this.props;
    setSelectedCharacter({ type, id });
  }

  render() {
    const { characters, searchBy, type, selectedId } = this.props;
    const profileListProps = { characters, searchBy, type, selectedId };
    return (
      <div className={`search-${this.props.type}`} id='search'>
        <div className='title'>{this.props.type}</div>
        <input
          placeholder='Type a name to search by'
          onChange={this.onSearchChange}
          onKeyPress={this.onKeyPress}
          value={this.state.name || ''}
          className='search-input'
        />
        <button onClick={this.onSearchClick}>SEARCH</button>
        <ProfileList {...profileListProps} onCharacterSelect={this.onCharacterSelect}/>
      </div>
    )
  }
}

SearchContainer.propTypes = {
  activateSpinner: PropTypes.func,
  addErrors: PropTypes.func,
  characters: PropTypes.array,
  clearError: PropTypes.func,
  searchBy: PropTypes.object,
  searchCharacters: PropTypes.func,
  selectedId: PropTypes.string,
  setSelectedCharacter: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  characters: getCharactersByType(state, props),
  searchBy: state.search.searchBy,
  selectedId: getSelectedIdByType(state, props),
});

const mapDispatchToProps = dispatch => ({
  activateSpinner: () => dispatch(activateSpinner()),
  addErrors: (errors) => dispatch(addErrors(errors)),
  clearError: () => dispatch(clearError()),
  searchCharacters: (data) => dispatch({ type: actions.SEARCH_CHARACTERS, payload: data }),
  setSelectedCharacter: (id) => dispatch(setSelectedCharacter(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)