import Helper from '@helpers/Helper';

class Header {
  constructor($header) {
    this.$header = $header;
    this.currentScroll = window.pageYOffset;

    this._isHidden = this.$header.classList.contains('hidden');

    this._init();
  }

  _init() {
    if (!this.$header) return false;

    // document.addEventListener('DOMContentLoaded', () => this.checkDevice());

    window.addEventListener('scroll', () =>
      this.checkPosition(window.pageYOffset)
    );

    window.addEventListener('load', () =>
      this.checkPosition(window.pageYOffset)
    );
  }

  checkPosition(position) {
    position !== 0
      ? this.$header.classList.add('fixed')
      : this.$header.classList.remove('fixed');

    this.currentScroll = window.pageYOffset;
  }

  checkDevice() {
    if (document.body.clientHeight >= window.innerHeight) {
      if (Helper.isMobileOrTablet()) {
        document.body.classList.add('touch-device');
      } else if ($header.offsetWidth === window.innerWidth) {
        this.$header.style.paddingRight = `${Helper.getScrollBarWidth()}px`;
      }
    }
  }

  hide() {
    if (this._isHidden) return false;
    this.$header.classList.add('hidden');
    this._isHidden = true;
  }

  show() {
    if (!this._isHidden) return false;
    this.$header.classList.remove('hidden');
    this._isHidden = false;
  }
}

const $header = document.querySelector('.header');

let header = null;

if ($header) header = new Header($header);

export { header };

window.header = header;
