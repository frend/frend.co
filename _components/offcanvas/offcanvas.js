'use strict';

/**
 * @param {string} panelSelector 	Off-canvas element
 * @param {string} toggleSelector 	Button with which to toggle the off-canvas state
 * @param {object} options			Object containing config overrides
 */
const FrOffcanvas = function(
		selector = '.js-fr-offcanvas',
		{
			openSelector: openSelector = '.js-fr-offcanvas-open',
			closeSelector: closeSelector = '.js-fr-offcanvas-close',
			toggleSelector: toggleSelector = '.js-fr-offcanvas-toggle',
			readyClass: readyClass = 'has-fr-offcanvas',
			activeClass: activeClass = 'fr-offcanvas-is-active',
			panelActiveClass: panelActiveClass = 'fr-offcanvas--is-active'
		} = {}
	) {


	//	CONSTANTS
	const doc = document;
	const docEl = doc.documentElement;
	const transitionEventSyntax = {
		transition: 'transitionend',
		WebkitTransition: 'webkitTransitionEnd',
		MozTransition: 'transitionend',
		OTransition: 'oTransitionEnd otransitionend'
	};


	//	SUPPORTS
	if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;


	//	SETUP
	let panel = doc.querySelector(selector);
	let buttonOpen = doc.querySelector(openSelector);
	let buttonClose = doc.querySelector(closeSelector);
	let buttonToggle = doc.querySelector(toggleSelector);
	let transitionEventName = 'transitionend';


	//	UTILS
	function _defer (func) {
		//	wrapped in setTimeout to delay binding until previous rendering has completed
		if (typeof func === 'function') setTimeout(func, 0);
	}
	function _closest (el, fn) {
		// closest: http://clubmate.fi/jquerys-closest-function-and-pure-javascript-alternatives/
		return el && (fn(el) ? el : _closest(el.parentNode, fn));
	}
	function _getStyleValue (el, prop) {
		//	return value for CSS property on element
		return window.getComputedStyle(el, null).getPropertyValue(prop);
	}


	//	Cross-browser
	function _setTransitionEventPrefix () {
		//	loop through prefixes and return relevant event
		for (var prefix in transitionEventSyntax) {
			if (panel.style[prefix] !== undefined) return transitionEventSyntax[prefix];
		}
	}


	//	A11y
	function _addA11y () {
		//	add aria-hidden attribute
		panel.setAttribute('aria-hidden', true);
	}
	function _removeA11y () {
		//	add aria-hidden attribute
		panel.removeAttribute('aria-hidden');
	}


	//	Events
	function _eventTogglePointer () {
		let panelHidden = panel.getAttribute('aria-hidden') === 'true';
		if (panelHidden) {
			_showPanel();
		} else {
			_hidePanel();
		}
	}
	function _eventOpenPointer () {
		_showPanel();
	}
	function _eventClosePointer () {
		_hidePanel();
	}
	function _eventDocClick (e) {
		//	check if target is panel or child of
		let isPanel = e.target === panel;
		let isPanelChild = _closest(e.target, (el) => {
			if (el !== doc) return el.classList.contains(selector.substring(1));
		});
		if (!isPanel && !isPanelChild) _hidePanel();
	}
	function _eventDocKey (e) {
		//	esc key
		if (e.keyCode === 27) _hidePanel();
	}
	function _eventTransitionEnd () {
		console.log('whatttt');
		//	set visibilty property to remove keyboard access
		panel.style.visibility = 'hidden';
		//	transition event not needed
		_unbindTransitionEnd();
	}


	//	Bindings
	function _bindTogglePointer () {
		if (buttonToggle) buttonToggle.addEventListener('click', _eventTogglePointer);
	}
	function _bindOpenPointer () {
		if (buttonOpen) buttonOpen.addEventListener('click', _eventOpenPointer);
	}
	function _bindClosePointer () {
		if (buttonClose) buttonClose.addEventListener('click', _eventClosePointer);
	}
	function _bindDocClick () {
		doc.addEventListener('click', _eventDocClick);
	}
	function _bindDocKey () {
		doc.addEventListener('keydown', _eventDocKey);
	}
	function _bindTransitionEnd () {
		panel.addEventListener(transitionEventName, _eventTransitionEnd);
	}

	//	Unbind
	function _unbindTogglePointer () {
		if (buttonToggle) buttonToggle.addEventListener('click', _eventTogglePointer);
	}
	function _unbindOpenPointer () {
		if (buttonOpen) buttonOpen.addEventListener('click', _eventOpenPointer);
	}
	function _unbindClosePointer () {
		if (buttonClose) buttonClose.addEventListener('click', _eventClosePointer);
	}
	function _unbindDocClick () {
		doc.removeEventListener('click', _eventDocClick);
	}
	function _unbindDocKey () {
		doc.removeEventListener('keydown', _eventDocKey);
	}
	function _unbindTransitionEnd () {
		panel.removeEventListener(transitionEventName, _eventTransitionEnd);
	}


	//	Actions
	function _showPanel () {
		//	set visibility to override any previous set style
		panel.style.visibility = 'visible';
		//	remove aria-hidden, add focus
		panel.setAttribute('aria-hidden', false);
		panel.setAttribute('tabindex', -1);
		panel.focus();
		//	bind document close events
		_defer(_bindDocClick); // this isn't working for enter, works for space though. WTF.
		_defer(_bindDocKey);
		//	reset scroll position
		panel.scrollTop = 0;
		//	add active class
		panel.classList.add(panelActiveClass);
		docEl.classList.add(activeClass);
	}
	function _hidePanel () {
		//	detect transition
		let hasTransition = _getStyleValue(panel, 'transition').includes('transform');
		//	add aria-hidden, remove focus
		panel.setAttribute('aria-hidden', true);
		panel.removeAttribute('tabindex');
		panel.blur();
		//	bind transition end
		if (hasTransition) _bindTransitionEnd();
		else panel.style.visibility = 'hidden';
		//	unbind document events
		_unbindDocKey();
		_unbindDocClick();
		//	remove active class
		panel.classList.remove(panelActiveClass);
		docEl.classList.remove(activeClass);
	}
	function destroy () {
		//	remove attributes
		_removeA11y();
		//	unbind events
		_unbindTogglePointer();
		_unbindOpenPointer();
		_unbindClosePointer();
		_unbindDocClick();
		_unbindDocKey();
		//	remove reference
		docEl.classList.remove(readyClass);
	}


	//	INIT
	function init () {
		if (panel) {
			//	detect required properties
			_setTransitionEventPrefix();
			//	set a11y DOM properties
			_addA11y();
			//	bind button events
			_bindTogglePointer();
			_bindOpenPointer();
			_bindClosePointer();
			//	set ready class
			docEl.classList.add(readyClass);
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
export default FrOffcanvas;
