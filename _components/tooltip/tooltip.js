'use strict';

import { q, defer } from 'frend-utils'

/**
 * @param {object} options Object containing configuration overrides
 */
const Frtooltip = function ({
    selector: selector = '.js-fr-tooltip',
    tooltipSelector: tooltipSelector = '.js-fr-tooltip-tooltip',
    toggleSelector: toggleSelector = '.js-fr-tooltip-toggle',
    tooltipIdPrefix: tooltipIdPrefix = 'tooltip',
    readyClass: readyClass = 'fr-tooltip--is-ready'
  } = {}) {


  // CONSTANTS
  const doc = document;
  const docEl = doc.documentElement;


  // SUPPORTS
  if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;


  // SETUP
  let containers = q(selector);
  // TEMP
  let currTooltip = null;
  let currToggle = null;


  //  A11Y
  function _addA11y (container, i) {
    //  get relative elements
    let toggle = q(toggleSelector, container)[0];
    let tooltip = q(tooltipSelector, container)[0];
    //  create new button and replace toggle
    toggle.setAttribute('tabindex', 0);
    toggle.setAttribute('aria-describedby', `${tooltipIdPrefix}-${i}`);
    //  add tooltip attributes
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('id', `${tooltipIdPrefix}-${i}`);
    tooltip.setAttribute('aria-hidden', 'true');
  }
  function _removeA11y (container) {
    //  get relative elements
    let toggle = q(toggleSelector, container)[0];
    let tooltip = q(tooltipSelector, container)[0];
    //  create new button and replace toggle
    toggle.removeAttribute('tabindex');
    toggle.removeAttribute('aria-describedby');
    //  add tooltip attributes
    tooltip.removeAttribute('role');
    tooltip.removeAttribute('id');
    tooltip.removeAttribute('aria-hidden');
  }


  // ACTIONS
  function _toggleTooltipState (state) {
    //  set visible state
    currTooltip.setAttribute('aria-hidden', state);
  }


  // EVENTS
  function _eventFocus (e) {
    //  get relevant tooltip elements
    currToggle = e.currentTarget;
    currTooltip = currToggle.nextElementSibling;
    //  show tooltip
    _toggleTooltipState(false);
    defer(_bindToggleBlur);
    defer(_bindDocKey)
  }
  function _eventBlur () {
    _toggleTooltipState(true);
    defer(_unbindToggleBlur);
  }
  function _eventDocKey (e) {
    //  esc key
    if (e.keyCode === 27) {
      _toggleTooltipState(true);
      defer(_unbindToggleBlur);
    }
  }


  // BIND EVENTS
  function _bindToggleFocus (toggle = currToggle) {
    toggle.addEventListener('focus', _eventFocus);
    toggle.addEventListener('mouseenter', _eventFocus);
  }
  function _bindToggleBlur () {
    currToggle.addEventListener('blur', _eventBlur);
    currToggle.addEventListener('mouseleave', _eventBlur);
  }
  function _bindDocKey () {
    doc.addEventListener('keydown', _eventDocKey);
  }


  //  UNBIND EVENTS
  function _unbindToggleFocus (toggle = currToggle) {
    toggle.removeEventListener('focus', _eventFocus);
    toggle.removeEventListener('mouseenter', _eventFocus);
  }
  function _unbindToggleBlur (toggle = currToggle) {
    toggle.removeEventListener('blur', _eventBlur);
    toggle.removeEventListener('mouseleave', _eventBlur);
  }
  function _unbindDocKey () {
    doc.removeEventListener('keydown', _eventDocKey);
  }


  // INIT
  function init () {
    if (!containers) return;
    //  loop through each tooltip element
    containers.forEach((container, i) => {
      let toggle = q(toggleSelector, container)[0];
      _addA11y(container, i);
      _bindToggleFocus(toggle);
      container.classList.add(readyClass);
    });
  }
  //  DESTORY
  function destroy () {
    containers.forEach((container) => {
      let toggle = q(toggleSelector, container)[0];
      _removeA11y(container);
      _unbindToggleFocus(toggle);
      container.classList.remove(readyClass);
    });
    //  unbind global events
    _unbindDocKey();
    //  reset temp references
    currToggle = null;
    currTooltip = null;
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
