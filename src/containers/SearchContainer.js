import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCharactersByType } from '../selectors/characters';
import { setSelectedCharacter } from '../reducers/characters';
import actions from "../sagas/actions";
import {addErrors} from "../reducers/errors";
import { activateSpinner } from '../reducers/spinner';

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

  // TODO: extract below out to a separate component showing data per spec.
  getCharacters = () => {
    const { characters, searchBy, type } = this.props;
    if (searchBy[type]) {
      return characters && characters.length > 0 ? characters.map(char => {
        const { name, id } = char;
        return (
          <div key={id} onClick={this.onCharacterSelect(id)}>
            <span>{name}</span>
          </div>
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
});

const mapDispatchToProps = dispatch => ({
  activateSpinner: () => dispatch(activateSpinner()),
  addErrors: (errors) => dispatch(addErrors(errors)),
  searchCharacters: (data) => dispatch({ type: actions.SEARCH_CHARACTERS, payload: data }),
  setSelectedCharacter: (id) => dispatch(setSelectedCharacter(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)