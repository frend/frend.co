'use strict';

// Move Array prototype to NodeList (allows for Array methods on NodeLists)
// https://gist.github.com/paulirish/12fb951a8b893a454b32 (#gistcomment-1487315)
Object.setPrototypeOf(NodeList.prototype, Array.prototype);

/**
 * @param {string} selector The selector to match for tab components
 * @param {object} options Object containing configuration overrides
 */
let Frtabs = function (selector = '.js-fr-tabs', {
		tablistSelector: tablistSelector = '.fr-tabs__tablist',
		activeTabClass: activeTabClass = 'fr-tabs__tab--is-active',
		tabpanelSelector: tabpanelSelector = '.fr-tabs__panel',
		activePanelClass: activePanelClass = 'fr-tabs__panel--is-active',
		tabsReadyClass: tabsReadyClass = 'has-fr-tabs',
		useHash: useHash = false
	} = {}) {


	// CONSTANTS
	const doc = document;
	const docEl = doc.documentElement;


	// SUPPORTS
	if (!'querySelector' in document || !'addEventListener' in window || !docEl.classList) return;


	// SETUP
	// set tab element NodeLists
	let tabContainers = doc.querySelectorAll(selector);
	let tabLists = doc.querySelectorAll(tablistSelector);
	let tabListItems = doc.querySelectorAll(tablistSelector + ' li');
	let tabs = doc.querySelectorAll(tablistSelector + ' a');
	let tabpanels = doc.querySelectorAll(tabpanelSelector);


	// PRIVATE METHODS
	// a11y
	function _addA11y () {
		// add role="tablist" to ul
		for (let tabList of tabLists) {
			tabList.setAttribute('role', 'tablist');
		};

		// add role="presentation" to li
		for (let tabItem of tabListItems) {
			tabItem.setAttribute('role', 'presentation');
		};
		
		// add role="tab" and aria-controls to anchor
		for (let tab of tabs) {
			tab.setAttribute('role', 'tab');
			tab.setAttribute('aria-controls', tab.hash.substring(1));
		};
		
		// add role="tabpanel" to section
		for (let tabpanel of tabpanels) {
			tabpanel.setAttribute('role', 'tabpanel');
		};
	}

	function _removeA11y () {
		// remove role="tablist" from ul
		for (let tabList of tabLists) {
			tabList.removeAttribute('role');
		};

		// remove role="presentation" from li
		for (let tabItem of tabListItems) {
			tabItem.removeAttribute('role');
		};
		
		// remove role="tab" and aria-controls from anchor
		for (let tab of tabs) {
			tab.removeAttribute('role');
			tab.removeAttribute('aria-controls');
		};
		
		// remove role="tabpanel" from section
		for (let tabpanel of tabpanels) {
			tabpanel.removeAttribute('role');
		};
	}


	// events
	function _eventTabClick (e) {
		console.log(e);
	}


	// actions
	function _addTabsReady () {
		docEl.classList.add(tabsReadyClass);
	}

	function _removeTabsReady () {
		docEl.classList.remove(tabsReadyClass);
	}

	function _setActiveTab (i) {
	}


	// bindings
	function _bindClickEvents () {
	}

	function _unbindClickEvents () {
	}


	// PUBLIC METHODS
	function destroy () {
		_removeA11y();
		_unbindClickEvents();
		_removeTabsReady();
	}


	// INIT
	function _init () {
		if (tabContainers.length) {
			_addA11y();
			_bindClickEvents();
			_addTabsReady();
		}
	}
	_init();


	// REVEAL API
	return {
		destroy
	}

}


// module exports
export default Frtabs;
