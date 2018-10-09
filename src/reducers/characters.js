import { createDuck } from 'redux-duck';

const charactersDuck = createDuck('characters-duck');
const initialState = {
  characters: {},
  selected: {
    hero: '',
    villain: ''
  },
};

export const SET_SELECTED = charactersDuck.defineType('SET_SELECTED');
export const CLEAR_SELECTED = charactersDuck.defineType('CLEAR_SELECTED');
export const ADD_CHARACTERS = charactersDuck.defineType('ADD_CHARACTERS');

export const clearSelected = charactersDuck.createAction(CLEAR_SELECTED);
export const setSelectedCharacter = charactersDuck.createAction(SET_SELECTED);
export const addCharacters = charactersDuck.createAction(ADD_CHARACTERS);

export default charactersDuck.createReducer({
  [SET_SELECTED]: (state, action) =>
    ({ ...state, selected: { ...state.selected, [action.payload.type]: action.payload.id } })
  ,
  [ADD_CHARACTERS]: (state, action) =>
    ({ ...state, characters: { ...state.characters, ...action.payload } })
}, initialState);
