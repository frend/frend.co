'use strict';

/**
 * @param {object} options Object containing configuration overrides
 */
const Frdialogmodal = function ({
		selector: selector = '.js-fr-dialogmodal',
		modalSelector: modalSelector = '.js-fr-dialogmodal-modal',
		openSelector: openSelector = '.js-fr-dialogmodal-open',
		closeSelector: closeSelector = '.js-fr-dialogmodal-close',
		isAlert: isAlert = false,
		readyClass: readyClass = 'fr-dialogmodal--is-ready',
		activeClass: activeClass = 'fr-dialogmodal--is-active'
	} = {}) {


	// CONSTANTS
	const doc = document;
	const docEl = doc.documentElement;
	const _q = (el, ctx = doc) => [].slice.call(ctx.querySelectorAll(el));


	// SUPPORTS
	if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;


	// SETUP
	// set accordion element NodeLists
	const containers = _q(selector);
	const focusableSelectors = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];
	//	TEMP
	let currButtonOpen = null;
	let currModal = null;
	//	elements within tab
	let focusableElements = null;


	//	UTILS
	function _defer (fn) {
		//	wrapped in setTimeout to delay binding until previous rendering has completed
		if (typeof fn === 'function') setTimeout(fn, 0);
	}


	//	A11Y
	function _addA11y (container) {
		let modal = _q(modalSelector, container)[0];
		let modalDoc = _q('[role="document"]', modal)[0];
		let role = isAlert ? 'alertdialog' : 'dialog';
		//	add relevant roles and properties
		container.setAttribute('aria-hidden', true);
		modal.setAttribute('role', role);
		modal.setAttribute('aria-describedby', modalDoc.getAttribute('id'));
	}
	function _removeA11y (container) {
		let modal = _q(modalSelector, container)[0];
		//	add relevant roles and properties
		container.removeAttribute('aria-hidden');
		modal.removeAttribute('role');
		modal.removeAttribute('aria-describedby');
	}


	//	ACTIONS
	function _showModal (container, modal) {
		//	show container and focus the modal
		container.setAttribute('aria-hidden', false);
		modal.setAttribute('tabindex', -1);
		modal.focus();
		//	update bound events
		_defer(_bindDocKey);
		_defer(_bindClosePointer);
		//	if contents are not interactive, bind click off
		if (!isAlert) _defer(_bindContainerPointer);
		//	reset scroll
		modal.scrollTop = 0;
		//	update style hook
		container.classList.add(activeClass);
		//	set first/last focusable elements
		focusableElements = _q(focusableSelectors.join(), modal);
	}
	function _hideModal (modal, returnfocus = true) {
		//	get container element
		let container = modal.parentElement;
		//	show container and focus the modal
		container.setAttribute('aria-hidden', true);
		modal.removeAttribute('tabindex');
		//	update bound events
		_unbindDocKey();
		_unbindClosePointer();
		//	if contents are not interactive, unbind click off
		if (!isAlert) _unbindContainerPointer();
		//	update style hook
		container.classList.remove(activeClass);
		//	return focus to button that opened the modal and reset the reference
		if (returnfocus) {
			currButtonOpen.focus();
			currButtonOpen = null;
		}
	}
	function _handleTabEvent (e) {
		//	get the index of the current active element within the modal
		let focusedIndex = focusableElements.indexOf(doc.activeElement);
		//	handle TAB event if need to skip
		//	if first element is focused and shiftkey is in use
		if (e.shiftKey && (focusedIndex === 0 || focusedIndex === -1)) {
			//	focus last item within modal
			focusableElements[focusableElements.length - 1].focus();
			e.preventDefault();
		//	if last element is focused and shiftkey is not in use
		} else if (!e.shiftKey && focusedIndex === focusableElements.length - 1) {
			//	focus first item within modal
			focusableElements[0].focus();
			e.preventDefault();
		}
	}


	//	EVENTS
	function _eventOpenPointer (e) {
		//	get related elements
		let button = e.target;
		let container = doc.getElementById(button.getAttribute('aria-controls'));
		let modal = _q(modalSelector, container)[0];
		//	save element references
		currButtonOpen = button;
		currModal = modal;
		//	show modal
		_showModal(container, modal);
	}
	function _eventClosePointer () {
		_hideModal(currModal);
	}
	function _eventContainerPointer (e) {
		let container = currModal.parentElement;
		//	check if target is modal container (but not modal)
		if (e.target === container) _hideModal(currModal);
	}
	function _eventDocKey (e) {
		//	ESC key
		if (e.keyCode === 27) _hideModal(currModal);
		//	TAB key
		if (e.keyCode === 9) _handleTabEvent(e);
	}


	//	BIND EVENTS
	function _bindOpenPointers (container) {
		let id = container.getAttribute('id');
		let buttons = _q(`${openSelector}[aria-controls="${id}"]`);
		buttons.forEach(button => button.addEventListener('click', _eventOpenPointer));
	}
	function _bindClosePointer (modal = currModal) {
		let button = _q(closeSelector, modal)[0];
		button.addEventListener('click', _eventClosePointer);
	}
	function _bindContainerPointer (modal = currModal) {
		let container = modal.parentElement;
		container.addEventListener('click', _eventContainerPointer);
	}
	function _bindDocKey () {
		doc.addEventListener('keydown', _eventDocKey);
	}


	//	UNBIND EVENTS
	function _unbindOpenPointers (container) {
		let id = container.getAttribute('id');
		let buttons = doc.querySelectorAll(`${openSelector}[aria-controls="${id}"]`);
		buttons.forEach(button => button.removeEventListener('click', _eventOpenPointer));
	}
	function _unbindClosePointer (modal = currModal) {
		let button = _q(closeSelector, modal)[0];
		button.removeEventListener('click', _eventClosePointer);
	}
	function _unbindContainerPointer () {
		let container = currModal.parentElement;
		container.removeEventListener('click', _eventContainerPointer);
	}
	function _unbindDocKey () {
		doc.removeEventListener('keydown', _eventDocKey);
	}


	//	DESTROY
	function destroy () {
		//	loop through available modals
		containers.forEach(container => {
			let modal = _q(modalSelector, container)[0];
			modal.removeAttribute('tabindex');
			_removeA11y(container);
			_unbindOpenPointers(container);
			_unbindClosePointer(modal);
			_unbindContainerPointer(modal);
			//	remove ready, active style hooks
			container.classList.remove(readyClass, activeClass);
		});
		_unbindDocKey();
	}


	//	INIT
	function init () {
		//	cancel if no modals found
		if (!containers.length) return;
		//	loop through available modals
		containers.forEach(container => {
			_addA11y(container);
			_bindOpenPointers(container);
			// set ready style hook
			container.classList.add(readyClass);
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
