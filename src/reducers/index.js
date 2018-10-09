import { combineReducers } from 'redux';
import session from './session';
import errors from './errors';
import characters from './characters';
import search from './search';
import spinner from './spinner';

export default combineReducers(
  {
    characters,
    errors,
    search,
    session,
    spinner,
  }
);
