import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../sagas/actions';
import { addErrors, clearError } from '../reducers/errors';
import { activateSpinner } from '../reducers/spinner';
import { setSelectedCharacter } from '../reducers/characters';
import { getCharactersByType, getSelectedIdByType } from '../selectors/characters';
import Profile from '../components/Profile';
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
      addErrors(['Name is missing.'])
    } else {
      activateSpinner();
      searchCharacters({ name, type });
    }
  }

  onCharacterSelect = id => () => {
    const { type, setSelectedCharacter } = this.props;
    setSelectedCharacter({ type, id });
  }

  getProfiles = () => {
    const { characters, searchBy, type, selectedId } = this.props;
    if (searchBy[type]) {
      return characters && characters.length > 0 ? characters.map(character => {
        const { id } = character;
        return (
          <Profile key={id} data={character} onClickHandler={this.onCharacterSelect(id)} selected={selectedId === id}/>
        )
      }) : <div><p>No character was found</p></div>;
    }
  }

  render() {
    const profiles = this.getProfiles();
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
        <div className='search-list'>
          {profiles}
        </div>
      </div>
    )
  }
}

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