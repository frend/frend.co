'use strict';

// Move Array prototype to NodeList (allows for Array methods on NodeLists)
// https://gist.github.com/paulirish/12fb951a8b893a454b32 (#gistcomment-1487315)
Object.setPrototypeOf(NodeList.prototype, Array.prototype);

/**
 * @param {string} selector The selector to match for tab components
 */
let Frtooltip = function (selector = '.js-fr-tooltip') {


	// CONSTANTS
	const doc = document;
	const docEl = doc.documentElement;


	// SUPPORTS
	if (!'querySelector' in document || !'addEventListener' in window || !docEl.classList) return;


	// SETUP
	// set tab element NodeLists
	let tooltips = document.querySelectorAll(selector);
	let currentTooltip;


	// PRIVATE METHODS
	//	bindings
	function _bindMouseOver(tooltip) {
		tooltip.addEventListener('mouseover', _eventMouseOver);
	}
	function _bindMouseOut(tooltip) {
		tooltip.addEventListener('mouseout', _eventMouseOut);
	}
	function _bindFocus(tooltip) {
		tooltip.addEventListener('focus', _eventFocus);
	}
	function _bindBlur(tooltip) {
		tooltip.addEventListener('blur', _eventBlur);
	}


	//	events
	function _eventMouseOver(e) {
		_showTooltip(e.target);
	}
	function _eventMouseOut() {
		_hideTooltip(currentTooltip);
	}
	function _eventFocus(e) {
		_showTooltip(e.target);
	}
	function _eventBlur(e) {
		_hideTooltip(e.target);
	}


	//	actions
	function _showTooltip(_this) {
		let id = _this.getAttribute('aria-describedby');
		currentTooltip = document.querySelector('#' + id);
		_toggleTooltip(currentTooltip, false);
	}
	function _hideTooltip() {
		_toggleTooltip(currentTooltip, true);
	}
	function _toggleTooltip(tooltip, state) {
		tooltip.setAttribute('aria-hidden', state);
	}


	// INIT
	function _init () {
		if (tooltips.length) {
			tooltips.forEach((tooltip) => {
				//	bind all interaction events
				_bindMouseOver(tooltip);
				_bindMouseOut(tooltip);
				_bindFocus(tooltip);
				_bindBlur(tooltip);
			});
		}
	}
	_init();


	// REVEAL API
	return {};
}


// module exports
export default Frtooltip;
