import ClassToggler from './ClassToggler';

export default class Menu extends ClassToggler {
  constructor(options) {
    super(options);
    this.scrollLock = true;
  }
}

const $menu = document.querySelector('.menu-section');
let menu = null;

if ($menu) {
  menu = new Menu({
    $el: $menu,
    $additionalElements: [document.querySelector('.header')],
    $closeBtns: document.querySelectorAll('.j_closeMenu'),
    $openBtns: document.querySelectorAll('.j_openMenu'),
    $toggleBtns: document.querySelectorAll('.j_toggleMenu'),
    closeOnDocumentClick: false,
    noId: true,
  });
}

export { menu };
