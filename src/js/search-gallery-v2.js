import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';
import { SearchAPI } from './search-api-v2';
import {
  showImgGallery,
  clearImgGallery,
  checkElementsQuantity,
  adjustPageScroll,
} from './ui-gallery';

const TROTTLE_DELAY = 1000;

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

async function onSearchFormSubmit(e) {
  e.preventDefault();

  newSearchAPI.searchQuery = e.currentTarget.elements.searchQuery.value;
  newSearchAPI.resetPage();
  newSearchAPI.shouldLoad = true;
  newSearchAPI.isLoading = false;

  try {
    const { data } = await newSearchAPI.fetchImages();

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

    // window.addEventListener('scroll', throttle(checkPosition, TROTTLE_DELAY));
    // window.addEventListener('resize', throttle(checkPosition, TROTTLE_DELAY));
    startInfiniteScroll();

    checkElementsQuantity(data.totalHits);
    // console.log(checkElementsQuantity(data.totalHits));
  } catch (error) {
    console.log(error);
  }
}

async function checkPosition() {
  //   console.log('=================================');

  //* Встановюємо висоту документу та висоту екрану:
  const height = document.body.offsetHeight;
  //   console.log('height', height);
  const screenHeight = window.innerHeight;
  //   console.log('screenHeight', screenHeight);
  //* Можуть відрізнятися: якщо на сторінці багато контенту,
  //* висота документу буде більшою за висоту екрану (звідси і скрол)

  //* Кількість пікселів, яку користувач уже проскролив:
  const scrolled = window.scrollY;
  //   console.log('scrolled px', scrolled);

  //* Встановлюємо поріг, при наближенні до якого викликатиметься якась дія:
  const threshold = height - screenHeight / 4;
  //   console.log('threshold', threshold);

  //* Відслідковуємо, де знаходиться низ екрану відносно сторінки:
  const position = scrolled + screenHeight;
  //   console.log('position', position);

  //* Якщо ми досягаємо порогового значення, викликаємо потрібну дію:
  if (position >= threshold) {
    // console.log('position >= thresh \nGO!');

    try {
      newSearchAPI.isLoading = false;

      const { data } = await newSearchAPI.fetchImages();

      newSearchAPI.incrementPage();
      console.log(
        `Current page: ${newSearchAPI.page - 1}\nNext page: ${
          newSearchAPI.page
        }`
      );

      showImgGallery(data.hits);

      adjustPageScroll();

      checkElementsQuantity(data.totalHits);
      //   console.log(checkElementsQuantity(data.totalHits));
      if (checkElementsQuantity(data.totalHits)) {
        stopInfiniteScroll();
      }

      galleryModal.refresh();
    } catch (error) {
      console.log(error);
    }
  }
}

// checkPosition();
function startInfiniteScroll() {
  window.addEventListener('scroll', throttle(checkPosition, TROTTLE_DELAY));
  window.addEventListener('resize', throttle(checkPosition, TROTTLE_DELAY));
}

function stopInfiniteScroll() {
  newSearchAPI.shouldLoad = false;
  window.removeEventListener('scroll', throttle(checkPosition, TROTTLE_DELAY));
  window.removeEventListener('resize', throttle(checkPosition, TROTTLE_DELAY));
}
