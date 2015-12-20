(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Fraccordion = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var elemContent = {};
var elemToggle = {};
var prefix = 'fraccordion-';

var Fraccordion = function Fraccordion() {
	var content = arguments.length <= 0 || arguments[0] === undefined ? '.js-fr-accordion-content' : arguments[0];
	var toggle = arguments.length <= 1 || arguments[1] === undefined ? '.js-fr-accordion-toggle' : arguments[1];

	elemContent = document.querySelector(content);
	elemToggle = document.querySelector(toggle);

	function init() {
		setAria();
		createButton();
		bindPointer();
	}

	function setAria() {
		elemContent.setAttribute('aria-hidden', true);
		elemContent.setAttribute('id', prefix + 0);
	}
	function createButton() {
		// build button element with appropriate aria attrs
		var elemButton = document.createElement('button');
		elemButton.innerHTML = elemToggle.innerHTML;
		elemButton.setAttribute('aria-expanded', false);
		elemButton.setAttribute('aria-controls', prefix + 0);
		// append in place of text
		elemToggle.innerHTML = '';
		elemToggle.appendChild(elemButton);
		elemToggle = elemButton;
	}

	//	Add event bindings
	function bindPointer() {
		elemToggle.addEventListener('click', eventPointer);
	}

	//	Event handlers
	function eventPointer() {
		if (elemContent.getAttribute('aria-hidden') == 'false') {
			closeAccordion();
		} else {
			openAccordion();
		}
	}

	//	Toggle component
	function openAccordion() {
		elemToggle.setAttribute('aria-expanded', true);
		//	undo aria-hidden, add focus
		elemContent.setAttribute('aria-hidden', false);
		elemContent.setAttribute('tabindex', 0);
		elemContent.focus();
	}
	function closeAccordion() {
		elemToggle.setAttribute('aria-expanded', false);
		//	set aria-hidden, remove focus
		elemContent.setAttribute('aria-hidden', true);
		elemContent.setAttribute('tabindex', -1);
		elemToggle.focus();
	}

	//	Run
	if (elemContent) init();
};

// module exports
exports.default = Fraccordion;
module.exports = exports['default'];

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfY29tcG9uZW50cy9hY2NvcmRpb24vYWNjb3JkaW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7OztBQUdiLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUNyQixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDcEIsSUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDOztBQUc5QixJQUFJLFdBQVcsR0FBRyxTQUFkLFdBQVcsR0FBc0Y7S0FBMUUsT0FBTyx5REFBRywwQkFBMEI7S0FBRSxNQUFNLHlEQUFHLHlCQUF5Qjs7QUFHbEcsWUFBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUMsV0FBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRzVDLFVBQVMsSUFBSSxHQUFHO0FBQ2YsU0FBTyxFQUFFLENBQUM7QUFDVixjQUFZLEVBQUUsQ0FBQztBQUNmLGFBQVcsRUFBRSxDQUFDO0VBQ2Q7O0FBR0QsVUFBUyxPQUFPLEdBQUc7QUFDbEIsYUFBVyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUMsYUFBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzNDO0FBQ0QsVUFBUyxZQUFZLEdBQUc7O0FBRXZCLE1BQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbEQsWUFBVSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO0FBQzVDLFlBQVUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2hELFlBQVUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBQUMsQUFFckQsWUFBVSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDMUIsWUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQyxZQUFVLEdBQUcsVUFBVSxDQUFDO0VBQ3hCOzs7QUFBQSxBQUlELFVBQVMsV0FBVyxHQUFHO0FBQ3RCLFlBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7RUFDbkQ7OztBQUFBLEFBSUQsVUFBUyxZQUFZLEdBQUc7QUFDdkIsTUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLE9BQU8sRUFBRTtBQUN2RCxpQkFBYyxFQUFFLENBQUM7R0FDakIsTUFBTTtBQUNOLGdCQUFhLEVBQUUsQ0FBQztHQUNoQjtFQUNEOzs7QUFBQSxBQUlELFVBQVMsYUFBYSxHQUFHO0FBQ3hCLFlBQVUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQzs7QUFBQyxBQUUvQyxhQUFXLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMvQyxhQUFXLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QyxhQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDcEI7QUFDRCxVQUFTLGNBQWMsR0FBRztBQUN6QixZQUFVLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUM7O0FBQUMsQUFFaEQsYUFBVyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUMsYUFBVyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QyxZQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDbkI7OztBQUFBLEFBSUQsS0FBSSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7Q0FDeEI7OztBQUFBLGtCQUljLFdBQVciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbmxldCBlbGVtQ29udGVudCA9IHt9O1xubGV0IGVsZW1Ub2dnbGUgPSB7fTtcbmNvbnN0IHByZWZpeCA9ICdmcmFjY29yZGlvbi0nO1xuXG5cbmxldCBGcmFjY29yZGlvbiA9IGZ1bmN0aW9uKGNvbnRlbnQgPSAnLmpzLWZyLWFjY29yZGlvbi1jb250ZW50JywgdG9nZ2xlID0gJy5qcy1mci1hY2NvcmRpb24tdG9nZ2xlJykge1xuXG5cblx0ZWxlbUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRlbnQpO1xuXHRlbGVtVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0b2dnbGUpO1xuXG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRzZXRBcmlhKCk7XG5cdFx0Y3JlYXRlQnV0dG9uKCk7XG5cdFx0YmluZFBvaW50ZXIoKTtcblx0fVxuXG5cblx0ZnVuY3Rpb24gc2V0QXJpYSgpIHtcblx0XHRlbGVtQ29udGVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG5cdFx0ZWxlbUNvbnRlbnQuc2V0QXR0cmlidXRlKCdpZCcsIHByZWZpeCArIDApO1xuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbigpIHtcblx0XHQvLyBidWlsZCBidXR0b24gZWxlbWVudCB3aXRoIGFwcHJvcHJpYXRlIGFyaWEgYXR0cnNcblx0XHRsZXQgZWxlbUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGVsZW1CdXR0b24uaW5uZXJIVE1MID0gZWxlbVRvZ2dsZS5pbm5lckhUTUw7XG5cdFx0ZWxlbUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG5cdFx0ZWxlbUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBwcmVmaXggKyAwKTtcblx0XHQvLyBhcHBlbmQgaW4gcGxhY2Ugb2YgdGV4dFxuXHRcdGVsZW1Ub2dnbGUuaW5uZXJIVE1MID0gJyc7XG5cdFx0ZWxlbVRvZ2dsZS5hcHBlbmRDaGlsZChlbGVtQnV0dG9uKTtcblx0XHRlbGVtVG9nZ2xlID0gZWxlbUJ1dHRvbjtcblx0fVxuXG5cblx0Ly9cdEFkZCBldmVudCBiaW5kaW5nc1xuXHRmdW5jdGlvbiBiaW5kUG9pbnRlcigpIHtcblx0XHRlbGVtVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRQb2ludGVyKTtcblx0fVxuXG5cblx0Ly9cdEV2ZW50IGhhbmRsZXJzXG5cdGZ1bmN0aW9uIGV2ZW50UG9pbnRlcigpIHtcblx0XHRpZiAoZWxlbUNvbnRlbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicpID09ICdmYWxzZScpIHtcblx0XHRcdGNsb3NlQWNjb3JkaW9uKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG9wZW5BY2NvcmRpb24oKTtcblx0XHR9XG5cdH1cblxuXG5cdC8vXHRUb2dnbGUgY29tcG9uZW50XG5cdGZ1bmN0aW9uIG9wZW5BY2NvcmRpb24oKSB7XG5cdFx0ZWxlbVRvZ2dsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcblx0XHQvL1x0dW5kbyBhcmlhLWhpZGRlbiwgYWRkIGZvY3VzXG5cdFx0ZWxlbUNvbnRlbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcblx0XHRlbGVtQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG5cdFx0ZWxlbUNvbnRlbnQuZm9jdXMoKTtcblx0fVxuXHRmdW5jdGlvbiBjbG9zZUFjY29yZGlvbigpIHtcblx0XHRlbGVtVG9nZ2xlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcblx0XHQvL1x0c2V0IGFyaWEtaGlkZGVuLCByZW1vdmUgZm9jdXNcblx0XHRlbGVtQ29udGVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG5cdFx0ZWxlbUNvbnRlbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcblx0XHRlbGVtVG9nZ2xlLmZvY3VzKCk7XG5cdH1cblxuXG5cdC8vXHRSdW5cblx0aWYgKGVsZW1Db250ZW50KSBpbml0KCk7XG59XG5cblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IEZyYWNjb3JkaW9uOyJdfQ==
