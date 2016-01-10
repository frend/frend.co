(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Froffcanvas = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

/**
 * @param {string} panelSelector 	Off-canvas element
 * @param {string} toggleSelector 	Button with which to toggle the off-canvas state
 * @param {object} options			Object containing config overrides
 */
;
Object.defineProperty(exports, "__esModule", {
	value: true
});
var Froffcanvas = function Froffcanvas() {
	var panelSelector = arguments.length <= 0 || arguments[0] === undefined ? '.js-fr-offcanvas' : arguments[0];
	var toggleSelector = arguments.length <= 1 || arguments[1] === undefined ? '.js-fr-offcanvas-toggle' : arguments[1];

	var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	var _ref$activePanelClass = _ref.activePanelClass;
	var activePanelClass = _ref$activePanelClass === undefined ? 'fr-offcanvas--is-active' : _ref$activePanelClass;
	var _ref$readyClass = _ref.readyClass;
	var readyClass = _ref$readyClass === undefined ? 'has-fr-offcanvas' : _ref$readyClass;

	//	CONSTANTS
	var doc = document;
	var docEl = doc.documentElement;

	//	SUPPORTS
	if (!'querySelector' in document || !'addEventListener' in window || !docEl.classList) return;

	//	SETUP
	var panel = doc.querySelector(panelSelector);
	var toggle = doc.querySelector(toggleSelector);

	//	UTILS
	function _defer(func) {
		//	wrapped in setTimeout to delay binding until previous rendering has completed
		if (typeof func === 'function') setTimeout(func, 0);
	}
	function _closest(el, fn) {
		// closest: http://clubmate.fi/jquerys-closest-function-and-pure-javascript-alternatives/
		return el && (fn(el) ? el : _closest(el.parentNode, fn));
	}

	//	A11y
	function _addA11y() {
		//	add aria-hidden attribute
		panel.setAttribute('aria-hidden', true);
	}
	function _removeA11y() {
		//	add aria-hidden attribute
		panel.removeAttribute('aria-hidden');
	}

	//	Events
	function _eventPointer() {
		var panelHidden = panel.getAttribute('aria-hidden') === 'true';
		if (panelHidden) {
			_showPanel();
		} else {
			_hidePanel();
		}
	}
	function _eventDocClick(e) {
		//	check if target is panel or child of
		var isPanel = e.target == panel;
		var isPanelChild = _closest(e.target, function (el) {
			if (el != doc) return el.classList.contains(panelSelector.substring(1));
		});
		if (!isPanel && !isPanelChild) _hidePanel();
	}
	function _eventDocKey(e) {
		//	esc key
		if (e.keyCode === 27) _hidePanel();
	}

	//	Bindings
	function _bindPointer() {
		toggle.addEventListener('click', _eventPointer);
	}
	function _bindDocClick() {
		doc.addEventListener('click', _eventDocClick);
	}
	function _bindDocKey() {
		doc.addEventListener('keydown', _eventDocKey);
	}

	//	Unbind
	function _unbindPointer() {
		toggle.removeEventListener('click', _eventPointer);
	}
	function _unbindDocClick() {
		doc.removeEventListener('click', _eventDocClick);
	}
	function _unbindDocKey() {
		doc.removeEventListener('keydown', _eventDocKey);
	}

	//	Actions
	function _showPanel() {
		//	remove aria-hidden, add focus
		panel.setAttribute('aria-hidden', false);
		panel.setAttribute('tabindex', 0);
		panel.focus();
		//	bind document close events
		_defer(_bindDocClick); // this isn't working for enter, works for space though. WTF.
		_defer(_bindDocKey);
		//	add active class
		panel.classList.add(activePanelClass);
	}
	function _hidePanel() {
		//	add aria-hidden, remove focus
		panel.setAttribute('aria-hidden', true);
		panel.setAttribute('tabindex', -1);
		panel.blur();
		//	unbind document events
		_unbindDocKey();
		_unbindDocClick();
		//	remove active class
		panel.classList.remove(activePanelClass);
	}
	function destroy() {
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
	function _init() {
		if (panel) {
			_addA11y();
			_bindPointer();
			docEl.classList.add(readyClass);
		}
	}
	_init();

	// REVEAL API
	return {
		destroy: destroy
	};
};

// module exports
exports.default = Froffcanvas;
module.exports = exports['default'];

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfY29tcG9uZW50cy9vZmZjYW52YXMvb2ZmY2FudmFzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7Ozs7QUFBWSxDQUFDOzs7O0FBT2IsSUFBTSxXQUFXLEdBQUcsU0FBZCxXQUFXLEdBT2Q7S0FORCxhQUFhLHlEQUFHLGtCQUFrQjtLQUNsQyxjQUFjLHlEQUFHLHlCQUF5Qjs7a0VBSXRDLEVBQUU7O2tDQUZMLGdCQUFnQjtLQUFFLGdCQUFnQix5Q0FBRyx5QkFBeUI7NEJBQzlELFVBQVU7S0FBRSxVQUFVLG1DQUFHLGtCQUFrQjs7O0FBTTdDLEtBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQztBQUNyQixLQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsZUFBZTs7O0FBQUMsQUFJbEMsS0FBSSxDQUFDLGVBQWUsSUFBSSxRQUFRLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU87OztBQUFBLEFBSTlGLEtBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDN0MsS0FBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUM7OztBQUFDLEFBSS9DLFVBQVMsTUFBTSxDQUFFLElBQUksRUFBRTs7QUFFdEIsTUFBSSxPQUFPLElBQUksS0FBSyxVQUFVLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNwRDtBQUNELFVBQVMsUUFBUSxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7O0FBRTFCLFNBQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUEsQUFBQyxDQUFDO0VBQ3pEOzs7QUFBQSxBQUlELFVBQVMsUUFBUSxHQUFJOztBQUVwQixPQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUN4QztBQUNELFVBQVMsV0FBVyxHQUFJOztBQUV2QixPQUFLLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0VBQ3JDOzs7QUFBQSxBQUlELFVBQVMsYUFBYSxHQUFJO0FBQ3pCLE1BQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssTUFBTSxDQUFDO0FBQy9ELE1BQUksV0FBVyxFQUFFO0FBQ2hCLGFBQVUsRUFBRSxDQUFDO0dBQ2IsTUFBTTtBQUNOLGFBQVUsRUFBRSxDQUFDO0dBQ2I7RUFDRDtBQUNELFVBQVMsY0FBYyxDQUFFLENBQUMsRUFBRTs7QUFFM0IsTUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUM7QUFDaEMsTUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsVUFBQyxFQUFFLEVBQUs7QUFDN0MsT0FBSSxFQUFFLElBQUksR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ3hFLENBQUMsQ0FBQztBQUNILE1BQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLENBQUM7RUFDNUM7QUFDRCxVQUFTLFlBQVksQ0FBRSxDQUFDLEVBQUU7O0FBRXpCLE1BQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUM7RUFDbkM7OztBQUFBLEFBSUQsVUFBUyxZQUFZLEdBQUk7QUFDeEIsUUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztFQUNoRDtBQUNELFVBQVMsYUFBYSxHQUFJO0FBQ3pCLEtBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7RUFDOUM7QUFDRCxVQUFTLFdBQVcsR0FBSTtBQUN2QixLQUFHLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0VBQzlDOzs7QUFBQSxBQUdELFVBQVMsY0FBYyxHQUFJO0FBQzFCLFFBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7RUFDbkQ7QUFDRCxVQUFTLGVBQWUsR0FBSTtBQUMzQixLQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0VBQ2pEO0FBQ0QsVUFBUyxhQUFhLEdBQUk7QUFDekIsS0FBRyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztFQUNqRDs7O0FBQUEsQUFJRCxVQUFTLFVBQVUsR0FBSTs7QUFFdEIsT0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDekMsT0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbEMsT0FBSyxDQUFDLEtBQUssRUFBRTs7QUFBQyxBQUVkLFFBQU0sQ0FBQyxhQUFhLENBQUM7QUFBQyxBQUN0QixRQUFNLENBQUMsV0FBVyxDQUFDOztBQUFDLEFBRXBCLE9BQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7RUFDdEM7QUFDRCxVQUFTLFVBQVUsR0FBSTs7QUFFdEIsT0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEMsT0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQyxPQUFLLENBQUMsSUFBSSxFQUFFOztBQUFDLEFBRWIsZUFBYSxFQUFFLENBQUM7QUFDaEIsaUJBQWUsRUFBRTs7QUFBQyxBQUVsQixPQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0VBQ3pDO0FBQ0QsVUFBUyxPQUFPLEdBQUk7O0FBRW5CLGFBQVcsRUFBRTs7QUFBQyxBQUVkLGdCQUFjLEVBQUUsQ0FBQztBQUNqQixpQkFBZSxFQUFFLENBQUM7QUFDbEIsZUFBYSxFQUFFOztBQUFDLEFBRWhCLE9BQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0VBQ25DOzs7QUFBQSxBQUlELFVBQVMsS0FBSyxHQUFJO0FBQ2pCLE1BQUksS0FBSyxFQUFFO0FBQ1YsV0FBUSxFQUFFLENBQUM7QUFDWCxlQUFZLEVBQUUsQ0FBQztBQUNmLFFBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0dBQ2hDO0VBQ0Q7QUFDRCxNQUFLLEVBQUU7OztBQUFDLEFBSVIsUUFBTztBQUNOLFNBQU8sRUFBUCxPQUFPO0VBQ1AsQ0FBQTtDQUNEOzs7QUFBQSxrQkFJYyxXQUFXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFuZWxTZWxlY3RvciBcdE9mZi1jYW52YXMgZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IHRvZ2dsZVNlbGVjdG9yIFx0QnV0dG9uIHdpdGggd2hpY2ggdG8gdG9nZ2xlIHRoZSBvZmYtY2FudmFzIHN0YXRlXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1x0XHRcdE9iamVjdCBjb250YWluaW5nIGNvbmZpZyBvdmVycmlkZXNcbiAqL1xuY29uc3QgRnJvZmZjYW52YXMgPSBmdW5jdGlvbihcblx0XHRwYW5lbFNlbGVjdG9yID0gJy5qcy1mci1vZmZjYW52YXMnLFxuXHRcdHRvZ2dsZVNlbGVjdG9yID0gJy5qcy1mci1vZmZjYW52YXMtdG9nZ2xlJyxcblx0XHR7XG5cdFx0XHRhY3RpdmVQYW5lbENsYXNzOiBhY3RpdmVQYW5lbENsYXNzID0gJ2ZyLW9mZmNhbnZhcy0taXMtYWN0aXZlJyxcblx0XHRcdHJlYWR5Q2xhc3M6IHJlYWR5Q2xhc3MgPSAnaGFzLWZyLW9mZmNhbnZhcydcblx0XHR9ID0ge31cblx0KSB7XG5cblxuXHQvL1x0Q09OU1RBTlRTXG5cdGNvbnN0IGRvYyA9IGRvY3VtZW50O1xuXHRjb25zdCBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cblxuXHQvL1x0U1VQUE9SVFNcblx0aWYgKCEncXVlcnlTZWxlY3RvcicgaW4gZG9jdW1lbnQgfHwgISdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cgfHwgIWRvY0VsLmNsYXNzTGlzdCkgcmV0dXJuO1xuXG5cblx0Ly9cdFNFVFVQXG5cdGxldCBwYW5lbCA9IGRvYy5xdWVyeVNlbGVjdG9yKHBhbmVsU2VsZWN0b3IpO1xuXHRsZXQgdG9nZ2xlID0gZG9jLnF1ZXJ5U2VsZWN0b3IodG9nZ2xlU2VsZWN0b3IpO1xuXG5cblx0Ly9cdFVUSUxTXG5cdGZ1bmN0aW9uIF9kZWZlciAoZnVuYykge1xuXHRcdC8vXHR3cmFwcGVkIGluIHNldFRpbWVvdXQgdG8gZGVsYXkgYmluZGluZyB1bnRpbCBwcmV2aW91cyByZW5kZXJpbmcgaGFzIGNvbXBsZXRlZFxuXHRcdGlmICh0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJykgc2V0VGltZW91dChmdW5jLCAwKTtcblx0fVxuXHRmdW5jdGlvbiBfY2xvc2VzdCAoZWwsIGZuKSB7XG5cdFx0Ly8gY2xvc2VzdDogaHR0cDovL2NsdWJtYXRlLmZpL2pxdWVyeXMtY2xvc2VzdC1mdW5jdGlvbi1hbmQtcHVyZS1qYXZhc2NyaXB0LWFsdGVybmF0aXZlcy9cblx0XHRyZXR1cm4gZWwgJiYgKGZuKGVsKSA/IGVsIDogX2Nsb3Nlc3QoZWwucGFyZW50Tm9kZSwgZm4pKTtcblx0fVxuXG5cblx0Ly9cdEExMXlcblx0ZnVuY3Rpb24gX2FkZEExMXkgKCkge1xuXHRcdC8vXHRhZGQgYXJpYS1oaWRkZW4gYXR0cmlidXRlXG5cdFx0cGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuXHR9XG5cdGZ1bmN0aW9uIF9yZW1vdmVBMTF5ICgpIHtcblx0XHQvL1x0YWRkIGFyaWEtaGlkZGVuIGF0dHJpYnV0ZVxuXHRcdHBhbmVsLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcblx0fVxuXG5cblx0Ly9cdEV2ZW50c1xuXHRmdW5jdGlvbiBfZXZlbnRQb2ludGVyICgpIHtcblx0XHRsZXQgcGFuZWxIaWRkZW4gPSBwYW5lbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJykgPT09ICd0cnVlJztcblx0XHRpZiAocGFuZWxIaWRkZW4pIHtcblx0XHRcdF9zaG93UGFuZWwoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0X2hpZGVQYW5lbCgpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBfZXZlbnREb2NDbGljayAoZSkge1xuXHRcdC8vXHRjaGVjayBpZiB0YXJnZXQgaXMgcGFuZWwgb3IgY2hpbGQgb2Zcblx0XHRsZXQgaXNQYW5lbCA9IGUudGFyZ2V0ID09IHBhbmVsO1xuXHRcdGxldCBpc1BhbmVsQ2hpbGQgPSBfY2xvc2VzdChlLnRhcmdldCwgKGVsKSA9PiB7XG5cdFx0XHRpZiAoZWwgIT0gZG9jKSByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKHBhbmVsU2VsZWN0b3Iuc3Vic3RyaW5nKDEpKTtcblx0XHR9KTtcblx0XHRpZiAoIWlzUGFuZWwgJiYgIWlzUGFuZWxDaGlsZCkgX2hpZGVQYW5lbCgpO1xuXHR9XG5cdGZ1bmN0aW9uIF9ldmVudERvY0tleSAoZSkge1xuXHRcdC8vXHRlc2Mga2V5XG5cdFx0aWYgKGUua2V5Q29kZSA9PT0gMjcpIF9oaWRlUGFuZWwoKTtcblx0fVxuXG5cblx0Ly9cdEJpbmRpbmdzXG5cdGZ1bmN0aW9uIF9iaW5kUG9pbnRlciAoKSB7XG5cdFx0dG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2V2ZW50UG9pbnRlcik7XG5cdH1cblx0ZnVuY3Rpb24gX2JpbmREb2NDbGljayAoKSB7XG5cdFx0ZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2V2ZW50RG9jQ2xpY2spO1xuXHR9XG5cdGZ1bmN0aW9uIF9iaW5kRG9jS2V5ICgpIHtcblx0XHRkb2MuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIF9ldmVudERvY0tleSk7XG5cdH1cblxuXHQvL1x0VW5iaW5kXG5cdGZ1bmN0aW9uIF91bmJpbmRQb2ludGVyICgpIHtcblx0XHR0b2dnbGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfZXZlbnRQb2ludGVyKTtcblx0fVxuXHRmdW5jdGlvbiBfdW5iaW5kRG9jQ2xpY2sgKCkge1xuXHRcdGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9ldmVudERvY0NsaWNrKTtcblx0fVxuXHRmdW5jdGlvbiBfdW5iaW5kRG9jS2V5ICgpIHtcblx0XHRkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIF9ldmVudERvY0tleSk7XG5cdH1cblxuXG5cdC8vXHRBY3Rpb25zXG5cdGZ1bmN0aW9uIF9zaG93UGFuZWwgKCkge1xuXHRcdC8vXHRyZW1vdmUgYXJpYS1oaWRkZW4sIGFkZCBmb2N1c1xuXHRcdHBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBmYWxzZSk7XG5cdFx0cGFuZWwuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuXHRcdHBhbmVsLmZvY3VzKCk7XG5cdFx0Ly9cdGJpbmQgZG9jdW1lbnQgY2xvc2UgZXZlbnRzXG5cdFx0X2RlZmVyKF9iaW5kRG9jQ2xpY2spOyAvLyB0aGlzIGlzbid0IHdvcmtpbmcgZm9yIGVudGVyLCB3b3JrcyBmb3Igc3BhY2UgdGhvdWdoLiBXVEYuXG5cdFx0X2RlZmVyKF9iaW5kRG9jS2V5KTtcblx0XHQvL1x0YWRkIGFjdGl2ZSBjbGFzc1xuXHRcdHBhbmVsLmNsYXNzTGlzdC5hZGQoYWN0aXZlUGFuZWxDbGFzcyk7XG5cdH1cblx0ZnVuY3Rpb24gX2hpZGVQYW5lbCAoKSB7XG5cdFx0Ly9cdGFkZCBhcmlhLWhpZGRlbiwgcmVtb3ZlIGZvY3VzXG5cdFx0cGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuXHRcdHBhbmVsLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XG5cdFx0cGFuZWwuYmx1cigpO1xuXHRcdC8vXHR1bmJpbmQgZG9jdW1lbnQgZXZlbnRzXG5cdFx0X3VuYmluZERvY0tleSgpO1xuXHRcdF91bmJpbmREb2NDbGljaygpO1xuXHRcdC8vXHRyZW1vdmUgYWN0aXZlIGNsYXNzXG5cdFx0cGFuZWwuY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVQYW5lbENsYXNzKTtcblx0fVxuXHRmdW5jdGlvbiBkZXN0cm95ICgpIHtcblx0XHQvL1x0cmVtb3ZlIGF0dHJpYnV0ZXNcblx0XHRfcmVtb3ZlQTExeSgpO1xuXHRcdC8vXHR1bmJpbmQgZXZlbnRzXG5cdFx0X3VuYmluZFBvaW50ZXIoKTtcblx0XHRfdW5iaW5kRG9jQ2xpY2soKTtcblx0XHRfdW5iaW5kRG9jS2V5KCk7XG5cdFx0Ly9cdHJlbW92ZSByZWZlcmVuY2Vcblx0XHRkb2NFbC5jbGFzc0xpc3QucmVtb3ZlKHJlYWR5Q2xhc3MpO1xuXHR9XG5cblxuXHQvL1x0SU5JVFxuXHRmdW5jdGlvbiBfaW5pdCAoKSB7XG5cdFx0aWYgKHBhbmVsKSB7XG5cdFx0XHRfYWRkQTExeSgpO1xuXHRcdFx0X2JpbmRQb2ludGVyKCk7XG5cdFx0XHRkb2NFbC5jbGFzc0xpc3QuYWRkKHJlYWR5Q2xhc3MpO1xuXHRcdH1cblx0fVxuXHRfaW5pdCgpO1xuXG5cblx0Ly8gUkVWRUFMIEFQSVxuXHRyZXR1cm4ge1xuXHRcdGRlc3Ryb3lcblx0fVxufVxuXG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCBGcm9mZmNhbnZhcztcbiJdfQ==
