import { createSelector } from 'reselect';
import { typeToAlignment } from '../utils/maps';

const getCharacterType = (state, props) => props.type;
const getCharacters = state => state.characters.characters;
const getSelectedIds = state => state.characters.selected;
const getSearchResults = state => state.search.results;
const getSearchData = state => state.search.searchBy;

export const getSearchedName = createSelector(
  [getCharacterType, getSearchData],
  (type, data) => {
    return data[type];
  }
);

export const getSearchResultByName = createSelector(
  [getSearchedName, getSearchResults],
  (name, results) => {
    return name ? results[name] : [];
  }
);

export const getCharactersByType = createSelector(
  [getCharacterType, getCharacters, getSearchResultByName],
  (type, allCharacters, searchResults) => {
    const characters = [];
    if (searchResults && searchResults.length > 0) {
      searchResults.forEach(id => {
        const character = allCharacters[id];
        if (character && character.biography.alignment === typeToAlignment[type]) characters.push(character);
      })
    }
    return characters;
  }
);

export const getCharacterByType = createSelector(
  [getCharacterType, getCharacters, getSelectedIds],
  (type, allCharacters, selectedIds) => {
    console.log(type, allCharacters, selectedIds)
    // console.log(selectedIds[type]);
    // console.log(allCharacters[selectedIds[type]]);
    return allCharacters[selectedIds[type]];
  }
);

