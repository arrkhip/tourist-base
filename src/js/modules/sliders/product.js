import Swiper from 'swiper/swiper-bundle.min.js';

const $thumbsSlider = document.querySelector('.product__thumbs-slider');
let thumbsSlider = null;
let isLoop = false;
if ($thumbsSlider) {
  const $wrapper = document.querySelector('.product__thumbs-slider-wrapper');

  const $thumbsSlides = $thumbsSlider.querySelectorAll('.swiper-slide');

  isLoop = $thumbsSlides.length > 3;

  thumbsSlider = new Swiper($thumbsSlider, {
    slidesPerView: 4,
    direction: 'horizontal',
    spaceBetween: 8,
    speed: 400,
    watchOverflow: true,
    watchSlidesVisibility: true,
    loop: false,
    // loopAdditionalSlides: 4,
    breakpoints: {
      320: {
        spaceBetween: 0,
        slidesPerView: 4,
        loop: false,
      },
      501: {
        spaceBetween: 0,
        slidesPerView: 4,
        loop: false,
      },
      601: {
        spaceBetween: 8,
        loop: isLoop,
      },
      768: {
        spaceBetween: 8,
      },
    },

    on: {
      afterInit(swiper) {
        checkNagigation(swiper, $wrapper);
      },
      transitionStart(swiper) {
        checkNagigation(swiper, $wrapper);
      },
    },
  });
}

const $slider = document.querySelector('.product__preview-slider');
if ($slider) {
  // const $navigation = document.querySelector('.product__preview-navigation');
  const $prevEl = document.querySelector('.button-icon--prev');
  const $nextEl = document.querySelector('.button-icon--next');

  const swiper = new Swiper($slider, {
    slidesPerView: 1,
    speed: 0,
    watchOverflow: true,
    loop: false,
    loopAdditionalSlides: 3,
    // autoHeight: true,
    followFinger: false,
    shortSwipes: false,
    longSwipes: false,
    allowTouchMove: false,

    thumbs: {
      swiper: thumbsSlider,
    },
    pagination: {
      type: 'bullets',
      el: '.product__preview-pagination',
    },

    navigation: {
      nextEl: $nextEl,
      prevEl: $prevEl,
    },
    breakpoints: {
      320: {
        followFinger: true,
        shortSwipes: true,
        longSwipes: true,
        allowTouchMove: true,
        speed: 600,
        spaceBetween: 12,
      },
      901: {
        followFinger: false,
        shortSwipes: false,
        longSwipes: false,
        allowTouchMove: false,
        spaceBetween: 0,
      },
    },
  });

  swiper.on('slideChange', function () {
    const swiperTriggers = document.querySelectorAll('[data-number-slide]');
    swiperTriggers.forEach((swiperTrigger) => {
      const attrSwiperTrigger = parseInt(
        swiperTrigger.getAttribute('data-number-slide'),
        10
      );
      if (attrSwiperTrigger === window.swiper.realIndex) {
        swiperTrigger.classList.add('active');
      } else {
        swiperTrigger.classList.remove('active');
      }
    });
  });

  window.swiper = swiper;
}

function checkNagigation(swiper, $navigation) {
  if (swiper.isEnd) {
    $navigation.classList.add('is-end');
  } else {
    $navigation.classList.remove('is-end');
  }

  if (swiper.isBeginning) {
    $navigation.classList.add('is-start');
  } else {
    $navigation.classList.remove('is-start');
  }
}
