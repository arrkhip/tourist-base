import Mark from 'mark.js/dist/mark.es6.min';

export default class DropdownSearch {
  constructor($search, dropdown) {
    this.$search = $search;
    this.dropdown = dropdown;
    this.$clean = this.dropdown.$el.querySelector('.input__clear') || null;
    this.$subtitles =
      this.dropdown.$list.querySelectorAll('[data-dropdown-subtitle]') || [];

    this.mark = new Mark(this.dropdown.$list);

    this.init();
  }

  init() {
    this.$search.addEventListener('input', this.search.bind(this));

    if (this.$clean) {
      this.$clean.addEventListener('click', this.clean.bind(this));
    }
  }

  search() {
    const value = this.$search.value;

    this.mark.unmark();

    if (value.length) {
      this.hideAllItems();

      this.mark.mark(value, {
        each: ($mark) => {
          const $item = $mark.closest('.dropdown__item') || null;

          if ($item) {
            const values = $item.getAttribute('data-dropdown-subtitle') || '';

            if ($item.classList.contains('hidden')) {
              $item.classList.remove('hidden');
            }

            if (values.length) {
              const valuesArr = values.split(',');
              const $currentInputs = valuesArr.map((value) =>
                this.dropdown.$list.querySelector(
                  `.dropdown__item input[value="${value}"]`
                )
              );

              $currentInputs.forEach(($currentInput) => {
                const $currentItem = $currentInput.closest('.dropdown__item');
                $currentItem.classList.remove('hidden');
              });
            }
          }
        },
      });

      if (this.$subtitles.length) {
        // const $lis = this.dropdown.$list.querySelectorAll('.dropdown__item') || [];
        // if ($lis.length) {
        //   $lis.forEach($li => {

        //   })
        // }

        this.$subtitles.forEach(($subtitle) => {
          const values = $subtitle.getAttribute('data-dropdown-subtitle');

          const valuesArr = values.split(',');
          const $currentInputs = valuesArr.filter((value) =>
            this.dropdown.$list.querySelector(
              `.dropdown__item:not(.hidden) input[value="${value}"]`
            )
          );

          if ($currentInputs.length) {
            $subtitle.classList.remove('hidden');
          }
        });
      }
    } else {
      this.showAllItems();
    }
  }

  clean() {
    this.$search.value = '';

    this.search();
  }

  hideAllItems() {
    const $items = this.dropdown.$list.querySelectorAll('.dropdown__item');
    $items.forEach(($item) => $item.classList.add('hidden'));
  }

  showAllItems() {
    const $items = this.dropdown.$list.querySelectorAll('.dropdown__item');
    $items.forEach(($item) => $item.classList.remove('hidden'));
  }

  static initAll() {
    const $searches = document.querySelectorAll(
      '.j_dropdown .j_dropdown-search'
    );
    if ($searches.length) {
      $searches.forEach(($search) => new DropdownSearch($search));
    }
  }
}

// DropdownSearch.initAll();
// window.DropdownSearch = DropdownSearch;
