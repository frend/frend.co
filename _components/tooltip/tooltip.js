'use strict';

//
let options = {};
let elemSelector = {};
let currentTooltip = {};


var Frtooltip = function (selector = '.js-fr-tooltip') {


	elemSelector = document.querySelectorAll(selector);


	function init () {
		bindMouseOver();
		bindMouseOut();
		bindFocus();
		bindBlur();
	}


	//	Bindings
	function bindMouseOver() {
		elemSelector[0].addEventListener('mouseover', eventMouseOver);
	}
	function bindMouseOut() {
		elemSelector[0].addEventListener('mouseout', eventMouseOut);
	}
	function bindFocus() {
		elemSelector[0].addEventListener('focus', eventFocus);
	}
	function bindBlur() {
		elemSelector[0].addEventListener('blur', eventBlur);
	}


	//	Events
	function eventMouseOver(e) {
		showTooltip(e.target);
	}
	function eventMouseOut() {
		hideTooltip(currentTooltip);
	}
	function eventFocus(e) {
		showTooltip(e.target);
	}
	function eventBlur(e) {
		hideTooltip(e.target);
	}


	function showTooltip(_this) {
		let id = _this.getAttribute('aria-describedby');
		currentTooltip = document.querySelector('#' + id);
		toggleTooltip(currentTooltip, false);
	}
	function hideTooltip() {
		toggleTooltip(currentTooltip, true);
	}

	//	Utils
	function toggleTooltip(tooltip, state) {
		console.log(tooltip);
		tooltip.setAttribute('aria-hidden', state);
	}


	if (elemSelector.length) init();
}


// module exports
export default Frtooltip;
