
/**
 * @param {object} options Object containing configuration overrides
 */
const Frtooltip = function ({
    selector: selector = '.js-fr-toggle',
    contentSelector: contentSelector = '.js-fr-toggle-content',
    buttonSelector: buttonSelector = '.js-fr-toggle-button',
    toggleIdPrefix: toggleIdPrefix = 'toggle',
    readyClass: readyClass = 'fr-toggle--is-ready'
  } = {}) {


  // CONSTANTS
  const doc = document;
  const docEl = doc.documentElement;
  const _q = (el, ctx = doc) => [].slice.call(ctx.querySelectorAll(el));


  // SETUP
  let containers = _q(selector);


  // SUPPORTS
  if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;


  //  A11Y
  function _addA11y (container, i) {
    //  get relative elements
    let button = _q(buttonSelector, container)[0];
    let content = _q(contentSelector, container)[0];
    //  create new button and replace toggle
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', content.getAttribute('id'));
    //  add tooltip attributes
    content.setAttribute('id', `${toggleIdPrefix}-${i}`);
    content.setAttribute('aria-hidden', 'true');
    content.setAttribute('aria-labelledby', button.getAttribute('id'));
  }
  function _removeA11y (container) {
    //  get relative elements
    let button = _q(buttonSelector, container)[0];
    let content = _q(contentSelector, container)[0];
    //  create new span and replace toggle
    button.removeAttribute('aria-expanded');
    button.removeAttribute('aria-controls');
    //  remove tooltip attributes
    content.removeAttribute('id');
    content.removeAttribute('aria-hidden');
    content.removeAttribute('aria-labelledby');
  }


  // ACTIONS
  function _showContent (button, content) {
    //  set visible state
    button.setAttribute('aria-expanded', 'true');
    content.setAttribute('aria-hidden', 'false');
  }
  function _hideContent (button, content) {
    //  set hidden state
    button.setAttribute('aria-expanded', 'false');
    content.setAttribute('aria-hidden', 'true');
  }


  // EVENTS
  function _eventButtonPointer (e) {
    //  get relevant tooltip elements
    let button = e.currentTarget;
    let content = button.nextElementSibling;
    //  show or hide if toggle is 'expanded'
    if (button.getAttribute('aria-expanded') === 'false') {
      _showContent(button, content);
    } else {
      _hideContent(button, content);
    }
  }


  // BIND EVENTS
  function _bindButtonPointer (container) {
    const button = _q(buttonSelector, container)[0];
    button.addEventListener('click', _eventButtonPointer);
  }
  function _unbindButtonPointer (container) {
    const button = _q(buttonSelector, container)[0];
    button.removeEventListener('click', _eventButtonPointer);
  }


  // INIT
  function init () {
    if (!containers) return;
    //  loop through each tooltip element
    containers.forEach((container, i) => {
      _addA11y(container, i);
      _bindButtonPointer(container);
      container.classList.add(readyClass);
    });
  }
  //  DESTROY
  function destroy () {
    containers.forEach((container, i) => {
      _removeA11y(container, i);
      _unbindButtonPointer(container);
      container.classList.remove(readyClass);
    });
  }
  init();


  // REVEAL API
  return {
    init,
    destroy
  }
}


// module exports
export default Frtooltip;