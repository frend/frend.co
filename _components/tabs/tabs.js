'use strict';

// Set Array prototype on NodeList for forEach() support
// https://gist.github.com/paulirish/12fb951a8b893a454b32#gistcomment-1474959
NodeList.prototype.forEach = Array.prototype.forEach;

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


	// SUPPORTS
	if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;


	// SETUP
	// set tab element NodeList
	let tabContainers = doc.querySelectorAll(selector);


	// A11Y
	function _addA11y (tabContainer) {
		// get tab elements
		const tabLists = tabContainer.querySelectorAll(tablistSelector);
		const tabListItems = tabContainer.querySelectorAll(tablistSelector + ' li');
		const tabs = tabContainer.querySelectorAll(tablistSelector + ' a');
		const tabpanels = tabContainer.querySelectorAll(tabpanelSelector);

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
		const tabLists = tabContainer.querySelectorAll(tablistSelector);
		const tabListItems = tabContainer.querySelectorAll(tablistSelector + ' li');
		const tabs = tabContainer.querySelectorAll(tablistSelector + ' a');
		const tabpanels = tabContainer.querySelectorAll(tabpanelSelector);

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
		// get context of tab container (this sucks - look at implementing equivalent .closest() method)
		let thisContainer = target.parentNode.parentNode.parentNode;

		let siblingTabs = thisContainer.querySelectorAll(tablistSelector + ' a');
		let siblingTabpanels = thisContainer.querySelectorAll(tabpanelSelector);

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
		// collect tab targets, and their parents' prev/next (or first/last - this is honkin dom traversing)
		let currentTab = e.target;
		let isModifierKey = e.metaKey || e.altKey;
		let previousTabItem = currentTab.parentNode.previousElementSibling || currentTab.parentNode.parentNode.lastElementChild;
		let nextTabItem = currentTab.parentNode.nextElementSibling || currentTab.parentNode.parentNode.firstElementChild;

		// don't catch key events when ⌘ or Alt modifier is present
		if (isModifierKey) return;

		// catch left/right and up/down arrow key events
		// if new next/prev tab available, show it by passing tab anchor to _showTab method
		switch (e.keyCode) {
			case 37:
			case 38:
				_showTab(previousTabItem.querySelector('[role="tab"]'));
				e.preventDefault();
				break;
			case 39:
			case 40:
				_showTab(nextTabItem.querySelector('[role="tab"]'));
				e.preventDefault();
				break;
			default:
				break;
		}
	}


	// BINDINGS
	function _bindTabsEvents (tabContainer) {
		const tabs = tabContainer.querySelectorAll(tablistSelector + ' a');
		// bind all tab click and keydown events
		tabs.forEach((tab) => {
			tab.addEventListener('click', _eventTabClick);
			tab.addEventListener('keydown', _eventTabKeydown);
		});
	}

	function _unbindTabsEvents (tabContainer) {
		const tabs = tabContainer.querySelectorAll(tablistSelector + ' a');
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
				_showTab(tabContainer.querySelectorAll(tablistSelector + ' a')[0], false);
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
