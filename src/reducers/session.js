import { createDuck } from 'redux-duck';

const sessionDuck = createDuck('session-duck');
const initialState = {
  isAuthenticated: false,
  redirectToReferrer: false,
};

export const UPDATE_SESSION = sessionDuck.defineType('UPDATE_SESSION');

export const updateSession = sessionDuck.createAction(UPDATE_SESSION);

export default sessionDuck.createReducer({
  [UPDATE_SESSION]: (state, action) => ({ ...state, ...action.payload })
}, initialState);
