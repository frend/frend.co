'use strict';

// Set Array prototype on NodeList for forEach() support
// https://gist.github.com/paulirish/12fb951a8b893a454b32#gistcomment-1474959
NodeList.prototype.forEach = Array.prototype.forEach;

/**
 * @param {object} options Object containing configuration overrides
 */
const Frtooltip = function ({
		selector: selector = '.js-fr-tooltip',
		toggleSelector: toggleSelector = '.js-fr-tooltip-toggle',
		tooltipIdPrefix: tooltipIdPrefix = 'tooltip',
		readyClass: readyClass = 'has-fr-tooltip'
	} = {}) {


	// CONSTANTS
	const doc = document;
	const docEl = doc.documentElement;


	// SUPPORTS
	if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;


	// SETUP
	let tooltipContainers = doc.querySelectorAll(selector);
	// DOM references to find within container
	let tooltipSelector = '[role="tooltip"]';


	//	TEMP
	let currentTooltip = {};


	//	UTILS
	function _closest (el, fn) {
		// closest: http://clubmate.fi/jquerys-closest-function-and-pure-javascript-alternatives/
		return el && (fn(el) ? el : _closest(el.parentNode, fn));
	}


	//	A11Y
	function _addA11y (container, i) {
		//	get relative elements
		let toggle = container.querySelector(toggleSelector);
		let tooltip = container.querySelector(tooltipSelector);
		//	create new button and replace toggle
		var button = doc.createElement('button');
		button.setAttribute('class', toggle.getAttribute('class'));
		button.setAttribute('aria-expanded', 'false');
		button.setAttribute('aria-describedby', '');
		button.textContent = toggle.textContent;
		container.replaceChild(button, toggle);
		//	add tooltip attributes
		tooltip.setAttribute('id', tooltipIdPrefix + '-' + i);
		tooltip.setAttribute('aria-hidden', 'true');
		tooltip.setAttribute('aria-live', 'polite');
	}
	function _removeA11y (container) {
		//	get relative elements
		let toggle = container.querySelector(toggleSelector);
		let tooltip = container.querySelector(tooltipSelector);
		//	create new span and replace toggle
		var span = doc.createElement('span');
		span.setAttribute('class', toggleSelector.slice(1));
		span.textContent = toggle.textContent;
		container.replaceChild(span, toggle);
		//	remove tooltip attributes
		tooltip.removeAttribute('id');
		tooltip.removeAttribute('aria-hidden');
		tooltip.removeAttribute('aria-live');
	}


	// ACTIONS
	function _showTooltip (toggle, tooltip) {
		//	assign describedby matching tooltip reference
		let tooltipId = tooltip.getAttribute('id');
		toggle.setAttribute('aria-describedby', tooltipId);
		//	set visible state
		toggle.setAttribute('aria-expanded', 'true');
		tooltip.setAttribute('aria-hidden', 'false');
		//	store temp reference to tooltip
		currentTooltip = tooltip;
		//	bind doc close events
		_bindDocClick();
		_bindDocKey();
	}
	function _hideTooltip (toggle, tooltip) {
		//	remove tooltip reference
		toggle.setAttribute('aria-describedby', '');
		//	set visible state
		toggle.setAttribute('aria-expanded', 'false');
		tooltip.setAttribute('aria-hidden', 'true');
		//	remove tooltip temp reference
		currentTooltip = {};
		//	unbind doc close events
		_unbindDocClick();
		_unbindDocKey();
	}


	// EVENTS
	function _eventToggleClick (e) {
		//	close any open tooltips
		if (currentTooltip.nodeType) {
			//	get toggle relative to tooltip
			let toggle = currentTooltip.previousElementSibling;
			_hideTooltip(toggle, currentTooltip);
		}
		//	get relevant tooltip elements
		let toggle = e.target;
		let tooltip = toggle.parentNode.querySelector(tooltipSelector);
		//	show or hide if toggle is 'expanded'
		if (toggle.getAttribute('aria-expanded') === 'false') {
			_showTooltip(toggle, tooltip);
		} else {
			_hideTooltip(toggle, tooltip);
		}
	}
	function _eventDocClick (e) {
		//	check if target is panel or child of
		let isTooltip = e.target === currentTooltip;
		let isTooltipchild = _closest(e.target, (el) => {
			if (el !== doc) return el.classList.contains(selector.substring(1));
		});
		if (!isTooltip && !isTooltipchild) {
			//	get toggle relative to tooltip
			let toggle = currentTooltip.previousElementSibling;
			_hideTooltip(toggle, currentTooltip);
		}
	}
	function _eventDocKey (e) {
		//	esc key
		if (e.keyCode === 27) {
			//	get toggle relative to tooltip
			let toggle = currentTooltip.previousElementSibling;
			_hideTooltip(toggle, currentTooltip);
		}
	}


	// BINDINGS
	function _bindTooltipEvents () {
		// bind all tooltip toggle click and keydown events
		tooltipContainers.forEach((container) => {
			let toggle = container.querySelector(toggleSelector);
			toggle.addEventListener('click', _eventToggleClick);
		});
	}
	function _unbindTooltipEvents () {
		// unbind all tooltip toggle click and keydown events
		tooltipContainers.forEach((container) => {
			let toggle = container.querySelector(toggleSelector);
			toggle.removeEventListener('click', _eventToggleClick);
		});
	}
	function _bindDocClick () {
		doc.addEventListener('click', _eventDocClick);
	}
	function _unbindDocClick () {
		doc.removeEventListener('click', _eventDocClick);
	}
	function _bindDocKey () {
		doc.addEventListener('keydown', _eventDocKey);
	}
	function _unbindDocKey () {
		doc.removeEventListener('keydown', _eventDocKey);
	}


	// DESTROY
	function destroy () {
		//	add accessible attributes
		tooltipContainers.forEach((container) => _removeA11y(container));
		_unbindTooltipEvents();
		_unbindDocKey();
		_unbindDocClick();
		docEl.classList.remove(readyClass);
	}


	// INIT
	function init () {
		if (tooltipContainers.length) {
			//	add accessible attributes
			tooltipContainers.forEach((container, i) => _addA11y(container, i));
			_bindTooltipEvents();
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
export default Frtooltip;