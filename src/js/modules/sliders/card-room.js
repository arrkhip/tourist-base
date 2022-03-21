import SwiperCore, { Swiper, Pagination, Lazy } from 'swiper/core';
import Helper from '@helpers/Helper';

SwiperCore.use([Pagination, Lazy]);

const isMobile = window.matchMedia('(max-width: 900px)');

initProductCardSliders();

function initProductCardSliders() {
  const $sliders = document.querySelectorAll('.card-room-slider');

  if ($sliders.length) {
    $sliders.forEach(($slider) => {
      if ($slider.swiper) return false;

      const $sliderWrapper = $slider.closest('.card-room-slider-wrapper');
      const $pagination =
        $sliderWrapper &&
        $sliderWrapper.querySelector('.card-room-slider-pagination');

      const sliderInstance = new Swiper($slider, {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 200,

        watchOverflow: true,

        followFinger: isMobile.matches,
        shortSwipes: isMobile.matches,
        longSwipes: isMobile.matches,
        allowTouchMove: isMobile.matches,

        preloadImages: false,
        lazy: true,

        pagination: {
          el: $pagination,
          clickable: true,
        },

        on: {
          afterInit(swiper) {
            initTriggers(swiper);
          },
        },
      });
    });

    if (document.productCardMousemoveHandler) {
      document.removeEventListener(
        'mousemove',
        document.productCardMousemoveHandler
      );
    }

    document.productCardMousemoveHandler = onMouseMove;
    document.addEventListener(
      'mousemove',
      document.productCardMousemoveHandler
    );
  }
}

window.initProductCardSliders = initProductCardSliders;

function initTriggers(swiper) {
  const $triggersWrap = document.createElement('div');
  $triggersWrap.className = 'card-room-slider-hover';

  swiper.slides.forEach(
    ($slide) => ($triggersWrap.innerHTML += '<div class="hover-trigger"></div>')
  );

  swiper.$el[0].appendChild($triggersWrap);
}

function onMouseMove(e) {
  const isTargetOfChild = Helper.isParentHasClass(e.target, 'hover-trigger');

  if (isTargetOfChild) {
    const $wrapper = e.target.closest('.card-room-slider-hover');
    const index = [...$wrapper.children].indexOf(e.target);

    if (index !== this.activeIndex) {
      const $slider = e.target.closest('.swiper-container');
      $slider.swiper.slideTo(index, 200, true);
    }
  } else {
    const $sliders = document.querySelectorAll('.card-room-slider');

    if ($sliders.length) {
      $sliders.forEach(($slider) => {
        if ($slider.swiper && $slider.swiper.activeIndex !== 0) {
          $slider.swiper.slideTo(0, 0, true);
        }
      });
    }
  }
}
