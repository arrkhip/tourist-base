import SwiperCore, { Swiper, Navigation, Scrollbar } from 'swiper/core';

SwiperCore.use([Navigation, Scrollbar]);

const isMobile = window.matchMedia('(max-width: 900px)');
const $slider = document.querySelector('.offers-slider');

if ($slider) {
  const $section = $slider.closest('section');
  const $scrollbar = $section.querySelector('.offers-slider-scrollbar');
  const $navigation = $section.querySelector('.offers-slider-navigation');
  const $prevEl =
    $navigation && $navigation.querySelector('.button-icon--prev');
  const $nextEl =
    $navigation && $navigation.querySelector('.button-icon--next');

  const slider = new Swiper($slider, {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 800,
    watchOverflow: true,

    followFinger: isMobile.matches,
    shortSwipes: isMobile.matches,
    longSwipes: isMobile.matches,
    allowTouchMove: isMobile.matches,

    navigation: {
      prevEl: $prevEl,
      nextEl: $nextEl,
    },

    scrollbar: {
      el: $scrollbar,
      draggable: true,
    },

    breakpoints: {
      901: {
        slidesPerView: 1,
      },
      601: {
        slidesPerView: 2,
      },
    },

    on: {
      afterInit(swiper) {
        window.addEventListener('resize', () => {
          swiper.update();
        });
      },
      update(swiper) {
        console.log(swiper);
        if (swiper.slides.length <= swiper.params.slidesPerView) {
          swiper.$el[0].classList.add('lock');
        } else {
          swiper.$el[0].classList.remove('lock');
        }
      },
    },
  });
}
