'use strict';

// Frend Tabs
// @param {string} selector The selector to match for tab components
// @param {object} options Object containing configuration overrides

let Frtabs = function (selector = '.js-fr-tabs', {
		activeTabClass: activeTabClass = 'fr-tabs__tab--is-active',
		activePanelClass: activePanelClass = 'fr-tabs__panel--is-active',
		tabsReadyClass: tabsReadyClass = 'has-fr-tabs'
	} = {}) {

	// CONSTANTS
	const doc = document;
	const docEl = doc.documentElement;


	// SUPPORTS
	if (!'querySelector' in document || !'addEventListener' in window || !docEl.classList) return;


	// SETUP
	// set containers and options
	let containers = doc.querySelectorAll(selector);

	let options = {
		activeTabClass,
		activePanelClass,
		tabsReadyClass
	};


	// PRIVATE METHODS
	// a11y
	function _addA11y () {
	}

	function _removeA11y () {
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

	function _clearActiveTab () {
	}


	// bindings
	function _bindClickEvents () {
	}

	function _unbindClickEvents () {
	}


	// PUBLIC METHODS
	function build () {
		_addTabsReady();
		//for (let container of containers) {
		for (let i = 0; i < containers.length; i++) {
			_addA11y();
			_bindClickEvents();
		}
	}

	function destroy () {
		_removeA11y();
		_unbindClickEvents();
		_removeTabsReady();
	}

	function setActiveTab (i) {
		_clearActiveTab();
		// set active tab based off i
	}


	// INIT
	function _init () {
		if (containers.length) {
			build();
		}
	}
	_init();


	// REVEAL API
	return {
		build,
		destroy,
		setActiveTab
	}

}


// module exports
export default Frtabs;
