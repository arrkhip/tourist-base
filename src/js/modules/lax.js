// lax_preset_slideY:600:-200 lax_preset_fadeIn:200:0

import lax from 'lax.js';

const isMobile = window.matchMedia('(max-width: 900px)');

if (!isMobile.matches) {
  window.addEventListener('load', init);
}

function init() {
  window.lax = { presets: lax.presets };

  lax.init();

  lax.addDriver('scrollY', (frame) => window.scrollY || 0);

  // lax.addElements('.j_animImg', {
  //   scrollY: {
  //     translateX: [
  //       ['elInY', 'elCenterY'],
  //       [100, 0],

  //       {
  //         ease: 'easeOutBack',
  //       },
  //     ],

  //     opacity: [
  //       ['elInY', 'elCenterY'],
  //       [0, 1],

  //       {
  //         ease: 'easeOutBack',
  //       },
  //     ],
  //   },
  // });
}
