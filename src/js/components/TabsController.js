const _instances = {};

const isMobile = window.matchMedia('(max-width: 900px)');

export default class TabsController {
  constructor(options) {
    this.id = options.id;
    this.$triggersWrap = options.$triggersWrap;
    this.$elsWrap = options.$elsWrap;
    this.$triggers = options.$triggers;
    this.$els = options.$els;
    this.$additionalEls = options.$additionalEls || [];
    this.$state = options.$state;

    this.isTypeCheckbox = options.isTypeCheckbox || false;
    this.$activeTabOnLoad =
      this.$triggers.find(($trigger) =>
        $trigger.classList.contains('active')
      ) || this.$triggers[0];

    this.init();
  }

  init() {
    _instances[this.id] = this;

    this.$triggers.forEach(($trigger) => {
      $trigger.addEventListener('click', () => {
        if (this.isTypeCheckbox) {
          const $checkbox = $trigger.querySelector('input[type=checkbox]');
          if ($trigger.classList.contains('active') && !$checkbox.checked) {
            const $allowTab = [...this.$triggers].find(($trigger) =>
              $trigger.querySelector('input[type=checkbox]:checked')
            );
            if ($allowTab) {
              this.open($allowTab);
            } else {
              this.close($trigger);
            }

            return false;
          }
        }

        this.open($trigger);
      });
    });

    window.addEventListener('resize', () => {
      const $activeTrigger = this.$triggers.find(($trigger) =>
        $trigger.classList.contains('active')
      );

      if ($activeTrigger) this.setState($activeTrigger);
    });

    this.open(this.$activeTabOnLoad);
  }

  open($trigger) {
    if (this.isTypeCheckbox) {
      const $checkbox = $trigger.querySelector('input[type=checkbox]');
      if (!$checkbox.checked) return false;
    }

    const id = $trigger.getAttribute('data-tab');

    this.$triggers.forEach(($trigger) => {
      $trigger.classList.remove('active');
    });

    this.$additionalEls.forEach(($additionalEl) => {
      $additionalEl.classList.remove('active');
    });

    $trigger.classList.add('active');

    this.setState($trigger);

    this.$els.forEach(($el, i) => {
      const $wrap = $el.closest('[data-tabs-contents]');

      if (this.$elsWrap !== $wrap) return;

      const isCurrent = $el.getAttribute('data-tab-content') === id;

      if (isCurrent) {
        $el.classList.add('active');
        // this.$additionalEls[i].classList.add('active');
      } else {
        $el.classList.remove('active');
        // this.$additionalEls[i].classList.remove('active');
      }
    });
  }

  close($trigger) {
    const id = $trigger.getAttribute('data-tab');
    const $activeEl = this.$els.find(
      ($el) => $el.getAttribute('data-tab-content') === id
    );

    $trigger.classList.remove('active');
    $activeEl.classList.remove('active');
  }

  setState($trigger) {
    const $wrap = this.$triggersWrap.querySelector('.tabs__wrap');

    if (!this.$state || !$wrap) return false;

    const rectTrigger = $trigger.getBoundingClientRect();
    const rectWrap = $wrap.getBoundingClientRect();

    const offset = isMobile.matches ? 15 : 0;
    const left = rectTrigger.left - rectWrap.left + offset;
    const width = rectTrigger.width;

    this.$state.style.left = left + 'px';
    this.$state.style.width = width + 'px';
    this.$state.style.opacity = 1;
  }

  static open(instanceId, $trigger) {
    _instances[instanceId].open($trigger);
  }

  static initAll() {
    const $triggersWraps = document.querySelectorAll('[data-tabs]');

    $triggersWraps.forEach(($triggersWrap) => {
      const id = $triggersWrap.getAttribute('data-tabs');
      const $state = $triggersWrap.querySelector(`[data-tab-state="${id}"]`);
      const isTypeCheckbox = $triggersWrap.hasAttribute('data-tabs-checkbox');
      const $triggers = $triggersWrap.querySelectorAll('[data-tab]');
      const $elsWrap = document.querySelector(`[data-tabs-contents="${id}"]`);
      if (!$elsWrap) return false;
      const $els = $elsWrap.querySelectorAll('[data-tab-content]');
      // const $additionalElsWrap = document.querySelector(
      //   `[data-tabs-additional="${id}"]`
      // );
      // const $additionalEls = $additionalElsWrap.querySelectorAll(`[data-tab]`);

      // eslint-disable-next-line no-new
      new TabsController({
        id: id,
        $state,
        isTypeCheckbox,
        $triggersWrap,
        $elsWrap,
        $triggers: [...$triggers],
        $els: [...$els],
        // $additionalEls,
      });
    });
  }
}

TabsController.initAll();

window.TabsController = TabsController;
