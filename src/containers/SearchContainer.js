import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../sagas/actions';
import { addErrors } from '../reducers/errors';
import { activateSpinner } from '../reducers/spinner';
import { setSelectedCharacter } from '../reducers/characters';
import { getCharactersByType, getSelectedIdByType } from '../selectors/characters';
import Profile from '../components/Profile';

class SearchContainer extends Component {
  state = {
    name: '',
  }

  onSearchChange = (e) => {
    this.setState({ name: e.target.value });
  }

  onSearchClick = () => {
    const { name } = this.state;
    const { searchCharacters, type, activateSpinner } = this.props;
    activateSpinner();
    searchCharacters({ name, type });
  }

  onCharacterSelect = id => () => {
    const { type, setSelectedCharacter } = this.props;
    setSelectedCharacter({ type, id });
  }

  getCharacters = () => {
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
    const characters = this.getCharacters();
    return (
      <div>
        <h3>{this.props.type}</h3>
        <input
          placeholder='Please type a name to search by'
          onChange={this.onSearchChange}
          value={this.state.name || ''}
        />
        <button onClick={this.onSearchClick}>SEARCH</button>
        {characters}
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
  searchCharacters: (data) => dispatch({ type: actions.SEARCH_CHARACTERS, payload: data }),
  setSelectedCharacter: (id) => dispatch(setSelectedCharacter(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)