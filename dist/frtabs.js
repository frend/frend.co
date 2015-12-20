(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Frtabs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

// Frend Tabs
// @param {string} selector The selector to match for tab components
// @param {object} options Object containing configuration overrides

;
Object.defineProperty(exports, "__esModule", {
	value: true
});
var Frtabs = function Frtabs() {
	var selector = arguments.length <= 0 || arguments[0] === undefined ? '.js-fr-tabs' : arguments[0];

	var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var _ref$activeTabClass = _ref.activeTabClass;
	var activeTabClass = _ref$activeTabClass === undefined ? 'fr-tabs__tab--is-active' : _ref$activeTabClass;
	var _ref$activePanelClass = _ref.activePanelClass;
	var activePanelClass = _ref$activePanelClass === undefined ? 'fr-tabs__panel--is-active' : _ref$activePanelClass;
	var _ref$tabsReadyClass = _ref.tabsReadyClass;
	var tabsReadyClass = _ref$tabsReadyClass === undefined ? 'has-fr-tabs' : _ref$tabsReadyClass;

	// CONSTANTS
	var doc = document;
	var docEl = doc.documentElement;

	// SUPPORTS
	if (!'querySelector' in document || !'addEventListener' in window || !docEl.classList) return;

	// SETUP
	// set containers and options
	var containers = doc.querySelectorAll(selector);

	var options = {
		activeTabClass: activeTabClass,
		activePanelClass: activePanelClass,
		tabsReadyClass: tabsReadyClass
	};

	// PRIVATE METHODS
	// a11y
	function _addA11y() {}

	function _removeA11y() {}

	// events
	function _eventTabClick(e) {
		console.log(e);
	}

	// actions
	function _addTabsReady() {
		docEl.classList.add(tabsReadyClass);
	}

	function _removeTabsReady() {
		docEl.classList.remove(tabsReadyClass);
	}

	function _clearActiveTab() {}

	// bindings
	function _bindClickEvents() {}

	function _unbindClickEvents() {}

	// PUBLIC METHODS
	function build() {
		_addTabsReady();
		//for (let container of containers) {
		for (var i = 0; i < containers.length; i++) {
			_addA11y();
			_bindClickEvents();
		}
	}

	function destroy() {
		_removeA11y();
		_unbindClickEvents();
		_removeTabsReady();
	}

	function setActiveTab(i) {
		_clearActiveTab();
		// set active tab based off i
	}

	// INIT
	function _init() {
		if (containers.length) {
			build();
		}
	}
	_init();

	// REVEAL API
	return {
		build: build,
		destroy: destroy,
		setActiveTab: setActiveTab
	};
};

// module exports
exports.default = Frtabs;
module.exports = exports['default'];

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfY29tcG9uZW50cy90YWJzL3RhYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7O0FBQVksQ0FBQzs7OztBQU1iLElBQUksTUFBTSxHQUFHLFNBQVQsTUFBTSxHQUlEO0tBSmMsUUFBUSx5REFBRyxhQUFhOztrRUFJMUMsRUFBRTs7Z0NBSEwsY0FBYztLQUFFLGNBQWMsdUNBQUcseUJBQXlCO2tDQUMxRCxnQkFBZ0I7S0FBRSxnQkFBZ0IseUNBQUcsMkJBQTJCO2dDQUNoRSxjQUFjO0tBQUUsY0FBYyx1Q0FBRyxhQUFhOzs7QUFJL0MsS0FBTSxHQUFHLEdBQUcsUUFBUSxDQUFDO0FBQ3JCLEtBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxlQUFlOzs7QUFBQyxBQUlsQyxLQUFJLENBQUMsZUFBZSxJQUFJLFFBQVEsSUFBSSxDQUFDLGtCQUFrQixJQUFJLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTzs7OztBQUFBLEFBSzlGLEtBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFaEQsS0FBSSxPQUFPLEdBQUc7QUFDYixnQkFBYyxFQUFkLGNBQWM7QUFDZCxrQkFBZ0IsRUFBaEIsZ0JBQWdCO0FBQ2hCLGdCQUFjLEVBQWQsY0FBYztFQUNkOzs7O0FBQUMsQUFLRixVQUFTLFFBQVEsR0FBSSxFQUNwQjs7QUFFRCxVQUFTLFdBQVcsR0FBSSxFQUN2Qjs7O0FBQUEsQUFJRCxVQUFTLGNBQWMsQ0FBRSxDQUFDLEVBQUU7QUFDM0IsU0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmOzs7QUFBQSxBQUlELFVBQVMsYUFBYSxHQUFJO0FBQ3pCLE9BQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0VBQ3BDOztBQUVELFVBQVMsZ0JBQWdCLEdBQUk7QUFDNUIsT0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7RUFDdkM7O0FBRUQsVUFBUyxlQUFlLEdBQUksRUFDM0I7OztBQUFBLEFBSUQsVUFBUyxnQkFBZ0IsR0FBSSxFQUM1Qjs7QUFFRCxVQUFTLGtCQUFrQixHQUFJLEVBQzlCOzs7QUFBQSxBQUlELFVBQVMsS0FBSyxHQUFJO0FBQ2pCLGVBQWEsRUFBRTs7QUFBQyxBQUVoQixPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMzQyxXQUFRLEVBQUUsQ0FBQztBQUNYLG1CQUFnQixFQUFFLENBQUM7R0FDbkI7RUFDRDs7QUFFRCxVQUFTLE9BQU8sR0FBSTtBQUNuQixhQUFXLEVBQUUsQ0FBQztBQUNkLG9CQUFrQixFQUFFLENBQUM7QUFDckIsa0JBQWdCLEVBQUUsQ0FBQztFQUNuQjs7QUFFRCxVQUFTLFlBQVksQ0FBRSxDQUFDLEVBQUU7QUFDekIsaUJBQWUsRUFBRTs7QUFBQyxFQUVsQjs7O0FBQUEsQUFJRCxVQUFTLEtBQUssR0FBSTtBQUNqQixNQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDdEIsUUFBSyxFQUFFLENBQUM7R0FDUjtFQUNEO0FBQ0QsTUFBSyxFQUFFOzs7QUFBQyxBQUlSLFFBQU87QUFDTixPQUFLLEVBQUwsS0FBSztBQUNMLFNBQU8sRUFBUCxPQUFPO0FBQ1AsY0FBWSxFQUFaLFlBQVk7RUFDWixDQUFBO0NBRUQ7OztBQUFBLGtCQUljLE1BQU0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGcmVuZCBUYWJzXG4vLyBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgVGhlIHNlbGVjdG9yIHRvIG1hdGNoIGZvciB0YWIgY29tcG9uZW50c1xuLy8gQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgY29uZmlndXJhdGlvbiBvdmVycmlkZXNcblxubGV0IEZydGFicyA9IGZ1bmN0aW9uIChzZWxlY3RvciA9ICcuanMtZnItdGFicycsIHtcblx0XHRhY3RpdmVUYWJDbGFzczogYWN0aXZlVGFiQ2xhc3MgPSAnZnItdGFic19fdGFiLS1pcy1hY3RpdmUnLFxuXHRcdGFjdGl2ZVBhbmVsQ2xhc3M6IGFjdGl2ZVBhbmVsQ2xhc3MgPSAnZnItdGFic19fcGFuZWwtLWlzLWFjdGl2ZScsXG5cdFx0dGFic1JlYWR5Q2xhc3M6IHRhYnNSZWFkeUNsYXNzID0gJ2hhcy1mci10YWJzJ1xuXHR9ID0ge30pIHtcblxuXHQvLyBDT05TVEFOVFNcblx0Y29uc3QgZG9jID0gZG9jdW1lbnQ7XG5cdGNvbnN0IGRvY0VsID0gZG9jLmRvY3VtZW50RWxlbWVudDtcblxuXG5cdC8vIFNVUFBPUlRTXG5cdGlmICghJ3F1ZXJ5U2VsZWN0b3InIGluIGRvY3VtZW50IHx8ICEnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93IHx8ICFkb2NFbC5jbGFzc0xpc3QpIHJldHVybjtcblxuXG5cdC8vIFNFVFVQXG5cdC8vIHNldCBjb250YWluZXJzIGFuZCBvcHRpb25zXG5cdGxldCBjb250YWluZXJzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXG5cdGxldCBvcHRpb25zID0ge1xuXHRcdGFjdGl2ZVRhYkNsYXNzLFxuXHRcdGFjdGl2ZVBhbmVsQ2xhc3MsXG5cdFx0dGFic1JlYWR5Q2xhc3Ncblx0fTtcblxuXG5cdC8vIFBSSVZBVEUgTUVUSE9EU1xuXHQvLyBhMTF5XG5cdGZ1bmN0aW9uIF9hZGRBMTF5ICgpIHtcblx0fVxuXG5cdGZ1bmN0aW9uIF9yZW1vdmVBMTF5ICgpIHtcblx0fVxuXG5cblx0Ly8gZXZlbnRzXG5cdGZ1bmN0aW9uIF9ldmVudFRhYkNsaWNrIChlKSB7XG5cdFx0Y29uc29sZS5sb2coZSk7XG5cdH1cblxuXG5cdC8vIGFjdGlvbnNcblx0ZnVuY3Rpb24gX2FkZFRhYnNSZWFkeSAoKSB7XG5cdFx0ZG9jRWwuY2xhc3NMaXN0LmFkZCh0YWJzUmVhZHlDbGFzcyk7XG5cdH1cblxuXHRmdW5jdGlvbiBfcmVtb3ZlVGFic1JlYWR5ICgpIHtcblx0XHRkb2NFbC5jbGFzc0xpc3QucmVtb3ZlKHRhYnNSZWFkeUNsYXNzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIF9jbGVhckFjdGl2ZVRhYiAoKSB7XG5cdH1cblxuXG5cdC8vIGJpbmRpbmdzXG5cdGZ1bmN0aW9uIF9iaW5kQ2xpY2tFdmVudHMgKCkge1xuXHR9XG5cblx0ZnVuY3Rpb24gX3VuYmluZENsaWNrRXZlbnRzICgpIHtcblx0fVxuXG5cblx0Ly8gUFVCTElDIE1FVEhPRFNcblx0ZnVuY3Rpb24gYnVpbGQgKCkge1xuXHRcdF9hZGRUYWJzUmVhZHkoKTtcblx0XHQvL2ZvciAobGV0IGNvbnRhaW5lciBvZiBjb250YWluZXJzKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRfYWRkQTExeSgpO1xuXHRcdFx0X2JpbmRDbGlja0V2ZW50cygpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuXHRcdF9yZW1vdmVBMTF5KCk7XG5cdFx0X3VuYmluZENsaWNrRXZlbnRzKCk7XG5cdFx0X3JlbW92ZVRhYnNSZWFkeSgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2V0QWN0aXZlVGFiIChpKSB7XG5cdFx0X2NsZWFyQWN0aXZlVGFiKCk7XG5cdFx0Ly8gc2V0IGFjdGl2ZSB0YWIgYmFzZWQgb2ZmIGlcblx0fVxuXG5cblx0Ly8gSU5JVFxuXHRmdW5jdGlvbiBfaW5pdCAoKSB7XG5cdFx0aWYgKGNvbnRhaW5lcnMubGVuZ3RoKSB7XG5cdFx0XHRidWlsZCgpO1xuXHRcdH1cblx0fVxuXHRfaW5pdCgpO1xuXG5cblx0Ly8gUkVWRUFMIEFQSVxuXHRyZXR1cm4ge1xuXHRcdGJ1aWxkLFxuXHRcdGRlc3Ryb3ksXG5cdFx0c2V0QWN0aXZlVGFiXG5cdH1cblxufVxuXG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCBGcnRhYnM7XG4iXX0=
