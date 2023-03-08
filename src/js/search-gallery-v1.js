import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { SearchAPI } from './search-api-v1';
import {
  showImgGallery,
  clearImgGallery,
  checkElementsQuantity,
  adjustPageScroll,
} from './ui-gallery';

const refs = {
  searchForm: document.querySelector('#search-form'),
  //   searchInput: document.querySelector('[name="searchQuery"]'),
  //   submitBtn: document.querySelector('button[type="submit"]'),
  //   gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const galleryModal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

const newSearchAPI = new SearchAPI();

refs.loadMoreBtn.style.display = 'none';
refs.searchForm.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(e) {
  e.preventDefault();

  // ТЗ: "При повторному сабміті форми кнопка спочатку ховається, а після запиту знову відображається."
  refs.loadMoreBtn.style.display = 'none';

  newSearchAPI.searchQuery = e.currentTarget.elements.searchQuery.value;
  newSearchAPI.resetPage();

  newSearchAPI
    .fetchImages()
    .then(({ data }) => {
      if (data.total === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      Notify.success(`Hooray! We found ${data.totalHits} images.`);

      newSearchAPI.incrementPage();

      console.log(
        `NEW SEARCH...\nSearch query: ${
          newSearchAPI.searchQuery
        }\nQuantity of found elements:  ${data.total}\nCurrent page: ${
          newSearchAPI.page - 1
        }\nNext page: ${newSearchAPI.page}`
      );

      clearImgGallery();
      showImgGallery(data.hits);

      galleryModal.refresh();

      refs.loadMoreBtn.style.display = 'block';
      refs.loadMoreBtn.addEventListener('click', onLoadMore);

      checkElementsQuantity(data.totalHits);
    })
    .catch(error => console.log(error));
}

function onLoadMore() {
  newSearchAPI
    .fetchImages()
    .then(({ data }) => {
      newSearchAPI.incrementPage();
      console.log(
        `Current page: ${newSearchAPI.page - 1}\nNext page: ${
          newSearchAPI.page
        }`
      );

      showImgGallery(data.hits);

      checkElementsQuantity(data.totalHits);

      adjustPageScroll();

      galleryModal.refresh();
    })
    .catch(error => console.log(error));
}
