'use strict';

// Polyfill matches as per https://github.com/jonathantneal/closest
Element.prototype.matches = Element.prototype.matches ||
              Element.prototype.mozMatchesSelector ||
              Element.prototype.msMatchesSelector ||
              Element.prototype.oMatchesSelector ||
              Element.prototype.webkitMatchesSelector;

/**
 * @param {object} options Object containing configuration overrides
 */
const Frtabs = function ({
    selector: selector = '.js-fr-tabs',
    tablistSelector: tablistSelector = '.js-fr-tabs__tablist',
    tabpanelSelector: tabpanelSelector = '.js-fr-tabs__panel',
    tabsReadyClass: tabsReadyClass = 'fr-tabs--is-ready'
  } = {}) {


  // CONSTANTS
  const doc = document;
  const docEl = doc.documentElement;
  const _q = (el, ctx = doc) => [].slice.call(ctx.querySelectorAll(el));


  // SUPPORTS
  if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;


  // SETUP
  // set tab element NodeList
  let tabContainers = _q(selector);


  //  UTILS
  function _closest (el, selector) {
    while (el) {
      if (el.matches(selector)) break;
      el = el.parentElement;
    }
    return el;
  }


  // A11Y
  function _addA11y (tabContainer) {
    // get tab elements
    const tabLists = _q(tablistSelector, tabContainer);
    const tabListItems = _q(tablistSelector + ' li', tabContainer);
    const tabs = _q(tablistSelector + ' a', tabContainer);
    const tabpanels = _q(tabpanelSelector, tabContainer);

    // add roles, properties, states
    tabLists.forEach((tabList) => {
      tabList.setAttribute('role', 'tablist');
    });

    tabListItems.forEach((tabItem) => {
      tabItem.setAttribute('role', 'presentation');
    });

    tabs.forEach((tab) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', tab.hash.substring(1));
    });

    tabpanels.forEach((tabpanel, i) => {
      tabpanel.setAttribute('role', 'tabpanel');
      tabpanel.setAttribute('aria-labelledby', tabs[i].id);
      // make first child of tabpanel focusable if available
      tabpanel.setAttribute('tabindex', 0);
    });
  }
  function _removeA11y (tabContainer) {
    // get tab elements
    const tabLists = _q(tablistSelector, tabContainer);
    const tabListItems = _q(tablistSelector + ' li', tabContainer);
    const tabs = _q(tablistSelector + ' a', tabContainer);
    const tabpanels = _q(tabpanelSelector, tabContainer);

    // remove roles, properties, states
    tabLists.forEach((tabList) => {
      tabList.removeAttribute('role');
    });

    tabListItems.forEach((tabItem) => {
      tabItem.removeAttribute('role');
    });

    tabs.forEach((tab) => {
      tab.removeAttribute('role');
      tab.removeAttribute('aria-controls');
      tab.removeAttribute('aria-selected');
      tab.removeAttribute('tabindex');
    });

    tabpanels.forEach((tabpanel) => {
      tabpanel.removeAttribute('role');
      tabpanel.removeAttribute('aria-hidden');
      tabpanel.removeAttribute('aria-labelledby');
      // remove first child focusability if present
      tabpanel.removeAttribute('tabindex');
    });
  }


  // ACTIONS
  function _showTab (target, giveFocus = true) {
    // get context of tab container
    let thisContainer = _closest(target, selector);
    let siblingTabs = _q(tablistSelector + ' a', thisContainer);
    let siblingTabpanels = _q(tabpanelSelector, thisContainer);

    // set inactives
    siblingTabs.forEach((tab) => {
      tab.setAttribute('tabindex', -1);
      tab.removeAttribute('aria-selected');
    });
    siblingTabpanels.forEach((tabpanel) => {
      tabpanel.setAttribute('aria-hidden', 'true');
    });

    // set actives and focus
    target.setAttribute('tabindex', 0);
    target.setAttribute('aria-selected', 'true');
    if (giveFocus) target.focus();
    doc.getElementById(target.getAttribute('aria-controls')).removeAttribute('aria-hidden');
  }


  // EVENTS
  function _eventTabClick (e) {
    _showTab(e.target);
    e.preventDefault(); // look into remove id/settimeout/reinstate id as an alternative to preventDefault
  }

  function _eventTabKeydown (e) {
    // collect tab targets, and their parents' prev/next (or first/last)
    let currentTab = e.currentTarget;
    let tablist = _closest(currentTab, tablistSelector);
    let previousTabItem = currentTab.parentNode.previousElementSibling || tablist.lastElementChild;
    let nextTabItem = currentTab.parentNode.nextElementSibling || tablist.firstElementChild;

    // don't catch key events when ⌘ or Alt modifier is present
    if (e.metaKey || e.altKey) return;

    // catch left/right and up/down arrow key events
    // if new next/prev tab available, show it by passing tab anchor to _showTab method
    switch (e.keyCode) {
      case 37:
      case 38:
        _showTab(_q('[role="tab"]', previousTabItem)[0]);
        e.preventDefault();
        break;
      case 39:
      case 40:
        _showTab(_q('[role="tab"]', nextTabItem)[0]);
        e.preventDefault();
        break;
      default:
        break;
    }
  }


  // BINDINGS
  function _bindTabsEvents (tabContainer) {
    const tabs = _q(tablistSelector + ' a', tabContainer);
    // bind all tab click and keydown events
    tabs.forEach((tab) => {
      tab.addEventListener('click', _eventTabClick);
      tab.addEventListener('keydown', _eventTabKeydown);
    });
  }

  function _unbindTabsEvents (tabContainer) {
    const tabs = _q(tablistSelector + ' a', tabContainer);
    // unbind all tab click and keydown events
    tabs.forEach((tab) => {
      tab.removeEventListener('click', _eventTabClick);
      tab.removeEventListener('keydown', _eventTabKeydown);
    });
  }


  // DESTROY
  function destroy () {
    tabContainers.forEach((tabContainer) => {
      _removeA11y(tabContainer);
      _unbindTabsEvents(tabContainer);
      tabContainer.classList.remove(tabsReadyClass);
    });
  }


  // INIT
  function init () {
    if (tabContainers.length) {
      tabContainers.forEach((tabContainer) => {
        _addA11y(tabContainer);
        _bindTabsEvents(tabContainer);
        // set all first tabs active on init
        _showTab(_q(tablistSelector + ' a', tabContainer)[0], false);
        // set ready style hook
        tabContainer.classList.add(tabsReadyClass);
      });
    }
  }
  init();


  // REVEAL API
  return {
    init,
    destroy
  }
}


// module exports
export default Frtabs;
