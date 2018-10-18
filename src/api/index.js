const handleErrors = (response) => {
  if (!response.ok) {
    throw response;
  }
  return response;
};

// Need proxy url to bypass "No Access-Control-Allow-Origin header” error
// when making request to api from the browser
const proxyUrl = 'https://salty-gorge-69054.herokuapp.com/';
const prefix = `${proxyUrl}http://superheroapi.com/api/`;

const getAccessToken = () => window.atob(window.sessionStorage.getItem('accessToken'));
const constructUrl = (accessToken = getAccessToken()) => `${prefix}${accessToken}`;

export default {
  fetchCharacter({ accessToken, id }) {
    return fetch(`${constructUrl(accessToken)}/${id}/`)
      .then(handleErrors)
      .then(response => { return response.json() })
  },
  searchCharacters({ name }) {
    return fetch(`${constructUrl()}/search/${name}`)
      .then(handleErrors)
      .then(response => { return response.json() })
  }
};