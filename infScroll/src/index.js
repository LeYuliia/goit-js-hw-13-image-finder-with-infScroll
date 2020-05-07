import './styles.css';
import apiService from './js/apiService.js';
import refs from './js/refs.js';
import imageMarkup from './js/imageMarkup.js';
import openModal from './js/modal.js';

//PNotify
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';
import { notice } from '@pnotify/core/dist/PNotify.js';

//infScroll
import infScroll from './js/infScroll.js';

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  apiService.query = form.elements.query.value;
  form.reset();
  refs.gallery.innerHTML = '';
  apiService.resetPage();
  apiService.fetchImage().then(imageMarkup);
  refs.loaderEllips.classList.remove('is-hidden');
});

refs.gallery.addEventListener('click', openModal);

infScroll.on('scrollThreshold', () => {
  apiService.incrementPage();
  apiService.fetchImage().then(articles => {
    imageMarkup(articles);
    if ((articles.length < 12) && (articles.length > 0)) {
      notice({
        title: 'Good job!',
        text: 'You have viewed all pages :)',
        delay: 3000,
      });
    }
    if (articles.length === 0) {
      refs.loaderEllips.classList.add('is-hidden');
    }
  });
});
