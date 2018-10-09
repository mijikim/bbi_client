import { createDuck } from 'redux-duck';

const errorsDuck = createDuck('errors-duck');
const initialState = {
  messages: [],
};

export const ADD_ERRORS = errorsDuck.defineType('ADD_ERRORS');
export const CLEAR_ERROR = errorsDuck.defineType('CLEAR_ERROR');

export const addErrors = errorsDuck.createAction(ADD_ERRORS);
export const clearError = errorsDuck.createAction(CLEAR_ERROR);

export default errorsDuck.createReducer({
  [ADD_ERRORS]: (state, action) => ({ messages: state.messages.concat(action.payload) }),
  [CLEAR_ERROR]: (state) => ({ ...state, messages: [] }),
}, initialState);
