const handleErrors = (response) => {
  if (!response.ok) {
    throw response;
  }
  return response;
};

const getAccessToken = () => window.sessionStorage.getItem('accessToken');
const prefix = `https://superheroapi.com/api/`;
const constructUrl = (accessToken) => {
  const token = accessToken || getAccessToken();
  return `${prefix}${token}`;
};

export default {
  fetchCharacter({ accessToken, id }) {
    const url = constructUrl(accessToken);
    return fetch(`${url}/${id}/`)
      .then(handleErrors)
      .then(response => { return response.json() })
  },
};