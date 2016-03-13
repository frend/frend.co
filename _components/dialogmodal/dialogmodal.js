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
		modalSelector: modalSelector = '.js-fr-dialogmodal-modal',
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
	let skipToFirst = false;
	let skipToLast = false;
	let disableTab = false;


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
		modal.setAttribute('aria-hidden', true);
		modal.querySelector(modalSelector).setAttribute('role', 'dialog');
	}


	//	ACTIONS
	function _showModal (container) {
		let modal = container.querySelector(modalSelector);
		//	remove aria-hidden, add focus
		container.setAttribute('aria-hidden', false);
		modal.setAttribute('tabindex', -1);
		modal.focus();
		//	sort out events
		_defer(_bindDocKey);
		_defer(_bindDocClick);
		_defer(_bindClosePointer);
		//	reset scroll position
		modal.scrollTop = 0;
		//	add active class
		container.classList.add(activeClass);
		skipToLast = true;
	}
	function _hideModal (container = currModal, returnfocus = true) {
		let modal = container.querySelector(modalSelector);
		//	add aria-hidden, remove focus
		container.setAttribute('aria-hidden', true);
		modal.removeAttribute('tabindex');
		modal.blur();
		//	sort out events
		_unbindDocKey();
		_unbindDocClick();
		_unbindClosePointer(modal);
		//	remove active class
		container.classList.remove(activeClass);
		//	return focus to button that opened the modal and reset the reference
		if (returnfocus) {
			currButtonOpen.focus();
			currButtonOpen = null;
		}
	}
	function _retainModalFocus (e) {

		if (disableTab) e.preventDefault();

		//	if first item and shiftkey, prevent default tab behaviour
		if (skipToLast && e.shiftKey) e.preventDefault();

		//	if last item and not shiftkey, prevent default tab behaviour
		if (skipToFirst && !e.shiftKey) e.preventDefault();

		//	defer
		_defer(() => {

			//	get focusable elements and current focused index
			let elements = _getAllFocusableEl(currModal);
			let activeElementIndex = elements.indexOf(doc.activeElement);

			if (elements.length < 2) disableTab = true;

			if (skipToFirst && !e.shiftKey) {
				elements[0].focus();
				skipToFirst = false;
				skipToLast = true;
				return false;
			} else if (skipToLast && e.shiftKey) {
				elements[elements.length - 1].focus();
				skipToLast = false;
				skipToFirst = true;
				return false;
			} else {
				skipToLast = skipToFirst = false;
			}

			//	set skipToFirst if last element is highlighted
			if (activeElementIndex === elements.length - 1) skipToFirst = true;

			//	set skipToFirst if last element is highlighted
			if (activeElementIndex === 0) skipToLast = true;
		});
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
		let isModalChild = _closest(e.target, modalSelector);
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
		const openButtons = doc.querySelectorAll(`${openSelector}[aria-controls="${modalId}"]`);
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
