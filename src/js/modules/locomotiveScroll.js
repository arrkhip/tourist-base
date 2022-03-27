import LocomotiveScroll from 'locomotive-scroll';

window.addEventListener('load', init);

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
