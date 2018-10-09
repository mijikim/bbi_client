import runSaga from 'redux-saga-testing';
import { put, call } from 'redux-saga/effects';
import { loginUserSaga } from '../../sagas/session';
import Api from '../../api';
import { updateSession } from '../../reducers/session';
import { addErrors } from '../../reducers/errors';
import { errorMessageMap } from '../../utils/maps';

describe('src/sagas/session', () => {
  describe('loginUserSaga', () => {
    describe('success case', () => {
      const accessToken = '1234';
      const payload = { accessToken };
      const it = runSaga(loginUserSaga({ payload }));

      it('should call fetchCharacter', (result) => {
        expect(result).toStrictEqual(call(Api.fetchCharacter, { accessToken, id: 1 }),
          'must yield call(Api.fetchCharacter, { accessToken, id: 1 })');
        return { response: 'success' }
      });

      it('should dispatch updateSession action', (result) => {
        expect(result).toStrictEqual(
          put(updateSession({ isAuthenticated: true, redirectToReferrer: true })),
          'must yield put(updateSession({ isAuthenticated: true, redirectToReferrer: true }))'
        )
      });
    });

    describe('error case', () => {
      const accessToken = '1234';
      const payload = { accessToken };
      const error = 'access denied';
      const it = runSaga(loginUserSaga({ payload }));

      it('should call fetchCharacter', (result) => {
        expect(result).toStrictEqual(call(Api.fetchCharacter, { accessToken, id: 1 }),
          'must yield call(Api.fetchCharacter, { accessToken, id: 1 })');
        return { response: 'error', error }
      });

      it('should dispatch updateSession action', (result) => {
        expect(result).toStrictEqual(
          put(updateSession({ isAuthenticated: false })),
          'must yield put(updateSession({ isAuthenticated: false }))'
        );
      });

      it('should dispatch addErrors action', (result) => {
        expect(result).toStrictEqual(
          put(addErrors([errorMessageMap[error]])),
          'must yield put([errorMessageMap[error]]))'
        );
      });
    })
  });
});