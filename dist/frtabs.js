(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Frtabs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

//
;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var options = {};

var Frtabs = (function () {
	function Frtabs() {
		var selector = arguments.length <= 0 || arguments[0] === undefined ? '.js-fr-tabs' : arguments[0];

		var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		var _ref$containerClassNa = _ref.containerClassName;
		var containerClassName = _ref$containerClassNa === undefined ? 'fr-tabs' : _ref$containerClassNa;
		var _ref$linkEl = _ref.linkEl;
		var linkEl = _ref$linkEl === undefined ? 'button' : _ref$linkEl;

		_classCallCheck(this, Frtabs);

		options = {
			containerClassName: containerClassName,
			linkEl: linkEl
		};

		init();
	}

	// public methods

	_createClass(Frtabs, [{
		key: 'destroy',
		value: function destroy() {
			console.log('destroy');
		}
	}]);

	return Frtabs;
})();

// private methods

function addA11y(selector, options) {
	console.log('a11y');
}

function init() {
	console.log(options);
}

// module exports
exports.default = Frtabs;
module.exports = exports['default'];

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfY29tcG9uZW50cy90YWJzL3RhYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7O0FBQVksQ0FBQzs7Ozs7Ozs7OztBQUdiLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQzs7SUFHWCxNQUFNO0FBRVgsVUFGSyxNQUFNLEdBS0g7TUFISyxRQUFRLHlEQUFHLGFBQWE7O21FQUdqQyxFQUFFOzttQ0FGTCxrQkFBa0I7TUFBRSxrQkFBa0IseUNBQUcsU0FBUzt5QkFDbEQsTUFBTTtNQUFFLE1BQU0sK0JBQUcsUUFBUTs7d0JBSnJCLE1BQU07O0FBT1YsU0FBTyxHQUFHO0FBQ1QscUJBQWtCLEVBQWxCLGtCQUFrQjtBQUNsQixTQUFNLEVBQU4sTUFBTTtHQUNOLENBQUE7O0FBRUQsTUFBSSxFQUFFLENBQUM7RUFDUDs7O0FBQUE7Y0FiSSxNQUFNOzs0QkFpQkE7QUFDVixVQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQ3ZCOzs7UUFuQkksTUFBTTs7Ozs7QUF5QlosU0FBUyxPQUFPLENBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUNwQyxRQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3BCOztBQUVELFNBQVMsSUFBSSxHQUFJO0FBQ2hCLFFBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDckI7OztBQUFBLGtCQUljLE1BQU0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL1xubGV0IG9wdGlvbnMgPSB7fTtcblxuXG5jbGFzcyBGcnRhYnMge1xuXG5cdGNvbnN0cnVjdG9yIChzZWxlY3RvciA9ICcuanMtZnItdGFicycsIHtcblx0XHRjb250YWluZXJDbGFzc05hbWU6IGNvbnRhaW5lckNsYXNzTmFtZSA9ICdmci10YWJzJyxcblx0XHRsaW5rRWw6IGxpbmtFbCA9ICdidXR0b24nXG5cdH0gPSB7fSkge1xuXG5cdFx0b3B0aW9ucyA9IHtcblx0XHRcdGNvbnRhaW5lckNsYXNzTmFtZSxcblx0XHRcdGxpbmtFbFxuXHRcdH1cblxuXHRcdGluaXQoKTtcblx0fVxuXG5cblx0Ly8gcHVibGljIG1ldGhvZHNcblx0ZGVzdHJveSAoKSB7XG5cdFx0Y29uc29sZS5sb2coJ2Rlc3Ryb3knKTtcblx0fVxuXG59XG5cblxuLy8gcHJpdmF0ZSBtZXRob2RzXG5mdW5jdGlvbiBhZGRBMTF5IChzZWxlY3Rvciwgb3B0aW9ucykge1xuXHRjb25zb2xlLmxvZygnYTExeScpO1xufVxuXG5mdW5jdGlvbiBpbml0ICgpIHtcblx0Y29uc29sZS5sb2cob3B0aW9ucyk7XG59XG5cblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IEZydGFiczsiXX0=
