'use strict';

// Set Array prototype on NodeList (allows for Array methods on NodeLists)
// https://gist.github.com/paulirish/12fb951a8b893a454b32 (#gistcomment-1487315)
Object.setPrototypeOf(NodeList.prototype, Array.prototype);

/**
 * @param {string} selector The selector to match for tab components
 * @param {object} options Object containing configuration overrides
 */
const Frtabs = function (selector = '.js-fr-tabs', {
		tablistSelector: tablistSelector = '.fr-tabs__tablist',
		activeTabClass: activeTabClass = 'fr-tabs__tab--is-active',
		tabpanelSelector: tabpanelSelector = '.fr-tabs__panel',
		activePanelClass: activePanelClass = 'fr-tabs__panel--is-active',
		tabsReadyClass: tabsReadyClass = 'has-fr-tabs'
	} = {}) {


	// CONSTANTS
	const doc = document;
	const docEl = doc.documentElement;


	// SUPPORTS
	if (!'querySelector' in doc || !'addEventListener' in window || !docEl.classList) return;


	// SETUP
	// set tab element NodeLists
	let tabContainers = doc.querySelectorAll(selector);
	let tabLists = doc.querySelectorAll(tablistSelector);
	let tabListItems = doc.querySelectorAll(tablistSelector + ' li');
	let tabs = doc.querySelectorAll(tablistSelector + ' a');
	let tabpanels = doc.querySelectorAll(tabpanelSelector);


	// UTILS
	// closest: http://clubmate.fi/jquerys-closest-function-and-pure-javascript-alternatives/
	function _closest (el, fn) {
		return el && (fn(el) ? el : _closest(el.parentNode, fn));
	}


	// A11Y
	function _addA11y () {
		// add role="tablist" to ul
		tabLists.forEach((tabList) => {
			tabList.setAttribute('role', 'tablist');
		});

		// add role="presentation" to li
		tabListItems.forEach((tabItem) => {
			tabItem.setAttribute('role', 'presentation');
		});
		
		// add role="tab" and aria-controls to anchor
		tabs.forEach((tab) => {
			tab.setAttribute('role', 'tab');
			tab.setAttribute('aria-controls', tab.hash.substring(1));
		});
		
		// add role="tabpanel" to section
		tabpanels.forEach((tabpanel) => {
			tabpanel.setAttribute('role', 'tabpanel');
			// make first child of tabpanel focusable if available
			if (tabpanel.children) {
				tabpanel.children[0].setAttribute('tabindex', 0);
			}
		});

	}

	function _removeA11y () {
		// remove role="tablist" from ul
		tabLists.forEach((tabList) => {
			tabList.removeAttribute('role');
		});

		// remove role="presentation" from li
		tabListItems.forEach((tabItem) => {
			tabItem.removeAttribute('role');
		});
		
		// remove role="tab" and aria-controls from anchor
		tabs.forEach((tab) => {
			tab.removeAttribute('role');
			tab.removeAttribute('aria-controls');
		});
		
		// remove role="tabpanel" from section
		tabpanels.forEach((tabpanel) => {
			tabpanel.removeAttribute('role');
			// remove first child focusability if present
			if (tabpanel.children) {
				tabpanel.children[0].removeAttribute('tabindex');
			}
		});
	}


	// EVENTS
	function _eventTabClick (e) {
		_showTab(e.target);
		e.preventDefault(); // look into remove id/settimeout/reinstate id as an alternative to preventDefault
	}

	function _eventTabKeydown (e) {
		// collect tab targets, and their parents' prev/next
		let currentTab = e.target;
		let previousTabItem = e.target.parentNode.previousElementSibling;
		let nextTabItem = e.target.parentNode.nextElementSibling;
		let newTabItem;

		// catch left and right arrow key events
		switch (e.keyCode) {
			case 37:
				newTabItem = previousTabItem;
				break;
			case 39:
				newTabItem = nextTabItem;
				break;
			default:
				newTabItem = false
				break;
		}

		// if new next/prev tab available, show it by passing tab anchor to _showTab method
		if (newTabItem) {
			_showTab(newTabItem.querySelector('[role="tab"]'));
		}
	}


	// ACTIONS
	function _showTab (target, giveFocus = true) {
		// get context of tab container and its children
		let thisContainer = _closest(target, (el) => {
			return el.classList.contains(selector.substring(1));
		});
		let siblingTabs = thisContainer.querySelectorAll(tablistSelector + ' a');
		let siblingTabpanels = thisContainer.querySelectorAll(tabpanelSelector);

		// set inactives
		siblingTabs.forEach((tab) => {
			tab.setAttribute('tabindex', -1);
		});
		siblingTabpanels.forEach((tabpanel) => {
			tabpanel.setAttribute('aria-hidden', 'true');
		});
		
		// set actives and focus
		target.setAttribute('tabindex', 0);
		if (giveFocus) target.focus();
		doc.getElementById(target.getAttribute('aria-controls')).removeAttribute('aria-hidden');
	}


	// BINDINGS
	function _bindTabsEvents () {
		// bind all tab click and keydown events
		tabs.forEach((tab) => {
			tab.addEventListener('click', _eventTabClick);
			tab.addEventListener('keydown', _eventTabKeydown);
		});
	}

	function _unbindTabsEvents () {
		// unbind all tab click and keydown events
		tabs.forEach((tab) => {
			tab.removeEventListener('click', _eventTabClick);
			tab.removeEventListener('keydown', _eventTabKeydown);
		});
	}


	// DESTROY
	function destroy () {
		_removeA11y();
		_unbindTabsEvents();
		docEl.classList.remove(tabsReadyClass);
	}


	// INIT
	function init () {
		if (tabContainers.length) {
			_addA11y();
			_bindTabsEvents();
			// set all first tabs active on init
			tabContainers.forEach((tabContainer) => {
				_showTab(tabContainer.querySelector(tablistSelector + ' a'), false);
			});
			docEl.classList.add(tabsReadyClass);
		}
	}


	// REVEAL API
	return {
		init,
		destroy
	}

}


// module exports
export default Frtabs;
