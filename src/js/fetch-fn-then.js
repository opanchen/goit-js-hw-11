const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34194701-2813288863e2fdf221136bb42';

const axios = require('axios').default;

export const searchSmth = function (searchValue, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 3,
    page,
  });

  const searchURL = `${BASE_URL}?${searchParams}`;

  return axios.get(searchURL, {
    validateStatus: status => status != 404,
  });
};
