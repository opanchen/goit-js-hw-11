function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},t.parcelRequired7c6=o);var i,a=o("7Y9D8"),s=o("fZKcF"),c=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,f=/^0o[0-7]+$/i,d=parseInt,h="object"==typeof t&&t&&t.Object===Object&&t,g="object"==typeof self&&self&&self.Object===Object&&self,y=h||g||Function("return this")(),p=Object.prototype.toString,m=Math.max,v=Math.min,w=function(){return y.Date.now()};function b(e,t,r){var n,o,i,a,s,c,u=0,l=!1,f=!1,d=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function h(t){var r=n,i=o;return n=o=void 0,u=t,a=e.apply(i,r)}function g(e){return u=e,s=setTimeout(p,t),l?h(e):a}function y(e){var r=e-c;return void 0===c||r>=t||r<0||f&&e-u>=i}function p(){var e=w();if(y(e))return b(e);s=setTimeout(p,function(e){var r=t-(e-c);return f?v(r,i-(e-u)):r}(e))}function b(e){return s=void 0,d&&n?h(e):(n=o=void 0,a)}function x(){var e=w(),r=y(e);if(n=arguments,o=this,c=e,r){if(void 0===s)return g(c);if(f)return s=setTimeout(p,t),h(c)}return void 0===s&&(s=setTimeout(p,t)),a}return t=L(t)||0,E(r)&&(l=!!r.leading,i=(f="maxWait"in r)?m(L(r.maxWait)||0,t):i,d="trailing"in r?!!r.trailing:d),x.cancel=function(){void 0!==s&&clearTimeout(s),u=0,n=c=o=s=void 0},x.flush=function(){return void 0===s?a:b(w())},x}function E(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function L(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==p.call(e)}(e))return NaN;if(E(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=E(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(c,"");var r=l.test(e);return r||f.test(e)?d(e.slice(2),r?2:8):u.test(e)?NaN:+e}i=function(e,t,r){var n=!0,o=!0;if("function"!=typeof e)throw new TypeError("Expected a function");return E(r)&&(n="leading"in r?!!r.leading:n,o="trailing"in r?!!r.trailing:o),b(e,t,{leading:n,maxWait:t,trailing:o})};var x=o("iJYdK"),j=(a=o("7Y9D8"),o("2shzp"));class P{async fetchImages(){const e=new URLSearchParams({key:P.API_KEY,q:this.searchQuery,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:this.page}),t=`${P.BASE_URL}?${e}`;try{return!0===this.isLoading||!1===this.shouldLoad?Promise.reject("Search is stoped."):""===this.searchQuery.trim()?(a.Notify.warning("Please, enter your search query!"),Promise.reject("Invalid query!")):(this.isLoading=!0,await j.default.get(t,{validateStatus:e=>404!=e}))}catch(e){console.log(e)}}incrementPage(){this.page+=1}resetPage(){this.page=1}get query(){return this.searchQuery}set query(e){this.query=e}constructor(){this.searchQuery="",this.page=1,this.shouldLoad=!0,this.isLoading=!1}}e(x)(P,"API_KEY","34194701-2813288863e2fdf221136bb42"),e(x)(P,"BASE_URL","https://pixabay.com/api/");var S=o("m2GY9");const $=e(i)((async function(){const e=document.body.offsetHeight,t=window.innerHeight,r=window.scrollY;if(r+t>=e-t/4)try{Q.isLoading=!1;const{data:e}=await Q.fetchImages();Q.incrementPage(),console.log(`Current page: ${Q.page-1}\nNext page: ${Q.page}`),(0,S.showImgGallery)(e.hits),(0,S.adjustPageScroll)(),(0,S.checkElementsQuantity)(e.totalHits),(0,S.checkElementsQuantity)(e.totalHits)&&(Q.shouldLoad=!1,window.removeEventListener("scroll",$),window.removeEventListener("resize",$)),N.refresh()}catch(e){console.log(e)}}),1e3),q={searchForm:document.querySelector("#search-form"),loadMoreBtn:document.querySelector(".load-more")},N=new(e(s))(".gallery a",{captionsData:"alt",captionDelay:250,scrollZoom:!1}),Q=new P;q.loadMoreBtn.style.display="none",q.searchForm.addEventListener("submit",(async function(e){e.preventDefault(),Q.searchQuery=e.currentTarget.elements.searchQuery.value,Q.resetPage(),Q.shouldLoad=!0,Q.isLoading=!1;try{const{data:e}=await Q.fetchImages();if(0===e.total)return void a.Notify.failure("Sorry, there are no images matching your search query. Please try again.");a.Notify.success(`Hooray! We found ${e.totalHits} images.`),Q.incrementPage(),console.log(`NEW SEARCH...\nSearch query: ${Q.searchQuery}\nQuantity of found elements:  ${e.total}\nCurrent page: ${Q.page-1}\nNext page: ${Q.page}`),(0,S.clearImgGallery)(),(0,S.showImgGallery)(e.hits),N.refresh(),window.addEventListener("scroll",$),window.addEventListener("resize",$),(0,S.checkElementsQuantity)(e.totalHits)}catch(e){console.log(e)}}));
//# sourceMappingURL=search-gallery-v2.f14d9b50.js.map