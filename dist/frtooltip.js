(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Frtooltip = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

//
;
Object.defineProperty(exports, "__esModule", {
	value: true
});
var options = {};
var elemSelector = {};
var currentTooltip = {};

var Frtooltip = function Frtooltip() {
	var selector = arguments.length <= 0 || arguments[0] === undefined ? '.js-fr-tooltip' : arguments[0];

	elemSelector = document.querySelectorAll(selector);

	function init() {
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
		var id = _this.getAttribute('aria-describedby');
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
};

// module exports
exports.default = Frtooltip;
module.exports = exports['default'];

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7O0FBQVksQ0FBQzs7OztBQUdiLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNqQixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDdEIsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDOztBQUd4QixJQUFJLFNBQVMsR0FBRyxTQUFaLFNBQVMsR0FBMEM7S0FBN0IsUUFBUSx5REFBRyxnQkFBZ0I7O0FBR3BELGFBQVksR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBR25ELFVBQVMsSUFBSSxHQUFJO0FBQ2hCLGVBQWEsRUFBRSxDQUFDO0FBQ2hCLGNBQVksRUFBRSxDQUFDO0FBQ2YsV0FBUyxFQUFFLENBQUM7QUFDWixVQUFRLEVBQUUsQ0FBQztFQUNYOzs7QUFBQSxBQUlELFVBQVMsYUFBYSxHQUFHO0FBQ3hCLGNBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7RUFDOUQ7QUFDRCxVQUFTLFlBQVksR0FBRztBQUN2QixjQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0VBQzVEO0FBQ0QsVUFBUyxTQUFTLEdBQUc7QUFDcEIsY0FBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztFQUN0RDtBQUNELFVBQVMsUUFBUSxHQUFHO0FBQ25CLGNBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7RUFDcEQ7OztBQUFBLEFBSUQsVUFBUyxjQUFjLENBQUMsQ0FBQyxFQUFFO0FBQzFCLGFBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDdEI7QUFDRCxVQUFTLGFBQWEsR0FBRztBQUN4QixhQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7RUFDNUI7QUFDRCxVQUFTLFVBQVUsQ0FBQyxDQUFDLEVBQUU7QUFDdEIsYUFBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUN0QjtBQUNELFVBQVMsU0FBUyxDQUFDLENBQUMsRUFBRTtBQUNyQixhQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3RCOztBQUdELFVBQVMsV0FBVyxDQUFDLEtBQUssRUFBRTtBQUMzQixNQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDaEQsZ0JBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNsRCxlQUFhLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO0VBQ3JDO0FBQ0QsVUFBUyxXQUFXLEdBQUc7QUFDdEIsZUFBYSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNwQzs7O0FBQUEsQUFHRCxVQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3RDLFNBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckIsU0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7RUFDM0M7O0FBR0QsS0FBSSxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO0NBQ2hDOzs7QUFBQSxrQkFJYyxTQUFTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLy9cbmxldCBvcHRpb25zID0ge307XG5sZXQgZWxlbVNlbGVjdG9yID0ge307XG5sZXQgY3VycmVudFRvb2x0aXAgPSB7fTtcblxuXG52YXIgRnJ0b29sdGlwID0gZnVuY3Rpb24gKHNlbGVjdG9yID0gJy5qcy1mci10b29sdGlwJykge1xuXG5cblx0ZWxlbVNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cblxuXHRmdW5jdGlvbiBpbml0ICgpIHtcblx0XHRiaW5kTW91c2VPdmVyKCk7XG5cdFx0YmluZE1vdXNlT3V0KCk7XG5cdFx0YmluZEZvY3VzKCk7XG5cdFx0YmluZEJsdXIoKTtcblx0fVxuXG5cblx0Ly9cdEJpbmRpbmdzXG5cdGZ1bmN0aW9uIGJpbmRNb3VzZU92ZXIoKSB7XG5cdFx0ZWxlbVNlbGVjdG9yWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGV2ZW50TW91c2VPdmVyKTtcblx0fVxuXHRmdW5jdGlvbiBiaW5kTW91c2VPdXQoKSB7XG5cdFx0ZWxlbVNlbGVjdG9yWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZXZlbnRNb3VzZU91dCk7XG5cdH1cblx0ZnVuY3Rpb24gYmluZEZvY3VzKCkge1xuXHRcdGVsZW1TZWxlY3RvclswXS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGV2ZW50Rm9jdXMpO1xuXHR9XG5cdGZ1bmN0aW9uIGJpbmRCbHVyKCkge1xuXHRcdGVsZW1TZWxlY3RvclswXS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZXZlbnRCbHVyKTtcblx0fVxuXG5cblx0Ly9cdEV2ZW50c1xuXHRmdW5jdGlvbiBldmVudE1vdXNlT3ZlcihlKSB7XG5cdFx0c2hvd1Rvb2x0aXAoZS50YXJnZXQpO1xuXHR9XG5cdGZ1bmN0aW9uIGV2ZW50TW91c2VPdXQoKSB7XG5cdFx0aGlkZVRvb2x0aXAoY3VycmVudFRvb2x0aXApO1xuXHR9XG5cdGZ1bmN0aW9uIGV2ZW50Rm9jdXMoZSkge1xuXHRcdHNob3dUb29sdGlwKGUudGFyZ2V0KTtcblx0fVxuXHRmdW5jdGlvbiBldmVudEJsdXIoZSkge1xuXHRcdGhpZGVUb29sdGlwKGUudGFyZ2V0KTtcblx0fVxuXG5cblx0ZnVuY3Rpb24gc2hvd1Rvb2x0aXAoX3RoaXMpIHtcblx0XHRsZXQgaWQgPSBfdGhpcy5nZXRBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknKTtcblx0XHRjdXJyZW50VG9vbHRpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgaWQpO1xuXHRcdHRvZ2dsZVRvb2x0aXAoY3VycmVudFRvb2x0aXAsIGZhbHNlKTtcblx0fVxuXHRmdW5jdGlvbiBoaWRlVG9vbHRpcCgpIHtcblx0XHR0b2dnbGVUb29sdGlwKGN1cnJlbnRUb29sdGlwLCB0cnVlKTtcblx0fVxuXG5cdC8vXHRVdGlsc1xuXHRmdW5jdGlvbiB0b2dnbGVUb29sdGlwKHRvb2x0aXAsIHN0YXRlKSB7XG5cdFx0Y29uc29sZS5sb2codG9vbHRpcCk7XG5cdFx0dG9vbHRpcC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgc3RhdGUpO1xuXHR9XG5cblxuXHRpZiAoZWxlbVNlbGVjdG9yLmxlbmd0aCkgaW5pdCgpO1xufVxuXG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCBGcnRvb2x0aXA7XG4iXX0=
