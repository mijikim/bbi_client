import reducer, { ACTIVATE, DEACTIVATE } from '../../reducers/spinner';

describe('src/reducers/spinner', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual({default: false}, 'the state must be an object');
  });

  it(`should handle '${ACTIVATE}' action`, () => {
    expect(reducer({default: false}, {
      type: ACTIVATE,
      payload: null
    })).toStrictEqual({default: true}, 'default spinner must be activated');

    expect(reducer({default: false}, {
      type: ACTIVATE,
      payload: 'spinnerName'
    })).toStrictEqual({default: false, spinnerName: true}, '"spinnerName" spinner must be activated');
  });

  it(`should handle '${DEACTIVATE}' action`, () => {
    expect(reducer({default: true}, {
      type: DEACTIVATE,
      payload: null
    })).toStrictEqual({default: false}, 'default spinner must be deactivated');

    expect(reducer({default: false, spinnerName: true}, {
      type: DEACTIVATE,
      payload: 'spinnerName'
    })).toStrictEqual({default: false, spinnerName: false}, '"spinnerName" spinner must be deactivated');
  });
});
