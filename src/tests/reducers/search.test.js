import reducer, { SET_SEARCH_BY, ADD_SEARCH_RESULTS } from '../../reducers/search';

describe('src/reducers/characters', () => {
  const initialState = {
    results: {},
    searchBy: {
      hero: '',
      villain: ''
    },
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState, 'the state must be an object with correct properties');
  });

  it(`should handle '${SET_SEARCH_BY}' action`, () => {
    const data = { type: 'hero', name: 'test' };
    expect(reducer(initialState, {
      type: SET_SEARCH_BY,
      payload: data
    })).toStrictEqual({
        results: {},
        searchBy: {
          hero: 'test',
          villain: ''
        },
      },
      'the state must be an object with searchBy.hero updated');
  });

  it(`should handle '${ADD_SEARCH_RESULTS}' action`, () => {
    const data = {
      name: 'test',
      results: [],
    };
    expect(reducer(initialState, {
      type: ADD_SEARCH_RESULTS,
      payload: data,
    })).toStrictEqual({
        ...initialState,
        results: {
          test: []
        }
      },
      'the state must be an object with updated results');
  });
});
