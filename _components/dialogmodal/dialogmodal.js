'use strict';

// Set Array prototype on NodeList for forEach() support
// https://gist.github.com/paulirish/12fb951a8b893a454b32#gistcomment-1474959
NodeList.prototype.forEach = Array.prototype.forEach;

// Polyfill matches as per https://github.com/jonathantneal/closest
Element.prototype.matches = Element.prototype.matches ||
							Element.prototype.mozMatchesSelector ||
							Element.prototype.msMatchesSelector ||
							Element.prototype.oMatchesSelector ||
							Element.prototype.webkitMatchesSelector;

/**
 * @param {object} options Object containing configuration overrides
 */
const Frdialogmodal = function ({
		selector: selector = '.js-fr-dialogmodal',
		openSelector: openSelector = '.js-fr-dialogmodal-open',
		closeSelector: closeSelector = '.js-fr-dialogmodal-close',
		readyClass: readyClass = 'fr-dialogmodal--is-ready',
		activeClass: activeClass = 'fr-dialogmodal--is-active'
	} = {}) {


	// CONSTANTS
	const doc = document;
	const docEl = doc.documentElement;


	// SUPPORTS
	if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;


	// SETUP
	// set accordion element NodeLists
	let modals = doc.querySelectorAll(selector);

	//	TEMP
	let currButtonOpen = null;
	let currModal = null;


	//	UTILS
	function _defer (fn) {
		//	wrapped in setTimeout to delay binding until previous rendering has completed
		if (typeof fn === 'function') setTimeout(fn, 0);
	}
	// function _closest (el, selector) {
	// 	while (el) {
	// 		if (el.matches(selector)) break;
	// 		el = el.parentElement;
	// 	}
	// 	return el;
	// }


	// A11Y
	function _addA11y (modal) {
		//	add relevant roles and properties
		modal.setAttribute('role', 'dialog');
		modal.setAttribute('aria-hidden', true);
	}


	//	ACTIONS
	function _showModal (modal) {
		//	remove aria-hidden, add focus
		modal.setAttribute('aria-hidden', false);
		modal.setAttribute('tabindex', -1);
		modal.focus();
		//	sort out events
		_defer(_bindClosePointer);
		//	reset scroll position
		modal.scrollTop = 0;
		//	add active class
		modal.classList.add(activeClass);
	}
	function _hideModal (modal = currModal, returnfocus = true) {
		//	add aria-hidden, remove focus
		modal.setAttribute('aria-hidden', true);
		modal.removeAttribute('tabindex');
		modal.blur();
		//	sort out events
		_unbindClosePointer(modal);
		//	remove active class
		modal.classList.remove(activeClass);
		//	return focus to button that opened the modal and reset the reference
		if (returnfocus) {
			currButtonOpen.focus();
			currButtonOpen = null;
		}
	}


	//	EVENTS
	function _eventOpenPointer (e) {
		//	get modal
		let modalId = e.target.getAttribute('aria-controls');
		let modal = doc.querySelector(`#${modalId}`);
		//	save temp reference
		currButtonOpen = e.target;
		currModal = modal;
		//	show modal
		_showModal(modal);
	}
	function _eventClosePointer () {
		_hideModal();
	}


	//	BIND EVENTS
	function _bindOpenPointers (modal) {
		const modalId = modal.getAttribute('id');
		const openButtons = doc.querySelectorAll(`${openSelector}[aria-controls="${modalId}"]`); // is this selector totally crazy?
		openButtons.forEach((button) => button.addEventListener('click', _eventOpenPointer));
	}
	function _bindClosePointer (modal = currModal) {
		var closeButton = modal.querySelector(closeSelector);
		closeButton.addEventListener('click', _eventClosePointer);
	}


	//	UNBIND EVENTS
	function _unbindClosePointer (modal = currModal) {
		var closeButton = modal.querySelector(closeSelector);
		closeButton.removeEventListener('click', _eventClosePointer);
	}


	// INIT
	function init () {
		//	cancel if no modals found
		if (!modals.length) return;
		//	loop through available modals
		modals.forEach((modal) => {
			_addA11y(modal);
			_bindOpenPointers(modal);
			// set ready style hook
			modal.classList.add(readyClass);
		});
	}
	init();


	// REVEAL API
	return {
		init
		// destroy
	}

}


// module exports
export default Frdialogmodal;
