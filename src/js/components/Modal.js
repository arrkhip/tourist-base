import ClassToggler from '@components/ClassToggler';

const _instances = {};

export default class Modal extends ClassToggler {
  constructor(options) {
    // Обязательные опции
    options = Object.assign({}, defaultOptions, options);
    super(options);

    // Кастомные опции (свойства необходимые только для этого класса)
    this._zIndex = 10;

    this.preventCloseOnMouseMove = options.preventCloseOnMouseMove;
    this.openOnLoad =
      this.$el.hasAttribute('data-open-on-load') || options.openOnLoad;
    this.openOnFocus =
      this.$el.hasAttribute('data-open-on-focus') || options.openOnFocus;

    this._isMouseDownTargetEl = false;
    this._isMouseUpTargetNotEl = false;

    this.init();
  }

  init() {
    if (this.openOnLoad) this.open();

    // bind prevent to close by click && mousemove
    if (this.preventCloseOnMouseMove) {
      this.$el.addEventListener('mousedown', (e) => {
        this._isMouseDownTargetEl = e.target !== e.currentTarget;
      });

      this.$el.addEventListener('mouseup', (e) => {
        this._isMouseUpTargetNotEl = e.target === e.currentTarget;

        // check, if target for mousemove after mousedown
        if (this._isMouseDownTargetEl && this._isMouseUpTargetNotEl) {
          return false;
        }

        if (e.target === e.currentTarget) {
          this.close();
        }
      });
    }

    // Esc trigger
    window.addEventListener('keydown', (e) => {
      if (e.defaultPrevented) return;

      const key = e.key || e.keyCode;
      const isEscape = key === 'Escape' || key === 'Esc' || key === 27;

      if (this._isOpen && isEscape) {
        this.close();
      }
    });

    this.$el.modal = this;
    _instances[this.id] = this;
  }

  open(e) {
    super.open(e);

    if (this.openOnFocus) {
      setTimeout(() => this.$el.querySelector('.input').focus(), 100);
    }

    this._incZIndex();
  }

  close(e) {
    super.close(e);

    this._normilizeZIndex();
  }

  _incZIndex() {
    const zIndexArray = [];

    Object.keys(_instances).forEach(
      (key, i) => (zIndexArray[i] = _instances[key]._zIndex)
    );

    const biggestZindex = Math.max.apply(null, zIndexArray);

    this.$el.style.zIndex = biggestZindex + 1;
    this._zIndex = biggestZindex + 1;
  }

  _normilizeZIndex() {
    this.$el.style.zIndex = '';
    this._zIndex = 10;
  }

  static initAll() {
    const $modals = document.querySelectorAll('.j_modal');

    $modals.forEach(($modal) => {
      const id = $modal.getAttribute('id');
      const $triggers = document.querySelectorAll(
        `[data-modal-target="#${id}"]`
      );

      // eslint-disable-next-line no-new
      new Modal({
        id: id,
        $toggleBtns: $triggers,
        $closeBtns: $modal.querySelectorAll('.j_closeModal'),
        $el: $modal,
      });
    });
  }

  static closeAll() {
    for (const id in _instances) {
      _instances[id].close();
    }
  }

  static open(id) {
    _instances[id].open();
  }

  static close(id) {
    _instances[id].close();
  }

  static setCloseCallback(id, callback) {
    _instances[id].closeCallback = callback;
  }

  static setOpenCallback(id, callback) {
    _instances[id].openCallback = callback;
  }
}

const defaultOptions = {
  scrollLock: true,
  openOnLoad: false,
  openOnFocus: false,
  preventCloseOnMouseMove: true,

  closeCallback() {},

  openCallback($target) {},
};

Modal.initAll();

window.Modal = Modal;
