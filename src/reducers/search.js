import { createDuck } from 'redux-duck';

const searchDuck = createDuck('search-duck');
const initialState = {
  results: {},
  searchBy: {
    hero: '',
    villain: ''
  },
};

export const SET_SEARCH_BY = searchDuck.defineType('SET_SEARCH_BY');
export const ADD_SEARCH_RESULTS = searchDuck.defineType('ADD_SEARCH_RESULTS');

export const setSearchBy = searchDuck.createAction(SET_SEARCH_BY);
export const addSearchResults = searchDuck.createAction(ADD_SEARCH_RESULTS);

export default searchDuck.createReducer({
  [SET_SEARCH_BY]: (state, action) =>
    ({ ...state, searchBy: { ...state.searchBy, [action.payload.type]: action.payload.name } })
  ,
  [ADD_SEARCH_RESULTS]: (state, action) =>
    ({ ...state, results: { ...state.results, [action.payload.name]: action.payload.results } })
}, initialState);
