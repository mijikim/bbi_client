import { createDuck } from 'redux-duck';

const spinnerDuck = createDuck('spinner-duck');

const initialState = { default: false };

export const ACTIVATE = spinnerDuck.defineType('ACTIVATE');
export const DEACTIVATE = spinnerDuck.defineType('DEACTIVATE');

export const activateSpinner = spinnerDuck.createAction(ACTIVATE);
export const deactivateSpinner = spinnerDuck.createAction(DEACTIVATE);

export default spinnerDuck.createReducer({
  [ACTIVATE]: (state, action) => ({ ...state, [action.payload || 'default']: true }),
  [DEACTIVATE]: (state, action) => ({ ...state, [action.payload || 'default']: false }),
}, initialState);
