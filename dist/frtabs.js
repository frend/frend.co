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
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = tabLists[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var tabList = _step.value;

				tabList.setAttribute('role', 'tablist');
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		;

		// add role="presentation" to li
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = tabListItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var tabItem = _step2.value;

				tabItem.setAttribute('role', 'presentation');
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		;

		// add role="tab" and aria-controls to anchor
		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = tabs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var tab = _step3.value;

				tab.setAttribute('role', 'tab');
				tab.setAttribute('aria-controls', tab.hash.substring(1));
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		;

		// add role="tabpanel" to section
		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = tabpanels[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var tabpanel = _step4.value;

				tabpanel.setAttribute('role', 'tabpanel');
			}
		} catch (err) {
			_didIteratorError4 = true;
			_iteratorError4 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion4 && _iterator4.return) {
					_iterator4.return();
				}
			} finally {
				if (_didIteratorError4) {
					throw _iteratorError4;
				}
			}
		}

		;
	}

	function _removeA11y() {
		// remove role="tablist" from ul
		var _iteratorNormalCompletion5 = true;
		var _didIteratorError5 = false;
		var _iteratorError5 = undefined;

		try {
			for (var _iterator5 = tabLists[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
				var tabList = _step5.value;

				tabList.removeAttribute('role');
			}
		} catch (err) {
			_didIteratorError5 = true;
			_iteratorError5 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion5 && _iterator5.return) {
					_iterator5.return();
				}
			} finally {
				if (_didIteratorError5) {
					throw _iteratorError5;
				}
			}
		}

		;

		// remove role="presentation" from li
		var _iteratorNormalCompletion6 = true;
		var _didIteratorError6 = false;
		var _iteratorError6 = undefined;

		try {
			for (var _iterator6 = tabListItems[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
				var tabItem = _step6.value;

				tabItem.removeAttribute('role');
			}
		} catch (err) {
			_didIteratorError6 = true;
			_iteratorError6 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion6 && _iterator6.return) {
					_iterator6.return();
				}
			} finally {
				if (_didIteratorError6) {
					throw _iteratorError6;
				}
			}
		}

		;

		// remove role="tab" and aria-controls from anchor
		var _iteratorNormalCompletion7 = true;
		var _didIteratorError7 = false;
		var _iteratorError7 = undefined;

		try {
			for (var _iterator7 = tabs[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
				var tab = _step7.value;

				tab.removeAttribute('role');
				tab.removeAttribute('aria-controls');
			}
		} catch (err) {
			_didIteratorError7 = true;
			_iteratorError7 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion7 && _iterator7.return) {
					_iterator7.return();
				}
			} finally {
				if (_didIteratorError7) {
					throw _iteratorError7;
				}
			}
		}

		;

		// remove role="tabpanel" from section
		var _iteratorNormalCompletion8 = true;
		var _didIteratorError8 = false;
		var _iteratorError8 = undefined;

		try {
			for (var _iterator8 = tabpanels[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
				var tabpanel = _step8.value;

				tabpanel.removeAttribute('role');
			}
		} catch (err) {
			_didIteratorError8 = true;
			_iteratorError8 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion8 && _iterator8.return) {
					_iterator8.return();
				}
			} finally {
				if (_didIteratorError8) {
					throw _iteratorError8;
				}
			}
		}

		;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfY29tcG9uZW50cy90YWJzL3RhYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7OztBQUFZLENBQUM7Ozs7QUFJYixNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQzs7Ozs7O0FBQUMsQUFNM0QsSUFBSSxNQUFNLEdBQUcsU0FBVCxNQUFNLEdBT0Q7S0FQYyxRQUFRLHlEQUFHLGFBQWE7O2tFQU8xQyxFQUFFOztpQ0FOTCxlQUFlO0tBQUUsZUFBZSx3Q0FBRyxtQkFBbUI7Z0NBQ3RELGNBQWM7S0FBRSxjQUFjLHVDQUFHLHlCQUF5QjtrQ0FDMUQsZ0JBQWdCO0tBQUUsZ0JBQWdCLHlDQUFHLGlCQUFpQjtrQ0FDdEQsZ0JBQWdCO0tBQUUsZ0JBQWdCLHlDQUFHLDJCQUEyQjtnQ0FDaEUsY0FBYztLQUFFLGNBQWMsdUNBQUcsYUFBYTt5QkFDOUMsT0FBTztLQUFFLE9BQU8sZ0NBQUcsS0FBSzs7O0FBS3pCLEtBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQztBQUNyQixLQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsZUFBZTs7O0FBQUMsQUFJbEMsS0FBSSxDQUFDLGVBQWUsSUFBSSxRQUFRLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU87Ozs7QUFBQSxBQUs5RixLQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkQsS0FBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3JELEtBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDakUsS0FBSSxJQUFJ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QUM7R0FDaEI7RUFDRDtBQUNELE1BQUssRUFBRTs7O0FBQUMsQUFJUixRQUFPO0FBQ04sU0FBTyxFQUFQLE9BQU87RUFDUCxDQUFBO0NBRUQ7OztBQUFBLGtCQUljLE1BQU0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBNb3ZlIEFycmF5IHByb3RvdHlwZSB0byBOb2RlTGlzdCAoYWxsb3dzIGZvciBBcnJheSBtZXRob2RzIG9uIE5vZGVMaXN0cylcbi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3BhdWxpcmlzaC8xMmZiOTUxYThiODkzYTQ1NGIzMiAoI2dpc3Rjb21tZW50LTE0ODczMTUpXG5PYmplY3Quc2V0UHJvdG90eXBlT2YoTm9kZUxpc3QucHJvdG90eXBlLCBBcnJheS5wcm90b3R5cGUpO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciBUaGUgc2VsZWN0b3IgdG8gbWF0Y2ggZm9yIHRhYiBjb21wb25lbnRzXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBPYmplY3QgY29udGFpbmluZyBjb25maWd1cmF0aW9uIG92ZXJyaWRlc1xuICovXG5sZXQgRnJ0YWJzID0gZnVuY3Rpb24gKHNlbGVjdG9yID0gJy5qcy1mci10YWJzJywge1xuXHRcdHRhYmxpc3RTZWxlY3RvcjogdGFibGlzdFNlbGVjdG9yID0gJy5mci10YWJzX190YWJsaXN0Jyxcblx0XHRhY3RpdmVUYWJDbGFzczogYWN0aXZlVGFiQ2xhc3MgPSAnZnItdGFic19fdGFiLS1pcy1hY3RpdmUnLFxuXHRcdHRhYnBhbmVsU2VsZWN0b3I6IHRhYnBhbmVsU2VsZWN0b3IgPSAnLmZyLXRhYnNfX3BhbmVsJyxcblx0XHRhY3RpdmVQYW5lbENsYXNzOiBhY3RpdmVQYW5lbENsYXNzID0gJ2ZyLXRhYnNfX3BhbmVsLS1pcy1hY3RpdmUnLFxuXHRcdHRhYnNSZWFkeUNsYXNzOiB0YWJzUmVhZHlDbGFzcyA9ICdoYXMtZnItdGFicycsXG5cdFx0dXNlSGFzaDogdXNlSGFzaCA9IGZhbHNlXG5cdH0gPSB7fSkge1xuXG5cblx0Ly8gQ09OU1RBTlRTXG5cdGNvbnN0IGRvYyA9IGRvY3VtZW50O1xuXHRjb25zdCBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cblxuXHQvLyBTVVBQT1JUU1xuXHRpZiAoISdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCB8fCAhJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdyB8fCAhZG9jRWwuY2xhc3NMaXN0KSByZXR1cm47XG5cblxuXHQvLyBTRVRVUFxuXHQvLyBzZXQgdGFiIGVsZW1lbnQgTm9kZUxpc3RzXG5cdGxldCB0YWJDb250YWluZXJzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRsZXQgdGFiTGlzdHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbCh0YWJsaXN0U2VsZWN0b3IpO1xuXHRsZXQgdGFiTGlzdEl0ZW1zID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwodGFibGlzdFNlbGVjdG9yICsgJyBsaScpO1xuXHRsZXQgdGFicyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKHRhYmxpc3RTZWxlY3RvciArICcgYScpO1xuXHRsZXQgdGFicGFuZWxzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwodGFicGFuZWxTZWxlY3Rvcik7XG5cblxuXHQvLyBQUklWQVRFIE1FVEhPRFNcblx0Ly8gYTExeVxuXHRmdW5jdGlvbiBfYWRkQTExeSAoKSB7XG5cdFx0Ly8gYWRkIHJvbGU9XCJ0YWJsaXN0XCIgdG8gdWxcblx0XHRmb3IgKGxldCB0YWJMaXN0IG9mIHRhYkxpc3RzKSB7XG5cdFx0XHR0YWJMaXN0LnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJsaXN0Jyk7XG5cdFx0fTtcblxuXHRcdC8vIGFkZCByb2xlPVwicHJlc2VudGF0aW9uXCIgdG8gbGlcblx0XHRmb3IgKGxldCB0YWJJdGVtIG9mIHRhYkxpc3RJdGVtcykge1xuXHRcdFx0dGFiSXRlbS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncHJlc2VudGF0aW9uJyk7XG5cdFx0fTtcblx0XHRcblx0XHQvLyBhZGQgcm9sZT1cInRhYlwiIGFuZCBhcmlhLWNvbnRyb2xzIHRvIGFuY2hvclxuXHRcdGZvciAobGV0IHRhYiBvZiB0YWJzKSB7XG5cdFx0XHR0YWIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYicpO1xuXHRcdFx0dGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHRhYi5oYXNoLnN1YnN0cmluZygxKSk7XG5cdFx0fTtcblx0XHRcblx0XHQvLyBhZGQgcm9sZT1cInRhYnBhbmVsXCIgdG8gc2VjdGlvblxuXHRcdGZvciAobGV0IHRhYnBhbmVsIG9mIHRhYnBhbmVscykge1xuXHRcdFx0dGFicGFuZWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYnBhbmVsJyk7XG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIF9yZW1vdmVBMTF5ICgpIHtcblx0XHQvLyByZW1vdmUgcm9sZT1cInRhYmxpc3RcIiBmcm9tIHVsXG5cdFx0Zm9yIChsZXQgdGFiTGlzdCBvZiB0YWJMaXN0cykge1xuXHRcdFx0dGFiTGlzdC5yZW1vdmVBdHRyaWJ1dGUoJ3JvbGUnKTtcblx0XHR9O1xuXG5cdFx0Ly8gcmVtb3ZlIHJvbGU9XCJwcmVzZW50YXRpb25cIiBmcm9tIGxpXG5cdFx0Zm9yIChsZXQgdGFiSXRlbSBvZiB0YWJMaXN0SXRlbXMpIHtcblx0XHRcdHRhYkl0ZW0ucmVtb3ZlQXR0cmlidXRlKCdyb2xlJyk7XG5cdFx0fTtcblx0XHRcblx0XHQvLyByZW1vdmUgcm9sZT1cInRhYlwiIGFuZCBhcmlhLWNvbnRyb2xzIGZyb20gYW5jaG9yXG5cdFx0Zm9yIChsZXQgdGFiIG9mIHRhYnMpIHtcblx0XHRcdHRhYi5yZW1vdmVBdHRyaWJ1dGUoJ3JvbGUnKTtcblx0XHRcdHRhYi5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcblx0XHR9O1xuXHRcdFxuXHRcdC8vIHJlbW92ZSByb2xlPVwidGFicGFuZWxcIiBmcm9tIHNlY3Rpb25cblx0XHRmb3IgKGxldCB0YWJwYW5lbCBvZiB0YWJwYW5lbHMpIHtcblx0XHRcdHRhYnBhbmVsLnJlbW92ZUF0dHJpYnV0ZSgncm9sZScpO1xuXHRcdH07XG5cdH1cblxuXG5cdC8vIGV2ZW50c1xuXHRmdW5jdGlvbiBfZXZlbnRUYWJDbGljayAoZSkge1xuXHRcdGNvbnNvbGUubG9nKGUpO1xuXHR9XG5cblxuXHQvLyBhY3Rpb25zXG5cdGZ1bmN0aW9uIF9hZGRUYWJzUmVhZHkgKCkge1xuXHRcdGRvY0VsLmNsYXNzTGlzdC5hZGQodGFic1JlYWR5Q2xhc3MpO1xuXHR9XG5cblx0ZnVuY3Rpb24gX3JlbW92ZVRhYnNSZWFkeSAoKSB7XG5cdFx0ZG9jRWwuY2xhc3NMaXN0LnJlbW92ZSh0YWJzUmVhZHlDbGFzcyk7XG5cdH1cblxuXHRmdW5jdGlvbiBfc2V0QWN0aXZlVGFiIChpKSB7XG5cdH1cblxuXG5cdC8vIGJpbmRpbmdzXG5cdGZ1bmN0aW9uIF9iaW5kQ2xpY2tFdmVudHMgKCkge1xuXHR9XG5cblx0ZnVuY3Rpb24gX3VuYmluZENsaWNrRXZlbnRzICgpIHtcblx0fVxuXG5cblx0Ly8gUFVCTElDIE1FVEhPRFNcblx0ZnVuY3Rpb24gZGVzdHJveSAoKSB7XG5cdFx0X3JlbW92ZUExMXkoKTtcblx0XHRfdW5iaW5kQ2xpY2tFdmVudHMoKTtcblx0XHRfcmVtb3ZlVGFic1JlYWR5KCk7XG5cdH1cblxuXG5cdC8vIElOSVRcblx0ZnVuY3Rpb24gX2luaXQgKCkge1xuXHRcdGlmICh0YWJDb250YWluZXJzLmxlbmd0aCkge1xuXHRcdFx0X2FkZEExMXkoKTtcblx0XHRcdF9iaW5kQ2xpY2tFdmVudHMoKTtcblx0XHRcdF9hZGRUYWJzUmVhZHkoKTtcblx0XHR9XG5cdH1cblx0X2luaXQoKTtcblxuXG5cdC8vIFJFVkVBTCBBUElcblx0cmV0dXJuIHtcblx0XHRkZXN0cm95XG5cdH1cblxufVxuXG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCBGcnRhYnM7XG4iXX0=
