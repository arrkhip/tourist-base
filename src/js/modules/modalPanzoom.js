import Panzoom from '@panzoom/panzoom/dist/panzoom.min';

const isMobile = window.matchMedia('(max-width: 900px)');

const $els = document.querySelectorAll('.j_modalPanzoom');

const opts = {
  contain: 'outside',
  startScale: isMobile.matches ? 1 : 1,
  minScale: isMobile.matches ? 1 : 1,
  maxScale: isMobile.matches ? 4 : 1,
  cursor: '',
};

if ($els.length) {
  $els.forEach(($el) => {
    const panzoom = Panzoom($el, opts);

    if (isMobile.matches) {
      $el.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
    }
  });
}
