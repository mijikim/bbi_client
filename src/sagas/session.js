import { all, call, put, takeLatest } from 'redux-saga/effects'
import Api from '../api';
import actions from './actions';
import { updateSession } from '../reducers/session';
import { addErrors } from '../reducers/errors';
import { errorMessageMap } from '../utils/maps';
import { deactivateSpinner } from '../reducers/spinner';

export function* loginUserSaga(action) {
  try {
    const { accessToken } = action.payload;
    // Since there isn't auth endpoint, try to fetch a character and see if we get authentication error
    const { response, error } = yield call(Api.fetchCharacter, { accessToken, id: 1 });
    if (response === 'error') {
      yield put(updateSession({ isAuthenticated: false }));
      yield put(addErrors([errorMessageMap[error]]));
    } else {
      window.sessionStorage.setItem('accessToken', window.btoa(accessToken));
      yield put(updateSession({ isAuthenticated: true, redirectToReferrer: true }));
    }
  } catch(e) {
    yield put(addErrors(['Something went wrong. Please try again.']));
  }
  yield put(deactivateSpinner());
}

export function* loginUser() {
  yield takeLatest(actions.LOGIN_USER, loginUserSaga);
}

export default function* rootSaga() {
  yield all([
    loginUser(),
  ])
}