!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},n={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in a)return a[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return a[e]=r,t.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},t.parcelRequired7c6=r);var o=r("6JpON"),c=r("5IjG7"),i=r("8MBJY"),s=r("a2hTj"),l=r("hKHmD"),u=(o=r("6JpON"),r("dIxxU").default),f=function(){"use strict";function t(){e(i)(this,t),this.searchQuery="",this.page=1}return e(s)(t,[{key:"fetchImages",value:function(){var e=new URLSearchParams({key:t.API_KEY,q:this.searchQuery,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:this.page}),a="".concat(t.BASE_URL,"?").concat(e);return""===this.searchQuery.trim()?(o.Notify.warning("Please, enter your search query!"),Promise.reject("Invalid query!")):u.get(a,{validateStatus:function(e){return 404!=e}}).catch((function(e){return console.log(e)}))}},{key:"incrementPage",value:function(){this.page+=1}},{key:"resetPage",value:function(){this.page=1}},{key:"query",get:function(){return this.searchQuery},set:function(e){this.query=e}}]),t}();e(l)(f,"API_KEY","34194701-2813288863e2fdf221136bb42"),e(l)(f,"BASE_URL","https://pixabay.com/api/");var h=r("732lr"),y={searchForm:document.querySelector("#search-form"),loadMoreBtn:document.querySelector(".load-more")},g=new(e(c))(".gallery a",{captionsData:"alt",captionDelay:250,scrollZoom:!1}),d=new f;function p(){d.fetchImages().then((function(e){var t=e.data;d.incrementPage(),console.log("Current page: ".concat(d.page-1,"\nNext page: ").concat(d.page)),(0,h.showImgGallery)(t.hits),(0,h.checkElementsQuantity)(t.totalHits),(0,h.adjustPageScroll)(),g.refresh()})).catch((function(e){return console.log(e)}))}y.loadMoreBtn.style.display="none",y.searchForm.addEventListener("submit",(function(e){e.preventDefault(),y.loadMoreBtn.style.display="none",d.searchQuery=e.currentTarget.elements.searchQuery.value,d.resetPage(),d.fetchImages().then((function(e){var t=e.data;0!==t.total?(o.Notify.success("Hooray! We found ".concat(t.totalHits," images.")),d.incrementPage(),console.log("NEW SEARCH...\nSearch query: ".concat(d.searchQuery,"\nQuantity of found elements:  ").concat(t.total,"\nCurrent page: ").concat(d.page-1,"\nNext page: ").concat(d.page)),(0,h.clearImgGallery)(),(0,h.showImgGallery)(t.hits),g.refresh(),y.loadMoreBtn.style.display="block",y.loadMoreBtn.addEventListener("click",p),(0,h.checkElementsQuantity)(t.totalHits)):o.Notify.failure("Sorry, there are no images matching your search query. Please try again.")})).catch((function(e){return console.log(e)}))}))}();
//# sourceMappingURL=search-gallery-v1.63f5d373.js.map
