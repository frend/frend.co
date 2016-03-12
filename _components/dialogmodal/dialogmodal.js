'use strict';

// Set Array prototype on NodeList for forEach() support
// https://gist.github.com/paulirish/12fb951a8b893a454b32#gistcomment-1474959
NodeList.prototype.forEach = Array.prototype.forEach;

/**
 * @param {object} options Object containing configuration overrides
 */
const Frdialogmodal = function ({
		selector: selector = '.js-fr-dialogmodal',
		openSelector: openSelector = '.je-fr-dialogmodal-open',
		readyClass: readyClass = 'fr-dialogmodal--is-ready'
	} = {}) {


	// CONSTANTS
	const doc = document;
	const docEl = doc.documentElement;


	// SUPPORTS
	if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;


	// SETUP
	// set accordion element NodeLists
	let modals = doc.querySelectorAll(selector);

	// A11Y
	function _addA11y (modal) {

		let modalId = modal.getAttribute('id');
		let modalButtonOpen = doc.querySelectorAll(`${openSelector}[aria-controls="${modalId}"]`);

		// add relevant roles and properties
		modal.setAttribute('role', 'dialog');
	}


	// INIT
	function init () {
		if (!modals.length)  return;
		modals.forEach((modal) => {
			_addA11y(modal);
			_bindClickEvent(modal);
			// set ready style hook
			modal.classList.add(readyClass);
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
export default Frdialogmodal;
