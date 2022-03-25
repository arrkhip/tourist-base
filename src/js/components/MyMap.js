import Panzoom from '@panzoom/panzoom/dist/panzoom.min';
import { initHouseTippy, initRegionTippy } from '@modules/tooltip';

const mapData = window.mapData;
const isMobile = window.matchMedia('(max-width: 900px)');

export default class MyMap {
  constructor($el) {
    this.$el = $el;
    this.$svg = this.$el.querySelector('.map__svg-wrapper');
    this.$section = this.$el.closest('section') || this.$el.closest('body');
    this.panzoom = null;

    this.$houseTooltips = [];
    this.$regionTooltips = [];

    this.controls = {
      $zoomIn: this.$section.querySelector('.j_mapZoomIn'),
      $zoomOut: this.$section.querySelector('.j_mapZoomOut'),
    };

    this.opts = {
      contain: 'outside',
      startScale: isMobile.matches ? 2.2 : 1,
      minScale: isMobile.matches ? 2.2 : 1,
      maxScale: isMobile.matches ? 6 : 1,
      step: 0.6,
      cursor: '',
    };

    this.init();
  }

  init() {
    this.setNamesForRegions();

    this.panzoom = Panzoom(this.$svg, this.opts);

    if (isMobile.matches) {
      this.$svg.parentElement.addEventListener(
        'wheel',
        this.panzoom.zoomWithWheel
      );
    }

    this.controls.$zoomIn &&
      this.controls.$zoomIn.addEventListener(
        'click',
        this.panzoom.zoomIn.bind(this)
      );
    this.controls.$zoomOut &&
      this.controls.$zoomOut.addEventListener(
        'click',
        this.panzoom.zoomOut.bind(this)
      );

    this.$regionTooltips = this.$svg.querySelectorAll('path[name]');

    this.setClassesForTooltipsTriggers();

    initHouseTippy(this.$houseTooltips);
    initRegionTippy(this.$regionTooltips, this.$section);
  }

  setNamesForRegions() {
    for (const key in mapData.regions) {
      const d = mapData.regions[key].path;
      const $path = this.$svg.querySelector(`[d^="${d}"]`);

      $path && $path.setAttribute('name', key);
    }
  }

  setClassesForTooltipsTriggers() {
    this.$houseTooltips = [];

    for (const key in mapData.houses) {
      const d = mapData.houses[key].path;
      const $path = this.$svg.querySelector(`[d^="${d}"]`);

      if ($path) {
        $path._data = mapData.houses[key].data;
        $path.classList.add('tooltip-trigger');
        $path.setAttribute('data-tooltip-id', key);

        this.$houseTooltips.push($path);
      }
    }
  }
}

const $el = document.querySelector('.j_panzoom');

if ($el) {
  const myMap = new MyMap($el);
}
