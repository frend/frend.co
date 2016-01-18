'use strict';

/**
 * @param {string} panelSelector 	Off-canvas element
 * @param {string} toggleSelector 	Button with which to toggle the off-canvas state
 * @param {object} options			Object containing config overrides
 */
const Froffcanvas = function(
		panelSelector = '.js-fr-offcanvas',
		toggleSelector = '.js-fr-offcanvas-toggle',
		{
			activePanelClass: activePanelClass = 'fr-offcanvas--is-active',
			readyClass: readyClass = 'has-fr-offcanvas'
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
	if (!'querySelector' in document || !'addEventListener' in window || !docEl.classList) return;


	//	SETUP
	let panel = doc.querySelector(panelSelector);
	let toggle = doc.querySelector(toggleSelector);
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


	//	Cross-browser
	function _setTransitionEventPrefix () {
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
	function _eventPointer () {
		let panelHidden = panel.getAttribute('aria-hidden') === 'true';
		if (panelHidden) {
			_showPanel();
		} else {
			_hidePanel();
		}
	}
	function _eventDocClick (e) {
		//	check if target is panel or child of
		let isPanel = e.target == panel;
		let isPanelChild = _closest(e.target, (el) => {
			if (el != doc) return el.classList.contains(panelSelector.substring(1));
		});
		if (!isPanel && !isPanelChild) _hidePanel();
	}
	function _eventDocKey (e) {
		//	esc key
		if (e.keyCode === 27) _hidePanel();
	}
	function _eventTransitionEnd (e) {
		//	set visibilty property to remove keyboard access
		panel.style.visibility = 'hidden';
		//	transition event not needed
		_unbindTransitionEnd();
	}


	//	Bindings
	function _bindPointer () {
		toggle.addEventListener('click', _eventPointer);
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
	function _unbindPointer () {
		toggle.removeEventListener('click', _eventPointer);
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
		//	remove aria-hidden, add focus
		panel.setAttribute('aria-hidden', false);
		panel.setAttribute('tabindex', 0);
		panel.focus();
		//	set visibility to override any previous set style
		panel.style.visibility = 'visible';
		//	bind document close events
		_defer(_bindDocClick); // this isn't working for enter, works for space though. WTF.
		_defer(_bindDocKey);
		//	add active class
		panel.classList.add(activePanelClass);
	}
	function _hidePanel () {
		//	add aria-hidden, remove focus
		panel.setAttribute('aria-hidden', true);
		panel.setAttribute('tabindex', -1);
		panel.blur();
		//	bind transition end
		_bindTransitionEnd();
		//	unbind document events
		_unbindDocKey();
		_unbindDocClick();
		//	remove active class
		panel.classList.remove(activePanelClass);
	}
	function destroy () {
		//	remove attributes
		_removeA11y();
		//	unbind events
		_unbindPointer();
		_unbindDocClick();
		_unbindDocKey();
		//	remove reference
		docEl.classList.remove(readyClass);
	}


	//	INIT
	function _init () {
		if (panel) {
			_addA11y();
			_bindPointer();
			_setTransitionEventPrefix();
			docEl.classList.add(readyClass);
		}
	}
	_init();


	// REVEAL API
	return {
		destroy
	}
}


// module exports
export default Froffcanvas;
