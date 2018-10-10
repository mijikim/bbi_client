import { getSearchedName, getSearchResultByName, getCharactersByType, getSelectedIdByType, getCharacterByType } from '../../selectors/characters';

describe('src/selectors/characters', () => {
  const state = {
    characters: {
      characters: {
        1: { id: 1, biography: { alignment: 'good' } }
      },
      selected: {
        hero: 1
      }
    },
    search: {
      results: {
        batman: [1]
      },
      searchBy: {
        hero: 'batman'
      }
    }
  };
  const props = { type: 'hero' };

  describe('getSearchedName', () => {
    it('should return correct data', () => {
      const result = getSearchedName(state, props);
      expect(result).toEqual(state.search.searchBy.hero);
    });
  });

  describe('getSearchResultByName', () => {
    it('should return correct data', () => {
      const result = getSearchResultByName(state, props);
      expect(result).toEqual(state.search.results.batman);
    });
  });

  describe('getCharactersByType', () => {
    it('should return correct data', () => {
      const result = getCharactersByType(state, props);
      expect(result).toEqual([{"biography": {"alignment": "good"}, "id": 1}]);
    });
  });

  describe('getSelectedIdByType', () => {
    it('should return correct data', () => {
      const result = getSelectedIdByType(state, props);
      expect(result).toEqual(state.characters.selected.hero);
    });
  });

  describe('getCharacterByType', () => {
    it('should return correct data', () => {
      const result = getCharacterByType(state, props);
      expect(result).toEqual(state.characters.characters['1']);
    });
  });
});