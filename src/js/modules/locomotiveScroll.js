import LocomotiveScroll from 'locomotive-scroll';

const isMobile = window.matchMedia('(max-width: 900px)');

if (!isMobile.matches) {
  window.addEventListener('load', init);
}

function init() {
  const $container = document.querySelector('[data-scroll-container]');

  if ($container) {
    const scroll = new LocomotiveScroll({
      el: $container,
      smooth: true,
    });

    window.locomotiveScroll = scroll;
  }
}
