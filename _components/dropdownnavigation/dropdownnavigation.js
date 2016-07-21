'use strict';

/**
 * @param {object} options Object containing configuration overrides
 */
export default function ({
    selector: selector = '.fr-nav'
  } = {}) {


  // CONSTANTS
  const doc = document;
  const _q = (el, ctx = doc) => [].slice.call(ctx.querySelectorAll(el));


  // SETUP
  // set accordion element NodeLists
  const containers = _q(selector);


  //  A11Y
  function _addA11y (container) {
    let items = _q('.fr-navitem a', container);
    items.forEach((item, i) => {
      item.setAttribute('id', `item-${i}`);
      item.setAttribute('aria-haspopup', true);
      item.setAttribute('aria-expanded', false);
      item.setAttribute('aria-controls', item.nextSibling.getAttribute('id'));
    })
  }


  //  INIT
  function init () {
    //  cancel if no modals found
    if (!containers.length) return;
    //  loop through available modals
    containers.forEach(container => {
      _addA11y(container);
    });
  }
  init();


  // REVEAL API
  return {
    init
  }
}
