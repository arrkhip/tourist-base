import Plyr from 'plyr';
import SwiperCore, {
  Swiper,
  Autoplay,
  Navigation,
  EffectCoverflow,
  EffectFade,
  Controller,
} from 'swiper/core';

SwiperCore.use([Autoplay, Navigation, EffectCoverflow, EffectFade, Controller]);

const isMobile = window.matchMedia('(max-width: 900px)');

const $section = document.querySelector('.hero-section');
const $bgSlider = $section && $section.querySelector('.hero-bg-slider');
const $textSlider = $section && $section.querySelector('.hero-text-slider');
const $mainSlider = $section && $section.querySelector('.hero-slider');

let textSlider = null;
let bgSlider = null;
let mainSlider = null;

window.addEventListener('load', () => {
  init();

  textSlider.update();
  bgSlider.update();
  mainSlider.autoplay.stop();
  mainSlider.update();
});

window.addEventListener('resize', () => {
  textSlider.update();
  bgSlider.update();
  mainSlider.update();
});

function init() {
  if ($textSlider) {
    textSlider = new Swiper($textSlider, {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 800,
      direction: 'vertical',
      loop: true,
      loopAdditionalSlides: 2,
      // watchOverflow: true,
      // resizeObserver: true,

      followFinger: false,
      shortSwipes: false,
      longSwipes: false,
      allowTouchMove: false,

      // effect: 'fade',
      // fadeEffect: {
      //   crossFade: true,
      // },

      // effect: 'cube',
      // cubeEffect: {
      //   shadow: false,
      //   slideShadows: false,
      // },

      // effect: 'coverflow',
      // coverflowEffect: {
      //   rotate: -90,
      //   depth: 100,
      //   stretch: 100,
      //   slideShadows: false,
      // },

      on: {
        slideChangeTransitionStart(swiper) {
          swiper.slides.forEach((slide) => slide.classList.add('transition'));
        },

        slideChangeTransitionEnd(swiper) {
          swiper.slides.forEach((slide) =>
            slide.classList.remove('transition')
          );
        },
      },
    });
  }

  if ($bgSlider) {
    bgSlider = new Swiper($bgSlider, {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 800,
      loop: true,
      loopAdditionalSlides: 2,
      watchOverflow: true,
      // resizeObserver: true,

      followFinger: false,
      shortSwipes: false,
      longSwipes: false,
      allowTouchMove: false,

      controller: {
        control: textSlider,
      },

      on: {
        afterInit(swiper) {
          swiper.slides.forEach((slide) => {
            const $player = slide.querySelector('.hero-bg-slide__video');
            const $source = $player && $player.querySelector('video source');
            const src = $source && $source.getAttribute('data-src');

            if ($source) {
              $source.setAttribute('src', src);

              const player = new Plyr($player, {
                controls: [],
                autoplay: true,
                muted: true,
              });

              player.on('ready', () => {
                player.muted = true;
                player.play();
              });

              player.on('ended', () => {
                mainSlider.slideNext();
                mainSlider.autoplay.start();
              });

              const $plyr = $player.closest('.plyr');

              $plyr.player = player;
            }
          });
        },

        slideChangeTransitionEnd(swiper) {
          const $prevPlyr = swiper.slides[swiper.previousIndex].querySelector(
            '.plyr'
          );

          if ($prevPlyr && $prevPlyr.player) {
            $prevPlyr.player.currentTime = 1;
          }

          const $currPlyr = swiper.slides[swiper.activeIndex].querySelector(
            '.plyr'
          );

          if ($currPlyr && $currPlyr.player) {
            console.log('alo');
            mainSlider && mainSlider.autoplay.stop();
            $currPlyr.player.play();
          } else {
            mainSlider && mainSlider.autoplay.start();
          }
        },

        slideChangeTransitionStart(swiper) {
          const $currPlyr = swiper.slides[swiper.activeIndex].querySelector(
            '.plyr'
          );

          if ($currPlyr && $currPlyr.player) {
            $currPlyr.player.pause();
            $currPlyr.player.currentTime = 1;
          }
        },
      },
    });
  }

  if ($mainSlider) {
    const $navigation = document.querySelector('.hero-slider-navigation');
    const $prevEl =
      $navigation && $navigation.querySelector('.button-icon--prev');
    const $nextEl =
      $navigation && $navigation.querySelector('.button-icon--next');
    const $slides = $mainSlider.querySelectorAll('.swiper-slide');
    const delay = +$mainSlider.getAttribute('data-slider-delay') || 4000;

    $slides.forEach((slide, i) =>
      slide.setAttribute('data-count', i + 1 < 10 ? '0' + (i + 1) : i + 1)
    );

    mainSlider = new Swiper($mainSlider, {
      slidesPerView: 3,
      spaceBetween: 8,
      speed: 800,
      loop: true,
      watchOverflow: true,
      slideToClickedSlide: true,
      // resizeObserver: true,

      followFinger: isMobile.matches,
      shortSwipes: isMobile.matches,
      longSwipes: isMobile.matches,
      allowTouchMove: isMobile.matches,

      navigation: {
        prevEl: $prevEl,
        nextEl: $nextEl,
      },

      autoplay: {
        delay: delay,
        disableOnInteraction: false,
      },

      controller: {
        control: bgSlider,
      },

      breakpoints: {
        901: {
          spaceBetween: 20,
        },
      },

      on: {
        afterInit(swiper) {},

        slideChange(swiper) {
          hideUselessSlides(swiper);
        },

        update(swiper) {
          hideUselessSlides(swiper);
        },

        slideChangeTransitionStart(swiper) {
          swiper.slides.forEach((slide) => slide.classList.add('transition'));
        },

        slideChangeTransitionEnd(swiper) {
          swiper.slides.forEach((slide) =>
            slide.classList.remove('transition')
          );
        },
      },
    });
  }
}

function hideUselessSlides(swiper) {
  const $currentSlides = [...swiper.slides].splice(0, swiper.activeIndex);

  swiper.slides.forEach((slide) => slide.classList.remove('hidden'));
  $currentSlides.forEach((slide) => slide.classList.add('hidden'));
}
