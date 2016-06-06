'use strict';

//	Polyfill matches as per https://github.com/jonathantneal/closest
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
		tabsReadyClass: tabsReadyClass = 'fr-tabs--is-ready',
		onReady,
		onDestroy,
		onTab
	} = {}) {


	//	CONSTANTS
	const doc = document;
	const docEl = doc.documentElement;
	const _q = (el, ctx = doc) => [].slice.call(ctx.querySelectorAll(el));
	const _cb = fn => typeof fn === typeof(Function) && fn();


	//	SUPPORTS
	if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;


	//	SETUP
	//	set tab element NodeList
	let tabContainers = _q(selector);
	//	TEMP
	let activeIndex = 0;


	//	UTILS
	function _closest (el, selector) {
		while (el) {
			if (el.matches(selector)) break;
			el = el.parentElement;
		}
		return el;
	}


	//	A11Y
	function _addA11y (tabContainer) {
		//	get tab elements
		const tabLists = _q(tablistSelector, tabContainer);
		const tabListItems = _q(tablistSelector + ' li', tabContainer);
		const tabs = _q(tablistSelector + ' a', tabContainer);
		const tabpanels = _q(tabpanelSelector, tabContainer);
		//	add roles, properties, states
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
			//	make first child of tabpanel focusable if available
			tabpanel.setAttribute('tabindex', 0);
		});
	}
	function _removeA11y (tabContainer) {
		//	get tab elements
		const tabLists = _q(tablistSelector, tabContainer);
		const tabListItems = _q(tablistSelector + ' li', tabContainer);
		const tabs = _q(tablistSelector + ' a', tabContainer);
		const tabpanels = _q(tabpanelSelector, tabContainer);
		//	remove roles, properties, states
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
			//	remove first child focusability if present
			tabpanel.removeAttribute('tabindex');
		});
	}


	//	ACTIONS
	function _showTab (target, giveFocus = true, runCb = true) {
		//	quick return if tab is already open
		if (target.getAttribute('aria-selected') === 'true') return;
		//	get context of tab container (this sucks - look at implementing equivalent .closest() method)
		const thisContainer = _closest(target, selector);
		const siblingTabs = _q(tablistSelector + ' a', thisContainer);
		const siblingTabpanels = _q(tabpanelSelector, thisContainer);
		const activeTab = doc.getElementById(target.getAttribute('aria-controls'))
		//	set inactives
		siblingTabs.forEach((tab) => {
			tab.setAttribute('tabindex', -1);
			tab.removeAttribute('aria-selected');
		});
		siblingTabpanels.forEach((tabpanel) => {
			tabpanel.setAttribute('aria-hidden', 'true');
		});
		//	set active state
		target.setAttribute('tabindex', 0);
		target.setAttribute('aria-selected', 'true');
		activeTab.removeAttribute('aria-hidden');
		//	add focus to target
		if (giveFocus) target.focus();
		//	run callback
		if (runCb) _cb(onTab);
	}


	//	EVENTS
	function _eventTabClick (e) {
		_showTab(e.target);
		e.preventDefault(); //	look into remove id/settimeout/reinstate id as an alternative to preventDefault
	}
	function _eventTabKeydown (e) {
		//	collect tab targets, and their parents' prev/next (or first/last - this is honkin dom traversing)
		const currentTab = e.target;
		const previousTabItem = currentTab.parentNode.previousElementSibling || currentTab.parentNode.parentNode.lastElementChild;
		const nextTabItem = currentTab.parentNode.nextElementSibling || currentTab.parentNode.parentNode.firstElementChild;
		//	don't catch key events when ⌘ or Alt modifier is present
		if (e.metaKey || e.altKey) return;
		//	catch left/right and up/down arrow key events
		//	if new next/prev tab available, show it by passing tab anchor to _showTab method
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


	//	BIND EVENTS
	function _bindTabsEvents (tabContainer) {
		const tabs = _q(tablistSelector + ' a', tabContainer);
		//	bind all tab click and keydown events
		tabs.forEach((tab) => {
			tab.addEventListener('click', _eventTabClick);
			tab.addEventListener('keydown', _eventTabKeydown);
		});
	}


	//	UNBIND EVENTS
	function _unbindTabsEvents (tabContainer) {
		const tabs = _q(tablistSelector + ' a', tabContainer);
		//	unbind all tab click and keydown events
		tabs.forEach((tab) => {
			tab.removeEventListener('click', _eventTabClick);
			tab.removeEventListener('keydown', _eventTabKeydown);
		});
	}


	//	DESTROY
	function destroy () {
		//	loop through each tab element
		tabContainers.forEach((tabContainer) => {
			_removeA11y(tabContainer);
			_unbindTabsEvents(tabContainer);
			tabContainer.classList.remove(tabsReadyClass);
		});
		//	run callback
		_cb(onDestroy);
	}


	//	INIT
	function init () {
		if (!tabContainers.length) return
		//	loop through each tab element
		tabContainers.forEach((tabContainer) => {
			//	get first tab element
			const initialTab = _q(tablistSelector + ' a', tabContainer)[0];
			_addA11y(tabContainer);
			_bindTabsEvents(tabContainer);
			//	set all first tabs active on init
			_showTab(initialTab, false, false);
			//	set ready style hook
			tabContainer.classList.add(tabsReadyClass);
		});
		//	run callback
		_cb(onReady);
	}
	init();


	//	REVEAL API
	return {
		init,
		destroy
	}

}


//	module exports
export default Frtabs;
