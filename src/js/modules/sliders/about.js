import Swiper from 'swiper/swiper-bundle.min.js';
const $sliders = document.querySelectorAll('.about__slider');

if ($sliders.length) {
  $sliders.forEach(($slider) => {
    const $navigation =
      document.querySelector('.about__button-navigation') || null;
    const $prev = $navigation.querySelector('.about__button--prev') || null;
    const $next = $navigation.querySelector('.about__button--next') || null;

    const slider = new Swiper($slider, {
      slidesPerView: 1,
      speed: 600,
      resizeObserver: true,
      watchSlidesProgress: true,
      allowTouchMove: false,
      // effect: 'fade',
      // fadeEffect: {
      //   crossFade: true,
      // },
      navigation: {
        prevEl: $prev,
        nextEl: $next,
      },
    });
  });
}
