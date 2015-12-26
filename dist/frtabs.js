(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Frtabs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

// Move Array prototype to NodeList (allows for Array methods on NodeLists)
// https://gist.github.com/paulirish/12fb951a8b893a454b32 (#gistcomment-1487315)
;
Object.defineProperty(exports, "__esModule", {
	value: true
});
Object.setPrototypeOf(NodeList.prototype, Array.prototype);

/**
 * @param {string} selector The selector to match for tab components
 * @param {object} options Object containing configuration overrides
 */
var Frtabs = function Frtabs() {
	var selector = arguments.length <= 0 || arguments[0] === undefined ? '.js-fr-tabs' : arguments[0];

	var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var _ref$tablistSelector = _ref.tablistSelector;
	var tablistSelector = _ref$tablistSelector === undefined ? '.fr-tabs__tablist' : _ref$tablistSelector;
	var _ref$activeTabClass = _ref.activeTabClass;
	var activeTabClass = _ref$activeTabClass === undefined ? 'fr-tabs__tab--is-active' : _ref$activeTabClass;
	var _ref$tabpanelSelector = _ref.tabpanelSelector;
	var tabpanelSelector = _ref$tabpanelSelector === undefined ? '.fr-tabs__panel' : _ref$tabpanelSelector;
	var _ref$activePanelClass = _ref.activePanelClass;
	var activePanelClass = _ref$activePanelClass === undefined ? 'fr-tabs__panel--is-active' : _ref$activePanelClass;
	var _ref$tabsReadyClass = _ref.tabsReadyClass;
	var tabsReadyClass = _ref$tabsReadyClass === undefined ? 'has-fr-tabs' : _ref$tabsReadyClass;
	var _ref$useHash = _ref.useHash;
	var useHash = _ref$useHash === undefined ? false : _ref$useHash;

	// CONSTANTS
	var doc = document;
	var docEl = doc.documentElement;

	// SUPPORTS
	if (!'querySelector' in document || !'addEventListener' in window || !docEl.classList) return;

	// SETUP
	// set tab element NodeLists
	var tabContainers = doc.querySelectorAll(selector);
	var tabLists = doc.querySelectorAll(tablistSelector);
	var tabListItems = doc.querySelectorAll(tablistSelector + ' li');
	var tabs = doc.querySelectorAll(tablistSelector + ' a');
	var tabpanels = doc.querySelectorAll(tabpanelSelector);

	// PRIVATE METHODS
	// a11y
	function _addA11y() {
		// add role="tablist" to ul
		tabLists.forEach(function (tabList) {
			tabList.setAttribute('role', 'tablist');
		});

		// add role="presentation" to li
		tabListItems.forEach(function (tabItem) {
			tabItem.setAttribute('role', 'presentation');
		});

		// add role="tab" and aria-controls to anchor
		tabs.forEach(function (tab) {
			tab.setAttribute('role', 'tab');
			tab.setAttribute('aria-controls', tab.hash.substring(1));
		});

		// add role="tabpanel" to section
		tabpanels.forEach(function (tabpanel) {
			tabpanel.setAttribute('role', 'tabpanel');
		});
	}

	function _removeA11y() {
		// remove role="tablist" from ul
		tabLists.forEach(function (tabList) {
			tabList.removeAttribute('role');
		});

		// remove role="presentation" from li
		tabListItems.forEach(function (tabItem) {
			tabItem.removeAttribute('role');
		});

		// remove role="tab" and aria-controls from anchor
		tabs.forEach(function (tab) {
			tab.removeAttribute('role');
			tab.removeAttribute('aria-controls');
		});

		// remove role="tabpanel" from section
		tabpanels.forEach(function (tabpanel) {
			tabpanel.removeAttribute('role');
		});
	}

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

	function _setActiveTab(i) {}

	// bindings
	function _bindClickEvents() {}

	function _unbindClickEvents() {}

	// PUBLIC METHODS
	function destroy() {
		_removeA11y();
		_unbindClickEvents();
		_removeTabsReady();
	}

	// INIT
	function _init() {
		if (tabContainers.length) {
			_addA11y();
			_bindClickEvents();
			_addTabsReady();
		}
	}
	_init();

	// REVEAL API
	return {
		destroy: destroy
	};
};

// module exports
exports.default = Frtabs;
module.exports = exports['default'];

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfY29tcG9uZW50cy90YWJzL3RhYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7OztBQUFZLENBQUM7Ozs7QUFJYixNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQzs7Ozs7O0FBQUMsQUFNM0QsSUFBSSxNQUFNLEdBQUcsU0FBVCxNQUFNLEdBT0Q7S0FQYyxRQUFRLHlEQUFHLGFBQWE7O2tFQU8xQyxFQUFFOztpQ0FOTCxlQUFlO0tBQUUsZUFBZSx3Q0FBRyxtQkFBbUI7Z0NBQ3RELGNBQWM7S0FBRSxjQUFjLHVDQUFHLHlCQUF5QjtrQ0FDMUQsZ0JBQWdCO0tBQUUsZ0JBQWdCLHlDQUFHLGlCQUFpQjtrQ0FDdEQsZ0JBQWdCO0tBQUUsZ0JBQWdCLHlDQUFHLDJCQUEyQjtnQ0FDaEUsY0FBYztLQUFFLGNBQWMsdUNBQUcsYUFBYTt5QkFDOUMsT0FBTztLQUFFLE9BQU8sZ0NBQUcsS0FBSzs7O0FBS3pCLEtBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQztBQUNyQixLQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsZUFBZTs7O0FBQUMsQUFJbEMsS0FBSSxDQUFDLGVBQWUsSUFBSSxRQUFRLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU87Ozs7QUFBQSxBQUs5RixLQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkQsS0FBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3JELEtBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDakUsS0FBSSxJQUFJ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OiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8vIE1vdmUgQXJyYXkgcHJvdG90eXBlIHRvIE5vZGVMaXN0IChhbGxvd3MgZm9yIEFycmF5IG1ldGhvZHMgb24gTm9kZUxpc3RzKVxuLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzEyZmI5NTFhOGI4OTNhNDU0YjMyICgjZ2lzdGNvbW1lbnQtMTQ4NzMxNSlcbk9iamVjdC5zZXRQcm90b3R5cGVPZihOb2RlTGlzdC5wcm90b3R5cGUsIEFycmF5LnByb3RvdHlwZSk7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIFRoZSBzZWxlY3RvciB0byBtYXRjaCBmb3IgdGFiIGNvbXBvbmVudHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmxldCBGcnRhYnMgPSBmdW5jdGlvbiAoc2VsZWN0b3IgPSAnLmpzLWZyLXRhYnMnLCB7XG5cdFx0dGFibGlzdFNlbGVjdG9yOiB0YWJsaXN0U2VsZWN0b3IgPSAnLmZyLXRhYnNfX3RhYmxpc3QnLFxuXHRcdGFjdGl2ZVRhYkNsYXNzOiBhY3RpdmVUYWJDbGFzcyA9ICdmci10YWJzX190YWItLWlzLWFjdGl2ZScsXG5cdFx0dGFicGFuZWxTZWxlY3RvcjogdGFicGFuZWxTZWxlY3RvciA9ICcuZnItdGFic19fcGFuZWwnLFxuXHRcdGFjdGl2ZVBhbmVsQ2xhc3M6IGFjdGl2ZVBhbmVsQ2xhc3MgPSAnZnItdGFic19fcGFuZWwtLWlzLWFjdGl2ZScsXG5cdFx0dGFic1JlYWR5Q2xhc3M6IHRhYnNSZWFkeUNsYXNzID0gJ2hhcy1mci10YWJzJyxcblx0XHR1c2VIYXNoOiB1c2VIYXNoID0gZmFsc2Vcblx0fSA9IHt9KSB7XG5cblxuXHQvLyBDT05TVEFOVFNcblx0Y29uc3QgZG9jID0gZG9jdW1lbnQ7XG5cdGNvbnN0IGRvY0VsID0gZG9jLmRvY3VtZW50RWxlbWVudDtcblxuXG5cdC8vIFNVUFBPUlRTXG5cdGlmICghJ3F1ZXJ5U2VsZWN0b3InIGluIGRvY3VtZW50IHx8ICEnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93IHx8ICFkb2NFbC5jbGFzc0xpc3QpIHJldHVybjtcblxuXG5cdC8vIFNFVFVQXG5cdC8vIHNldCB0YWIgZWxlbWVudCBOb2RlTGlzdHNcblx0bGV0IHRhYkNvbnRhaW5lcnMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdGxldCB0YWJMaXN0cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKHRhYmxpc3RTZWxlY3Rvcik7XG5cdGxldCB0YWJMaXN0SXRlbXMgPSBkb2MucXVlcnlTZWxlY3RvckFsbCh0YWJsaXN0U2VsZWN0b3IgKyAnIGxpJyk7XG5cdGxldCB0YWJzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwodGFibGlzdFNlbGVjdG9yICsgJyBhJyk7XG5cdGxldCB0YWJwYW5lbHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbCh0YWJwYW5lbFNlbGVjdG9yKTtcblxuXG5cdC8vIFBSSVZBVEUgTUVUSE9EU1xuXHQvLyBhMTF5XG5cdGZ1bmN0aW9uIF9hZGRBMTF5ICgpIHtcblx0XHQvLyBhZGQgcm9sZT1cInRhYmxpc3RcIiB0byB1bFxuXHRcdHRhYkxpc3RzLmZvckVhY2goKHRhYkxpc3QpID0+IHtcblx0XHRcdHRhYkxpc3Quc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYmxpc3QnKTtcblx0XHR9KTtcblxuXHRcdC8vIGFkZCByb2xlPVwicHJlc2VudGF0aW9uXCIgdG8gbGlcblx0XHR0YWJMaXN0SXRlbXMuZm9yRWFjaCgodGFiSXRlbSkgPT4ge1xuXHRcdFx0dGFiSXRlbS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncHJlc2VudGF0aW9uJyk7XG5cdFx0fSk7XG5cdFx0XG5cdFx0Ly8gYWRkIHJvbGU9XCJ0YWJcIiBhbmQgYXJpYS1jb250cm9scyB0byBhbmNob3Jcblx0XHR0YWJzLmZvckVhY2goKHRhYikgPT4ge1xuXHRcdFx0dGFiLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWInKTtcblx0XHRcdHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCB0YWIuaGFzaC5zdWJzdHJpbmcoMSkpO1xuXHRcdH0pO1xuXHRcdFxuXHRcdC8vIGFkZCByb2xlPVwidGFicGFuZWxcIiB0byBzZWN0aW9uXG5cdFx0dGFicGFuZWxzLmZvckVhY2goKHRhYnBhbmVsKSA9PiB7XG5cdFx0XHR0YWJwYW5lbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFicGFuZWwnKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIF9yZW1vdmVBMTF5ICgpIHtcblx0XHQvLyByZW1vdmUgcm9sZT1cInRhYmxpc3RcIiBmcm9tIHVsXG5cdFx0dGFiTGlzdHMuZm9yRWFjaCgodGFiTGlzdCkgPT4ge1xuXHRcdFx0dGFiTGlzdC5yZW1vdmVBdHRyaWJ1dGUoJ3JvbGUnKTtcblx0XHR9KTtcblxuXHRcdC8vIHJlbW92ZSByb2xlPVwicHJlc2VudGF0aW9uXCIgZnJvbSBsaVxuXHRcdHRhYkxpc3RJdGVtcy5mb3JFYWNoKCh0YWJJdGVtKSA9PiB7XG5cdFx0XHR0YWJJdGVtLnJlbW92ZUF0dHJpYnV0ZSgncm9sZScpO1xuXHRcdH0pO1xuXHRcdFxuXHRcdC8vIHJlbW92ZSByb2xlPVwidGFiXCIgYW5kIGFyaWEtY29udHJvbHMgZnJvbSBhbmNob3Jcblx0XHR0YWJzLmZvckVhY2goKHRhYikgPT4ge1xuXHRcdFx0dGFiLnJlbW92ZUF0dHJpYnV0ZSgncm9sZScpO1xuXHRcdFx0dGFiLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuXHRcdH0pO1xuXHRcdFxuXHRcdC8vIHJlbW92ZSByb2xlPVwidGFicGFuZWxcIiBmcm9tIHNlY3Rpb25cblx0XHR0YWJwYW5lbHMuZm9yRWFjaCgodGFicGFuZWwpID0+IHtcblx0XHRcdHRhYnBhbmVsLnJlbW92ZUF0dHJpYnV0ZSgncm9sZScpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvLyBldmVudHNcblx0ZnVuY3Rpb24gX2V2ZW50VGFiQ2xpY2sgKGUpIHtcblx0XHRjb25zb2xlLmxvZyhlKTtcblx0fVxuXG5cblx0Ly8gYWN0aW9uc1xuXHRmdW5jdGlvbiBfYWRkVGFic1JlYWR5ICgpIHtcblx0XHRkb2NFbC5jbGFzc0xpc3QuYWRkKHRhYnNSZWFkeUNsYXNzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIF9yZW1vdmVUYWJzUmVhZHkgKCkge1xuXHRcdGRvY0VsLmNsYXNzTGlzdC5yZW1vdmUodGFic1JlYWR5Q2xhc3MpO1xuXHR9XG5cblx0ZnVuY3Rpb24gX3NldEFjdGl2ZVRhYiAoaSkge1xuXHR9XG5cblxuXHQvLyBiaW5kaW5nc1xuXHRmdW5jdGlvbiBfYmluZENsaWNrRXZlbnRzICgpIHtcblx0fVxuXG5cdGZ1bmN0aW9uIF91bmJpbmRDbGlja0V2ZW50cyAoKSB7XG5cdH1cblxuXG5cdC8vIFBVQkxJQyBNRVRIT0RTXG5cdGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuXHRcdF9yZW1vdmVBMTF5KCk7XG5cdFx0X3VuYmluZENsaWNrRXZlbnRzKCk7XG5cdFx0X3JlbW92ZVRhYnNSZWFkeSgpO1xuXHR9XG5cblxuXHQvLyBJTklUXG5cdGZ1bmN0aW9uIF9pbml0ICgpIHtcblx0XHRpZiAodGFiQ29udGFpbmVycy5sZW5ndGgpIHtcblx0XHRcdF9hZGRBMTF5KCk7XG5cdFx0XHRfYmluZENsaWNrRXZlbnRzKCk7XG5cdFx0XHRfYWRkVGFic1JlYWR5KCk7XG5cdFx0fVxuXHR9XG5cdF9pbml0KCk7XG5cblxuXHQvLyBSRVZFQUwgQVBJXG5cdHJldHVybiB7XG5cdFx0ZGVzdHJveVxuXHR9XG5cbn1cblxuXG4vLyBtb2R1bGUgZXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgRnJ0YWJzO1xuIl19
