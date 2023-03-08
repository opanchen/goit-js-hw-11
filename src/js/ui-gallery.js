import { Notify } from 'notiflix';

const refs = {
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

export {
  showImgGallery,
  clearImgGallery,
  checkElementsQuantity,
  adjustPageScroll,
};

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
  const markup = `<a href="${largeImageURL}">
  <div class="photo-card">
  <div class="thumb">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="480" />
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
</div>
</a>`;

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearImgGallery() {
  refs.gallery.innerHTML = '';
}

function checkElementsQuantity(maxNumber) {
  console.log(`${refs.gallery.children.length} images of ${maxNumber}`);

  let shouldStop = false;

  if (refs.gallery.children.length === maxNumber) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    refs.loadMoreBtn.style.display = 'none';
    shouldStop = true;
  }
  return shouldStop;
}

// console.log(shouldStop);

function adjustPageScroll() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
