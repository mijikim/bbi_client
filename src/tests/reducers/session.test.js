import reducer, { UPDATE_SESSION } from '../../reducers/session';

describe('src/reducers/session', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual({
      isAuthenticated: false,
      redirectToReferrer: false,
    }, 'the state must be an object with isAuthenticated and redirectToReferrer');
  });

  it(`should handle '${UPDATE_SESSION}' action`, () => {
    const sessionUpdate = { isAuthenticated: true, redirectToReferrer: true };
    expect(reducer({
      isAuthenticated: false,
      redirectToReferrer: false
    }, {
      type: UPDATE_SESSION,
      payload: sessionUpdate
    })).toStrictEqual(sessionUpdate,
      'the state must be an object with the messages containing added data');
  });
});
