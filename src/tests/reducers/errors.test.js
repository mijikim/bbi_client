import reducer, { ADD_ERRORS, CLEAR_ERROR } from '../../reducers/errors';

describe('src/reducers/errors', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual({
      messages: [],
    }, 'the state must be an object with empty messages array');
  });

  it(`should handle '${ADD_ERRORS}' action`, () => {
    const messages = ['msg'];

    expect(reducer({messages: []}, {
      type: ADD_ERRORS,
      payload: ['msg']
    })).toStrictEqual({messages},
      'the state must be an object with the messages containing added data');
  });

  it(`should handle '${CLEAR_ERROR}' action`, () => {
    expect(reducer({messages: ['error']}, {
      type: CLEAR_ERROR,
    })).toStrictEqual({messages: []},
      'the state must be an object with no errors');
  });
});
