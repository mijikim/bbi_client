import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import Api from '../api';
import actions from './actions';
import { addErrors } from '../reducers/errors';
import { setSearchBy, addSearchResults } from '../reducers/search';
import { addCharacters } from '../reducers/characters';
import { errorMessageMap } from '../utils/maps';
import { deactivateSpinner } from '../reducers/spinner';

export function* searchCharactersSaga(action) {
  try {
    const { name, type } = action.payload;
    const { results } = yield select(state => state.search);
    if (results[name]) {
      yield put(setSearchBy({ name, type }));
    } else {
      const { response, error, results: data } = yield call(Api.searchCharacters, { name });
      if (response === 'error') {
        yield put(addErrors([errorMessageMap[error]]));
      } else {
        yield put(setSearchBy({ name, type }));
        const charById = {};
        const results = data.map(char => {
          charById[char.id] = char;
          return char.id
        });
        yield put(addCharacters(charById));
        yield put(addSearchResults({ name, results }));
      }
    }
  } catch(e) {
    yield put(addErrors([errorMessageMap.general]));
  }
  yield put(deactivateSpinner());
}

export function* searchCharacters() {
  yield takeLatest(actions.SEARCH_CHARACTERS, searchCharactersSaga);
}

export default function* rootSaga() {
  yield all([
    searchCharacters(),
  ])
}