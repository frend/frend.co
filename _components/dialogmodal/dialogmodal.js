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
	const modals = doc.querySelectorAll(selector);
	const focusableSelectors = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];

	//	TEMP
	let currButtonOpen = null;
	let currModal = null;


	//	UTILS
	function _defer (fn) {
		//	wrapped in setTimeout to delay binding until previous rendering has completed
		if (typeof fn === 'function') setTimeout(fn, 0);
	}
	function _closest (el, selector) {
		while (el) {
			if (el.matches(selector)) break;
			el = el.parentElement;
		}
		return el;
	}
	function _getAllFocusableEl (el) {
		//	get nodelist of elements
		let elements = el.querySelectorAll(focusableSelectors.join());
		//	return array of elements
		return [...elements];
	}


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
		_defer(_bindDocKey);
		_defer(_bindDocClick);
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
		_unbindDocKey();
		_unbindDocClick();
		_unbindClosePointer(modal);
		//	remove active class
		modal.classList.remove(activeClass);
		//	return focus to button that opened the modal and reset the reference
		if (returnfocus) {
			currButtonOpen.focus();
			currButtonOpen = null;
		}
	}
	function _retainModalFocus (e) {
		//	get focusable elements and current focused index
		let elements = _getAllFocusableEl(currModal);
		let activeElementIndex = elements.indexOf(doc.activeElement);
		//	if element if outside of modal
		if (activeElementIndex === -1) {
			//	if shiftkey is used to reverse tab, focus last element
			if (e.shiftKey) elements[elements.length - 1].focus();
			//	else, focus first
			else elements[0].focus();
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
	function _eventDocClick (e) {
		//	check if target is panel or child of
		let isModal = e.target === currModal;
		let isModalChild = _closest(e.target, selector);
		if (!isModal && !isModalChild) _hideModal();
	}
	function _eventDocKey (e) {
		//	tab key
		if (e.keyCode === 9) _retainModalFocus(e);
		//	esc key
		if (e.keyCode === 27) _hideModal();
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
	function _bindDocClick () {
		doc.addEventListener('click', _eventDocClick);
	}
	function _bindDocKey () {
		doc.addEventListener('keydown', _eventDocKey);
	}


	//	UNBIND EVENTS
	function _unbindClosePointer (modal = currModal) {
		var closeButton = modal.querySelector(closeSelector);
		closeButton.removeEventListener('click', _eventClosePointer);
	}
	function _unbindDocClick () {
		doc.removeEventListener('click', _eventDocClick);
	}
	function _unbindDocKey () {
		doc.removeEventListener('keydown', _eventDocKey);
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
