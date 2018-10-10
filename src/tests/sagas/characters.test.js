import runSaga from 'redux-saga-testing';
import { put, call } from 'redux-saga/effects';
import { searchCharactersSaga } from '../../sagas/characters';
import Api from '../../api';
import { addErrors } from '../../reducers/errors';
import { setSearchBy, addSearchResults } from '../../reducers/search';
import { addCharacters } from '../../reducers/characters';
import { errorMessageMap } from '../../utils/maps';
import { deactivateSpinner } from '../../reducers/spinner';

describe('src/sagas/characters', () => {
  describe('searchCharactersSaga', () => {
    const payload = { name: 'name', type: 'hero' };

    describe('result already in state', () => {
      const it = runSaga(searchCharactersSaga({ payload }));
      const results = { name: [1, 2] };
      const state = { search: { results } };

      it('slices state and gets results', (result) => {
        expect(result.SELECT.selector(state)).toStrictEqual({ results },
          'result of select must contain form parameters');
        return { results };
      });

      it('should dispatch setSearchBy', (result) => {
        expect(result).toStrictEqual(
          put(setSearchBy(payload)),
          'must yield put(setSearchBy({ name, type }))');
      });

      it('should dispatch deactivateSpinner', (result) => {
        expect(result).toStrictEqual(
          put(deactivateSpinner()),
          'must yield put(deactivateSpinner())');
      });

      it('stops working', (result) => {
        expect(result).toBeUndefined();
      });
    });

    describe('success case', () => {
      const it = runSaga(searchCharactersSaga({ payload }));
      const results = {};
      const state = { search: { results } };

      it('slices state and gets results', (result) => {
        expect(result.SELECT.selector(state)).toStrictEqual({ results },
          'result of select must contain form parameters');
        return { results };
      });

      it('should call searchCharacters', (result) => {
        expect(result).toStrictEqual(call(Api.searchCharacters, { name: payload.name }),
          'must yield call(Api.searchCharacters, { name })');
        return { response: 'success', results: [{ id: 1 }] }
      });

      it('should dispatch setSearchBy', (result) => {
        expect(result).toStrictEqual(
          put(setSearchBy(payload)),
          'must yield put(setSearchBy({ name, type }))');
      });

      it('should dispatch addCharacters', (result) => {
        expect(result).toStrictEqual(
          put(addCharacters({ 1: { id: 1} })),
          'must yield put(addCharacters(charById))');
      });

      it('should dispatch addSearchResults', (result) => {
        expect(result).toStrictEqual(
          put(addSearchResults({ name: payload.name, results: [1] })),
          'must yield put(addSearchResults({ name, results }))');
      });

      it('should dispatch deactivateSpinner', (result) => {
        expect(result).toStrictEqual(
          put(deactivateSpinner()),
          'must yield put(deactivateSpinner())');
      });

      it('stops working', (result) => {
        expect(result).toBeUndefined();
      });
    });

    describe('error case', () => {
      const it = runSaga(searchCharactersSaga({ payload }));
      const results = {};
      const state = { search: { results } };

      it('slices state and gets results', (result) => {
        expect(result.SELECT.selector(state)).toStrictEqual({ results },
          'result of select must contain form parameters');
        return { results };
      });

      it('should call searchCharacters', (result) => {
        expect(result).toStrictEqual(call(Api.searchCharacters, { name: payload.name }),
          'must yield call(Api.searchCharacters, { name })');
        return { response: 'error', error: 'test' }
      });

      it('should dispatch addErrors action', (result) => {
        expect(result).toStrictEqual(
          put(addErrors([errorMessageMap.test])),
          'must yield put([errorMessageMap[error]]))'
        );
      });

      it('should dispatch deactivateSpinner', (result) => {
        expect(result).toStrictEqual(
          put(deactivateSpinner()),
          'must yield put(deactivateSpinner())');
      });

      it('stops working', (result) => {
        expect(result).toBeUndefined();
      });
    });
  });
});