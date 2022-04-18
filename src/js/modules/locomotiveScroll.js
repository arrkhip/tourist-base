import LocomotiveScroll from 'locomotive-scroll';

window.$on = (e, d, g, h, b) =>
  e.addEventListener(d, (c) => {
    // eslint-disable-next-line eqeqeq
    for (d = e, b = c.target; b != d; )
      b.matches(g) ? h.call((d = b), c, b) : (b = b.parentNode);
  });

const isMobile = window.matchMedia('(max-width: 900px)');

if (!isMobile.matches) {
  window.addEventListener('load', init);
}

function init() {
  const $container = document.querySelector('[data-scroll-container]');

  if ($container) {
    const locomotiveScroll = new LocomotiveScroll({
      el: $container,
      smooth: true,
    });

    window.$on(
      document.body,
      'click',
      'a[href^=\\#]:not([href$=\\#])',
      (e, matched) => {
        const hashval = matched.getAttribute('href');
        const target = document.querySelector(hashval);

        e.preventDefault();
        e.stopPropagation();

        locomotiveScroll.scrollTo(target);
      }
    );

    window.locomotiveScroll = locomotiveScroll;
  }
}
