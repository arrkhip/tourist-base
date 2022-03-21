import SwiperCore, { Swiper, Navigation, Scrollbar } from 'swiper/core';

SwiperCore.use([Navigation, Scrollbar]);

const isMobile = window.matchMedia('(max-width: 992px)');

const $sliders = document.querySelectorAll('.rooms-slider');

if ($sliders.length) {
  $sliders.forEach(($slider) => {
    const $wrapper = $slider.closest('.rooms-slider-wrapper');
    const $scrollbar = $wrapper.querySelector('.rooms-slider-scrollbar');
    const $navigation = $wrapper.querySelector('.rooms-slider-navigation');
    const $prevEl =
      $navigation && $navigation.querySelector('.button-icon--prev');
    const $nextEl =
      $navigation && $navigation.querySelector('.button-icon--next');

    const sliderInstance = new Swiper($slider, {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 700,

      followFinger: isMobile.matches,
      shortSwipes: isMobile.matches,
      longSwipes: isMobile.matches,
      allowTouchMove: isMobile.matches,

      watchOverflow: true,
      watchSlidesVisibility: true,

      navigation: {
        prevEl: $prevEl,
        nextEl: $nextEl,
      },

      scrollbar: {
        el: $scrollbar,
        draggable: true,
      },

      breakpoints: {
        1401: {
          slidesPerView: 3,
          spaceBetween: 36,
        },

        901: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },

      on: {
        afterInit(swiper) {
          updateProductCardSliders(swiper);
        },
        resize(swiper) {
          updateProductCardSliders(swiper);
        },
      },
    });
  });
}

function updateProductCardSliders(swiper) {
  swiper.slides.forEach(($slide) => {
    const $slider = $slide.querySelector('.swiper-container');

    if ($slider && $slider.swiper) $slider.swiper.update();
  });
}
