import { Notify } from 'notiflix';
axios = require('axios').default;

export class SearchAPI {
  static #API_KEY = '34194701-2813288863e2fdf221136bb42';
  static BASE_URL = 'https://pixabay.com/api/';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const searchParams = new URLSearchParams({
      key: SearchAPI.#API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    });

    const searchURL = `${SearchAPI.BASE_URL}?${searchParams}`;

    if (this.searchQuery.trim() === '') {
      Notify.warning('Please, enter your search query!');
      return Promise.reject('Invalid query!');
    }

    return axios
      .get(searchURL, {
        validateStatus: status => status != 404,
      })
      .catch(e => console.log(e));
  }

  // Збільшуємо значення сторінки для наступного пошукового запиту:
  incrementPage() {
    this.page += 1;
  }

  // Скидуємо значення сторінки до дефолтного при кожному новому сабміті пошукової форми:
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.query = newQuery;
  }
}
