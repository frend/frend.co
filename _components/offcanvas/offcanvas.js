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
const Froffcanvas = function({
		selector: selector = '.js-fr-offcanvas',
		openSelector: openSelector = '.js-fr-offcanvas-open',
		closeSelector: closeSelector = '.js-fr-offcanvas-close',
		readyClass: readyClass = 'fr-offcanvas--is-ready',
		activeClass: activeClass = 'fr-offcanvas--is-active'
	} = {}) {


	//	CONSTANTS
	const doc = document;
	const docEl = doc.documentElement;


	//	SUPPORTS
	if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;


	//	SETUP
	// set offcanvas element NodeLists
	const panels = doc.querySelectorAll(selector);

	//	TEMP
	let currButtonOpen = null;
	let currPanel = null;


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
	function _getPanelId (panel) {
		return panel.getAttribute('id');
	}


	//	A11Y
	function _addA11y (panel) {
		//	add aria-hidden attribute
		panel.setAttribute('aria-hidden', true);
	}
	function _removeA11y (panel) {
		//	remove aria-hidden attribute
		panel.removeAttribute('aria-hidden');
	}


	//	ACTIONS
	function _showPanel (panel) {
		//	set visibility to override any previous set style
		panel.style.visibility = 'visible';
		//	remove aria-hidden, add focus
		panel.setAttribute('aria-hidden', false);
		panel.setAttribute('tabindex', -1);
		panel.focus();
		//	sort out events
		_defer(_unbindOpenPointer);
		_defer(_bindDocKey);
		_defer(_bindDocClick);
		_defer(_bindClosePointer);
		//	reset scroll position
		panel.scrollTop = 0;
		//	add active class
		panel.classList.add(activeClass);
	}
	function _hidePanel (panel = currPanel, returnfocus = true) {
		//	add aria-hidden, remove focus
		panel.setAttribute('aria-hidden', true);
		panel.removeAttribute('tabindex');
		panel.blur();
		//	set visibility to override any previous set style
		panel.style.visibility = 'hidden';
		//	sort out events
		_unbindClosePointer(panel);
		_unbindDocKey();
		_unbindDocClick();
		_bindOpenPointer(panel);
		//	remove active class
		panel.classList.remove(activeClass);
		//	return focus to button that opened the panel and reset the reference
		if (returnfocus) {
			currButtonOpen.focus();
			currButtonOpen = null;
		}
	}
	function destroy () {
		panels.forEach((panel) => {
			//	remove attributes
			_removeA11y(panel);
			//	unbind local events
			_unbindOpenPointer(panel);
			_unbindClosePointer();
			//	remove class
			panel.classList.remove(readyClass);
		});
		//	unbind global events
		_unbindDocClick();
		_unbindDocKey();
		//	reset temp references
		currButtonOpen = null;
		currPanel = null;
	}


	//	EVENTS
	function _eventOpenPointer (e) {
		//	get panel
		let panelId = e.target.getAttribute('aria-controls');
		let panel = doc.querySelector(`#${panelId}`);
		//	hide any open panels
		if (currPanel) _hidePanel(currPanel, false);
		//	save temp panel/button
		currButtonOpen = e.target;
		currPanel = panel;
		//	show
		_showPanel(panel);
	}
	function _eventClosePointer () {
		_hidePanel();
	}
	function _eventDocClick (e) {
		//	check if target is panel or child of
		let isPanel = e.target === currPanel;
		let isPanelChild = _closest(e.target, selector);
		if (!isPanel && !isPanelChild) _hidePanel();
	}
	function _eventDocKey (e) {
		//	esc key
		if (e.keyCode === 27) _hidePanel();
	}


	//	BIND EVENTS
	function _bindOpenPointer (panel) {
		const openButtons = doc.querySelectorAll(`${openSelector}[aria-controls="${_getPanelId(panel)}"]`); // is this selector totally crazy?
		openButtons.forEach((button) => button.addEventListener('click', _eventOpenPointer));
	}
	function _bindClosePointer (panel = currPanel) {
		var closeButton = panel.querySelector(closeSelector);
		closeButton.addEventListener('click', _eventClosePointer);
	}
	function _bindDocClick () {
		doc.addEventListener('click', _eventDocClick);
	}
	function _bindDocKey () {
		doc.addEventListener('keydown', _eventDocKey);
	}


	//	UNBIND EVENTS
	function _unbindOpenPointer (panel = currPanel) {
		const openButtons = doc.querySelectorAll(`${openSelector}[aria-controls="${_getPanelId(panel)}"]`); // yep its totally crazy
		openButtons.forEach((button) => button.removeEventListener('click', _eventOpenPointer));
	}
	function _unbindClosePointer (panel = currPanel) {
		var closeButton = panel.querySelector(closeSelector);
		closeButton.removeEventListener('click', _eventClosePointer);
	}
	function _unbindDocClick () {
		doc.removeEventListener('click', _eventDocClick);
	}
	function _unbindDocKey () {
		doc.removeEventListener('keydown', _eventDocKey);
	}


	//	INIT
	function init () {
		if (!panels) return;
		//	loop through each offcanvas element
		panels.forEach((panel) => {
			_addA11y(panel);
			_bindOpenPointer(panel);
			panel.classList.add(readyClass);
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
export default Froffcanvas;