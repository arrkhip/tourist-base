import tippy, { followCursor, hideAll } from 'tippy.js';
import Helper from '@helpers/Helper';

const renderTemplate = (instance) => {
  const $container = instance.popper.querySelector('.tippy__container');
  const data = instance.reference._data;

  if ($container && data && Object.keys(data).length !== 0) {
    const htmlItems = '';
    let htmlData = '';

    htmlData = balloonTemplate(data);

    $container.innerHTML = htmlData;
  } else {
    setTimeout(instance.hide.bind(instance), 0);
  }
};

const balloonItemTemplate = ({ key, value }) => `
<div>
  <dt> ${key} </dt>
  <dd> ${value} </dd>
</div>
`;

const balloonTemplate = ({
  src = '',
  title = '',
  list = [],
  btn1 = { name: '', href: '' },
  btn2 = { name: '', href: '' },
}) => {
  let balloonListTemplate = '';

  if (list.length) {
    list.forEach((item) => {
      balloonListTemplate += balloonItemTemplate(item);
    });
  }

  return `
  <div class="balloon">
    <div class="balloon__wrap">
      <div class="balloon__img-wrapper">
        <img src="${src}" class="balloon__img">
      </div>
  
      <div class="balloon__content">
        <span class="balloon__title">
          ${title}
        </span>

        <dl class="balloon__list">
          ${balloonListTemplate}
        </dl>
  
        <div class="balloon__buttons">
          <a href="${btn1.href}" class="button button--small">
            ${btn1.name}
          </a>
  
          <a href="${btn2.href}" class="button button--invert button--small">
            ${btn2.name}
          </a>
        </div>
      </div>
    </div>
  </div>
  `;
};

const showActiveState = (instance) => {
  const ref = instance.reference;

  ref.style.fill = 'transparent';
  ref.nextElementSibling.style.fill = 'transparent';
  ref.nextElementSibling.nextElementSibling.style.fill = 'var(--white)';
  ref.nextElementSibling.nextElementSibling.nextElementSibling.style.opacity =
    '0';
};

const hideActiveState = (instance) => {
  const ref = instance.reference;

  ref.style.fill = '';
  ref.nextElementSibling.style.fill = '';
  ref.nextElementSibling.nextElementSibling.style.fill = '';
  ref.nextElementSibling.nextElementSibling.nextElementSibling.style.opacity =
    '';
};

export const initHouseTippy = ($triggers, appendTo = document.body) => {
  // map
  tippy($triggers, {
    content(ref) {
      const $template = document.querySelector(
        '[data-tippy-template="tooltip-balloon"]'
      );
      return $template.innerHTML;
    },
    trigger: 'click',
    interactive: true,
    allowHTML: true,
    appendTo: appendTo,
    zIndex: 9,

    onShow(instance) {
      hideAll({ duration: 0 });
      renderTemplate(instance);
      showActiveState(instance);
    },
    onHide(instance) {
      hideActiveState(instance);
    },
  });
};

export const initRegionTippy = ($triggers, appendTo = document.body) => {
  // map
  tippy($triggers, {
    content: (ref) => `
    <div class="tooltip-region"> 
      <span>
        ${ref.getAttribute('name')}
      </span>
    </div>
    `,

    allowHTML: true,
    appendTo: appendTo,
    zIndex: 9,
    followCursor: true,
    hideOnClick: true,

    plugins: [followCursor],
  });

  // custom
  // const $customTooltips = document.querySelectorAll('[data-tippy-custom]');
  // if ($customTooltips.length) {
  //   tippy('[data-tippy-custom]', {
  //     content(ref) {
  //       const id = ref.getAttribute('data-tippy-custom');
  //       const template = document.querySelector(
  //         `[data-tippy-template="${id}"]`
  //       );
  //       return template.innerHTML;
  //     },

  //     allowHTML: true,
  //     interactive: true,
  //     appendTo: document.body,
  //     trigger: 'click',

  //     // onShow(instance) {
  //     //   setPos(instance);
  //     //   initClickHandler(instance);
  //     //   renderTemplate(instance);
  //     // },
  //   });
  // }
};

// window.addEventListener('load', initTippy);
