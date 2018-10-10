import reducer, { SET_SELECTED, CLEAR_SELECTED, ADD_CHARACTERS } from '../../reducers/characters';

describe('src/reducers/characters', () => {
  const initialState = {
    characters: {},
    selected: {
      hero: '',
      villain: ''
    },
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState, 'the state must be an object with correct properties');
  });

  it(`should handle '${SET_SELECTED}' action`, () => {
    const data = { type: 'hero', id: 'test' };
    expect(reducer(initialState, {
      type: SET_SELECTED,
      payload: data
    })).toStrictEqual({
        characters: {},
        selected: {
          hero: 'test',
          villain: ''
        },
      },
      'the state must be an object with selected.hero updated');
  });

  it(`should handle '${CLEAR_SELECTED}' action`, () => {
    expect(reducer({
      characters: {},
      selected: {
        hero: '455',
        villain: '123'
      },
    }, {
      type: CLEAR_SELECTED,
    })).toStrictEqual(initialState,
      'the state must be an object with values inside selected set to empty string');
  });

  it(`should handle '${ADD_CHARACTERS}' action`, () => {
    const characters = {
      id: {}
    };
    const state = {
      characters: {},
      selected: {
        hero: '455',
        villain: '123'
      },
    };
    expect(reducer(state, {
      type: ADD_CHARACTERS,
      payload: characters,
    })).toStrictEqual({
        ...state,
        characters
      },
      'the state must be an object with updated characters');
  });
});
