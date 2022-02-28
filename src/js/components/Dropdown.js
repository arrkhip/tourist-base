import ClassToggler from '@components/ClassToggler';
// import DropdownSearch from '@components/DropdownSearch';

const _instances = {};

export default class Dropdown extends ClassToggler {
  constructor(options) {
    options = Object.assign({}, defaultOptions, options);
    super(options);

    this.$select = this.$el.querySelector('select') || null;
    this.$title = this.$el.querySelector('[data-placeholder]') || null;
    this.$content = this.$el.querySelector('.dropdown__content') || null;
    this.$list = this.$el.querySelector('.dropdown__list') || null;
    this.$items = this.$list.querySelectorAll('input') || null;
    this.$search = this.$el.querySelector('[data-dropdown-search]') || null;

    this.placeholder = this.$title
      ? this.$title.getAttribute('data-placeholder')
      : '';
    this.titleTemplate = this.$el.getAttribute('data-title-template') || '';
    this.$selected = [];
    this.values = [];

    this._isSelect = this.$select && this.$list;

    this._isSoloSelect = this.$items[0].type === 'radio';

    this.init();
  }

  init() {
    if (this._isSelect) this.initSelectMode();
    // if (this.$search) {
    //   this.search = new DropdownSearch(this.$search, this);
    // }

    this.detectPosition();

    this.$el.dropdown = this;
    _instances[this.id] = this;
  }

  initSelectMode() {
    this.checkSelected();
    this.$list.addEventListener('click', this.checkSelected.bind(this));
    this._isSelect = true;
  }

  checkSelected(e) {
    // <label> дублирует event
    if (e && e.target.checked === undefined) return false;

    this.getSelected();

    if (this.$selected.length) {
      this.selectValues();
      this.setSelectedTitle();
      this.$el.classList.add('selected');
    } else {
      this.setDefaultTitle();
      this.$el.classList.remove('selected');
    }
  }

  getSelected() {
    this.$selected = [...this.$items].filter(($item) => $item.checked);
  }

  selectValues() {
    this.values = this.$selected.map(($item) => $item.value);
    this.$select.options.forEach(($option) => ($option.selected = false));
    this.values.forEach((value) => {
      const $option = this.$select.querySelector(`[value="${value}"]`);
      $option.selected = true;
    });
  }

  setSelectedTitle() {
    // const selectedText = [...this.$select.selectedOptions].map(
    //   ($option) => $option.textContent
    // );
    // this.text = selectedText.join(', ');

    if (this._isSoloSelect) {
      this.text = this.titleTemplate.replace(
        '$',
        `${this.$select.selectedOptions[0].textContent}`
      );
    } else {
      this.text = this.titleTemplate.replace(
        '$',
        `<b>${this.$select.selectedOptions.length}</b>`
      );
    }

    this.$title.innerHTML = this.text;
  }

  setDefaultTitle() {
    this.$title.innerHTML = this.placeholder;
  }

  detectPosition() {
    const coords = this.$content.getBoundingClientRect();
    const right = coords.right + window.pageXOffset;
    const bottom = coords.bottom + window.pageYOffset;
    const distX = right - document.body.offsetWidth;
    const distY = bottom - document.body.offsetHeight;

    if (distX > 0) {
      this.togglePosition('left', 'right');
    } else {
      this.togglePosition('right', 'left');
    }

    if (distY > 0) {
      this.togglePosition('top', 'bottom');
    } else {
      this.togglePosition('bottom', 'top');
    }
  }

  togglePosition(removedPosition, addedPosition) {
    this.$content.classList.remove(`dropdown__content--${removedPosition}`);
    this.$content.classList.add(`dropdown__content--${addedPosition}`);
  }

  static initAll() {
    const $dropdowns = document.querySelectorAll('.j_dropdown');

    $dropdowns.forEach(($dropdown) => {
      const id = $dropdown.getAttribute('id');

      // eslint-disable-next-line no-new
      new Dropdown({
        id: id,
        $toggleBtns: $dropdown.querySelectorAll('.j_toggleDropdown'),
        $openBtns: $dropdown.querySelectorAll('.j_openDropdown'),
        $closeBtns: $dropdown.querySelectorAll('.j_closeDropdown'),
        $el: $dropdown,
      });
    });

    this.resizeHandler();
  }

  static resizeHandler() {
    window.addEventListener('resize', () => {
      for (const id in _instances) {
        _instances[id].detectPosition();
      }
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
  closeOnDocumentClick: true,
};

Dropdown.initAll();

window.Dropdown = Dropdown;
