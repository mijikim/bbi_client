const handleErrors = (response) => {
  if (!response.ok) {
    throw response;
  }
  return response;
};

// Need proxy url to bypass "No Access-Control-Allow-Origin header” error
// when making request to api from the browser
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const prefix = `${proxyUrl}http://superheroapi.com/api/`;

const getAccessToken = () => window.atob(window.sessionStorage.getItem('accessToken'));
const constructUrl = (accessToken = getAccessToken()) => `${prefix}${accessToken}`;

export default {
  fetchCharacter({ accessToken, id }) {
    const url = constructUrl(accessToken);
    return fetch(`${url}/${id}/`, {
      headers: {
        Accept: `text/html,application/xhtml+xml,application/xml`,
        'Access-Control-Request-Method': 'GET'
      }
    })
      .then(handleErrors)
      .then(response => { return response.json() })
  },
  searchCharacters({ name }) {
    return fetch(`${constructUrl()}/search/${name}`)
      .then(handleErrors)
      .then(response => { return response.json() })
  }
};