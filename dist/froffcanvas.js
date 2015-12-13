(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Froffcanvas = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var elemSelector = {};
var elemToggle = {};
var namespace = 'froffcanvas';

var Froffcanvas = function Froffcanvas() {
	var selector = arguments.length <= 0 || arguments[0] === undefined ? '.js-fr-offcanvas' : arguments[0];
	var toggle = arguments.length <= 1 || arguments[1] === undefined ? '.js-fr-offcanvas-toggle' : arguments[1];

	elemSelector = document.querySelector(selector);
	elemToggle = document.querySelector(toggle);

	function init() {
		bindPointer();
		bindDocumentKey();
	}

	//	Event bindings
	function bindPointer() {
		elemToggle.addEventListener('click', eventPointer);
	}
	function bindDocumentKey() {
		document.addEventListener('keyup', eventDocumentKey);
	}

	//	Event handlers
	function eventPointer() {
		if (elemSelector.getAttribute('aria-hidden') == 'false') {
			hideOffcanvas();
		} else {
			showOffcanvas();
		}
	}
	function eventDocumentKey(e) {
		//	esc key
		if (e.keyCode === 27) hideOffcanvas();
	}

	//	Toggle component
	function showOffcanvas() {
		elemSelector.setAttribute('aria-hidden', false);
		elemSelector.setAttribute('tabindex', 0);
		elemSelector.focus();
	}
	function hideOffcanvas() {
		elemSelector.setAttribute('aria-hidden', true);
		elemSelector.setAttribute('tabindex', -1);
		elemSelector.blur();
	}

	//	Run
	if (elemSelector) init();
};

// module exports
exports.default = Froffcanvas;
module.exports = exports['default'];

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfY29tcG9uZW50cy9vZmZjYW52YXMvb2ZmY2FudmFzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7OztBQUdiLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN0QixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDcEIsSUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDOztBQUdoQyxJQUFJLFdBQVcsR0FBRyxTQUFkLFdBQVcsR0FBK0U7S0FBbkUsUUFBUSx5REFBRyxrQkFBa0I7S0FBRSxNQUFNLHlEQUFHLHlCQUF5Qjs7QUFHM0YsYUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEQsV0FBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRzVDLFVBQVMsSUFBSSxHQUFHO0FBQ2YsYUFBVyxFQUFFLENBQUM7QUFDZCxpQkFBZSxFQUFFLENBQUM7RUFDbEI7OztBQUFBLEFBSUQsVUFBUyxXQUFXLEdBQUc7QUFDdEIsWUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztFQUNuRDtBQUNELFVBQVMsZUFBZSxHQUFHO0FBQzFCLFVBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztFQUNyRDs7O0FBQUEsQUFJRCxVQUFTLFlBQVksR0FBRztBQUN2QixNQUFJLFlBQVksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksT0FBTyxFQUFFO0FBQ3hELGdCQUFhLEVBQUUsQ0FBQztHQUNoQixNQUFNO0FBQ04sZ0JBQWEsRUFBRSxDQUFDO0dBQ2hCO0VBQ0Q7QUFDRCxVQUFTLGdCQUFnQixDQUFDLENBQUMsRUFBRTs7QUFFNUIsTUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQztFQUN0Qzs7O0FBQUEsQUFJRCxVQUFTLGFBQWEsR0FBRztBQUN4QixjQUFZLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNoRCxjQUFZLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QyxjQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDckI7QUFDRCxVQUFTLGFBQWEsR0FBRztBQUN4QixjQUFZLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvQyxjQUFZLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFDLGNBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztFQUNwQjs7O0FBQUEsQUFJRCxLQUFJLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQztDQUN6Qjs7O0FBQUEsa0JBSWMsV0FBVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cblxubGV0IGVsZW1TZWxlY3RvciA9IHt9O1xubGV0IGVsZW1Ub2dnbGUgPSB7fTtcbmNvbnN0IG5hbWVzcGFjZSA9ICdmcm9mZmNhbnZhcyc7XG5cblxudmFyIEZyb2ZmY2FudmFzID0gZnVuY3Rpb24oc2VsZWN0b3IgPSAnLmpzLWZyLW9mZmNhbnZhcycsIHRvZ2dsZSA9ICcuanMtZnItb2ZmY2FudmFzLXRvZ2dsZScpIHtcblxuXG5cdGVsZW1TZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXHRlbGVtVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0b2dnbGUpO1xuXG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kUG9pbnRlcigpO1xuXHRcdGJpbmREb2N1bWVudEtleSgpO1xuXHR9XG5cblxuXHQvL1x0RXZlbnQgYmluZGluZ3Ncblx0ZnVuY3Rpb24gYmluZFBvaW50ZXIoKSB7XG5cdFx0ZWxlbVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50UG9pbnRlcik7XG5cdH1cblx0ZnVuY3Rpb24gYmluZERvY3VtZW50S2V5KCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnREb2N1bWVudEtleSk7XG5cdH1cblxuXG5cdC8vXHRFdmVudCBoYW5kbGVyc1xuXHRmdW5jdGlvbiBldmVudFBvaW50ZXIoKSB7XG5cdFx0aWYgKGVsZW1TZWxlY3Rvci5nZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJykgPT0gJ2ZhbHNlJykge1xuXHRcdFx0aGlkZU9mZmNhbnZhcygpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzaG93T2ZmY2FudmFzKCk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGV2ZW50RG9jdW1lbnRLZXkoZSkge1xuXHRcdC8vXHRlc2Mga2V5XG5cdFx0aWYgKGUua2V5Q29kZSA9PT0gMjcpIGhpZGVPZmZjYW52YXMoKTtcblx0fVxuXG5cblx0Ly9cdFRvZ2dsZSBjb21wb25lbnRcblx0ZnVuY3Rpb24gc2hvd09mZmNhbnZhcygpIHtcblx0XHRlbGVtU2VsZWN0b3Iuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcblx0XHRlbGVtU2VsZWN0b3Iuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuXHRcdGVsZW1TZWxlY3Rvci5mb2N1cygpO1xuXHR9XG5cdGZ1bmN0aW9uIGhpZGVPZmZjYW52YXMoKSB7XG5cdFx0ZWxlbVNlbGVjdG9yLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcblx0XHRlbGVtU2VsZWN0b3Iuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcblx0XHRlbGVtU2VsZWN0b3IuYmx1cigpO1xuXHR9XG5cblxuXHQvL1x0UnVuXG5cdGlmIChlbGVtU2VsZWN0b3IpIGluaXQoKTtcbn1cblxuXG4vLyBtb2R1bGUgZXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgRnJvZmZjYW52YXM7XG4iXX0=
