//
{
  /* <form class="search-form" id="search-form">
  <input
    class="search-form__input"
    type="text"
    name="searchQuery"
    autocomplete="off"
    placeholder="Search images..."
  />
  <button class="search-form__btn" type="submit">Search</button>
</form> */
}
//
import { Notify } from 'notiflix';
import { searchSmth } from './fetch-fn-then';
// console.log(searchSmth);

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('[name="searchQuery"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.style.display = 'none';
refs.searchForm.addEventListener('submit', onSearchFormSubmit);

// !!!! поки так, але треба прибрати з глобального скоупу
let page = null;
// !!!!

function onSearchFormSubmit(e) {
  e.preventDefault();
  const searchValue = e.currentTarget.elements.searchQuery.value;

  if (searchValue.trim() === '') {
    Notify.warning('Please, enter your search query!');
    return;
  }

  clearImgGallery();

  page = 1;

  searchSmth(searchValue, page)
    .then(response => {
      //   console.log(response);
      //   console.log(response.data);
      console.log(
        `Search query: ${searchValue}\nQuantity of found elements:  ${response.data.total}`
      );
      if (response.data.total === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      //   clearImgGallery();
      showImgGallery(response.data.hits);

      refs.loadMoreBtn.style.display = 'block';
      refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

      function onLoadMoreBtnClick() {
        // Перезаписуємо значення page
        page += 1;
        console.log('current page', page);
        searchSmth(searchValue, page).then(resp => {
          //   console.log(resp);
          showImgGallery(resp.data.hits);
        });
      }
    })
    .catch(error => console.log(error.message));
}

function showImgGallery(arr) {
  arr.forEach(el => {
    renderMarkup(el);
  });
}

function renderMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  const markup = `<div class="photo-card">
  <div class="thumb">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="480" />
  </div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`;

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearImgGallery() {
  refs.gallery.innerHTML = '';
}
